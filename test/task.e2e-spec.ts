import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { _createTaskDto, _mockTask } from '../src/__test__/task/task.constants';
import { TaskModule } from '../src/task/task.module';

describe('TaskController (e2e)', () => {
  let app: INestApplication;
  const createTaskDto = _createTaskDto;
  const mockTask = _mockTask;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TaskModule],
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

  it('/ (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/task')
      .expect(200);

    expect(response.body).toEqual([]);
  });
});
