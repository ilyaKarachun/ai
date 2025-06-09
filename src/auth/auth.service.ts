import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Auth } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { password, ...userData } = registerDto;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);

    const auth = this.authRepository.create({
      email: userData.email,
      passwordHash,
      user,
    });
    await this.authRepository.save(auth);

    return this.generateToken(auth);
  }

  async login(loginDto: LoginDto) {
    const auth = await this.authRepository.findOne({
      where: { email: loginDto.email },
      relations: ['user'],
    });

    if (!auth) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      auth.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(auth);
  }

  private generateToken(auth: Auth) {
    const payload = { email: auth.email, sub: auth.user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
} 