import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Auth } from '../../auth/entities/auth.entity';
import { userSeedData } from './user.seed';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

  async seed() {
    await this.seedUsers();
  }

  private async seedUsers() {
    for (const userData of userSeedData) {
      const existingUser = await this.userRepository.findOne({
        where: { email: userData.email },
      });

      if (!existingUser) {
        const user = this.userRepository.create(userData);
        await this.userRepository.save(user);

        const passwordHash = await bcrypt.hash('password123', 10);
        const auth = this.authRepository.create({
          email: userData.email,
          passwordHash,
          user,
        });
        await this.authRepository.save(auth);
      }
    }
  }
} 