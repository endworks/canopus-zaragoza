import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable, InternalServerErrorException, NotImplementedException } from '@nestjs/common';
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
      throw new InternalServerErrorException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: exception.message,
        },
        exception.message,
      );
    }
  }

  // Station
  public async getStation(id: string): Promise<ErrorResponse> {
    throw new NotImplementedException(
      {
        statusCode: HttpStatus.NOT_IMPLEMENTED,
        message: `#TODO get station by ID: '${id}'`
      },
      `#TODO`,
    );
  }
}
