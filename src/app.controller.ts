import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ZaragozaService } from './zaragoza.service';

@Controller('zaragoza')
export class AppController {
  constructor(private readonly zaragozaService: ZaragozaService) {}

  @MessagePattern('bus/station')
  async busStation(data: { id: string; source: string }) {
    return this.zaragozaService.getBusStation(data.id, data.source);
  }
}
