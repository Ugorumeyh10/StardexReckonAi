export type ApprovalType = 
  | 'rule_configuration'
  | 'ledger_posting'
  | 'user_onboarding'
  | 'exception_resolution'
  | 'report_generation'
  | 'system_setting'

export type ApprovalStatus = 'pending' | 'approved' | 'declined' | 'cancelled'

export interface Approval {
  id: string
  type: ApprovalType
  status: ApprovalStatus
  title: string
  description: string
  requestedBy: {
    id: string
    name: string
    email: string
  }
  requestedAt: string
  reviewedBy?: {
    id: string
    name: string
    email: string
  }
  reviewedAt?: string
  comments?: string
  metadata: Record<string, any>
}

export interface RuleApproval extends Approval {
  type: 'rule_configuration'
  metadata: {
    ruleName: string
    ruleType: 'exact' | 'fuzzy' | 'range'
    tolerance?: number
    fields: string[]
    previousRule?: any
  }
}

export interface LedgerApproval extends Approval {
  type: 'ledger_posting'
  metadata: {
    jobId: string
    jobName: string
    totalAmount: number
    transactionCount: number
    accountCode: string
    postingDate: string
  }
}

export interface UserApproval extends Approval {
  type: 'user_onboarding'
  metadata: {
    userId: string
    email: string
    name: string
    role: 'admin' | 'analyst' | 'auditor'
    requestedPermissions: string[]
  }
}

