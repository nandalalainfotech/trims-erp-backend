import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
import { Between } from 'typeorm';
import { createReadStream } from "fs";
import { Purchaseable001mb } from "src/entity/Purchaseable001mb";
import { PurchaseableDTO } from "src/dto/purchaseable.dto";

@Injectable()
export class PurchaseableService {
    constructor(

        @InjectRepository(Purchaseable001mb) private readonly purchaseableRepository: Repository<Purchaseable001mb>) {



    }
    async create(purchaseableDTO: PurchaseableDTO): Promise<Purchaseable001mb> {
        const purchaseable001mb = new Purchaseable001mb();
        purchaseable001mb.setProperties(purchaseableDTO);
        return this.purchaseableRepository.save(purchaseable001mb);
    }
    async update(purchaseableDTO: PurchaseableDTO): Promise<Purchaseable001mb> {
        const purchaseable001mb = new Purchaseable001mb();
        purchaseable001mb.setProperties(purchaseableDTO);
        await this.purchaseableRepository.update({ slNo: purchaseable001mb.slNo }, purchaseable001mb);
        return purchaseable001mb;
    }

    async findAll(unitslno:any): Promise<Purchaseable001mb[]> {
        return await this.purchaseableRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno}});
    }

    findOne(id: number): Promise<Purchaseable001mb> {
        return this.purchaseableRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.purchaseableRepository.delete(slNo);
    }
}