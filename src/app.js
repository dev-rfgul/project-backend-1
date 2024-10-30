import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))


app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())


//import routes 
import userRouter from './routes/user.routes.js'
app.use("/api/v1/users",userRouter)
// the url from here will be like http:localhost:3000/api/v1/users/
// but as it is handed over to the userRouter the urls will be handed over to the next route and the url will look like this http:localhost:3000/api/v1/user/register 
// so instead of messing up the app.js we have implemented clean code and separation of concerns

export { app }