import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LegalDocumentsControllers } from "src/controller/legaldocuments.controller";
import { SafetyEquipmentsControllers } from "src/controller/safetyequipmentscontroller";
import { Legal001mb } from "src/entity/Legal001mb";
import { Person001mb } from "src/entity/Person001mb";
import { Safetyequwb001 } from "src/entity/Safetyequwb001";
import { User001mb } from "src/entity/User001mb";
import { LegalDocumentsService } from "src/service/legaldocuments.service";
import { SafetyEquipmentsService } from "src/service/safetyequipments.service";


@Module({
    imports: [TypeOrmModule.forFeature([Legal001mb,User001mb,Person001mb])],

    providers: [LegalDocumentsService],
    controllers: [LegalDocumentsControllers],
})
export class LegalDocumentsModule { }