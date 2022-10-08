import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BreakdownController } from "src/controller/breakdown-setting.controller";
import { Breakdown001mb } from "src/entity/Breakdown001mb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { BreakdownService } from "src/service/breakdown-setting.service";

@Module({
    imports: [TypeOrmModule.forFeature([Breakdown001mb,User001mb,Person001mb])],
    providers: [BreakdownService],
    controllers: [BreakdownController],
})
export class BreakdownModule { }