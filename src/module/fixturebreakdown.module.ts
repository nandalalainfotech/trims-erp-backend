import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BreakdownController } from "src/controller/breakdown-setting.controller";
import { FixtureBreakdownController } from "src/controller/fixturebreakdown.controller";
import { Breakdown001mb } from "src/entity/Breakdown001mb";
import { Fixturebreakdown001mb } from "src/entity/Fixturebreakdown001mb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { BreakdownService } from "src/service/breakdown-setting.service";
import { FixtureBreakdownService } from "src/service/fixturebreakdown.service";

@Module({
    imports: [TypeOrmModule.forFeature([Fixturebreakdown001mb,User001mb,Person001mb])],
    providers: [FixtureBreakdownService],
    controllers: [FixtureBreakdownController],
})
export class FixtureBreakdownModule { }