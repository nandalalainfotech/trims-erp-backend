import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MaterialRequistionController } from "src/controller/material-req-slip.controller";
import { Materialreqslip001wb } from "src/entity/Materialreqslip001wb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { MaterialRequisitionSlipService } from "src/service/material-req-slip.service";


@Module({
    imports: [TypeOrmModule.forFeature([Materialreqslip001wb,User001mb,Person001mb])],
    providers: [MaterialRequisitionSlipService],
    controllers: [MaterialRequistionController],
})

export class MaterialRequisitionModule { }