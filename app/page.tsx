import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import LoginForm from "@/components/login-form"
import ClearCookies from "@/components/clear-cookies"

export default async function Home() {
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.get("auth")
  
  console.log("Home page cookies:", {
    authCookie: isAuthenticated?.value || "missing",
    username: cookieStore.get("username")?.value || "missing",
    allCookies: cookieStore.getAll().map(c => c.name)
  })

  if (isAuthenticated) {
    console.log("Redirecting to /submit because auth cookie found:", isAuthenticated.value)
    redirect("/submit")
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500">
      <ClearCookies />
      
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-lg">
            Welcome to your very own Grievance Portal, mouse
          </h1>
          <p className="text-xl text-white/90">
            As requested, you can submit your lame made-up grievances for my viewing pleasure
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-white mb-6 drop-shadow-md">
            Log in to your account:
          </h2>
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
