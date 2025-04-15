const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');
const fs = require('fs');
const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Ben Whittaker Bot is Running!');
});

app.listen(PORT, () => {
    console.log(`Web server running on port ${PORT}`);
});

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true, args: ['--no-sandbox'] }
});

client.on('qr', qr => qrcode.generate(qr, { small: true }));
client.on('ready', () => console.log('Ben Whittaker Bot is ready!'));

client.on('message', async msg => {
    const message = msg.body.toLowerCase();
    const chat = await msg.getChat();

    // Basic Commands
    if (message === 'ping') return msg.reply('pong');
    if (message === 'time') return msg.reply(`⏰ ${new Date().toLocaleString()}`);
    if (message.startsWith('say ')) return msg.reply(msg.body.slice(4));
    if (message === 'menu') {
        return msg.reply(`*Ben Whittaker Bot Menu*\nTotal features: 200+\nType any command to try:\n- ping\n- time\n- say <text>\n- ai <question>\n- record\n- type\n- joke\n- sticker\n- feature1 - feature200`);
    }

    // Fake Actions
    if (message === 'record') {
        await chat.sendStateRecording();
        return msg.reply('_Recording simulation..._');
    }
    if (message === 'type') {
        await chat.sendStateTyping();
        return msg.reply('_Typing simulation..._');
    }

    // Jokes
    if (message === 'joke') {
        const jokes = [
            "Why don't scientists trust atoms? Because they make up everything!",
            "Why did the scarecrow win an award? Because he was outstanding in his field!",
            "I'm reading a book on anti-gravity. It's impossible to put down!"
        ];
        return msg.reply(jokes[Math.floor(Math.random() * jokes.length)]);
    }

    // AI ChatGPT
    if (message.startsWith('ai ')) {
        const prompt = message.slice(3);
        try {
            const response = await axios.post("https://api.openai.com/v1/completions", {
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 100,
                temperature: 0.7
            }, {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
                }
            });

            return msg.reply(response.data.choices[0].text.trim());
        } catch (error) {
            return msg.reply("AI response error.");
        }
    }

    // Badword Filter
    const badWords = ['fuck', 'shit', 'idiot', 'bitch'];
    if (badWords.some(word => message.includes(word))) {
        await msg.delete(true);
        return msg.reply('⚠️ Please avoid using bad words!');
    }

    // Sticker Generator
    if (msg.hasMedia && message === 'sticker') {
        const media = await msg.downloadMedia();
        msg.reply(media, null, { sendMediaAsSticker: true });
    }

    // Simulate 200+ Commands
    for (let i = 1; i <= 200; i++) {
        if (message === `feature${i}`) {
            return msg.reply(`✅ Feature ${i} triggered!`);
        }
    }
});

client.on('group_join', async (notification) => {
    const chat = await notification.getChat();
    const contact = await notification.getContact();
    chat.sendMessage(`Karibu sana ${contact.pushname || 'mpya member'} kwenye *${chat.name}*!`);
});

client.initialize();
