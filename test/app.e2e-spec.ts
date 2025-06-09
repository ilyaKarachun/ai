import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';
import { Auth } from '../src/auth/entities/auth.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  const mockUser = {
    name: 'Test User',
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
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

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue({
        find: jest.fn().mockResolvedValue([mockUser]),
        findOne: jest.fn().mockResolvedValue(mockUser),
        create: jest.fn().mockReturnValue(mockUser),
        save: jest.fn().mockResolvedValue(mockUser),
      })
      .overrideProvider(getRepositoryToken(Auth))
      .useValue({
        findOne: jest.fn().mockResolvedValue({
          user: mockUser,
          passwordHash: 'hashedPassword',
        }),
        create: jest.fn().mockReturnValue({
          user: mockUser,
          passwordHash: 'hashedPassword',
        }),
        save: jest.fn().mockResolvedValue({
          user: mockUser,
          passwordHash: 'hashedPassword',
        }),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('Authentication', () => {
    it('/auth/register (POST)', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(mockUser)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('access_token');
          authToken = res.body.access_token;
        });
    });

    it('/auth/login (POST)', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: mockUser.email,
          password: mockUser.password,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('access_token');
        });
    });
  });

  describe('Users', () => {
    it('/users (GET)', () => {
      return request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body[0]).toHaveProperty('name', mockUser.name);
        });
    });

    it('/users/:id (GET)', () => {
      return request(app.getHttpServer())
        .get('/users/1')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('name', mockUser.name);
        });
    });

    it('/users (POST)', () => {
      return request(app.getHttpServer())
        .post('/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send(mockUser)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('name', mockUser.name);
        });
    });

    it('/users/:id (PATCH)', () => {
      const updateData = { name: 'Updated Name' };
      return request(app.getHttpServer())
        .patch('/users/1')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('name', mockUser.name);
        });
    });

    it('/users/:id (DELETE)', () => {
      return request(app.getHttpServer())
        .delete('/users/1')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });
  });

  afterAll(async () => {
    await app.close();
  });
}); 