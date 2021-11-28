const ContractKit = require('@celo/contractkit')
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto, IsAccountExistDto, OrbitEntityDto, ReLoginDto, SigninDto, UpdateAccountDto } from './dto';
import { Account } from './account.entity';
import { JwtService } from '@nestjs/jwt';
import { utils, Wallet } from 'ethers';
import { encrypt,existEncrypt } from '../utils/crypto'
import bcrypt from 'bcrypt'
import { OrbitService } from 'src/orbit/orbit.service';

@Injectable()
export class AccountService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(Account) private readonly accountRepo: Repository<Account>,
        private orbitService: OrbitService) { }

    async createAccount(dto: CreateAccountDto) {
        try {

            //blockchain side
            const entropy = utils.randomBytes(32)
            const mnemonic = utils.entropyToMnemonic(entropy)
            const derivationPath = "m/44'/52752'/0'/0" + '/0';
            const walletMnemonic = Wallet.fromMnemonic(mnemonic, derivationPath);
            const { iv, content } = encrypt(mnemonic)
            //db side
            const newAccount = this.accountRepo.create({ accountAddress: walletMnemonic.address })
            const hashedPassword = await bcrypt.hash(dto.password, 10);
            const result = await this.accountRepo.save(newAccount)
            //ipfs orbitdb side
            const orbitDto = new OrbitEntityDto()
            orbitDto.companyName = dto.companyName ? dto.companyName : "";
            orbitDto.surname = dto.surname ? dto.surname : "";
            orbitDto.userName = dto.userName ? dto.userName : "";
            orbitDto.address = walletMnemonic.address;
            orbitDto.password = hashedPassword;
            orbitDto.iv = iv
            await this.orbitService.config()
            await this.orbitService.addData(orbitDto, newAccount.id)

            return {
                token: this.generateJwt(result.id, result.accountAddress),
                accountAddress: walletMnemonic.address,
                mnemonic, encryptedPhrase: content
            }
        } catch (e) {
            console.log(e)
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async signin(dto: SigninDto) {
        try {
            const derivationPath = "m/44'/52752'/0'/0" + '/0';
            const walletMnemonic = Wallet.fromMnemonic(dto.phrase, derivationPath);
            const account = await this.accountRepo.findOne({ accountAddress: walletMnemonic.address })
            if (!account) {
                throw new HttpException("There is no account belong this phrase", HttpStatus.NOT_FOUND)
            }

            await this.orbitService.config()
            const { value: { password,iv } } = await this.orbitService.getData(account.id)

            const isEqual = await bcrypt.compare(dto.password, password)
            if (!isEqual) throw new HttpException("Your password is uncorrect for this account", HttpStatus.NOT_FOUND)

            const token = this.generateJwt(account.id, account.accountAddress);
            const {  content,iv:newiv } = existEncrypt(dto.phrase,iv);
            await this.orbitService.config()//
            await this.orbitService.setIv(newiv, account.id)//will be deleted

            return { token, accountAddress: account.accountAddress, encryptedPhrase: content }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    async createPassword(dto: SigninDto) {
        try {
            const derivationPath = "m/44'/52752'/0'/0" + '/0';
            const walletMnemonic = Wallet.fromMnemonic(dto.phrase, derivationPath);
            const { iv, content } = encrypt(dto.phrase)

            const isExistAddress = await this.accountRepo.findOne({accountAddress: walletMnemonic.address})
            if(isExistAddress) throw new HttpException("There is already this account in app", HttpStatus.NOT_FOUND)

            const newAccount = this.accountRepo.create({ accountAddress: walletMnemonic.address })
            const result = await this.accountRepo.save(newAccount)
            const hashedPassword = await bcrypt.hash(dto.password, 10);
            const orbitDto = new OrbitEntityDto()
            orbitDto.address = walletMnemonic.address;
            orbitDto.iv = iv
            orbitDto.password = hashedPassword;
            await this.orbitService.config()
            await this.orbitService.addData(orbitDto, newAccount.id)

            return {
                token: this.generateJwt(result.id, result.accountAddress),
                accountAddress: walletMnemonic.address,
                encryptedPhrase: content
            }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async reLogin(dto: ReLoginDto) {
        try {
            const account = await this.accountRepo.findOne({ accountAddress: dto.address })
            if (!account) {
                throw new HttpException("There is no account belong this address", HttpStatus.NOT_FOUND)
            }

            await this.orbitService.config()
            const { value: { password } } = await this.orbitService.getData(account.id)

            const isEqual = await bcrypt.compare(dto.password, password)
            if (!isEqual) throw new HttpException("Your password is uncorrect for this account", HttpStatus.NOT_FOUND)

            const token = this.generateJwt(account.id, account.accountAddress);
            return { token }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async isAccountExist(dto: IsAccountExistDto) {
        try {
            const derivationPath = "m/44'/52752'/0'/0" + '/0';
            const walletMnemonic = Wallet.fromMnemonic(dto.phrase, derivationPath);
            const account = await this.accountRepo.findOne({ accountAddress: walletMnemonic.address })
            let result = account ? true : false
            return { result }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateAccount(dto: UpdateAccountDto, accountId: string) {
        try {

            await this.orbitService.config()
            return await this.orbitService.setDatas(accountId, dto)
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    generateJwt(userId: string, accountAddress: string) {
        return this.jwtService.sign({
            userId,
            accountAddress
        })
    }
}
