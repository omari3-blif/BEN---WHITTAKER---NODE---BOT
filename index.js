const { useMultiFileAuthState } = require('@whiskeysockets/baileys')
const { state, saveCreds } = await useMultiFileAuthState('./auth_info')
const sock = makeWASocket({
  auth: state,
  printQRInTerminal: true,
  logger: P({ level: 'silent' }),
  version: (await fetchLatestBaileysVersion()).version
})
sock.ev.on('creds.update', saveCreds)
const fs = require('fs')
const P = require('pino')
const dotenv = require('dotenv')
dotenv.config()

const AUTO_TYPING = process.env.AUTO_TYPING === 'on'
const BLOCK_CALLS = process.env.BLOCK_CALLS === 'on'
const GROUP_ONLY = process.env.GROUP_ONLY === 'on'
const OWNER_NUMBER = process.env.OWNER_NUMBER || '255760317060'

async function startSock() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_ben_whittaker')
    const sock = makeWASocket({
        version: (await fetchLatestBaileysVersion()).version,
        logger: P({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state
    })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
            if (shouldReconnect) startSock()
        } else if (connection === 'open') {
            console.log('Bot connected')
        }
    })

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0]
        if (!msg.message) return
        if (msg.key && msg.key.remoteJid === 'status@broadcast') return

        const from = msg.key.remoteJid
        const isGroup = from.endsWith('@g.us')
        const sender = isGroup ? msg.key.participant : msg.key.remoteJid
        const messageContent = msg.message.conversation || msg.message.extendedTextMessage?.text || ''

        if (GROUP_ONLY && !isGroup) return

        if (AUTO_TYPING) {
            await sock.sendPresenceUpdate('composing', from)
            await delay(1000)
        }

        if (messageContent.toLowerCase() === 'ping') {
            await sock.sendMessage(from, { text: '🥊 Pong!' })
        }

        if (BLOCK_CALLS && msg.message?.call) {
            await sock.sendMessage(from, { text: 'Samahani, hupaswi kupiga simu kwa bot.' })
            await sock.updateBlockStatus(sender, 'block')
        }

        // Add more commands here...
    })
}

startSock()
