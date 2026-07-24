import db from "../config/db.js";
import encryptedPass from "../utils/encryptPassword.js";

const registerCont = async (req, res) => {
    const { name, email, pass, verifyStatus } = req.body
    const hash = await encryptedPass(pass);

    if (verifyStatus) {
        const createUser = await db.query(`INSERT INTO users (name, email, password) VALUES (?,?,?)`, [name, email, hash])
        if (createUser) {
            return res.status(200).send(name)
        }
    }
    return res.sendStatus(400)
    
}

export default registerCont