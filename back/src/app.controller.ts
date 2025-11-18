import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Credential } from './entities/credentials.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { CredentialsModule } from './credentials/credentials.module';
import { UserCourseModule } from './user-course/user-course.module';
import { CourseModule } from './course/course.module';
import { PublicationModule } from './publication/publication.module';
import { ApplicantProfileModule } from './applicant-profile/applicant-profile.module';
import { EntrepreneurProfileModule } from './entrepreneur-profile/entrepreneur-profile.module';
import { CompanyProfileModule } from './company-profile/company-profile.module';
import { JobOfferModule } from './job-offer/job-offer.module';
import { ApplicationModule } from './application/application.module';
import { CategoriesModule } from './categories/categories.module';
import typeOrmConfig from './config/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
       load: [typeOrmConfig],
    }),

    // LOG dentro de useFactory para ver cuándo se ejecuta y qué devuelve ConfigService
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const cfg = config.get('typeorm');
        console.log('[AppModule] ConfigService.get("typeorm") =>', {
          host: cfg?.host ?? 'undefined',
          database: cfg?.database ?? 'undefined',
          port: cfg?.port ?? 'undefined',
          username: cfg?.username ?? 'undefined',
          passwordSet: cfg?.password,
        });
        if (!cfg) {
          console.warn('[AppModule] ConfigService.get("typeorm") returned undefined — returning empty object to avoid crash');
        }
        return cfg ?? {};
      },
    }),
      
    UserModule,
    CredentialsModule,
    UserCourseModule,
    CourseModule,
    PublicationModule,
    ApplicantProfileModule,
    EntrepreneurProfileModule,
    CompanyProfileModule,
    JobOfferModule,
    ApplicationModule,
    CategoriesModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
