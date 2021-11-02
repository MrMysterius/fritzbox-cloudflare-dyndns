import express from "express";

const PORT = 2525;

const app = express();

app.get("/dyndns", (req, res) => {
  return res.status(200).send("200: OK");
});

app.listen(PORT, () => {
  console.log("DynDns Server is listening on port " + PORT);
});
