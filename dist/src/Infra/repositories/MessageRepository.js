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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRepositoryImpl = void 0;
const ChatModel_1 = require("../database/ChatModel");
const mongoose_1 = __importDefault(require("mongoose"));
const MessageRepositoryImpl = (MsgModel) => {
    const sendMsg = (content, chatId, user) => __awaiter(void 0, void 0, void 0, function* () {
        const newChat = {
            user: new mongoose_1.default.Types.ObjectId(user),
            // user:new mongoose.Types.ObjectId(tutId),
            content,
            chat: new mongoose_1.default.Types.ObjectId(chatId),
        };
        let message = yield MsgModel.create(newChat);
        message = yield message.populate("user", '_id firstname lastname username profileImg');
        message = yield message.populate("company", '_id firstname lastname username profileImg');
        message = yield message.populate('chat');
        message = yield message.populate('chat.user');
        message = yield message.populate('chat.company');
        yield ChatModel_1.ChatModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(chatId) }, { $set: { latestMessage: message } });
        return message;
    });
    const cmpSendMsg = (content, chatId, company) => __awaiter(void 0, void 0, void 0, function* () {
        const newChat = {
            // currentUserId:new mongoose.Types.ObjectId(currentUserId),
            company: new mongoose_1.default.Types.ObjectId(company),
            content,
            chat: new mongoose_1.default.Types.ObjectId(chatId),
        };
        let message = yield MsgModel.create(newChat);
        message = yield message.populate("user", '_id firstname lastname username profileImg');
        message = yield message.populate("company", '_id firstname lastname username profileImg');
        message = yield message.populate('chat');
        message = yield message.populate('chat.user');
        message = yield message.populate('chat.company');
        yield ChatModel_1.ChatModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(chatId) }, { $set: { latestMessage: message } });
        return message;
    });
    const getMsgsByChatId = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
        const messages = yield MsgModel.find({ chat: new mongoose_1.default.Types.ObjectId(chatId) }).populate("user", 'firstname lastname username profileImg').populate("company", 'firstname lastname username profileImg')
            .populate('chat');
        return messages;
    });
    return {
        sendMsg,
        cmpSendMsg,
        getMsgsByChatId
    };
};
exports.MessageRepositoryImpl = MessageRepositoryImpl;
