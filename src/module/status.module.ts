import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StatusController } from "src/controller/status.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Status001mb } from "src/entity/Status001mb";
import { User001mb } from "src/entity/User001mb";
import { StatusService } from "src/service/status.service";


@Module({
    imports: [TypeOrmModule.forFeature([Status001mb,User001mb,Person001mb])],
    providers: [StatusService],
    controllers: [StatusController],
  })
  export class StatusModule { }