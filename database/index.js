import user from "../model/user.model.js";
import albums from "../model/albums.model.js";
import pictures from "../model/pictures.model.js";
import file from "../model/file.model.js";
import { postgresConnection } from "./connection.js";

export const db = async () => {
  try {
    await postgresConnection.authenticate();
    console.log("Connection has been established successfully.");
    await user.sync({ alter: true });
    await albums.sync({ alter: true });
    await pictures.sync({ alter: true });
    await file.sync({ alter: true });
  } catch (error) {
    process.exit(1);
  }
};