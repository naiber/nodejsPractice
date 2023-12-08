const express = require('express');
const app = express();
const { PORT = 3000 } = process.env;
const venomIp = '111.34.55.211';

app.get('/', (req, res) => {
  const ip = req.ip || req.socket.remoteAddress;

  if (ip === venomIp) return res.sendStatus(403);

  res.sendStatus(200);
})

app.listen(PORT, () => {
  console.log("🚀 app.listen ~ PORT:", PORT);
})