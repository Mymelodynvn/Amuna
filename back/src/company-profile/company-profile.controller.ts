import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RolesDecorator } from '../decorators/roles.decorator';
import { Roles } from '../enum/roles.enum';
import { CompanyProfileService } from './company-profile.service';
import { CreateCompanyProfileDto } from './DTOS/create-company-profile.dto';
import { UpdateCompanyProfileDto } from './DTOS/update-company-profile.dto';
import { CompanyProfile } from '../entities/company-profile.entity';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Perfiles de Empresa')
@ApiBearerAuth()
@Controller('company-profile')
export class CompanyProfileController {
  constructor(private readonly companyService: CompanyProfileService) {}

  @ApiOperation({ summary: 'Obtener todos los perfiles de empresa' })
  @ApiResponse({ status: 200, description: 'Lista de perfiles encontrados' })
  @Get()
  async findAll() {
    const data = await this.companyService.findAll();
    return { status: HttpStatus.OK, data };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un perfil de empresa por ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'UUID del perfil de empresa' })
  @ApiResponse({ status: 200, description: 'Perfil encontrado' })
  @ApiResponse({ status: 404, description: 'Perfil no encontrado' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.companyService.findOne(id);
    return { status: HttpStatus.OK, data };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @RolesDecorator(Roles.COMPANY, Roles.ADMIN, Roles.SUPERADMIN)
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Crear un nuevo perfil de empresa' })
  @ApiBody({ type: CreateCompanyProfileDto })
  @ApiResponse({ status: 201, description: 'Perfil creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() dto: CreateCompanyProfileDto) {
    const created = await this.companyService.create(dto);
    return { status: HttpStatus.CREATED, mensaje: 'Perfil de empresa creado', data: created };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @RolesDecorator(Roles.COMPANY, Roles.ADMIN, Roles.SUPERADMIN)
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Actualizar un perfil de empresa' })
  @ApiParam({ name: 'id', type: 'string', description: 'UUID del perfil' })
  @ApiBody({ type: UpdateCompanyProfileDto })
  @ApiResponse({ status: 200, description: 'Perfil actualizado correctamente' })
  @ApiResponse({ status: 404, description: 'Perfil no encontrado' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCompanyProfileDto,
  ) {
    const updated = await this.companyService.update(id, dto);
    return { status: HttpStatus.OK, mensaje: 'Perfil de empresa actualizado', data: updated };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un perfil de empresa' })
  @ApiParam({ name: 'id', type: 'string', description: 'UUID del perfil' })
  @ApiResponse({ status: 204, description: 'Perfil eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Perfil no encontrado' })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.companyService.delete(id);
    return { status: HttpStatus.NO_CONTENT, mensaje: `Perfil ${id} eliminado` };
  }
}