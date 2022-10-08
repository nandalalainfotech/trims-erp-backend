import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderItemController } from "src/controller/orderitem-wb.controller";
import { Orderitem001wb } from "src/entity/Orderitem001wb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { OrderItemService } from "src/service/orderitem-wb.service";



@Module({
    imports: [TypeOrmModule.forFeature([Orderitem001wb,User001mb,Person001mb])],
    providers: [OrderItemService],
    controllers: [OrderItemController]
})
export class OrderItemModule { }