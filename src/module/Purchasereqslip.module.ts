import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PurchasereqslipController } from "src/controller/Purchasereqslip.controller";
import { Childpart001mb } from "src/entity/ChildPart001mb";
import { Consumble001mb } from "src/entity/Consumble001mb";
import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { Part001mb } from "src/entity/Part001mb";
import { Person001mb } from "src/entity/Person001mb";
import { Purchasereqitem001wb } from "src/entity/Purchasereqitem001wb";
import { Purchasereqslip001wb } from "src/entity/Purchasereqslip001wb";
import { User001mb } from "src/entity/User001mb";
import { PurchasereqslipService } from "src/service/Purchasereqslip.service";


@Module({
    imports: [TypeOrmModule.forFeature([Purchasereqslip001wb , Purchasereqitem001wb,
         Orderitem001mb, Consumble001mb,Childpart001mb,Part001mb,User001mb,Person001mb])],
    providers: [PurchasereqslipService],
    controllers: [PurchasereqslipController],
})

export class PurchasereqslipModule { }