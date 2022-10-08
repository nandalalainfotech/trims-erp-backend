import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChecklistController } from "src/controller/checklist.controller";
import { FixtureChecklistController } from "src/controller/fixturechecklist.controller";
import { Checklist001mb } from "src/entity/Checklist001mb";
import { Fixturechecklist001mb } from "src/entity/Fixturechecklist001mb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { ChecklistSettingService } from "src/service/checklist.service";
import { FixtureChecklistSettingService } from "src/service/fixturechecklist.service";


@Module({
    imports: [TypeOrmModule.forFeature([Fixturechecklist001mb,User001mb,Person001mb])],
    providers: [FixtureChecklistSettingService],
    controllers: [FixtureChecklistController],
})
export class FixtureChecklistModule { }