// ...existing code...
import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, HttpCode, HttpStatus, Req, ParseUUIDPipe } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RolesDecorator } from '../decorators/roles.decorator';
import { Roles } from '../enum/roles.enum';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Publicaciones')
@ApiBearerAuth()
@Controller('publication')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todas las publicaciones' })
  @ApiResponse({ status: 200, description: 'Lista de publicaciones obtenida exitosamente' })
  @RolesDecorator(Roles.ADMIN, Roles.USER, Roles.ENTREPRENEUR)
  findAll() {
    return this.publicationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene una publicación por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de la publicación (UUID)',
    example: 'a9c4321e-9364-4c16-8a5e-bdb38c6b9123',
    type: 'string',
  })
  @ApiResponse({ status: 200, description: 'Publicación encontrada' })
  @ApiResponse({ status: 404, description: 'Publicación no encontrada' })
  @RolesDecorator(Roles.ADMIN, Roles.USER, Roles.ENTREPRENEUR)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.publicationService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea una nueva publicación (solo Admin y Emprendedor)' })
  @ApiResponse({ status: 201, description: 'Publicación creada exitosamente' })
  @ApiBody({
    type: CreatePublicationDto,
    description: 'Datos necesarios para crear una publicación'
  })
  @RolesDecorator(Roles.ADMIN, Roles.ENTREPRENEUR)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreatePublicationDto, @Req() req) {
    const userId = req.user.id; // Obtener el ID del usuario autenticado
    return this.publicationService.create({ ...dto, userId });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza una publicación (solo Admin y Emprendedor)' })
  @ApiParam({
    name: 'id',
    description: 'ID de la publicación a actualizar (UUID)',
    example: '1142df1e-b056-4def-9c33-39960a2d4ea0',
    type: 'string',
  })
  @ApiBody({
    type: UpdatePublicationDto,
    description: 'Campos que pueden actualizarse'
  })
  @ApiResponse({ status: 200, description: 'Publicación actualizada exitosamente' })
  @ApiResponse({ status: 403, description: 'El usuario no tiene permisos' })
  @RolesDecorator(Roles.ADMIN, Roles.ENTREPRENEUR)
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePublicationDto, @Req() req) {
    const userId = req.user.id;
    const publication = await this.publicationService.findOne(id);

    if (publication.userId !== userId && req.user.role !== Roles.ADMIN) {
      return { status: HttpStatus.FORBIDDEN, message: 'No tienes permiso para actualizar esta publicación' };
    }

    return this.publicationService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina una publicación (solo Admin o el creador)' })
  @ApiParam({
    name: 'id',
    description: 'ID de la publicación a eliminar (UUID)',
    example: '47e9d2b1-4d89-49e0-96fa-0f0a765c6f11',
    type: 'string',
  })
  @ApiResponse({ status: 200, description: 'Publicación eliminada correctamente' })
  @ApiResponse({ status: 403, description: 'El usuario no tiene permisos' })
  @RolesDecorator(Roles.ADMIN, Roles.ENTREPRENEUR)
  async remove(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    const userId = req.user.id;
    const publication = await this.publicationService.findOne(id);

    if (publication.userId !== userId && req.user.role !== Roles.ADMIN) {
      return { status: HttpStatus.FORBIDDEN, message: 'No tienes permiso para eliminar esta publicación' };
    }

    return this.publicationService.remove(id);
  }
}
// ...existing code...