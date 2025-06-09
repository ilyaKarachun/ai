import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from '../../users/dto/create-user.dto';

export class RegisterDto extends CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
