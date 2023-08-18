import { Test, TestingModule } from '@nestjs/testing';
import { DeviceReadingsController } from 'src/devices/devices.controller';
import { DeviceReadingsService } from './device-readings.service';

describe('DevicesController', () => {
  let controller: DeviceReadingsController;
  let service: DeviceReadingsService

  beforeEach(async () => {
    
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceReadingsController],
      providers: [{ provide: DeviceReadingsService, useValue: { store: jest.fn() }}],
    }).compile();

    controller = module.get<DeviceReadingsController>(DeviceReadingsController);
    service = module.get<DeviceReadingsService>(DeviceReadingsService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should invoke DevicesService.storeDeviceReadings', () => {
  
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
    controller.store(deviceReading)

    const storeSpy = jest.spyOn(service, 'store');

    expect(storeSpy).toBeCalledTimes(1)
  })
});
