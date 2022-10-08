import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FirstaidMaterialsControllers } from "src/controller/firstaidmaterials.controller";
import { Firstaidwb001 } from "src/entity/Firstaidwb001";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { FirstaidMaterialsService } from "src/service/firstaidmaterials.service";


@Module({
    imports: [TypeOrmModule.forFeature([Firstaidwb001,User001mb,Person001mb])],

    providers: [FirstaidMaterialsService],
    controllers: [FirstaidMaterialsControllers],
})
export class FirstaidMaterialsModule { }