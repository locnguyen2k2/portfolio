# 🤝 ABAC NestJS - Contributing Guidelines

## 🎯 Getting Started for Contributors

Thank you for your interest in contributing to ABAC NestJS! This document provides guidelines and instructions for contributing to the project.

### First-Time Setup

1. **Fork the Repository**:
   ```bash
   # Fork the repository on GitHub
   # Clone your fork locally
   git clone https://github.com/YOUR_USERNAME/ddd-nest-template.git
   cd rbac-nestjs
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment**:
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Configure your local environment variables
   # See setup-guide.md for detailed instructions
   ```

4. **Set Up Database**:
   ```bash
   # Generate Prisma client
   npm run prisma:generate
   
   # Run migrations
   npx prisma migrate dev --schema=prisma/pg-rbac/schema.prisma
   ```

5. **Start Development Server**:
   ```bash
   npm run start:dev
   ```

### Development Workflow

```bash
# 1. Create a new branch for your feature
git checkout -b feature/your-feature-name

# 2. Make your changes
# 3. Commit your changes
git add .
git commit -m "feat: add your feature description"

# 4. Push to your fork
git push origin feature/your-feature-name

# 5. Create a Pull Request on GitHub
```

## 📐 Coding Standards

### Code Style

We follow strict coding standards to maintain code quality and consistency.

#### TypeScript Guidelines

- **Use TypeScript strict mode**: All files must pass strict type checking
- **Avoid `any` types**: Use proper type definitions or `unknown` when necessary
- **Use interfaces for public APIs**: Use types for private/internal types
- **Prefer `const` over `let`**: Use `let` only when reassignment is necessary
- **Use arrow functions for callbacks**: Maintain `this` context consistently

**Example**:
```typescript
// ✅ Good
interface IUser {
  id: string;
  email: string;
}

const createUser = (user: IUser): UserEntity => {
  return UserEntity.create(user);
};

// ❌ Bad
const createUser = (user: any): any => {
  return new UserEntity(user);
};
```

#### Naming Conventions

- **Files**: kebab-case (`user.service.ts`, `abac.guard.ts`)
- **Classes**: PascalCase (`UserService`, `AbacGuard`)
- **Interfaces**: Prefix with `I` (`IUserRepository`, `IPolicy`)
- **Functions/Methods**: camelCase (`createUser`, `evaluatePolicy`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRY_ATTEMPTS`, `DEFAULT_TTL`)
- **Private members**: Prefix with underscore (`_privateField`)

**Example**:
```typescript
// ✅ Good
class UserService {
  private readonly _userRepository: IUserRepository;
  private static readonly MAX_USERS = 1000;
  
  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    // implementation
  }
}

// ❌ Bad
class userService {
  private userRepository: any;
  private maxUsers = 1000;
  
  async Create_User(DTO: any): any {
    // implementation
  }
}
```

#### File Organization

Follow the Domain-Driven Design structure:

```
src/modules/iam/
├── application/
│   ├── dtos/
│   │   ├── commands/
│   │   └── queries/
│   └── services/
│       ├── command.handler.ts
│       └── query.handler.ts
├── domain/
│   ├── entities/
│   ├── repositories/
│   ├── services/
│   ├── vo/
│   └── events/
├── infrastructure/
│   ├── persistence/
│   │   ├── repositories/
│   │   └── mappers/
│   └── events/
└── presentation/
    ├── controllers/
    ├── guards/
    └── dtos/
```

#### Import Order

Organize imports in this order:

1. Node.js built-in modules
2. External npm packages
3. Internal modules (using `@/` alias)
4. Relative imports

**Example**:
```typescript
// ✅ Good
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '@/modules/iam/domain/entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

// ❌ Bad
import { CreateUserDto } from './dtos/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@/modules/iam/domain/entities/user.entity';
import { Repository } from 'typeorm';
```

### Code Formatting

We use Prettier for consistent code formatting.

**Configuration** (`.prettierrc`):
```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": true,
  "printWidth": 100
}
```

**Format Code**:
```bash
npm run format
```

**Format on Save**: Configure your IDE to format on save using Prettier.

### Linting

We use ESLint with TypeScript support.

**Run Linter**:
```bash
npm run lint
```

**Fix Linting Issues**:
```bash
npm run lint -- --fix
```

**Common Linting Rules**:
- No unused variables
- No console.log in production code
- Explicit return types for functions
- No implicit any types
- Use const assertions for objects

## 🧪 Testing Requirements

### Test Coverage

We require comprehensive test coverage for all contributions:

- **Unit Tests**: Test individual functions, classes, and modules
- **Integration Tests**: Test module interactions and database operations
- **E2E Tests**: Test complete user flows

**Minimum Coverage**: 80% code coverage required

### Writing Tests

#### Unit Tests

Use Jest for unit testing.

**Example**:
```typescript
describe('UserService', () => {
  let service: UserService;
  let mockRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
    service = new UserService(mockRepository);
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const dto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'SecurePass123!',
        first_name: 'Test',
        last_name: 'User',
      };

      mockRepository.create.mockResolvedValue(mockUserEntity);

      const result = await service.createUser(dto);

      expect(mockRepository.create).toHaveBeenCalledWith(expect.any(UserEntity));
      expect(result).toBeDefined();
    });

    it('should throw error if username already exists', async () => {
      const dto = { /* ... */ };
      mockRepository.create.mockRejectedValue(new Error('Username exists'));

      await expect(service.createUser(dto)).rejects.toThrow('Username exists');
    });
  });
});
```

#### Integration Tests

Test database operations with test database.

**Example**:
```typescript
describe('UserController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = new PrismaClient();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  describe('POST /users/register', () => {
    it('should register a new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/v1/users/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'SecurePass123!',
          first_name: 'Test',
          last_name: 'User',
        })
        .expect(201);

      expect(response.body.user).toBeDefined();
      expect(response.body.access_token).toBeDefined();
    });
  });
});
```

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run specific test file
npm run test -- user.service.spec.ts

# Run e2e tests
npm run test:e2e
```

### Test Best Practices

1. **Arrange-Act-Assert Pattern**: Structure tests clearly
2. **Descriptive Test Names**: Test names should describe what is being tested
3. **Test Edge Cases**: Test null, undefined, empty values
4. **Mock External Dependencies**: Mock database, API calls, etc.
5. **Independent Tests**: Tests should not depend on each other
6. **Fast Tests**: Unit tests should run in milliseconds

## 🔄 Pull Request Process

### Before Submitting

1. **Update Documentation**: Update relevant documentation if needed
2. **Add Tests**: Ensure adequate test coverage
3. **Run Linter**: Fix all linting issues
4. **Format Code**: Run Prettier
5. **Build Successfully**: Ensure project builds without errors
6. **Test Locally**: Verify your changes work as expected

### Pull Request Checklist

- [ ] Code follows project coding standards
- [ ] Tests added/updated for new functionality
- [ ] Test coverage maintained at 80%+
- [ ] Documentation updated (if applicable)
- [ ] Commit messages follow Conventional Commits
- [ ] No merge conflicts
- [ ] All tests pass
- [ ] Linter passes with no errors
- [ ] Code formatted with Prettier

### Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

**Format**:
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

**Examples**:
```bash
# ✅ Good
feat(iam): add policy evaluation caching
fix(auth): resolve token refresh issue
docs(api): update policy endpoint documentation
refactor(user): simplify user creation logic
test(policy): add policy evaluation tests

# ❌ Bad
added caching
fix bug
update docs
```

### Pull Request Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issue
Closes #<issue-number>

## Changes Made
- List of changes
- With bullet points

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing performed

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] No merge conflicts
```

## 📋 Project-Specific Guidelines

### Domain-Driven Design (DDD) Principles

When working with domain logic:

1. **Keep Domain Layer Pure**: No framework dependencies in domain layer
2. **Use Value Objects**: For concepts without identity (e.g., Password, Email)
3. **Aggregate Roots**: Define clear aggregate boundaries
4. **Domain Events**: Emit events for significant domain changes
5. **Repository Interfaces**: Define interfaces in domain, implement in infrastructure

**Example**:
```typescript
// ✅ Good - Domain layer is framework-agnostic
// src/modules/iam/domain/entities/user.entity.ts
export class UserEntity extends AggregateRoot<UserEntity, string> {
  private readonly _email: Email; // Value Object
  private readonly _password: Password; // Value Object
  
  canAuthenticate(): boolean {
    return this._status === AccessControlStatus.ACTIVE;
  }
}

// ❌ Bad - Domain layer depends on framework
export class UserEntity {
  @Inject() private repository: UserRepository; // Framework dependency
}
```

### ABAC Policy Development

When creating or modifying ABAC policies:

1. **Test Policies Thoroughly**: Policies can have complex logic
2. **Use Valid JSON Logic**: Ensure conditions are valid JSON Logic
3. **Document Policies**: Add clear descriptions for what each policy does
4. **Default Deny**: Always follow default deny principle
5. **DENY Overrides**: Remember DENY policies take precedence

**Example Policy**:
```json
{
  "name": "Project Create Policy",
  "description": "Allows users with clearance level 5+ to create projects",
  "effect": "ALLOW",
  "action": "create",
  "resource": "Project",
  "condition": {
    "and": [
      { ">=": [{ "var": "user.attributes.clearance" }, 5] },
      { "==": [{ "var": "user.status" }, "ACTIVE"] }
    ]
  }
}
```

### Database Changes

When modifying the database schema:

1. **Create Migration**: Use Prisma migrations
2. **Test Migration**: Test migration on development database
3. **Backward Compatibility**: Ensure changes don't break existing data
4. **Seed Data**: Update seed data if necessary
5. **Document Changes**: Document schema changes in migration description

**Example**:
```bash
# Create migration
npx prisma migrate dev --name add_user_clearance_level

# This creates a migration file in prisma/pg-rbac/migrations/
# Review the generated SQL before applying
```

### API Changes

When modifying API endpoints:

1. **Update Swagger Documentation**: Add/update Swagger decorators
2. **Maintain Backward Compatibility**: Avoid breaking changes if possible
3. **Version Breaking Changes**: Use API versioning for breaking changes
4. **Update DTOs**: Ensure DTOs reflect new API contract
5. **Test API**: Test endpoints with Swagger or curl

**Example**:
```typescript
@ApiOperation({ summary: 'Create a new policy' })
@ApiResponse({ status: 201, description: 'Policy created successfully' })
@Post()
async createPolicy(@Body() dto: CreatePolicyDto) {
  // implementation
}
```

## 🛡️ Security Considerations

### Security Best Practices

1. **Never Commit Secrets**: Never commit `.env` files or secrets
2. **Sanitize User Input**: Always validate and sanitize user input
3. **Use Parameterized Queries**: Prisma handles this automatically
4. **Implement Rate Limiting**: Protect endpoints from abuse
5. **Validate Permissions**: Always check ABAC policies before actions
6. **Log Security Events**: Log authentication failures, authorization denials
7. **Keep Dependencies Updated**: Regularly update npm packages

### Security Review

All contributions affecting security will undergo additional review:

- Authentication/authorization changes
- Data encryption changes
- Session management changes
- Input validation changes
- Database query changes

## 📚 Documentation Guidelines

### Code Documentation

Use JSDoc comments for public APIs:

```typescript
/**
 * Creates a new user in the system
 * @param dto - User creation data transfer object
 * @returns Promise resolving to created user entity
 * @throws BusinessException if username or email already exists
 */
async createUser(dto: CreateUserDto): Promise<UserEntity> {
  // implementation
}
```

### README Documentation

- Keep README up to date
- Include installation instructions
- Include usage examples
- Include configuration options
- Update for breaking changes

### API Documentation

- Update Swagger decorators for all endpoints
- Include request/response examples
- Document error responses
- Document authentication requirements
- Document ABAC permissions required

## 🎯 Recognition and Community

### Contributor Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes
- Project documentation

### Community Guidelines

1. **Be Respectful**: Treat all contributors with respect
2. **Be Constructive**: Provide constructive feedback
3. **Be Inclusive**: Welcome contributors from all backgrounds
4. **Be Patient**: Understand that everyone has different experience levels
5. **Focus on What is Best for the Community**: Prioritize community benefit

### Communication Channels

- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For general questions and discussions
- **Pull Requests**: For code contributions
- **Code Reviews**: Provide constructive feedback on PRs

## 🐛 Bug Reporting

### Bug Report Template

```markdown
## Description
Clear description of the bug

## Steps to Reproduce
1. Step one
2. Step two
3. Step three

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., Ubuntu 20.04]
- Node.js version: [e.g., 20.x]
- Database: [e.g., PostgreSQL 16]
- Browser: [if applicable]

## Screenshots
If applicable, add screenshots

## Additional Context
Any other relevant information
```

### Feature Request Template

```markdown
## Description
Clear description of the feature

## Use Case
Describe the use case for this feature

## Proposed Solution
How you envision this feature working

## Alternatives Considered
Any alternative solutions you considered

## Additional Context
Any other relevant information
```

## 📦 Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Incompatible API changes
- **MINOR**: Backwards-compatible functionality additions
- **PATCH**: Backwards-compatible bug fixes

### Release Checklist

- [ ] All tests pass
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version bumped in package.json
- [ ] Git tag created
- [ ] Release published on GitHub

## 🚀 Getting Help

If you need help contributing:

1. **Read Documentation**: Check existing documentation first
2. **Search Issues**: Check if your question has been answered
3. **Ask in Discussions**: Post a question in GitHub Discussions
4. **Contact Maintainers**: Reach out to project maintainers

## 📄 License

By contributing to ABAC NestJS, you agree that your contributions will be licensed under the project's license (UNLICENSED).

---

**Thank you for contributing to ABAC NestJS!**

Your contributions help make this project better for everyone. We appreciate your time and effort.

Generated on: 2026-04-14
Version: 0.0.1
