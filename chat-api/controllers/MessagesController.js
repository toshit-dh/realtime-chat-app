const Messages = require("../models/MessageModel");
module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, msg } = req.body;
    const data = await Messages.create({
      message: { text: msg },
      users: [ from, to ],
      sender: from,
    });
    if (data) return res.json({ msg: "Message Added Successfully" });
    return res.json({ msg: "Message not added" });
  } catch (e) {
    next(e);
  }
};
module.exports.getAllMesssages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Messages.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });
    const projectMessage = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectMessage);
  } catch (e) {
    next(e);
  }
};
