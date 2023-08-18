import { Test, TestingModule } from '@nestjs/testing';
import { DeviceReadingsService } from './device-readings.service';

describe('DeviceReadingsService', () => {
  let service: DeviceReadingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceReadingsService],
    }).compile();

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

    service.store(deviceReading)
    const { readings } = service.findOne(deviceReading.id)

    expect(readings).toEqual(deviceReading.readings)

  })

  it('should not update the count for preexisting timestamps per a device id', () => {
    
  })
});
