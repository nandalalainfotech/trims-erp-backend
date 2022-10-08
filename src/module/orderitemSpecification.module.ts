import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderitemSpecificationController } from "src/controller/orderitemspecification.controller";
import { Orderitemspecification001wb } from "src/entity/Orderitemspecification001wb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { OrderitemSpecificationService } from "src/service/orderitemspecification.service";



@Module({
    imports: [TypeOrmModule.forFeature([Orderitemspecification001wb,User001mb,Person001mb])],
    providers: [OrderitemSpecificationService],
    controllers: [OrderitemSpecificationController],
})
export class OrderitemSpecificationMbModule { }