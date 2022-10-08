import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
import { Between } from 'typeorm';
import { createReadStream } from "fs";
import { Materiealrequestitem001wb } from "src/entity/Materiealrequestitem001wb";
import { MateriealrequestitemDTO } from "src/dto/Materiealrequestitem.dto";







@Injectable()

export class MateriealrequestitemService {
    constructor(
        @InjectRepository(Materiealrequestitem001wb) private readonly materiealrequestitemRepository: Repository<Materiealrequestitem001wb>) {
    }

    async create(materiealrequestitemDTO:MateriealrequestitemDTO): Promise<Materiealrequestitem001wb> {
        const materiealrequestitem001wb = new Materiealrequestitem001wb();
        materiealrequestitem001wb.setProperties(materiealrequestitemDTO);
        return this.materiealrequestitemRepository.save(materiealrequestitem001wb);
    }

    async update(materiealrequestitemDTO: MateriealrequestitemDTO): Promise<Materiealrequestitem001wb> {
        const materiealrequestitem001wb = new Materiealrequestitem001wb();
        materiealrequestitem001wb.setProperties(materiealrequestitemDTO);
        await this.materiealrequestitemRepository.update({ slNo: materiealrequestitem001wb.slNo }, materiealrequestitem001wb);
        return materiealrequestitem001wb;
    }

    async findAll(unitslno: number): Promise<Materiealrequestitem001wb[]> {
        return this.materiealrequestitemRepository.find();
    }


    findOne(id: number): Promise<Materiealrequestitem001wb> {
        return this.materiealrequestitemRepository.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.materiealrequestitemRepository.delete(id);
    }
}