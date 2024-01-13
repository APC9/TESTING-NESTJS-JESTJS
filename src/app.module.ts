import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TaskController } from './task/task.controller';

@Module({
  imports: [TaskModule],
  controllers: [],
  providers: [TaskController],
})
export class AppModule {}
