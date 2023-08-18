import { Module } from '@nestjs/common';
import { DeviceReadingsService } from './device-readings.service';
import { DeviceReadingsController } from './device-readings.controller';

@Module({
  controllers: [DeviceReadingsController],
  providers: [DeviceReadingsService],
})
export class DevicereadingsModule {}
