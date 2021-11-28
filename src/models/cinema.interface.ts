export interface Cinema {
  name: string;
  address?: string;
  location?: string;
  source?: string;
}

export interface Movie {
  id: string;
  name: string;
  sessions: string[];
  synopsis?: string;
  duration?: number;
  director?: string;
  genres?: string[];
  actors?: string[];
  poster?: string;
  trailer?: string;
  source?: string;
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

export interface CinemaMoviesResponse extends CinemaResponse {
  movies: Movie[];
}
