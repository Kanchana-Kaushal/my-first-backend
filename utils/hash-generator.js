import argon2 from "argon2";
import dotenv from "dotenv";
dotenv.config();

//pepper
const pepper = process.env.PEPPER;

async function convertToHash(password) {
    const hash = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        secret: Buffer.from(pepper),
    });

    return hash;
}

export default convertToHash;
