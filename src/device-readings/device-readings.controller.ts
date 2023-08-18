import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DeviceReadingsService } from './device-readings.service';
import { StoreReadingsDto } from './dto/store-readings.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiProperty, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';

@ApiTags('device-readings')
@Controller('device-readings')
export class DeviceReadingsController {
  constructor(private readonly deviceReadingsService: DeviceReadingsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Readings stored successfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad request due to missing data'})
  store(@Body() storeReadingsDto: StoreReadingsDto) {
    return this.deviceReadingsService.store(storeReadingsDto);
  }

  @ApiOkResponse({ description: 'Readings retrieved successfully'})
  @ApiNotFoundResponse({ description: 'Readings for device ID could not be found'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceReadingsService.findOne(id);
  }
}
