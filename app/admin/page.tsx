import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import TelegramSetupGuide from "@/components/telegram-setup-guide"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminPage() {
  const cookieStore = cookies()
  const isAuthenticated = cookieStore.get("auth")

  if (!isAuthenticated) {
    redirect("/")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
            <CardDescription>Manage your grievance portal settings</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Welcome to the admin dashboard. Here you can manage your grievance portal settings and test your Telegram
              bot configuration.
            </p>
          </CardContent>
        </Card>

        <TelegramSetupGuide />
      </div>
    </main>
  )
}
