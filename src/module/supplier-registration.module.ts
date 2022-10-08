import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { diskStorage } from "multer";
import { SupplierRegistrationController } from "src/controller/supplier-registration.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Suppliercontact001wb } from "src/entity/Suppliercontact001wb";
import { Supplierregistration001mb } from "src/entity/Supplierregistration001mb";
import { User001mb } from "src/entity/User001mb";
import { SupplierRegistrationService } from "src/service/supplier-registration.service";

@Module({
    imports: [TypeOrmModule.forFeature([Supplierregistration001mb,Suppliercontact001wb,User001mb,Person001mb]),
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
    }),],
    providers: [SupplierRegistrationService],
    controllers: [SupplierRegistrationController],
})
export class SupplierRegistrationModule { }