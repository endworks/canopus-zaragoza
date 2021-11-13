import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TramService } from '../services/tram.service';

@Controller('zaragoza')
export class TramController {
  constructor(private readonly tramService: TramService) {}

  @MessagePattern('bus/stations')
  async stations() {
    return this.tramService.getStations();
  }

  @MessagePattern('bus/station')
  async station(data: { id: string }) {
    return this.tramService.getStation(data.id);
  }
}
