import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PurchaseableController } from "src/controller/purcheseable.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Purchaseable001mb } from "src/entity/Purchaseable001mb";
import { User001mb } from "src/entity/User001mb";
import { PurchaseableService } from "src/service/purchaseable.service";

@Module({
    imports: [TypeOrmModule.forFeature([Purchaseable001mb,User001mb,Person001mb])],
    providers: [PurchaseableService],
    controllers: [PurchaseableController],
})
export class PurchaseableModule { }