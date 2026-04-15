# 🏗️ ABAC NestJS - Architecture Documentation

## 🎯 Business Requirements

| | |
|---|---|
| **Problem** | Traditional Role-Based Access Control (RBAC) is insufficient for modern multi-tenant applications that require fine-grained, context-aware authorization based on dynamic attributes and environmental factors |
| **Goal** | Implement a flexible, scalable Attributes-Based Access Control (ABAC) system that enables complex permission scenarios while maintaining performance and security |
| **Audience** | Enterprise development teams, SaaS platform architects, security engineers, and system administrators |
| **Success Metric** | Support for 10,000+ concurrent authorization decisions with sub-10ms latency, enabling complex policy rules without performance degradation |

## 🧠 Mental Model

Think of **ABAC NestJS** as a **smart security checkpoint system** at a high-security facility, similar to how modern airports or corporate buildings manage access.

| Security Checkpoint Component | System Component |
|-------------------------------|------------------|
| **Identity Verification** | User authentication with JWT tokens |
| **Badge Scanner** | Multi-tenant context extraction (organization, project, department) |
| **Rule Engine** | Policy Decision Point (PDP) using json-logic-js |
| **Access Database** | Policy repository with attribute-based rules |
| **Environmental Sensors** | Time, IP address, device context evaluation |
| **Security Logs** | Audit trail for all access decisions |

**Real-World Analogy**: 
- **Traditional RBAC** is like having color-coded badges (red, blue, green) that grant access to entire floors
- **ABAC** is like having a smart badge that considers who you are, where you're trying to go, what time it is, what department you work in, and whether you have special clearance for specific rooms

## 🏛️ System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                            │
│  (Web App, Mobile App, API Consumers, Third-party Integrations) │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTPS/JWT
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Presentation Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ Controllers  │  │    Guards    │  │        DTOs          │  │
│  │  (REST API)  │  │ (ABAC, JWT)  │  │  (Request/Response)  │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Application Layer                          │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │ Command Handlers │  │ Query Handlers   │  │    Services  │  │
│  │   (CQRS Pattern) │  │   (CQRS Pattern) │  │  (Domain)    │  │
│  └──────────────────┘  └──────────────────┘  └──────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Domain Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   Entities   │  │ Value Objects│  │   Domain Services    │  │
│  │ (Aggregates) │  │   (VOs)      │  │   (Business Logic)   │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│  ┌──────────────┐  ┌──────────────┐                            │
│  │ Repositories │  │   Events     │                            │
│  │  (Interfaces)│  │  (Domain)    │                            │
│  └──────────────┘  └──────────────┘                            │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Infrastructure Layer                          │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │  Prisma Adapter  │  │  Event Publishers│  │ Cache Repos  │  │
│  │  (PostgreSQL)    │  │  (Ably/Events)   │  │  (Redis)     │  │
│  └──────────────────┘  └──────────────────┘  └──────────────┘  │
│  ┌──────────────────┐  ┌──────────────────┐                    │
│  │ Policy Evaluator │  │  Mappers         │                    │
│  │ (json-logic-js)  │  │  (Entity ↔ DB)   │                    │
│  └──────────────────┘  └──────────────────┘                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Data Layer                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ PostgreSQL   │  │    Redis     │  │       Ably           │  │
│  │  (Primary DB)│  │   (Cache)    │  │  (Real-time Events)  │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### ABAC Decision Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     1. Request Arrives                          │
│  User makes HTTP request with JWT token and context headers     │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  2. Authentication Guard                        │
│  JwtAuthGuard validates JWT token and extracts user identity   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  3. Tenant Context Guard                         │
│  TenantContextGuard extracts organization/project context      │
│  from headers and stores in CLS (Context Local Storage)        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    4. ABAC Guard Evaluation                      │
│  AbacGuard retrieves @CheckAbac decorator metadata              │
│  - Action: What user is trying to do (create, read, update)    │
│  - Resource: What resource is being accessed                  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    5. Context Building                           │
│  Build authorization context:                                   │
│  - Subject: User attributes, roles, organizational memberships  │
│  - Resource: Resource attributes and metadata                  │
│  - Environment: Time, IP address, device info                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    6. Policy Retrieval                           │
│  Query policies matching:                                       │
│  - Action type (or wildcard)                                   │
│  - Resource type (or wildcard)                                 │
│  - Organization scope (or global)                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    7. Policy Evaluation                         │
│  Evaluate policies in order:                                    │
│  1. DENY policies: If any DENY matches → ACCESS DENIED         │
│  2. ALLOW policies: If any ALLOW matches → ACCESS GRANTED      │
│  3. Default: No matching policy → ACCESS DENIED                │
│  Uses json-logic-js for rule evaluation against context         │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    8. Decision                                   │
│  Return true (allow) or false (deny) to guard                  │
│  If denied, throw ForbiddenException                            │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    9. Controller Execution                       │
│  If allowed, controller method executes and returns response   │
└─────────────────────────────────────────────────────────────────┘
```

## 📦 Component Relationships

### Domain Layer Components

```
┌─────────────────────────────────────────────────────────────────┐
│                        Domain Entities                           │
│                                                                  │
│  ┌──────────────┐       ┌──────────────┐                       │
│  │    User      │◄──────│  Attribute   │                       │
│  │   Entity     │       │   Entity     │                       │
│  └──────┬───────┘       └──────────────┘                       │
│         │                                                       │
│         │ has many                                               │
│         ▼                                                       │
│  ┌──────────────┐       ┌──────────────┐                       │
│  │    Staff     │◄──────│  Policy      │                       │
│  │   Entity     │       │   Entity     │                       │
│  └──────┬───────┘       └──────────────┘                       │
│         │                                                       │
│         │ belongs to                                            │
│         ▼                                                       │
│  ┌──────────────┐       ┌──────────────┐                       │
│  │ Organization │◄──────│    Role      │                       │
│  │   Entity     │       │   Entity     │                       │
│  └──────┬───────┘       └──────────────┘                       │
│         │                                                       │
│         │ has many                                              │
│         ▼                                                       │
│  ┌──────────────┐       ┌──────────────┐                       │
│  │   Project    │◄──────│   Feature    │                       │
│  │   Entity     │       │   Entity     │                       │
│  └──────┬───────┘       └──────────────┘                       │
│         │                                                       │
│         │ has members                                           │
│         ▼                                                       │
│  ┌──────────────┐                                               │
│  │   Member     │                                               │
│  │   Entity     │                                               │
│  └──────────────┘                                               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Repository Pattern

```
┌─────────────────────────────────────────────────────────────────┐
│                    Repository Interfaces                         │
│                   (Domain Layer - Contracts)                     │
│                                                                  │
│  IUserRepository    IOrganizationRepository    IPolicyRepository│
│  IStaffRepository   IProjectRepository        IRoleRepository  │
│  IMemberRepository  IFeatureRepository        IAttributeRepository│
│  ISessionRepository                                                │
└─────────────────────────────────────────────────────────────────┘
                              ▲
                              │ implements
                              │
┌─────────────────────────────────────────────────────────────────┐
│                 Repository Implementations                       │
│              (Infrastructure Layer - Prisma)                      │
│                                                                  │
│  UserRepository    OrganizationRepository    PolicyRepository  │
│  StaffRepository   ProjectRepository        RoleRepository      │
│  MemberRepository  FeatureRepository        AttributeRepository │
│  SessionCacheRepository (Redis)                                    │
└─────────────────────────────────────────────────────────────────┘
                              ▲
                              │ uses
                              │
┌─────────────────────────────────────────────────────────────────┐
│                      Prisma ORM                                  │
│                   (Database Abstraction)                         │
└─────────────────────────────────────────────────────────────────┘
```

### CQRS Pattern

```
┌─────────────────────────────────────────────────────────────────┐
│                      Command Side                                │
│                                                                  │
│  Controller → Command Handler → Domain Service → Repository      │
│                                                                  │
│  Example: CreatePolicyCommandHandler                             │
│  1. Validate input DTO                                           │
│  2. Create PolicyEntity                                          │
│  3. Call repository.create()                                     │
│  4. Publish domain event (if applicable)                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                       Query Side                                 │
│                                                                  │
│  Controller → Query Handler → Repository → Response DTO          │
│                                                                  │
│  Example: PolicyQueryHandler                                    │
│  1. Extract query parameters                                     │
│  2. Call repository.findMany()                                   │
│  3. Map entities to DTOs                                         │
│  4. Return response                                              │
└─────────────────────────────────────────────────────────────────┘
```

## 🔧 Technology Stack Rationale

### Core Framework

| Technology | Rationale |
|------------|-----------|
| **NestJS** | Provides robust dependency injection, modular architecture, and excellent TypeScript support. Built-in decorators and guards simplify ABAC implementation |
| **Fastify** | Chosen over Express for superior performance (2x faster), lower overhead, and better async handling. Critical for high-volume authorization checks |
| **TypeScript** | Essential for DDD implementation with strong typing for entities, value objects, and domain services. Reduces runtime errors and improves maintainability |

### Data Layer

| Technology | Rationale |
|------------|-----------|
| **PostgreSQL** | Selected for its advanced JSON support (for attributes storage), robust relational features, ACID compliance, and excellent performance for complex queries |
| **Prisma ORM** | Type-safe database client with excellent TypeScript integration. Schema-first approach aligns with DDD principles. Built-in migrations and seeding |
| **Redis** | Used for session storage and token blacklisting. Provides sub-millisecond latency for authentication checks, reducing database load |

### Security & Authorization

| Technology | Rationale |
|------------|-----------|
| **json-logic-js** | Standard JSON Logic format for policy rules. Enables complex, nested conditions without custom parsing. Declarative rule definition |
| **JWT (jsonwebtoken)** | Stateless authentication with built-in expiration. Scales horizontally without session storage overhead |
| **bcrypt** | Industry-standard password hashing with adaptive cost factor. Proven security track record |
| **Passport-JWT** | Flexible JWT validation strategy that integrates seamlessly with NestJS guards |

### Real-time & Events

| Technology | Rationale |
|------------|-----------|
| **Ably** | Chosen over Socket.io for managed real-time infrastructure. Guarantees message delivery, automatic reconnection, and excellent scalability |
| **nestjs-cls** | Context Local Storage for request-scoped data. Critical for multi-tenant context propagation across layers |

### Validation & Transformation

| Technology | Rationale |
|------------|-----------|
| **class-validator** | Declarative validation using decorators. Integrates with NestJS ValidationPipe for automatic DTO validation |
| **class-transformer** | Transform plain objects to class instances. Essential for DTO to entity mapping |

### Scheduling

| Technology | Rationale |
|------------|-----------|
| **@nestjs/schedule** | Built-in task scheduling for cleanup jobs (expired sessions, token blacklist maintenance). Cron-based with timezone support |

## 🚀 Deployment Architecture

### Development Environment

```
┌─────────────────────────────────────────────────────────────────┐
│                    Developer Machine                              │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   NestJS     │  │  PostgreSQL  │  │       Redis          │  │
│  │   (Port 3000)│  │  (Port 5432) │  │     (Port 6379)      │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│                                                                  │
│  Environment: .env.development                                  │
│  Hot Reload: Enabled via nest start --watch                      │
│  Debug Mode: Enabled                                             │
└─────────────────────────────────────────────────────────────────┘
```

### Production Environment

```
┌─────────────────────────────────────────────────────────────────┐
│                    Load Balancer (Nginx/ALB)                     │
│                    SSL Termination                               │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              Application Servers (PM2 Cluster)                   │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  Instance 1  │  │  Instance 2  │  │      Instance N      │  │
│  │   NestJS     │  │   NestJS     │  │       NestJS         │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Infrastructure Services                       │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ PostgreSQL   │  │    Redis     │  │       Ably           │  │
│  │ (Primary +   │  │  (Cluster)   │  │   (External)         │  │
│  │  Replicas)   │  │              │  │                      │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│                                                                  │
│  Backup: Daily snapshots + WAL archiving                         │
│  Monitoring: Application logs + DB metrics                       │
└─────────────────────────────────────────────────────────────────┘
```

### Docker Deployment (Optional)

```
┌─────────────────────────────────────────────────────────────────┐
│                    Docker Compose Stack                          │
│                                                                  │
│  Services:                                                       │
│  - app: NestJS application (multi-stage build)                   │
│  - postgres: PostgreSQL with persistent volume                    │
│  - redis: Redis with persistent volume                           │
│  - nginx: Reverse proxy with SSL configuration                   │
│                                                                  │
│  Networks:                                                       │
│  - backend: Internal communication                              │
│  - frontend: External access via nginx                          │
│                                                                  │
│  Volumes:                                                        │
│  - postgres_data: Database persistence                           │
│  - redis_data: Cache persistence                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🎯 DDD Layer Responsibilities

### Domain Layer

**Purpose**: Core business logic and rules, independent of infrastructure

**Components**:
- **Entities**: Aggregate roots with identity (User, Policy, Organization, etc.)
- **Value Objects**: Immutable values without identity (Password, Attributes, Slug, UUIDv7)
- **Domain Services**: Business logic that doesn't fit in entities (AuthService, UserService)
- **Repository Interfaces**: Contracts for data access (IUserRepository, IPolicyRepository)
- **Domain Events**: Significant business events (UserCreated, PolicyUpdated)

**Key Principles**:
- No external dependencies (framework-agnostic)
- Pure business logic
- Rich domain model with behavior
- Ubiquitous language

### Application Layer

**Purpose**: Orchestrate domain objects to fulfill use cases

**Components**:
- **Command Handlers**: Handle write operations (CreatePolicyCommandHandler)
- **Query Handlers**: Handle read operations (PolicyQueryHandler)
- **DTOs**: Data transfer objects for layer boundaries
- **Application Services**: Orchestrate multiple domain operations

**Key Principles**:
- Thin layer, delegates to domain
- CQRS separation (commands vs queries)
- Transaction management
- Use case orchestration

### Infrastructure Layer

**Purpose**: Provide technical capabilities for domain and application layers

**Components**:
- **Repository Implementations**: Prisma-based data access (PrismaPolicyRepository)
- **Event Publishers**: Ably integration for domain events
- **Cache Repositories**: Redis-based caching (SessionCacheRepository)
- **External Service Adapters**: Third-party integrations
- **Mappers**: Entity ↔ Database model conversion

**Key Principles**:
- Implements domain interfaces
- Framework-specific code lives here
- External dependencies isolated
- Configurable and swappable

### Presentation Layer

**Purpose**: Handle HTTP requests and responses

**Components**:
- **Controllers**: REST API endpoints (PolicyController, UserController)
- **Guards**: Authorization and authentication (AbacGuard, JwtAuthGuard)
- **DTOs**: Request/response validation
- **Interceptors**: Cross-cutting concerns (logging, transformation)
- **Filters**: Exception handling

**Key Principles**:
- Thin layer, no business logic
- Input validation and output formatting
- Security enforcement
- HTTP-specific concerns

## 🔐 ABAC Policy Structure

### Policy Definition

```typescript
interface IPolicyProps {
  name: string;              // Policy name for identification
  description?: string;      // Human-readable description
  effect: Effect;           // ALLOW or DENY
  action: string;           // Action being performed (e.g., "create", "read")
  resource: string;         // Resource type (e.g., "project", "policy")
  condition: any;           // JSON Logic rule for evaluation
  organization_id?: string; // Optional organization scope
}
```

### Policy Condition Examples

**Simple Attribute Check**:
```json
{
  "==": [
    { "var": "user.attributes.clearance" },
    5
  ]
}
```

**Time-Based Access**:
```json
{
  "and": [
    { "in": [
      { "var": "env.time" },
      ["09:00", "17:00"]
    ]},
    { "==": [
      { "var": "user.attributes.department" },
      "engineering"
    ]}
  ]
}
```

**Resource Ownership Check**:
```json
{
  "==": [
    { "var": "user.id" },
    { "var": "resource.attributes.owner_id" }
  ]
}
```

**Complex Multi-Factor**:
```json
{
  "or": [
    {
      "and": [
        { "==": [{ "var": "user.attributes.role" }, "admin"] },
        { "in": [{ "var": "user.organizations[].organization_id" }, { "var": "resource.organization_id" }] }
      ]
    },
    {
      "and": [
        { "==": [{ "var": "user.attributes.role" }, "manager"] },
        { "==": [{ "var": "resource.attributes.department" }, { "var": "user.attributes.department" }] }
      ]
    }
  ]
}
```

### Policy Evaluation Order

1. **DENY Policies First**: All DENY policies are evaluated first. If any DENY matches, access is immediately denied (deny overrides)
2. **ALLOW Policies Second**: If no DENY matched, ALLOW policies are evaluated. If any ALLOW matches, access is granted
3. **Default Deny**: If no policies match, access is denied by default

This follows the principle of "explicit deny, implicit allow" with deny taking precedence.

## 📊 Data Model

### Entity Relationships

```
User (1) ──────── (N) Staff ──────── (1) Organization
 │                                      │
 │                                      │
 │                                      │ (1) ──────── (N) Project
 │                                      │              │
 │                                      │              │
 │                                      │              │ (1) ──────── (N) Feature
 │                                      │              │
 │                                      │              │
 │                                      │              │ (1) ──────── (N) Member ── (1) Staff
 │                                      │
 │                                      │ (1) ──────── (N) Department
 │                                      │              │
 │                                      │              │ (1) ──────── (N) Staff
 │                                      │
 │                                      │ (1) ──────── (N) Role ──────── (N) Staff
 │
 │ (1) ──────── (N) Staff (as creator)
 │
 │ (1) ──────── (N) Organization (as creator)
 │
 │ (1) ──────── (N) Project (as creator)
 │
 │ (1) ──────── (N) Role (as creator)
 │
 │ (1) ──────── (N) Feature (as creator)

Organization (1) ──────── (N) Policy
```

### Attribute Storage

All entities support flexible attributes via JSON columns:

- **User.attributes**: User-specific attributes (clearance level, department, custom properties)
- **Organization.attributes**: Organization-specific attributes (tier, settings, metadata)
- **Staff.context_attributes**: Contextual attributes for user-organization relationship
- **Project.attributes**: Project-specific attributes (classification, sensitivity)
- **Member.context_attributes**: Contextual attributes for user-project relationship

This flexibility enables dynamic ABAC rules without schema changes.

## 🔒 Security Architecture

### Authentication Flow

```
1. User POST /auth/login with credentials
2. AuthService validates credentials
3. If valid, generates JWT token with user claims
4. Returns JWT token to client
5. Client includes JWT in Authorization header for subsequent requests
6. JwtAuthGuard validates token on each protected route
7. Extracts user identity and stores in request object
```

### Authorization Flow

```
1. Request arrives with JWT token
2. JwtAuthGuard validates and extracts user
3. TenantContextGuard extracts organization/project context
4. AbacGuard evaluates @CheckAbac decorator
5. PolicyQueryService retrieves matching policies
6. JsonLogicEngineAdapter evaluates conditions
7. Decision returned: ALLOW or DENY
8. If DENY, ForbiddenException thrown
9. If ALLOW, controller executes
```

### Token Management

- **Access Tokens**: Short-lived (15 minutes) JWT tokens
- **Refresh Tokens**: Long-lived (7 days) tokens stored in Redis
- **Token Blacklisting**: Revoked tokens stored in Redis with expiration
- **Session Storage**: Active sessions tracked in Redis for logout functionality

## 📈 Performance Considerations

### Caching Strategy

- **Session Cache**: Redis-based session storage with 15-minute TTL
- **Policy Cache**: Policies cached per organization with 5-minute TTL
- **User Cache**: User data cached with 10-minute TTL
- **Database Query Cache**: Prisma query result caching where appropriate

### Database Optimization

- **Indexes**: Strategic indexes on frequently queried columns (email, username, slug, action+resource)
- **Connection Pooling**: Prisma connection pool configured for optimal throughput
- **Query Optimization**: N+1 query prevention via include/select
- **Read Replicas**: Support for read replicas for scaling read operations

### Authorization Performance

- **Policy Pre-filtering**: Policies filtered by action/resource before evaluation
- **Short-Circuit Evaluation**: DENY policies evaluated first for early rejection
- **Context Caching**: Authorization context built once per request
- **Rule Compilation**: JSON Logic rules compiled for faster evaluation

## 🔄 Event-Driven Architecture

### Domain Events

```
Domain Event Flow:

Entity (Domain Layer)
    ↓ emits
Event Publisher (Infrastructure Layer)
    ↓ publishes
Ably Channel (External Service)
    ↓ broadcasts
Subscribers (Other Services/Consumers)
```

**Event Types**:
- `UserCreated`: New user registered
- `OrganizationCreated`: New organization created
- `PolicyUpdated`: Policy modified
- `FeatureCreated`: New feature defined

**Event Publishing**:
- Events published after successful persistence
- Includes event metadata (timestamp, correlation ID)
- Reliable delivery via Ably guarantees

## 🧪 Testing Strategy

### Unit Tests

- **Domain Layer**: Test entities, value objects, domain services in isolation
- **Application Layer**: Test command/query handlers with mocked repositories
- **Infrastructure Layer**: Test repository implementations with test database

### Integration Tests

- **API Tests**: Test full request/response cycle with test database
- **Policy Tests**: Test ABAC decision logic with various policy scenarios
- **Authentication Tests**: Test JWT generation, validation, refresh flow

### E2E Tests

- **User Flows**: Test complete user journeys (register → login → create organization → assign policies)
- **Multi-Tenancy**: Test tenant isolation and context propagation
- **Performance Tests**: Load testing for authorization decision throughput

## 📝 Monitoring & Observability

### Logging Strategy

- **Structured Logging**: JSON-formatted logs with consistent fields
- **Correlation IDs**: Request-scoped IDs for traceability
- **Log Levels**: ERROR, WARN, INFO, DEBUG with appropriate usage
- **Sensitive Data**: Passwords, tokens redacted from logs

### Metrics

- **Request Metrics**: Response time, throughput, error rate
- **Authorization Metrics**: Policy evaluation time, allow/deny ratio
- **Database Metrics**: Query time, connection pool usage
- **Cache Metrics**: Hit rate, eviction rate, memory usage

### Health Checks

- **Liveness Probe**: Application responding to HTTP requests
- **Readiness Probe**: Database and Redis connections established
- **Dependency Health**: PostgreSQL, Redis, Ably connectivity

## 🎓 Key Design Decisions

### Why DDD?

- **Complex Business Logic**: ABAC requires rich domain modeling
- **Bounded Contexts**: IAM module is a clear bounded context
- **Ubiquitous Language**: Aligns code with business terminology
- **Testability**: Domain logic isolated from framework concerns

### Why CQRS?

- **Read/Write Separation**: Authorization decisions are read-heavy
- **Optimized Queries**: Query models can differ from write models
- **Scalability**: Read and write can be scaled independently
- **Clear Intent**: Commands vs queries make code intent explicit

### Why json-logic-js?

- **Standard Format**: JSON Logic is a well-known standard
- **Declarative Rules**: Rules expressed as data, not code
- **Language Agnostic**: Rules can be stored and evaluated anywhere
- **Complex Conditions**: Supports nested logic without custom parsing

### Why Multi-Tenant via Headers?

- **Stateless API**: No session storage required for tenant context
- **Flexibility**: Easy to switch contexts without re-authentication
- **Security**: Tenant context validated on each request
- **Simplicity**: Clean separation of concerns

---

**ABAC NestJS Architecture Documentation**

Generated on: 2026-04-14
Version: 0.0.1
