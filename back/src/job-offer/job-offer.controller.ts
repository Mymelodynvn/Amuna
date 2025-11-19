import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { JobOfferService } from './job-offer.service';
import { CreateJobOfferDto } from './Dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './Dto/update-job-offer.dto';

import { AuthGuard } from '@nestjs/passport';
import { RolesDecorator } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/enum/roles.enum';

@Controller('job-offer')
export class JobOfferController {
  constructor(private readonly service: JobOfferService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @RolesDecorator( Roles.COMPANY)
  async create(@Body() dto: CreateJobOfferDto) {
    return {
      success: true,
      message: 'Oferta creada correctamente',
      data: await this.service.create(dto),
    };
  }

  @Get()
  async findAll() {
    return {
      success: true,
      data: await this.service.findAll(),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      success: true,
      data: await this.service.findOne(id),
    };
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @RolesDecorator(Roles.COMPANY)
  async update(@Param('id') id: string, @Body() dto: UpdateJobOfferDto) {
    return {
      success: true,
      message: 'Oferta actualizada correctamente',
      data: await this.service.update(id, dto),
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @RolesDecorator(Roles.COMPANY)
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return;
  }
}
