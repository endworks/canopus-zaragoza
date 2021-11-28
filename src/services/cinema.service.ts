import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import {
  CinemaMoviesResponse,
  CinemaResponse,
  CinemasResponse,
  Movie as CinemaMovie
} from 'src/models/cinema.interface';
import { ErrorResponse } from '../models/common.interface';
import { cinemas } from 'src/data/cinemas';
import { lastValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';

@Injectable()
export class CinemaService {
  private readonly logger = new Logger('CinemaService');

  constructor(private httpService: HttpService) {}

  // Cinemas
  public async getCinemas(): Promise<CinemasResponse | ErrorResponse> {
    const resp: CinemasResponse = {};
    Object.keys(cinemas).map(async (id) => {
      resp[id] = {
        id,
        ...cinemas[id]
      };
    });
    return resp;
  }

  public async getCinema(id: string): Promise<CinemaResponse | ErrorResponse> {
    if (cinemas[id]) {
      return {
        id,
        ...cinemas[id]
      };
    } else {
      return {
        statusCode: 404,
        error: 'Not Found',
        message: `Resource with ID '${id}' was not found`
      };
    }
  }

  public async getMovies(
    id: string
  ): Promise<CinemaMoviesResponse | ErrorResponse> {
    if (cinemas[id]) {
      try {
        let movies;
        switch (id) {
          case 'palafox':
          case 'aragonia':
          case 'cervantes':
            movies = await this.getMoviesPalafox(id);
            break;
          case 'grancasa':
          case 'venecia':
            movies = await this.getMoviesCinesa(id);
            break;
          default:
            movies = [];
        }

        return {
          id,
          ...cinemas[id],
          movies: movies
        };
      } catch (exception) {
        this.logger.error(exception.message);
        return {
          statusCode: 500,
          error: 'Internal Server Error',
          message: exception.message
        };
      }
    } else {
      return {
        statusCode: 404,
        error: 'Not Found',
        message: `Resource with ID '${id}' was not found`
      };
    }
  }

  async getMoviesPalafox(id: string): Promise<CinemaMovie[]> {
    const response = await lastValueFrom(
      this.httpService.get(cinemas[id].source)
    );
    const $ = cheerio.load(response.data);
    const sessions = (await Promise.all(
      $('.views-field-nothing')
        .map(async (_, value) => {
          const source = `https://www.cinespalafox.com${$(value)
            .find('a')
            .attr('href')}`;
          const filmResponse = await lastValueFrom(
            this.httpService.get(source)
          );
          const $2 = cheerio.load(filmResponse.data);
          const id = /cartelera\/([\w-]+)/.exec(source)[1];
          const name = $2('h1').text();
          const poster = $2('.imagecache-cartelDetalle').attr('src');
          const trailer = $2('#urlvideo').text();
          const synopsis = $2('.sinopsis p').first().text();
          const genres = $2('.datos span').eq(0).text().split(', ');
          const duration = parseInt(
            $2('.datos span').eq(2).text().replace(/[^\d]/g, '')
          );
          const director = $2('.datos span').eq(3).text();
          const actors = $2('.datos span').eq(4).text().split(', ');
          const sessions = [];
          const schedules = $2('.horarios ul li').eq(1).find('a');
          schedules.each(async (index) => {
            sessions.push(schedules.eq(index).text());
          });
          const session: CinemaMovie = {
            id,
            name,
            synopsis,
            duration,
            sessions,
            director,
            actors,
            genres,
            poster,
            trailer,
            source
          };
          return session;
        })
        .toArray()
    )) as any;
    return sessions;
  }

  async getMoviesCinesa(id: string): Promise<CinemaMovie[]> {
    const data = await lastValueFrom(this.httpService.get(cinemas[id].source));
    return [];
  }
}
