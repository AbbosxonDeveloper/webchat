import { read, write } from '#model'
import { AuthorizationError, InternalServerError, ForbiddenError } from '#errors'



const GET = (req, res, next) => {
    try {
        let posts = read('posts')
        let { postId } = req.params

        if (postId) {
            return res.status(201).send(
                posts.find(post => post.postId == postId)
            )
        }

        return res.send(posts)
    } catch (error) {
        return next(new InternalServerError(500, error.message))
    }
}
let localeTime = `${new Date().getHours()}:${new Date().getMinutes()}`
const POST = (req, res, next) => {
    try {
        let posts = read('posts')
        let users = read('users')
        let { userId, username, body } = req.body

        let post = users.find(post => post.userId == userId)


        let newPost = {
            postId: posts.at(-1).postId + 1 || 1,
            userId,
            username,
            body,
            created_at: localeTime
        }

        if (!post) {
            return next(new ForbiddenError(403, "wrong id"))
        }

        posts.push(newPost)
        write('posts', posts)
        return res.status(201).json({
            status: 201,
            message: "post added"
        })

    } catch (error) {
        return next(new ForbiddenError(500, error.message))
    }
}

const DELETE = (req, res, next) => {
    try {
        let posts = read('posts')
        let { postId } = req.params

        let postIndex = posts.findIndex(post => post.postId == postId && post.userId == req.userId)

        if (postIndex == -1) {
            return next(new ForbiddenError(403, "cannot find post"))
        }

        posts.splice(postIndex, 1)
        write('posts', posts)

        return res.status(202).json({ status: 204, message: "post deleted" })

    } catch (error) {
        return next(new InternalServerError(500, error.message))
    }
}

export default {
    GET,
    DELETE,
    POST
}