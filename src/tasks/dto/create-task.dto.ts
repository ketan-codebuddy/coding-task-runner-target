import { TaskStatus } from '../task.types';

export class CreateTaskDto {
  title!: string;
  description?: string;
  status?: TaskStatus;
}
