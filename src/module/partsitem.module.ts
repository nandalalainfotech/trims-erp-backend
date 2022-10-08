import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartItemController } from "src/controller/partitem.controller";
import { Partitem001wb } from "src/entity/Partitem001wb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { PartItemService } from "src/service/partitem.service";

@Module({
    imports: [TypeOrmModule.forFeature([Partitem001wb,User001mb,Person001mb])],
    providers: [PartItemService],
    controllers: [PartItemController],
})
export class PartSitemMbModule { }