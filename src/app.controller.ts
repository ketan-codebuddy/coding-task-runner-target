import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHome() {
    return {
      name: 'Task API',
      message: 'Target project for Coding-Task Runner',
      endpoints: ['/tasks'],
    };
  }

  @Get('api/info')
  getInfo() {
    return {
      name: 'Task API',
      timestamp: new Date().toISOString(),
    };
  }
}
