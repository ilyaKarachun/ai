# Posts Endpoints

## Overview
The Posts API provides endpoints for creating, reading, updating, and deleting blog posts. Each post can have associated comments and belongs to a user.

## Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts` | List all posts |
| GET | `/posts/:id` | Get a specific post |
| POST | `/posts` | Create a new post |
| PUT | `/posts/:id` | Update a post |
| DELETE | `/posts/:id` | Delete a post |
| GET | `/posts/:id/comments` | Get comments for a post |

## List All Posts

### Endpoint
```
GET /api/v1/posts
```

### Authentication
Optional - Authenticated users get additional fields

### Query Parameters
| Parameter | Type | Description | Required | Default |
|-----------|------|-------------|-----------|---------|
| page | number | Page number | No | 1 |
| limit | number | Items per page | No | 10 |
| userId | number | Filter by user | No | - |
| search | string | Search in title/body | No | - |

### Response
#### Success Response
```typescript
interface PaginatedPostsResponse {
  data: {
    id: number;
    title: string;
    body: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
    user?: {
      id: number;
      name: string;
    };
  }[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
```

#### Error Response
```typescript
interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}
```

### Examples
#### Request Example
```bash
curl -X GET 'http://localhost:3000/api/v1/posts?page=1&limit=10&userId=1'
```

#### Response Example
```json
{
  "data": [
    {
      "id": 1,
      "title": "Example Post",
      "body": "This is an example post body",
      "userId": 1,
      "createdAt": "2024-01-23T10:00:00.000Z",
      "updatedAt": "2024-01-23T10:00:00.000Z",
      "user": {
        "id": 1,
        "name": "John Doe"
      }
    }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

## Create Post

### Endpoint
```
POST /api/v1/posts
```

### Authentication
Required - Bearer Token

### Request
#### Headers
| Header | Type | Description | Required |
|--------|------|-------------|-----------|
| Authorization | string | Bearer token | Yes |
| Content-Type | string | application/json | Yes |

#### Body
```typescript
interface CreatePostDto {
  title: string;
  body: string;
}
```

### Response
#### Success Response (201 Created)
```typescript
interface PostResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}
```

### Examples
#### Request Example
```typescript
const response = await fetch('http://localhost:3000/api/v1/posts', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-token',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'New Post',
    body: 'This is the content of my new post',
  }),
});
```

#### Response Example
```json
{
  "id": 101,
  "title": "New Post",
  "body": "This is the content of my new post",
  "userId": 1,
  "createdAt": "2024-01-23T10:00:00.000Z",
  "updatedAt": "2024-01-23T10:00:00.000Z"
}
```

## Get Post by ID

### Endpoint
```
GET /api/v1/posts/:id
```

### Parameters
| Parameter | Type | Description | Required |
|-----------|------|-------------|-----------|
| id | number | Post ID | Yes |

### Response
#### Success Response
```typescript
interface PostResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: number;
    name: string;
  };
  comments?: {
    id: number;
    body: string;
    userId: number;
  }[];
}
```

#### Error Response (404 Not Found)
```json
{
  "statusCode": 404,
  "message": "Post not found",
  "error": "Not Found"
}
```

### Examples
#### Request Example
```bash
curl http://localhost:3000/api/v1/posts/1
```

#### Response Example
```json
{
  "id": 1,
  "title": "Example Post",
  "body": "This is an example post body",
  "userId": 1,
  "createdAt": "2024-01-23T10:00:00.000Z",
  "updatedAt": "2024-01-23T10:00:00.000Z",
  "user": {
    "id": 1,
    "name": "John Doe"
  },
  "comments": [
    {
      "id": 1,
      "body": "Great post!",
      "userId": 2
    }
  ]
}
```

## Rate Limiting

- Anonymous users: 100 requests per hour
- Authenticated users: 1000 requests per hour
- Rate limit headers are included in responses:
  - X-RateLimit-Limit
  - X-RateLimit-Remaining
  - X-RateLimit-Reset

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

## Notes

- All timestamps are in ISO 8601 format
- The API supports ETags for caching
- Pagination is cursor-based for optimal performance
- Soft deletion is implemented - deleted posts are marked but not removed
- Changes trigger webhooks if configured 