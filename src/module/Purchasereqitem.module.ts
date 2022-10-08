import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PurchasereqitemController } from "src/controller/purchasereqitem.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Purchasereqitem001wb } from "src/entity/Purchasereqitem001wb";
import { User001mb } from "src/entity/User001mb";
import { PurchasereqslipitemService } from "src/service/purchasereqslipitem.service";




@Module({
    imports: [TypeOrmModule.forFeature([Purchasereqitem001wb,User001mb,Person001mb])],
    providers: [PurchasereqslipitemService],
    controllers: [PurchasereqitemController]
})
export class PurchasereqitemModule { }