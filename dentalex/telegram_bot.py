import asyncio
import telegram

async def send_telegram_message(token, chat_id, message):
	bot = telegram.Bot(token=token)
	await bot.send_message(chat_id=chat_id, text=message)