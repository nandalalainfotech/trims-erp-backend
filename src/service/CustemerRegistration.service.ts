import { HttpException, HttpStatus, Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getManager, Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
import { Between } from 'typeorm';
import { createReadStream } from "fs";
import { Custemerregistration001mb } from "src/entity/Custemerregistration001mb";
import { CustemerRegistrationDTO } from "src/dto/custemerRegistration.dto";
import { Customercontact001wb } from "src/entity/customercontact001wb";

var path = require('path');
const excel = require('exceljs');
var fs = require('fs');
var pdf = require('dynamic-html-pdf');


@Injectable()
export class CustemerRegistrationService {
    constructor(
        @InjectRepository(Custemerregistration001mb) private readonly custemerRegRepository: Repository<Custemerregistration001mb>,
        @InjectRepository(Customercontact001wb) private readonly CustomerContactRepository: Repository<Customercontact001wb>) {
    }
    customercontacts2
    async create(custemerRegDTO: CustemerRegistrationDTO): Promise<Custemerregistration001mb> {

        let customercontact001wbs: Customercontact001wb[] = [];

        for (let i = 0; i < custemerRegDTO.customercontacts2.length; i++) {

            const customercontact001wb = new Customercontact001wb();

            customercontact001wb.customerslNo2 = custemerRegDTO.customercontacts2[i].customerslNo2;
            customercontact001wb.pname = custemerRegDTO.customercontacts2[i].pname;
            customercontact001wb.designation = custemerRegDTO.customercontacts2[i].designation;
            customercontact001wb.department = custemerRegDTO.customercontacts2[i].department;
            customercontact001wb.level = custemerRegDTO.customercontacts2[i].level;
            customercontact001wb.mnumber = custemerRegDTO.customercontacts2[i].mnumber;
            customercontact001wb.altmnumber = custemerRegDTO.customercontacts2[i].altmnumber;
            customercontact001wb.mailid = custemerRegDTO.customercontacts2[i].mailid;
            customercontact001wb.unitslno = custemerRegDTO.unitslno;
            customercontact001wb.insertUser = custemerRegDTO.insertUser;
            customercontact001wb.insertDatetime = custemerRegDTO.insertDatetime;
            let customercontact = await this.CustomerContactRepository.save(customercontact001wb);
            customercontact001wbs.push(customercontact);
        }

        if (customercontact001wbs.length > 0) {

            const custemerregistration001mb = new Custemerregistration001mb();
            custemerregistration001mb.setProperties(custemerRegDTO);
            custemerregistration001mb.customercontact001wbs = customercontact001wbs;
            await this.custemerRegRepository.save(custemerregistration001mb);
            return custemerregistration001mb;
        }else{
            throw new HttpException('Please Enter Contact Details', HttpStatus.INTERNAL_SERVER_ERROR);
        }

       
    }

    async update(custemerRegDTO: CustemerRegistrationDTO): Promise<Custemerregistration001mb> {
        const custemerregistration001mb = new Custemerregistration001mb();
        custemerregistration001mb.setProperties(custemerRegDTO);
        await this.custemerRegRepository.update({ slNo: custemerregistration001mb.slNo },
            custemerregistration001mb);
        return custemerregistration001mb;
    }

    async findAll(unitslno:any): Promise<Custemerregistration001mb[]> {
        return this.custemerRegRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno}});
    }

    async findAllSlNoAndSuppcode(): Promise<Custemerregistration001mb[]> {
        return this.custemerRegRepository.find();
    }

    findOne(id: number): Promise<Custemerregistration001mb> {
        return this.custemerRegRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.custemerRegRepository.delete(id);
    }

    async getCount(): Promise<string> {
        const entityManager = getManager();
        let result = await getManager().query('select count(*) as row from custemerregistration001mb', ['row']);
        var string = JSON.stringify(result);
        return string;
    }

}

