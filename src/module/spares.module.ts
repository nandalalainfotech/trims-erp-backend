import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SparesController } from "src/controller/spares.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Spares001mb } from "src/entity/Spares001mb";
import { User001mb } from "src/entity/User001mb";
import { SpareService } from "src/service/spares.service";

@Module({
    imports: [TypeOrmModule.forFeature([Spares001mb,User001mb,Person001mb])],
    providers: [SpareService],
    controllers: [SparesController],
  })
  export class SpareModule { }