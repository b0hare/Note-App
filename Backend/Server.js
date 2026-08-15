import express from 'express'
import authRouter from './Routes/authRoute.js';
import session from 'express-session'
import mailRouter from './Routes/mailRoute.js';
import cors from "cors";
import otpVerifyRouter from './Routes/otpVerifyRoute.js';
import profileRouter from './Routes/profileRoute.js';
import MySQLStoreFactory from 'express-mysql-session';
import db from './config/db.js';
import noteRouter from './Routes/noteRoute.js';

const app = express()
const PORT = 3000

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())

const MySQLStore = MySQLStoreFactory(session);
const sessionStore = new MySQLStore({}, db)

app.use(session({
    key: "notes_app_sid",
    secret: process.env.SECRET_KEY,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*12,
        httpOnly: true,
        sameSite: 'lax'
    },
}))

app.get('/', (req,res) => {
    res.send("Home Page");
})

app.use('/', authRouter)
app.use('/', mailRouter)
app.use('/', otpVerifyRouter)
app.use('/', profileRouter)
app.use('/notes', noteRouter)

const server = app.listen(PORT, () => {
    console.log(`Server is listening ${PORT}`);
})

server.on("error", (err) => {
    console.error("Listen error:", err);
});