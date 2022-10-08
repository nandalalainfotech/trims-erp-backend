import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SuppliertypeController } from "src/controller/Suppliertype.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Suppliertype001mb } from "src/entity/Suppliertype001mb";
import { User001mb } from "src/entity/User001mb";
import { SuppliertypeService } from "src/service/Suppliertype.service";




@Module({
    imports: [TypeOrmModule.forFeature([Suppliertype001mb,User001mb,Person001mb])],
    providers: [SuppliertypeService],
    controllers: [SuppliertypeController],
})
export class SuppliertypeModule { }