import { Module } from '@nestjs/common';
import { DeviceReadingsModule } from './device-readings/device-readings.module';

@Module({
  imports: [DeviceReadingsModule],
})
export class AppModule {}
