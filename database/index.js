import user from "../model/user.model.js";
import { postgresConnection } from "./connection.js";

export const db = async () => {
  try {
    await postgresConnection.authenticate();
    console.log("Connection has been established successfully.");
    await user.sync({ alter: true });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};