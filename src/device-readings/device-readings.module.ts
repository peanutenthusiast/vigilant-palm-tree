import { Module } from '@nestjs/common';
import { DeviceReadingsService } from './device-readings.service';
import { DevicesReadingsController } from './device-readings.controller';

@Module({
  controllers: [DevicesReadingsController],
  providers: [DeviceReadingsService],
})
export class DevicereadingsModule {}
