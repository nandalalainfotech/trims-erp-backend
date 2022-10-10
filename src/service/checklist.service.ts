import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createReadStream } from "fs";
import { ChecklistDTO } from "src/dto/Checklist.dto";
import { Checklist001mb } from "src/entity/Checklist001mb";
import { Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
var path = require('path');
var fs = require('fs');
const excel = require('exceljs');
var pdf = require('dynamic-html-pdf');


@Injectable()
export class ChecklistSettingService {

    constructor(
        @InjectRepository(Checklist001mb) private readonly checklistRepository: Repository<Checklist001mb>) {

    }
    async create(checklistDTO: ChecklistDTO): Promise<Checklist001mb> {
        const checklist001mb = new Checklist001mb();
        checklist001mb.setProperties(checklistDTO);
        return this.checklistRepository.save(checklist001mb);
    }
    async update(checklistDTO: ChecklistDTO): Promise<Checklist001mb> {
        const checklist001mb = new Checklist001mb();
        checklist001mb.setProperties(checklistDTO);
        await this.checklistRepository.update({ slNo: checklist001mb.slNo }, checklist001mb);
        return checklist001mb;
    }

    async findAll(unitslno:number): Promise<Checklist001mb[]> {
        return await this.checklistRepository.find({ order: { slNo: "DESC" },relations: ["mcslno2","sslno2"],where: {'unitslno': unitslno } });
    }

    findOne(id: number): Promise<Checklist001mb> {
        return this.checklistRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
		await this.checklistRepository.delete(slNo);
	}

    async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {
        let checklist = await this.checklistRepository.find({ relations: ["mcslno2","sslno2"],where:{unitslno:unitslno} });
        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('checklist.html', 'utf8');
        let regslno = 0;

        pdf.registerHelper("iforderslno", function (orderslno, options) {
           this.slNo = ++regslno;
          if (this.slNo == undefined) {
          return options.inverse(this);
          } else {
          return options.fn(this, this.slNo);
          }
        });
        
        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {                  
               
                
                checklistcheck: checklist
             },
            path: "./pdf/checklist.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "checklist.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };


    }









    async downloadExcel(unitslno:any,@Req() request: Request, @Res() response: Response) {
        let checklist = await this.checklistRepository.find({ relations: ["mcslno2","sslno2"],where:{unitslno:unitslno} });


        if (checklist.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('checklist_reports'); // creating worksheet
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
                { key: 'C', width: 45.0 },
                { key: 'D', width: 45.0 },

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
            worksheet.getCell('B1:C4').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('B1:C2');
            worksheet.getCell('B1:C2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('B1:C2').fgColor = { argb: 'b03600' };  
            worksheet.getCell('B1:C2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('B1:C2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('B3:C4');
            worksheet.getCell('B3:C4').value = "LIST OF CHECKLIST DETAILS";
            worksheet.getCell('B3:C4').fgColor = { argb: '00b050' };  

            worksheet.getCell('B3:C4').font = {                
                size: 11,
                bold: true
            };
            worksheet.getCell('D3:D4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('D1:D1');
            worksheet.getCell('D1:D1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('D1:D1').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('D2:D2');
            worksheet.getCell('D2:D2').value = "Issue Date : 01.02.2019";
            worksheet.getCell('D2:D2').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('D3:D3');
            worksheet.getCell('D3:D3').value = "Rev. No. 00	";
            worksheet.getCell('D3:D3').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('D4:D4');
            worksheet.getCell('D4:D4').value = "Rev Date :";
            worksheet.getCell('D4:D4').alignment = { vertical: 'left', horizontal: 'left' };


            worksheet.mergeCells('A5');
            worksheet.getCell('A5').value = "Sl. No";
            worksheet.getCell('A5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('B5');
            worksheet.getCell('B5').value = "Machine Code";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Check Points";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Status";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };





            for (let i = 0; i < checklist.length; i++) {


                
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = checklist[i].mcslno2.mcode;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = checklist[i].checkpoints;
                
                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = checklist[i].sslno2.name;

            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });
            

        }
    }
 
}