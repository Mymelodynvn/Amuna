import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './Dto/create-categories.dto';
import { UpdateCategoryDto } from './Dto/update-categories.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly repo: CategoriesRepository) {}

  async create(dto: CreateCategoryDto) {
    const exists = (await this.repo.findAll()).find(
      (c) => c.categ.toLowerCase() === dto.categ.toLowerCase(),
    );

    if (exists) {
      throw new ConflictException('Esta categoría ya existe');
    }

    const newCategory = this.repo.create(dto);
    return this.repo.save(newCategory);
  }

  findAll() {
    return this.repo.findAll();
  }

  async findOne(id: string) {
    const category = await this.repo.findById(id);
    if (!category) throw new NotFoundException('Categoría no encontrada');
    return category;
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }

    return this.repo.update(id, dto);
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }

    await this.repo.delete(id);
    return { message: 'Categoría eliminada correctamente' };
  }
}
