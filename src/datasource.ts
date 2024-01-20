import path from "path";
import { DataSource } from "typeorm";

export const myDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password", //dhhgky014?
  database: "mydatabase",
  synchronize: true,
  logging: false,
  entities: [path.join(__dirname, "entities/*.ts")],
  migrations: [path.join(__dirname, "migrations/*.ts")],
  subscribers: ["src/subscribers/**/*.ts"],
});
