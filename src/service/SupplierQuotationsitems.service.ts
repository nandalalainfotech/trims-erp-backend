import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
import { Between } from 'typeorm';
import { createReadStream } from "fs";
import { SupplierquotationsItemDTO } from "src/dto/supplierQuotationsitem.dto";
import { Supplierquotationitems001wb } from "src/entity/Supplierquotationitems001wb";




@Injectable()
export class SupplierquotationitemsService {
    constructor(

        @InjectRepository(Supplierquotationitems001wb) private readonly supplierquotationitemsRepository: Repository<Supplierquotationitems001wb>) {
    }

    async findAll(unitslno:any): Promise<Supplierquotationitems001wb[]> {
        return await this.supplierquotationitemsRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno}})
    }
    
    async create(supplierquotationsItemDTO: SupplierquotationsItemDTO): Promise<Supplierquotationitems001wb> {
        const supplierquotationitems001wb = new Supplierquotationitems001wb();
        supplierquotationitems001wb.setProperties(supplierquotationsItemDTO);
        return this.supplierquotationitemsRepository.save(supplierquotationitems001wb);
    }
    async update(supplierquotationsItemDTO: SupplierquotationsItemDTO): Promise<Supplierquotationitems001wb> {
        const supplierquotationitems001wb = new Supplierquotationitems001wb();
        supplierquotationitems001wb.setProperties(supplierquotationsItemDTO);
        await this.supplierquotationitemsRepository.update({ slNo: supplierquotationitems001wb.slNo }, supplierquotationitems001wb);
        return supplierquotationitems001wb;
    }

   

    findOne(id: number): Promise<Supplierquotationitems001wb> {
        return this.supplierquotationitemsRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.supplierquotationitemsRepository.delete(slNo);
    }
}