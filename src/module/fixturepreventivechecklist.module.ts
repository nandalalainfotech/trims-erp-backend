import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FixturepreventivechecklistController } from "src/controller/fixturepreventivechecklist.controller";
import { Fixturepreventivechecklist001wb } from "src/entity/Fixturepreventivechecklist001wb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { FixturePreventiveCheckListService } from "src/service/fixturepreventivecheklist.service";

@Module({
    imports: [TypeOrmModule.forFeature([Fixturepreventivechecklist001wb,User001mb,Person001mb])],
    providers: [FixturePreventiveCheckListService],
    controllers: [FixturepreventivechecklistController],
})
export class FixturePreventivechecklistModule { }