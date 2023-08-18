import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DeviceReadingsService } from './device-readings.service';
import { StoreReadingsDto } from './dto/store-readings.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('device-readings')
@Controller('device-readings')
export class DeviceReadingsController {
  constructor(private readonly deviceReadingsService: DeviceReadingsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Readings stored successfully' })
  @ApiUnprocessableEntityResponse({
    description: 'Bad request due to missing data',
  })
  store(@Body() storeReadingsDto: StoreReadingsDto) {
    return this.deviceReadingsService.store(storeReadingsDto);
  }

  @ApiOkResponse({ description: 'Readings retrieved successfully' })
  @ApiNotFoundResponse({
    description: 'Readings for device ID could not be found',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.deviceReadingsService.findOne(id);
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
