import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MateriealrequestitemController } from "src/controller/Materiealrequestitem.controller";
import { Materiealrequestitem001wb } from "src/entity/Materiealrequestitem001wb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { MateriealrequestitemService } from "src/service/Materiealrequestitem.service";



@Module({
    imports: [TypeOrmModule.forFeature([Materiealrequestitem001wb,User001mb,Person001mb])],
    providers: [MateriealrequestitemService],
    controllers: [MateriealrequestitemController],
})

export class MateriealrequestitemModule { }