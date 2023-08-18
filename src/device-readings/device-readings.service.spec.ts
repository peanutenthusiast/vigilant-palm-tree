import { Test, TestingModule } from '@nestjs/testing';
import { DeviceReadingsService } from './device-readings.service';
import { Reading } from './entities/device.entity';
import { StoreReadingsDto } from './dto/store-readings.dto';
import { Chance } from 'chance';

describe('DeviceReadingsService', () => {
  let service: DeviceReadingsService;
  let chance: Chance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceReadingsService],
    }).compile();

    chance = Chance();

    service = module.get<DeviceReadingsService>(DeviceReadingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a new device id and corresponding readings if not already existing', () => {
    const deviceReading = {
      id: '36d5658a-6908-479e-887e-a949ec199272',
      readings: [
        {
          timestamp: '2021-09-29T16:08:15+01:00',
          count: 2,
        },
        {
          timestamp: '2021-09-29T16:09:15+01:00',
          count: 15,
        },
      ],
    };

    service.store(deviceReading);
    const { readings } = service.findOne(deviceReading.id);

    expect(readings).toEqual(deviceReading.readings);
  });

  it('updates the list of readings for a preexisting device id', () => {
    const deviceReading = {
      id: '36d5658a-6908-479e-887e-a949ec199272',
      readings: [
        {
          timestamp: '2021-09-29T16:08:15+01:00',
          count: 2,
        },
        {
          timestamp: '2021-09-29T16:09:15+01:00',
          count: 15,
        },
      ],
    };

    service.store(deviceReading);

    const updatedList = {
      id: deviceReading.id,
      readings: [
        {
          timestamp: <string>chance.date().toISOString(),
          count: <number>chance.integer(),
        },
        {
          timestamp: <string>chance.date().toISOString(),
          count: <number>chance.integer(),
        },
      ],
    };

    service.store(updatedList);

    expect(service.findOne(deviceReading.id).readings).toEqual([
      ...deviceReading.readings,
      ...updatedList.readings,
    ]);
  });

  it('should not update the count for preexisting timestamps per a device id', () => {
    const deviceReading = {
      id: '36d5658a-6908-479e-887e-a949ec199272',
      readings: [
        {
          timestamp: '2021-09-29T16:08:15+01:00',
          count: 2,
        },
        {
          timestamp: '2021-09-29T16:09:15+01:00',
          count: 15,
        },
      ],
    };

    service.store(deviceReading);
    let readings: Reading[];

    ({ readings } = service.findOne(deviceReading.id));

    expect(
      readings.find(
        ({ timestamp }) => timestamp === '2021-09-29T16:08:15+01:00',
      ).count,
    ).toEqual(2);

    const failedUpdateReading: StoreReadingsDto = {
      id: '36d5658a-6908-479e-887e-a949ec199272',
      readings: [
        {
          timestamp: '2021-09-29T16:08:15+01:00',
          count: 3,
        },
      ],
    };

    service.store(failedUpdateReading);

    ({ readings } = service.findOne(deviceReading.id));

    expect(
      readings.find(
        ({ timestamp }) => timestamp === '2021-09-29T16:08:15+01:00',
      ).count,
    ).toEqual(2);
  });

  it('should throw an error when no device id is found', () => {
    service.store({
      id: '36d5658a-6908-479e-887e-a949ec199272',
      readings: [
        {
          timestamp: '2021-09-29T16:08:15+01:00',
          count: 2,
        },
        {
          timestamp: '2021-09-29T16:09:15+01:00',
          count: 15,
        },
      ],
    });

    const nonexistentDeviceId = chance.guid();

    expect(() => service.findOne(nonexistentDeviceId)).toThrow();
  });
});
