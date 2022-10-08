import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SuppchecklistController } from "src/controller/suppchecklist.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Suppchecklist001mb } from "src/entity/Suppchecklist001mb";
import { User001mb } from "src/entity/User001mb";
import { SuppchecklistService } from "src/service/suppchecklist.service";



@Module({
    imports: [TypeOrmModule.forFeature([Suppchecklist001mb,User001mb,Person001mb])],
    providers: [SuppchecklistService],
    controllers: [SuppchecklistController],
})
export class SuppchecklistModule { }