import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("*", async (req, res, next) => {
  res.sendStatus(200);
});

const port = process.env.PORT;

app.listen(port || 3000, () => {
  console.log(`Server listening on port ${port}`);
});
