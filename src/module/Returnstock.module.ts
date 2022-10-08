import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReturnstockController } from 'src/controller/Returnstock.controller';
import { Person001mb } from 'src/entity/Person001mb';
import { Rawmaterialinspection001wb } from 'src/entity/Rawmaterialinspection001wb';
import { Returnstock001wb } from 'src/entity/Returnstock001wb';
import { User001mb } from 'src/entity/User001mb';
import { ReturnstockService } from 'src/service/Returnstock.service';

@Module({
  imports: [TypeOrmModule.forFeature([Returnstock001wb,Rawmaterialinspection001wb,User001mb,Person001mb])],
  providers: [ReturnstockService],
  controllers: [ReturnstockController],
})
export class ReturnstockModule {}
