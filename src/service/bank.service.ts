import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";


import { Repository } from "typeorm";

import { Response } from "express";
import { Request } from "supertest";

import { createReadStream } from "fs";
import { Bank001mb } from "src/entity/Bank001mb";
import { BankDTO } from "src/dto/bank.dto";


@Injectable()
export class BankNameService {
    constructor(
        @InjectRepository(Bank001mb) private readonly bankRepository: Repository<Bank001mb>) {
    }

    async create(bankDTO: BankDTO): Promise<Bank001mb> {
        const bank001mb = new Bank001mb();
        bank001mb.setProperties(bankDTO);
        return this.bankRepository.save(bank001mb);
    }

    async update(bankDTO: BankDTO): Promise<Bank001mb> {
        const bank001mb = new Bank001mb();
        bank001mb.setProperties(bankDTO);
        await this.bankRepository.update({ slNo: bank001mb.slNo }, bank001mb);
        return bank001mb;
    }

    async findAll(unitslno: number): Promise<Bank001mb[]> {
        console.log("unitslno", unitslno)
        return this.bankRepository.find({order: { slNo: "DESC" },where: {'unitslno': unitslno} });
    }

    

    findOne(slNo: number): Promise<Bank001mb> {
        return this.bankRepository.findOne(slNo);
    }

    async remove(id: string): Promise<void> {
		await this.bankRepository.delete(id);
	}
}