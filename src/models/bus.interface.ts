export interface BusStationPayload {
  id: string;
  source: string;
}

export interface BusLinePayload {
  id: string;
}

export interface BusStationResponse {
  id: string;
  street: string;
  lines: string[];
  times: any[];
  coordinates: string[];
  source?: string;
  sourceUrl?: string;
  lastUpdated?: string;
}
