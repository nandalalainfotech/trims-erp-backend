import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustemerController } from "src/controller/Custemer-wb.controller";
import { Custemer001wb } from "src/entity/Custemer001wb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { CustemerService } from "src/service/Custemer-wb-service";



@Module({
    imports: [TypeOrmModule.forFeature([Custemer001wb,User001mb,Person001mb])],
    providers: [CustemerService],
    controllers: [CustemerController]
})
export class CustemerModule { }