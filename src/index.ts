import { PORT } from "./config";
import express from "express";
import { getRecordID } from "./getRecordID";
import { getZoneID } from "./getZoneID";
import { updateRecord } from "./updateRecord";

const app = express();

app.get("/dyndns", async (req, res) => {
  const zone_id = await getZoneID(req.query.token as string, req.query.zone as string).catch((err) => console.log(err));
  const record_id = await getRecordID(req.query.token as string, zone_id as string, `${req.query.record}.${req.query.zone}`).catch((err) => console.log(err));
  await updateRecord(req.query.token as string, zone_id as string, record_id as string, req.query.ip4 as string, `${req.query.record}.${req.query.zone}`).catch(
    (err) => console.log(err)
  );
  console.log(zone_id);

  return res.status(200).send("200: OK");
});

app.listen(PORT, () => {
  console.log("DynDns Server is listening on port " + PORT);
});
