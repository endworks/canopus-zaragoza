import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { BusLinePayload, BusStationPayload } from 'src/models/bus.interface';
import { BusService } from '../services/bus.service';

@Controller()
export class BusController {
  constructor(private readonly busService: BusService) {}

  @MessagePattern('bus/stations', Transport.TCP)
  async busStations() {
    return this.busService.getStations();
  }

  @MessagePattern('bus/station', Transport.TCP)
  async busStation(@Payload() data: BusStationPayload) {
    return this.busService.getStation(data.id, data.source);
  }

  @MessagePattern('bus/lines', Transport.TCP)
  async busLines() {
    return this.busService.getLines();
  }

  @MessagePattern('bus/line', Transport.TCP)
  async busLine(@Payload() data: BusLinePayload) {
    return this.busService.getLine(data.id);
  }
}
