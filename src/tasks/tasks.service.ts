import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './task.types';

@Injectable()
export class TasksService {
  private nextId = 3;
  private readonly tasks: Task[] = [
    { id: 1, title: 'Explore the API', description: 'Call the existing endpoints', status: 'todo', createdAt: new Date().toISOString() },
    { id: 2, title: 'Write a test', description: 'Add a test for a new feature', status: 'in_progress', createdAt: new Date().toISOString() },
  ];

  findAll(status?: TaskStatus): Task[] {
    if (!status) return this.tasks;
    return this.tasks.filter((task) => task.status === status);
  }

  findOne(id: number): Task {
    const task = this.tasks.find((item) => item.id === id);
    if (!task) throw new NotFoundException(`Task ${id} was not found`);
    return task;
  }

  create(input: CreateTaskDto): Task {
    const task: Task = {
      id: this.nextId++,
      title: input.title,
      description: input.description,
      status: input.status ?? 'todo',
      createdAt: new Date().toISOString(),
    };
    this.tasks.push(task);
    return task;
  }

  update(id: number, input: UpdateTaskDto): Task {
    const task = this.findOne(id);
    Object.assign(task, input);
    return task;
  }

  remove(id: number): { deleted: true; id: number } {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) throw new NotFoundException(`Task ${id} was not found`);
    this.tasks.splice(index, 1);
    return { deleted: true, id };
  }
}
