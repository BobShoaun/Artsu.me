import express from "express";
import { Message, User } from "../models/index.js";
import { authenticate } from "../middlewares/user.middleware.js";
import { validateJsonPatch, validateIdParam } from "../middlewares/general.middleware.js";
import { checkDatabaseConn, mongoHandler } from "../middlewares/mongo.middleware.js";
import { executeJsonPatch } from "../helpers/general.helper.js";
import { Mongoose } from "mongoose";

const router = express.Router();

router.use(checkDatabaseConn);
router.param("messageId", validateIdParam);
router.param("userId", validateIdParam);

/**
 * Get all messages sent by a user
 */
router.get("/users/:userId/messages/sent", async (req, res, next) => {
    const { userId } = req.params;
    if (userId !== req.user._id && !req.user.isAdmin) return res.sendStatus(403); // can only check yours, unless admin
    try {
        const sentMessages = await(Message.find({senderId: {userID} }))
        res.send(sentMessages);
    } 
    catch (e) {next(e);}
});

/**
 * Get all messages received by a user
 */
 router.get("/users/:userId/messages/received", async (req, res, next) => {
    const { userId } = req.params;
    if (userId !== req.user._id && !req.user.isAdmin) return res.sendStatus(403); // can only check yours, unless admin
    try {
        const sentMessages = await(Message.find({receiverId: {userID} }))
        res.send(sentMessages);
    } 
    catch (e) {next(e);}
  });

/**
 * Get a specific message
 */
 router.get("/users/:userId/messages/:messageId", async (req, res, next) => {
    const { userId } = req.params;
    const { messageId } = req.params;
    if (userId !== req.user._id && !req.user.isAdmin) return res.sendStatus(403); // can only check yours, unless admin
    try {
        if (!Mongoose.isValidObjectId(messageId)) res.sendStatus(400); // If Id is valid
        const specificMessage = await(Message.findById(messageId)) // message in question
        if (!specificMessage) return res.sendStatus(404); // If message does not exist
        if(specificMessage.senderId === userId ||specificMessage.receiverId === userId || req.user.isAdmin) {res.send(specifcMessage);} // check if user is sender, receiver, or admin (valid targets) 
        else {res.sendStatus(403);}
    } 
    catch (e) {next(e);}
  });

/**
 * Send a message
 */
 router.post("/users/:userId/messages", authenticate, async (req, res, next) => {
    const { userId } = req.params;
    if (userId !== req.user._id) return res.sendStatus(403); // can only send messages at yourself. No admin override!
    
    const receiverId = req.body.receiverId;
    const subject = req.body.subject;
    const body  = req.body.body;

    if (!Mongoose.isValidObjectId(receiverId) || !subject || !body ) res.sendStatus(400); // ensure all are valid

    const receiver = await User.findById(receiverId); // ensure receiver exists
    if (!receiver) return res.sendStatus(404);

    try {
      const message = new Message({userId, receiverId, subject, body});
      await message.save();
      res.status(201).send(message);
    } 
    catch (e) {next(e);}
  });

/**
 * Remove a message from your inbox. Note that this does not delete it!
 */
router.patch("/users/:userId/messages/:messageId/remove", authenticate, async (req, res, next) => {
    const { userId } = req.params;
    const { messageId } = req.params;

    if (userId !== req.user._id) return res.sendStatus(403); // can only remove messages at yourself. No admin override!
    if (!Mongoose.isValidObjectId(messageId)) res.sendStatus(400); // If Id is valid
    const specificMessage = await(Message.findById(messageId)) // message in question
    if (!specificMessage) return res.sendStatus(404); // If message does not exist
    if(!specificMessage.receiverId === userId) return res.sendStatus(403); // only receiver can delete message.
    try {
      specificMessage.hasRecipientRemoved = true;
      await specificMessage.save();
      res.status(201).send(specificMessage);
    } 
    catch (e) {next(e);}
  });

router.use(mongoHandler);

export default router;