import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import GrievanceForm from "@/components/grievance-form"
import LogoutButton from "@/components/logout-button"

export default async function SubmitPage() {
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.get("auth")
  const username = cookieStore.get("username")?.value || "user"

  if (!isAuthenticated) {
    redirect("/")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col gap-4">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-2xl font-bold">Welcome, {username}</h1>
          <LogoutButton />
        </div>
        <GrievanceForm username={username} />
      </div>
    </main>
  )
}
