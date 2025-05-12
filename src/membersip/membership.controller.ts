import {
  Controller,
  Post,
  UploadedFiles,
  Body,
  UseInterceptors,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { MembershipService } from './membership.service';
import { CreateMemberDto } from './dto/CreateMember.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { UpdateMemberDto } from 'src/membersip/dto/UpdateMember.dto';

@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Post('create')
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @Body() dto: CreateMemberDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.membershipService.createMembership(dto, files);
  }
  @Get('list')
  findMany() {
    return this.membershipService.findMany();
  }
  @Patch('update/:id')
  @UseInterceptors(AnyFilesInterceptor())
  update(
    @Body() dto: UpdateMemberDto,
    @Param('id') id: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.membershipService.updateMembership(id, dto, files);
  }
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.membershipService.deleteMembership(id);
  }
}
