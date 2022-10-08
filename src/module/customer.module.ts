import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerController } from "src/controller/customer.controller";
import { Customer001mb } from "src/entity/Customer001mb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { CustomerService } from "src/service/customer.service";

@Module({
    imports: [TypeOrmModule.forFeature([Customer001mb,User001mb,Person001mb])],
    providers: [CustomerService],
    controllers: [CustomerController],
})

export class CustomerModule { }