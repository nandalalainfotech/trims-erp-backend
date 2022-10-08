import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeFecilityController } from "src/controller/employef.controller";
import { Employef001mb } from "src/entity/Employef001mb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { EmployeFecilityService } from "src/service/employef.service";





@Module({
    imports: [TypeOrmModule.forFeature([Employef001mb,User001mb,Person001mb])],
    providers: [EmployeFecilityService],
    controllers: [EmployeFecilityController],
  })
  export class EmployefModule { }