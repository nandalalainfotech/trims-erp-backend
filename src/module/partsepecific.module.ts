import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartSpecificController } from "src/controller/partspecific.controller";
import { Partspecific001wb } from "src/entity/Partspecific001wb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { PartSpecificService } from "src/service/partspecific.service";




@Module({
    imports: [TypeOrmModule.forFeature([Partspecific001wb,User001mb,Person001mb])],
    providers: [PartSpecificService],
    controllers: [PartSpecificController],
})
export class PartSpecificationMbModule { }