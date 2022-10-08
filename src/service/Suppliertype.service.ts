import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest"
import { createReadStream } from "fs";
import { Suppliertype001mb } from "src/entity/Suppliertype001mb";
import { SuppliertypeDTO } from "src/dto/Suppliertype.dto";


@Injectable()
export class SuppliertypeService {
    constructor(
        @InjectRepository(Suppliertype001mb) private readonly  suppliertypeRepository: Repository<Suppliertype001mb>) {

    }
    async create(suppliertypeDTO: SuppliertypeDTO): Promise<Suppliertype001mb> {
        const suppliertype001mb = new Suppliertype001mb();
        suppliertype001mb.setProperties(suppliertypeDTO);
        return this.suppliertypeRepository.save(suppliertype001mb);
    }
    async update(suppliertypeDTO: SuppliertypeDTO): Promise<Suppliertype001mb> {
        const suppliertype001mb = new Suppliertype001mb();
        suppliertype001mb.setProperties(suppliertypeDTO);
        await this.suppliertypeRepository.update({ slNo: suppliertype001mb.slNo }, suppliertype001mb);
        return suppliertype001mb;
    }

    async findAll(unitslno:any): Promise<Suppliertype001mb[]> {
        return await this.suppliertypeRepository.find({order: { slNo: "DESC" },relations:["sslno2"],where:{unitslno:unitslno}});
    }

    findOne(id: number): Promise<Suppliertype001mb> {
        return this.suppliertypeRepository.findOne(id);
    }
    async remove(id: number): Promise<void> {
		await this.suppliertypeRepository.delete(id);
	}
}