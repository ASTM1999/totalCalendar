import { Module } from '@nestjs/common';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import contract from './contract.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([contract]),
  ],
  controllers: [ContractController],
  providers: [ContractService]
})
export class ContractModule { }
