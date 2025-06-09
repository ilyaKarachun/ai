import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { User } from '../../users/entities/user.entity';
import { Auth } from '../../auth/entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Auth])],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {} 