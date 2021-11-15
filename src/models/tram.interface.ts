import { StationTime } from './common.interface';

export interface TramStationPayload {
  id: string;
}

export interface TramStationResponse {
  id: string;
  number: number;
  street: string;
  lines: string[];
  times: StationTime[];
  coordinates: string[];
  source?: string;
  sourceUrl?: string;
  lastUpdated?: string;
  type?: string;

  transports: StationTime[];
}

export interface TramStationsResponse {
  [id: string]: TramStationResponse;
}
