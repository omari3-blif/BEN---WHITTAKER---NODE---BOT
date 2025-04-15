// index.js - BEN WHITTAKER TECH Bot

require("dotenv").config(); const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys"); const P = require("pino"); const fs = require("fs"); const axios = require("axios"); const { Configuration, OpenAIApi } = require("openai"); const pdfParse = require("pdf-parse"); const { exec } = require("child_process");

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY, }); const openai = new OpenAIApi(configuration);

async function startBot() { const { state, saveCreds } = await useMultiFileAuthState("./auth_info_ben"); const { version } = await fetchLatestBaileysVersion();

const sock = makeWASocket({ version, printQRInTerminal: true, auth: state, logger: P({ level: "silent" }), });

sock.ev.on("messages.upsert", async ({ messages }) => { const msg = messages[0]; if (!msg.message || msg.key.fromMe) return;

const from = msg.key.remoteJid;
const body = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
const command = body.split(" ")[0].toLowerCase();
const args = body.split(" ").slice(1).join(" ");

// === AI Commands ===
if (command === "ai") {
  if (!args) return sock.sendMessage(from, { text: "⚠️ Andika swali: ai [swali]" });
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: args }],
    });
    sock.sendMessage(from, { text: `🤖 ${response.data.choices[0].message.content}` });
  } catch (err) {
    sock.sendMessage(from, { text: "❌ AI haikufanikwa. Hakikisha API key ipo sahihi." });
  }
}

if (command === "imagine") {
  if (!args) return sock.sendMessage(from, { text: "🎨 Andika maelezo: imagine [maelezo ya picha]" });
  try {
    const img = await openai.createImage({ prompt: args, n: 1, size: "512x512" });
    const imageUrl = img.data.data[0].url;
    const buffer = (await axios.get(imageUrl, { responseType: "arraybuffer" })).data;
    sock.sendMessage(from, { image: buffer, caption: "🖼️ AI Image" });
  } catch {
    sock.sendMessage(from, { text: "❌ Imeshindikana kuchora picha." });
  }
}

if (command === "translate") {
  const [lang, ...rest] = args.split(" ");
  const text = rest.join(" ");
  if (!lang || !text) return sock.sendMessage(from, { text: "🌍 Matumizi: translate [lugha] [maneno]" });
  const prompt = `Tafsiri haya maneno kwa lugha ya ${lang}: ${text}`;
  const response = await openai.createChatCompletion({ model: "gpt-3.5-turbo", messages: [{ role: "user", content: prompt }] });
  sock.sendMessage(from, { text: `🌐 ${response.data.choices[0].message.content}` });
}

if (command === "explain") {
  if (!args) return sock.sendMessage(from, { text: "❓ Andika concept ya kuelezea: explain [concept]" });
  const response = await openai.createChatCompletion({ model: "gpt-3.5-turbo", messages: [{ role: "user", content: `Elezea: ${args}` }] });
  sock.sendMessage(from, { text: `📘 ${response.data.choices[0].message.content}` });
}

if (command === "grammar") {
  if (!args) return sock.sendMessage(from, { text: "✍️ Andika sentensi ya kusahihisha: grammar [sentensi]" });
  const response = await openai.createChatCompletion({ model: "gpt-3.5-turbo", messages: [{ role: "user", content: `Sahihisha kisarufi: ${args}` }] });
  sock.sendMessage(from, { text: `✅ ${response.data.choices[0].message.content}` });
}

if (command === "summarize") {
  if (!args) return sock.sendMessage(from, { text: "📝 Andika maandishi marefu: summarize [maandishi]" });
  const prompt = `Fupisha haya maandishi: ${args}`;
  const response = await openai.createChatCompletion({ model: "gpt-3.5-turbo", messages: [{ role: "user", content: prompt }] });
  sock.sendMessage(from, { text: `📄 ${response.data.choices[0].message.content}` });
}

if (command === "askpdf") {
  if (!msg.message.documentMessage) return sock.sendMessage(from, { text: "📄 Tuma PDF na uandike: askpdf [swali]" });
  const docMessage = msg.message.documentMessage;
  const filePath = `./temp/${docMessage.fileName}`;
  const stream = await sock.downloadMediaMessage(msg);
  fs.writeFileSync(filePath, stream);
  const dataBuffer = fs.readFileSync(filePath);
  const text = await pdfParse(dataBuffer);
  const prompt = `Jibu hili swali kwa kutumia maandiko haya ya PDF: ${args}\nPDF content: ${text.text.substring(0, 2000)}`;
  const response = await openai.createChatCompletion({ model: "gpt-3.5-turbo", messages: [{ role: "user", content: prompt }] });
  sock.sendMessage(from, { text: `📕 ${response.data.choices[0].message.content}` });
}

// === Extras kutoka kwa bot ya awali ===
if (command === "menu") {
  sock.sendMessage(from, { text: "📋 Karibu kwenye Ben Whittaker Bot! Tumia amri kama: ai, imagine, grammar, explain, translate, summarize, askpdf, record, faketyping, vote, settings, n.k." });
}

if (command === "record") {
  sock.sendPresenceUpdate("recording", from);
  sock.sendMessage(from, { text: "🎙️ Bot inarekodi..." });
}

if (command === "faketyping") {
  sock.sendPresenceUpdate("composing", from);
  sock.sendMessage(from, { text: "⌨️ Bot inajifanya inaandika..." });
}

});

sock.ev.on("creds.update", saveCreds); }

startBot();

