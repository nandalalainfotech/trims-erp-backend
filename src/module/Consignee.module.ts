import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConsigneeController } from "src/controller/Consignee.controller";
import { Consignee001mb } from "src/entity/Consignee001mb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { ConsigneeService } from "src/service/Consignee.service";



@Module({
    imports: [TypeOrmModule.forFeature([Consignee001mb,User001mb,Person001mb])],
    providers: [ConsigneeService],
    controllers: [ConsigneeController],
})

export class ConsigneeModule { }