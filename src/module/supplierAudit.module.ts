import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupplierAuditController } from "src/controller/supplierAudit.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Supplieraudit001wb } from "src/entity/Supplieraudit001wb";
import { User001mb } from "src/entity/User001mb";
import { SupplierAuditService } from "src/service/supplierAudit.service";


@Module({
    imports: [TypeOrmModule.forFeature([Supplieraudit001wb,User001mb,Person001mb])],
    providers: [SupplierAuditService],
    controllers: [SupplierAuditController],
})
export class SupplierAuditModule { }