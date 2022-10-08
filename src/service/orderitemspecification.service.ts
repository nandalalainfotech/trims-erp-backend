import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderitemSpecificationDTO } from "src/dto/orderitemspecification.dto";
import { Orderitemspecification001wb } from "src/entity/Orderitemspecification001wb";
import { getManager, Repository } from "typeorm";



@Injectable()
export class  OrderitemSpecificationService {
    constructor(

        @InjectRepository(Orderitemspecification001wb) private readonly orderitemspecificationRepository: Repository<Orderitemspecification001wb>) {
    }

    async create(orderitemSpecificationDTO: OrderitemSpecificationDTO): Promise<Orderitemspecification001wb> {
        const orderitemspecification001wb = new Orderitemspecification001wb();
        orderitemspecification001wb.setProperties(orderitemSpecificationDTO);
        return  this.orderitemspecificationRepository.save(orderitemspecification001wb);
    }
    async update(orderitemSpecificationDTO: OrderitemSpecificationDTO): Promise<Orderitemspecification001wb> {
        const orderitemspecification001wb = new Orderitemspecification001wb();
        orderitemspecification001wb.setProperties(orderitemSpecificationDTO);
        await this.orderitemspecificationRepository.update({ slNo: orderitemspecification001wb.slNo }, orderitemspecification001wb);
        return orderitemspecification001wb;
    }

    async findAll(unitslno:any): Promise<Orderitemspecification001wb[]> {
        return await this.orderitemspecificationRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno}})
    }

    // async findAllbyspecificationId(poslNo: number): Promise<Specification001wb[]> {
    //     return this.specificationRepository.find({ select: ["slNo", "parameter"], where: { "slNo": poslNo } });
    // }


    findOne(id: number): Promise<Orderitemspecification001wb> {
        return this.orderitemspecificationRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.orderitemspecificationRepository.delete(slNo);
    }
}