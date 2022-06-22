let app = require("express")();
let http = require("http").createServer(app);
let io = require("socket.io")(http);

const users = {};

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
        io.emit("chat message", { message: msg, name: users[socket.id] });
    });

    socket.on("new-user", (name) => {
        users[socket.id] = name;
    });

    socket.on("greeting", () => {
        io.emit("greeting", { user: users[socket.id] });
    });

    socket.on("disconnect", () => {
        io.emit("farewell", { user: users[socket.id] });
    });
});

http.listen(3000, () => {
    console.log("listening on http://localhost:3000");
});
