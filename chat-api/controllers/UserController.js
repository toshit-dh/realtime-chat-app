const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const isUsername = await User.findOne({ username });
    if (isUsername)
      return res.json({ msg: "Username already exists", status: false });
    const isEmail = await User.findOne({ email });
    if (isEmail) return res.json({ msg: "Email already used", status: false });
    const hashPass = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashPass });
    delete user.password;
    return res.json({ status: true, user });
  } catch (e) {
    next(e);
  }
};
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ msg: "No user found", status: false });
    if (!(await bcrypt.compare(password, user.password)))
      return res.json({ msg: "Wrong Password", status: false });
    else return res.json({ status: true, user });
  } catch (e) {
    next(e);
  }
};
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const user = await User.findByIdAndUpdate(
      userId,
      { isAvatar: true, avatarImage },
      { new: true }
    );
    return res.json({ isSet: user.isAvatar, image: user.avatarImage });
  } catch (e) {
    next(e);
  }
};
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ _id: userId });
    const friendIds = user.friends.map((friend) => friend);
    const friendRequestIds = user.friendRequests.map((request) => request);
    const users = await User.find({
      _id: { $nin: [...friendIds, ...friendRequestIds, userId] },
    });
    if (users.length === 0) {
      return res.json({});
    }
    const modifiedUsersPromises = users.map(async (userId) => {
      const friend = await User.findOne({ _id: userId });
      return {
        friends: friend.friends,
        friendRequests: friend.friendRequests,
        username: friend.username,
        avatarImage: friend.avatarImage,
        _id: friend._id,
      };
    });
    const modifiedUsers = await Promise.all(modifiedUsersPromises);
    return res.json(modifiedUsers);
  } catch (ex) {
    next(ex);
  }
};
module.exports.allUsers = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const modifiedFriendsPromises = user.friends.map(async (friendId) => {
      const friend = await User.findOne({ _id: friendId });
      return {
        username: friend.username,
        avatarImage: friend.avatarImage,
        _id: friend._id,
      };
    });

    const modifiedFriends = await Promise.all(modifiedFriendsPromises);
    return res.json(modifiedFriends);
  } catch (e) {
    next(e);
  }
};
module.exports.addFriend = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    await User.findByIdAndUpdate({ _id: from }, { $addToSet: { friends: to } });
    await User.findByIdAndUpdate({ _id: to }, { $addToSet: { friends: from } });
    await User.findByIdAndUpdate(
      { _id: from },
      { $pull: { friendRequests: to } }
    );
    return res.json({ msg: "Friend Added" });
  } catch (e) {
    next(e);
  }
};
module.exports.removeFriendReq = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    await User.findByIdAndUpdate(
      { _id: from },
      { $pull: { friendRequests: to } }
    );
    return res.json({ msg: "Friend Removed" });
  } catch (e) {
    next(e);
  }
};
module.exports.addRemoveAll = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    const condition = req.query.condition;
    const user = await User.findOne({ _id: userId });
    if (condition === "accept") {
      const uniqueFriendIds = new Set(user.friendRequests);
      user.friends.push(...uniqueFriendIds);
      await user.save();
      await Promise.all(Array.from(uniqueFriendIds).map(async (friendId) => {
        await User.findByIdAndUpdate(
          { _id: friendId },
          { $addToSet: { friends: userId } }
        );
      }));
    }
    user.friendRequests = [];
    await user.save();
    return res.json({ msg: `All Friend Requests ${condition}` });
  } catch (e) {
    next(e);
  }
};
module.exports.shownonFriends = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    const nonfriends = await User.find({ _id: { $in: user.friendRequests } });
    return res.json(nonfriends);
  } catch (e) {
    next(e);
  }
};
module.exports.addFriendRequest = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    await User.findByIdAndUpdate(
      { _id: to },
      { $addToSet: { friendRequests: from } }
    );
    const usersRes = await fetch(
      `http://localhost:5000/api/auth/getallusers/${from}`,
      {
        method: "GET",
      }
    );
    const users = await usersRes.json();
    return res.json(users);
  } catch (e) {
    next(e);
  }
};
module.exports.allUserstp = async (req, res, next) => {
  try {
    const users = await User.find({}, "_id");
    return res.json(users);
  } catch (e) {
    next(e);
  }
};
