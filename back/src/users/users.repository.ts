import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userDB: Repository<User>,
  ) {}

  async getAll() {
    return this.userDB.find({ where: { isActive: true } });
  }

  async findById(id: string) {
    return this.userDB.findOne({ where: { userId: id } });
  }

  async findByEmail(email: string) {
    return this.userDB.findOne({ where: { email } });
  }

  async createUser(dto: CreateUserDto) {
    console.log('Repo usuario: creando usuario nuevo', dto);

    const user = this.userDB.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: dto.phone,
      isActive: dto.isActive ?? true,
      role: dto.role ?? undefined,
    });

    const saved = await this.userDB.save(user);
    return saved;
  }

  async updateUser(user: User, dto: UpdateUserDto) {
    console.log(`Repo usuario: actualizando usuario ${user.userId}`, dto);
    if (dto.firstName !== undefined) user.firstName = dto.firstName;
    if (dto.lastName !== undefined) user.lastName = dto.lastName;
    if (dto.email !== undefined) user.email = dto.email;
    if (dto.phone !== undefined) user.phone = dto.phone;
    if (dto.isActive !== undefined) user.isActive = dto.isActive;
    if (dto.role !== undefined) user.role = dto.role;

    const updated = await this.userDB.save(user);
    console.log(`Repo usuario: usuario actualizado ${updated.userId}`);
    return updated;
  }

  async softDelete(user: User) {
    user.isActive = false;
    await this.userDB.save(user);
    return { message: `Usuario ${user.userId} desactivado` };
  }

  async restore(user: User) {
    user.isActive = true;
    await this.userDB.save(user);
    return { message: `Usuario ${user.userId} reactivado` };
  }
}
