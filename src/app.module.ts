import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { VersionControlModule } from './version_control/version_control.module';
import { MembershipModule } from 'src/membersip/membership.module';
import { SplashBannerModule } from './splash_banner/splash_banner.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    VersionControlModule,
    MembershipModule,
    SplashBannerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
