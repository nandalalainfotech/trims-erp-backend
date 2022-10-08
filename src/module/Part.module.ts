import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartController } from "src/controller/Part.controller";
import { Part001mb } from "src/entity/Part001mb";
import { Partspecific001wb } from "src/entity/Partspecific001wb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { PartService } from "src/service/Part.service";


@Module({
    imports: [TypeOrmModule.forFeature([Part001mb,Partspecific001wb,User001mb,Person001mb])],
    providers: [PartService],
    controllers: [PartController],
})

export class PartModule { }