import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
import { Between } from 'typeorm';
import { createReadStream } from "fs";
import { Orderitem001wb } from "src/entity/Orderitem001wb";
import { OrderItemwbDTO } from "src/dto/orderitem-wb.dto";



@Injectable()
export class OrderItemService {
    constructor(

        @InjectRepository(Orderitem001wb) private readonly orderItemRepository: Repository<Orderitem001wb>) {
    }
    async findAll(unitslno:any): Promise<Orderitem001wb[]> {
    
     return await this.orderItemRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno}})
    }
    async create(orderItemwbDTO: OrderItemwbDTO): Promise<Orderitem001wb> {
        const orderitem001wb = new Orderitem001wb();
        orderitem001wb.setProperties(orderItemwbDTO);
        return this.orderItemRepository.save(orderitem001wb);
    }
    async update(orderItemwbDTO: OrderItemwbDTO): Promise<Orderitem001wb> {
        const orderitem001wb = new Orderitem001wb();
        orderitem001wb.setProperties(orderItemwbDTO);
        await this.orderItemRepository.update({ slNo: orderitem001wb.slNo }, orderitem001wb);
        return orderitem001wb;
    }

    // relations: ["orderslno2",],


    // async findAllByOrderId(orderslno: number): Promise<Orderitem001wb[]> {
    //     return this.orderItemRepository.find({ relations: ["orderslno2"],
    //     where:{"orderslno": orderslno}, });
    // }



    findOne(id: number): Promise<Orderitem001wb> {
        return this.orderItemRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.orderItemRepository.delete(slNo);
    }
}