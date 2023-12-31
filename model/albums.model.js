import { DataTypes } from "sequelize";
import { postgresConnection } from "../database/connection.js";

const albums = postgresConnection.define(
  "albums",
  {
    // Model attributes are defined here
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    albumsName: {
      type: DataTypes.STRING,
      allowNull: false,
      after: 'id',
    },
    albumsDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export default albums;