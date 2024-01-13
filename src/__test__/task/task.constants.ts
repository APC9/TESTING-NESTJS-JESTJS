import { CreateTaskDto } from '../../task/dto/create-task.dto';
import { Itask } from '../../../dist/task/interfaces/task.interface';

export const _createTaskDto: CreateTaskDto = {
  description: 'describe tasks',
  isDone: false,
};

export const _mockTask: Itask = {
  id: expect.any(String),
  description: expect.any(String),
  isDone: expect.any(Boolean),
};
