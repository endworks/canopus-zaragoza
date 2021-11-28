import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  CinemaSessionsResponse,
  CinemaResponse,
  CinemasResponse,
} from 'src/models/cinema.interface';
import { ErrorResponse } from '../models/common.interface';

import { cinemas } from 'src/data/cinemas';

@Injectable()
export class CinemaService {
  constructor(private httpService: HttpService) {}

  // Cinemas
  public async getCinemas(): Promise<CinemasResponse | ErrorResponse> {
    const resp: CinemasResponse = {};
    Object.keys(cinemas).map(async (id) => {
      resp[id] = {
        id,
        ...cinemas[id],
      };
    });
    return resp;
  }

  // Cinema
  public async getCinema(id: string): Promise<CinemaResponse | ErrorResponse> {
    if (cinemas[id]) {
      return {
        id,
        ...cinemas[id],
      };
    } else {
      return {
        statusCode: 404,
        error: 'Not Found',
        message: `Resource with ID '${id}' was not found`,
      };
    }
  }

  // Cinema sessions
  public async getSessions(
    id: string,
  ): Promise<CinemaSessionsResponse | ErrorResponse> {
    return {
      statusCode: 501,
      error: 'Not Implemented',
      message: `#TODO get by ${id}`,
    };
  }
}
