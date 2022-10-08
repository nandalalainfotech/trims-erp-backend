import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PreventiveactionController } from "src/controller/preventiveaction-setting.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Preventiveaction001mb } from "src/entity/Preventiveaction001mb";
import { User001mb } from "src/entity/User001mb";
import { PreventiveactionService } from "src/service/preventiveaction-setting.service";


@Module({
    imports: [TypeOrmModule.forFeature([Preventiveaction001mb,User001mb,Person001mb])],
    providers: [PreventiveactionService],
    controllers: [PreventiveactionController],
})
export class PreventiveactionModule { }