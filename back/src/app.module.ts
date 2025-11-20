import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService, DataLoaderUsers } from './app.service';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialsModule } from './credentials/credentials.module';
import { User } from './entities/users.entity';
import { Credential } from './entities/credentials.entity';
import { JwtModule } from '@nestjs/jwt';
import { JobOfferModule } from './job-offer/job-offer.module';
import { ApplicantProfileModule } from './applicant-profile/applicant-profile.module';
import { EntrepreneurProfileModule } from './entrepreneur-profile/entrepreneur-profile.module';
import { ApplicationModule } from './application/application.module';
import { CategoriesModule } from './categories/categories.module';
import { CourseModule } from './course/course.module';
import { PublicationModule } from './publication/publication.module';
import { UserCourseModule } from './user-course/user-course.module';
import { CompanyProfileModule } from './company-profile/company-profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm') ?? {},
    }),
    TypeOrmModule.forFeature([User, Credential]),
    UserModule,
    AuthModule,
    CredentialsModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    JobOfferModule,
    EntrepreneurProfileModule,
    ApplicantProfileModule,
    ApplicationModule,
    CategoriesModule,
    CourseModule,
    PublicationModule,
    UserCourseModule,
    CompanyProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService, DataLoaderUsers],
})
export class AppModule {}
