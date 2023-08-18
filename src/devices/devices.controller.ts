import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { DeviceReadingService } from './device-readings.service'
import { StoreReadingsDto } from './dto/store-readings.dto';

@Controller('device-readings')
export class DeviceReadingsController {
  constructor(private readonly deviceReadingService: DeviceReadingService) {}

  @Post()
  create(@Body() createDeviceDto: StoreReadingsDto) {
    console.log('this should not be hit yet ', createDeviceDto);
    return this.deviceReadingService.create(createDeviceDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceReadingService.findOne(+id);
  }
}
