import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberDto } from 'src/membersip/dto/CreateMember.dto';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {}
