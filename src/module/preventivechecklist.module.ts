import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PreventiveCheckListController } from "src/controller/preventivechecklist.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Preventivechecklist001wb } from "src/entity/Preventivechecklist001wb";
import { User001mb } from "src/entity/User001mb";

import { PreventiveCheckListService } from "src/service/preventivechecklist.service";

@Module({
    imports: [TypeOrmModule.forFeature([Preventivechecklist001wb,User001mb,Person001mb])],
    providers: [PreventiveCheckListService],
    controllers: [PreventiveCheckListController],
  })
  export class PreventiveCheckListModule { }