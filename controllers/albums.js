import albums from "../model/albums.model.js";
// import items from "../model/items.model.js";

const newAlbums = async (req, res) => {
  const { albumsName, albumsDescription } = req.body;

  try {
    const newalbums = await albums.create({
      albumsName: albumsName,
      albumsDescription: albumsDescription
    });
    res.status(200).json({
      message: "New albums created",
      data: { name: newalbums.name, id: newalbums.id/* , user: req.userId  */ },
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }

};

const deleteAlbums = async (req, res) => {
  const userId = req.userId;

  try {
    // query user based on name
    const category = (await albums.findAll({
      where: {
        id: req.params.id,
        userId: userId,
      },
    }))[0];

    // No name return
    //   if name not found return 404
    if (!category) {
      res.status(404).json({ message: "albums not found" });
      return;

    }

    else {
      await category.destroy({
        where: {
          id: albums.id
        },
      });

      res.status(200).json({ message: "albums deleted", data: { name: category.name, id: category.id } });
      return;

    }

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
};

const update = async (req, res) => {
  const { name } = req.body;
  const userId = req.userId;

  try {
    // query user based on name
    const category = (await albums.findAll({
      where: {
        id: req.params.id,
        userId: userId,
      },
    }))[0];

    // No name return
    //   if name not found return 404
    if (!category) {
      res.status(404).json({ message: "albums not found" });
      return;

    }

    else {
      // Change everyone without a last name to "Doe"
      await category.update({ name: name });

      res.status(200).json({ message: "new name for albums updated", data: { name: name, id: category.id } });
      return;

    }

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
};

const show = async (req, res) => {
  const userId = req.userId;

  try {
    // query user based on name
    const category = (await albums.findAll({
      where: {
        id: req.params.id,
        userId: userId,
      },
    }))[0];

    // No name return
    //   if name not found return 404
    if (!category) {
      res.status(404).json({ message: "albums not found" });
      return;

    }

    else {

      res.status(200).json({ message: "albums found", data: { name: category.name, id: category.id } });
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
        ['name', 'ASC'],
      ],
      attributes: ['id', 'name'],
      include: items
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