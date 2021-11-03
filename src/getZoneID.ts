import { API_HOST, API_PATH } from "./config";

import https from "https";

export async function getZoneID(token: string, zone_name: string) {
  return new Promise((resolve, reject) => {
    const connection = {
      host: API_HOST,
      path: `${API_PATH}zones`,
      method: "GET",
      protocol: "https:",
      headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
      body: JSON.stringify({ test: "ok" }),
    };

    https.get(connection, (res) => {
      if (res.statusCode != 200) {
        reject("Wrong Status Code");
      }
      let data = "";

      res.on("error", (err) => {
        console.log(err);
        reject(err);
      });

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const zones = JSON.parse(data).result;
        if (!zones) reject("No Zones");

        resolve(zones.find((zone: Zone) => zone.name == zone_name).id);
      });
    });
  });
}
