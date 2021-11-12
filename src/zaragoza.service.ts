import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { capitalize, capitalizeEachWord } from './utils';
import { BusStationResponse, ErrorResponse } from './zaragoza.interface';

const busApiURL =
  'https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/transporte-urbano/poste-autobus/tuzsa-';
const busWebURL =
  'https://zaragoza.avanzagrupo.com/wp-admin/admin-ajax.php?action=tiempos_de_llegada&selectPoste=';

@Injectable()
export class ZaragozaService {
  constructor(private httpService: HttpService) {}

  public async getBusStation(
    id: string,
    source: string,
  ): Promise<BusStationResponse | ErrorResponse> {
    const parseWeb = source && source === 'web';
    const url = parseWeb
      ? busWebURL + id
      : `${busApiURL + id}.json?srsname=wgs84`;
    try {
      const response = await lastValueFrom(this.httpService.get(url));

      const resp: BusStationResponse = {
        id: id,
        street: null,
        lines: [],
        times: [],
        coordinates: [],
        source: null,
      };
      if (!parseWeb) {
        resp.source = 'official-api';
        resp.sourceUrl = url;
        resp.lastUpdated = response.data.lastUpdated;
        resp.street = capitalizeEachWord(
          response.data.title.split(')')[1].slice(1).split('Lí')[0].trim(),
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
                true,
              ),
            };
            if (destination[element].includes('minutos')) {
              times.push({
                ...transport,
                time: `${destination[element]
                  .replace(' minutos', '')
                  .replace(/(^\.)|(\.$)/g, '')} min.`,
              });
            } else if (destination[element]?.includes('Sin estimacin')) {
              times.push({
                ...transport,
                time: capitalize(
                  destination[element]
                    .replace(/(^\.)|(\.$)/g, '')
                    .replace('cin', 'ción'),
                ),
              });
            } else {
              times.push({
                ...transport,
                time: capitalize(destination[element]),
              });
            }
          });
        });
        resp.times = [...times];
      } else {
        resp.source = 'web';
        // TODO
      }
      resp.times.sort((a, b) => {
        if (a.time.includes('min') && b.time.includes('min')) {
          const sort =
            parseInt(a.time.split()[0]) < parseInt(b.time.split()[0]) ? -1 : 1;
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
      return resp;
    } catch (exception) {
      return {
        errors: {
          status: 404,
          message: exception.message,
        },
      };
    }
  }
}
