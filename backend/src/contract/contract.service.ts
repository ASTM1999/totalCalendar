import { Injectable, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import Contract from './contract.entity';
import { CreateContractDto } from './create-contract.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class ContractService {
    constructor(
        @InjectRepository(Contract)
        private ContractRepository: Repository<Contract>,
    ) { }


    async deleteContact(objectId: string) {
        try {
            const userOwner = new ObjectId(objectId)
            const id = await this.ContractRepository.findOne({ where: { userOwner: userOwner } })
            const result = await this.ContractRepository.delete(id._id)
            return result.affected > 0;
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async createContract(createContractdto: CreateContractDto) {
        const find = await this.ContractRepository.findOne({ where: { userOwner: createContractdto.userOwner } })
        console.log("find ? :", find)
        if (find && createContractdto.require_role) {
            console.log("require")
            throw new InternalServerErrorException("Error create Contract")
        }
        return this.ContractRepository.save(createContractdto)
    }
    async getAll() {
        try {
            const Contract = await this.ContractRepository.find()
            // console.log(Contract)
            return Contract
        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException("Error get Contract")
        }
    }
}
