import { HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateMemberDto } from 'src/membersip/dto/CreateMember.dto';
import Messages from 'src/utils/message';

@Injectable()
export class MembershipService {
  constructor(private databaseService: DatabaseService) {}
  async createMembership(CreateMemberDto: CreateMemberDto) {
    console.log(`CreateMemberDto: ${JSON.stringify(CreateMemberDto)}`);
    const membership = await this.databaseService.membership.create({
      data: {
        title: CreateMemberDto.title,
        slogan: CreateMemberDto.slogan,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        telegram: CreateMemberDto.telegram
          ? JSON.parse(JSON.stringify(CreateMemberDto.telegram))
          : undefined,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        viber: CreateMemberDto.viber
          ? JSON.parse(JSON.stringify(CreateMemberDto.viber))
          : undefined,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        messenger: CreateMemberDto.messenger
          ? JSON.parse(JSON.stringify(CreateMemberDto.messenger))
          : undefined,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        facebook: CreateMemberDto.facebook
          ? JSON.parse(JSON.stringify(CreateMemberDto.facebook))
          : undefined,
      },
    });
    return {
      status: HttpStatus.CREATED,
      message: Messages.created,
      data: membership,
    };
  }
}
