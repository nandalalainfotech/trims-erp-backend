import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentController } from "src/controller/Payment.controller";
import { Payment001wb } from "src/entity/Payment001wb";
import { Person001mb } from "src/entity/Person001mb";
import { User001mb } from "src/entity/User001mb";
import { PaymentService } from "src/service/Payment.service";


@Module({
    imports: [TypeOrmModule.forFeature([Payment001wb,User001mb,Person001mb])],
    providers: [PaymentService],
    controllers: [PaymentController],
})

export class PaymentModule { }