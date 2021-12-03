import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { BusController } from './controllers/bus.controller';
import { TramController } from './controllers/tram.controller';
import { BusService } from './services/bus.service';
import { TramService } from './services/tram.service';

@Module({
  imports: [HttpModule, CacheModule.register()],
  controllers: [BusController, TramController],
  providers: [BusService, TramService]
})
export class AppModule {}
