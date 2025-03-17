import { Module } from '@nestjs/common';
import { VersionControlService } from './version_control.service';
import { VersionControlController } from './version_control.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [VersionControlController],
  providers: [VersionControlService],
})
export class VersionControlModule {}
