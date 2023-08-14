"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ChatController_1 = require("../controllers/ChatController");
const router = (0, express_1.Router)();
router.post('/send', ChatController_1.sendMessage);
router.get('/:chatId', ChatController_1.getMessagesByChatId);
exports.default = router;
