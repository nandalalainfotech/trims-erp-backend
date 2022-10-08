import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConsumbleController } from "src/controller/consumble.controller";
import { Consumble001mb } from "src/entity/Consumble001mb";
import { Consumerspecification001wb } from "src/entity/Consumerspecification001wb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { ConsumbleService } from "src/service/consumbele.service";



@Module({
    imports: [TypeOrmModule.forFeature([Consumble001mb, Consumerspecification001wb,User001mb,Person001mb])],
    providers: [ConsumbleService],
    controllers: [ConsumbleController],
})

export class ConsumbleModule { }