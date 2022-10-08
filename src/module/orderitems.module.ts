import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderItemMbController } from "src/controller/orderitems.controller";
import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { Orderitemspecification001wb } from "src/entity/Orderitemspecification001wb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { OrderItemMbService } from "src/service/orderitems.service";


@Module({
    imports: [TypeOrmModule.forFeature([Orderitem001mb,Orderitemspecification001wb,User001mb,Person001mb])],
    providers: [OrderItemMbService],
    controllers: [OrderItemMbController],
})
export class OrederItemMbModule { }