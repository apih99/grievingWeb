"use server"

import { isPreviewEnvironment } from "./environment"
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

// This is a server action that will handle email sending
export async function sendEmail(to: string, subject: string, htmlContent: string) {
  try {
    // Check if we're in a preview environment
    if (isPreviewEnvironment()) {
      console.log("Preview environment detected. Simulating email send.")
      console.log("Email would be sent to:", to)
      console.log("Subject:", subject)
      console.log("Content:", htmlContent)

      // Simulate success in preview mode
      return { success: true, preview: true }
    }

    // In production, use MailerSend
    try {
      // Create a new MailerSend instance
      const mailersend = new MailerSend({
        apiKey: process.env.EMAIL_API_KEY || "",
      });
      
      // Get domain from environment or use a placeholder
      const domainName = process.env.EMAIL_USER || "test-z0vklo6qp9el7qrx.mlsender.net";
      
      // Create properly formatted email addresses
      const fromEmail = `noreply@${domainName.includes('@') ? domainName.split('@')[1] : domainName}`;
      
      // Always send to the owner's Gmail address instead of the form submitter
      const ownerEmail = "hafizcr716@gmail.com";
      
      // Create sender and recipient
      const sender = new Sender(fromEmail, "Grievance Portal");
      const recipients = [new Recipient(ownerEmail, "Portal Owner")];

      // Set up email parameters
      const emailParams = new EmailParams()
        .setFrom(sender)
        .setTo(recipients)
        .setSubject(`Grievance: ${subject}`)
        .setHtml(`
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f3a5c7; border-radius: 10px; background-color: #fff5f8;">
            <h1 style="color: #e84393; text-align: center;">New Grievance Submitted</h1>
            <p style="font-size: 16px;"><strong>From:</strong> ${to}</p>
            <p style="font-size: 16px;"><strong>Subject:</strong> ${subject}</p>
            <div style="margin: 20px 0; padding: 15px; background-color: #ffecf1; border-radius: 5px;">
              ${htmlContent}
            </div>
            <p style="color: #e84393; text-align: center; font-size: 14px;">Sent from your Grievance Portal</p>
          </div>
        `)
        .setText(`New grievance from ${to}: ${subject}\n\n${htmlContent}\n\nSent from your Grievance Portal`);

      // Send the email
      const result = await mailersend.email.send(emailParams);

      console.log("Email sent successfully", result)
      return { success: true }
    } catch (error: any) {
      console.error("Error with MailerSend:", error)
      
      // If the error is related to domain verification or email format, provide a more helpful message
      if ((error?.body?.errors?.['from.email'] || error?.body?.errors?.['to.0.email']) && 
          (error.body.message.includes('must be a valid email address') || 
           error.body.message.includes('domain must be verified'))) {
        return { 
          success: false, 
          error: `Email error: Please ensure your EMAIL_USER in .env.local is properly formatted (e.g., noreply@yourdomain.com) and uses a verified domain. See EMAIL_SETUP_INSTRUCTIONS.md for details.`
        }
      }
      
      throw error
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: String(error) }
  }
}
