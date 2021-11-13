import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { TramStationPayload } from 'src/models/tram.interface';
import { TramService } from '../services/tram.service';

@Controller()
export class TramController {
  constructor(private readonly tramService: TramService) {}

  @MessagePattern('tram/stations', Transport.TCP)
  async tramStations() {
    return this.tramService.getStations();
  }

  @MessagePattern('tram/station', Transport.TCP)
  async tramStation(@Payload() data: TramStationPayload) {
    return this.tramService.getStation(data.id);
  }
}
