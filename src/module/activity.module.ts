import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActitvityController } from "src/controller/activity.controller";
import { Activity001mb } from "src/entity/Activity001mb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { ActivityService } from "src/service/activity.service";


@Module({
    imports: [TypeOrmModule.forFeature([Activity001mb,User001mb,Person001mb])],
    providers: [ActivityService],
    controllers: [ActitvityController],
})
export class ActivityModule { }