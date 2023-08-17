"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessagesByChatId = exports.sendMessage = exports.fetchCompanyChatController = exports.fetchUserChatController = exports.accessChatController = void 0;
const ChatModel_1 = require("../../Infra/database/ChatModel");
const ChatRepository_1 = require("../../Infra/repositories/ChatRepository");
const AccessChat_1 = require("../../App/usecases/Chat/AccessChat");
const MessageModel_1 = require("../../Infra/database/MessageModel");
const MessageRepository_1 = require("../../Infra/repositories/MessageRepository");
const Chatdb = ChatModel_1.ChatModel;
const msgDb = MessageModel_1.MsgModel;
const messageRepository = (0, MessageRepository_1.MessageRepositoryImpl)(msgDb);
const ChatRepository = (0, ChatRepository_1.ChatRepositoryImpl)(Chatdb);
const accessChatController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, cmpId } = req.body;
    try {
        if (!userId || !cmpId) {
            res.status(400).json({ message: "error" });
        }
        else {
            const chat = yield (0, AccessChat_1.accessChat)(ChatRepository)(userId, cmpId);
            res.status(201).json({ message: "successful", chat });
        }
    }
    catch (error) {
    }
});
exports.accessChatController = accessChatController;
const fetchUserChatController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userid;
    console.log("aaavo", userId);
    try {
        const allChats = yield (0, AccessChat_1.getChats)(ChatRepository)(userId);
        res.status(202).json({ chats: allChats });
    }
    catch (error) {
        console.log(error);
    }
});
exports.fetchUserChatController = fetchUserChatController;
const fetchCompanyChatController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("here????", req.body);
        const cId = req.params.cid;
        console.log(cId);
        const allChats = yield (0, AccessChat_1.getCompanyChats)(ChatRepository)(cId);
        console.log(allChats);
        res.json({ message: 'chat fetch success', allChats });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.fetchCompanyChatController = fetchCompanyChatController;
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const userId:string=req.params.userId
    // const cId:string=req.params.cId
    const { content, chatId, currentUserId, currentRole } = req.body;
    console.log(req.body);
    try {
        // const msg=await sendingMessage(messageRepository)(chatId,content,userId,cmpId)
        // res.json({message:"successfull",msg})
        if (currentRole === 'user') {
            const user = currentUserId;
            const msg = yield (0, AccessChat_1.sendingMessage)(messageRepository)(content, chatId, user);
            console.log('msgg=', msg);
            res.json({ message: 'success', msg });
        }
        else {
            const company = currentUserId;
            const msg = yield (0, AccessChat_1.cmpSendingMessage)(messageRepository)(content, chatId, company);
            console.log('msgg=', msg);
            res.json({ message: 'success', msg });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendMessage = sendMessage;
const getMessagesByChatId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const userId:string=req.params.userId
    // const cId:string=req.params.cId
    const chatId = req.params.chatId;
    console.log("real time pls", req.body);
    console.log("check chatId", chatId);
    try {
        const messages = yield (0, AccessChat_1.getAllMessages)(messageRepository)(chatId);
        res.status(201).json({ messages });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getMessagesByChatId = getMessagesByChatId;
