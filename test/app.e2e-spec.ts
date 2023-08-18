import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
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
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/device-readings (POST)', () => {
    describe('4xx', () => {
      it('should return 400 when data is malformed', () => {
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
          .expect(400)
          .expect('Should include device ID');
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
          .post('device-readings')
          .send(deviceReading)
          .expect(201);
      });
    });
  });
});
