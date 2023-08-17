"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// import {logs} from "node-request-log"
const cookieParser = require('cookie-parser');
const userRoutes_1 = __importDefault(require("./src/Interfaces/routes/userRoutes"));
const companyRouter_1 = __importDefault(require("./src/Interfaces/routes/companyRouter"));
const adminRoutes_1 = __importDefault(require("./src/Interfaces/routes/adminRoutes"));
const dbConfig_1 = __importDefault(require("./src/Infra/database/dbConfig"));
const ChatRouter_1 = __importDefault(require("./src/Interfaces/routes/ChatRouter"));
const messageRouter_1 = __importDefault(require("./src/Interfaces/routes/messageRouter"));
const errorHandler_1 = require("./src/Utils/errorHandler");
require('dotenv').config();
const app = express();
// app.use(logs)
const server = app.listen(3001, () => {
    console.log("connected");
});
const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: ['http://localhost:3000', process.env.CLIENT_URL]
        // origin:'http://10.4.3.148:3000'
    },
});
io.on("connection", (socket) => {
    console.log("connected to socket.io");
    socket.on("setup", (userId) => {
        socket.join(userId);
        ``;
        //  console.log("usr joined room",userId);
        socket.emit("connected");
    });
    //    socket.on("disconnect", ()=> {
    //     console.log('user disconnected room');
    // })
    socket.on('join chat', (room) => {
        socket.join(room);
        console.log("User Joined room : " + room);
    });
    socket.on('new message', (newMessageReceived) => {
        var _a, _b, _c, _d, _e;
        let chat = newMessageReceived.chat;
        console.log('new message=', newMessageReceived);
        const sender = newMessageReceived.user ? newMessageReceived.user : newMessageReceived === null || newMessageReceived === void 0 ? void 0 : newMessageReceived.company;
        console.log('sender is', sender);
        console.log('newMessageReceived.chat.user=', (_a = newMessageReceived.chat) === null || _a === void 0 ? void 0 : _a.user);
        //    if(!chat.user && !chat?.company) return console.log("Chat.users not defiend");
        if ((sender === null || sender === void 0 ? void 0 : sender._id) === ((_b = newMessageReceived.chat) === null || _b === void 0 ? void 0 : _b.user._id)) {
            console.log('user is the sender');
            socket.in(chat === null || chat === void 0 ? void 0 : chat.company._id).emit('message recieved', newMessageReceived);
        }
        if ((sender === null || sender === void 0 ? void 0 : sender._id) === ((_c = newMessageReceived.chat) === null || _c === void 0 ? void 0 : _c.company._id)) {
            console.log('company?.company is the sender');
            socket.in(chat === null || chat === void 0 ? void 0 : chat.user._id).emit('message recieved', newMessageReceived);
        }
        if ((chat === null || chat === void 0 ? void 0 : chat._id) === ((_d = newMessageReceived.user) === null || _d === void 0 ? void 0 : _d._id))
            return;
        socket.in(chat === null || chat === void 0 ? void 0 : chat.user._id).emit('message recieved', newMessageReceived);
        socket.on("typing", (currentId) => socket.to(currentId).emit("typing"));
        socket.on("stoptyping", (currentId) => socket.to(currentId).emit("stoptyping"));
        if ((chat === null || chat === void 0 ? void 0 : chat._id) === ((_e = newMessageReceived.company) === null || _e === void 0 ? void 0 : _e._id))
            return;
        socket.in(chat === null || chat === void 0 ? void 0 : chat.company._id).emit('message recieved', newMessageReceived);
    });
});
(0, dbConfig_1.default)();
app.use(cookieParser());
app.use(express.json());
app.use(errorHandler_1.errorHandler);
app.use(cors({
    origin: ['http://localhost:3000', process.env.CLIENT_URL],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use("/", userRoutes_1.default);
app.use("/user", companyRouter_1.default);
app.use("/admin", adminRoutes_1.default);
app.use("/chat", ChatRouter_1.default);
app.use("/message", messageRouter_1.default);
