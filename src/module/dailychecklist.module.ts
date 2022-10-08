import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DailyCheckListController } from "src/controller/dailychecklist.controller";
import { Dailychecklist001wb } from "src/entity/Dailychecklist001wb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { DailyCheckListService } from "src/service/dailychecklist.service";


@Module({
    imports: [TypeOrmModule.forFeature([Dailychecklist001wb,User001mb,Person001mb])],
    providers: [DailyCheckListService],
    controllers: [DailyCheckListController],
})
export class DailyCheckListModule { }