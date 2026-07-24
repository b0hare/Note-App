import bcrypt from 'bcrypt';

const encryptedPass = (pass) => {
    const hash = bcrypt.hash(pass, 5);
    return hash;
}

export default encryptedPass;