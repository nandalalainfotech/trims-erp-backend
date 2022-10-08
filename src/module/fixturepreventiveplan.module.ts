import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChecklistController } from "src/controller/checklist.controller";
import { FixtureChecklistController } from "src/controller/fixturechecklist.controller";
import { FixturePreventivePlanController } from "src/controller/fixturepreventiveplan.controller";
import { FixtureRootcauseController } from "src/controller/fixturerootcause.controller";
import { FixtureSparesController } from "src/controller/fixturespare.controller";
import { Checklist001mb } from "src/entity/Checklist001mb";
import { Fixturechecklist001mb } from "src/entity/Fixturechecklist001mb";
import { Fixturepreventiveplan001wb } from "src/entity/Fixturepreventiveplan001wb";
import { Fixturerootcause001mb } from "src/entity/Fixturerootcause001mb";
import { Fixturespares001mb } from "src/entity/Fixturespares001mb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { ChecklistSettingService } from "src/service/checklist.service";
import { FixtureChecklistSettingService } from "src/service/fixturechecklist.service";
import { FixturePreventivePlanService } from "src/service/fixturepreventiveplan.service";
import { FixtureRootcauseService } from "src/service/fixturerootcause.service";
import { FixtureSpareService } from "src/service/fixturespare.service";


@Module({
    imports: [TypeOrmModule.forFeature([Fixturepreventiveplan001wb,User001mb,Person001mb])],
    providers: [FixturePreventivePlanService],
    controllers: [FixturePreventivePlanController],
})
export class FixturePreventivePlanModule { }