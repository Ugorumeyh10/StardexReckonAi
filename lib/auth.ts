// Demo authentication - Replace with real auth in production

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'analyst' | 'auditor'
}

// Demo users for testing
export const DEMO_USERS = {
  admin: {
    id: '1',
    email: 'admin@reckai.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const,
  },
  analyst: {
    id: '2',
    email: 'analyst@reckai.com',
    password: 'analyst123',
    name: 'Analyst User',
    role: 'analyst' as const,
  },
  auditor: {
    id: '3',
    email: 'auditor@reckai.com',
    password: 'auditor123',
    name: 'Auditor User',
    role: 'auditor' as const,
  },
}

export function authenticate(email: string, password: string): User | null {
  const user = Object.values(DEMO_USERS).find(
    (u) => u.email === email && u.password === password
  )
  
  if (user) {
    // Remove password before returning
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }
  
  return null
}

