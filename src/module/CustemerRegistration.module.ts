import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustemerRegistrationController } from "src/controller/CustemerRegistration.controller";
import { Custemerregistration001mb } from "src/entity/Custemerregistration001mb";
import { Customercontact001wb } from "src/entity/customercontact001wb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { CustemerRegistrationService } from "src/service/CustemerRegistration.service";


@Module({
    imports: [TypeOrmModule.forFeature([Custemerregistration001mb,Customercontact001wb,User001mb,Person001mb])],
    providers: [CustemerRegistrationService],
    controllers: [CustemerRegistrationController],
})
export class CustemerRegistrationModule { }