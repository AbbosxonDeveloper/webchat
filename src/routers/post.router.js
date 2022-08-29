import { Router } from "express";
import postController from '../controllers/post.controller.js'
import checkToken from "../middlewares/checkToken.js";

const router = Router()

router.get('/posts', postController.GET)
router.get('/posts/:postId', checkToken, postController.GET)
router.post('/posts', checkToken, postController.POST)
router.delete('/posts/:postId', checkToken, postController.DELETE)

export default router