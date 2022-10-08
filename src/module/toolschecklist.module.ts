import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ToolController } from "src/controller/tool.controlller";
import { ToolsChecklistController } from "src/controller/toolschecklist.controller";
import { ToolsMasterController } from "src/controller/toolsmaster.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Tool001mb } from "src/entity/Tool001mb";
import { Toolschecklist001mb } from "src/entity/Toolschecklist001mb";
import { Toolsmaster001mb } from "src/entity/Toolsmaster001mb";
import { User001mb } from "src/entity/User001mb";
import { ToolService } from "src/service/tool.service";
import { ToolsChecklistSettingService } from "src/service/toolschecklist.service";
import { ToolsMasterService } from "src/service/toolsmaster.service";

@Module({
    imports: [TypeOrmModule.forFeature([Toolschecklist001mb,User001mb,Person001mb])],
    providers: [ToolsChecklistSettingService],
    controllers: [ToolsChecklistController],
  })
  export class ToolsChecklistModule { }