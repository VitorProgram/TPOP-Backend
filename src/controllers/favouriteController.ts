import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const toggleFavorite = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    name,
    year,
    voteAverage,
    userId,
    url,
    posterPath,
    runtime,
    mediaType,
    seasons,
  } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado." });
      return;
    }

    const existingFavourite = await prisma.favouriteMedia.findFirst({
      where: { userId, url },
    });

    if (existingFavourite) {
      await prisma.favouriteMedia.delete({
        where: { id: existingFavourite.id },
      });

      res
        .status(200)
        .json({ message: "Removido dos favoritos", favorited: false });
      return;
    }

    const newFavourite = await prisma.favouriteMedia.create({
      data: {
        name,
        userId,
        url,
        posterPath,
        year,
        runtime,
        seasons,
        mediaType,
        voteAverage,
      },
    });

    res.status(201).json({
      message: "Adicionado aos favoritos",
      favorited: true,
      favourite: newFavourite, // <- Aqui está o retorno dos dados do favorito
    });
  } catch (error) {
    console.error("Erro ao adicionar/remover favorito:", error);
    res.status(500).json({ message: "Erro ao processar favorito.", error });
  }
};

export const getFavourites = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado." });
      return;
    }

    const favourites = await prisma.favouriteMedia.findMany({
      where: { userId },
    });

    res.status(200).json(favourites);
  } catch (error) {
    const errorMessage = `Erro ao buscar favoritos: ${error}`;
    console.error(errorMessage);
    res.status(500).json({ message: errorMessage });
  }
};
