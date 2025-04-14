import { Router } from "express";
import {
  getFavourites,
  toggleFavorite,
} from "../controllers/favouriteController";

const favouriteRoutes = Router();

favouriteRoutes.post("/toggle", toggleFavorite);
favouriteRoutes.get("/:userId", getFavourites);

export default favouriteRoutes;
