import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { diskStorage } from "multer";
import { PurchaseInvoicePayController } from "src/controller/PurchaseInvoicePay.controller";
import { Childpart001mb } from "src/entity/ChildPart001mb";
import { Consumble001mb } from "src/entity/Consumble001mb";
import { Materialinward001wb } from "src/entity/Materialinward001wb";
import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { Orderitem001wb } from "src/entity/Orderitem001wb";
import { Part001mb } from "src/entity/Part001mb";
import { Person001mb } from "src/entity/Person001mb";
import { Purchaseinvoiceitems001wb } from "src/entity/Purchaseinvoiceitems001wb";
import { Purchaseinvoicepay001wb } from "src/entity/Purchaseinvoicepay001wb";
import { Purchaseorder001wb } from "src/entity/Purchaseorder001wb";
import { Purchasereqslip001wb } from "src/entity/Purchasereqslip001wb";
import { Supplierquotation001wb } from "src/entity/Supplierquotation001wb";
import { Supplierregistration001mb } from "src/entity/Supplierregistration001mb";
import { User001mb } from "src/entity/User001mb";
import { PurchaseInvoicePayService } from "src/service/PurchaseInvoicePay.service";

@Module({
    imports: [TypeOrmModule.forFeature([Purchaseinvoicepay001wb,Purchaseinvoiceitems001wb,
        Orderitem001mb, Orderitem001wb,Supplierquotation001wb,Supplierregistration001mb,Materialinward001wb,
        Consumble001mb,Childpart001mb,Part001mb,Purchasereqslip001wb,Purchaseorder001wb,
        User001mb,Person001mb]),
        MulterModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    storage: diskStorage({
                        destination: async (req, file, cb) => {
                            const path: string = configService.get('STATICPATH');
                            return cb(null, path);
                        },
                        filename: (req, file, cb) => {
                            return cb(null, `${Date.now()}_${file.originalname}`);
                        }
                    })
                }
            },
        }),
    ],
    providers: [PurchaseInvoicePayService],
    controllers: [PurchaseInvoicePayController],
})

export class PurchaseInvoicePayModule { }