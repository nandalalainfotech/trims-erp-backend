import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConsumerSpecificationController } from "src/controller/Consumablespecification.controller";
import { Consumerspecification001wb } from "src/entity/Consumerspecification001wb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { ConsumerSpecificationService } from "src/service/consumbalespecification.service";



@Module({
    imports: [TypeOrmModule.forFeature([Consumerspecification001wb,User001mb,Person001mb])],
    providers: [ConsumerSpecificationService],
    controllers: [ConsumerSpecificationController],
})
export class ConsumerSpecificationMbModule { }


