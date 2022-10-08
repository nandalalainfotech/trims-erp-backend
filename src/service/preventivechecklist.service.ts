import { Get, Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PreventiveChecklistDTO } from "src/dto/preventivechecklist.dto";
import { Preventivechecklist001wb } from "src/entity/Preventivechecklist001wb";
import { Response } from "express";
import { Request } from "supertest";
var path = require('path');
const excel = require('exceljs');
var path = require('path');
var pdf = require("pdf-creator-node");
var fs = require("fs");
var html = fs.readFileSync("preCheck.html", "utf8");
import { createReadStream } from "fs";



import { Repository } from "typeorm";
import { promisify } from "util";
import { get } from "http";

@Injectable()
export class PreventiveCheckListService {
    constructor(
        @InjectRepository(Preventivechecklist001wb) private readonly preCheckRepository: Repository<Preventivechecklist001wb>) {
    }

    async create(preventiveChecklistDTOs: PreventiveChecklistDTO[]): Promise<Preventivechecklist001wb[]> {
        for (let i = 0; i < preventiveChecklistDTOs.length; i++) {
            let preventivechecklist001wb = new Preventivechecklist001wb();
            preventivechecklist001wb.setProperties(preventiveChecklistDTOs[i]);
            await this.preCheckRepository.save(preventivechecklist001wb);
        }
        let checklist = await this.preCheckRepository.find();
        return checklist;

    }

    async update(preventiveChecklistDTOs: PreventiveChecklistDTO): Promise<Preventivechecklist001wb> {
        let preventivechecklist001wb = new Preventivechecklist001wb();
        preventivechecklist001wb.setProperties(preventiveChecklistDTOs);
        await this.preCheckRepository.update({ slNo: preventivechecklist001wb.slNo }, preventivechecklist001wb);
        return preventivechecklist001wb;
    }

    async findAll(): Promise<Preventivechecklist001wb[]> {
        return this.preCheckRepository.find({ order: { slNo: "DESC" },relations: ["mslno2", "cpslno2"] });
    }

    async findAllByMachineId(mslno: number, unitslno:number): Promise<Preventivechecklist001wb[]> {
        return this.preCheckRepository.find({ order: { slNo: "DESC" },relations: ["mslno2", "cpslno2"], where: { "mslno": mslno, 'unitslno': unitslno  } });
    }

    findOne(id: number): Promise<Preventivechecklist001wb> {
        return this.preCheckRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.preCheckRepository.delete(id);
    }

    async downloadPdf(mslno: number,unitslno: number, @Req() request: Request, @Res() response: Response) {
        let preventivechecks = await this.preCheckRepository.find({
            relations: ["mslno2", "cpslno2"],
            where: {  mslno:mslno,unitslno:unitslno },
        });

        let i = 0;
        let preChecklists = preventivechecks[i];

        var document = {
            html: html,
            data: {
                prechecks: preventivechecks, preChecklists
            },
            path: path.join(`./pdf/preCheck.pdf`),
            type: "",
        };
        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm",
            header: {
                height: "45mm",
            },
            footer: {
                height: "28mm",

            }
        };
        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "preCheck.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };
    }


    async downloadExcel(mslno: number,unitslno: number, @Req() request: Request, @Res() response: Response) {
        let preventivechecks = await this.preCheckRepository.find({
            relations: ["mslno2", "cpslno2"],
            where: {  mslno:mslno,unitslno:unitslno },
        });

    
             if (preventivechecks.length < 0) {
                   return;
               }
               else {
                   let workbook = new excel.Workbook();
                   let worksheet = workbook.addWorksheet('preventivechecks_reports'); // creating worksheet
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
                       { key: 'F', width: 30.0 },
                      
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
                   worksheet.getCell('B1:E4').alignment = { vertical: 'middle', horizontal: 'center' };
                   worksheet.mergeCells('B1:E2');
                   worksheet.getCell('B1:E2').value = "SRINIVASA ENTERPRISES";
                   worksheet.getCell('B1:E2').fgColor = { argb: 'b03600' };  
                   worksheet.getCell('B1:E2').font = {
                       size: 11,
                       bold: true
                   };
                   worksheet.getCell('B1:E2').alignment = { vertical: 'middle', horizontal: 'center' };
                   worksheet.mergeCells('B3:E4');
                   worksheet.getCell('B3:E4').value = "PREVENTIVE MAINTENANCE CHECKLIST";
                   worksheet.getCell('B3:E4').fgColor = { argb: '00b050' };  
       
                   worksheet.getCell('B3:E4').font = {                
                       size: 11,
                       bold: true
                   };
                   worksheet.getCell('F3:F4').alignment = { vertical: 'middle', horizontal: 'center' };
       
                   worksheet.mergeCells('F1:F1');
                   worksheet.getCell('F1:F1').value = "Format No.SE/MTN/R05";
                   worksheet.getCell('F1:F1').alignment = { vertical: 'left', horizontal: 'left' };
                   worksheet.mergeCells('F2:F2');
                   worksheet.getCell('F2:F2').value = "Issue Date : 01.02.2019";
                   worksheet.getCell('F2:F2').alignment = { vertical: 'left', horizontal: 'left' };
                   worksheet.mergeCells('F3:F3');
                   worksheet.getCell('F3:F3').value = "Rev. No. 00	";
                   worksheet.getCell('F3:F3').alignment = { vertical: 'left', horizontal: 'left' };
                   worksheet.mergeCells('F4:F4');
                   worksheet.getCell('F4:F4').value = "Rev Date :";
                   worksheet.getCell('F4:F4').alignment = { vertical: 'left', horizontal: 'left' };
       
       
                   worksheet.mergeCells('A5');
                   worksheet.getCell('A5').value = "Sl. No";
                   worksheet.getCell('A5').font = {
                       size: 11,
                       bold: true
                   };
                   worksheet.mergeCells('B5');
                   worksheet.getCell('B5').value = "MACHINE CODE";
                   worksheet.getCell('B5').font = {
                       size: 11,
                       bold: true
                   };
                   worksheet.mergeCells('C5');
                   worksheet.getCell('C5').value = " MACHINE NAME";
                   worksheet.getCell('C5').font = {
                       size: 11,
                       bold: true
                   };
                   worksheet.mergeCells('D5');
                   worksheet.getCell('D5').value = " CHECK POINTS";
                   worksheet.getCell('D5').font = {
                       size: 11,
                       bold: true
                   };
                   worksheet.mergeCells('E5');
                   worksheet.getCell('E5').value = "CHECKPOINT DATE";
                   worksheet.getCell('E5').font = {
                       size: 11,
                       bold: true
                   };

                   worksheet.mergeCells('F5');
                   worksheet.getCell('F5').value = "OBSERVATION";
                   worksheet.getCell('F5').font = {
                       size: 11,
                       bold: true
                   };
       
                 
                 
                 
                  
                  
       
       
       
       
                   for (let i = 0; i < preventivechecks.length; i++) {
       
       
                       
                       let temp = i + 6;
       
                       worksheet.mergeCells('A' + temp);
                       worksheet.getCell('A' + temp).value = i + 1;
       
                       worksheet.mergeCells('B' + temp);
                       worksheet.getCell('B' + temp).value = preventivechecks[i].mslno2.mcode;
       
                       worksheet.mergeCells('C' + temp);
                       worksheet.getCell('C' + temp).value = preventivechecks[i].mslno2.mname;
                       worksheet.mergeCells('D' + temp);
                       worksheet.getCell('D' + temp).value = preventivechecks[i].cpslno2.checkpoints;
       
                       worksheet.mergeCells('E' + temp);
                       worksheet.getCell('E' + temp).value = preventivechecks[i].checkpointdate;

                       worksheet.mergeCells('F' + temp);
                       worksheet.getCell('F' + temp).value = preventivechecks[i].observation;
       
                      
       
                   }
                   return workbook.xlsx.write(response).then(function () {
                       response['status'](200).end();
                   });
       
       
               }
           }
        
       }
       
    