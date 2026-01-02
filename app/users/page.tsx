import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { UserList } from "@/components/users/user-list"
import { UserInvite } from "@/components/users/user-invite"

export default function UsersPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Users</h1>
              <p className="text-muted-foreground">
                Manage user accounts and permissions
              </p>
            </div>
            <UserInvite />
          </div>
          <UserList />
        </main>
      </div>
    </div>
  )
}

