import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupplierattendanceController } from "src/controller/Supplierattendancereport.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Supplierattendancereport001wb } from "src/entity/Supplierattendancereport001wb";
import { User001mb } from "src/entity/User001mb";
import { SupplierattendanceService } from "src/service/Supplierattendancereport.service";



@Module({
    imports: [TypeOrmModule.forFeature([Supplierattendancereport001wb,User001mb,Person001mb])],
    providers: [SupplierattendanceService],
    controllers: [SupplierattendanceController],
})

export class SupplierattendanceModule { }