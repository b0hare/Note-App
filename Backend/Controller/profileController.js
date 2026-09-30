import db from "../config/db.js";

export function profileController(req, res) {
    res.send(`Welcome ${req.session.userName}`);
}

export async function editName(req, res) {
    const { name, userId } = req.body;
    try {
        await db.execute("UPDATE users SET name = ? WHERE id = ?", [name, userId])

        res.sendStatus(200)
    } catch {
        res.status(500).send("Request Failed")
    }

}

export async function editEmail(req, res) {
    const { email, userId } = req.body;
    try {
        await db.execute("UPDATE users SET email = ? WHERE id = ?", [email, userId])

        res.sendStatus(200)
    } catch {
        res.status(500).send("Request Failed")
    }

}