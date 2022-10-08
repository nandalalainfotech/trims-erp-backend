import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ToolController } from "src/controller/tool.controlller";
import { ToolsMasterController } from "src/controller/toolsmaster.controller";
import { ToolsPreventiveactionController } from "src/controller/toolspreventiveaction.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Tool001mb } from "src/entity/Tool001mb";
import { Toolsmaster001mb } from "src/entity/Toolsmaster001mb";
import { Toolspreventiveaction001mb } from "src/entity/Toolspreventiveaction001mb";
import { User001mb } from "src/entity/User001mb";
import { ToolService } from "src/service/tool.service";
import { ToolsMasterService } from "src/service/toolsmaster.service";
import { ToolsPreventiveactionService } from "src/service/toolspreventiveaction.service";

@Module({
    imports: [TypeOrmModule.forFeature([Toolspreventiveaction001mb,User001mb,Person001mb])],
    providers: [ToolsPreventiveactionService],
    controllers: [ToolsPreventiveactionController],
  })
  export class ToolsPreventiveactionModule { }