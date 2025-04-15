const { default: makeWASocket, DisconnectReason, useMultiFileAuthState, makeInMemoryStore, fetchLatestBaileysVersion, delay } = require('@whiskeysockets/baileys');
const P = require('pino');
const fs = require('fs');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const AUTO_TYPING = process.env.AUTO_TYPING === 'on';
const AUTO_REACT = process.env.AUTO_REACT === 'on';
const BLOCK_CALLS = process.env.BLOCK_CALLS === 'on';
const GROUP_ONLY = process.env.GROUP_ONLY === 'on';
const OWNER_NUMBER = process.env.OWNER_NUMBER || '255760317060';
const AI_KEY = process.env.AI_KEY;

async function startSock() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_ben_whittaker');
    const sock = makeWASocket({
        version: (await fetchLatestBaileysVersion()).version,
        logger: P({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('connection closed due to ', lastDisconnect?.error, ', reconnecting ', shouldReconnect);
            if (shouldReconnect) startSock();
        } else if (connection === 'open') {
            console.log('Bot connected');
        }
    });

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;
        if (msg.key && msg.key.remoteJid === 'status@broadcast') return;

        const from = msg.key.remoteJid;
        const isGroup = from.endsWith('@g.us');
        const sender = isGroup ? msg.key.participant : msg.key.remoteJid;
        const messageContent = msg.message.conversation || msg.message.extendedTextMessage?.text || '';

        if (GROUP_ONLY && !isGroup) return;

        if (AUTO_TYPING) {
            await sock.sendPresenceUpdate('composing', from);
            await delay(1000);
        }

        // ====== Example commands ======
        if (messageContent.toLowerCase() === 'ping') {
            await sock.sendMessage(from, { text: '🥊 Pong!' });
        }

        if (messageContent.toLowerCase().startsWith('ai')) {
            const prompt = messageContent.slice(3);
            try {
                const res = await axios.post('https://api.openai.com/v1/chat/completions', {
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: prompt }]
                }, {
                    headers: {
                        'Authorization': `Bearer ${AI_KEY}`,
                        'Content-Type': 'application/json'
                    }
                });
                const aiReply = res.data.choices[0].message.content;
                await sock.sendMessage(from, { text: aiReply });
            } catch (e) {
                await sock.sendMessage(from, { text: 'AI haikujibu. Angalia API key.' });
            }
        }

        if (BLOCK_CALLS && msg.message?.call) {
            await sock.sendMessage(from, { text: 'Samahani, hupaswi kupiga simu kwa bot.' });
            await sock.updateBlockStatus(sender, 'block');
        }

        // ====== More commands hapa chini unaweza ongeza zote ======

    });
}

startSock();
