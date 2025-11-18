import {Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe, UseGuards, HttpStatus} from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RolesDecorator } from 'src/decorators/roles.decorator';
import { Roles } from 'src/enum/roles.enum';

@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credService: CredentialsService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
  @Post()
  async create(@Body() dto: CreateCredentialDto) {
    const result = await this.credService.create(dto);
    return { status: HttpStatus.CREATED, mensaje: result.mensaje, credential: result.credential };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll() {
    const creds = await this.credService.getAll();
    return { status: HttpStatus.OK, mensaje: 'Credenciales encontradas', data: creds };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getOne(@Param('id', ParseUUIDPipe) id: string) {
    const cred = await this.credService.getOne(id);
    return { status: HttpStatus.OK, mensaje: 'Credencial encontrada', data: cred };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCredentialDto,
  ) {
    const result = await this.credService.update(id, dto);
    return { status: HttpStatus.OK, mensaje: result.mensaje, credential: result.credential };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.credService.delete(id);
    return { status: HttpStatus.NO_CONTENT, mensaje: result.message };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
  @Post(':id/restore')
  async restore(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.credService.restore(id);
    return { status: HttpStatus.OK, mensaje: result.message };
  }
}
