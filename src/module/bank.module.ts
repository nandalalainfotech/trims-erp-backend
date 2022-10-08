import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BankNameController } from "src/controller/bank.controller";
import { Bank001mb } from "src/entity/Bank001mb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { BankNameService } from "src/service/bank.service";






@Module({
    imports: [TypeOrmModule.forFeature([Bank001mb,User001mb,Person001mb])],
    providers: [BankNameService],
    controllers: [BankNameController],
  })
  export class BankNameModule { }