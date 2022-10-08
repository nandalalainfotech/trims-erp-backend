import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonController } from "src/controller/person.controller";
import { PreventivePlanController } from "src/controller/preventiveplan.controller";
import { UserController } from "src/controller/user.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Preventiveplan001wb } from "src/entity/Preventiveplan001wb";
import { User001mb } from "src/entity/User001mb";
import { RolesGuard } from "src/role/role.guard";
import { PersonService } from "src/service/person.service";
import { PreventivePlanService } from "src/service/preventiveplan.service";
import { UserService } from "src/service/user.service";

@Module({
    imports: [TypeOrmModule.forFeature([Preventiveplan001wb,User001mb,Person001mb])],
    providers: [PreventivePlanService],
    controllers: [PreventivePlanController],
  })
  export class PreventivePlanModule { }