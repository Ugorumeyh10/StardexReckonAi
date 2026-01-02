-- ReckAI Database Schema
-- PostgreSQL 14+

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enable Row Level Security
ALTER DATABASE reckai SET row_security = on;

-- ============================================================================
-- ORGANIZATIONS (Multi-Tenancy)
-- ============================================================================

CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    domain VARCHAR(255),
    subscription_tier VARCHAR(50) DEFAULT 'standard' CHECK (subscription_tier IN ('standard', 'professional', 'enterprise')),
    max_users INTEGER DEFAULT 10,
    max_storage_gb INTEGER DEFAULT 100,
    is_active BOOLEAN DEFAULT true,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by UUID
);

CREATE INDEX idx_orgs_code ON organizations(code);
CREATE INDEX idx_orgs_active ON organizations(is_active);

-- ============================================================================
-- USERS
-- ============================================================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- ============================================================================
-- USER SESSIONS
-- ============================================================================

CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL UNIQUE,
    refresh_token_hash VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    last_activity_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sessions_user ON user_sessions(user_id);
CREATE INDEX idx_sessions_expires ON user_sessions(expires_at);
CREATE INDEX idx_sessions_token ON user_sessions(token_hash);

-- ============================================================================
-- RECONCILIATION JOBS
-- ============================================================================

CREATE TABLE reconciliation_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- ============================================================================
-- RECONCILIATION FILES
-- ============================================================================

CREATE TABLE reconciliation_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- ============================================================================
-- DATA MAPPINGS
-- ============================================================================

CREATE TABLE data_mappings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- ============================================================================
-- EXCEPTIONS
-- ============================================================================

CREATE TABLE exceptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- ============================================================================
-- EXCEPTION COMMENTS
-- ============================================================================

CREATE TABLE exception_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exception_id UUID NOT NULL REFERENCES exceptions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_comments_exception ON exception_comments(exception_id);

-- ============================================================================
-- APPROVALS
-- ============================================================================

CREATE TABLE approvals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- ============================================================================
-- MATCHING RULES
-- ============================================================================

CREATE TABLE matching_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- ============================================================================
-- AUDIT LOGS
-- ============================================================================

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- ============================================================================
-- REPORTS
-- ============================================================================

CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- ============================================================================
-- ORGANIZATION QUOTAS
-- ============================================================================

CREATE TABLE organization_quotas (
    organization_id UUID PRIMARY KEY REFERENCES organizations(id),
    max_users INTEGER DEFAULT 10,
    max_storage_gb INTEGER DEFAULT 100,
    max_jobs_per_month INTEGER DEFAULT 1000,
    max_file_size_mb INTEGER DEFAULT 100,
    features JSONB DEFAULT '{}',
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- Enable RLS on all tenant tables
ALTER TABLE reconciliation_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE reconciliation_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE exceptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE matching_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create function to get current user's organization
CREATE OR REPLACE FUNCTION get_user_organization_id()
RETURNS UUID AS $$
BEGIN
    RETURN current_setting('app.current_organization_id', true)::UUID;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policy: Users can only access their organization's data
CREATE POLICY org_isolation_jobs ON reconciliation_jobs
    FOR ALL
    USING (organization_id = get_user_organization_id());

CREATE POLICY org_isolation_files ON reconciliation_files
    FOR ALL
    USING (organization_id = get_user_organization_id());

CREATE POLICY org_isolation_exceptions ON exceptions
    FOR ALL
    USING (organization_id = get_user_organization_id());

CREATE POLICY org_isolation_approvals ON approvals
    FOR ALL
    USING (organization_id = get_user_organization_id());

CREATE POLICY org_isolation_rules ON matching_rules
    FOR ALL
    USING (organization_id = get_user_organization_id());

CREATE POLICY org_isolation_reports ON reports
    FOR ALL
    USING (organization_id = get_user_organization_id());

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON reconciliation_jobs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exceptions_updated_at BEFORE UPDATE ON exceptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_approvals_updated_at BEFORE UPDATE ON approvals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rules_updated_at BEFORE UPDATE ON matching_rules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

