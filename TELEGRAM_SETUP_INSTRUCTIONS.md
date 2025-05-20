# Telegram Bot Setup Instructions

## 1. Create a Telegram Bot

1. Open Telegram and search for "@BotFather"
2. Start a chat with BotFather and send the command `/newbot`
3. Follow the instructions to create your bot:
   - Enter a name for your bot
   - Enter a username for your bot (must end in 'bot')
4. BotFather will give you a token. Save this token - you'll need it later.

## 2. Get Your Chat ID

1. Start a chat with your new bot
2. Send any message to your bot
3. Visit this URL in your browser (replace YOUR_BOT_TOKEN with your actual bot token):
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
   ```
4. Look for the "chat" object in the response and find your "id". This is your chat ID.

## 3. Set Up Environment Variables

Create or update your `.env.local` file with the following variables:

```
# Telegram Configuration
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here

# Environment
NODE_ENV=production
```

Replace the placeholder values:
- `TELEGRAM_BOT_TOKEN`: The token you got from BotFather
- `TELEGRAM_CHAT_ID`: Your chat ID from step 2

## 4. Testing the Bot

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Visit http://localhost:3000/admin

3. Use the test functionality to verify your bot is working

## 5. Troubleshooting

If messages are not being sent:

1. Verify your bot token is correct
2. Make sure you've started a chat with your bot
3. Check that your chat ID is correct
4. Look at the console error messages for specific details 