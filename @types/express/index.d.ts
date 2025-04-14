// types/express/index.d.ts
import { User } from "@prisma/client"; // Opcional, se quiser o tipo completo do usuário

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
      };
    }
  }
}
