import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ObservationsitemsController } from "src/controller/Observationsitems.controller";
import { Observationsitems001wb } from "src/entity/Observationsitems001wb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { ObservationsitemsService } from "src/service/Observationsitems.service";



@Module({
    imports: [TypeOrmModule.forFeature([Observationsitems001wb,User001mb,Person001mb])],
    providers: [ObservationsitemsService],
    controllers: [ObservationsitemsController],
})

export class ObservationsitemsModule { }