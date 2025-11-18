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

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
  @Get()
  async getAll() {
    console.log('Controlador usuario: GET /users');
    const usuarios = await this.userService.getAllUserService();
    return { status: HttpStatus.OK, data: usuarios };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getOne(@Param('id', ParseUUIDPipe) id: string) {
    console.log(`Controlador usuario: GET /users/${id}`);
    const usuario = await this.userService.getUserByIdService(id);
    return { status: HttpStatus.OK, data: usuario };
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const result = await this.userService.postCreateUserService(dto);
    return { status: HttpStatus.CREATED, mensaje: result.mensaje, usuario: result.usuario };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async update(@Body() dto: UpdateUserDto) {
    const result = await this.userService.putUpdateUserService(dto);
    return { status: HttpStatus.OK, mensaje: result.mensaje, usuario: result.resultado };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.userService.deleteUserService(id);
    return { status: HttpStatus.NO_CONTENT, mensaje: result.message };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
  @Post(':id/restore')
  async restore(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.userService.restoreUserService(id);
    return { status: HttpStatus.OK, mensaje: result.message };
  }
}
