import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ObjectId } from 'mongodb';
import { CreateContractDto } from './create-contract.dto';

@Controller('contract')
export class ContractController {
    constructor(
        private ContractService: ContractService,

    ) { }
    @Delete()
    async deleteContact(@Query('userOwner') userOwner: string) {
        console.log(userOwner)
        return this.ContractService.deleteContact(userOwner)
    }

    @Post()
    async createContract(@Body() createContractdto: CreateContractDto) {
        console.log(createContractdto)
        // console.log(createContractdto.title && createContractdto.recommend)
        if (createContractdto.title && createContractdto.recommend) {
            if (createContractdto.userOwner) {
                createContractdto.userOwner = new ObjectId(createContractdto.userOwner)
                return this.ContractService.createContract(createContractdto)
            }
        } else if (createContractdto.require_role) {
            if (createContractdto.userOwner) {
                console.log("require_role : ", createContractdto.require_role)
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
