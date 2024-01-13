import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from '../../task/task.controller';
import { TaskService } from '../../task/task.service';
import { UpdateTaskDto } from '../../task/dto/update-task.dto';
import { TaskServiceMock } from './task-service-mock';
import { _createTaskDto, _mockTask } from './task.constants';

describe('TaskController', () => {
  let taskController: TaskController;
  let mockTaskService: TaskService;

  beforeEach(async () => {
    const TaskServiceProvider = {
      provide: TaskService,
      useClass: TaskServiceMock,
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService, TaskServiceProvider],
    })
      .overrideProvider(TaskService)
      .useValue(mockTaskService)
      .compile();

    taskController = app.get<TaskController>(TaskController);
    mockTaskService = app.get<TaskService>(TaskService);
  });

  const createTaskDto = _createTaskDto;
  const mockTask = _mockTask;

  describe('TaskController', () => {
    it('should be defined', () => {
      expect(taskController).toBeDefined();
    });

    it('should create a task', async () => {
      const createdTask = await taskController.create(createTaskDto);

      const createSpy = jest.spyOn(mockTaskService, 'create'); // Espía el método create
      taskController.create(createTaskDto);

      expect(createdTask).toEqual(mockTask);
      expect(createSpy).toHaveBeenCalledWith(createTaskDto);
    });

    it('should update a task', async () => {
      const createTask = taskController.create(createTaskDto);
      const updateTask = await taskController.update(createTask.id, {
        isDone: true,
      } as UpdateTaskDto);

      const updateSpy = jest.spyOn(mockTaskService, 'update');
      taskController.update(expect.any(String), {
        isDone: true,
      } as UpdateTaskDto);

      expect(updateTask).toEqual(mockTask);
      expect(updateSpy).toHaveBeenCalledWith(updateTask.id, {
        isDone: true,
      });
    });

    it('should findOne a Task', async () => {
      const createTask = taskController.create(createTaskDto);
      const getTask = await taskController.findOne(createTask.id);

      const getTaskSpy = jest.spyOn(mockTaskService, 'findOne');
      taskController.findOne(expect.any(String));

      expect(getTask).toEqual(mockTask);
      expect(getTaskSpy).toHaveBeenCalledWith(expect.any(String));
    });

    it('should findAll a Task[]', async () => {
      taskController.create(createTaskDto);
      const getTasks = await taskController.findAll();

      const getTasksSpy = jest.spyOn(mockTaskService, 'findAll');
      taskController.findAll();

      expect(getTasks).toEqual([mockTask]);
      expect(getTasksSpy).toHaveBeenCalled();
    });

    it('should remove a []', async () => {
      const createTask = taskController.create(createTaskDto);
      const removeTask = await taskController.remove(createTask.id);

      const removeTaskSpy = jest.spyOn(mockTaskService, 'remove');
      taskController.remove(expect.any(String));

      expect(removeTask).toEqual([]);
      expect(removeTaskSpy).toHaveBeenCalledWith(expect.any(String));
    });
  });
});
