// ...existing code...
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RolesDecorator } from 'src/decorators/roles.decorator';
import { Roles } from 'src/enum/roles.enum';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Cursos')
@ApiBearerAuth()
 @Controller('course')
 @UseGuards(AuthGuard)
 export class CourseController {
   constructor(private readonly courseService: CourseService) {}

   @Post()
  @UseGuards(RolesGuard)
  @RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
  @ApiOperation({ summary: 'Crear un nuevo curso' })
  @ApiBody({ type: CreateCourseDto })
  @ApiResponse({ status: 201, description: 'Curso creado correctamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @UseGuards(RolesGuard)
  @RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
   create(@Body() dto: CreateCourseDto) {
     try {
       const created = this.courseService.create(dto);
       return { status: HttpStatus.CREATED, data: created };
     } catch (err: any) {
       throw new HttpException(
         { message: err?.message || 'Error creando curso' },
         HttpStatus.INTERNAL_SERVER_ERROR,
       );
     }
   }

   @Get()
  @ApiOperation({ summary: 'Obtener todos los cursos' })
  @ApiResponse({ status: 200, description: 'Listado de cursos.' })
   findAll() {
     try {
       const list = this.courseService.findAll();
       return { status: HttpStatus.OK, data: list };
     } catch (err: any) {
       throw new HttpException(
         { message: err?.message || 'Error obteniendo cursos' },
         HttpStatus.INTERNAL_SERVER_ERROR,
       );
     }
   }

   @Get(':id')
  @ApiOperation({ summary: 'Obtener un curso por ID' })
  @ApiParam({ name: 'id', description: 'ID del curso (UUID)', example: 'a9c4321e-9364-4c16-8a5e-bdb38c6b9123' })
  @ApiResponse({ status: 200, description: 'Curso encontrado.' })
  @ApiResponse({ status: 404, description: 'Curso no encontrado.' })
   findOne(@Param('id') id: string) {
     try {
       const item = this.courseService.findOne(id);
       if (!item) {
         throw new HttpException({ message: 'Curso no encontrado' }, HttpStatus.NOT_FOUND);
       }
       return { status: HttpStatus.OK, data: item };
     } catch (err: any) {
       if (err instanceof HttpException) throw err;
       throw new HttpException(
         { message: err?.message || 'Error obteniendo curso' },
         HttpStatus.INTERNAL_SERVER_ERROR,
       );
     }
   }

   @Patch(':id')
  @UseGuards(RolesGuard)
  @RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
  @UseGuards(RolesGuard)
  @RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
  @ApiOperation({ summary: 'Actualizar un curso' })
  @ApiParam({ name: 'id', description: 'ID del curso (UUID)', example: 'a9c4321e-9364-4c16-8a5e-bdb38c6b9123' })
  @ApiBody({ type: UpdateCourseDto })
  @ApiResponse({ status: 200, description: 'Curso actualizado correctamente.' })
  @ApiResponse({ status: 404, description: 'Curso no encontrado.' })
   update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
     try {
       const updated = this.courseService.update(id, dto);
       if (!updated) throw new HttpException({ message: 'Curso no encontrado' }, HttpStatus.NOT_FOUND);
       return { status: HttpStatus.OK, data: updated };
     } catch (err: any) {
       if (err instanceof HttpException) throw err;
       throw new HttpException(
         { message: err?.message || 'Error actualizando curso' },
         HttpStatus.INTERNAL_SERVER_ERROR,
       );
     }
   }

   @Delete(':id')
  @UseGuards(RolesGuard)
  @RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
  @UseGuards(RolesGuard)
  @RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
  @ApiOperation({ summary: 'Eliminar un curso' })
  @ApiParam({ name: 'id', description: 'ID del curso (UUID)', example: 'a9c4321e-9364-4c16-8a5e-bdb38c6b9123' })
  @ApiResponse({ status: 204, description: 'Curso eliminado correctamente.' })
  @ApiResponse({ status: 404, description: 'Curso no encontrado.' })
   remove(@Param('id') id: string) {
     try {
       const removed = this.courseService.remove(id);
       if (!removed) throw new HttpException({ message: 'Curso no encontrado' }, HttpStatus.NOT_FOUND);
       return { status: HttpStatus.NO_CONTENT, data: removed };
     } catch (err: any) {
       if (err instanceof HttpException) throw err;
       throw new HttpException({ message: err?.message || 'Error eliminando curso' }, HttpStatus.INTERNAL_SERVER_ERROR);
     }
   }
 }