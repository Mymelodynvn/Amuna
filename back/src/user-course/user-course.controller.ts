import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserCourseService } from './user-course.service';
import { CreateUserCourseDto } from './dto/create-user-course.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RolesDecorator } from 'src/decorators/roles.decorator';
import { Roles } from 'src/enum/roles.enum';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Curso de usuario')
@ApiBearerAuth()
@Controller('user-course')
@UseGuards(AuthGuard)
export class UserCourseController {
  constructor(private readonly userCourseService: UserCourseService) {}

  @Post()
  @ApiOperation({ summary: 'Inscribir un usuario a un curso' })
  @ApiResponse({ status: 201, description: 'Usuario inscrito correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 500, description: 'Error del servidor' })
  @ApiBody({ type: CreateUserCourseDto })
  async enroll(@Body() dto: CreateUserCourseDto) {
    try {
      const created = await this.userCourseService.enroll(dto);
      return { status: HttpStatus.CREATED, data: created };
    } catch (err: any) {
      if (err instanceof HttpException) throw err;
      throw new HttpException(
        { message: err?.message || 'Error inscribiendo' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Obtener los cursos donde está inscrito un usuario' })
  @ApiResponse({ status: 200, description: 'Lista de cursos obtenida con éxito' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 500, description: 'Error del servidor' })
  @ApiParam({ name: 'userId', type: String, description: 'UUID del usuario', example: 'a9c4321e-9364-4c16-8a5e-bdb38c6b9123' })
  async findByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    try {
      const list = await this.userCourseService.findByUser(userId);
      return { status: HttpStatus.OK, data: list };
    } catch (err: any) {
      throw new HttpException(
        { message: err?.message || 'Error obteniendo inscripciones' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
  @ApiOperation({ summary: 'Eliminar inscripción de un usuario a un curso' })
  @ApiResponse({ status: 204, description: 'Inscripción eliminada' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Inscripción no encontrada' })
  @ApiResponse({ status: 500, description: 'Error del servidor' })
  @ApiParam({ name: 'id', type: String, description: 'UUID de la inscripción', example: 'b7c4321e-9364-4c16-8a5e-bdb38c6b9123' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const removed = await this.userCourseService.remove(id);
      return { status: HttpStatus.NO_CONTENT, data: removed };
    } catch (err: any) {
      if (err instanceof HttpException) throw err;
      throw new HttpException(
        { message: err?.message || 'Error eliminando inscripción' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}