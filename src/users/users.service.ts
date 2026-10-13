import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.types';

@Injectable()
export class UsersService {
  private nextId = 2;
  private readonly users: User[] = [
    {
      id: 1,
      name: 'Demo User',
      email: 'demo@example.com',
      createdAt: new Date().toISOString(),
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((item) => item.id === id);
    if (!user) throw new NotFoundException(`User ${id} was not found`);
    return user;
  }

  create(input: CreateUserDto): User {
    const user: User = {
      id: this.nextId++,
      name: input.name,
      email: input.email,
      createdAt: new Date().toISOString(),
    };
    this.users.push(user);
    return user;
  }

  update(id: number, input: UpdateUserDto): User {
    const user = this.findOne(id);
    Object.assign(user, input);
    return user;
  }

  remove(id: number): { deleted: true; id: number } {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException(`User ${id} was not found`);
    this.users.splice(index, 1);
    return { deleted: true, id };
  }
}
