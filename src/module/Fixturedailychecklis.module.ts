import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FixturDailyCheckListController } from "src/controller/Fixturedailychecklist.controller";
import { Fixturedailychecklist001wb } from "src/entity/Fixturedailychecklist001wb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { FixturedailychecklistService } from "src/service/Fixturedailychecklist.service";



@Module({
    imports: [TypeOrmModule.forFeature([ Fixturedailychecklist001wb,User001mb,Person001mb])],
    providers: [ FixturedailychecklistService],
    controllers: [FixturDailyCheckListController],
})
export class FixturDailyCheckListModule { }