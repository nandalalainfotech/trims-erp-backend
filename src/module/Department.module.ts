import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DepartmentController } from "src/controller/department.controller";
import { Department001mb } from "src/entity/Department001mb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { DepartmentSettingService } from "src/service/department.service";

@Module({
    imports: [TypeOrmModule.forFeature([Department001mb,User001mb,Person001mb])],
    providers: [DepartmentSettingService],
    controllers: [DepartmentController],
})
export class DepartmentModule { }