import bcrypt from 'bcrypt';

const encryptedPass = (pass) => {
    const hash = bcrypt.hash(pass, 12);
    return hash;
}

export default encryptedPass;
