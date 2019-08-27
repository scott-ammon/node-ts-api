import axios from "axios";
import dotenv from "dotenv";
import express from "express";
import { asyncWrapper } from "./utils/asyncWrapper";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/sample-route", asyncWrapper(async (req, res, next) => {
  const sampleApi = await axios({
    method: "GET",
    url: "http://localhost:3030/test"
  });

  res.send(sampleApi.data);
}));

const port = process.env.PORT;

app.listen(port || 3000, () => {
  console.log(`Server listening on port ${port}`);
});
