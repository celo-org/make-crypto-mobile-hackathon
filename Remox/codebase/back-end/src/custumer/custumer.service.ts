import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/account/account.entity';
import { Repository } from 'typeorm';
import Web3 from 'web3';
import { Custumer } from './custumer.entity';
import { AddCustumerDto } from './dto';
import {Provider} from '../blockchain/provider'

@Injectable()
export class CustumerService {

    private web3:Web3;
    
    constructor(@InjectRepository(Custumer) private readonly custumerRepo: Repository<Custumer>,
        @InjectRepository(Account) private readonly accountRepo: Repository<Account>) {
            const provider = new Provider('https://forno.celo.org')
            this.web3 = provider.web3
         }


    async addCustumer(dto: AddCustumerDto, accountId: string) {
        try {
            const isAddressExist = this.web3.utils.isAddress(dto.address);
            if(!isAddressExist) throw new HttpException("There is not any wallet belong this address", HttpStatus.BAD_REQUEST);
            
            const isExist = await this.custumerRepo.findOne({ address: dto.address, accountId })
            if (isExist) throw new HttpException("You already have this custumer", HttpStatus.BAD_REQUEST);

            const newCustumer = this.custumerRepo.create({ ...dto, accountId })
            return await this.custumerRepo.save(newCustumer)
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getCustumers(accountId: string, take: number = 10, skip: number = 0) {
        try {
            const [data, total] = await this.custumerRepo.findAndCount({ where: { accountId }, select: ['id', 'address', 'name'], order: { name: "DESC" }, take, skip })
            return { data, total }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteCustumer(accountId: string, custumerId: string) {
        try {
            const custumer = await this.custumerRepo.findOne({ accountId, id: custumerId })
            if (!custumer) throw new HttpException("There is no custumer with this property", HttpStatus.BAD_REQUEST);
            await this.custumerRepo.remove(custumer)
            return { message: 'Deleted successfully' }
        } catch (error) {
            console.log(error)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
