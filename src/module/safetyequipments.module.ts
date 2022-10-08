import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SafetyEquipmentsControllers } from "src/controller/safetyequipmentscontroller";
import { Person001mb } from "src/entity/Person001mb";
import { Safetyequwb001 } from "src/entity/Safetyequwb001";
import { User001mb } from "src/entity/User001mb";
import { SafetyEquipmentsService } from "src/service/safetyequipments.service";


@Module({
    imports: [TypeOrmModule.forFeature([Safetyequwb001,User001mb,Person001mb])],

    providers: [SafetyEquipmentsService],
    controllers: [SafetyEquipmentsControllers],
})
export class SafetyEquipmentsModule { }