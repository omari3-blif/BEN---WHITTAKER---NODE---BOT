// index.js - BEN WHITTAKER TECH Bot
require("dotenv").config();
const { default: makeWASocket, useSingleFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");
const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

async function startBot() {
    const { state, saveState } = useSingleFileAuthState("session.json");
    const sock = makeWASocket({ auth: state, printQRInTerminal: true });
    sock.ev.on("creds.update", saveState);

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;

        const from = msg.key.remoteJid;
        const body = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
        const command = body.split(" ")[0].toLowerCase();
        const args = body.split(" ").slice(1).join(" ");

        if (command === "ai") {
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: args,
                max_tokens: 100,
            });
            await sock.sendMessage(from, { text: response.data.choices[0].text.trim() });
        }

        // Zaidi ya commands 200 zingine humu
    });
}

startBot();
