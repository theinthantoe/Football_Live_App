import { Body, Controller, Post } from '@nestjs/common';
import { MembershipService } from 'src/membersip/membership.service';
import { CreateMemberDto } from 'src/membersip/dto/CreateMember.dto';

@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}
  @Post()
  createMember(@Body() data: CreateMemberDto) {
    console.log('hello');
    return this.membershipService.createMembership(data);
  }
}
