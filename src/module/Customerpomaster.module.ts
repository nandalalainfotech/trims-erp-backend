import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerpomasterController } from "src/controller/Customerpomaster.controller";
import { Custemerregistration001mb } from "src/entity/Custemerregistration001mb";
import { Customerpoitem001wb } from "src/entity/Customerpoitem001wb";
import { Customerpomaster001mb } from "src/entity/Customerpomaster001mb";
import { Part001mb } from "src/entity/Part001mb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { CustomerpomasterService } from "src/service/Customerpomaster.service";

@Module({
    imports: [TypeOrmModule.forFeature([Customerpomaster001mb , Customerpoitem001wb,Part001mb,Custemerregistration001mb,
    User001mb,Person001mb])],
    providers: [CustomerpomasterService],
    controllers: [CustomerpomasterController],
})

export class CustomerpomasterModule { }