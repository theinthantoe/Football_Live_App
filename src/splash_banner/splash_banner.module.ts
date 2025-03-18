import { Module } from '@nestjs/common';
import { SplashBannerService } from './splash_banner.service';
import { SplashBannerController } from './splash_banner.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SplashBannerController],
  providers: [SplashBannerService],
})
export class SplashBannerModule {}
