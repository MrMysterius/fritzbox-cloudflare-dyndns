import { PORT } from "./config";
import express from "express";
import { getZoneID } from "./getZoneID";

const app = express();

app.get("/dyndns", async (req, res) => {
  const zone_id = await getZoneID(req.query.token as string, req.query.zone as string);
  console.log(zone_id);

  return res.status(200).send("200: OK");
});

app.listen(PORT, () => {
  console.log("DynDns Server is listening on port " + PORT);
});
