import { NextFunction, Request, Response } from "express";

export function parseQuery(req: Request, res: Response, next: NextFunction) {
  const token = (req.query.token as string) || null;
  const zones = (req.query.zones as string)?.split(",").filter((t) => t) || [];
  const records = (req.query.records as string)?.split(",").filter((r) => r) || [];
  const ip4 = (req.query.ip4 as string) || null;

  if (!token || zones.length == 0 || records.length == 0 || zones.length != records.length || !ip4 || !ip4.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)) {
    res
      .status(400)
      .json({ error: "BAD REQUEST", message: "No token supplied. No zones specified. No records specified. OR Zones and Records have diffrent lengths." });
    return;
  }

  req.parsedQuery = {
    token,
    zones,
    records,
    ip4,
  };

  next();
}
