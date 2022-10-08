import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SalesQuotationController } from "src/controller/SalesQuotation.controller";
import { Custemer001wb } from "src/entity/Custemer001wb";
import { Part001mb } from "src/entity/Part001mb";
import { Partitem001wb } from "src/entity/Partitem001wb";
import { Person001mb } from "src/entity/Person001mb";
import { Salesquotation001wb } from "src/entity/SalesQuotation001wb";
import { User001mb } from "src/entity/User001mb";
import { SalesQuotationService } from "src/service/Salesquotation.service";


@Module({
    imports: [TypeOrmModule.forFeature([Part001mb,Partitem001wb,Salesquotation001wb,Custemer001wb,User001mb,Person001mb])],
    providers: [SalesQuotationService],
    controllers: [SalesQuotationController],
})
export class SalesquotationModule { }