const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/userModel');
const Message = require('../models/messageModel');

//sent message to user 
router.post('/sentMessage', authMiddleware, async (req, res) => {
    const senderId = req.body.currentUserId;
    const receiverId = req.body.otherUserId;
    // console.log(senderId, 'se');
    // console.log(receiverId, 're');
    const message = req.body.msg;
    try {
        const newMessage = new Message({
            sender: senderId,
            receiver: receiverId,
            messages: [{ content: message }]
        })
        await newMessage.save();
        res.send({
            success: true,
            message: "sent successfully"
        });
    } catch (error) {
        res.send(error.message);
    }
})

//router get all message between sender and receiver 
router.post('/getMessage', authMiddleware, async (req, res) => {
    const senderId = req.body.currentUserId;
    const receiverId = req.body.otherUserId;
    // console.log(senderId === receiverId);
    try {
        const message = await Message.find({
            $or: [
                {
                    $and: [
                        { sender: senderId },
                        { receiver: receiverId }
                    ]
                },
                {
                    $and: [
                        { sender: receiverId },
                        { receiver: senderId }
                    ]
                }
            ]
        }
        ).sort({ createdAt: 1 })
        // console.log(message);
        res.send({
            data: message,
            message: "message retrived successfully",
            success: true
        })
    } catch (error) {
        res.send(error.message);
    }
})
module.exports = router;
