import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './Dtos/createApplication.dto';
import { ApplicationStatus } from 'src/enum/application.enum';
import { UpdateStatusDto } from './Dtos/updateStatus.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RolesDecorator } from 'src/decorators/roles.decorator';
import { Roles } from 'src/enum/roles.enum';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
  @Get('getApplicationByProfile/:uuid')
  @HttpCode(HttpStatus.OK)
  async getApplicationByProfile(@Param('uuid', ParseIntPipe) uuid: string) {
    const application =
      await this.applicationService.getApplicationByProfileService(uuid);

    return {
      statusCode: 200,
      message: 'Aplicación obtenida correctamente',
      data: application,
    };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('getApplicationById/:uuid')
  @HttpCode(HttpStatus.OK)
  async getApplicationById(@Param('uuid', ParseUUIDPipe) uuid: string) {
    const application =
      await this.applicationService.getApplicationByIdService(uuid);

    return {
      statusCode: 200,
      message: 'Aplicación obtenida correctamente',
      data: application,
    };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('createApplication')
  @HttpCode(HttpStatus.CREATED)
  async postCreateApplication(
    @Body() createApplicationDto: CreateApplicationDto,
  ) {
    const application =
      await this.applicationService.postCreateApplicationService(
        createApplicationDto,
      );

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Application created successfully',
      data: application,
    };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put('updateApplicationStatus/:uuid')
  @HttpCode(HttpStatus.OK)
  async updateApplicationStatus(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateStatusdto: UpdateStatusDto,
  ) {
    const updated =
      await this.applicationService.updateApplicationStatusService(
        uuid,
        updateStatusdto,
      );

    return {
      statusCode: HttpStatus.OK,
      message: 'Application status updated successfully',
      data: updated,
    };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete('deleteApplication/:uuid')
  @HttpCode(HttpStatus.OK)
  async deleteApplication(@Param('uuid', ParseUUIDPipe) uuid: string) {
    const deleted =
      await this.applicationService.deleteApplicationService(uuid);

    return {
      statusCode: HttpStatus.OK,
      message: 'Application deleted successfully',
      data: deleted,
    };
  }
}
