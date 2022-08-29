import { read, write } from '#model'
import sha256 from 'sha256'
import { AuthorizationError, InternalServerError } from '#errors'
import jwt from '../utils/jwt.js'

const LOGIN = (req, res, next) => {
    try {
        let users = read('users')
        let { username, password } = req.body

        let user = users.find(user => user.username == username && user.password == sha256(password))

        if (!user) {
            return next(new AuthorizationError(401, 'wrong username or password'))
        }
        return res.status(201).json({
            status: 201,
            message: 'ok',
            token: jwt.sign({ userId: user.userId })
        })
    } catch (error) {
        return next(new InternalServerError(error.status, error.message))
    }
}

const REGISTER = (req, res, next) => {
    try {
        let users = read('users')
        let { username, password, contact, gender } = req.body

        let newUser = {
            userId: users.length ? users.at(-1).userId + 1 : 1,
            username,
            password: sha256(password),
            contact,
            gender
        }
        users.push(newUser)

        write('users', users)

        return res.status(201).json({
            status: 201,
            message: "success",
            id: newUser.userId,
            token: jwt.sign({ userId: newUser.userId })
        })

    } catch (error) {
        return next(new InternalServerError(500, error.message))
    }
}

const GET = (req, res, next) => {
    try {
        let users = read('users').filter(user => delete user.password)
        let { userId } = req.params

        if (userId) {
            return res.status(201).send(
                users.find(user => user.userId == userId)
            )
        }
        res.send(users)
    } catch (error) {
        return next(new InternalServerError(500, error.message))
    }
}

const CHECHTOKEN = (req, res) => {
    try {
        return res.status(200).send({
            status: 200,
            message: "token success"
        })
    } catch (error) {
        return next(new InternalServerError(500, error.message))
    }
}

export default { LOGIN, REGISTER, GET, CHECHTOKEN }