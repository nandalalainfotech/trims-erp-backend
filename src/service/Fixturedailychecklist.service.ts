import { HttpException, HttpStatus, Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
import { createReadStream } from "fs";
import { Fixturedailychecklist001wb } from "src/entity/Fixturedailychecklist001wb";
import { FixturedailychecklistDTO } from "src/dto/Fixturedailychecklist.dto";
const excel = require('exceljs');

@Injectable()
export class FixturedailychecklistService {

    constructor(
        @InjectRepository(Fixturedailychecklist001wb) private readonly fixturedailycheckRepository: Repository<Fixturedailychecklist001wb>) {
    }

    async create(fixturedailychecklistDTO: FixturedailychecklistDTO): Promise<Fixturedailychecklist001wb> {
        const fixturedailychecklist001wb = new Fixturedailychecklist001wb();
        fixturedailychecklist001wb.setProperties(fixturedailychecklistDTO);
        return this.fixturedailycheckRepository.save(fixturedailychecklist001wb);
    }

    async update(fixturedailychecklistDTO: FixturedailychecklistDTO): Promise<Fixturedailychecklist001wb> {
        const fixturedailychecklist001wb = new Fixturedailychecklist001wb();
        fixturedailychecklist001wb.setProperties(fixturedailychecklistDTO);
        await this.fixturedailycheckRepository.update({ slNo: fixturedailychecklist001wb.slNo }, fixturedailychecklist001wb);
        return fixturedailychecklist001wb;
    }

    async findAll(unitslno:any): Promise<Fixturedailychecklist001wb[]> {
        return await this.fixturedailycheckRepository.find({order: { slNo: "DESC" }, relations: ["mcslno2",],where:{unitslno:unitslno} });
    }

    async findAllByMachineId(mslno: number, unitslno:any): Promise<Fixturedailychecklist001wb[]> {
        return this.fixturedailycheckRepository.find({ order: { slNo: "DESC" },relations: ["mslno2", "cpslno2"], where: { "mslno": mslno, unitslno:unitslno } });
    }

    findOne(id: number): Promise<Fixturedailychecklist001wb> {
        return this.fixturedailycheckRepository.findOne(id);
    }

    async remove(slNo: number): Promise<void> {
        await this.fixturedailycheckRepository.delete(slNo);
    }
}