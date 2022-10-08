import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerConsigneeController } from "src/controller/customer-consignee.controller";
import { Customerconsignee001mb } from "src/entity/Customerconsignee001mb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { CustomerConsigneeService } from "src/service/customer-consignee.service";

@Module({
    imports: [TypeOrmModule.forFeature([Customerconsignee001mb,User001mb,Person001mb])],
    providers: [CustomerConsigneeService],
    controllers: [CustomerConsigneeController],
})

export class CustomerConsigneeModule { }