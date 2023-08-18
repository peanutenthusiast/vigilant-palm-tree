import { Injectable } from '@nestjs/common';
import { StoreReadingsDto } from './dto/store-readings.dto';
import { Reading } from './entities/device.entity';

@Injectable()
export class DeviceReadingsService {
  private deviceReadings: Map<string, Map<string, number>> = new Map();

  store(storeReadingsDto: StoreReadingsDto) {
    const retrieved = this.deviceReadings.get(storeReadingsDto.id);

    if (!retrieved) {
      const storing = new Map();

      storeReadingsDto.readings.forEach(({ timestamp, count }) => {
        storing.set(timestamp, count);
      });
      this.deviceReadings.set(storeReadingsDto.id, storing);
    } else {
      storeReadingsDto.readings.forEach(({ timestamp, count }) => {
        if (!retrieved.has(timestamp)) retrieved.set(timestamp, count);
      });

      this.deviceReadings.set(storeReadingsDto.id, retrieved);
    }
  }

  findOne(id: string): { readings: Reading[] } {
    const retrieved = this.deviceReadings.get(id);

    if (!retrieved) {
      throw Error('could not find readings with given device id ' + id);
    }

    const readings = [];

    for (const [timestamp, count] of retrieved) {
      readings.push({ timestamp, count });
    }
    return { readings };
  }
}
