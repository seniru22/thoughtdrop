import express, { Router } from "express"
const { signup, login, logout } = require("../controllers/user.controller");
const { isAuthenticated } = require("../middlewares/user.middleware");

const router: Router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', isAuthenticated, logout);

module.exports = router;

