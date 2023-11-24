import { DataTypes } from "sequelize";
import { postgresConnection } from "../database/connection.js";

const albums = postgresConnection.define(
  "albums",
  {
    // Model attributes are defined here
    albumsName: {
      type: DataTypes.STRING,
      allowNull: false,
      after: 'id',
    },
    albumsDescription: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export default albums;