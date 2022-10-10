import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerpoitemController } from "src/controller/Customerpoitem.controller";
import { Customerpoitem001wb } from "src/entity/Customerpoitem001wb";
import { Customerpomaster001mb } from "src/entity/Customerpomaster001mb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { CustomerpoitemService } from "src/service/Customerpoitem.service";

@Module({
    imports: [TypeOrmModule.forFeature([Customerpomaster001mb,Customerpoitem001wb,User001mb,Person001mb])],
    providers: [CustomerpoitemService],
    controllers: [CustomerpoitemController],
})

export class CustomerpoitemModule { }