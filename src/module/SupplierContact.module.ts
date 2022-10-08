import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupplierContactController } from "src/controller/SupplierContact.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Suppliercontact001wb } from "src/entity/Suppliercontact001wb";
import { User001mb } from "src/entity/User001mb";
import { SupplierContactService } from "src/service/Suppliercontact.service";



@Module({
    imports: [TypeOrmModule.forFeature([Suppliercontact001wb,User001mb,Person001mb])],
    providers: [SupplierContactService],
    controllers: [SupplierContactController],
})

export class SupplierContactModule { }