import { Module } from '@nestjs/common';
import { CampService } from './camp.service';
import { CampController } from './camp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Camp from './camp.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Camp])
  ],
  providers: [CampService],
  controllers: [CampController]
})
export class CampModule {}
