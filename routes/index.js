import { Router } from "express";
import publicController from "../controllers/public.js";
import authController from "../controllers/auth.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const apiRoutes = Router();

apiRoutes.get("/", publicController.get);
apiRoutes.post("/", publicController.post);

// api for auth
apiRoutes.post("/register", authController.register);
apiRoutes.post("/login", authController.login);
// Belum ada kat FE
// apiRoutes.get("/show", isAuthenticated, authController.showUser);
// apiRoutes.put("/update", isAuthenticated, authController.updatePassword);
apiRoutes.get("/public", authController.publicController);
apiRoutes.get("/protected", isAuthenticated, authController.protectedController);

export default apiRoutes;