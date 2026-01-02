# API Specification

## Base URL
```
https://api.reckai.com/v1
```

## Authentication
All API requests require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <access_token>
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 100,
    "total_pages": 5
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
```

## Endpoints

### Authentication

#### POST /auth/login
Login with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "remember_me": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_in": 900,
    "user": {
      "id": "user-123",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "admin",
      "organization_id": "org-456"
    }
  }
}
```

#### POST /auth/refresh
Refresh access token.

**Request:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### POST /auth/logout
Logout and invalidate tokens.

#### POST /auth/mfa/enable
Enable MFA for current user.

#### POST /auth/mfa/verify
Verify MFA code.

---

### Reconciliations

#### GET /reconciliations
List reconciliation jobs.

**Query Parameters:**
- `page` (integer, default: 1)
- `per_page` (integer, default: 20, max: 100)
- `status` (string: pending, processing, completed, failed)
- `search` (string)
- `sort` (string: created_at, updated_at, name)
- `order` (string: asc, desc)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "job-123",
      "name": "POS Settlement Dec 2025",
      "status": "completed",
      "progress": 100,
      "total_rows": 50000,
      "matched_rows": 48750,
      "exception_rows": 1250,
      "match_rate": 97.5,
      "created_at": "2025-12-30T10:00:00Z",
      "created_by": {
        "id": "user-123",
        "name": "John Doe"
      }
    }
  ],
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 45,
    "total_pages": 3
  }
}
```

#### POST /reconciliations
Create new reconciliation job.

**Request:**
```json
{
  "name": "POS Settlement Dec 2025",
  "file_ids": ["file-123", "file-456"],
  "rule_ids": ["rule-789"]
}
```

#### GET /reconciliations/:id
Get reconciliation job details.

#### DELETE /reconciliations/:id
Cancel/delete reconciliation job.

---

### Files

#### POST /files/upload
Upload reconciliation file.

**Request:** (multipart/form-data)
- `file` (file)
- `file_type` (string: bank, settlement, switch, card, gl)
- `job_id` (string, optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "file-123",
    "name": "settlement.xlsx",
    "size_bytes": 2048000,
    "file_type": "settlement",
    "format": "excel",
    "status": "uploaded",
    "uploaded_at": "2025-12-30T10:00:00Z"
  }
}
```

#### GET /files/:id
Get file details.

#### DELETE /files/:id
Delete file.

#### GET /files/:id/download
Download file (pre-signed URL).

#### POST /files/:id/map
Map file columns.

**Request:**
```json
{
  "mappings": [
    {
      "source_column": "Transaction ID",
      "target_field": "transaction_id",
      "data_type": "string"
    }
  ]
}
```

---

### Exceptions

#### GET /exceptions
List exceptions.

**Query Parameters:**
- `page`, `per_page`
- `status` (open, in_progress, resolved, escalated)
- `severity` (low, medium, high, critical)
- `type` (amount_mismatch, date_mismatch, etc.)
- `job_id` (string)
- `assigned_to` (string)

#### GET /exceptions/:id
Get exception details.

#### PATCH /exceptions/:id
Update exception.

**Request:**
```json
{
  "status": "in_progress",
  "assigned_to": "user-123"
}
```

#### POST /exceptions/:id/resolve
Resolve exception.

**Request:**
```json
{
  "resolution": "Matched manually",
  "comments": "Additional notes"
}
```

#### POST /exceptions/:id/comments
Add comment to exception.

---

### Approvals

#### GET /approvals
List approvals.

**Query Parameters:**
- `status` (pending, approved, declined)
- `type` (rule_configuration, ledger_posting, etc.)

#### POST /approvals
Create approval request.

**Request:**
```json
{
  "type": "rule_configuration",
  "title": "New Fuzzy Matching Rule",
  "description": "Add fuzzy matching for transaction IDs",
  "metadata": {
    "ruleName": "Fuzzy Transaction ID",
    "ruleType": "fuzzy",
    "tolerance": 0.85
  }
}
```

#### POST /approvals/:id/approve
Approve request.

**Request:**
```json
{
  "comments": "Approved - looks good"
}
```

#### POST /approvals/:id/decline
Decline request.

**Request:**
```json
{
  "comments": "Needs more information"
}
```

---

### Users

#### GET /users
List users (admin only).

#### POST /users
Create user (requires approval for non-admins).

#### GET /users/:id
Get user details.

#### PUT /users/:id
Update user.

#### DELETE /users/:id
Delete user (admin only).

---

### Reports

#### GET /reports
List generated reports.

#### POST /reports/generate
Generate report.

**Request:**
```json
{
  "type": "daily",
  "format": "pdf",
  "date_range": {
    "start": "2025-12-01",
    "end": "2025-12-30"
  },
  "parameters": {}
}
```

#### GET /reports/:id/download
Download report (pre-signed URL).

---

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid input |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |

## Rate Limits

- Authentication: 5 requests/minute
- API calls: 100 requests/minute per user
- File upload: 10 uploads/hour
- Report generation: 5 reports/hour

