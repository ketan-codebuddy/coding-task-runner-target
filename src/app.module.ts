import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { TasksModule } from './tasks/tasks.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { TasksController } from './tasks/tasks.controller';

@Module({
  imports: [TasksModule],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(TasksController);
  }
}
