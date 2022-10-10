import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
import { Between } from 'typeorm';
import { createReadStream } from "fs";
import { Custemer001wb } from "src/entity/Custemer001wb";
import { CustemerwbDTO } from "src/dto/Custemerwb.dto";



@Injectable()
export class CustemerService {
    constructor(

        @InjectRepository(Custemer001wb) private readonly custemerRepository: Repository<Custemer001wb>) {



    }
    async create(custemerwbDTO: CustemerwbDTO): Promise<Custemer001wb> {
        const custemer001wb = new Custemer001wb();
        custemer001wb.setProperties(custemerwbDTO);
        return this.custemerRepository.save(custemer001wb);
    }
    async update(custemerwbDTO: CustemerwbDTO): Promise<Custemer001wb> {
        const custemer001wb = new Custemer001wb();
        custemer001wb.setProperties(custemerwbDTO);
        await this.custemerRepository.update({ slNo: custemer001wb.slNo }, custemer001wb);
        return custemer001wb;
    }

    async findAll(unitslno:any): Promise<Custemer001wb[]> {
        return this.custemerRepository.find({order: { slNo: "DESC" }, relations: ["salespartSlno2","prtcode2"], 
    where:{unitslno:unitslno}})
    }
    
    findOne(id: number): Promise<Custemer001wb> {
        return this.custemerRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.custemerRepository.delete(slNo);
    }
}