import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { capitalize, capitalizeEachWord } from '../utils';
import {
  BusStationResponse,
  BusLineResponse,
  BusLinesResponse,
  BusStationsResponse
} from '../models/bus.interface';
import { ErrorResponse } from '../models/common.interface';

const busApiURL =
  'https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/transporte-urbano/poste-autobus/tuzsa-';
const busWebURL =
  'https://zaragoza-pasobus.avanzagrupo.com/frm_esquemaparadatime.php?poste=';

@Injectable()
export class BusService {
  private readonly logger = new Logger('BusService');

  constructor(private httpService: HttpService) {}

  // Stations
  public async getStations(): Promise<BusStationsResponse | ErrorResponse> {
    try {
      const url = 'https://zgzpls.firebaseio.com/bus/stations.json';
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (exception) {
      this.logger.error(exception.message);
      return {
        statusCode: 500,
        error: 'Internal Server Error',
        message: exception.message
      };
    }
  }

  // Station
  public async getStation(
    id: string,
    source: string
  ): Promise<BusStationResponse | ErrorResponse> {
    const url =
      source && source === 'web'
        ? busWebURL + id
        : `${busApiURL + id}.json?srsname=wgs84`;

    let backup;
    try {
      const backupUrl = `https://zgzpls.firebaseio.com/bus/stations/tuzsa-${id}.json`;
      const backupResponse = await lastValueFrom(
        this.httpService.get(backupUrl)
      );
      backup = backupResponse.data;
    } catch {
      backup = null;
    }

    try {
      const response = await lastValueFrom(this.httpService.get(url));

      try {
        const resp: BusStationResponse = {
          id: id,
          street: null,
          lines: [],
          times: [],
          coordinates: [],
          source: null,
          type: 'bus'
        };

        if (backup) {
          resp.street = backup.street;
          resp.lines = backup.lines;
          resp.coordinates = backup.coordinates;
          resp.times = backup.times;
        }

        if (!source || source === 'api') {
          resp.source = 'api';
          resp.sourceUrl = url;
          resp.lastUpdated = response.data.lastUpdated;
          resp.street = capitalizeEachWord(
            response.data.title.split(')')[1].slice(1).split('Lí')[0].trim()
          );
          resp.lines = response.data.title
            .split(resp.street)[1]
            .trim()
            .replace('Líneas: ', '')
            .split(', ');
          resp.coordinates = response.data.geometry.coordinates;
          const times = [];
          response.data.destinos.map((destination) => {
            ['primero', 'segundo'].map((element) => {
              const transport = {
                line: destination.linea,
                destination: capitalizeEachWord(
                  destination.destino
                    .replace(/(^,)|(,$)/g, '')
                    .replace(/(^\.)|(\.$)/g, ''),
                  true
                )
              };
              if (destination[element].includes('minutos')) {
                times.push({
                  ...transport,
                  time: `${destination[element]
                    .replace(' minutos', '')
                    .replace(/(^\.)|(\.$)/g, '')} min.`
                });
              } else if (destination[element]?.includes('Sin estimacin')) {
                times.push({
                  ...transport,
                  time: capitalize(
                    destination[element]
                      .replace(/(^\.)|(\.$)/g, '')
                      .replace('cin', 'ción')
                  )
                });
              } else {
                times.push({
                  ...transport,
                  time: capitalize(destination[element])
                });
              }
            });
          });
          resp.times = [...times];
        } else if (source === 'web') {
          resp.source = 'web';
          resp.sourceUrl = url;
          this.logger.error('Not Implemented');
          return {
            statusCode: 501,
            error: 'Not Implemented',
            message: `#TODO`
          };
        } else if (source === 'backup') {
          return { ...backup, source: 'backup' };
        } else {
          return {
            statusCode: 404,
            error: 'Not Found',
            message: `Invalid source, value must be: 'api', 'web' or 'backup'`
          };
        }
        resp.times.sort((a, b) => {
          if (a.time.includes('min') && b.time.includes('min')) {
            const sort =
              parseInt(a.time.split(' ')[0]) < parseInt(b.time.split(' ')[0])
                ? -1
                : 1;
            return sort;
          } else {
            if (a.time.includes('parada')) {
              return -1;
            }
            if (b.time.includes('Sin')) {
              return 1;
            }
          }
          return -1;
        });

        const updateUrl = `https://zgzpls.firebaseio.com/bus/stations/tuzsa-${id}.json`;
        try {
          await lastValueFrom(this.httpService.put(updateUrl, resp));
        } catch (updateException) {
          this.logger.error(updateException.message);
        }

        return resp;
      } catch (exception) {
        this.logger.error(exception.message);
        return {
          statusCode: 500,
          error: 'Internal Server Error',
          message: exception.message
        };
      }
    } catch (exception) {
      this.logger.error(`Resource with ID '${id}' was not found`);
      if (backup) {
        return { ...backup, source: 'backup' };
      } else {
        return {
          statusCode: 404,
          error: 'Not Found',
          message: `Resource with ID '${id}' was not found`
        };
      }
    }
  }

  // Lines
  public async getLines(): Promise<BusLinesResponse | ErrorResponse> {
    try {
      const url = 'https://zgzpls.firebaseio.com/bus/lines.json';
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (exception) {
      this.logger.error(exception.message);
      return {
        statusCode: 500,
        error: 'Internal Server Error',
        message: exception.message
      };
    }
  }

  // Line
  public async getLine(id: string): Promise<BusLineResponse | ErrorResponse> {
    try {
      const url = `https://zgzpls.firebaseio.com/bus/lines/tuzsa-${id}.json`;
      const response = await lastValueFrom(this.httpService.get(url));
      if (!response.data) {
        this.logger.error(`Resource with ID '${id}' was not found`);
        return {
          statusCode: 404,
          error: 'Not Found',
          message: `Resource with ID '${id}' was not found`
        };
      }
      return response.data;
    } catch (exception) {
      this.logger.error(exception.message);
      return {
        statusCode: 500,
        error: 'Internal Server Error',
        message: exception.message
      };
    }
  }
}
