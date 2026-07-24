import db from "../config/db.js"
import bcrypt from 'bcrypt';

async function loginControll(req, res) {
    const { email, pass } = req.body;
    const [rows] = await db.query(`SELECT name, password FROM users WHERE email = ?`, [email]);

    if (rows.length > 0) {
        const [user] = rows;
        console.log(user);
        
        const isValid = await bcrypt.compare(pass, user.password);
        console.log(isValid);
        
        if (isValid) {
            return res.status(200).send(user.name)
        }
        return res.status(400).send("Invalid Credentials")
    }
    return res.status(404).send("User not found")

}

export default loginControll