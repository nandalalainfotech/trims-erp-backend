import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MaterialmomentsController } from "src/controller/Materialmoments.controller";
import { ObservationsitemsController } from "src/controller/Observationsitems.controller";
import { Childpart001mb } from "src/entity/ChildPart001mb";
import { Consumble001mb } from "src/entity/Consumble001mb";
import { Materialmoments001wb } from "src/entity/Materialmoments001wb";
import { Materialreceiveditem001wb } from "src/entity/Materialreceiveditem001wb";
import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { Part001mb } from "src/entity/Part001mb";
import { Person001mb } from "src/entity/Person001mb";
import { Rawmaterialinspection001wb } from "src/entity/Rawmaterialinspection001wb";
import { User001mb } from "src/entity/User001mb";
import { MaterialmomentsService } from "src/service/Materialmoments.service";



@Module({
    imports: [TypeOrmModule.forFeature([Materialmoments001wb,User001mb,Person001mb,Materialreceiveditem001wb,
        Orderitem001mb, Consumble001mb,Childpart001mb,Part001mb,
        Rawmaterialinspection001wb])],
    providers: [MaterialmomentsService],
    controllers: [MaterialmomentsController],
})

export class MaterialmomentsModule { }