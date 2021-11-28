import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BusController } from './controllers/bus.controller';
import { CinemaController } from './controllers/cinema.controller';
import { TramController } from './controllers/tram.controller';
import { BusService } from './services/bus.service';
import { CinemaService } from './services/cinema.service';
import { TramService } from './services/tram.service';

@Module({
  imports: [HttpModule],
  controllers: [BusController, TramController, CinemaController],
  providers: [BusService, TramService, CinemaService]
})
export class AppModule {}
