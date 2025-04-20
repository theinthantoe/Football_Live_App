import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateMemberDto, SocialMedia } from './dto/CreateMember.dto';
import { Express } from 'express';
import { UpdateMemberDto } from 'src/membersip/dto/UpdateMember.dto';
import Messages from 'src/utils/message';

@Injectable()
export class MembershipService {
  constructor(private databaseService: DatabaseService) {}

  private fileToBase64(files: Express.Multer.File[], field: string): string {
    const file = files.find((f) => f.fieldname === `${field}.icon`);
    return file
      ? `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
      : '';
  }

  private tryParseJson<T>(value: any): T | undefined {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return undefined;
    }
  }
  private buildSocialBlock(
    files: Express.Multer.File[],
    field: string,
    rawData: any,
    existing?: SocialMedia | null,
  ): Record<string, any> | undefined {
    const data = this.tryParseJson<SocialMedia>(rawData);

    if (!data?.link) return existing ?? undefined;

    return {
      icon: this.fileToBase64(files, field) || existing?.icon || '',
      link: data.link,
    };
  }

  async createMembership(
    rawDto: CreateMemberDto,
    files: Express.Multer.File[],
  ) {
    const dto: CreateMemberDto = {
      title: rawDto.title,
      slogan: rawDto.slogan,
      telegram: this.tryParseJson<SocialMedia>(rawDto.telegram),
      viber: this.tryParseJson<SocialMedia>(rawDto.viber),
      messenger: this.tryParseJson<SocialMedia>(rawDto.messenger),
      facebook: this.tryParseJson<SocialMedia>(rawDto.facebook),
    };

    const membership = await this.databaseService.membership.create({
      data: {
        title: dto.title,
        slogan: dto.slogan,
        telegram: this.buildSocialBlock(files, 'telegram', rawDto.telegram),
        viber: this.buildSocialBlock(files, 'viber', rawDto.viber),
        messenger: this.buildSocialBlock(files, 'messenger', rawDto.messenger),
        facebook: this.buildSocialBlock(files, 'facebook', rawDto.facebook),
      },
    });

    return {
      status: HttpStatus.CREATED,
      message: 'Membership created successfully.',
      data: membership,
    };
  }

  async findMany() {
    try {
      const data = await this.databaseService.membership.findMany();
      return {
        status: HttpStatus.OK,
        message: Messages.getAll,
        data,
      };
    } catch (error) {
      throw new HttpException(
        Messages.internalError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateMembership(
    id: string,
    rawDto: UpdateMemberDto,
    files: Express.Multer.File[],
  ) {
    const existing = await this.databaseService.membership.findUnique({
      where: { id },
    });

    if (!existing)
      throw new HttpException('Membership not found', HttpStatus.NOT_FOUND);

    const updatedData = {
      title: rawDto.title ?? existing.title,
      slogan: rawDto.slogan ?? existing.slogan,
      telegram: this.buildSocialBlock(
        files,
        'telegram',
        rawDto.telegram,
        existing.telegram as SocialMedia | null,
      ),
      viber: this.buildSocialBlock(
        files,
        'viber',
        rawDto.viber,
        existing.viber as SocialMedia | null,
      ),
      messenger: this.buildSocialBlock(
        files,
        'messenger',
        rawDto.messenger,
        existing.messenger as SocialMedia | null,
      ),
      facebook: this.buildSocialBlock(
        files,
        'facebook',
        rawDto.facebook,
        existing.facebook as SocialMedia | null,
      ),
    };

    const membership = await this.databaseService.membership.update({
      where: { id },
      data: updatedData,
    });

    return {
      status: HttpStatus.OK,
      message: 'Membership updated successfully.',
      data: membership,
    };
  }

  async deleteMembership(id: string) {
    try {
      const existingData = await this.databaseService.membership.findUnique({
        where: { id },
      });
      if (!existingData)
        throw new HttpException('Membership not found', HttpStatus.NOT_FOUND);

      await this.databaseService.membership.delete({ where: { id } });

      return {
        status: HttpStatus.OK,
        message: Messages.deleted,
        data: null,
      };
    } catch (error) {
      throw new HttpException(
        Messages.internalError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
