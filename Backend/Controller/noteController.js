import db from "../config/db.js";
import { validNoteValue } from '../utils/validation.js';

export async function createNote(req, res) {
    const { title, details } = req.body;

    if (!validNoteValue(title, 150) || !validNoteValue(details, 10000) || (!title.trim() && !details.trim())) {
        return res.status(400).send('A note needs content and must be within the size limit')
    }

    try {
        const [result] = await db.execute("INSERT INTO notes (title, content, userId) VALUES (?, ?, ?)", [title, details, req.session.userId]);

        const [note] = await db.execute("SELECT * FROM notes WHERE id = ?", [result.insertId]);

        return res.status(201).send(note[0])

    } catch (error) {
        console.error('Create note failed', error)
        return res.sendStatus(500)
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
        return res.sendStatus(404)
    } catch (err) {
        return res.status(404).send("Can't get Note")
    }
}


export async function getAllNotes(req, res) {
    try {
        const [result] = await db.execute("SELECT * FROM notes WHERE userId = ? ORDER BY id DESC", [req.session.userId]);
        return res.status(200).send(result)
    } catch (err) {
        res.sendStatus(404)
    }
}


export async function editNote(req, res) {
    const {id} = req.params;
    const {title, details} = req.body;
    const {userId} = req.session;
    if (!validNoteValue(title, 150) || !validNoteValue(details, 10000) || (!title.trim() && !details.trim())) {
        return res.status(400).send('A note needs content and must be within the size limit')
    }
    try {
        const [result] = await db.execute("UPDATE notes SET title = ?, content = ? WHERE id = ? AND userId = ?", [title, details, id, userId]);
        if (!result.affectedRows) return res.sendStatus(404)
        const [notes] = await db.execute('SELECT * FROM notes WHERE id = ? AND userId = ?', [id, userId])
        return res.status(200).json(notes[0])
    } catch(er) {
        console.log(er);
        
        return res.sendStatus(500);
    }
}

export async function deleteNote(req, res) {
    const noteId = req.params.id;
    try {
        const [result] = await db.execute("DELETE FROM notes WHERE id = ? AND userId = ?", [noteId, req.session.userId]);
        if (!result.affectedRows) return res.sendStatus(404)
        return res.status(200).send("Deleted")
    } catch (error) {
        return res.status(400).send("Can't delete Note");
    }
}
