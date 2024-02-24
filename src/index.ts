import { PORT } from "./config";
import express from "express";
import { getRecordID } from "./getRecordID";
import { getZoneIDs } from "./getZoneIDs";
import { parseQuery } from "./parseQuery";
import { updateRecord } from "./updateRecord";

const app = express();

app.get("/dyndns", parseQuery, async (req, res) => {
  let date = new Date();
  console.log(date.toISOString(), req.parsedQuery?.zones, req.parsedQuery?.records, req.parsedQuery?.ip4);

  if (!req.parsedQuery) {
    res.sendStatus(400);
    return;
  }

  const zone_ids = (await getZoneIDs(req.parsedQuery.token, req.parsedQuery.zones).catch((err: Error) => console.log(err))) as string[];

  for (let i = 0; i < zone_ids.length; i++) {
    console.log(new Date().toISOString(), "UPDATING RECORD", `${req.parsedQuery.records[i]}.${req.parsedQuery.zones[i]}`);
    const record_id = await getRecordID(req.parsedQuery.token, zone_ids[i], `${req.parsedQuery.records[i]}.${req.parsedQuery.zones[i]}`).catch((err) =>
      console.log(err)
    );

    await updateRecord(
      req.parsedQuery.token,
      zone_ids[i],
      record_id as string,
      req.parsedQuery.ip4,
      `${req.parsedQuery.records[i]}.${req.parsedQuery.zones[i]}`
    ).catch((err) => console.log(err));

    console.log(new Date().toISOString(), "UPDATED RECORD", `${req.parsedQuery.records[i]}.${req.parsedQuery.zones[i]}`);
  }

  date = new Date();
  console.log(date.toISOString(), req.parsedQuery);

  return res.status(200).send("200: OK");
});

app.all("/*", (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.sendStatus(500);
});

app.listen(PORT, () => {
  console.log("DynDns Server is listening on port " + PORT);
});
