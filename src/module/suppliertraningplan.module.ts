import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SuppliertrainingController } from "src/controller/suppliertraningplan.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Suppliertrainingplan001wb } from "src/entity/Suppliertrainingplan001wb";
import { User001mb } from "src/entity/User001mb";
import { SuppliertrainingService } from "src/service/suppliertraningplan.service";



@Module({
    imports: [TypeOrmModule.forFeature([Suppliertrainingplan001wb,User001mb,Person001mb])],
    providers: [SuppliertrainingService],
    controllers: [SuppliertrainingController],
})
export class SuppliertrainingModule { }