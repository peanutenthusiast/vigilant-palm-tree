import { Test, TestingModule } from '@nestjs/testing';
import { DeviceReadingsService } from './device-readings.service';
import { DeviceReadingsController } from './device-readings.controller';
import { Chance } from 'chance';

describe('DevicesController', () => {
  let controller: DeviceReadingsController;
  let service: DeviceReadingsService;
  let findOneMock: jest.Mock;
  let chance: Chance;

  beforeEach(async () => {
    findOneMock = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceReadingsController],
      providers: [
        {
          provide: DeviceReadingsService,
          useValue: { store: jest.fn(), findOne: findOneMock },
        },
      ],
    }).compile();

    chance = new Chance();

    controller = module.get<DeviceReadingsController>(DeviceReadingsController);
    service = module.get<DeviceReadingsService>(DeviceReadingsService);
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
    controller.store(deviceReading);

    const storeSpy = jest.spyOn(service, 'store');

    expect(storeSpy).toBeCalledTimes(1);
  });

  it('should throw an error when nonexistent device id is passed to findOne', () => {
    findOneMock.mockImplementation((id) => {
      throw new Error('cannot find device for id ' + id);
    });

    expect(() => controller.findOne(chance.guid)).toThrow();
  });
});
