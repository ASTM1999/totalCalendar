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
        if(createContractdto.userOwner){
            createContractdto.userOwner = new ObjectId(createContractdto.userOwner)
            return this.ContractService.createContract(createContractdto)
        }
        return "failed"
    }

    @Get()
    async get() {
        console.log("wdwd")
        return await this.ContractService.getAll()
    }
}
