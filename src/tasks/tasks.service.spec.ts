import { NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    service = new TasksService();
  });

  it('returns the initial tasks', () => {
    expect(service.findAll()).toHaveLength(2);
  });

  it('creates a task with the default todo status', () => {
    const task = service.create({ title: 'Try coding-task-runner' });
    expect(task.title).toBe('Try coding-task-runner');
    expect(task.status).toBe('todo');
  });

  it('filters tasks by status', () => {
    expect(service.findAll('in_progress')).toHaveLength(1);
  });

  it('throws when a task does not exist', () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });
});
