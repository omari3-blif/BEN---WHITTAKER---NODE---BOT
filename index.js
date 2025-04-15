
const { default: makeWASocket, useSingleFileAuthState, downloadMediaMessage } = require("@whiskeysockets/baileys");
const P = require("pino");
const fs = require("fs");

const { state, saveState } = useSingleFileAuthState("./auth_info.json");

async function startSock() {
  const sock = makeWASocket({
    logger: P({ level: "silent" }),
    printQRInTerminal: true,
    auth: state,
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;
    const from = msg.key.remoteJid;
    const type = Object.keys(msg.message)[0];
    const body = type === "conversation" ? msg.message.conversation :
                 type === "imageMessage" ? msg.message.imageMessage.caption :
                 type === "videoMessage" ? msg.message.videoMessage.caption :
                 type === "extendedTextMessage" ? msg.message.extendedTextMessage.text : "";
    const args = body.trim().split(/ +/);
    const command = args.shift().toLowerCase();

    const owner = "255760317060";
    
    if (command === "pong") {
      await sock.sendMessage(from, { text: "🥊 Pong!" });
    }

if (command === "command1") {
  await sock.sendMessage(from, { text: "✅ Command 1 executed successfully!" });
}


if (command === "command2") {
  await sock.sendMessage(from, { text: "✅ Command 2 executed successfully!" });
}


if (command === "command3") {
  await sock.sendMessage(from, { text: "✅ Command 3 executed successfully!" });
}


if (command === "command4") {
  await sock.sendMessage(from, { text: "✅ Command 4 executed successfully!" });
}


if (command === "command5") {
  await sock.sendMessage(from, { text: "✅ Command 5 executed successfully!" });
}


if (command === "command6") {
  await sock.sendMessage(from, { text: "✅ Command 6 executed successfully!" });
}


if (command === "command7") {
  await sock.sendMessage(from, { text: "✅ Command 7 executed successfully!" });
}


if (command === "command8") {
  await sock.sendMessage(from, { text: "✅ Command 8 executed successfully!" });
}


if (command === "command9") {
  await sock.sendMessage(from, { text: "✅ Command 9 executed successfully!" });
}


if (command === "command10") {
  await sock.sendMessage(from, { text: "✅ Command 10 executed successfully!" });
}


if (command === "command11") {
  await sock.sendMessage(from, { text: "✅ Command 11 executed successfully!" });
}


if (command === "command12") {
  await sock.sendMessage(from, { text: "✅ Command 12 executed successfully!" });
}


if (command === "command13") {
  await sock.sendMessage(from, { text: "✅ Command 13 executed successfully!" });
}


if (command === "command14") {
  await sock.sendMessage(from, { text: "✅ Command 14 executed successfully!" });
}


if (command === "command15") {
  await sock.sendMessage(from, { text: "✅ Command 15 executed successfully!" });
}


if (command === "command16") {
  await sock.sendMessage(from, { text: "✅ Command 16 executed successfully!" });
}


if (command === "command17") {
  await sock.sendMessage(from, { text: "✅ Command 17 executed successfully!" });
}


if (command === "command18") {
  await sock.sendMessage(from, { text: "✅ Command 18 executed successfully!" });
}


if (command === "command19") {
  await sock.sendMessage(from, { text: "✅ Command 19 executed successfully!" });
}


if (command === "command20") {
  await sock.sendMessage(from, { text: "✅ Command 20 executed successfully!" });
}


if (command === "command21") {
  await sock.sendMessage(from, { text: "✅ Command 21 executed successfully!" });
}


if (command === "command22") {
  await sock.sendMessage(from, { text: "✅ Command 22 executed successfully!" });
}


if (command === "command23") {
  await sock.sendMessage(from, { text: "✅ Command 23 executed successfully!" });
}


if (command === "command24") {
  await sock.sendMessage(from, { text: "✅ Command 24 executed successfully!" });
}


if (command === "command25") {
  await sock.sendMessage(from, { text: "✅ Command 25 executed successfully!" });
}


if (command === "command26") {
  await sock.sendMessage(from, { text: "✅ Command 26 executed successfully!" });
}


if (command === "command27") {
  await sock.sendMessage(from, { text: "✅ Command 27 executed successfully!" });
}


if (command === "command28") {
  await sock.sendMessage(from, { text: "✅ Command 28 executed successfully!" });
}


if (command === "command29") {
  await sock.sendMessage(from, { text: "✅ Command 29 executed successfully!" });
}


if (command === "command30") {
  await sock.sendMessage(from, { text: "✅ Command 30 executed successfully!" });
}


if (command === "command31") {
  await sock.sendMessage(from, { text: "✅ Command 31 executed successfully!" });
}


if (command === "command32") {
  await sock.sendMessage(from, { text: "✅ Command 32 executed successfully!" });
}


if (command === "command33") {
  await sock.sendMessage(from, { text: "✅ Command 33 executed successfully!" });
}


if (command === "command34") {
  await sock.sendMessage(from, { text: "✅ Command 34 executed successfully!" });
}


if (command === "command35") {
  await sock.sendMessage(from, { text: "✅ Command 35 executed successfully!" });
}


if (command === "command36") {
  await sock.sendMessage(from, { text: "✅ Command 36 executed successfully!" });
}


if (command === "command37") {
  await sock.sendMessage(from, { text: "✅ Command 37 executed successfully!" });
}


if (command === "command38") {
  await sock.sendMessage(from, { text: "✅ Command 38 executed successfully!" });
}


if (command === "command39") {
  await sock.sendMessage(from, { text: "✅ Command 39 executed successfully!" });
}


if (command === "command40") {
  await sock.sendMessage(from, { text: "✅ Command 40 executed successfully!" });
}


if (command === "command41") {
  await sock.sendMessage(from, { text: "✅ Command 41 executed successfully!" });
}


if (command === "command42") {
  await sock.sendMessage(from, { text: "✅ Command 42 executed successfully!" });
}


if (command === "command43") {
  await sock.sendMessage(from, { text: "✅ Command 43 executed successfully!" });
}


if (command === "command44") {
  await sock.sendMessage(from, { text: "✅ Command 44 executed successfully!" });
}


if (command === "command45") {
  await sock.sendMessage(from, { text: "✅ Command 45 executed successfully!" });
}


if (command === "command46") {
  await sock.sendMessage(from, { text: "✅ Command 46 executed successfully!" });
}


if (command === "command47") {
  await sock.sendMessage(from, { text: "✅ Command 47 executed successfully!" });
}


if (command === "command48") {
  await sock.sendMessage(from, { text: "✅ Command 48 executed successfully!" });
}


if (command === "command49") {
  await sock.sendMessage(from, { text: "✅ Command 49 executed successfully!" });
}


if (command === "command50") {
  await sock.sendMessage(from, { text: "✅ Command 50 executed successfully!" });
}


if (command === "command51") {
  await sock.sendMessage(from, { text: "✅ Command 51 executed successfully!" });
}


if (command === "command52") {
  await sock.sendMessage(from, { text: "✅ Command 52 executed successfully!" });
}


if (command === "command53") {
  await sock.sendMessage(from, { text: "✅ Command 53 executed successfully!" });
}


if (command === "command54") {
  await sock.sendMessage(from, { text: "✅ Command 54 executed successfully!" });
}


if (command === "command55") {
  await sock.sendMessage(from, { text: "✅ Command 55 executed successfully!" });
}


if (command === "command56") {
  await sock.sendMessage(from, { text: "✅ Command 56 executed successfully!" });
}


if (command === "command57") {
  await sock.sendMessage(from, { text: "✅ Command 57 executed successfully!" });
}


if (command === "command58") {
  await sock.sendMessage(from, { text: "✅ Command 58 executed successfully!" });
}


if (command === "command59") {
  await sock.sendMessage(from, { text: "✅ Command 59 executed successfully!" });
}


if (command === "command60") {
  await sock.sendMessage(from, { text: "✅ Command 60 executed successfully!" });
}


if (command === "command61") {
  await sock.sendMessage(from, { text: "✅ Command 61 executed successfully!" });
}


if (command === "command62") {
  await sock.sendMessage(from, { text: "✅ Command 62 executed successfully!" });
}


if (command === "command63") {
  await sock.sendMessage(from, { text: "✅ Command 63 executed successfully!" });
}


if (command === "command64") {
  await sock.sendMessage(from, { text: "✅ Command 64 executed successfully!" });
}


if (command === "command65") {
  await sock.sendMessage(from, { text: "✅ Command 65 executed successfully!" });
}


if (command === "command66") {
  await sock.sendMessage(from, { text: "✅ Command 66 executed successfully!" });
}


if (command === "command67") {
  await sock.sendMessage(from, { text: "✅ Command 67 executed successfully!" });
}


if (command === "command68") {
  await sock.sendMessage(from, { text: "✅ Command 68 executed successfully!" });
}


if (command === "command69") {
  await sock.sendMessage(from, { text: "✅ Command 69 executed successfully!" });
}


if (command === "command70") {
  await sock.sendMessage(from, { text: "✅ Command 70 executed successfully!" });
}


if (command === "command71") {
  await sock.sendMessage(from, { text: "✅ Command 71 executed successfully!" });
}


if (command === "command72") {
  await sock.sendMessage(from, { text: "✅ Command 72 executed successfully!" });
}


if (command === "command73") {
  await sock.sendMessage(from, { text: "✅ Command 73 executed successfully!" });
}


if (command === "command74") {
  await sock.sendMessage(from, { text: "✅ Command 74 executed successfully!" });
}


if (command === "command75") {
  await sock.sendMessage(from, { text: "✅ Command 75 executed successfully!" });
}


if (command === "command76") {
  await sock.sendMessage(from, { text: "✅ Command 76 executed successfully!" });
}


if (command === "command77") {
  await sock.sendMessage(from, { text: "✅ Command 77 executed successfully!" });
}


if (command === "command78") {
  await sock.sendMessage(from, { text: "✅ Command 78 executed successfully!" });
}


if (command === "command79") {
  await sock.sendMessage(from, { text: "✅ Command 79 executed successfully!" });
}


if (command === "command80") {
  await sock.sendMessage(from, { text: "✅ Command 80 executed successfully!" });
}


if (command === "command81") {
  await sock.sendMessage(from, { text: "✅ Command 81 executed successfully!" });
}


if (command === "command82") {
  await sock.sendMessage(from, { text: "✅ Command 82 executed successfully!" });
}


if (command === "command83") {
  await sock.sendMessage(from, { text: "✅ Command 83 executed successfully!" });
}


if (command === "command84") {
  await sock.sendMessage(from, { text: "✅ Command 84 executed successfully!" });
}


if (command === "command85") {
  await sock.sendMessage(from, { text: "✅ Command 85 executed successfully!" });
}


if (command === "command86") {
  await sock.sendMessage(from, { text: "✅ Command 86 executed successfully!" });
}


if (command === "command87") {
  await sock.sendMessage(from, { text: "✅ Command 87 executed successfully!" });
}


if (command === "command88") {
  await sock.sendMessage(from, { text: "✅ Command 88 executed successfully!" });
}


if (command === "command89") {
  await sock.sendMessage(from, { text: "✅ Command 89 executed successfully!" });
}


if (command === "command90") {
  await sock.sendMessage(from, { text: "✅ Command 90 executed successfully!" });
}


if (command === "command91") {
  await sock.sendMessage(from, { text: "✅ Command 91 executed successfully!" });
}


if (command === "command92") {
  await sock.sendMessage(from, { text: "✅ Command 92 executed successfully!" });
}


if (command === "command93") {
  await sock.sendMessage(from, { text: "✅ Command 93 executed successfully!" });
}


if (command === "command94") {
  await sock.sendMessage(from, { text: "✅ Command 94 executed successfully!" });
}


if (command === "command95") {
  await sock.sendMessage(from, { text: "✅ Command 95 executed successfully!" });
}


if (command === "command96") {
  await sock.sendMessage(from, { text: "✅ Command 96 executed successfully!" });
}


if (command === "command97") {
  await sock.sendMessage(from, { text: "✅ Command 97 executed successfully!" });
}


if (command === "command98") {
  await sock.sendMessage(from, { text: "✅ Command 98 executed successfully!" });
}


if (command === "command99") {
  await sock.sendMessage(from, { text: "✅ Command 99 executed successfully!" });
}


if (command === "command100") {
  await sock.sendMessage(from, { text: "✅ Command 100 executed successfully!" });
}


if (command === "command101") {
  await sock.sendMessage(from, { text: "✅ Command 101 executed successfully!" });
}


if (command === "command102") {
  await sock.sendMessage(from, { text: "✅ Command 102 executed successfully!" });
}


if (command === "command103") {
  await sock.sendMessage(from, { text: "✅ Command 103 executed successfully!" });
}


if (command === "command104") {
  await sock.sendMessage(from, { text: "✅ Command 104 executed successfully!" });
}


if (command === "command105") {
  await sock.sendMessage(from, { text: "✅ Command 105 executed successfully!" });
}


if (command === "command106") {
  await sock.sendMessage(from, { text: "✅ Command 106 executed successfully!" });
}


if (command === "command107") {
  await sock.sendMessage(from, { text: "✅ Command 107 executed successfully!" });
}


if (command === "command108") {
  await sock.sendMessage(from, { text: "✅ Command 108 executed successfully!" });
}


if (command === "command109") {
  await sock.sendMessage(from, { text: "✅ Command 109 executed successfully!" });
}


if (command === "command110") {
  await sock.sendMessage(from, { text: "✅ Command 110 executed successfully!" });
}


if (command === "command111") {
  await sock.sendMessage(from, { text: "✅ Command 111 executed successfully!" });
}


if (command === "command112") {
  await sock.sendMessage(from, { text: "✅ Command 112 executed successfully!" });
}


if (command === "command113") {
  await sock.sendMessage(from, { text: "✅ Command 113 executed successfully!" });
}


if (command === "command114") {
  await sock.sendMessage(from, { text: "✅ Command 114 executed successfully!" });
}


if (command === "command115") {
  await sock.sendMessage(from, { text: "✅ Command 115 executed successfully!" });
}


if (command === "command116") {
  await sock.sendMessage(from, { text: "✅ Command 116 executed successfully!" });
}


if (command === "command117") {
  await sock.sendMessage(from, { text: "✅ Command 117 executed successfully!" });
}


if (command === "command118") {
  await sock.sendMessage(from, { text: "✅ Command 118 executed successfully!" });
}


if (command === "command119") {
  await sock.sendMessage(from, { text: "✅ Command 119 executed successfully!" });
}


if (command === "command120") {
  await sock.sendMessage(from, { text: "✅ Command 120 executed successfully!" });
}


if (command === "command121") {
  await sock.sendMessage(from, { text: "✅ Command 121 executed successfully!" });
}


if (command === "command122") {
  await sock.sendMessage(from, { text: "✅ Command 122 executed successfully!" });
}


if (command === "command123") {
  await sock.sendMessage(from, { text: "✅ Command 123 executed successfully!" });
}


if (command === "command124") {
  await sock.sendMessage(from, { text: "✅ Command 124 executed successfully!" });
}


if (command === "command125") {
  await sock.sendMessage(from, { text: "✅ Command 125 executed successfully!" });
}


if (command === "command126") {
  await sock.sendMessage(from, { text: "✅ Command 126 executed successfully!" });
}


if (command === "command127") {
  await sock.sendMessage(from, { text: "✅ Command 127 executed successfully!" });
}


if (command === "command128") {
  await sock.sendMessage(from, { text: "✅ Command 128 executed successfully!" });
}


if (command === "command129") {
  await sock.sendMessage(from, { text: "✅ Command 129 executed successfully!" });
}


if (command === "command130") {
  await sock.sendMessage(from, { text: "✅ Command 130 executed successfully!" });
}


if (command === "command131") {
  await sock.sendMessage(from, { text: "✅ Command 131 executed successfully!" });
}


if (command === "command132") {
  await sock.sendMessage(from, { text: "✅ Command 132 executed successfully!" });
}


if (command === "command133") {
  await sock.sendMessage(from, { text: "✅ Command 133 executed successfully!" });
}


if (command === "command134") {
  await sock.sendMessage(from, { text: "✅ Command 134 executed successfully!" });
}


if (command === "command135") {
  await sock.sendMessage(from, { text: "✅ Command 135 executed successfully!" });
}


if (command === "command136") {
  await sock.sendMessage(from, { text: "✅ Command 136 executed successfully!" });
}


if (command === "command137") {
  await sock.sendMessage(from, { text: "✅ Command 137 executed successfully!" });
}


if (command === "command138") {
  await sock.sendMessage(from, { text: "✅ Command 138 executed successfully!" });
}


if (command === "command139") {
  await sock.sendMessage(from, { text: "✅ Command 139 executed successfully!" });
}


if (command === "command140") {
  await sock.sendMessage(from, { text: "✅ Command 140 executed successfully!" });
}


if (command === "command141") {
  await sock.sendMessage(from, { text: "✅ Command 141 executed successfully!" });
}


if (command === "command142") {
  await sock.sendMessage(from, { text: "✅ Command 142 executed successfully!" });
}


if (command === "command143") {
  await sock.sendMessage(from, { text: "✅ Command 143 executed successfully!" });
}


if (command === "command144") {
  await sock.sendMessage(from, { text: "✅ Command 144 executed successfully!" });
}


if (command === "command145") {
  await sock.sendMessage(from, { text: "✅ Command 145 executed successfully!" });
}


if (command === "command146") {
  await sock.sendMessage(from, { text: "✅ Command 146 executed successfully!" });
}


if (command === "command147") {
  await sock.sendMessage(from, { text: "✅ Command 147 executed successfully!" });
}


if (command === "command148") {
  await sock.sendMessage(from, { text: "✅ Command 148 executed successfully!" });
}


if (command === "command149") {
  await sock.sendMessage(from, { text: "✅ Command 149 executed successfully!" });
}


if (command === "command150") {
  await sock.sendMessage(from, { text: "✅ Command 150 executed successfully!" });
}


if (command === "command151") {
  await sock.sendMessage(from, { text: "✅ Command 151 executed successfully!" });
}


if (command === "command152") {
  await sock.sendMessage(from, { text: "✅ Command 152 executed successfully!" });
}


if (command === "command153") {
  await sock.sendMessage(from, { text: "✅ Command 153 executed successfully!" });
}


if (command === "command154") {
  await sock.sendMessage(from, { text: "✅ Command 154 executed successfully!" });
}


if (command === "command155") {
  await sock.sendMessage(from, { text: "✅ Command 155 executed successfully!" });
}


if (command === "command156") {
  await sock.sendMessage(from, { text: "✅ Command 156 executed successfully!" });
}


if (command === "command157") {
  await sock.sendMessage(from, { text: "✅ Command 157 executed successfully!" });
}


if (command === "command158") {
  await sock.sendMessage(from, { text: "✅ Command 158 executed successfully!" });
}


if (command === "command159") {
  await sock.sendMessage(from, { text: "✅ Command 159 executed successfully!" });
}


if (command === "command160") {
  await sock.sendMessage(from, { text: "✅ Command 160 executed successfully!" });
}


if (command === "command161") {
  await sock.sendMessage(from, { text: "✅ Command 161 executed successfully!" });
}


if (command === "command162") {
  await sock.sendMessage(from, { text: "✅ Command 162 executed successfully!" });
}


if (command === "command163") {
  await sock.sendMessage(from, { text: "✅ Command 163 executed successfully!" });
}


if (command === "command164") {
  await sock.sendMessage(from, { text: "✅ Command 164 executed successfully!" });
}


if (command === "command165") {
  await sock.sendMessage(from, { text: "✅ Command 165 executed successfully!" });
}


if (command === "command166") {
  await sock.sendMessage(from, { text: "✅ Command 166 executed successfully!" });
}


if (command === "command167") {
  await sock.sendMessage(from, { text: "✅ Command 167 executed successfully!" });
}


if (command === "command168") {
  await sock.sendMessage(from, { text: "✅ Command 168 executed successfully!" });
}


if (command === "command169") {
  await sock.sendMessage(from, { text: "✅ Command 169 executed successfully!" });
}


if (command === "command170") {
  await sock.sendMessage(from, { text: "✅ Command 170 executed successfully!" });
}


if (command === "command171") {
  await sock.sendMessage(from, { text: "✅ Command 171 executed successfully!" });
}


if (command === "command172") {
  await sock.sendMessage(from, { text: "✅ Command 172 executed successfully!" });
}


if (command === "command173") {
  await sock.sendMessage(from, { text: "✅ Command 173 executed successfully!" });
}


if (command === "command174") {
  await sock.sendMessage(from, { text: "✅ Command 174 executed successfully!" });
}


if (command === "command175") {
  await sock.sendMessage(from, { text: "✅ Command 175 executed successfully!" });
}


if (command === "command176") {
  await sock.sendMessage(from, { text: "✅ Command 176 executed successfully!" });
}


if (command === "command177") {
  await sock.sendMessage(from, { text: "✅ Command 177 executed successfully!" });
}


if (command === "command178") {
  await sock.sendMessage(from, { text: "✅ Command 178 executed successfully!" });
}


if (command === "command179") {
  await sock.sendMessage(from, { text: "✅ Command 179 executed successfully!" });
}


if (command === "command180") {
  await sock.sendMessage(from, { text: "✅ Command 180 executed successfully!" });
}


if (command === "command181") {
  await sock.sendMessage(from, { text: "✅ Command 181 executed successfully!" });
}


if (command === "command182") {
  await sock.sendMessage(from, { text: "✅ Command 182 executed successfully!" });
}


if (command === "command183") {
  await sock.sendMessage(from, { text: "✅ Command 183 executed successfully!" });
}


if (command === "command184") {
  await sock.sendMessage(from, { text: "✅ Command 184 executed successfully!" });
}


if (command === "command185") {
  await sock.sendMessage(from, { text: "✅ Command 185 executed successfully!" });
}


if (command === "command186") {
  await sock.sendMessage(from, { text: "✅ Command 186 executed successfully!" });
}


if (command === "command187") {
  await sock.sendMessage(from, { text: "✅ Command 187 executed successfully!" });
}


if (command === "command188") {
  await sock.sendMessage(from, { text: "✅ Command 188 executed successfully!" });
}


if (command === "command189") {
  await sock.sendMessage(from, { text: "✅ Command 189 executed successfully!" });
}


if (command === "command190") {
  await sock.sendMessage(from, { text: "✅ Command 190 executed successfully!" });
}


if (command === "command191") {
  await sock.sendMessage(from, { text: "✅ Command 191 executed successfully!" });
}


if (command === "command192") {
  await sock.sendMessage(from, { text: "✅ Command 192 executed successfully!" });
}


if (command === "command193") {
  await sock.sendMessage(from, { text: "✅ Command 193 executed successfully!" });
}


if (command === "command194") {
  await sock.sendMessage(from, { text: "✅ Command 194 executed successfully!" });
}


if (command === "command195") {
  await sock.sendMessage(from, { text: "✅ Command 195 executed successfully!" });
}


if (command === "command196") {
  await sock.sendMessage(from, { text: "✅ Command 196 executed successfully!" });
}


if (command === "command197") {
  await sock.sendMessage(from, { text: "✅ Command 197 executed successfully!" });
}


if (command === "command198") {
  await sock.sendMessage(from, { text: "✅ Command 198 executed successfully!" });
}


if (command === "command199") {
  await sock.sendMessage(from, { text: "✅ Command 199 executed successfully!" });
}


if (command === "command200") {
  await sock.sendMessage(from, { text: "✅ Command 200 executed successfully!" });
}

  });
  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      startSock();
    }
  });
  sock.ev.on("creds.update", saveState);
}

startSock();
