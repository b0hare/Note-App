import db from "../config/db.js";

export async function createNote(req, res) {
    const { title, details } = req.body;

    try {
        const [result] = await db.execute("INSERT INTO notes (title, content, userId) VALUES (?, ?, ?)", [title, details, req.session.userId]);

        const [note] = await db.execute("SELECT * FROM notes WHERE id = ?", [result.insertId]);

        return res.status(201).send(note[0])

    } catch (error) {
        return res.status(400).send(error)
    }

}


export async function getNote(req, res) {
    const noteId = req.params.id;
    try {
        const [result] = await db.execute("SELECT * FROM notes WHERE id = ? AND userId = ?", [noteId, req.session.userId]);

        if (result.length > 0) {
            const { title, content } = result[0];
            return res.status(200).json({
                title: title,
                content: content
            })
        }
    } catch (err) {
        return res.status(404).send("Can't get Note")
    }
}


export async function getAllNotes(req, res) {
    const { userId } = req.params;
    try {
        const [result] = await db.execute("SELECT * FROM notes WHERE userId = ? AND userId = ? ORDER BY id DESC", [userId, req.session.userId]);
        return res.status(200).send(result)
    } catch (err) {
        res.sendStatus(404)
    }
}

export async function deleteNote(req, res) {
    const noteId = req.params.id;
    try {
        const [result] = await db.execute("DELETE FROM notes WHERE id = ? AND userId = ?", [noteId, req.session.userId]);
        return res.status(200).send("Deleted")
    } catch (error) {
        return res.status(400).send("Can't delete Note");
    }
}