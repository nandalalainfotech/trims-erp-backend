import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupplierAssessmentController } from "src/controller/supplierAssessment.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Supplierassessment001wb } from "src/entity/Supplierassessment001wb";
import { User001mb } from "src/entity/User001mb";
import { SupplierAssessmentService } from "src/service/supplierAssessment.service";

@Module({
    imports: [TypeOrmModule.forFeature([Supplierassessment001wb,User001mb,Person001mb])],
    providers: [SupplierAssessmentService],
    controllers: [SupplierAssessmentController],
})
export class SupplierAssessmentModule { }