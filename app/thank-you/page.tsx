import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import LogoutButton from "@/components/logout-button"

export default async function ThankYouPage() {
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.get("auth")
  const username = cookieStore.get("username")?.value || "user"

  if (!isAuthenticated) {
    redirect("/")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="max-w-md w-full bg-pink-100/80 backdrop-blur-sm border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-4xl text-pink-500 text-center">Thank you, {username} ✨</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-2 text-gray-700 text-lg">
          <p>Your grievance has been sent to your boyfriend ❤️</p>
          <p>He will get back to you very soon!</p>
          <p className="text-gray-500">(He will think about it)</p>
        </CardContent>
        <CardFooter className="flex justify-center pb-6 gap-4">
          <Link href="/submit">
            <Button className="bg-pink-400 hover:bg-pink-500 text-white text-xl py-6 px-8">Submit Another</Button>
          </Link>
          <LogoutButton className="text-white text-xl py-6 px-8" />
        </CardFooter>
      </Card>
    </main>
  )
}
