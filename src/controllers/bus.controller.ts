import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BusService } from '../services/bus.service';

@Controller('bus')
export class BusController {
  constructor(private readonly busService: BusService) {}

  @MessagePattern('bus/stations')
  async stations() {
    return this.busService.getStations();
  }

  @MessagePattern('bus/station')
  async station(data: { id: string; source: string }) {
    return this.busService.getStation(data.id, data.source);
  }

  @MessagePattern('bus/lines')
  async lines() {
    return this.busService.getLines();
  }

  @MessagePattern('bus/line')
  async line(data: { id: string }) {
    return this.busService.getLine(data.id);
  }
}
