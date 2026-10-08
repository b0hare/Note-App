import db from "../config/db.js"
import bcrypt from 'bcrypt';
import encryptedPass from "../utils/encryptPassword.js";
import { emailPattern, isStrongPassword, normalizeEmail, validName } from '../utils/validation.js';

const regenerateSession = (req) => new Promise((resolve, reject) => {
    req.session.regenerate((error) => error ? reject(error) : resolve())
})

export const registerCont = async (req, res) => {
    const { pass, verifyStatus } = req.body
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : ''
    const email = normalizeEmail(req.body.email)

    if (!validName(name) || !emailPattern.test(email) || !isStrongPassword(pass)) {
        return res.status(400).send("Password validation failed")
    }

    if (verifyStatus && req.session.verifiedEmail === email) {
        try {
            const hash = await encryptedPass(pass);
            const [createUser] = await db.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hash])
            if (!createUser.affectedRows) {
                return res.status(400).send("Registration failed")
            }
            await regenerateSession(req)
            req.session.userId = createUser.insertId;
            req.session.name = name;

            return res.status(201).json({
                name: name,
                userId: createUser.insertId,
                email,
                profile_image: null
            });
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).send('An account with this email already exists')
            }
            console.error('Registration failed', error)
            return res.status(500).send('Registration failed')
        }
    }
    return res.status(403).send("Email not verified")

}


export async function loginControll(req, res) {

    const email = normalizeEmail(req.body.email);
    const { pass } = req.body;
    if (!emailPattern.test(email) || typeof pass !== 'string') {
        return res.status(401).send('Invalid email or password')
    }

    const [rows] = await db.execute(`SELECT id, name, email, password, profile_image, created_at FROM users WHERE email = ?`, [email]);

    if (rows.length > 0) {
        const [user] = rows;

        const isValid = await bcrypt.compare(pass, user.password);

        if (isValid) {
            await regenerateSession(req)
            req.session.userId = user.id;
            req.session.name = user.name;

            return res.status(200).json({
                authenticated: true,
                name: user.name,
                userId: user.id,
                email: user.email,
                profile_image: user.profile_image,
                member_since: user.created_at
            })
        }
        return res.status(401).send("Invalid email or password")
    }
    return res.status(401).send("Invalid email or password")

}


export async function sendUserInfo(req, res) {
    if (!req.session.userId) {
        return res.sendStatus(401)
    }

    try {
        const [rows] = await db.execute("SELECT id, name, email, profile_image, created_at FROM users WHERE id = ?", [req.session.userId])

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
                profile_image: user.profile_image,
                member_since: user.created_at
            }
        })
    } catch (error) {
        return res.sendStatus(500)
    }
}

export async function resetPasswordCont(req, res) {
    const { pass, verifyStatus } = req.body
    const email = normalizeEmail(req.body.email)

    if (!isStrongPassword(pass)) {
        return res.status(400).send('Password validation failed')
    }
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

export function logoutControll(req, res) {
    req.session.destroy((error) => {
        if (error) return res.sendStatus(500)
        res.clearCookie('notes_app_sid')
        return res.sendStatus(204)
    })
}

export async function deleteAccountControll(req, res) {
    const connection = await db.getConnection()
    try {
        await connection.beginTransaction()
        await connection.execute('DELETE FROM notes WHERE userId = ?', [req.session.userId])
        const [result] = await connection.execute('DELETE FROM users WHERE id = ?', [req.session.userId])
        if (!result.affectedRows) {
            await connection.rollback()
            return res.sendStatus(404)
        }
        await connection.commit()
        req.session.destroy((error) => {
            if (error) return res.sendStatus(500)
            res.clearCookie('notes_app_sid')
            return res.sendStatus(204)
        })
    } catch (error) {
        await connection.rollback()
        console.error('Account deletion failed', error)
        return res.sendStatus(500)
    } finally {
        connection.release()
    }
}
