import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TrainingplanController } from "src/controller/Trainingplan.controller";
import { Person001mb } from "src/entity/Person001mb";
import { Trainingplan001mb } from "src/entity/Trainingplan001mb";
import { User001mb } from "src/entity/User001mb";
import { TrainingplanService } from "src/service/Trainingplan.service";



@Module({
    imports: [TypeOrmModule.forFeature([Trainingplan001mb,User001mb,Person001mb])],
    providers: [TrainingplanService],
    controllers: [TrainingplanController],
})

export class TrainingplanModule { }