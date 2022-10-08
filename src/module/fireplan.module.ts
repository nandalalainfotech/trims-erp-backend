import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FirePlanControllers } from "src/controller/fireplan.controller";
import { FirstaidMaterialsControllers } from "src/controller/firstaidmaterials.controller";
import { Fireplan001wb } from "src/entity/Fireplan001wb";
import { Firstaidwb001 } from "src/entity/Firstaidwb001";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { FirePlanService } from "src/service/fireplan.service";
import { FirstaidMaterialsService } from "src/service/firstaidmaterials.service";


@Module({
    imports: [TypeOrmModule.forFeature([Fireplan001wb,User001mb,Person001mb])],

    providers: [FirePlanService],
    controllers: [FirePlanControllers],
})
export class FirePlanModule { }