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
});
