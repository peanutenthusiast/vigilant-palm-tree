import { Injectable } from '@nestjs/common';
import { StoreReadingsDto } from './dto/store-readings.dto';
import { Reading } from './entities/device.entity';

@Injectable()
export class DeviceReadingsService {
  private deviceReadings: Map<string, Reading[]> = new Map()

  store(storeReadingsDto: StoreReadingsDto) {

  }


  findOne(id: string): { readings: Reading[] } {
    return { readings: [] }
  }
}
