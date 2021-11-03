import { API_HOST, API_PATH } from "./config";

import https from "https";

export async function updateRecord(token: string, zone_id: string, record_id: string, ip: string, name: string) {
  return new Promise((resolve, reject) => {
    const connection = {
      host: API_HOST,
      path: `${API_PATH}zones/${zone_id}/dns_records/${record_id}`,
      method: "PUT",
      protocol: "https:",
      headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    };

    const req = https.request(connection, (res) => {
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
        // const updated = JSON.parse(data);
        // console.log(updated);
        // if (!updated) reject("No Zones");
      });
    });

    req.write(
      JSON.stringify({
        type: "A",
        name: name,
        content: ip,
        ttl: 1,
      })
    );
    req.end();
  });
}
