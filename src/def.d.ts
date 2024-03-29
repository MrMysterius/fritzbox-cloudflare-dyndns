declare namespace https {
  export interface RequestOptions {
    body?: string;
  }
}

declare namespace Express {
  interface Request {
    parsedQuery?: {
      token: string;
      zones: string[];
      records: string[];
      ip4: string;
    };
  }
}

declare interface Zone {
  name: string;
  id: string;
  [key: string]: any;
}

declare interface DNSRecord {
  zone_name: string;
  id: string;
  name: string;
  zone_id: string;
  [key: string]: any;
}
