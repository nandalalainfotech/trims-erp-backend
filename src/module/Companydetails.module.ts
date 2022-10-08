import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyController } from "src/controller/Companydetails.controller";
import { Companydetails001mb } from "src/entity/Companydetails001mb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { CompanyService } from "src/service/Companydetails.service";


@Module({
    imports: [TypeOrmModule.forFeature([Companydetails001mb,User001mb,Person001mb])],
    providers: [CompanyService],
    controllers: [CompanyController],
})

export class CompanyModule { }