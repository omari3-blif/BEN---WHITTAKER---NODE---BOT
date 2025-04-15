require('dotenv').config();
const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Hello from Ben Whittaker Tech Node.js Bot 💀🥊');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Bot running on port ${PORT}`);
});
