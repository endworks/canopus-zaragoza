import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TramService } from '../services/tram.service';

@Controller('tram')
export class TramController {
  constructor(private readonly tramService: TramService) {}

  @MessagePattern('tram/stations')
  async tramStations() {
    return this.tramService.getStations();
  }

  @MessagePattern('tram/station')
  async tramStation(data: { id: string }) {
    return this.tramService.getStation(data.id);
  }
}
