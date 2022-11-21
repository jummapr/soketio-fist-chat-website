const express = require("express");

const app = express();

const http = require("http").createServer(app);

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.static("public"));
http.listen(PORT, () => {
  console.log(`This Website Listen ${PORT}`);
});

// socket io

const socket = require("socket.io")(http);

socket.on("connection", (socketio) => {
  console.log("connection sucesfull");

  socketio.on("massage", (msg) => {
    console.log(msg);
    socketio.broadcast.emit("massage", msg);
  });
});
