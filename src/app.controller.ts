import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  getHealth() {
    return { status: 'ok' };
  }

  @Get()
  getHome() {
    return {
      name: 'Task API',
      message: 'Target project for Coding-Task Runner',
      endpoints: ['/tasks'],
    };
  }
}
