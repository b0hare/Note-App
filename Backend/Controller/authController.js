import db from "../config/db.js"
import bcrypt from 'bcrypt';
import encryptedPass from "../utils/encryptPassword.js";

export const registerCont = async (req, res) => {
    const { name, email, pass, verifyStatus } = req.body
    const hash = await encryptedPass(pass);
    if (verifyStatus && req.session.verifiedEmail === email) {
        const [createUser] = await db.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hash])
        if (createUser.affectedRows > 0) {
            req.session.userId = createUser.insertId;
            req.session.name = name;
            req.session.verifiedEmail = null;

            return res.status(201).json({
                name: name,
                userId: createUser.insertId
            });
        }
        return res.status(400).send("Registration failed")
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


export async function sendUserInfo(req, res) {
    if (!req.session.userId) {
        return res.sendStatus(401)
    }

    try {
        const [rows] = await db.execute("SELECT id, name, email, created_at FROM users WHERE id = ?", [req.session.userId])

        if (rows.length === 0) {
            return req.session.destroy((error) => {
                if (error) {
                    return res.sendStatus(500)
                }
                res.clearCookie("notes_app_sid")
                return res.sendStatus(401)
            })
        }

        const [user] = rows
        req.session.name = user.name
        return res.status(200).json({
            user: {
                authenticated: true,
                name: user.name,
                userId: user.id,
                email: user.email,
                member_since: user.created_at
            }
        })
    } catch (error) {
        return res.sendStatus(500)
    }
}

export async function resetPasswordCont(req, res) {
    const { email, pass, verifyStatus } = req.body

    if (!verifyStatus || req.session.verifiedEmail !== email) {
        return res.status(403).send("Email not verified")
    }

    const hash = await encryptedPass(pass)
    const [result] = await db.execute("UPDATE users SET password = ? WHERE email = ?", [hash, email])

    if (result.affectedRows === 0) {
        return res.status(404).send("User not found")
    }

    req.session.verifiedEmail = null
    return res.status(200).send("Password reset successfully")
}
