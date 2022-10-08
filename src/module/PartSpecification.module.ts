import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartspecifcationController } from "src/controller/Partspecification.controller";
import { Partspecification001wb } from "src/entity/Partspecification001wb";
import { Person001mb } from "src/entity/Person001mb";
import { Specification001wb } from "src/entity/Specification001wb";
import { User001mb } from "src/entity/User001mb";
import { PartspecificationService } from "src/service/Partspecification.service";


@Module({
    imports: [TypeOrmModule.forFeature([Partspecification001wb,Specification001wb,User001mb,Person001mb])],
    providers: [PartspecificationService],
    controllers: [PartspecifcationController],
})

export class PartspecificationModule { }