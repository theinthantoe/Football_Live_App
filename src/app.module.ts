import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { VersionControlModule } from './version_control/version_control.module';

@Module({
  imports: [UsersModule, DatabaseModule, VersionControlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
