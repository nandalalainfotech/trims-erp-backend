import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { createReadStream } from "fs";
import { StatutoryPlanDTO } from "src/dto/statutory.dto";
import { Statutory001wb } from "src/entity/Statutory001wb";
import { Request } from "supertest";
import { Repository } from "typeorm";
import { Between } from 'typeorm';

var path = require('path');
const excel = require('exceljs');
var fs = require('fs');
var pdf = require('dynamic-html-pdf');


@Injectable()


export class StatutoryPlanService {
    constructor(
        @InjectRepository(Statutory001wb) private readonly statuplanRepository: Repository<Statutory001wb>) {
    }

    async create(statutoryPlanDTO: StatutoryPlanDTO): Promise<Statutory001wb> {
        const statutory001wb = new Statutory001wb();
        statutory001wb.setProperties(statutoryPlanDTO);
        return this.statuplanRepository.save(statutory001wb);
    }

    async update(statutoryPlanDTO: StatutoryPlanDTO): Promise<Statutory001wb> {
        const statutory001wb = new Statutory001wb();
        statutory001wb.setProperties(statutoryPlanDTO);
        await this.statuplanRepository.update({ slNo: statutory001wb.slNo },
            statutory001wb);
        return statutory001wb;
    }



    
    async findAll(unitslno:number): Promise<Statutory001wb[]> {
        return this.statuplanRepository.find({order: { slNo: "DESC" }, relations: ["bslno2"],where: {'unitslno': unitslno } });
    }
    
   

    findOne(id: number): Promise<Statutory001wb> {
        return this.statuplanRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.statuplanRepository.delete(slNo);
    }



    async downloadPdf( unitslno:any,@Req() request: Request, @Res() response: Response) {
        
        let statory = await this.statuplanRepository.find({ 
            where:{unitslno:unitslno}           
        });

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('statory.html', 'utf8');

        var options = {
            format: "A3",
            orientation: "landscape",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {
                
                statorycheck: statory
            },
            path: "./pdf/statory.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "statory.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };
    }


    async downloadExcel( unitslno:any,@Req() request: Request, @Res() response: Response) {        
        let statory = await this.statuplanRepository.find({
            where:{unitslno:unitslno}
        });

        if (statory.length < 0) {
            return;
        } else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Statutory_Reports'); // creating worksheet
            // worksheet.pageSetup.printArea = 'A1:AN213';
            worksheet.getRow(5).height = 60;
            worksheet.getRow(6).height = 60;
            worksheet.getRow(7).height = 60;
            worksheet.getRow(8).height = 60;
            worksheet.getRow(9).height = 60;
            worksheet.getRow(10).height = 60;
            worksheet.getRow(11).height = 60;
            worksheet.getRow(12).height = 60;
            worksheet.getRow(13).height = 60;
            worksheet.getRow(14).height = 80;
            worksheet.columns = [{ key: 'A', width: 5.0 },
             { key: 'B', width: 25.0 },
              { key: 'C', width: 30.0 },
               { key: 'D', width: 30.0 }, 
               { key: 'E', width: 30.0 },
                { key: 'F', width: 30.0 },
                 { key: 'G', width: 30.0 },
                  { key: 'H', width: 30.0 },
                   { key: 'I', width: 30.0 },
                    { key: 'J', width: 30.0 },
                     { key: 'K', width: 30.0 },
                      { key: 'L', width: 30.0 },
                       { key: 'M', width: 30.0 },
                       { key: 'N', width: 30.0 },
                       { key: 'O', width: 30.0 },
                       { key: 'P', width: 30.0 },
                       { key: 'Q', width: 30.0 },
                       { key: 'R', width: 30.0 },
                       { key: 'S', width: 30.0 }];
            worksheet.columns.forEach((col) => {
                col.style.font = {
                    size: 10,
                    bold: true
                };
                col.style.alignment = { vertical: 'middle', horizontal: 'center' };
                col.style.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            })

            worksheet.mergeCells('A1:B4');
            worksheet.getCell('A1:B4').value = "TRIMS";
            worksheet.getCell('A1:B4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('A1:B4').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('C1:Q2');
            worksheet.getCell('C1:Q2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('C1:Q2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C1:P2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('C3:Q4');
            worksheet.getCell('C3:Q4').value = "STATUTORY DETAILS";
            worksheet.getCell('C3:Q4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C3:Q4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('R1:S1');
            worksheet.getCell('R1:S1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('R1:S1').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('R2:S2');
            worksheet.getCell('R2:S2').value = "Issue Date : 01.02.2019";
            worksheet.getCell('R2:S2').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('R3:S3');
            worksheet.getCell('R3:S3').value = "Rev. No. 00	";
            worksheet.getCell('R3:S3').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('R4:S4');
            worksheet.getCell('R4:S4').value = "Rev Date :";
            worksheet.getCell('R4:S4').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet.mergeCells('A5');
            worksheet.getCell('A5').value = "Sl. No";
            worksheet.getCell('A5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('B5');
            worksheet.getCell('B5').value = "EMPLOYEE CODE";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "EMPLOYEE NAME";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "ESI NO";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value ="ESI SCHEME";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value =  "ESI START DATE ";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "ESI END DATE";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('H5');
            worksheet.getCell('H5').value ="PF NO"; 
            worksheet.getCell('H5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('I5');
            worksheet.getCell('I5').value = "PF SCHEME";
            worksheet.getCell('I5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('J5');
            worksheet.getCell('J5').value = "PF START DATE";
            worksheet.getCell('J5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('K5');
            worksheet.getCell('K5').value ="PF END DATE"; 
            worksheet.getCell('K5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('L5');
            worksheet.getCell('L5').value = "INSURENCE NO";
            worksheet.getCell('L5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('M5');
            worksheet.getCell('M5').value ="INSURENCE SCHEME"; 
            worksheet.getCell('M5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('N5');
            worksheet.getCell('N5').value ="INSURENCE START DATE"; 
            worksheet.getCell('N5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('O5');
            worksheet.getCell('O5').value = "INSURENCE END DATE";
            worksheet.getCell('O5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('P5');
            worksheet.getCell('P5').value = "MEDICLAIME NO";
            worksheet.getCell('P5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('Q5');
            worksheet.getCell('Q5').value = "MEDICLAIM SCHEME";
            worksheet.getCell('Q5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('R5');
            worksheet.getCell('R5').value = "MEDICLAIME START DATE";
            worksheet.getCell('R5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('S5');
            worksheet.getCell('S5').value = "MEDICLAIME END DATE";
            worksheet.getCell('S5').font = {
                size: 11,
                bold: true
            };

            
        

            for (let i = 0; i < statory.length; i++) {
                let temp = i + 6;
                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = statory[i].ecode;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = statory[i].ename;

                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = statory[i].esno;
                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = statory[i].escheme;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = statory[i].esstartdate;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).value = statory[i].esenddate;

                worksheet.mergeCells('H' + temp);
                worksheet.getCell('H' + temp).value = statory[i].pfno;

                worksheet.mergeCells('I' + temp);
                worksheet.getCell('I' + temp).value = statory[i].pscheme;

                worksheet.mergeCells('J' + temp);
                worksheet.getCell('J' + temp).value = statory[i].pfstartdate;

                worksheet.mergeCells('K' + temp);
                worksheet.getCell('K' + temp).value = statory[i].pfenddate;

                worksheet.mergeCells('L' + temp);
                worksheet.getCell('L' + temp).value = statory[i].insurno;

                worksheet.mergeCells('M' + temp);
                worksheet.getCell('M' + temp).value = statory[i].inscheme;

                worksheet.mergeCells('N' + temp);
                worksheet.getCell('N' + temp).value = statory[i].instartdate;

                worksheet.mergeCells('O' + temp);
                worksheet.getCell('O' + temp).value = statory[i].insenddate;

                worksheet.mergeCells('P' + temp);
                worksheet.getCell('P' + temp).value = statory[i].mediclno;

                worksheet.mergeCells('Q' + temp);
                worksheet.getCell('Q' + temp).value = statory[i].mscheme;

                worksheet.mergeCells('R' + temp);
                worksheet.getCell('R' + temp).value = statory[i].mstartdate;


                worksheet.mergeCells('S' + temp);
                worksheet.getCell('S' + temp).value = statory[i].menddate;
                
               

            }

            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });
        }
    }
}

   
   
