import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import Contract from './contract.entity';
import { CreateContractDto } from './create-contract.dto';

@Injectable()
export class ContractService {
    constructor(
        @InjectRepository(Contract)
        private ContractRepository: Repository<Contract>,
    ) { }

    async createContract(createContractdto: CreateContractDto) {
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
