import express from "express";
import cors from "cors";
import "dotenv/config";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

const allowedOrigins = [
    "https://chat-app-deepansh.vercel.app",
    "http://localhost:5173",
];

//socket.io init
export const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT"],
        credentials: true,
    },
});

//store online users
export const userSocketMap = {}; // {userId : socketId}

//socket.io connection handler
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("User Connected", userId);

    if (userId) userSocketMap[userId] = socket.id;

    //emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", async () => {
        console.log("User Disconnected", userId);
        delete userSocketMap[userId];
        // Update lastSeen on disconnect
        if (userId) {
            const User = (await import("./models/user.model.js")).default;
            await User.findByIdAndUpdate(userId, { lastSeen: new Date() });
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

//Middlewares
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);
app.use(express.json({ limit: "4mb" }));

//Routes
app.use("/api/status", (req, res) => {
    res.send("Server LIVE");
});
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

await connectDB();

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
