import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { DeviceReadingsService } from './device-readings.service';
import { StoreReadingsDto } from './dto/store-readings.dto';

@Controller('device-readings')
export class DeviceReadingsController {
  constructor(private readonly deviceReadingsService: DeviceReadingsService) {}

  @Post()
  store(@Body() storeReadingsDto: StoreReadingsDto) {
    return this.deviceReadingsService.store(storeReadingsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceReadingsService.findOne(id);
  }
}
