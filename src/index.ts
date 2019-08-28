import axios from "axios";
import dotenv from "dotenv";
import express from "express";
import { asyncWrapper } from "./utils/asyncWrapper";

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logger = (request: express.Request, response: express.Response, next: any) => {
  console.log(`${request.method} request was made to ${request.path}`);
  next();
};

app.get("/sample-route", asyncWrapper(async (req, res, next) => {
  const sampleApi = await axios({
    method: "GET",
    url: "http://localhost:3030/test"
  });

  res.send(sampleApi.data);
}));

app.use((error: any, req: any, res: any, next: any) => {
  res.status(500).json({ error: "service unavailable" });
});

app.listen(port || 3000, () => {
  console.log(`Server listening on port ${port}`);
});
