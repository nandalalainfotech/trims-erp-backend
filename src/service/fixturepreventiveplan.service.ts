import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { query, Response } from "express";
import { createReadStream } from "fs";
import { FixturePreventivePlanDTO } from "src/dto/fixturepreventiveplan.dto";
import { PreventivePlanDTO } from "src/dto/preventiveplan.dto";
import { Fixturepreventiveplan001wb } from "src/entity/Fixturepreventiveplan001wb";
import { Preventiveplan001wb } from "src/entity/Preventiveplan001wb";
import { Request } from "supertest";
import { Repository } from "typeorm";
import { Between } from 'typeorm';
var path = require('path');
const excel = require('exceljs');

var fs = require('fs');
var fs = require('fs');
var pdf = require('dynamic-html-pdf');


@Injectable()


export class FixturePreventivePlanService {
  
    length: number;
	
    constructor(
        @InjectRepository(Fixturepreventiveplan001wb) private readonly fixturepreplanRepository: Repository<Fixturepreventiveplan001wb>) {
    }

    async create(fixturepreventivePlanDTO: FixturePreventivePlanDTO): Promise<Fixturepreventiveplan001wb> {
        const fixturepreventiveplan001wb = new Fixturepreventiveplan001wb();
        fixturepreventiveplan001wb.setProperties(fixturepreventivePlanDTO);
        return this.fixturepreplanRepository.save(fixturepreventiveplan001wb);
    }

    async update(preventivePlanDTO: FixturePreventivePlanDTO): Promise<Fixturepreventiveplan001wb> {
        const fixturepreventiveplan001wb = new Fixturepreventiveplan001wb();
        fixturepreventiveplan001wb.setProperties(preventivePlanDTO);
        await this.fixturepreplanRepository.update({ slNo: fixturepreventiveplan001wb.slNo },
            fixturepreventiveplan001wb);
        return fixturepreventiveplan001wb;
    }

    async findAll(unitslno:any): Promise<Fixturepreventiveplan001wb[]> {
        return this.fixturepreplanRepository.find({order: { slNo: "DESC" }, relations: ["mslno2"], where:{unitslno:unitslno} });
    }

    async findNotificationAll(): Promise<Fixturepreventiveplan001wb[]> {
        const start = new Date();
        const end = new Date();
        end.setDate(end.getDate() + 3)
        const result = await this.fixturepreplanRepository.find({
            relations: ["mslno2"],
            where: {
                date: Between(
                    new Date(start),
                    new Date(end),
                ),
            },
        });
        return result;
    }
    

    async findAllByFixtureId(mslno: number, unitslno:any): Promise<Fixturepreventiveplan001wb[]> {
        return this.fixturepreplanRepository.find({ relations: ["mslno2"], where: { "mslno": mslno, unitslno:unitslno } });
    }
    async findAllByDashboard(): Promise<any> {
        let plans = this.fixturepreplanRepository.find();
       
        // for(let i=0; i< plans; i++)

        // if (this[i]==query)
        // plans++;
       
    return plans;
    }
    findOne(id: number): Promise<Fixturepreventiveplan001wb> {
        return this.fixturepreplanRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.fixturepreplanRepository.delete(id);
    }

       async downloadPdf(mslno: number,unitslno:any, @Req() request: Request, @Res() response: Response) {

        let preplans = await this.fixturepreplanRepository.find({
            relations: ["mslno2"],
            where: { mslno:mslno,unitslno:unitslno },
        });
      
           var fs = require('fs');
           var pdf = require('dynamic-html-pdf');
           var html = fs.readFileSync('fixturepreplan.html', 'utf8');
   
           
           var options = {
               format: "A3",
               orientation: "portrait",
               border: "10mm"
           };
   
           var document = {
               type: 'file',     // 'file' or 'buffer'
               template: html,
               context: {                  
                  
                   
                preplanscheck: preplans
                },
               path: "./pdf/fixturepreplans.pdf"    // it is not required if type is buffer
           };
   
           if (document === null) {
               return null;
   
           } else {
               pdf.create(document, options).then((pathRes) => {
                   const filestream = createReadStream(pathRes.filename);
                   response.writeHead(200, {
                       "Content-Disposition": "attachment;filename=" + "fixturepreplans.pdf",
                       'Content-Type': 'application/pdf'
                   });
                   filestream.pipe(response);
               }).catch((error) => {
                   console.error(error);
               });
           };
   
   
       }
   
   
         async downloadExcel(mslno: number, unitslno:any,@Req() request: Request, @Res() response: Response) {
        let preplans = await this.fixturepreplanRepository.find({
            relations: ["mslno2"],
            where: { mslno:mslno,unitslno:unitslno },
        });

         if (preplans.length < 0) {
               return;
           }
           else {
               let workbook = new excel.Workbook();
               let worksheet = workbook.addWorksheet('fixturepreplans_reports'); // creating worksheet
               worksheet.getRow(5).height = 15;
               worksheet.getRow(6).height = 15;
               worksheet.getRow(7).height = 15;
               worksheet.getRow(8).height = 15;
               worksheet.getRow(9).height = 15;
               worksheet.getRow(10).height = 15;
               worksheet.getRow(11).height = 15;
               worksheet.getRow(12).height = 15;
               worksheet.getRow(13).height = 15;
               worksheet.getRow(14).height = 15;
               worksheet.columns = [
                   { key: 'A', width: 30.0 },
                   { key: 'B', width: 30.0 },
                   { key: 'C', width: 30.0 },
                   { key: 'D', width: 45.0 },
                   { key: 'E', width: 30.0 },
                  
               ];
   
               worksheet.columns.forEach((col) => {
   
                   col.style.font = {
                       size: 10,
                       bold: true
                   };
                   col.style.alignment = { vertical: 'middle', horizontal: 'center' };
                   col.style.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
               })
   
               worksheet.mergeCells('A1:A4');
               worksheet.getCell('A1:A4').value = "TRIMS";
               worksheet.getCell('A1:A4').font = {
                   size: 11,
                   bold: true
               };
               worksheet.getCell('B1:D4').alignment = { vertical: 'middle', horizontal: 'center' };
               worksheet.mergeCells('B1:D2');
               worksheet.getCell('B1:D2').value = "SRINIVASA ENTERPRISES";
               worksheet.getCell('B1:D2').fgColor = { argb: 'b03600' };  
               worksheet.getCell('B1:D2').font = {
                   size: 11,
                   bold: true
               };
               worksheet.getCell('B1:D2').alignment = { vertical: 'middle', horizontal: 'center' };
               worksheet.mergeCells('B3:D4');
               worksheet.getCell('B3:D4').value = "FIXTURE PREVENTIVE MAINTENANCE PLAN";
               worksheet.getCell('B3:D4').fgColor = { argb: '00b050' };  
   
               worksheet.getCell('B3:D4').font = {                
                   size: 11,
                   bold: true
               };
               worksheet.getCell('E3:E4').alignment = { vertical: 'middle', horizontal: 'center' };
   
               worksheet.mergeCells('E1:E1');
               worksheet.getCell('E1:E1').value = "Format No.SE/MTN/R05";
               worksheet.getCell('E1:E1').alignment = { vertical: 'left', horizontal: 'left' };
               worksheet.mergeCells('E2:E2');
               worksheet.getCell('E2:E2').value = "Issue Date : 01.02.2019";
               worksheet.getCell('E2:E2').alignment = { vertical: 'left', horizontal: 'left' };
               worksheet.mergeCells('E3:E3');
               worksheet.getCell('E3:E3').value = "Rev. No. 00	";
               worksheet.getCell('E3:E3').alignment = { vertical: 'left', horizontal: 'left' };
               worksheet.mergeCells('E4:E4');
               worksheet.getCell('E4:E4').value = "Rev Date :";
               worksheet.getCell('E4:E4').alignment = { vertical: 'left', horizontal: 'left' };
   
   
               worksheet.mergeCells('A5');
               worksheet.getCell('A5').value = "Sl. No";
               worksheet.getCell('A5').font = {
                   size: 11,
                   bold: true
               };
               worksheet.mergeCells('B5');
               worksheet.getCell('B5').value = "FIXTURE CODE";
               worksheet.getCell('B5').font = {
                   size: 11,
                   bold: true
               };
               worksheet.mergeCells('C5');
               worksheet.getCell('C5').value = " FIXTURE NAME";
               worksheet.getCell('C5').font = {
                   size: 11,
                   bold: true
               };
               worksheet.mergeCells('D5');
               worksheet.getCell('D5').value = " FIXTURE STATUS";
               worksheet.getCell('D5').font = {
                   size: 11,
                   bold: true
               };
               worksheet.mergeCells('E5');
               worksheet.getCell('E5').value = "FIXTURE DATE";
               worksheet.getCell('E5').font = {
                   size: 11,
                   bold: true
               };
   
             
             
             
              
              
   
   
   
   
               for (let i = 0; i < preplans.length; i++) {
   
   
                   
                   let temp = i + 6;
   
                   worksheet.mergeCells('A' + temp);
                   worksheet.getCell('A' + temp).value = i + 1;
   
                   worksheet.mergeCells('B' + temp);
                   worksheet.getCell('B' + temp).value = preplans[i].mslno2.fcode;
   
                   worksheet.mergeCells('C' + temp);
                   worksheet.getCell('C' + temp).value = preplans[i].mslno2.fname;
                   worksheet.mergeCells('D' + temp);
                   worksheet.getCell('D' + temp).value = preplans[i].status;
   
                   worksheet.mergeCells('E' + temp);
                   worksheet.getCell('E' + temp).value = preplans[i].date;
   
                  
   
               }
               return workbook.xlsx.write(response).then(function () {
                   response['status'](200).end();
               });
   
   
           }
       }
    
   }
   
