import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RolesDecorator } from '../decorators/roles.decorator';
import { Roles } from '../enum/roles.enum';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Obtener todos los usuarios
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Usuarios obtenidos exitosamente.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
  @Get()
  async getAll() {
    const usuarios = await this.userService.getAllUserService();
    return { status: HttpStatus.OK, data: usuarios };
  }

  // Obtener usuario por ID
  @ApiOperation({ summary: 'Obtener un usuario por su ID' })
  @ApiResponse({ status: 200, description: 'Usuario obtenido exitosamente.' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'string', description: 'UUID del usuario' })
  @UseGuards(AuthGuard('jwt'))
  @Get('getUserById/:id')
  async getOne(@Param('id', ParseUUIDPipe) id: string) {
    const usuario = await this.userService.getUserByIdService(id);
    return { status: HttpStatus.OK, data: usuario };
  }

  // Crear un usuario
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente.' })
  @Post('createUser')
  async create(@Body() dto: CreateUserDto) {
    const result = await this.userService.postCreateUserService(dto);
    return {
      status: HttpStatus.CREATED,
      mensaje: result.mensaje,
      usuario: result.usuario,
    };
  }

  // Actualizar un usuario
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('putUser')
  async update(@Body() dto: UpdateUserDto) {
    const result = await this.userService.putUpdateUserService(dto);
    return {
      status: HttpStatus.OK,
      mensaje: result.mensaje,
      usuario: result.resultado,
    };
  }

  // Eliminar usuario (soft delete)
  @ApiOperation({ summary: 'Eliminar un usuario (soft delete)' })
  @ApiResponse({ status: 204, description: 'Usuario eliminado exitosamente.' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'string', description: 'UUID del usuario' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
  @Delete('deleteUser/:id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.userService.deleteUserService(id);
    return { status: HttpStatus.NO_CONTENT, mensaje: result.message };
  }

  // Restaurar usuario
  @ApiOperation({ summary: 'Restaurar un usuario eliminado' })
  @ApiResponse({ status: 200, description: 'Usuario restaurado exitosamente.' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'string', description: 'UUID del usuario' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
  @Post('restoreUser/:id')
  async restore(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.userService.restoreUserService(id);
    return { status: HttpStatus.OK, mensaje: result.message };
  }
}
