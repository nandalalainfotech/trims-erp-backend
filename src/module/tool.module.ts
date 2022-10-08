import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ToolController } from "src/controller/tool.controlller";
import { Person001mb } from "src/entity/Person001mb";
import { Tool001mb } from "src/entity/Tool001mb";
import { User001mb } from "src/entity/User001mb";
import { ToolService } from "src/service/tool.service";

@Module({
    imports: [TypeOrmModule.forFeature([Tool001mb,User001mb,Person001mb])],
    providers: [ToolService],
    controllers: [ToolController],
  })
  export class ToolModule { }