import { Router } from "express";
import publicController from "../controllers/public.js";
// import authController from "../controllers/auth.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
// import categoriesController from "../controllers/categories.js";


const apiRoutes = Router();

apiRoutes.get("/", publicController.get);
apiRoutes.post("/", publicController.post);

apiRoutes.get("/protected", isAuthenticated, publicController.get);

export default apiRoutes;