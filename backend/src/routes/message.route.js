import express from "express";
import { Message, User } from "../models/index.js";
import { authenticate } from "../middlewares/user.middleware.js";
import {
  checkDatabaseConn,
  mongoHandler,
  validateIdParam,
} from "../middlewares/mongo.middleware.js";

const router = express.Router();

router.use(checkDatabaseConn);
router.param("messageId", validateIdParam);
router.param("userId", validateIdParam);

/**
 * Get all messages sent by a user
 */
router.get("/users/:userId/messages/sent", authenticate, async (req, res, next) => {
  const { userId } = req.params;
  if (userId !== req.user._id && !req.user.isAdmin) return res.sendStatus(403); // can only check yours, unless admin
  try {
    const messages = await Message.find({ senderId: userId });
    res.send(messages);
  } catch (e) {
    next(e);
  }
});

/**
 * Get all messages received by a user
 */
router.get("/users/:userId/messages/received", authenticate, async (req, res, next) => {
  const { userId } = req.params;
  if (userId !== req.user._id && !req.user.isAdmin) return res.sendStatus(403); // can only check yours, unless admin
  try {
    const messages = await Message.find({ receiverId: userId }).populate("sender");
    res.send(messages);
  } catch (e) {
    next(e);
  }
});

/**
 * Get a specific message
 */
router.get("/users/:userId/messages/:messageId", authenticate, async (req, res, next) => {
  const { userId } = req.params;
  const { messageId } = req.params;
  if (userId !== req.user._id && !req.user.isAdmin) return res.sendStatus(403); // can only check yours, unless admin
  try {
    const specificMessage = await Message.findById(messageId); // message in question
    if (!specificMessage) return res.sendStatus(404); // If message does not exist
    if (
      specificMessage.senderId === userId ||
      specificMessage.receiverId === userId ||
      req.user.isAdmin
    ) {
      res.send(specificMessage);
    } // check if user is sender, receiver, or admin (valid targets)
    else {
      res.sendStatus(403);
    }
  } catch (e) {
    next(e);
  }
});

/**
 * Send a message
 */
router.post("/users/:userId/messages", authenticate, async (req, res, next) => {
  const { userId } = req.params;
  if (userId !== req.user._id) return res.sendStatus(403); // can only send messages at yourself. No admin override!
  const senderId = userId;
  const receiverId = req.body.receiverId;
  const subject = req.body.subject;
  const body = req.body.body;
  if (!subject || !body) res.sendStatus(400); // ensure all are valid

  try {
    const receiver = await User.findById(receiverId); // ensure receiver exists
    if (!receiver) return res.sendStatus(404);

    const newMessage = new Message({ senderId, receiverId, subject, body });
    await newMessage.save();
    res.status(201).send(newMessage);
  } catch (e) {
    next(e);
  }
});

/**
 * Remove a message from your inbox. Note that this does not delete it!
 */
router.patch("/users/:userId/messages/:messageId/remove", authenticate, async (req, res, next) => {
  const { userId } = req.params;
  const { messageId } = req.params;
  if (userId !== req.user._id) return res.sendStatus(403); // can only remove messages at yourself. No admin override!

  try {
    const message = await Message.findById(messageId); // message in question
    if (!message) return res.sendStatus(404); // If message does not exist
    if (!message.receiverId === userId) return res.sendStatus(403); // only receiver can delete message.
    message.hasRead = true;
    await message.save();
    res.status(201).send(message);
  } catch (e) {
    next(e);
  }
});

router.use(mongoHandler);

export default router;
