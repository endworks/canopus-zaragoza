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
