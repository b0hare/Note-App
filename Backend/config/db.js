import mysql from 'mysql2/promise'

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: "REMOVED_PASSWORD",
    database: "notesapp"
})

export default db

