import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FixtureStatusController } from "src/controller/fixturestatus.controller";
import { MachineController } from "src/controller/machine.controller";
import { Fixturestatus001mb } from "src/entity/Fixturestatus001mb";
import { Machine001mb } from "src/entity/Machine001mb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { FixtureStatusService } from "src/service/fixturestatus.service";



import { MachineSettingService } from "src/service/machine.service";

@Module({
    imports: [TypeOrmModule.forFeature([Fixturestatus001mb,User001mb,Person001mb])],
    providers: [FixtureStatusService],
    controllers: [FixtureStatusController],
  })
  export class FixtureStatusModule { }