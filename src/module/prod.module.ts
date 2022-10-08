import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdController } from "src/controller/prod.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Prod001mb } from "src/entity/Prod001mb";
import { User001mb } from "src/entity/User001mb";
import { ProdService } from "src/service/prod.service";


@Module({
    imports: [TypeOrmModule.forFeature([Prod001mb,User001mb,Person001mb])],
    providers: [ProdService],
    controllers: [ProdController],
})
export class ProdModule { }