const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, makeInMemoryStore } = require("@whiskeysockets/baileys");
const P = require("pino");
const fs = require("fs");
require("dotenv").config();

// Set up auth state folder
const startBot = async () => {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");
    
    const sock = makeWASocket({
        logger: P({ level: "silent" }),
        printQRInTerminal: true,
        auth: state,
        browser: ["Ben Whittaker Tech", "Safari", "1.0.0"],
    });

    // Connection updates
    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "close") {
            const shouldReconnect = (lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut);
            console.log("connection closed, reconnecting...", shouldReconnect);
            if (shouldReconnect) startBot();
        } else if (connection === "open") {
            console.log("✅ Ben Whittaker Bot is running...");
        }
    });

    // Save credentials every time they update
    sock.ev.on("creds.update", saveCreds);
};

startBot();
