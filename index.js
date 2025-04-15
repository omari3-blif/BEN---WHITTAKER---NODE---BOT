const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const chalk = require('chalk');
const moment = require('moment');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Ben Whittaker Bot is online.'));
app.listen(PORT, () => console.log(chalk.green(`Web server running on port ${PORT}`)));

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});

client.on('qr', qr => {
    console.log(chalk.yellow('Scan QR Code Below:'));
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log(chalk.cyanBright(`Ben Whittaker Bot is ready! - ${moment().format('LLLL')}`));
});

client.on('message', async msg => {
    const text = msg.body.toLowerCase();
    const sender = msg.from;

    // Show fake typing
    const fakeTyping = async () => {
        await client.sendPresenceAvailable();
        await client.sendPresenceUpdate('composing', sender); // Typing...
        await new Promise(res => setTimeout(res, 1500));
        await client.sendPresenceUpdate('paused', sender);
    };

    // Show fake recording
    const fakeRecording = async () => {
        await client.sendPresenceUpdate('recording', sender); // Recording...
        await new Promise(res => setTimeout(res, 2000));
        await client.sendPresenceUpdate('paused', sender);
    };

    if (text === 'ping') {
        await fakeTyping();
        await msg.reply('Pong! Ben Whittaker bot is online.');
    }

    if (text === 'time') {
        await fakeTyping();
        await msg.reply(`Saa ni ${moment().format('HH:mm:ss')} - ${moment().format('dddd, MMMM Do YYYY')}`);
    }

    if (text === 'record') {
        await fakeRecording();
        await msg.reply('I was pretending to record... did you hear me?');
    }

    if (text.startsWith('say ')) {
        const response = text.slice(4);
        await fakeTyping();
        await msg.reply(response);
    }

    if (text === 'joke') {
        await fakeTyping();
        try {
            const res = await axios.get('https://official-joke-api.appspot.com/random_joke');
            await msg.reply(`${res.data.setup}\n${res.data.punchline}`);
        } catch (err) {
            await msg.reply('Oops! Sikupata joke sasa hivi.');
        }
    }

    if (text === 'menu') {
        await fakeTyping();
        await msg.reply(`*Ben Whittaker Bot Menu:*
- ping
- time
- say <text>
- joke
- record`);
    }
});

client.initialize();
