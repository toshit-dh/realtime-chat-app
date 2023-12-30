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
  } catch (error) {
    return res.json({ msg: error.message });
  }
};
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ msg: "No user found", status: false });
    if(!(await bcrypt.compare(password,user.password))) return res.json({ msg: "Wrong Password", status: false });
    else return res.json({ status: true, user });
  } catch (error) {
    return res.json({ msg: error.message });
  }
};
