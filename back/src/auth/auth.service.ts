import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CredentialsRepository } from 'src/credentials/credentials.repository';
import { LoginUserDto } from 'src/users/dto/loginUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly credentialRepository: CredentialsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signInService(loginUserDto: LoginUserDto) {
    const credential = await this.credentialRepository.getCredentialByUsername(
      loginUserDto.userName,
    );
    if (!credential) throw new NotFoundException('Credenciales inválidas');

    const valid = await bcrypt.compare(
      loginUserDto.password,
      credential.password,
    );
    if (!valid) throw new NotFoundException('Credenciales inválidas');

    if (!credential.user_id || !credential.user_id.isActive)
      throw new ConflictException('Usuario inactivo, contacte al admin.');

    const payload = {
      id: credential.user_id.userId,
      role: credential.roles,
      username: credential.userName,
    };

    const token = this.jwtService.sign(payload, { expiresIn: '1h' });
    return { message: 'Inicio de sesión exitoso', token };
  }
}
