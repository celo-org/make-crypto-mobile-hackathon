import pkg from '@celo/keystores';
const { FileKeystore } = pkg;
import {} from 'dotenv/config'

const parentDirectory = './'
const keystore = new FileKeystore(parentDirectory)

console.log(await keystore.getPrivateKey(process.env.ADDRESS, process.env.PASSWORD))
