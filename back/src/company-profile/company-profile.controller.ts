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

@Controller('company-profile')
export class CompanyProfileController {
  constructor(private readonly companyService: CompanyProfileService) {}

  @Get()
  async findAll() {
    const data = await this.companyService.findAll();
    return { status: HttpStatus.OK, data };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.companyService.findOne(id);
    return { status: HttpStatus.OK, data };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @RolesDecorator(Roles.COMPANY, Roles.ADMIN, Roles.SUPERADMIN)
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() dto: CreateCompanyProfileDto) {
    const created = await this.companyService.create(dto);
    return { status: HttpStatus.CREATED, mensaje: 'Perfil de empresa creado', data: created };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @RolesDecorator(Roles.COMPANY, Roles.ADMIN, Roles.SUPERADMIN)
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
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
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.companyService.delete(id);
    return { status: HttpStatus.NO_CONTENT, mensaje: `Perfil ${id} eliminado` };
  }
}