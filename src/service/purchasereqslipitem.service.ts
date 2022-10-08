import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
import { Between } from 'typeorm';
import { createReadStream } from "fs";
import { PurchasereqslipitemDTO } from "src/dto/Purchasereqslipitem.dto";
import { Purchasereqitem001wb } from "src/entity/Purchasereqitem001wb";




@Injectable()
export class PurchasereqslipitemService {
    constructor(

        @InjectRepository(Purchasereqitem001wb) private readonly purchasereqslipitemRepository: Repository<Purchasereqitem001wb>) {
    }
    async findAll(unitslno:any): Promise<Purchasereqitem001wb[]> {
        return await this.purchasereqslipitemRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno}})
    }

    async create(purchasereqslipitemDTO: PurchasereqslipitemDTO): Promise<Purchasereqitem001wb> {
        const purchasereqitem001wb = new Purchasereqitem001wb();
        purchasereqitem001wb.setProperties(purchasereqslipitemDTO);
        return this.purchasereqslipitemRepository.save(purchasereqitem001wb);
    }
    async update(purchasereqslipitemDTO: PurchasereqslipitemDTO): Promise<Purchasereqitem001wb> {
        const purchasereqitem001wb = new Purchasereqitem001wb();
        purchasereqitem001wb.setProperties(purchasereqslipitemDTO);
        await this.purchasereqslipitemRepository.update({ slNo: purchasereqitem001wb.slNo }, purchasereqitem001wb);
        return purchasereqitem001wb;
    }

    // {relations:["orderslno2","cucode2","cptcode2","prtcode2"]}
    findOne(id: number): Promise<Purchasereqitem001wb> {
        return this.purchasereqslipitemRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.purchasereqslipitemRepository.delete(slNo);
    }
}