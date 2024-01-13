import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateTaskDto } from '../src/task/dto/create-task.dto';
import { Itask } from '../dist/task/interfaces/task.interface';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const createTaskDto: CreateTaskDto = {
    description: 'describe tasks',
    isDone: false,
  };

  const mockTask: Itask = {
    id: expect.any(String),
    description: expect.any(String),
    isDone: expect.any(Boolean),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/task')
      .send(createTaskDto)
      .expect(201);

    expect(response.body).toEqual(mockTask);
  });
});
