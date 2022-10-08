import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StatutoryPlanController } from "src/controller/statutoryPlan.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Statutory001wb } from "src/entity/Statutory001wb";
import { User001mb } from "src/entity/User001mb";
import { StatutoryPlanService } from "src/service/statutoryPlan.service";


@Module({
    imports: [TypeOrmModule.forFeature([Statutory001wb,User001mb,Person001mb])],
    providers: [StatutoryPlanService],
    controllers: [StatutoryPlanController],
  })
  export class StatutoryPlanModule { }