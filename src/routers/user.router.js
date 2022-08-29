import { Router } from "express";
import userController from '../controllers/user.controller.js'
import validation from "../middlewares/validation.js";
import checkToken from "../middlewares/checkToken.js";

const router = Router()

router.post('/login', validation, userController.LOGIN)
router.post('/register', validation, userController.REGISTER)
router.get('/users', checkToken, userController.GET)
router.get('/check-token', checkToken, userController.CHECHTOKEN)
router.get('/users/:userId', checkToken, userController.GET)

export default router