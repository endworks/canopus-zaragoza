import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { TramStationsResponse } from 'src/models/tram.interface';
import { ErrorResponse } from '../models/common.interface';

@Injectable()
export class TramService {
  constructor(private httpService: HttpService) {}

  // Stations
  public async getStations(): Promise<TramStationsResponse | ErrorResponse> {
    try {
      const url = 'https://zgzpls.firebaseio.com/tram/stations.json';
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (exception) {
      return {
        statusCode: 500,
        error: 'Internal Server Error',
        message: exception.message,
      };
    }
  }

  // Station
  public async getStation(id: string): Promise<ErrorResponse> {
    return {
      statusCode: 501,
      error: 'Not Implemented',
      message: `#TODO get by ${id}`,
    };
  }
}
