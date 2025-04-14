import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import favouriteRoutes from "./routes/favouriteRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/favourites", favouriteRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
