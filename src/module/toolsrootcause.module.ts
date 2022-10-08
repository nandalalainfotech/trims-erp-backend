import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ToolController } from "src/controller/tool.controlller";
import { ToolsMasterController } from "src/controller/toolsmaster.controller";
import { ToolsRootcauseController } from "src/controller/toolsrootcause.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Tool001mb } from "src/entity/Tool001mb";
import { Toolsmaster001mb } from "src/entity/Toolsmaster001mb";
import { Toolsrootcause001mb } from "src/entity/Toolsrootcause001mb";
import { User001mb } from "src/entity/User001mb";
import { ToolService } from "src/service/tool.service";
import { ToolsMasterService } from "src/service/toolsmaster.service";
import { ToolsRootcauseService } from "src/service/toolsrootcause.service";

@Module({
    imports: [TypeOrmModule.forFeature([Toolsrootcause001mb,User001mb,Person001mb])],
    providers: [ToolsRootcauseService],
    controllers: [ToolsRootcauseController],
  })
  export class ToolsRootcauseModule { }