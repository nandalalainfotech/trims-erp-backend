import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ToolController } from "src/controller/tool.controlller";
import { ToolsBreakdownController } from "src/controller/toolsbreakdown.controller";
import { ToolsMasterController } from "src/controller/toolsmaster.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Tool001mb } from "src/entity/Tool001mb";
import { Toolsbreakdown001mb } from "src/entity/Toolsbreakdown001mb";
import { Toolsmaster001mb } from "src/entity/Toolsmaster001mb";
import { User001mb } from "src/entity/User001mb";
import { ToolService } from "src/service/tool.service";
import { ToolsBreakdownService } from "src/service/toolsbreakdown.service";
import { ToolsMasterService } from "src/service/toolsmaster.service";

@Module({
    imports: [TypeOrmModule.forFeature([Toolsbreakdown001mb,User001mb,Person001mb])],
    providers: [ToolsBreakdownService],
    controllers: [ToolsBreakdownController],
  })
  export class ToolsBreakdownModule { }