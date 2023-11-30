import pictures from "../model/pictures.model.js";

import file from "../model/file.model.js";
import fs from "fs";


const uploadPictures = async (req, res) => {
  try {
    const newUpload = await file.create(req.file);
    const uploadPicture = await pictures.create({
      albumId: req.params.album_id,
      imageUrl: newUpload.path.replace('public\\', ''),
      fileId: newUpload.id
    });
    res.status(200).json({
      message: "New pictures upload",
      data: { id: uploadPicture.id },
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }

};

const deletePictures = async (req, res) => {
  const albumId = req.params.album_id;

  try {
    // query user based on name
    const picture = (await pictures.findAll({
      where: {
        id: req.params.id,
        albumId: albumId,
      },
    }))[0];


    // if picture not found return 404
    if (!picture) {
      res.status(404).json({ message: "Pictures not found" });
      return;

    }

    else {
      fs.unlink('public\\' + picture.imageUrl, (err) => {
        if (err) {
          throw err;
        }

        console.log("Delete {Pictures} successfully.");
      });

      await file.destroy({
        where: {
          id: picture.fileId
        },
      });

      await picture.destroy({
        where: {
          id: picture.id
        },
      });

      res.status(200).json({ message: "Pictures deleted", data: { id: picture.id } });
      return;

    }

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
};

const listingPictures = async (req, res) => {
  const albumId = req.params.album_id;
  try {

    const data = (await pictures.findAll({
      where: {
        albumId: albumId,
      },
      order: [
        ['updated_at', 'DESC'],
      ],
      attributes: ['id', 'albumId', 'fileId', 'imageUrl'],
    }));

    res.status(200).json({ message: "albums found", data: data });

    return;
  } catch (error) {
    ;
    res.status(500).json({ message: "Server error", error: error });
  }
};

const albumsController = { uploadPictures, deletePictures, listingPictures };

export default albumsController;