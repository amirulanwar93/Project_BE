import { DataTypes } from "sequelize";
import { postgresConnection } from "../database/connection.js";

const pictures = postgresConnection.define(
  "pictures",
  {
    // Model attributes are defined here
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      after: 'id',
    },
    albumId: {
      type: DataTypes.INTEGER,
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

export default pictures;