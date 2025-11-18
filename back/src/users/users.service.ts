import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly repo: UsersRepository) {}

  async getAllUserService() {
    try {
      return await this.repo.getAll();
    } catch (error) {
      //error inesperado porque no se encontró el usuario
      throw new BadRequestException('No fue posible obtener la lista de usuarios');
    }
  }

  async getUserByIdService(id: string) {
    if (!id) {
      throw new BadRequestException('El id del usuario es requerido');
    }
    const user = await this.repo.findById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  async postCreateUserService(dto: CreateUserDto) {
    //verifica que el email no este duplicado
    const emailExist = await this.repo.findByEmail(dto.email);
    if (emailExist) {
      throw new ConflictException('El correo ya está registrado');
    }

    const usuario = await this.repo.createUser(dto);
    return { mensaje: 'Usuario creado exitosamente', usuario };
  }

  async putUpdateUserService(dto: UpdateUserDto) {
    if (!dto.userId) {
      throw new BadRequestException('El id del usuario a actualizar es obligatorio');
    }
    const user = await this.repo.findById(dto.userId);
    if (!user) {
      throw new NotFoundException('Usuario no existe');
    }

    //verifica que el email a actualizar no este duplicado
    if (dto.email) {
      const emailUse = await this.repo.findByEmail(dto.email);
      if (emailUse && emailUse.userId !== dto.userId) {
        throw new ConflictException('El correo ya está en uso');
      }
    }

    const resultado = await this.repo.updateUser(user, dto);
    return { mensaje: 'Usuario actualizado', resultado };
  }

  async deleteUserService(id: string) {
    if (!id) {
      throw new BadRequestException('El id del usuario es obligatorio para desactivar');
    }
    const user = await this.repo.findById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    if (!user.isActive) {
      throw new ConflictException('Usuario ya está inactivo');
    }
    const msg = await this.repo.softDelete(user);
    return msg;
  }

  async restoreUserService(id: string) {
    if (!id) {
      throw new BadRequestException('El id del usuario es obligatorio para reactivar');
    }
    const user = await this.repo.findById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado para reactivar');
    }
    const msg = await this.repo.restore(user);
    return msg;
  }
}
