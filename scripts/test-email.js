// This script tests the MailerSend API directly
require('dotenv').config({ path: '.env.local' });
const { MailerSend, EmailParams, Sender, Recipient } = require('mailersend');

async function testMailerSend() {
  try {
    console.log('Testing MailerSend email functionality...');
    
    // Check if configuration is valid
    if (!process.env.EMAIL_API_KEY) {
      console.error('ERROR: Missing EMAIL_API_KEY in .env.local file');
      console.log('Please set up your .env.local file with your MailerSend API key');
      return;
    }
    
    // Get the domain name from EMAIL_USER or use the provided one
    const domainName = process.env.EMAIL_USER || "test-z0vklo6qp9el7qrx.mlsender.net";
    
    // Create properly formatted email addresses
    const fromEmail = `noreply@${domainName.includes('@') ? domainName.split('@')[1] : domainName}`;
    const ownerEmail = "hafizcr716@gmail.com"; // Fixed recipient email
    
    console.log('Using API key:', process.env.EMAIL_API_KEY ? '****' + process.env.EMAIL_API_KEY.slice(-4) : 'Not set');
    console.log('Sending from:', fromEmail);
    console.log('Sending to:', ownerEmail);

    // Create a new MailerSend instance
    const mailersend = new MailerSend({
      apiKey: process.env.EMAIL_API_KEY || "",
    });

    // Create sender and recipient
    const sender = new Sender(fromEmail, "Grievance Portal");
    const recipients = [new Recipient(ownerEmail, "Portal Owner")];

    // Set up email parameters
    const emailParams = new EmailParams()
      .setFrom(sender)
      .setTo(recipients)
      .setSubject("Test Email from Grievance Portal")
      .setHtml(`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f3a5c7; border-radius: 10px; background-color: #fff5f8;">
          <h1 style="color: #e84393; text-align: center;">Test Email</h1>
          <p style="font-size: 16px;">This is a test email from your Grievance Portal.</p>
          <p style="font-size: 16px;">If you're receiving this, email sending is working correctly!</p>
          <p style="font-size: 16px;">All grievances will now be delivered to your Gmail address.</p>
        </div>
      `)
      .setText("Test email from Grievance Portal. All grievances will now be delivered to your Gmail address.");

    // Send the email
    console.log("Sending email...");
    const response = await mailersend.email.send(emailParams);
    console.log("Email sent successfully!");
    console.log("Response:", response);
  } catch (error) {
    console.error("Error sending email:", error);
    
    // Provide helpful error message for common issues
    if (error?.body?.errors?.['from.email'] || error?.body?.errors?.['to.0.email']) {
      console.log("\n");
      console.log("EMAIL FORMAT ERROR: There appears to be an issue with the email address format.");
      console.log("Please follow these steps:");
      console.log("1. Format your email as 'name@yourdomain.com', not just the domain name");
      console.log("2. Make sure your EMAIL_USER in .env.local is correctly formatted");
      console.log("3. For trial domains, use something like 'noreply@yourtrialdomain.mlsender.net'");
      console.log("\nSee EMAIL_SETUP_INSTRUCTIONS.md for more details.");
    }
  }
}

testMailerSend(); 