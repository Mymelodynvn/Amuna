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
import { EntrepreneurProfileService } from './entrepreneur-profile.service';
import { CreateEntrepreneurProfileDto } from './Dtos/createEntrepreneurProfile.dto';
import { UpdateEntrepreneurProfileDto } from './Dtos/updateEntrepreneurProfile.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/enum/roles.enum';
import { RolesDecorator } from 'src/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Perfiles de Emprendedores')
@ApiBearerAuth()
@Controller('entrepreneur-profile')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class EntrepreneurProfileController {
  constructor(private readonly entrepreneurProfileService: EntrepreneurProfileService) {}

  @Get()
  @RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
  @ApiOperation({ summary: 'Obtener todos los perfiles de emprendedores' })
  @ApiResponse({ status: 200, description: 'Perfiles obtenidos exitosamente.' })
  async getAllEntrepreneurProfiles() {
    const profiles = await this.entrepreneurProfileService.getAllEntrepreneurProfilesService();
    return {
      statusCode: HttpStatus.OK,
      message: 'Perfiles de emprendedores obtenidos exitosamente',
      data: profiles,
    };
  }

  @Get(':uuid')
  @RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
  @ApiOperation({ summary: 'Obtener un perfil de emprendedor por su UUID' })
  @ApiParam({
    name: 'uuid',
    description: 'UUID del perfil de emprendedor',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({ status: 200, description: 'Perfil obtenido exitosamente.' })
  @ApiResponse({ status: 404, description: 'Perfil no encontrado.' })
  async getEntrepreneurProfileById(@Param('uuid') uuid: string) {
    const profile = await this.entrepreneurProfileService.getEntrepreneurProfileByIdService(uuid);
    return {
      statusCode: HttpStatus.OK,
      message: 'Perfil de emprendedor obtenido exitosamente',
      data: profile,
    };
  }

  @Post()
  @RolesDecorator(Roles.ENTREPRENEUR)
  @ApiOperation({ summary: 'Crear un nuevo perfil de emprendedor' })
  @ApiResponse({ status: 201, description: 'Perfil creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  async postCreateEntrepreneurProfile(
    @Body() createEntrepreneurDto: CreateEntrepreneurProfileDto,
    @Req() req,
  ) {
    const userUuid = req.user.userId || req.user.uuid;
    const profile = await this.entrepreneurProfileService.postCreateEntrepreneurProfileService(
      createEntrepreneurDto,
      userUuid,
    );

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Perfil de emprendedor creado exitosamente',
      data: profile,
    };
  }

  @Put()
  @RolesDecorator(Roles.ENTREPRENEUR)
  @ApiOperation({ summary: 'Actualizar un perfil de emprendedor' })
  @ApiResponse({ status: 200, description: 'Perfil actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Perfil no encontrado.' })
  async putUpdateEntrepreneurProfile(@Body() updateEntrepreneurDto: UpdateEntrepreneurProfileDto) {
    const updated = await this.entrepreneurProfileService.putUpdateEntrepreneurProfileService(
      updateEntrepreneurDto,
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Perfil de emprendedor actualizado exitosamente',
      data: updated,
    };
  }

  @Delete(':uuid')
  @RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
  @ApiOperation({ summary: 'Eliminar un perfil de emprendedor' })
  @ApiParam({
    name: 'uuid',
    description: 'UUID del perfil de emprendedor',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({ status: 200, description: 'Perfil eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Perfil no encontrado.' })
  async deleteEntrepreneurProfile(@Param('uuid') uuid: string) {
    const deleted = await this.entrepreneurProfileService.deleteEntrepreneurProfileService(uuid);

    return {
      statusCode: HttpStatus.OK,
      message: 'Perfil de emprendedor eliminado exitosamente',
      data: deleted,
    };
  }
}
