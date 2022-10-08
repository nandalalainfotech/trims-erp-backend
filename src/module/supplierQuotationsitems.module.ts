import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupplierquotationitemController } from "src/controller/supplierquotationitems.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Supplierquotationitems001wb } from "src/entity/Supplierquotationitems001wb";
import { User001mb } from "src/entity/User001mb";
import { SupplierquotationitemsService } from "src/service/SupplierQuotationsitems.service";




@Module({
    imports: [TypeOrmModule.forFeature([Supplierquotationitems001wb,User001mb,Person001mb])],
    providers: [SupplierquotationitemsService],
    controllers: [SupplierquotationitemController]
})
export class SupplierquotationitemModule { }