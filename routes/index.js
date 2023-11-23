import { Router } from "express";
import publicController from "../controllers/public.js";
import authController from "../controllers/auth.js";
// import isAuthenticated from "../middleware/isAuthenticated.js";
import albumsController from "../controllers/albums.js";
// import itemsController from "../controllers/items.js";
// import isCategoryOwner from "../middleware/isCategoryOwner.js";

const apiRoutes = Router();

apiRoutes.get("/", publicController.get);
apiRoutes.post("/", publicController.post);

// api for auth
apiRoutes.post("/register", authController.register);
apiRoutes.post("/login", authController.login);
// Belum ada kat FE
// apiRoutes.get("/show", isAuthenticated, authController.showUser);
// apiRoutes.put("/update", isAuthenticated, authController.updatePassword);
// apiRoutes.get("/public", authController.publicController);
// apiRoutes.get("/protected", isAuthenticated, authController.protectedController);

//api for albums
apiRoutes.post("/albums/new", isAuthenticated, albumsController.newAlbums);
apiRoutes.delete("/albums/delete/:id", isAuthenticated, albumsController.deleteAlbums);
// apiRoutes.put("/albums/update/:id", isAuthenticated, albumsController.update);
// apiRoutes.get("/albums/show/:id", isAuthenticated, albumsController.show);
// apiRoutes.get("/albums/listing", isAuthenticated, albumsController.listing);

//api for items
// apiRoutes.post("/albums/:category_id/items/store", isAuthenticated, isCategoryOwner, itemsController.storeItem);
// apiRoutes.delete("/albums/:category_id/items/delete/:id", isAuthenticated, isCategoryOwner, itemsController.deleteItem);
// apiRoutes.put("/albums/:category_id/items/update/:id", isAuthenticated, isCategoryOwner, itemsController.updateItem);
// apiRoutes.get("/albums/:category_id/items/show/:id", isAuthenticated, isCategoryOwner, itemsController.showItem);
// apiRoutes.get("/albums/:category_id/items/listing", isAuthenticated, isCategoryOwner, itemsController.listingItem);

export default apiRoutes;