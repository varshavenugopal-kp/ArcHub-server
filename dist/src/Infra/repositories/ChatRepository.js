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
exports.ChatRepositoryImpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ChatRepositoryImpl = (ChatModel) => {
    const createChat = (cmpId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const cmpid = new mongoose_1.default.Types.ObjectId(cmpId);
        const userid = new mongoose_1.default.Types.ObjectId(userId);
        const isChat = yield ChatModel.find({
            $and: [
                { user: userId }, { company: cmpId }
            ]
        }).populate('user', '-password').populate('company', '-password').populate('latestMessage');
        // console.log("moyanthpranav",isChat);
        if (isChat.length > 0) {
            return isChat;
        }
        else {
            const chatData = {
                chatName: 'sender',
                user: userid,
                company: cmpid
            };
            const createdChat = yield ChatModel.create(chatData);
            const fullChat = yield ChatModel.findOne({ _id: createdChat._id }).populate('user', '-password').populate('company', '-password');
            console.log("chatttt", fullChat);
            return fullChat;
        }
    });
    // const getAllUserChats=async(userId:string,cmpId:string):Promise<Chat[] | null>=>{
    //     const id= new mongoose.Types.ObjectId(userId)
    //     const cId=new mongoos.Types.ObjectId(cmpId)
    //     const chats=ChatModel.find({
    //         $and:[
    //            {user:userId,company:cmpId}
    //         ]
    //        }).populate('users','-password').populate('latestMessage').sort({updatedAt:-1})
    //     return chats
    // }
    const getAllUserChats = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userid = new mongoose_1.default.Types.ObjectId(userId);
            const chats = ChatModel.find({ user: userid }).populate("company", "-password").populate("latestMessage").sort({ updatedAt: -1 });
            return chats;
        }
        catch (error) {
            console.error('Error creating course:', error);
            throw error;
        }
    });
    const getAllCmpChats = (cId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const cid = new mongoose_1.default.Types.ObjectId(cId);
            console.log('cid=', cId);
            // const cId= new mongoose.Types.ObjectId(cId)
            const chats = ChatModel.find({ company: cid }).populate("user", "-password").populate("latestMessage").sort({ updatedAt: -1 });
            // console.log("detailsss",chats);
            return chats;
        }
        catch (error) {
            console.error('Error:', error);
            throw error; // or handle the error appropriately
        }
    });
    return {
        createChat,
        getAllUserChats,
        getAllCmpChats
    };
};
exports.ChatRepositoryImpl = ChatRepositoryImpl;
