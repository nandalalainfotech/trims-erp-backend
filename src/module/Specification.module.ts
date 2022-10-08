import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpecificationController } from "src/controller/Specification.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Specification001wb } from "src/entity/Specification001wb";
import { User001mb } from "src/entity/User001mb";
import { SpecificationService } from "src/service/Specification.service";



@Module({
    imports: [TypeOrmModule.forFeature([Specification001wb,User001mb,Person001mb])],
    providers: [SpecificationService],
    controllers: [SpecificationController],
})

export class SpecificationModule { }