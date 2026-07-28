import db from "../config/db.js"
import bcrypt from 'bcrypt';
import encryptedPass from "../utils/encryptPassword.js";

export const registerCont = async (req, res) => {
    const { name, email, pass, verifyStatus } = req.body
    const hash = await encryptedPass(pass);
    if (verifyStatus) {
        const [createUser] = db.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hash])
        if (createUser.affectedRows > 0) {
            req.session.userId = createUser.insertId;
            req.session.name = name;

            return res.sendStatus(201).json({
                name: name,
                userId: createUser.insertId
            });
        }
        return res.sendStatus(400).send("Registration failed")
    }
    return res.status(403).send("Email not verified")

}


export async function loginControll(req, res) {
    
    const { email, pass } = req.body;
    const [rows] = await db.execute(`SELECT id, name, password FROM users WHERE email = ?`, [email]);

    if (rows.length > 0) {
        const [user] = rows;
        
        const isValid = await bcrypt.compare(pass, user.password);
        
        if (isValid) {
            req.session.userId = user.id;
            req.session.name = user.name;
            
            return res.status(200).json({
                authenticated: true,
                name: user.name,
                userId: user.id
            })
        }
        return res.status(400).send("Invalid Credentials")
    }
    return res.status(404).send("User not found")

}


export function sendUserInfo(req, res) {
    if(req.session.userId){
        return res.status(200).json({
            user: {
                authenticated: true,
                name: req.session.name,
                userId: req.session.userId
            }
        })
    }
    return res.status(401)
}