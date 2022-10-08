import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
import { Between } from 'typeorm';
import { createReadStream } from "fs";
import { Observationsitems001wb } from "src/entity/Observationsitems001wb";
import { ObservationsitemsDTO } from "src/dto/Observationsitems.dto";






@Injectable()
export class ObservationsitemsService {
    constructor(

        @InjectRepository(Observationsitems001wb) private readonly observationsitemsRepository: Repository<Observationsitems001wb>) {
    }
    async findAll(unitslno: any): Promise<Observationsitems001wb[]> {
        return await this.observationsitemsRepository.find({ order: { slNo: "DESC" }, where: { unitslno: unitslno } })
    }



    async create(observationsitemsDTO: ObservationsitemsDTO): Promise<Observationsitems001wb> {

            const observationsitems001wb = new Observationsitems001wb();
            observationsitems001wb.setProperties(observationsitemsDTO);
            return this.observationsitemsRepository.save(observationsitems001wb);
    }

    // const observationsitems001wb = new Observationsitems001wb();
    // observationsitems001wb.setProperties(observationsitemsDTO);
    //   console.log("observationsitems001wb", observationsitems001wb);
    // return this.observationsitemsRepository.save(observationsitems001wb);


    async update(observationsitemsDTO: ObservationsitemsDTO): Promise<Observationsitems001wb> {
        const observationsitems001wb = new Observationsitems001wb();
        observationsitems001wb.setProperties(observationsitemsDTO);
        await this.observationsitemsRepository.update({ slNo: observationsitems001wb.slNo }, observationsitems001wb);
        return observationsitems001wb;
    }


    findOne(id: number): Promise<Observationsitems001wb> {
        return this.observationsitemsRepository.findOne(id);
    }

    async remove(slNo: number): Promise<void> {
        await this.observationsitemsRepository.delete(slNo);
    }
}