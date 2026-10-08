import db from "../config/db.js";
import { emailPattern, normalizeEmail, validName } from '../utils/validation.js';

const imagePattern = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/;
const MAX_PROFILE_IMAGE_BYTES = 500 * 1024;

export function profileController(req, res) {
    res.send(`Welcome ${req.session.name}`);
}

export async function editName(req, res) {
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
    const {userId} = req.session;
    if (!validName(name)) {
        return res.status(400).send('Name must be 1-50 letters, numbers, or spaces')
    }
    try {
        await db.execute("UPDATE users SET name = ? WHERE id = ?", [name, userId])

        res.sendStatus(200)
    } catch {
        res.status(500).send("Request Failed")
    }

}

export async function editEmail(req, res) {
    const email = normalizeEmail(req.body.email);
    const {userId} = req.session;

    if (!emailPattern.test(email)) {
        return res.status(400).send('Invalid email address')
    }
    if (req.session.verifiedEmail !== email) {
        return res.status(403).send('Email not verified')
    }

    try {
        await db.execute("UPDATE users SET email = ? WHERE id = ?", [email, userId])
        req.session.verifiedEmail = null
        res.sendStatus(200)
    } catch {
        res.status(500).send("Request Failed")
    }

}

export async function updateProfileImage(req, res) {
    const imageData = req.body.imageData;
    if (typeof imageData !== 'string' || !imagePattern.test(imageData)) {
        return res.status(400).send('Upload a PNG, JPEG, or WebP image')
    }

    const base64 = imageData.slice(imageData.indexOf(',') + 1)
    if (Buffer.byteLength(base64, 'base64') > MAX_PROFILE_IMAGE_BYTES) {
        return res.status(413).send('Profile image must be 500 KB or smaller')
    }

    try {
        await db.execute('UPDATE users SET profile_image = ? WHERE id = ?', [imageData, req.session.userId])
        return res.status(200).json({ profile_image: imageData })
    } catch (error) {
        console.error('Profile image update failed', error)
        return res.sendStatus(500)
    }
}
