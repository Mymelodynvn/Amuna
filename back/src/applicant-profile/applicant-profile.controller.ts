import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApplicantProfileService } from './applicant-profile.service';
import { CreateApplicantProfileDto } from './Dtos/createApplicantProfile.dto';
import { UpdateApplicantProfileDto } from './Dtos/updateApplicantProfile.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/enum/roles.enum';
import { RolesDecorator } from 'src/decorators/roles.decorator';

@Controller('applicant-profile')
export class ApplicantProfileController {
  constructor(
    private readonly applicantProfileService: ApplicantProfileService,
  ) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
  @Get('getAllApplicantProfiles')
  @HttpCode(HttpStatus.OK)
  async getAllApplicantProfiles() {
    const profiles =
      await this.applicantProfileService.getAllApplicantProfilesService();
    return {
      statusCode: HttpStatus.OK,
      message: 'Applicant profiles retrieved successfully',
      data: profiles,
    };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('getApplicantProfileById/:uuid')
  @HttpCode(HttpStatus.OK)
  async getApplicantProfileById(@Param('uuid') uuid: string) {
    const profile =
      await this.applicantProfileService.getApplicantProfileByIdService(uuid);

    return {
      statusCode: HttpStatus.OK,
      message: 'Applicant profile retrieved successfully',
      data: profile,
    };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('createApplicantProfile')
  @HttpCode(HttpStatus.CREATED)
  async postCreateApplicantProfile(
    @Body() createApplicantDto: CreateApplicantProfileDto,
    @Req() req,
  ) {
    const userUuid = req.user.uuid;
    const profile =
      await this.applicantProfileService.postCreateApplicantProfileService(
        createApplicantDto,
        userUuid,
      );

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Applicant profile created successfully',
      data: profile,
    };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put('updateApplicantProfile')
  @HttpCode(HttpStatus.OK)
  async putUpdateApplicantProfile(
    @Body() updateApplicantDto: UpdateApplicantProfileDto,
  ) {
    const updated =
      await this.applicantProfileService.putUpdateApplicantProfileService(
        updateApplicantDto,
      );

    return {
      statusCode: HttpStatus.OK,
      message: 'Applicant profile updated successfully',
      data: updated,
    };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete('deleteApplicantProfile/:uuid')
  @HttpCode(HttpStatus.OK)
  async deleteApplicantProfile(@Param('uuid') uuid: string) {
    const deleted =
      await this.applicantProfileService.deleteApplicantProfileService(uuid);

    return {
      statusCode: HttpStatus.OK,
      message: 'Applicant profile deleted successfully',
      data: deleted,
    };
  }
}
