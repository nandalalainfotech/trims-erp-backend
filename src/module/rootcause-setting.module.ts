import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RootcauseController } from "src/controller/rootcause-setting.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Rootcause001mb } from "src/entity/Rootcause001mb";
import { User001mb } from "src/entity/User001mb";
import { RootcauseService } from "src/service/rootcause-setting.service";



@Module({
    imports: [TypeOrmModule.forFeature([Rootcause001mb,User001mb,Person001mb])],
    providers: [RootcauseService],
    controllers: [RootcauseController],
})
export class RootcauseModule { }