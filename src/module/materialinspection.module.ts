import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MaterialinspectionController } from "src/controller/Materialinspection.controller";
import { Childpart001mb } from "src/entity/ChildPart001mb";
import { Consumble001mb } from "src/entity/Consumble001mb";
import { Materialinspection001wb } from "src/entity/MaterialInspection001wb";
import { Materialinward001wb } from "src/entity/Materialinward001wb";
import { Observationsitems001wb } from "src/entity/Observationsitems001wb";
import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { Part001mb } from "src/entity/Part001mb";
import { Person001mb } from "src/entity/Person001mb";
import { Rawmaterialinspection001wb } from "src/entity/Rawmaterialinspection001wb";
import { User001mb } from "src/entity/User001mb";
import { MaterialinspectionService } from "src/service/Materialinspection.service";




@Module({
    imports: [TypeOrmModule.forFeature([Materialinspection001wb,Observationsitems001wb,Materialinward001wb,
        Rawmaterialinspection001wb,User001mb,Person001mb,Orderitem001mb,Consumble001mb,Childpart001mb,Part001mb])],
    providers: [MaterialinspectionService],
    controllers: [MaterialinspectionController],
})

export class MaterialinspectionModule { }