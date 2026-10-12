import { TaskStatus } from '../task.types';

export class UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
}
