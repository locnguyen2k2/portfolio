# 📚 ABAC NestJS - API Documentation

## 🎯 API Overview

The ABAC NestJS API provides a comprehensive RESTful interface for managing users, organizations, projects, roles, policies, and attributes in an Attributes-Based Access Control system. All endpoints follow REST conventions and support JSON request/response formats.

**Base URL**: `http://localhost:3000/v1`

**API Version**: v1

**Content-Type**: `application/json`

**Authentication**: JWT Bearer Token

## 🔐 Authentication Methods

### JWT Bearer Token Authentication

Most endpoints require JWT authentication. Include the access token in the Authorization header:

```http
Authorization: Bearer <your-access-token>
```

**Token Types**:
- **Access Token**: Short-lived (15 minutes) for API access
- **Refresh Token**: Long-lived (7 days) for obtaining new access tokens

### Token Lifecycle

1. **Register/Login**: Obtain initial access and refresh tokens
2. **Access API**: Use access token for authenticated requests
3. **Refresh**: Use refresh token to get new access token when expired
4. **Logout**: Invalidate both tokens

## 📋 Complete Endpoint Documentation

### Authentication Endpoints

#### Register User

Register a new user account.

```http
POST /v1/users/register
```

**Request Body**:
```json
{
  "username": "john_doe",
  "password": "SecurePass123!",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com"
}
```

**Response** (201 Created):
```json
{
  "user": {
    "id": "018f1234-5678-9abc-def0-123456789abc",
    "username": "john_doe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "status": "ACTIVE",
    "created_at": "2026-04-14T10:00:00.000Z",
    "updated_at": "2026-04-14T10:00:00.000Z"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Error Responses**:
- `400 Bad Request`: Invalid input data
- `409 Conflict`: Username or email already exists

---

#### Login User

Authenticate with username and password.

```http
POST /v1/users/login
```

**Request Body**:
```json
{
  "username": "john_doe",
  "password": "SecurePass123!"
}
```

**Response** (200 OK):
```json
{
  "user": {
    "id": "018f1234-5678-9abc-def0-123456789abc",
    "username": "john_doe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "status": "ACTIVE"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid credentials

---

#### Get Current User

Retrieve the currently authenticated user's profile.

```http
GET /v1/users/me
```

**Headers**:
```http
Authorization: Bearer <access-token>
```

**Response** (200 OK):
```json
{
  "id": "018f1234-5678-9abc-def0-123456789abc",
  "username": "john_doe",
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "status": "ACTIVE",
  "created_at": "2026-04-14T10:00:00.000Z",
  "updated_at": "2026-04-14T10:00:00.000Z"
}
```

---

#### Verify Access Token

Verify if an access token is valid and retrieve user information.

```http
POST /v1/users/verify-access-token
```

**Request Body**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response** (200 OK):
```json
{
  "id": "018f1234-5678-9abc-def0-123456789abc",
  "username": "john_doe",
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "status": "ACTIVE"
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid or expired token

---

#### Refresh Token

Obtain a new access token using a refresh token.

```http
POST /v1/users/refresh-token
```

**Request Body**:
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response** (200 OK):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid or expired refresh token

---

#### Logout

Invalidate access and refresh tokens.

```http
POST /v1/users/logout
```

**Request Body**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response** (200 OK):
```json
{
  "message": "Logged out successfully"
}
```

---

### Organization Endpoints

#### List Organizations (Pagination)

List organizations with offset-based pagination.

```http
GET /v1/organizations
```

**Headers**:
```http
Authorization: Bearer <access-token>
```

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `sort` (optional): Sort field (default: created_at)
- `order` (optional): Sort order (asc/desc, default: desc)

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": "018f1234-5678-9abc-def0-123456789abc",
      "name": "Acme Corp",
      "slug": "acme-corp",
      "description": "Technology company",
      "created_at": "2026-04-14T10:00:00.000Z",
      "updated_at": "2026-04-14T10:00:00.000Z"
    }
  ],
  "paginated": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "total_pages": 3
  }
}
```

**ABAC Check**: Requires `READ` permission on `Organization`

---

#### List Organizations (Cursor Pagination)

List organizations with cursor-based pagination for large datasets.

```http
GET /v1/organizations/cursor
```

**Headers**:
```http
Authorization: Bearer <access-token>
```

**Query Parameters**:
- `cursor` (optional): Cursor from previous page
- `limit` (optional): Items per page (default: 10)

**Response** (200 OK):
```json
{
  "data": [...],
  "paginated": {
    "next_cursor": "eyJjdXJzb3IiOiIwMTdm...",
    "has_next": true,
    "limit": 10
  }
}
```

---

#### Create Organization

Create a new organization.

```http
POST /v1/organizations
```

**Headers**:
```http
Authorization: Bearer <access-token>
```

**Request Body**:
```json
{
  "name": "Acme Corp",
  "slug": "acme-corp",
  "description": "Technology company",
  "attributes": {
    "tier": "enterprise",
    "max_users": 1000
  }
}
```

**Response** (201 Created):
```json
{
  "id": "018f1234-5678-9abc-def0-123456789abc",
  "name": "Acme Corp",
  "slug": "acme-corp",
  "description": "Technology company",
  "created_at": "2026-04-14T10:00:00.000Z",
  "updated_at": "2026-04-14T10:00:00.000Z"
}
```

**ABAC Check**: Requires `CREATE` permission on `Organization`

---

#### Get Organization by ID

Retrieve a specific organization by ID.

```http
GET /v1/organizations/:id
```

**Headers**:
```http
Authorization: Bearer <access-token>
organization-id: <organization-id>
```

**Response** (200 OK):
```json
{
  "id": "018f1234-5678-9abc-def0-123456789abc",
  "name": "Acme Corp",
  "slug": "acme-corp",
  "description": "Technology company",
  "created_at": "2026-04-14T10:00:00.000Z",
  "updated_at": "2026-04-14T10:00:00.000Z"
}
```

**ABAC Check**: Requires `READ` permission on `Organization`

---

#### Get Organization by Slug

Retrieve an organization by its slug.

```http
GET /v1/organizations/slug/:slug
```

**Headers**:
```http
Authorization: Bearer <access-token>
organization-id: <organization-id>
```

**Response** (200 OK):
```json
{
  "id": "018f1234-5678-9abc-def0-123456789abc",
  "name": "Acme Corp",
  "slug": "acme-corp",
  "description": "Technology company"
}
```

---

#### Update Organization

Update an existing organization.

```http
PATCH /v1/organizations/:id
```

**Headers**:
```http
Authorization: Bearer <access-token>
organization-id: <organization-id>
```

**Request Body**:
```json
{
  "name": "Acme Corporation",
  "description": "Updated description"
}
```

**Response** (200 OK):
```json
{
  "id": "018f1234-5678-9abc-def0-123456789abc",
  "name": "Acme Corporation",
  "slug": "acme-corp",
  "description": "Updated description",
  "updated_at": "2026-04-14T11:00:00.000Z"
}
```

**ABAC Check**: Requires `UPDATE` permission on `Organization`

---

#### Delete Organization

Delete an organization.

```http
DELETE /v1/organizations/:id
```

**Headers**:
```http
Authorization: Bearer <access-token>
organization-id: <organization-id>
```

**Response** (204 No Content)

**ABAC Check**: Requires `DELETE` permission on `Organization`

---

#### Join Organization

Join an existing organization.

```http
POST /v1/organizations/:id/join
```

**Headers**:
```http
Authorization: Bearer <access-token>
project-id: <project-id>
```

**Response** (200 OK):
```json
{
  "message": "Successfully joined organization"
}
```

**ABAC Check**: Requires `UPDATE` permission on `Organization`

---

#### Get User's Organizations

Retrieve organizations the current user has joined.

```http
GET /v1/organizations/joined
```

**Headers**:
```http
Authorization: Bearer <access-token>
```

**Response** (200 OK):
```json
{
  "data": [...],
  "paginated": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "total_pages": 1
  }
}
```

---

#### Update User Attributes in Organization

Update a user's context attributes within an organization.

```http
PATCH /v1/organizations/:orgId/users/:userId/attributes
```

**Headers**:
```http
Authorization: Bearer <access-token>
organization-id: <organization-id>
```

**Request Body**:
```json
{
  "role": "manager",
  "department": "engineering",
  "clearance_level": 3
}
```

**Response** (200 OK):
```json
{
  "message": "User attributes updated successfully"
}
```

---

### Role Endpoints

#### Create Role

Create a new role within an organization.

```http
POST /v1/roles
```

**Headers**:
```http
Authorization: Bearer <access-token>
organization-id: <organization-id>
```

**Request Body**:
```json
{
  "name": "Administrator",
  "slug": "admin",
  "attributes": {
    "permissions": ["all"],
    "priority": 1
  }
}
```

**Response** (201 Created):
```json
{
  "id": "018f1234-5678-9abc-def0-123456789abc",
  "name": "Administrator",
  "slug": "admin",
  "organization_id": "018f1234-5678-9abc-def0-123456789abc",
  "status": "ACTIVE",
  "created_at": "2026-04-14T10:00:00.000Z",
  "updated_at": "2026-04-14T10:00:00.000Z"
}
```

**ABAC Check**: Requires `CREATE` permission on `Role`

---

#### List Roles (Pagination)

List roles within an organization.

```http
GET /v1/roles
```

**Headers**:
```http
Authorization: Bearer <access-token>
organization-id: <organization-id>
```

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": "018f1234-5678-9abc-def0-123456789abc",
      "name": "Administrator",
      "slug": "admin",
      "status": "ACTIVE",
      "created_at": "2026-04-14T10:00:00.000Z"
    }
  ],
  "paginated": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "total_pages": 1
  }
}
```

**ABAC Check**: Requires `READ` permission on `Role`

---

#### Get Role by ID

Retrieve a specific role.

```http
GET /v1/roles/:id
```

**Headers**:
```http
Authorization: Bearer <access-token>
organization-id: <organization-id>
```

**Response** (200 OK):
```json
{
  "id": "018f1234-5678-9abc-def0-123456789abc",
  "name": "Administrator",
  "slug": "admin",
  "status": "ACTIVE",
  "created_at": "2026-04-14T10:00:00.000Z",
  "updated_at": "2026-04-14T10:00:00.000Z"
}
```

**ABAC Check**: Requires `READ` permission on `Role`

---

#### Get Role by Slug

Retrieve a role by its slug.

```http
GET /v1/roles/slug/:slug
```

**Headers**:
```http
Authorization: Bearer <access-token>
organization-id: <organization-id>
```

**Response** (200 OK):
```json
{
  "id": "018f1234-5678-9abc-def0-123456789abc",
  "name": "Administrator",
  "slug": "admin",
  "status": "ACTIVE"
}
```

---

#### Update Role

Update an existing role.

```http
PATCH /v1/roles/:id
```

**Headers**:
```http
Authorization: Bearer <access-token>
organization-id: <organization-id>
```

**Request Body**:
```json
{
  "name": "Super Admin",
  "attributes": {
    "priority": 0
  }
}
```

**Response** (200 OK):
```json
{
  "id": "018f1234-5678-9abc-def0-123456789abc",
  "name": "Super Admin",
  "slug": "admin",
  "updated_at": "2026-04-14T11:00:00.000Z"
}
```

**ABAC Check**: Requires `UPDATE` permission on `Role`

---

#### Delete Role

Delete a role.

```http
DELETE /v1/roles/:id
```

**Headers**:
```http
Authorization: Bearer <access-token>
organization-id: <organization-id>
```

**Response** (204 No Content)

**ABAC Check**: Requires `DELETE` permission on `Role`

---

### Policy Endpoints

#### List Policies

List policies within an organization.

```http
GET /v1/organizations/:orgId/policies
```

**Headers**:
```http
Authorization: Bearer <access-token>
organization-id: <organization-id>
```

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": "018f1234-5678-9abc-def0-123456789abc",
      "name": "Project Create Policy",
      "description": "Allows creating projects",
      "effect": "ALLOW",
      "action": "create",
      "resource": "Project",
      "condition": {
        "==": [
          { "var": "user.attributes.clearance" },
          5
        ]
      },
      "organization_id": "018f1234-5678-9abc-def0-123456789abc",
      "created_at": "2026-04-14T10:00:00.000Z",
      "updated_at": "2026-04-14T10:00:00.000Z"
    }
  ]
}
```

---

#### Create Policy

Create a new ABAC policy.

```http
POST /v1/organizations/:orgId/policies
```

**Headers**:
```http
Authorization: Bearer <access-token>
organization-id: <organization-id>
```

**Request Body**:
```json
{
  "name": "Project Create Policy",
  "description": "Allows creating projects",
  "effect": "ALLOW",
  "action": "create",
  "resource": "Project",
  "condition": {
    "==": [
      { "var": "user.attributes.clearance" },
      5
    ]
  }
}
```

**Response** (201 Created):
```json
{
  "id": "018f1234-5678-9abc-def0-123456789abc",
  "name": "Project Create Policy",
  "description": "Allows creating projects",
  "effect": "ALLOW",
  "action": "create",
  "resource": "Project",
  "condition": {
    "==": [
      { "var": "user.attributes.clearance" },
      5
    ]
  },
  "created_at": "2026-04-14T10:00:00.000Z",
  "updated_at": "2026-04-14T10:00:00.000Z"
}
```

**Policy Condition Examples**:

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

**Resource Ownership**:
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

---

#### Update Policy

Update an existing policy.

```http
PATCH /v1/organizations/:orgId/policies/:id
```

**Headers**:
```http
Authorization: Bearer <access-token>
organization-id: <organization-id>
```

**Request Body**:
```json
{
  "name": "Updated Policy Name",
  "condition": {
    "and": [
      { "==": [{ "var": "user.attributes.clearance" }, 5] },
      { "==": [{ "var": "resource.attributes.status" }, "active"] }
    ]
  }
}
```

**Response** (200 OK):
```json
{
  "id": "018f1234-5678-9abc-def0-123456789abc",
  "name": "Updated Policy Name",
  "updated_at": "2026-04-14T11:00:00.000Z"
}
```

---

#### Delete Policy

Delete a policy.

```http
DELETE /v1/organizations/:orgId/policies/:id
```

**Headers**:
```http
Authorization: Bearer <access-token>
organization-id: <organization-id>
```

**Response** (204 No Content)

---

### Project Endpoints

#### Create Project

Create a new project within an organization.

```http
POST /v1/projects
```

**Headers**:
```http
Authorization: Bearer <access-token>
organization-id: <organization-id>
```

**Request Body**:
```json
{
  "name": "Website Redesign",
  "slug": "website-redesign",
  "description": "Redesign company website",
  "department_id": "018f1234-5678-9abc-def0-123456789abc",
  "attributes": {
    "priority": "high",
    "budget": 50000
  }
}
```

**Response** (201 Created):
```json
{
  "id": "018f1234-5678-9abc-def0-123456789abc",
  "name": "Website Redesign",
  "slug": "website-redesign",
  "description": "Redesign company website",
  "organization_id": "018f1234-5678-9abc-def0-123456789abc",
  "created_at": "2026-04-14T10:00:00.000Z",
  "updated_at": "2026-04-14T10:00:00.000Z"
}
```

**ABAC Check**: Requires `CREATE` permission on `Project`

---

#### List Projects

List projects within an organization.

```http
GET /v1/projects
```

**Headers**:
```http
Authorization: Bearer <access-token>
organization-id: <organization-id>
```

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": "018f1234-5678-9abc-def0-123456789abc",
      "name": "Website Redesign",
      "slug": "website-redesign",
      "status": "ACTIVE",
      "created_at": "2026-04-14T10:00:00.000Z"
    }
  ],
  "paginated": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "total_pages": 2
  }
}
```

**ABAC Check**: Requires `READ` permission on `Project`

---

### Feature Endpoints

#### Create Feature

Define a new feature within a project.

```http
POST /v1/features
```

**Headers**:
```http
Authorization: Bearer <access-token>
organization-id: <organization-id>
project-id: <project-id>
```

**Request Body**:
```json
{
  "name": "User Authentication",
  "slug": "user-authentication",
  "description": "User login and registration",
  "attributes": {
    "complexity": "high",
    "estimated_hours": 40
  }
}
```

**Response** (201 Created):
```json
{
  "id": "018f1234-5678-9abc-def0-123456789abc",
  "name": "User Authentication",
  "slug": "user-authentication",
  "status": "ACTIVE",
  "project_id": "018f1234-5678-9abc-def0-123456789abc",
  "created_at": "2026-04-14T10:00:00.000Z",
  "updated_at": "2026-04-14T10:00:00.000Z"
}
```

---

### Attribute Endpoints

#### Define Attribute

Define a new attribute schema for an entity type.

```http
POST /v1/attributes
```

**Headers**:
```http
Authorization: Bearer <access-token>
organization-id: <organization-id>
```

**Request Body**:
```json
{
  "entity_type": "USER",
  "key": "clearance",
  "data_type": "NUMBER",
  "description": "Security clearance level (1-10)"
}
```

**Response** (201 Created):
```json
{
  "id": "018f1234-5678-9abc-def0-123456789abc",
  "entity_type": "USER",
  "key": "clearance",
  "data_type": "NUMBER",
  "description": "Security clearance level (1-10)"
}
```

---

### Department Endpoints

#### Create Department

Create a new department within an organization.

```http
POST /v1/departments
```

**Headers**:
```http
Authorization: Bearer <access-token>
organization-id: <organization-id>
```

**Request Body**:
```json
{
  "name": "Engineering",
  "slug": "engineering",
  "attributes": {
    "budget": 1000000,
    "head_count": 50
  }
}
```

**Response** (201 Created):
```json
{
  "id": "018f1234-5678-9abc-def0-123456789abc",
  "name": "Engineering",
  "slug": "engineering",
  "organization_id": "018f1234-5678-9abc-def0-123456789abc",
  "created_at": "2026-04-14T10:00:00.000Z",
  "updated_at": "2026-04-14T10:00:00.000Z"
}
```

---

### Member Endpoints

#### Add Member to Project

Add a staff member to a project.

```http
POST /v1/members
```

**Headers**:
```http
Authorization: Bearer <access-token>
organization-id: <organization-id>
```

**Request Body**:
```json
{
  "staff_id": "018f1234-5678-9abc-def0-123456789abc",
  "project_id": "018f1234-5678-9abc-def0-123456789abc",
  "context_attributes": {
    "role": "developer",
    "allocation": "100%"
  }
}
```

**Response** (201 Created):
```json
{
  "id": "018f1234-5678-9abc-def0-123456789abc",
  "staff_id": "018f1234-5678-9abc-def0-123456789abc",
  "project_id": "018f1234-5678-9abc-def0-123456789abc",
  "status": "ACTIVE",
  "created_at": "2026-04-14T10:00:00.000Z",
  "updated_at": "2026-04-14T10:00:00.000Z"
}
```

---

## 📊 Request/Response Schemas

### Common Response Structure

All successful responses follow this structure:

```typescript
interface SuccessResponse<T> {
  data?: T;
  paginated?: PaginationInfo;
  message?: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

interface CursorPaginationInfo {
  next_cursor?: string;
  has_next: boolean;
  limit: number;
}
```

### Error Response Structure

All error responses follow this structure:

```typescript
interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
}
```

### Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 204 | No Content - Successful deletion |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required or failed |
| 403 | Forbidden - ABAC policy denied access |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 422 | Unprocessable Entity - Validation failed |
| 500 | Internal Server Error - Server error |

---

## 🛡️ ABAC Authorization

### Using @CheckAbac Decorator

The `@CheckAbac` decorator is used to protect endpoints with ABAC policies:

```typescript
@CheckAbac('CREATE', 'Project')
@UseGuards(JwtAuthGuard, AbacGuard)
async createProject(@Body() dto: CreateProjectDto) {
  // Controller logic
}
```

**Parameters**:
- `action`: The action being performed (e.g., 'CREATE', 'READ', 'UPDATE', 'DELETE')
- `resource`: The resource type (e.g., 'Project', 'Organization', 'Policy')

### Policy Evaluation Context

When evaluating policies, the following context is built:

```typescript
interface AuthorizationContext {
  user: {
    id: string;
    email: string;
    username: string;
    attributes: Record<string, any>;
    context_attributes: Record<string, any>;
    organizations: Array<{
      organization_id: string;
      status: string;
      context_attributes: Record<string, any>;
    }>;
  };
  resource: {
    type: string;
    attributes: Record<string, any>;
  };
  env: {
    time: string;
    ip: string;
  };
}
```

### Policy Evaluation Order

1. **DENY Policies**: Evaluated first. If any DENY matches, access is denied immediately
2. **ALLOW Policies**: Evaluated if no DENY matched. If any ALLOW matches, access is granted
3. **Default Deny**: If no policies match, access is denied

### Multi-Tenant Context Headers

For multi-tenant operations, include these headers:

```http
organization-id: <organization-id>
project-id: <project-id>
```

The `TenantContextGuard` validates these headers and stores the context in CLS (Context Local Storage) for use in authorization decisions.

---

## 🧪 Usage Examples

### Complete User Flow

```bash
# 1. Register a new user
curl -X POST http://localhost:3000/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "SecurePass123!",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com"
  }'

# Response includes access_token and refresh_token

# 2. Login
curl -X POST http://localhost:3000/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "SecurePass123!"
  }'

# 3. Create an organization
curl -X POST http://localhost:3000/v1/organizations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access-token>" \
  -d '{
    "name": "Acme Corp",
    "slug": "acme-corp",
    "description": "Technology company"
  }'

# 4. Create a policy
curl -X POST http://localhost:3000/v1/organizations/<org-id>/policies \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access-token>" \
  -H "organization-id: <org-id>" \
  -d '{
    "name": "Project Create Policy",
    "effect": "ALLOW",
    "action": "create",
    "resource": "Project",
    "condition": {
      "==": [
        { "var": "user.id" },
        { "var": "resource.owner_id" }
      ]
    }
  }'

# 5. Create a project (requires policy to allow)
curl -X POST http://localhost:3000/v1/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access-token>" \
  -H "organization-id: <org-id>" \
  -d '{
    "name": "Website Redesign",
    "slug": "website-redesign",
    "description": "Redesign company website"
  }'
```

### Testing Policy Decisions

```bash
# Test if a user can create a project
curl -X POST http://localhost:3000/v1/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access-token>" \
  -H "organization-id: <org-id>" \
  -d '{
    "name": "Test Project",
    "slug": "test-project"
  }'

# If denied, returns 403 Forbidden
# If allowed, returns 201 Created
```

---

## 🔒 Security Best Practices

### Token Management

1. **Store tokens securely**: Use httpOnly cookies or secure storage
2. **Use short-lived access tokens**: 15 minutes recommended
3. **Implement token refresh**: Use refresh tokens to obtain new access tokens
4. **Invalidate on logout**: Always call logout endpoint to invalidate tokens

### API Security

1. **Always use HTTPS**: Never transmit tokens over unencrypted connections
2. **Validate input**: All DTOs are validated using class-validator
3. **Rate limiting**: Implement rate limiting to prevent abuse
4. **Audit logs**: Log all authorization decisions for security monitoring

### ABAC Policy Best Practices

1. **Principle of least privilege**: Default to deny, explicitly allow
2. **DENY overrides**: DENY policies take precedence over ALLOW policies
3. **Test policies**: Always test policies in development before production
4. **Document policies**: Maintain clear documentation for all policies
5. **Regular review**: Review and update policies regularly

---

## 🚀 SDK Integration Examples

### JavaScript/TypeScript

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/v1',
});

// Set authentication token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refresh_token');
      const { data } = await axios.post('/v1/users/refresh-token', {
        refresh_token: refreshToken,
      });
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      error.config.headers.Authorization = `Bearer ${data.access_token}`;
      return axios.request(error.config);
    }
    return Promise.reject(error);
  }
);

// Example: Create organization
async function createOrganization(name: string, slug: string) {
  const { data } = await api.post('/organizations', {
    name,
    slug,
    description: 'My organization',
  });
  return data;
}
```

### Python

```python
import requests

class ABACClient:
    def __init__(self, base_url='http://localhost:3000/v1'):
        self.base_url = base_url
        self.access_token = None
        self.refresh_token = None
    
    def login(self, username, password):
        response = requests.post(
            f'{self.base_url}/users/login',
            json={'username': username, 'password': password}
        )
        data = response.json()
        self.access_token = data['access_token']
        self.refresh_token = data['refresh_token']
        return data
    
    def _get_headers(self):
        return {'Authorization': f'Bearer {self.access_token}'}
    
    def create_organization(self, name, slug, description=''):
        response = requests.post(
            f'{self.base_url}/organizations',
            json={'name': name, 'slug': slug, 'description': description},
            headers=self._get_headers()
        )
        return response.json()
    
    def create_policy(self, org_id, name, action, resource, condition):
        response = requests.post(
            f'{self.base_url}/organizations/{org_id}/policies',
            json={
                'name': name,
                'effect': 'ALLOW',
                'action': action,
                'resource': resource,
                'condition': condition
            },
            headers={
                **self._get_headers(),
                'organization-id': org_id
            }
        )
        return response.json()

# Usage
client = ABACClient()
client.login('john_doe', 'SecurePass123!')
org = client.create_organization('Acme Corp', 'acme-corp')
policy = client.create_policy(
    org['id'],
    'Project Create Policy',
    'create',
    'Project',
    {'==': [{'var': 'user.id'}, {'var': 'resource.owner_id'}]}
)
```

---

## 📖 Additional Resources

- **Swagger UI**: Access interactive API documentation at `/api` (requires basic auth)
- **Architecture Documentation**: See `project-docs/architecture-documentation.md`
- **Setup Guide**: See `project-docs/setup-guide.md`
- **JSON Logic Documentation**: https://jsonlogic.com/

---

**ABAC NestJS API Documentation**

Generated on: 2026-04-14
Version: 0.0.1
