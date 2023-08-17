"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ChatController_1 = require("../controllers/ChatController");
const router = (0, express_1.Router)();
router.post('/access-chat', ChatController_1.accessChatController);
router.get('/user-chat/:userid', ChatController_1.fetchUserChatController);
router.get('/company-chat/:cid', ChatController_1.fetchCompanyChatController);
exports.default = router;
