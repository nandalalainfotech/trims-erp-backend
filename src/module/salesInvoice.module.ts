import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SalesInvoiceController } from "src/controller/Salesinvoice.controller";
import { Custemer001wb } from "src/entity/Custemer001wb";
import { Part001mb } from "src/entity/Part001mb";
import { Person001mb } from "src/entity/Person001mb";
import { Salesinvoice001wb } from "src/entity/Salesinvoice001wb";
import { User001mb } from "src/entity/User001mb";
import { SalesInvoiceService } from "src/service/SalesInvoice.service";


@Module({
    imports: [TypeOrmModule.forFeature([Salesinvoice001wb,Custemer001wb,Part001mb,User001mb,Person001mb])],
    providers: [SalesInvoiceService],
    controllers: [SalesInvoiceController],
})
export class SalesinvoiceModule { }
