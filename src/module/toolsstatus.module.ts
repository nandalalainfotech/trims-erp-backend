import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ToolController } from "src/controller/tool.controlller";
import { ToolsMasterController } from "src/controller/toolsmaster.controller";
import { ToolsStatusController } from "src/controller/toolsstatus.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Tool001mb } from "src/entity/Tool001mb";
import { Toolsmaster001mb } from "src/entity/Toolsmaster001mb";
import { Toolsstatus001mb } from "src/entity/Toolsstatus001mb";
import { User001mb } from "src/entity/User001mb";
import { ToolService } from "src/service/tool.service";
import { ToolsMasterService } from "src/service/toolsmaster.service";
import { ToolsStatusService } from "src/service/toolsstatus.service";

@Module({
    imports: [TypeOrmModule.forFeature([Toolsstatus001mb,User001mb,Person001mb])],
    providers: [ToolsStatusService],
    controllers: [ToolsStatusController],
  })
  export class ToolsStatusModule { }