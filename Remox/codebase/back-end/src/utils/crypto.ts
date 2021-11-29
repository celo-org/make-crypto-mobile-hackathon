import crypto from "crypto"
import path from "path";
require('dotenv').config({ path: path.join(__dirname, "..", "..", ".env") });

function encrypt(messagetext: string) {
    const algorithm = 'aes-256-cbc';
    const secretKey = process.env.SECRET_KEY;
    const iv = crypto.randomBytes(16);
    var ivstring = iv.toString('hex').slice(0, 16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, ivstring);

    const encrypted = Buffer.concat([cipher.update(messagetext), cipher.final()]);

    return {
        iv: ivstring,
        content: encrypted.toString('hex')
    };
}

function existEncrypt(messagetext: string,iv:string) {
    const algorithm = 'aes-256-cbc';
    const secretKey = process.env.SECRET_KEY;
    var ivstring = iv.slice(0, 16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, ivstring);

    const encrypted = Buffer.concat([cipher.update(messagetext), cipher.final()]);

    return {
        iv:ivstring,
        content: encrypted.toString('hex')
    };
}

function decrypt(encrypted: { iv: string, content: string }) {
    const algorithm = 'aes-256-cbc';
    const secretKey = process.env.SECRET_KEY;
    const decipher = crypto.createDecipheriv(algorithm, secretKey, encrypted.iv);

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(encrypted.content, 'hex')), decipher.final()]);

    return decrpyted.toString();
}

export { encrypt, decrypt ,existEncrypt}