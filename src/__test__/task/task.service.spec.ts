import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../../task/task.service';
import { _createTaskDto, _mockTask } from './task.constants';
import { Itask } from '../../../dist/task/interfaces/task.interface';
import { NotFoundException } from '@nestjs/common';
import { UpdateTaskDto } from '../../task/dto/update-task.dto';

describe('TaskService', () => {
  let taskService: TaskService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    }).compile();

    taskService = app.get<TaskService>(TaskService);
  });

  const createTaskDto = _createTaskDto;
  const mockTask = _mockTask;

  it('should be defined', () => {
    expect(taskService).toBeDefined();
  });

  it('createTask must create a task', () => {
    const createTask = taskService.create(createTaskDto);
    expect(createTask).toBeTruthy();
    expect(createTask).toEqual(mockTask);
  });

  it('createTask has been called with CreateTaskDto', () => {
    const createSpy = jest.spyOn(taskService, 'create'); // Espía el método create
    taskService.create(createTaskDto);

    expect(createSpy).toHaveBeenCalled(); // Verifica si create ha sido llamado
    expect(createSpy).toHaveBeenCalledWith(createTaskDto);
    createSpy.mockReset(); // Restaura el método create después de la prueba
  });

  it('findAll must return a arry of task', () => {
    taskService.create(createTaskDto);
    const findAllTask = taskService.findAll();
    expect(findAllTask).toEqual([mockTask]);
  });

  it('findOne must return a task', () => {
    const task: Itask = taskService.create(createTaskDto);
    const findOneTask = taskService.findOne(task.id);
    expect(findOneTask).toEqual(mockTask);
  });

  it('findOne must return NotFoundException("Task not found")', () => {
    taskService.create(createTaskDto);
    try {
      taskService.findOne('task.id');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Task not found');
    }
  });

  it('findOne has been called with id:string', () => {
    const task: Itask = taskService.create(createTaskDto);
    const createSpy = jest.spyOn(taskService, 'findOne'); // Espía el método findOne
    taskService.findOne(task.id);

    expect(createSpy).toHaveBeenCalled(); // Verifica si findOne ha sido llamado
    expect(createSpy).toHaveBeenCalledWith(task.id); // Verifica si findOne ha sido llamado con un id
    createSpy.mockReset(); // Restaura el método create después de la prueba
  });
  it('update has been called with id:string and CreateTaskDto', () => {
    const task: Itask = taskService.create(createTaskDto);
    const createSpy = jest.spyOn(taskService, 'update'); // Espía el método update

    taskService.update(task.id, {
      description: 'new description',
    } as UpdateTaskDto);

    expect(createSpy).toHaveBeenCalled(); // Verifica si findOne ha sido llamado
    expect(createSpy).toHaveBeenCalledWith(task.id, {
      description: 'new description',
    });
    createSpy.mockReset(); // Restaura el método create después de la prueba
  });

  it('update must return the task with the updated description" ', () => {
    const task: Itask = taskService.create(createTaskDto);
    const createSpy = jest.spyOn(taskService, 'update'); // Espía el método update

    const taskUpdate = taskService.update(task.id, {
      description: 'new description',
    } as UpdateTaskDto);

    expect(taskUpdate.description).toBe('new description');
    createSpy.mockReset(); // Restaura el método create después de la prueba
  });

  it('remove has been called with id:string', () => {
    const task: Itask = taskService.create(createTaskDto);
    const createSpy = jest.spyOn(taskService, 'remove'); // Espía el método findOne
    taskService.remove(task.id);

    expect(createSpy).toHaveBeenCalled(); // Verifica si findOne ha sido llamado
    expect(createSpy).toHaveBeenCalledWith(task.id); // Verifica si findOne ha sido llamado con un id
    createSpy.mockReset(); // Restaura el método create después de la prueba
  });

  it('remove must return []', () => {
    const task: Itask = taskService.create(createTaskDto);
    const removeTask = taskService.remove(task.id);
    expect(removeTask).toEqual([]);
  });
});
