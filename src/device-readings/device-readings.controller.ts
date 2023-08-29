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
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FetchReadingsDto } from './dto/fetch-readings.dto';

@ApiTags('device-readings')
@Controller('device-readings')
export class DeviceReadingsController {
  constructor(private readonly deviceReadingsService: DeviceReadingsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Readings stored successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request due to missing data',
  })
  store(@Body() storeReadingsDto: StoreReadingsDto) {
    return this.deviceReadingsService.store(storeReadingsDto);
  }

  @ApiOkResponse({ description: 'Readings retrieved successfully' })
  @ApiNotFoundResponse({
    description: 'Readings for device ID could not be found',
  })
  @ApiBadRequestResponse({
    description: 'The given id is not a UUID',
  })
  @Get(':id')
  findOne(@Param() { id }: FetchReadingsDto) {
    try {
      return this.deviceReadingsService.findOne(id);
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('count/:id')
  getCumulativeCount(@Param() params: { id: string }) {
    try {
      return this.deviceReadingsService.getCumulativeCount(params.id);
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
