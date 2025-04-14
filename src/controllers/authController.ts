import { Request, Response } from "express";
import bcrypt from "bcrypt-ts";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não está definido no arquivo .env");
}

// Registrando usuário
export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "Email já cadastrado." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Mesma API
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Erro ao registrar usuário." });
  }
};

// Login de usuário
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado." });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).json({ message: "Senha incorreta." });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Erro ao fazer login." });
  }
};

// Deletando usuário pelo id (via body)
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.body;

  if (!id) {
    res.status(400).json({ message: "ID do usuário não fornecido." });
    return;
  }

  try {
    await prisma.user.delete({ where: { id } });
    res.status(200).json({ message: "Usuário deletado com sucesso." });
  } catch (err) {
    console.error("Erro ao deletar usuário:", err);
    res.status(500).json({ message: "Erro ao deletar usuário." });
  }
};
