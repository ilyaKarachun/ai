# Development Guidelines

## Code Style and Standards

### TypeScript Guidelines

1. **Type Safety**
   - Always define explicit types
   - Avoid using `any`
   - Use interfaces for object shapes
   - Enable strict TypeScript configuration

```typescript
// ❌ Bad
const user: any = { name: "John" };
function process(data) { return data; }

// ✅ Good
interface User {
  name: string;
  age?: number;
}
const user: User = { name: "John" };
function process<T>(data: T): T { return data; }
```

2. **Naming Conventions**
   - Use PascalCase for classes, interfaces, types, and enums
   - Use camelCase for variables, functions, and methods
   - Use UPPERCASE for constants
   - Use kebab-case for file names

```typescript
// Classes, Interfaces, Types
class UserService {}
interface UserResponse {}
type UserData = User & UserMetadata;

// Variables and Functions
const userCount = 0;
function getUserById(id: number): User {}

// Constants
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = "https://api.example.com";

// Files
// user.service.ts
// user.controller.ts
// user.interface.ts
```

3. **Function Guidelines**
   - Keep functions small and focused
   - Use early returns
   - Implement proper error handling
   - Document complex functions

```typescript
// ❌ Bad
function processUser(user: User) {
  if (user.isActive) {
    if (user.hasPermission) {
      // Nested logic
    } else {
      throw new Error("No permission");
    }
  } else {
    throw new Error("User inactive");
  }
}

// ✅ Good
function processUser(user: User) {
  if (!user.isActive) {
    throw new Error("User inactive");
  }
  
  if (!user.hasPermission) {
    throw new Error("No permission");
  }
  
  // Main logic here
}
```

### NestJS Best Practices

1. **Module Organization**
   - One module per feature
   - Keep providers private when possible
   - Use feature modules
   - Implement shared modules for common functionality

```typescript
@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Only export what's necessary
})
export class UserModule {}
```

2. **Dependency Injection**
   - Use constructor injection
   - Avoid circular dependencies
   - Use custom providers when needed

```typescript
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}
}
```

3. **Exception Handling**
   - Use built-in HTTP exceptions
   - Implement custom exception filters
   - Handle async errors properly

```typescript
@Injectable()
export class UserService {
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }
}
```

## Project Structure

```
src/
├── modules/           # Feature modules
│   └── users/
│       ├── dto/      # Data Transfer Objects
│       ├── entities/ # Database entities
│       ├── tests/    # Module tests
│       ├── users.controller.ts
│       ├── users.service.ts
│       └── users.module.ts
├── common/           # Shared code
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   └── pipes/
├── config/          # Configuration
│   ├── database.config.ts
│   └── app.config.ts
└── main.ts         # Application entry point
```

## Testing Standards

1. **Unit Tests**
   - Test each service method
   - Mock dependencies
   - Use descriptive test names
   - Follow AAA pattern (Arrange-Act-Assert)

```typescript
describe('UserService', () => {
  let service: UserService;
  let repository: MockType<Repository<User>>;

  beforeEach(async () => {
    // Arrange
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get(UserService);
    repository = module.get(getRepositoryToken(User));
  });

  it('should find a user by id', async () => {
    // Arrange
    const user = { id: 1, name: 'John' };
    repository.findOne.mockReturnValue(user);

    // Act
    const result = await service.findOne(1);

    // Assert
    expect(result).toEqual(user);
    expect(repository.findOne).toHaveBeenCalledWith(1);
  });
});
```

2. **E2E Tests**
   - Test complete features
   - Use separate test database
   - Clean up after tests
   - Test error scenarios

```typescript
describe('Users (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect('Content-Type', /json/);
  });
});
```

## API Design Principles

1. **RESTful Practices**
   - Use proper HTTP methods
   - Return appropriate status codes
   - Implement HATEOAS when applicable
   - Version your APIs

2. **Request/Response Standards**
   - Validate all inputs
   - Transform responses
   - Handle errors consistently
   - Use DTOs for data validation

```typescript
@Post()
@UsePipes(new ValidationPipe())
async create(@Body() createUserDto: CreateUserDto) {
  return this.userService.create(createUserDto);
}
```

## Security Guidelines

1. **Authentication**
   - Use JWT tokens
   - Implement refresh tokens
   - Store sensitive data securely
   - Use HTTPS only

2. **Authorization**
   - Implement role-based access control
   - Use guards for protection
   - Validate user permissions

```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Get('protected')
getProtectedResource() {
  return 'This is protected';
}
```

## Performance Optimization

1. **Database**
   - Use proper indexes
   - Implement caching
   - Optimize queries
   - Use pagination

2. **Application**
   - Enable compression
   - Implement rate limiting
   - Use proper logging levels
   - Optimize response payload

## Deployment Guidelines

1. **Environment Configuration**
   - Use environment variables
   - Implement configuration validation
   - Keep secrets secure
   - Use different configs per environment

2. **CI/CD**
   - Automate testing
   - Implement staging environments
   - Use Docker for consistency
   - Implement proper monitoring

## Code Review Guidelines

1. **Review Checklist**
   - Code follows style guide
   - Tests are included
   - Documentation is updated
   - No security vulnerabilities
   - Performance impact considered

2. **Pull Request Process**
   - Use descriptive titles
   - Include proper description
   - Link related issues
   - Request appropriate reviewers

## Documentation Requirements

1. **Code Documentation**
   - Document public APIs
   - Include JSDoc comments
   - Explain complex logic
   - Keep documentation updated

2. **API Documentation**
   - Use OpenAPI/Swagger
   - Include examples
   - Document error responses
   - Keep documentation in sync with code

## Version Control

1. **Git Workflow**
   - Use feature branches
   - Write meaningful commit messages
   - Follow semantic versioning
   - Keep commits atomic

2. **Branch Naming**
   - feature/feature-name
   - bugfix/bug-description
   - hotfix/issue-description
   - release/version-number 