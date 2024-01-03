const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username : {
        type: String,
        required: true,
        min: 3,
        max: 15,
        unique: true
    },
    email : {
        type: String,
        required: true,
        min: 3,
        max: 45,
        unique: true
    },
    password : {
        type: String,
        required: true,
        min: 8,
    },
    isAvatar: {
        type: Boolean,
        default: false
    },
    avatarImage: {
        type: String,
        default: ""
    },
    friends: {
        type: Array,
        default: []
      },
      friendRequests: {
        type: Array,
        default: []
      }
})
module.exports = mongoose.model("Users",userSchema)