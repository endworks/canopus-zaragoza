import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BusService } from '../services/bus.service';

@Controller('bus')
export class BusController {
  constructor(private readonly busService: BusService) {}

  @MessagePattern('bus/stations')
  async busStations() {
    return this.busService.getStations();
  }

  @MessagePattern('bus/station')
  async busStation(data: { id: string; source: string }) {
    return this.busService.getStation(data.id, data.source);
  }

  @MessagePattern('bus/lines')
  async busLines() {
    return this.busService.getLines();
  }

  @MessagePattern('bus/line')
  async busLine(data: { id: string }) {
    return this.busService.getLine(data.id);
  }
}
