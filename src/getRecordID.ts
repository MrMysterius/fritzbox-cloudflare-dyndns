import { API_HOST, API_PATH } from "./config";

import https from "https";

export async function getRecordID(token: string, zone_id: string, name: string) {
  return new Promise((resolve, reject) => {
    const connection = {
      host: API_HOST,
      path: `${API_PATH}zones/${zone_id}/dns_records`,
      method: "GET",
      protocol: "https:",
      headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
      body: JSON.stringify({}),
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
        const records = JSON.parse(data).result;
        if (!records) reject("No Zones");

        resolve(records.find((record: DNSRecord) => record.name == name).id);
      });
    });
  });
}
