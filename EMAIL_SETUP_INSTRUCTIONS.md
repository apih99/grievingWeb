# Email Setup Instructions

## 1. Create an Environment Variables File

Create a file named `.env.local` in the root directory of your project with the following content:

```
# Email Configuration
EMAIL_API_KEY=your_mailersend_api_key_here
EMAIL_USER=test-z0vklo6qp9el7qrx.mlsender.net

# Environment
NODE_ENV=development
```

Replace the placeholder values with your actual values:
- `EMAIL_API_KEY`: Your MailerSend API key (get this from your MailerSend account)
- `EMAIL_USER`: Either your verified domain name OR the MailerSend trial domain exactly as shown above

### Important notes about EMAIL_USER:
- If using your own verified domain, set it to just the domain name (e.g., `yourdomain.com`, not an email address)
- If using the trial domain, use the exact domain name shown in your MailerSend account (e.g., `test-z0vklo6qp9el7qrx.mlsender.net`)
- Do NOT include an email address with @ symbol in EMAIL_USER - the system will automatically create proper email addresses

## 2. Verify Your Domain in MailerSend

To send emails with MailerSend, you need to verify ownership of the domain you're sending from:

1. Log in to your MailerSend account at https://app.mailersend.com/
2. Go to Domains in the left sidebar
3. Click "Add domain" to add your own domain
4. Follow the verification process by adding the required DNS records to your domain

**Important**: If you don't want to verify your own domain, you can use the MailerSend trial domain for testing purposes.

## 3. Using the MailerSend Trial Domain (Recommended for testing)

The easiest way to get started is to use the trial domain provided by MailerSend:

1. Log in to your MailerSend account
2. Go to Domains in the left sidebar
3. You should see your trial domain (something like `test-z0vklo6qp9el7qrx.mlsender.net`)
4. Copy this domain name exactly and use it as your EMAIL_USER in .env.local

The application will automatically format proper email addresses using this domain.

## 4. Testing the Email Functionality

### Option 1: Using the test script

Run the following command to test the email sending functionality directly:

```bash
node scripts/test-email.js
```

This will use the updated MailerSend implementation to send a test email.

### Option 2: Using the built-in test endpoint

Start the development server:

```bash
pnpm dev
```

Then visit the following URL in your browser:

```
http://localhost:3000/api/test-email
```

This endpoint will attempt to send a test email and return JSON with the result.

## 5. Testing the Full Flow

1. Start the development server if it's not already running:
   ```bash
   pnpm dev
   ```

2. Visit http://localhost:3000 in your browser

3. Login with the hardcoded credentials:
   - Username: `girlfriend`
   - Password: `password123`

4. Fill out and submit a grievance form

5. Check your email to see if you received the notification

## 6. Troubleshooting

If email sending is not working:

1. Verify that your MailerSend API key is correct and active
2. For trial domains, make sure you copy the domain name exactly as shown in your MailerSend account
3. Make sure the EMAIL_USER in your .env.local contains only the domain name, not an email address
4. Look at the console error messages for specific details about what's wrong
5. Try running the test script (node scripts/test-email.js) to see detailed error information 