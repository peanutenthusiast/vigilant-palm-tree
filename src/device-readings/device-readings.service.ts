import { Injectable } from '@nestjs/common';
import { StoreReadingsDto } from './dto/store-readings.dto';
import { Reading } from './entities/device.entity';

@Injectable()
export class DeviceReadingsService {
  private deviceReadings: Map<string, Reading[]> = new Map()

  store(storeReadingsDto: StoreReadingsDto) {
    const retrieved = this.deviceReadings.get(storeReadingsDto.id)

    if (!retrieved) {
      this.deviceReadings.set(storeReadingsDto.id, storeReadingsDto.readings)
    }
  }


  findOne(id: string): { readings: Reading[] } {
    return { readings: this.deviceReadings.get(id) }
  }
}
