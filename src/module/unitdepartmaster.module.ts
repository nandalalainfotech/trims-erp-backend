import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UnitDepartMasterController } from "src/controller/unitdepartmaster.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Unitdeptmaster001mb } from "src/entity/Unitdeptmaster001mb";
import { User001mb } from "src/entity/User001mb";
import { UnitDepartMasterService } from "src/service/unitdepartmaster.service";

@Module({
    imports: [TypeOrmModule.forFeature([Unitdeptmaster001mb,User001mb,Person001mb])],
    providers: [UnitDepartMasterService],
    controllers: [UnitDepartMasterController],
})

export class UnitDepartMasterModule { }