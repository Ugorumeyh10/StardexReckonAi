export type UserRole = 'admin' | 'analyst' | 'auditor'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: string
  lastLogin?: string
}

export interface ReconciliationJob {
  id: string
  name: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  totalRows: number
  processedRows: number
  matchedRows: number
  exceptionRows: number
  createdAt: string
  completedAt?: string
  createdBy: string
}

export interface ReconciliationFile {
  id: string
  jobId: string
  name: string
  type: 'bank' | 'settlement' | 'switch' | 'card' | 'gl'
  format: 'excel' | 'csv' | 'txt' | 'xml'
  size: number
  uploadedAt: string
  status: 'uploaded' | 'mapped' | 'normalized' | 'processed'
}

export interface DataMapping {
  id: string
  fileId: string
  sourceColumn: string
  targetField: string
  dataType: 'string' | 'number' | 'date' | 'currency'
  autoDetected: boolean
}

export interface Exception {
  id: string
  jobId: string
  type: 'amount_mismatch' | 'date_mismatch' | 'missing_entry' | 'duplicate' | 'timing_difference' | 'non_settlement'
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'in_progress' | 'resolved' | 'escalated'
  amount?: number
  date?: string
  description: string
  aiExplanation?: string
  aiConfidence?: number
  suggestedAction?: string
  assignedTo?: string
  createdAt: string
  resolvedAt?: string
  comments: Comment[]
}

export interface Comment {
  id: string
  userId: string
  userName: string
  content: string
  createdAt: string
}

export interface ReconciliationResult {
  jobId: string
  totalTransactions: number
  matched: number
  exceptions: number
  matchRate: number
  exceptionsByType: Record<string, number>
  exceptionsBySeverity: Record<string, number>
  processingTime: number
}

export interface Report {
  id: string
  jobId: string
  type: 'daily' | 'aging' | 'channel_trend' | 'sla' | 'audit'
  format: 'pdf' | 'excel' | 'csv'
  generatedAt: string
  downloadUrl: string
}

