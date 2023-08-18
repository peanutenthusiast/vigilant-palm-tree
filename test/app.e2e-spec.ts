import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Chance } from 'chance';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let chance: Chance;

  beforeAll(async () => {
    chance = Chance();
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/device-readings/:id (GET)', () => {
    beforeEach(() => {
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

      return request(app.getHttpServer())
        .post('/device-readings')
        .send(deviceReading);
    });
    describe('4xx', () => {
      it('should return 404 when nonexistent device id is passed', () => {
        const nonexistentId = chance.guid();
        return request(app.getHttpServer())
          .get('/device-readings/' + nonexistentId)
          .expect(404);
      });
    });
  });

  describe('/device-readings (POST)', () => {
    describe('4xx', () => {
      describe('should return 400 when data is malformed', () => {
        it('has no device id', () => {
          const deviceReadingWithoutId = {
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

          return request(app.getHttpServer())
            .post('/device-readings')
            .send(deviceReadingWithoutId)
            .expect(400);
        });
      });

      it('has empty readings', () => {
        const deviceReadingWithoutReadings = {
          id: '36d5658a-6908-479e-887e-a949ec199272',
          readings: [],
        };

        return request(app.getHttpServer())
          .post('/device-readings')
          .send(deviceReadingWithoutReadings)
          .expect(400);
      });

      it('has a reading with a malformed date string', () => {
        const deviceReadingWithMalformedDate = {
          id: '36d5658a-6908-479e-887e-a949ec199272',
          readings: [
            {
              timestamp: '2021/9/13',
              count: 2,
            },
            {
              timestamp: '2021-09-29T16:09:15+01:00',
              count: 15,
            },
          ],
        };

        return request(app.getHttpServer())
          .post('/device-readings')
          .send(deviceReadingWithMalformedDate)
          .expect(400);
      });

      it('has a reading with a negative number', () => {
        const deviceReadingWithNegCount = {
          id: '36d5658a-6908-479e-887e-a949ec199272',
          readings: [
            {
              timestamp: '2021-09-29T16:08:15+01:00',
              count: 2,
            },
            {
              timestamp: '2021-09-29T16:09:15+01:00',
              count: -15,
            },
          ],
        };

        return request(app.getHttpServer())
          .post('/device-readings')
          .send(deviceReadingWithNegCount)
          .expect(400);
      });
    });
  });

  describe('2xx', () => {
    it('successfully stores device readings', () => {
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

      return request(app.getHttpServer())
        .post('/device-readings')
        .send(deviceReading)
        .expect(201);
    });
  });
});
