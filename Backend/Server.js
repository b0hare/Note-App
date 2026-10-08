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
import './config/env.js';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';

const app = express()
const PORT = Number(process.env.PORT) || 3000
const isProduction = process.env.NODE_ENV === 'production'
const allowedOrigins = (process.env.FRONTEND_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

if (isProduction && !process.env.SECRET_KEY) {
    throw new Error('SECRET_KEY must be set in production')
}

if (isProduction) {
    app.set('trust proxy', 1)
}

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true)
        }
        return callback(new Error('Origin is not allowed by CORS'))
    },
    credentials: true
}))

app.use(helmet())
// A 500 KB profile image grows to roughly 667 KB when encoded as a data URL.
app.use(express.json({ limit: '1mb' }))
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: 'draft-8', legacyHeaders: false }))

const MySQLStore = MySQLStoreFactory(session);
const sessionStore = new MySQLStore({}, db)

app.use(session({
    key: "notes_app_sid",
    secret: process.env.SECRET_KEY || 'development-only-secret-change-me',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*12,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax'
    },
}))

app.get('/', (req,res) => res.send("Notes API"))
app.get('/health', async (req, res) => {
    try {
        await db.query('SELECT 1')
        res.status(200).json({ status: 'ok' })
    } catch {
        res.status(503).json({ status: 'unavailable' })
    }
})

app.use('/', authRouter)
app.use('/', mailRouter)
app.use('/', otpVerifyRouter)
app.use('/', profileRouter)
app.use('/notes', noteRouter)

app.use((err, req, res, next) => {
    if (err.message === 'Origin is not allowed by CORS') {
        return res.status(403).json({ message: 'Origin is not allowed' })
    }
    if (err.type === 'entity.too.large') {
        return res.status(413).json({ message: 'Request is too large' })
    }
    console.error(err)
    return res.status(500).json({ message: 'Internal server error' })
})

const server = app.listen(PORT, () => {
    console.log(`Server is listening ${PORT}`);
})

server.on("error", (err) => {
    console.error("Listen error:", err);
});
