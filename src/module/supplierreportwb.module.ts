import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupplierreportController } from "src/controller/supplierreportwb.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Supplierreport001wb } from "src/entity/Supplierreport001wb";
import { User001mb } from "src/entity/User001mb";
import { SupplierreportService } from "src/service/supplierreportwb.service";


@Module({
    imports: [TypeOrmModule.forFeature([Supplierreport001wb,User001mb,Person001mb])],
    providers: [SupplierreportService],
    controllers: [SupplierreportController],
})
export class SupplierreportModule { }