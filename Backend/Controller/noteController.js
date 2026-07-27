import db from "../config/db.js";

export async function createNote(req, res) {
    const { title, details } = req.body;

    try {
        const [result] = await db.execute("INSERT INTO notes (title, content, userId) VALUES (?, ?, ?)", [title, details, req.session.userId]);
                
        const [note] = await db.execute("SELECT * FROM notes WHERE id = ?", [result.insertId]);

        return res.status(201).send(note[0])

    } catch (error) {
        return res.send(error)
    }
}


export async function getNote(req, res) {
    const noteId = req.params.id;
    const [result] = await db.execute("SELECT * FROM notes WHERE id = ?", [noteId]);

    if (result.length > 0) {
        const { title, content, updated_at } = result[0];
        return res.status(200).json({
            title: title,
            content: content
        })
    }
    return res.status(400).send("Can't get Note")
}


export async function getAllNotes(req, res) {
    const { userId } = req.params;
    const [result] = await db.execute("SELECT * FROM notes WHERE userId = ?", [userId]);

    return res.status(200).send(result)
}

export async function deleteNote(req, res) {
    const noteId = req.params.id;
    try {
        const [result] = await db.execute("DELETE FROM notes WHERE id = ?", [noteId]);
        if (result.affectedRows > 0) {
            return res.status(200).send("Deleted")
        }
        return res.status(400).send("Can't delete Note");
    } catch (error) {
        return res.send(error)
    }
}