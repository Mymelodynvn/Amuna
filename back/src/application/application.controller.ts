// ...existing code...
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
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Aplicaciones')
@ApiBearerAuth()
 @Controller('application')
 export class ApplicationController {
   constructor(private readonly applicationService: ApplicationService) {}

   @UseGuards(AuthGuard('jwt'), RolesGuard)
   @RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
   @Get('getApplicationByProfile/:uuid')
   @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener aplicaciones por perfil (ID numérico)' })
  @ApiParam({ name: 'uuid', description: 'Identificador del perfil (número)', example: 1 })
  @ApiResponse({ status: 200, description: 'Aplicaciones obtenidas correctamente.' })
  @ApiResponse({ status: 404, description: 'No se encontraron aplicaciones.' })
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
  @ApiOperation({ summary: 'Obtener una aplicación por UUID' })
  @ApiParam({ name: 'uuid', description: 'UUID de la aplicación', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'Aplicación obtenida correctamente.' })
  @ApiResponse({ status: 404, description: 'Aplicación no encontrada.' })
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
  @ApiOperation({ summary: 'Crear una nueva aplicación' })
  @ApiBody({ type: CreateApplicationDto })
  @ApiResponse({ status: 201, description: 'Aplicación creada correctamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
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
  @ApiOperation({ summary: 'Actualizar estado de una aplicación' })
  @ApiParam({ name: 'uuid', description: 'UUID de la aplicación a actualizar', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiBody({ type: UpdateStatusDto })
  @ApiResponse({ status: 200, description: 'Estado actualizado correctamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
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
  @ApiOperation({ summary: 'Eliminar (soft) una aplicación por UUID' })
  @ApiParam({ name: 'uuid', description: 'UUID de la aplicación a eliminar', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'Aplicación eliminada correctamente.' })
  @ApiResponse({ status: 404, description: 'Aplicación no encontrada.' })
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