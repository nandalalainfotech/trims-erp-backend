import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SalesOrderController } from "src/controller/salesOrder.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Salesorder001wb } from "src/entity/Salesorder001wb";
import { User001mb } from "src/entity/User001mb";
import { SalesOrderService } from "src/service/salesOrder.service";



@Module({
    imports: [TypeOrmModule.forFeature([Salesorder001wb,User001mb,Person001mb])],
    providers: [SalesOrderService],
    controllers: [SalesOrderController],
})

export class SalesOrderModule { }