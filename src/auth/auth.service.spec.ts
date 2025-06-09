import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AuthService } from '../../../src/auth/auth.service';
import { Auth } from './entities/auth.entity';
import { User } from '../users/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

const mockUser = {
  id: 1,
  name: 'Test User',
  username: 'testuser',
  email: 'test@example.com',
  address: {
    street: 'Test St',
    suite: 'Suite 1',
    city: 'Test City',
    zipcode: '12345',
    geo: {
      lat: '-37.3159',
      lng: '81.1496',
    },
  },
  phone: '1-770-736-8031',
  website: 'test.com',
  company: {
    name: 'Test Company',
    catchPhrase: 'Test Phrase',
    bs: 'Test BS',
  },
};

const mockAuth = {
  id: 1,
  email: 'test@example.com',
  passwordHash: 'hashedPassword123',
  user: mockUser,
};

describe('AuthService', () => {
  let service: AuthService;
  let authRepository: Repository<Auth>;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(Auth),
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockAuth),
            create: jest.fn().mockReturnValue(mockAuth),
            save: jest.fn().mockResolvedValue(mockAuth),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn().mockReturnValue(mockUser),
            save: jest.fn().mockResolvedValue(mockUser),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('test.jwt.token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    authRepository = module.get<Repository<Auth>>(getRepositoryToken(Auth));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    const registerDto = {
      ...mockUser,
      password: 'password123',
    };

    beforeEach(() => {
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword123');
    });

    it('should successfully register a new user', async () => {
      const result = await service.register(registerDto);

      expect(userRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        name: registerDto.name,
        email: registerDto.email,
      }));
      expect(authRepository.create).toHaveBeenCalledWith({
        email: registerDto.email,
        passwordHash: 'hashedPassword123',
        user: mockUser,
      });
      expect(result).toHaveProperty('access_token');
    });
  });

  describe('login', () => {
    const loginDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    beforeEach(() => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    });

    it('should successfully login a user', async () => {
      const result = await service.login(loginDto);

      expect(authRepository.findOne).toHaveBeenCalledWith({
        where: { email: loginDto.email },
        relations: ['user'],
      });
      expect(result).toHaveProperty('access_token');
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for non-existent user', async () => {
      jest.spyOn(authRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });
}); 