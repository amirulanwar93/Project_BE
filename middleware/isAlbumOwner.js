import albums from "../model/albums.model.js";
import "dotenv/config";

const isAlbumOwner = async(req, res, next) => {
  try {
    const album_id = req.params.album_id;

    const album = (await albums.findAll({
      where: {
        id: album_id,
        userId: req.userId,
      },
    }))[0];

    if (!album) return res.status(401).json({ message: "Unauthorised resource" });

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorised", error });
    console.log(error);
  }
};

export default isAlbumOwner;