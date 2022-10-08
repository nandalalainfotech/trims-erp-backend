import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MachineWBController } from "src/controller/machine-wb.controller";
import { Machine001wb } from "src/entity/Machine001wb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";

import { MachineWBService } from "src/service/machine-wb.service";

@Module({
    imports: [TypeOrmModule.forFeature([Machine001wb,User001mb,Person001mb])],
    providers: [MachineWBService],
    controllers: [MachineWBController],
  })
  export class MachineWBModule { }