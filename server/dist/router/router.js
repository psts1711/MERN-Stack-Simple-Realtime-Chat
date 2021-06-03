"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const chatController_1 = require("../controller/chatController");
const router = express.Router();
router.get('/', chatController_1.chatController.index);
exports.default = router;
