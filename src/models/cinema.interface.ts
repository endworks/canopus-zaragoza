export interface Cinema {
  name: string;
  address?: string;
  location?: string;
  url?: string;
}

export interface CinemaSession {
  name: string;
  duration: number;
  directors?: string[];
  genres?: string[];
  actors?: string[];
  times?: string[];
}

export interface CinemaData {
  [id: string]: Cinema;
}

export interface CinemaResponse extends Cinema {
  id: string;
}

export interface CinemasResponse {
  [id: string]: CinemaResponse;
}

export interface CinemaSessionsResponse extends CinemaResponse {
  sessions: CinemaSession[];
}
