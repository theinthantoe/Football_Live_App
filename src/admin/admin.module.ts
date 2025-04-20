import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [DatabaseModule],
  exports: [AdminService],
})
export class AdminModule {}
