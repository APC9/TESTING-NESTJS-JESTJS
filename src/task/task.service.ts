import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Itask } from './interfaces/task.interface';

@Injectable()
export class TaskService {
  task: Itask[] = [];
  create(createTaskDto: CreateTaskDto): Itask {
    const { description, isDone } = createTaskDto;
    const task = {
      id: uuidv4(),
      description,
      isDone,
    };
    this.task.push(task);
    return task;
  }

  findAll() {
    return this.task;
  }

  findOne(id: string) {
    const task = this.task.find((t) => t.id === id);
    if (!task) throw new NotFoundException(`Task not found`);
    return task;
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = {
      id,
      ...updateTaskDto,
    };
    const taskIndex = this.task.findIndex((t) => t.id === id);
    //if (taskIndex === -1) null;

    this.task[taskIndex] = task;
    return task;
  }

  remove(id: string) {
    this.task = this.task.filter((t) => t.id !== id);
    return this.task;
  }
}
