import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChildpartSpecificationController } from "src/controller/childpartspecification.controller";
import { Childpartspecification001wb } from "src/entity/Childpartspecification001wb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { ChildpartSpecificationService } from "src/service/childpartsepecification.service";




@Module({
    imports: [TypeOrmModule.forFeature([Childpartspecification001wb,User001mb,Person001mb])],
    providers: [ChildpartSpecificationService],
    controllers: [ChildpartSpecificationController],
})
export class ChildpartSpecificationMbModule { }

