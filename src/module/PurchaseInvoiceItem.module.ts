import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PurchaseInvoiceItemController } from "src/controller/PurchaseInvoiceItem.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Purchaseinvoiceitems001wb } from "src/entity/Purchaseinvoiceitems001wb";
import { User001mb } from "src/entity/User001mb";
import { PurchaseInvoiceItemService } from "src/service/PurchaseInvoiceItem.service";

@Module({
    imports: [TypeOrmModule.forFeature([Purchaseinvoiceitems001wb,User001mb,Person001mb])],
    providers: [PurchaseInvoiceItemService],
    controllers: [PurchaseInvoiceItemController],
})

export class PurchaseInvoiceItemModule { }