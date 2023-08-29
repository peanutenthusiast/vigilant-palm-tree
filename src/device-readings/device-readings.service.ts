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
    const readings = this._findOne(id);

    readings.sort(
      (reading, nextReading) =>
        new Date(reading.timestamp).getTime() -
        new Date(nextReading.timestamp).getTime(),
    );
    return { readings };
  }

  getCumulativeCount(id: string): { cumulativeCount: number } {
    let readings: Reading[];

    try {
      readings = this._findOne(id);
    } catch (error) {
      throw error;
    }

    return {
      cumulativeCount: readings.reduce((prev, { count }) => prev + count, 0),
    };
  }

  getLatestTimestamp(id: string): { latestTimestamp: string } {
    const { readings } = this.findOne(id);
    return { latestTimestamp: readings[readings.length - 1].timestamp };
  }

  _findOne(id: string): Reading[] {
    const retrieved = this.deviceReadings.get(id);

    if (!retrieved) {
      throw Error('could not find readings with given device id ' + id);
    }

    const readings = [];

    for (const [timestamp, count] of retrieved) {
      readings.push({ timestamp, count });
    }
    return readings;
  }
}
