import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChecklistController } from "src/controller/checklist.controller";
import { FixtureChecklistController } from "src/controller/fixturechecklist.controller";
import { FixtureRootcauseController } from "src/controller/fixturerootcause.controller";
import { FixtureSparesController } from "src/controller/fixturespare.controller";
import { Checklist001mb } from "src/entity/Checklist001mb";
import { Fixturechecklist001mb } from "src/entity/Fixturechecklist001mb";
import { Fixturerootcause001mb } from "src/entity/Fixturerootcause001mb";
import { Fixturespares001mb } from "src/entity/Fixturespares001mb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { ChecklistSettingService } from "src/service/checklist.service";
import { FixtureChecklistSettingService } from "src/service/fixturechecklist.service";
import { FixtureRootcauseService } from "src/service/fixturerootcause.service";
import { FixtureSpareService } from "src/service/fixturespare.service";


@Module({
    imports: [TypeOrmModule.forFeature([Fixturerootcause001mb,User001mb,Person001mb])],
    providers: [FixtureRootcauseService],
    controllers: [FixtureRootcauseController],
})
export class FixtureRootcauseModule { }