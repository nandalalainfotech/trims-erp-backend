import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UnitMasterController } from "src/controller/unitmaster.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Unitmaster001mb } from "src/entity/Unitmaster001mb";
import { User001mb } from "src/entity/User001mb";
import { UnitMasterService } from "src/service/unitmaster.service";

@Module({
    imports: [TypeOrmModule.forFeature([Unitmaster001mb,User001mb,Person001mb])],
    providers: [UnitMasterService],
    controllers: [UnitMasterController],
})

export class UnitMasterModule { }