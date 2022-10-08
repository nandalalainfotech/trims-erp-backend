import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { diskStorage } from "multer";
import { LegalControllers } from "src/controller/legal.controller";
import { LegalDocumentsControllers } from "src/controller/legaldocuments.controller";
import { SafetyEquipmentsControllers } from "src/controller/safetyequipmentscontroller";
import { Legal001mb } from "src/entity/Legal001mb";
import { Legal001wb } from "src/entity/Legal001wb";
import { Person001mb } from "src/entity/Person001mb";
import { Safetyequwb001 } from "src/entity/Safetyequwb001";
import { User001mb } from "src/entity/User001mb";
import { LegalService } from "src/service/legal.service";
import { LegalDocumentsService } from "src/service/legaldocuments.service";
import { SafetyEquipmentsService } from "src/service/safetyequipments.service";


@Module({
    imports: [TypeOrmModule.forFeature([Legal001wb,User001mb,Person001mb]),
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
    providers: [LegalService],
    controllers: [LegalControllers],
})
export class LegalModule { }