import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChildPartController } from "src/controller/childPart.controller";
import { Childpart001mb } from "src/entity/ChildPart001mb";
import { Childpartspecification001wb } from "src/entity/Childpartspecification001wb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { ChildPartService } from "src/service/ChildPart.service";


@Module({
    imports: [TypeOrmModule.forFeature([Childpart001mb,Childpartspecification001wb,User001mb,Person001mb])],
    providers: [ChildPartService],
    controllers: [ChildPartController],
})

export class ChildPartModule { }