import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PurchaseOrderController } from "src/controller/purchaseorder.controller";
import { Childpart001mb } from "src/entity/ChildPart001mb";
import { Companydetails001mb } from "src/entity/Companydetails001mb";
import { Consignee001mb } from "src/entity/Consignee001mb";
import { Consumble001mb } from "src/entity/Consumble001mb";
import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { Orderitem001wb } from "src/entity/Orderitem001wb";
import { Part001mb } from "src/entity/Part001mb";
import { Person001mb } from "src/entity/Person001mb";
import { Purchaseorder001wb } from "src/entity/Purchaseorder001wb";
import { Purchasereqslip001wb } from "src/entity/Purchasereqslip001wb";
import { Supplierquotation001wb } from "src/entity/Supplierquotation001wb";
import { Supplierregistration001mb } from "src/entity/Supplierregistration001mb";
import { User001mb } from "src/entity/User001mb";
import { PurchaseOrderService } from "src/service/purchaseorder.service";

@Module({
    imports: [TypeOrmModule.forFeature([Purchaseorder001wb,Orderitem001wb,
        Companydetails001mb,Consignee001mb,Orderitem001mb, Orderitem001mb, 
        Consumble001mb,Childpart001mb,Part001mb,Supplierregistration001mb,
        Purchasereqslip001wb,Supplierquotation001wb,User001mb,Person001mb])],
    providers: [PurchaseOrderService],
    controllers: [PurchaseOrderController],
})

export class PurchaseOrderModule { }