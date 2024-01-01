const { register, login, setAvatar, allUsers, allUserstp } = require('../controllers/UserController')
const router = require('express').Router()
router.post("/register",register)
router.post("/login",login)
router.post("/setAvatar/:id",setAvatar)
router.get("/allUsers/:id",allUsers)
router.get("/tp",allUserstp)
module.exports = router
