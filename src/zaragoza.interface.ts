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

export interface ErrorResponse {
  errors: ErrorMessage;
}

export interface ErrorMessage {
  status: number;
  message?: string;
}
