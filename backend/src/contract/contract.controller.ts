import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ObjectId } from 'mongodb';
import { CreateContractDto } from './create-contract.dto';

@Controller('contract')
export class ContractController {
    constructor(
        private ContractService: ContractService,

    ) { }
    @Post()
    async createContract(@Body() createContractdto: CreateContractDto) {
        // console.log(createContractdto)
        // console.log(createContractdto.title && createContractdto.recommend)
        if (createContractdto.title && createContractdto.recommend) {
            if (createContractdto.userOwner) {
                createContractdto.userOwner = new ObjectId(createContractdto.userOwner)
                return this.ContractService.createContract(createContractdto)
            }
        } else if (createContractdto.require_role) {
            if (createContractdto.userOwner) {
                createContractdto.userOwner = new ObjectId(createContractdto.userOwner)
                return this.ContractService.createContract(createContractdto)
            }
        } else {
            return "failed"
        }
    }

    @Get()
    async get() {
        // console.log("contact work backend")
        return await this.ContractService.getAll()
    }
}
