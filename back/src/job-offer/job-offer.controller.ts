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
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RolesDecorator } from 'src/decorators/roles.decorator';
import { Roles } from 'src/enum/roles.enum';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Ofertas de Trabajo')
@ApiBearerAuth()
@Controller('job-offer')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class JobOfferController {
  constructor(private readonly service: JobOfferService) {}

  @Post()
  @RolesDecorator(Roles.COMPANY)
  @ApiOperation({ summary: 'Crear una nueva oferta de trabajo' })
  @ApiResponse({ status: 201, description: 'Oferta creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  async create(@Body() dto: CreateJobOfferDto) {
    const created = await this.service.create(dto);
    return {
      status: HttpStatus.CREATED,
      message: 'Oferta creada correctamente',
      data: created,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las ofertas de trabajo' })
  @ApiResponse({ status: 200, description: 'Ofertas obtenidas exitosamente.' })
  async findAll() {
    const offers = await this.service.findAll();
    return {
      status: HttpStatus.OK,
      data: offers,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una oferta de trabajo por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de la oferta de trabajo',
    example: 'a9c4321e-9364-4c16-8a5e-bdb38c6b9123',
  })
  @ApiResponse({ status: 200, description: 'Oferta obtenida exitosamente.' })
  @ApiResponse({ status: 404, description: 'Oferta no encontrada.' })
  async findOne(@Param('id') id: string) {
    const offer = await this.service.findOne(id);
    return {
      status: HttpStatus.OK,
      data: offer,
    };
  }

  @Patch(':id')
  @RolesDecorator(Roles.COMPANY)
  @ApiOperation({ summary: 'Actualizar una oferta de trabajo' })
  @ApiParam({
    name: 'id',
    description: 'ID de la oferta de trabajo a actualizar',
    example: 'a9c4321e-9364-4c16-8a5e-bdb38c6b9123',
  })
  @ApiResponse({ status: 200, description: 'Oferta actualizada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Oferta no encontrada.' })
  async update(@Param('id') id: string, @Body() dto: UpdateJobOfferDto) {
    const updated = await this.service.update(id, dto);
    return {
      status: HttpStatus.OK,
      message: 'Oferta actualizada correctamente',
      data: updated,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RolesDecorator(Roles.COMPANY)
  @ApiOperation({ summary: 'Eliminar una oferta de trabajo' })
  @ApiParam({
    name: 'id',
    description: 'ID de la oferta de trabajo a eliminar',
    example: 'a9c4321e-9364-4c16-8a5e-bdb38c6b9123',
  })
  @ApiResponse({ status: 204, description: 'Oferta eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Oferta no encontrada.' })
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return;
  }
}
