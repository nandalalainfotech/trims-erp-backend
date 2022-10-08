import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RawmaterialinspectionController } from "src/controller/Rawmaterialinspection.controller";
import { Childpart001mb } from "src/entity/ChildPart001mb";
import { Consumble001mb } from "src/entity/Consumble001mb";
import { Materialinspection001wb } from "src/entity/MaterialInspection001wb";
import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { Part001mb } from "src/entity/Part001mb";
import { Person001mb } from "src/entity/Person001mb";
import { Rawmaterialinspection001wb } from "src/entity/Rawmaterialinspection001wb";
import { User001mb } from "src/entity/User001mb";
import { RawmaterialinspectionService } from "src/service/Rawmaterialinspection.service";



@Module({
    imports: [TypeOrmModule.forFeature([Rawmaterialinspection001wb,User001mb,Person001mb,
        Orderitem001mb, Consumble001mb,Childpart001mb,Part001mb,Materialinspection001wb])],
    providers: [RawmaterialinspectionService],
    controllers: [RawmaterialinspectionController],
})

export class RawmaterialinspectionModule { }