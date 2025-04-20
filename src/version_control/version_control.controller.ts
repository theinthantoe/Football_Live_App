import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VersionControlService } from './version_control.service';
import { CreateVersionControlDto } from './dto/create-version_control.dto';

@Controller('version-control')
export class VersionControlController {
  constructor(private versionControlService: VersionControlService) {}

  @Post('create')
  create(@Body() createVersionControlDto: CreateVersionControlDto) {
    return this.versionControlService.create(createVersionControlDto);
  }

  @Get('list')
  findAll() {
    return this.versionControlService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.versionControlService.findOne(id);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateVersionControlDto: Partial<CreateVersionControlDto>,
  ) {
    return this.versionControlService.update(id, updateVersionControlDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.versionControlService.remove(id);
  }
}
