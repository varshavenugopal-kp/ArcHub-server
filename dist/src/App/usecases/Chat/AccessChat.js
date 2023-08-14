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
exports.cmpSendingMessage = exports.sendingMessage = exports.getAllMessages = exports.getCompanyChats = exports.getChats = exports.accessChat = void 0;
const accessChat = (chatRepository) => (userid, cid) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield chatRepository.createChat(cid, userid);
    return res ? res : null;
});
exports.accessChat = accessChat;
const getChats = (chatRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const chats = yield chatRepository.getAllUserChats(userId);
    return chats;
});
exports.getChats = getChats;
const getCompanyChats = (chatRepository) => (cId) => __awaiter(void 0, void 0, void 0, function* () {
    const chats = yield chatRepository.getAllCmpChats(cId);
    return chats;
});
exports.getCompanyChats = getCompanyChats;
const getAllMessages = (messageRepository) => (chatId) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield messageRepository.getMsgsByChatId(chatId);
    return messages;
});
exports.getAllMessages = getAllMessages;
const sendingMessage = (messageRepository) => (content, chatId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield messageRepository.sendMsg(content, chatId, user);
    return message;
});
exports.sendingMessage = sendingMessage;
const cmpSendingMessage = (messageRepository) => (content, chatId, company) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield messageRepository.cmpSendMsg(content, chatId, company);
    return message;
});
exports.cmpSendingMessage = cmpSendingMessage;
// export const sendingMessage=(MessageRepository:MessageRepository)=>async(chatId:string,content:string,userId:string,cmpId:string)=>{
//     const message=await MessageRepository.sendMsg(chatId,content,userId,cmpId)
//    return message
// }
//  export const getChats=(MessageRepository:MessageRepository)=>async(chatId:string)=>{
//     const messages=await MessageRepository.getMsgsByChatId(chatId)
//     return messages
//  }
//  export const getAllCmpMessages = (chatRepository:ChatRepository)=>async(cId:string)=>{
//     const chats = await chatRepository.getAllCmpChats(cId);
//     return chats
//  }
//  export const tutorSendingMessage = (messageRepository:MessageRepository)=>async(content:string,chatId:string,company:string)=>{
//     const message = await messageRepository.cmpSendMsg(content,chatId,company);
//     return message;
//   }
