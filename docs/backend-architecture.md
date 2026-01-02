# Backend Architecture & Implementation Guide

## Overview
This document outlines the backend requirements for ReckAI, excluding AI/ML components. It covers database design, security, multi-tenancy, logging, and standard practices.

---

## 1. Database Schema Design

### 1.1 Core Tables

#### Organizations (Multi-Tenancy)
```sql
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    domain VARCHAR(255),
    subscription_tier VARCHAR(50) DEFAULT 'standard',
    max_users INTEGER DEFAULT 10,
    max_storage_gb INTEGER DEFAULT 100,
    is_active BOOLEAN DEFAULT true,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);

CREATE INDEX idx_orgs_code ON organizations(code);
CREATE INDEX idx_orgs_active ON organizations(is_active);
```

#### Users
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'analyst', 'auditor', 'supervisor')),
    is_active BOOLEAN DEFAULT true,
    is_email_verified BOOLEAN DEFAULT false,
    mfa_enabled BOOLEAN DEFAULT false,
    mfa_secret VARCHAR(255),
    last_login_at TIMESTAMP,
    password_changed_at TIMESTAMP DEFAULT NOW(),
    failed_login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    
    UNIQUE(organization_id, email)
);

CREATE INDEX idx_users_org ON users(organization_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(is_active, organization_id);
```

#### User Sessions
```sql
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL UNIQUE,
    ip_address INET,
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    last_activity_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(token_hash)
);

CREATE INDEX idx_sessions_user ON user_sessions(user_id);
CREATE INDEX idx_sessions_expires ON user_sessions(expires_at);
CREATE INDEX idx_sessions_token ON user_sessions(token_hash);
```

#### Reconciliation Jobs
```sql
CREATE TABLE reconciliation_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    total_rows INTEGER DEFAULT 0,
    processed_rows INTEGER DEFAULT 0,
    matched_rows INTEGER DEFAULT 0,
    exception_rows INTEGER DEFAULT 0,
    match_rate DECIMAL(5,2),
    processing_time_seconds INTEGER,
    error_message TEXT,
    created_by UUID NOT NULL REFERENCES users(id),
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_jobs_org ON reconciliation_jobs(organization_id);
CREATE INDEX idx_jobs_status ON reconciliation_jobs(status, organization_id);
CREATE INDEX idx_jobs_created ON reconciliation_jobs(created_at DESC);
```

#### Reconciliation Files
```sql
CREATE TABLE reconciliation_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    job_id UUID REFERENCES reconciliation_jobs(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) NOT NULL CHECK (file_type IN ('bank', 'settlement', 'switch', 'card', 'gl')),
    format VARCHAR(50) NOT NULL CHECK (format IN ('excel', 'csv', 'txt', 'xml')),
    size_bytes BIGINT NOT NULL,
    storage_path TEXT NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('uploaded', 'mapped', 'normalized', 'processed', 'error')),
    row_count INTEGER,
    checksum VARCHAR(64),
    uploaded_by UUID NOT NULL REFERENCES users(id),
    uploaded_at TIMESTAMP DEFAULT NOW(),
    processed_at TIMESTAMP
);

CREATE INDEX idx_files_org ON reconciliation_files(organization_id);
CREATE INDEX idx_files_job ON reconciliation_files(job_id);
CREATE INDEX idx_files_type ON reconciliation_files(file_type, organization_id);
```

#### Data Mappings
```sql
CREATE TABLE data_mappings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    file_id UUID NOT NULL REFERENCES reconciliation_files(id) ON DELETE CASCADE,
    source_column VARCHAR(255) NOT NULL,
    target_field VARCHAR(255) NOT NULL,
    data_type VARCHAR(50) NOT NULL CHECK (data_type IN ('string', 'number', 'date', 'currency')),
    auto_detected BOOLEAN DEFAULT false,
    transformation_rules JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);

CREATE INDEX idx_mappings_file ON data_mappings(file_id);
CREATE INDEX idx_mappings_org ON data_mappings(organization_id);
```

#### Exceptions
```sql
CREATE TABLE exceptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    job_id UUID NOT NULL REFERENCES reconciliation_jobs(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('amount_mismatch', 'date_mismatch', 'missing_entry', 'duplicate', 'timing_difference', 'non_settlement')),
    severity VARCHAR(50) NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    status VARCHAR(50) NOT NULL CHECK (status IN ('open', 'in_progress', 'resolved', 'escalated', 'ignored')),
    amount DECIMAL(18,2),
    currency VARCHAR(3) DEFAULT 'NGN',
    transaction_date DATE,
    description TEXT NOT NULL,
    ai_explanation TEXT,
    ai_confidence DECIMAL(5,4),
    suggested_action TEXT,
    assigned_to UUID REFERENCES users(id),
    resolved_by UUID REFERENCES users(id),
    resolved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_exceptions_org ON exceptions(organization_id);
CREATE INDEX idx_exceptions_job ON exceptions(job_id);
CREATE INDEX idx_exceptions_status ON exceptions(status, organization_id);
CREATE INDEX idx_exceptions_severity ON exceptions(severity, organization_id);
CREATE INDEX idx_exceptions_assigned ON exceptions(assigned_to);
```

#### Exception Comments
```sql
CREATE TABLE exception_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exception_id UUID NOT NULL REFERENCES exceptions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_comments_exception ON exception_comments(exception_id);
```

#### Approvals
```sql
CREATE TABLE approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('rule_configuration', 'ledger_posting', 'user_onboarding', 'exception_resolution', 'report_generation', 'system_setting')),
    status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'approved', 'declined', 'cancelled')),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    metadata JSONB NOT NULL,
    requested_by UUID NOT NULL REFERENCES users(id),
    requested_at TIMESTAMP DEFAULT NOW(),
    reviewed_by UUID REFERENCES users(id),
    reviewed_at TIMESTAMP,
    review_comments TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_approvals_org ON approvals(organization_id);
CREATE INDEX idx_approvals_status ON approvals(status, organization_id);
CREATE INDEX idx_approvals_type ON approvals(type, organization_id);
CREATE INDEX idx_approvals_requested ON approvals(requested_by);
CREATE INDEX idx_approvals_pending ON approvals(status) WHERE status = 'pending';
```

#### Matching Rules
```sql
CREATE TABLE matching_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    rule_type VARCHAR(50) NOT NULL CHECK (rule_type IN ('exact', 'fuzzy', 'range', 'regex')),
    is_active BOOLEAN DEFAULT true,
    priority INTEGER DEFAULT 0,
    tolerance_percentage DECIMAL(5,4),
    tolerance_amount DECIMAL(18,2),
    date_tolerance_days INTEGER,
    field_mappings JSONB NOT NULL,
    conditions JSONB,
    approval_id UUID REFERENCES approvals(id),
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    approved_at TIMESTAMP,
    
    UNIQUE(organization_id, name)
);

CREATE INDEX idx_rules_org ON matching_rules(organization_id);
CREATE INDEX idx_rules_active ON matching_rules(is_active, organization_id);
```

#### Audit Logs
```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100),
    resource_id UUID,
    ip_address INET,
    user_agent TEXT,
    request_method VARCHAR(10),
    request_path TEXT,
    request_body JSONB,
    response_status INTEGER,
    error_message TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_org ON audit_logs(organization_id);
CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_resource ON audit_logs(resource_type, resource_id);
CREATE INDEX idx_audit_created ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_org_created ON audit_logs(organization_id, created_at DESC);
```

#### Reports
```sql
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('daily', 'aging', 'channel_trend', 'sla', 'audit')),
    format VARCHAR(10) NOT NULL CHECK (format IN ('pdf', 'excel', 'csv')),
    job_id UUID REFERENCES reconciliation_jobs(id),
    parameters JSONB,
    storage_path TEXT NOT NULL,
    file_size_bytes BIGINT,
    generated_by UUID NOT NULL REFERENCES users(id),
    generated_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP
);

CREATE INDEX idx_reports_org ON reports(organization_id);
CREATE INDEX idx_reports_type ON reports(type, organization_id);
CREATE INDEX idx_reports_generated ON reports(generated_at DESC);
```

---

## 2. Security Implementation

### 2.1 Authentication

#### Password Requirements
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character
- Password history (prevent reuse of last 5 passwords)
- Password expiration (90 days)
- Account lockout after 5 failed attempts (30 minutes)

#### JWT Token Structure
```json
{
  "sub": "user_id",
  "org": "organization_id",
  "role": "admin",
  "permissions": ["read:reconciliations", "write:exceptions"],
  "iat": 1234567890,
  "exp": 1234571490,
  "jti": "token_id"
}
```

#### Token Management
- Access tokens: 15 minutes expiry
- Refresh tokens: 7 days expiry
- Token rotation on refresh
- Token blacklisting on logout
- Device fingerprinting

### 2.2 Authorization (RBAC)

#### Permission Matrix
```typescript
const PERMISSIONS = {
  // Reconciliations
  'reconciliations:read': ['admin', 'analyst', 'auditor'],
  'reconciliations:write': ['admin', 'analyst'],
  'reconciliations:delete': ['admin'],
  
  // Exceptions
  'exceptions:read': ['admin', 'analyst', 'auditor'],
  'exceptions:write': ['admin', 'analyst'],
  'exceptions:resolve': ['admin', 'analyst'],
  
  // Approvals
  'approvals:read': ['admin', 'analyst', 'supervisor'],
  'approvals:approve': ['admin', 'supervisor'],
  
  // Users
  'users:read': ['admin'],
  'users:write': ['admin'],
  'users:delete': ['admin'],
  
  // Settings
  'settings:read': ['admin', 'analyst'],
  'settings:write': ['admin'],
  
  // Reports
  'reports:read': ['admin', 'analyst', 'auditor'],
  'reports:generate': ['admin', 'analyst'],
}
```

### 2.3 Data Encryption

#### At Rest
- Database encryption (AES-256)
- File storage encryption
- Encrypted backups

#### In Transit
- TLS 1.3 minimum
- Certificate pinning
- HSTS headers

#### Sensitive Data
- Password hashing: bcrypt (cost factor 12)
- MFA secrets: encrypted in database
- API keys: encrypted at rest
- PII: field-level encryption

### 2.4 API Security

#### Rate Limiting
- Authentication: 5 attempts per minute
- API calls: 100 requests per minute per user
- File upload: 10 uploads per hour
- Report generation: 5 reports per hour

#### Input Validation
- Schema validation (JSON Schema)
- SQL injection prevention (parameterized queries)
- XSS prevention (input sanitization)
- File upload validation (type, size, content)

#### CORS Configuration
```javascript
{
  origin: process.env.ALLOWED_ORIGINS.split(','),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400
}
```

---

## 3. Multi-Tenancy Architecture

### 3.1 Data Isolation Strategy

#### Row-Level Security (RLS)
```sql
-- Enable RLS on all tenant tables
ALTER TABLE reconciliation_jobs ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access their organization's data
CREATE POLICY org_isolation_jobs ON reconciliation_jobs
    FOR ALL
    USING (
        organization_id IN (
            SELECT organization_id FROM users WHERE id = current_setting('app.current_user_id')::UUID
        )
    );
```

#### Middleware Pattern
```typescript
// Express middleware example
const tenantMiddleware = async (req, res, next) => {
  const user = await getUserFromToken(req.headers.authorization);
  req.organizationId = user.organizationId;
  req.userId = user.id;
  next();
};
```

### 3.2 Organization Management

#### Features
- Organization registration/onboarding
- Subscription management
- Usage quotas and limits
- Billing integration
- Organization-level settings

#### Quotas
```sql
CREATE TABLE organization_quotas (
    organization_id UUID PRIMARY KEY REFERENCES organizations(id),
    max_users INTEGER DEFAULT 10,
    max_storage_gb INTEGER DEFAULT 100,
    max_jobs_per_month INTEGER DEFAULT 1000,
    max_file_size_mb INTEGER DEFAULT 100,
    features JSONB DEFAULT '{}',
    updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 4. Logging Strategy

### 4.1 Log Levels
- **ERROR**: System errors, exceptions, failures
- **WARN**: Deprecated features, performance issues
- **INFO**: Important business events, user actions
- **DEBUG**: Detailed debugging information

### 4.2 What to Log

#### Security Events
- Login attempts (success/failure)
- Password changes
- MFA enrollment/usage
- Permission changes
- Token generation/revocation
- Failed authorization attempts

#### Business Events
- Reconciliation job creation/completion
- Exception creation/resolution
- Approval requests/decisions
- File uploads
- Report generation
- User creation/deletion

#### System Events
- API requests/responses
- Database queries (slow queries > 1s)
- File processing errors
- System errors/exceptions
- Performance metrics

### 4.3 Log Format (JSON)
```json
{
  "timestamp": "2025-12-30T10:00:00Z",
  "level": "INFO",
  "organization_id": "org-123",
  "user_id": "user-456",
  "action": "reconciliation.job.created",
  "resource_type": "reconciliation_job",
  "resource_id": "job-789",
  "ip_address": "192.168.1.1",
  "user_agent": "Mozilla/5.0...",
  "metadata": {
    "job_name": "POS Settlement Dec 2025",
    "file_count": 2
  }
}
```

### 4.4 Log Storage
- **Real-time**: CloudWatch / Datadog / ELK Stack
- **Long-term**: S3 / Glacier (90 days retention)
- **Compliance**: Encrypted, tamper-proof logs

---

## 5. API Structure

### 5.1 RESTful Endpoints

#### Authentication
```
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
POST   /api/auth/mfa/enable
POST   /api/auth/mfa/verify
POST   /api/auth/password/reset
POST   /api/auth/password/change
```

#### Reconciliations
```
GET    /api/reconciliations
POST   /api/reconciliations
GET    /api/reconciliations/:id
PUT    /api/reconciliations/:id
DELETE /api/reconciliations/:id
POST   /api/reconciliations/:id/cancel
GET    /api/reconciliations/:id/results
```

#### Files
```
POST   /api/files/upload
GET    /api/files/:id
DELETE /api/files/:id
GET    /api/files/:id/download
POST   /api/files/:id/map
```

#### Exceptions
```
GET    /api/exceptions
GET    /api/exceptions/:id
PATCH  /api/exceptions/:id
POST   /api/exceptions/:id/resolve
POST   /api/exceptions/:id/assign
POST   /api/exceptions/:id/comments
```

#### Approvals
```
GET    /api/approvals
POST   /api/approvals
GET    /api/approvals/:id
POST   /api/approvals/:id/approve
POST   /api/approvals/:id/decline
```

#### Users
```
GET    /api/users
POST   /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
POST   /api/users/:id/invite
```

### 5.2 Response Format
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 100
  },
  "errors": []
}
```

### 5.3 Error Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
```

---

## 6. File Storage

### 6.1 Storage Strategy
- **Uploaded files**: S3 / Azure Blob / GCS
- **Processed files**: Same storage, organized by organization
- **Reports**: Same storage, with expiration
- **Backups**: Separate backup storage

### 6.2 File Organization
```
organizations/
  {org_id}/
    uploads/
      {year}/{month}/{file_id}.{ext}
    processed/
      {job_id}/
        normalized.{ext}
        results.{ext}
    reports/
      {year}/{month}/{report_id}.{ext}
```

### 6.3 File Security
- Pre-signed URLs for downloads (expire in 1 hour)
- Virus scanning on upload
- File type validation
- Size limits per organization

---

## 7. Background Jobs

### 7.1 Job Queue (Bull/BullMQ)
- File processing
- Reconciliation execution
- Report generation
- Email notifications
- Data cleanup

### 7.2 Job Priorities
1. Critical: Reconciliation processing
2. High: Exception notifications
3. Medium: Report generation
4. Low: Data cleanup

---

## 8. Monitoring & Observability

### 8.1 Metrics
- API response times
- Database query performance
- Job processing times
- Error rates
- User activity
- Storage usage

### 8.2 Health Checks
```
GET /health
GET /health/db
GET /health/storage
GET /health/queue
```

### 8.3 Alerts
- High error rate (> 5%)
- Slow API responses (> 2s)
- Database connection issues
- Storage quota exceeded
- Failed job processing

---

## 9. Backup & Disaster Recovery

### 9.1 Backup Strategy
- **Database**: Daily full backups, hourly incremental
- **Files**: Real-time replication
- **Configuration**: Version controlled

### 9.2 Recovery
- RTO: 4 hours
- RPO: 1 hour
- Tested quarterly

---

## 10. Compliance

### 10.1 Data Privacy
- GDPR compliance
- NDPR compliance (Nigeria)
- Data retention policies
- Right to deletion
- Data export

### 10.2 Audit Requirements
- Immutable audit logs
- Regular compliance audits
- Access logs retention (7 years)
- Data access tracking

---

## 11. Performance Optimization

### 11.1 Database
- Connection pooling
- Query optimization
- Indexes on foreign keys
- Partitioning for large tables
- Read replicas for reporting

### 11.2 Caching
- Redis for session storage
- API response caching
- Query result caching
- Cache invalidation strategy

### 11.3 CDN
- Static assets
- Report downloads
- Image assets

---

## 12. Testing Strategy

### 12.1 Test Types
- Unit tests (80% coverage)
- Integration tests
- E2E tests
- Security tests
- Performance tests
- Load tests

### 12.2 Test Data
- Separate test database
- Seed data for each test
- Cleanup after tests

---

## Implementation Priority

### Phase 1 (MVP)
1. Database schema
2. Authentication & Authorization
3. Basic CRUD APIs
4. File upload
5. Audit logging

### Phase 2
1. Multi-tenancy
2. Approval workflow
3. Background jobs
4. Monitoring

### Phase 3
1. Advanced security
2. Performance optimization
3. Compliance features
4. Disaster recovery

