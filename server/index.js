import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/requests.js";
import mysql2 from "mysql2";

export const db = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "#@+-99**a",
  database: "userinfo",
});

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use("/", router);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
