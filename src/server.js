import express from "express";
import fs from 'fs'
import path from "path";
const PORT = process.env.PORT || 3000

import userRouter from './routers/user.router.js'
import postRouter from './routers/post.router.js'
const app = express()

app.use(express.json())

app.use(express.static(path.join(process.cwd(), 'chat-client', 'front')))
app.use(userRouter)
app.use(postRouter)

// console.log(path.join(process.cwd(), 'chat-client', 'css'));


app.get('/login', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), 'chat-client', 'login.html'))
})
app.get('/', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), 'chat-client', 'index.html'))
})
app.get('/register', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), 'chat-client', 'register.html'))
})

app.use((error, req, res, next) => {
    if (error.status != 500) {
        return res.status(error.status).json({
            status: error.status,
            message: error.message
        })
    }
})

app.listen(PORT, () => console.log('http://localhost:5000'))