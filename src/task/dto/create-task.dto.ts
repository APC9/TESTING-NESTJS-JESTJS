import { IsBoolean, IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(5)
  readonly description: string;

  @IsBoolean()
  readonly isDone: boolean;
}
