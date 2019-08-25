import express from "express";

const app = express();
const port = 8099;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("*", async (req, res, next) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
