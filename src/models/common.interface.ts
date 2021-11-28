export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

export interface StationTime {
  destination: string;
  line: string;
  time: string;
}

export interface IdPayload {
  id: string;
}
