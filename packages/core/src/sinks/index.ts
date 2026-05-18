import axios from 'axios';

export interface SinkMessage {
  type: 'alert' | 'recap' | 'error' | 'whale' | 'narrative';
  title: string;
  body: string;
  data?: Record<string, any>;
  timestamp: Date;
}

export const sinks = {
  async telegram(message: SinkMessage) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    if (!token || !chatId) {
      console.warn('Telegram sink: missing credentials');
      return { success: false, error: 'Missing credentials' };
    }

    const text = `*${message.title}*\n\n${message.body}`;
    
    try {
      await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: chatId,
        text,
        parse_mode: 'Markdown'
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to send Telegram message' };
    }
  },

  async discord(message: SinkMessage) {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.warn('Discord sink: missing webhook URL');
      return { success: false, error: 'Missing webhook URL' };
    }

    const embed = {
      title: message.title,
      description: message.body,
      color: message.type === 'error' ? 15158332 : 5814783,
      fields: message.data ? Object.entries(message.data).map(([k, v]) => ({
        name: k,
        value: String(v),
        inline: true
      })) : [],
      timestamp: message.timestamp.toISOString()
    };

    try {
      await axios.post(webhookUrl, { embeds: [embed] });
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to send Discord message' };
    }
  },

  async email(message: SinkMessage) {
    // Would use nodemailer or SendGrid
    console.log('[Email Sink]', message.title, message.body);
    return { success: true };
  }
};