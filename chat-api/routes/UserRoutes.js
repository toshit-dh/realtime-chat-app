const { register, login, setAvatar, allUsers, addFriend, shownonFriends, addFriendRequest ,getAllUsers, allUserstp, removeFriendReq, addRemoveAll} = require('../controllers/UserController')
const router = require('express').Router()
router.post("/register",register)
router.post("/login",login)
router.post("/setAvatar/:id",setAvatar)
router.get("/allUsers/:id",allUsers)
router.get("/getallusers/:id", getAllUsers);
router.post("/add-friend",addFriend)
router.post("/remove-friend-req",removeFriendReq)
router.get("/add-remove-all/data",addRemoveAll)
router.get("/getnonFriend/:id",shownonFriends)
router.post('/addRequest',addFriendRequest)
router.get("/tp",allUserstp)
module.exports = router
