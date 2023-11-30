import { Router } from "express";
import publicController from "../controllers/public.js";
import authController from "../controllers/auth.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import albumsController from "../controllers/albums.js";
import uploadPublic from "../middleware/upload.js";
import picturesController from "../controllers/pictures.js";
import isAlbumOwner from "../middleware/isAlbumOwner.js";

const apiRoutes = Router();

apiRoutes.get("/", publicController.get);
apiRoutes.post("/", publicController.post);

// api for auth
apiRoutes.post("/register", authController.register);
apiRoutes.post("/login", authController.login);

//api for albums
apiRoutes.post("/albums/new", isAuthenticated, uploadPublic.single("file"), albumsController.newAlbums);
apiRoutes.delete("/albums/delete/:id", isAuthenticated, albumsController.deleteAlbums);
apiRoutes.put("/albums/update/:id", isAuthenticated, uploadPublic.single("file"), albumsController.update);
apiRoutes.get("/albums/show/:id", isAuthenticated, albumsController.show);
apiRoutes.get("/albums/listing", isAuthenticated, albumsController.listing);

// api for pictures
apiRoutes.post("/albums/:album_id/pictures/upload", isAuthenticated, isAlbumOwner, uploadPublic.single("file"), picturesController.uploadPictures);
apiRoutes.delete("/albums/:album_id/pictures/delete/:id", isAuthenticated, isAlbumOwner, picturesController.deletePictures);
apiRoutes.get("/albums/:album_id/pictures/listing", isAuthenticated, isAlbumOwner, picturesController.listingPictures);

export default apiRoutes;