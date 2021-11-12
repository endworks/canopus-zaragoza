import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ZaragozaService } from './zaragoza.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [ZaragozaService],
})
export class AppModule {}
