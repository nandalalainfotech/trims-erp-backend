import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SalesItemMbController } from "src/controller/salesitem.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Salesitem001mb } from "src/entity/Salesitem001mb";
import { User001mb } from "src/entity/User001mb";
import { SalesItemMbService } from "src/service/salesitem.service";




@Module({
    imports: [TypeOrmModule.forFeature([Salesitem001mb,User001mb,Person001mb])],
    providers: [SalesItemMbService],
    controllers: [SalesItemMbController],
})

export class SalesItemModule { }