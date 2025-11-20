// ...existing code...
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

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Perfiles de Aspirantes')
@ApiBearerAuth()
@Controller('applicant-profile')
export class ApplicantProfileController {
  constructor(
    private readonly applicantProfileService: ApplicantProfileService,
  ) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
  @Get('getAllApplicantProfiles')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todos los perfiles de aspirantes' })
  @ApiResponse({ status: 200, description: 'Perfiles obtenidos correctamente.' })
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
  @ApiOperation({ summary: 'Obtener perfil de aspirante por UUID' })
  @ApiParam({ name: 'uuid', description: 'UUID del perfil', type: String })
  @ApiResponse({ status: 200, description: 'Perfil obtenido correctamente.' })
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
  @ApiOperation({ summary: 'Crear perfil de aspirante' })
  @ApiBody({ type: CreateApplicantProfileDto })
  @ApiResponse({ status: 201, description: 'Perfil creado correctamente.' })
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
  @ApiOperation({ summary: 'Actualizar perfil de aspirante' })
  @ApiBody({ type: UpdateApplicantProfileDto })
  @ApiResponse({ status: 200, description: 'Perfil actualizado correctamente.' })
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
  @ApiOperation({ summary: 'Eliminar (soft) perfil de aspirante' })
  @ApiParam({ name: 'uuid', description: 'UUID del perfil a eliminar', type: String })
  @ApiResponse({ status: 200, description: 'Perfil eliminado correctamente.' })
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
// ...existing code...