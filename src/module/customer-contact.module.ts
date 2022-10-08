import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerContactController } from "src/controller/customer-contact.controller";
import { Customercontact001wb } from "src/entity/customercontact001wb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { CustomerContactService } from "src/service/customer-contact.service";



@Module({
    imports: [TypeOrmModule.forFeature([Customercontact001wb,User001mb,Person001mb])],
    providers: [CustomerContactService],
    controllers: [CustomerContactController],
})

export class CustomerContactModule { }