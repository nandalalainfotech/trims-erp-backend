import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MaterialinwardController } from "src/controller/materialinward.controller";
import { Childpart001mb } from "src/entity/ChildPart001mb";
import { Consumble001mb } from "src/entity/Consumble001mb";
import { Materialinward001wb } from "src/entity/Materialinward001wb";
import { Materialreceiveditem001wb } from "src/entity/Materialreceiveditem001wb";
import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { Part001mb } from "src/entity/Part001mb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { MaterialinwardService } from "src/service/materialinward.service";



@Module({
    imports: [TypeOrmModule.forFeature([Materialinward001wb,Materialreceiveditem001wb,
        Orderitem001mb,Consumble001mb,Childpart001mb,Part001mb,User001mb,Person001mb])],
    providers: [MaterialinwardService],
    controllers: [MaterialinwardController],
})

export class MaterialinwardModule { }