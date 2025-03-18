import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MembershipController } from 'src/membersip/membership.controller';
import { MembershipService } from 'src/membersip/membership.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MembershipController],
  providers: [MembershipService],
})
export class MembershipModule {}
