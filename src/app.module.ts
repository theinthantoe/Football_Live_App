import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { VersionControlModule } from './version_control/version_control.module';
import { MembershipModule } from 'src/membersip/membership.module';
import { SplashBannerModule } from './splash_banner/splash_banner.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    VersionControlModule,
    MembershipModule,
    SplashBannerModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
