import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { escaper } from '../utils/html-escaper';
import { OrbitEntityDto, UpdateAccountDto } from '../account/dto';
import path from 'path'
require('dotenv').config({ path: path.join(__dirname, "..", "..", ".env") });
const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

@Injectable()
export class OrbitService {
    public db: any;
    public orbitDb: any;
    constructor() { }

    async config() {
        if (this.db != undefined) return this.db
        const ipfsOptions = {
            // start: true,
            preload: { enabled: false },
            repo:path.join(__dirname, "..", "..", "var") ,
            EXPERIMENTAL: {
                pubsub: true
            }
        }
        // identity = process.env.IDENTITY;
        // if (!identity) {
        //     const options = { id: 'local-id' }
        //     identity = await Identities.createIdentity(options)
        //     const envIdentity = JSON.stringify(identity)
        //     fs.appendFileSync('.env', `\nIDENTITY=${envIdentity}`);
        // } else {
        //     identity = JSON.parse(identity)
        // }

        const ipfs = await IPFS.create(ipfsOptions)

        this.orbitDb = await OrbitDB.createInstance(ipfs,{ directory: path.join(__dirname, "..", "..", "orbitdb1")} )
        const optionsToWrite = {
            // create: true,
            // overwrite: true,
            // localOnly: false,
            accessController: {
                type: 'orbitdb',
                write: ["*"],
            }
        }

        this.db = await this.orbitDb.keyvalue('application.settings', optionsToWrite)
    }


    async addData(dto: OrbitEntityDto, id: string) {
        Object.keys(dto).forEach(key => dto[key] === undefined && delete dto[key])
        try {
            await this.db.load()
            await this.db.put(id, { ...dto },{pin:true})
            await this.orbitDb.stop()
            return { ...dto }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getData(id: string) {
        try {
            await this.db.load()
            const value = this.db.get(id)
            await this.orbitDb.stop()
            return { value }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async setIv(iv: string, id: string) {
        try {
            await this.db.load()
            const value = this.db.get(id)
            value.iv = iv
            await this.db.set(id, { ...value })

            await this.orbitDb.stop()
            return { iv }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async setDatas(id: string, dto: UpdateAccountDto) {
        Object.keys(dto).forEach(key => dto[key] === undefined && delete dto[key])
        const updates = Object.keys(dto);
        const allowedUpdates = ["companyName", "surname", "userName"];
        const checkedUpdates = updates.filter(items => allowedUpdates.includes(items));
        try {
            if (updates.length == 0) throw new HttpException("Please fill any form", HttpStatus.NOT_FOUND)
            await this.db.load()
            const value = this.db.get(id)

            checkedUpdates.forEach(item => value[item] = escaper(dto[item]))

            await this.db.set(id, { ...value })
            delete value['iv']
            delete value['password']
            await this.orbitDb.stop()

            return { ...value }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
