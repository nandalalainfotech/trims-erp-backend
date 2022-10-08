import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { diskStorage } from "multer";
import { BreakDownRegController } from "src/controller/breakdown-reg-wb.controller";
import { Breakdownreg001wb } from "src/entity/Breakdownreg001wb";
import { Emp001mb } from "src/entity/Emp001mb";
import { Person001mb } from "src/entity/Person001mb";
import { Spares001mb } from "src/entity/Spares001mb";
import { User001mb } from "src/entity/User001mb";
import { BreakDownRegService } from "src/service/breakDownRegwb.service";

@Module({
    imports: [TypeOrmModule.forFeature([Breakdownreg001wb,Spares001mb,User001mb,Person001mb]),
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
    providers: [BreakDownRegService],
    controllers: [BreakDownRegController],
})
export class BreakDownRegModule { }