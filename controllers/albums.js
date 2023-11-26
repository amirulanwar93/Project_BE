import albums from "../model/albums.model.js";
import file from "../model/file.model.js";
import fs from "fs";


const newAlbums = async (req, res) => {
  const { albumsName, albumsDescription } = req.body;

  try {
    const newUpload = await file.create(req.file);
    const newalbums = await albums.create({
      userId: req.userId,
      albumsName: albumsName,
      albumsDescription: albumsDescription,
      imageUrl: newUpload.path.replace('public\\', ''),
      fileId: newUpload.id
    });
    res.status(200).json({
      message: "New albums created",
      data: { name: newalbums.name, id: newalbums.id, user: req.userId },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error });
  }

};

const deleteAlbums = async (req, res) => {
  const userId = req.userId;

  try {
    // query user based on name
    const album = (await albums.findAll({
      where: {
        id: req.params.id,
        userId: userId,
      },
    }))[0];

    // No name return
    //   if name not found return 404
    if (!album) {
      res.status(404).json({ message: "albums not found" });
      return;

    }

    else {
      fs.unlink('public\\' + album.imageUrl, (err) => {
        if (err) {
          throw err;
        }

        console.log("Delete File successfully.");
      });

      await file.destroy({
        where: {
          id: album.fileId
        },
      });

      await albums.destroy({
        where: {
          id: album.id
        },
      });


      res.status(200).json({ message: "albums deleted", data: { name: album.name, id: album.id } });
      return;

    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

const update = async (req, res) => {
  const { albumsName, albumsDescription } = req.body;
  const userId = req.userId;

  try {
    // query user based on albumsName
    const album = (await albums.findAll({
      where: {
        id: req.params.id,
        userId: userId,
      },
    }))[0];

    // No albumsName return
    //   if albumsName not found return 404
    if (!album) {
      res.status(404).json({ message: "albums not found" });
      return;

    }

    else {
      const newUpload = await file.create(req.file);

      fs.unlink('public\\' + album.imageUrl, (err) => {
        if (err) {
          throw err;
        }

        console.log("Delete File successfully.");
      });

      await file.destroy({
        where: {
          id: album.fileId
        },
      });

      // Change everyone without a last albumsName to "Doe"
      await album.update({
        albumsName: albumsName,
        albumsDescription: albumsDescription,
        imageUrl: newUpload.path.replace('public\\', ''),
        fileId: newUpload.id
      });

      res.status(200).json({ message: "new name for albums updated", data: { albumsName: albumsName, albumsDescription: albumsDescription, id: album.id } });
      return;

    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

const show = async (req, res) => {
  const userId = req.userId;

  try {
    // query user based on name
    const album = (await albums.findAll({
      where: {
        id: req.params.id,
        userId: userId,
      },
    }))[0];

    // No name return
    //   if name not found return 404
    if (!album) {
      res.status(404).json({ message: "albums not found" });
      return;

    }

    else {

      res.status(200).json({ message: "albums found", data: { name: album.albumsName, description: album.albumsDescription, id: album.id, imageUrl: album.imageUrl } });
      return;

    }

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
};

const listing = async (req, res) => {
  const userId = req.userId;
  try {

    const data = (await albums.findAll({
      where: {
        userId: userId,
      },
      order: [
        ['updated_at', 'DESC'],
      ],
      attributes: ['id', 'albumsName', 'imageUrl', 'albumsDescription'],
      // include: items
    }));

    res.status(200).json({ message: "albums found", data: data });

    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

const albumsController = { newAlbums, deleteAlbums, update, show, listing };

export default albumsController;