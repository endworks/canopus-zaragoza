import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ErrorResponse } from '../models/common.interface';

@Injectable()
export class CinemaService {
  constructor(private httpService: HttpService) {}

  // Cinemas
  public async getCinemas(): Promise<ErrorResponse> {
    return {
      statusCode: 501,
      error: 'Not Implemented',
      message: `#TODO`,
    };
  }

  // Cinema
  public async getCinema(id: string): Promise<ErrorResponse> {
    return {
      statusCode: 501,
      error: 'Not Implemented',
      message: `#TODO get by ${id}`,
    };
  }
}
