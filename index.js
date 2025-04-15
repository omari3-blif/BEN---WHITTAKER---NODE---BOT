
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, makeInMemoryStore } = require("@whiskeysockets/baileys");
const P = require("pino");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const path = require("path");

// Logging setup
const store = makeInMemoryStore({ logger: P().child({ level: "silent", stream: "store" }) });
store.readFromFile("./baileys_store_multi.json");
setInterval(() => {
    store.writeToFile("./baileys_store_multi.json");
}, 10_000);

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info_multi");

    const { version, isLatest } = await fetchLatestBaileysVersion();
    console.log(`Using WA version v${version.join('.')}, isLatest: ${isLatest}`);

    const sock = makeWASocket({
        version,
        logger: P({ level: "silent" }),
        printQRInTerminal: true,
        auth: state,
        browser: ["Ben Whittaker Tech", "Chrome", "1.0.0"]
    });

    store.bind(sock.ev);

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "close") {
            const shouldReconnect = (lastDisconnect.error = new Boom(lastDisconnect?.error))?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log("connection closed due to ", lastDisconnect.error, ", reconnecting ", shouldReconnect);
            if (shouldReconnect) {
                startBot();
            }
        } else if (connection === "open") {
            console.log("Bot connected successfully!");
        }
    });

    sock.ev.on("messages.upsert", async ({ messages, type }) => {
        if (type !== "notify") return;
        const msg = messages[0];
        if (!msg.message) return;

        const from = msg.key.remoteJid;
        const messageContent = msg.message.conversation || msg.message.extendedTextMessage?.text || "";

        // Sample command handler
        if (messageContent.toLowerCase() === "ping") {
            await sock.sendMessage(from, { text: "🥊 Pong!" }, { quoted: msg });
        }

        if (messageContent.toLowerCase() === "ai") {
            await sock.sendMessage(from, { text: "🤖 AI bado haijawashwa hapa." }, { quoted: msg });
        }

        // You can continue adding more commands here... (200+ features inline)
    });
}

startBot();
