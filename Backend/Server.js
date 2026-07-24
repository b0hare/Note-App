import express from 'express'
import authRouter from './Routes/loginRoute.js';
import session from 'express-session'
import db from './config/db.js';
import mailRouter from './Routes/mailRoute.js';
import cors from "cors";
import registerRouter from './Routes/registerRoute.js';
import otpVerifyRouter from './Routes/otpVerifyRoute.js';

const app = express()
const PORT = 3000

// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())

app.use(session({
    secret: "MyNotesAppSecretKeyIsVeryVerySecret",
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
app.use('/', registerRouter)
app.use('/', otpVerifyRouter)

const [users] = await db.query("SELECT * FROM users")
// console.log(users);


const server = app.listen(PORT, () => {
    console.log(`Server is listening ${PORT}`);
})

server.on("error", (err) => {
    console.error("Listen error:", err);
});