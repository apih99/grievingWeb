import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/send-email"
import { isPreviewEnvironment } from "@/lib/environment"

// This is a test endpoint to verify email sending works
export async function GET() {
  try {
    // Check if we're in a preview environment
    const inPreview = isPreviewEnvironment()
    
    // Use the owner's email address directly
    const ownerEmail = "hafizcr716@gmail.com";

    const result = await sendEmail(
      ownerEmail,
      "Test Email from Grievance Portal API",
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f3a5c7; border-radius: 10px; background-color: #fff5f8;">
          <h1 style="color: #e84393; text-align: center;">Test Email</h1>
          <p style="font-size: 16px;">This is a test email from your Grievance Portal API endpoint.</p>
          <p style="font-size: 16px;">If you're receiving this, email sending is working correctly!</p>
          <p style="font-size: 16px;">All grievances will now be delivered to your Gmail address.</p>
        </div>
      `,
    )

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: inPreview ? "Email sending simulated successfully in preview mode" : "Test email sent successfully",
        preview: result.preview || false,
      })
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in test-email route:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
