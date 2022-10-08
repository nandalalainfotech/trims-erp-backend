import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReturnstockController } from 'src/controller/Returnstock.controller';
import { Childpart001mb } from 'src/entity/ChildPart001mb';
import { Consumble001mb } from 'src/entity/Consumble001mb';
import { Orderitem001mb } from 'src/entity/Orderitem001mb';
import { Part001mb } from 'src/entity/Part001mb';
import { Person001mb } from 'src/entity/Person001mb';
import { Rawmaterialinspection001wb } from 'src/entity/Rawmaterialinspection001wb';
import { Returnstock001wb } from 'src/entity/Returnstock001wb';
import { User001mb } from 'src/entity/User001mb';
import { ReturnstockService } from 'src/service/Returnstock.service';

@Module({
  imports: [TypeOrmModule.forFeature([Returnstock001wb,Orderitem001mb,Childpart001mb,Part001mb,Consumble001mb,Rawmaterialinspection001wb,User001mb,Person001mb])],
  providers: [ReturnstockService],
  controllers: [ReturnstockController],
})
export class ReturnstockModule {}
