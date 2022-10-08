import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MaterialreceiveditemController } from "src/controller/materialreceiveditem.controller";
import { Childpart001mb } from "src/entity/ChildPart001mb";
import { Consumble001mb } from "src/entity/Consumble001mb";
import { Materialreceiveditem001wb } from "src/entity/Materialreceiveditem001wb";
import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { Part001mb } from "src/entity/Part001mb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { MaterialreceiveditemService } from "src/service/materialreceiveditem.service";




@Module({
    imports: [TypeOrmModule.forFeature([Materialreceiveditem001wb,User001mb,Person001mb,
        Orderitem001mb, Consumble001mb,Childpart001mb,Part001mb])],
    providers: [MaterialreceiveditemService],
    controllers: [MaterialreceiveditemController]
})
export class MaterialreceiveditemModule { }