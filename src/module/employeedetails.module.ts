import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { diskStorage } from "multer";
import { ActitvityController } from "src/controller/activity.controller";
import { EmployeeDetailsController } from "src/controller/employeedetails.controller";
import { Emp001mb } from "src/entity/Emp001mb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { ActivityService } from "src/service/activity.service";
import { EmployeeDetailsService } from "src/service/Employeedetails.service";


@Module({
    imports: [TypeOrmModule.forFeature([Emp001mb,User001mb,Person001mb]),
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
    providers: [EmployeeDetailsService],
    controllers: [EmployeeDetailsController],
})
export class EmployeeDetailsModule { }