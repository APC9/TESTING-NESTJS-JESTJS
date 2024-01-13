import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { UpdateTaskDto } from 'src/task/dto/update-task.dto';
import { Itask } from 'src/task/interfaces/task.interface';

export class TaskServiceMock {
  public createTaskDto: CreateTaskDto = {
    description: 'describe tasks',
    isDone: false,
  };

  mockTask: Itask = {
    id: expect.any(String),
    description: expect.any(String),
    isDone: expect.any(Boolean),
  };

  async create(createTask: CreateTaskDto): Promise<Itask> {
    return Promise.resolve({
      id: (Math.random() * (1000 - 1) + 1).toString(),
      ...createTask,
    });
  }

  async update(id: string, updateTask: UpdateTaskDto): Promise<Itask> {
    id;
    updateTask;
    return Promise.resolve({
      id: (Math.random() * (1000 - 1) + 1).toString(),
      description: expect.any(String),
      isDone: expect.any(Boolean),
    });
  }

  async findOne(id: string): Promise<Itask> {
    id;
    return Promise.resolve({
      id: (Math.random() * (1000 - 1) + 1).toString(),
      description: expect.any(String),
      isDone: expect.any(Boolean),
    });
  }

  async findAll(): Promise<Itask[]> {
    return Promise.resolve([
      {
        id: (Math.random() * (1000 - 1) + 1).toString(),
        description: expect.any(String),
        isDone: expect.any(Boolean),
      },
    ]);
  }

  async remove(id: string): Promise<[]> {
    id;
    return Promise.resolve([]);
  }
}
