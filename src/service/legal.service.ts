import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Legal001wb } from "src/entity/Legal001wb";
import { Between, Repository } from "typeorm";


import { Response } from "express";
import { createReadStream } from "fs";
import { Request } from "supertest";
import { LegalwbDTO } from "src/dto/legal.dto";
import { Legal001hb } from "src/entity/Legal001hb";

var path = require('path');
var fs = require('fs');
const excel = require('exceljs');
var pdf = require('dynamic-html-pdf');



@Injectable()
export class LegalService {
    [x: string]: any;
	downloadImage(image: any) {
		throw new Error("Method not implemented.");
	}

    constructor(
        @InjectRepository(Legal001wb) private readonly legalwbRepository: Repository<Legal001wb>) {

    }
    async create(file: any, legalwbDTO: LegalwbDTO): Promise<Legal001wb> {
        const legal001wb = new Legal001wb();
        legal001wb.setProperties(legalwbDTO);
        legal001wb.originalfilename = file.filename;
        return this.legalwbRepository.save(legal001wb);
    }
    async update(file: any, legalwbDTO: LegalwbDTO): Promise<Legal001wb> {
        const legal001wb = new Legal001wb();
        legal001wb.setProperties(legalwbDTO);
        legal001wb.originalfilename = file.filename;
        await this.legalwbRepository.update({ slNo: legal001wb.slNo }, legal001wb);
        return legal001wb;
    }

    async findAll(unitslno:any): Promise<Legal001wb[]> {
      return await this.legalwbRepository.find({order: { slNo: "DESC" }, relations: ["cslno2","fslno2"], where:{unitslno:unitslno} });
    }


    findOne(id: number): Promise<Legal001wb> {
       return this.legalwbRepository.findOne(id);
    }
    
    async remove(slNo: number): Promise<void> {
      let legal001wbs = this.legalwbRepository.findOne(slNo);
       
        const legal001hb = new Legal001hb();
        legal001hb.cslno =    (await legal001wbs).cslno;
        legal001hb.fslno = (await legal001wbs).fslno;
        legal001hb.cno = (await legal001wbs).cno;
        legal001hb.date = (await legal001wbs).date;
        legal001hb.date1 = (await legal001wbs).date1;
        legal001hb.filename = (await legal001wbs).filename;
        legal001hb.filepath = (await legal001wbs).filepath;
        legal001hb.originalfilename = (await legal001wbs).originalfilename;
        legal001hb.insertUser = (await legal001wbs).insertUser;
        legal001hb.insertDatetime = (await legal001wbs).insertDatetime;
        legal001hb.updatedUser = (await legal001wbs).updatedUser;
        legal001hb.updatedDatetime = (await legal001wbs).updatedDatetime;
        
        legal001hb.save();
        await this.legalhbRepository.delete(slNo);
        await this.legalwbRepository.delete(slNo);
    }

   async findNotificationAll(): Promise<Legal001wb[]> {
        const start = new Date();
        const end = new Date();
        start.setDate(start.getDate() +1)
        end.setDate(end.getDate() + 45)

 const result = await this.legalwbRepository.find({
            relations: ["cslno2"],
            where: {
                date: Between(
                    new Date(start),
                    new Date(end),
                ),
 },
       
        });
        return result;
    }
    async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response,) {

        let legalwfdet = await this.legalwbRepository.find({
            relations: ["cslno2","fslno2"],where:{unitslno:unitslno}

        });




        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('legalwfdet.html', 'utf8');


        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {
                legalwfdetcheck: legalwfdet
            },
            path: "./pdf/legalwfdet.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "legalwfdet.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };


    }



    async downloadExcel(unitslno:any,@Req() request: Request, @Res() response: Response) {
        // let prodDTOs: ProdDTO[] = [];
        let legalwfdet = await this.legalwbRepository.find({
            relations: ["cslno2","fslno2"],where:{unitslno:unitslno}
        });






        if (legalwfdet.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('legalwfdet_Reports'); // creating worksheet
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
                { key: 'D', width: 30.0 },
                { key: 'E', width: 30.0 },
                { key: 'F', width: 30.0 },
                { key: 'G', width: 30.0 },


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
            worksheet.getCell('A1:A4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('B1:E2');
            worksheet.getCell('B1:E2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('B1:E2').fgColor = { argb: 'b03600' };
            worksheet.getCell('B1:E2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('B1:E2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('B3:E4');
            worksheet.getCell('B3:E4').value = "LEGAL DOCUMENT DETAILS";
            worksheet.getCell('B3:E4').fgColor = { argb: '00b050' };

            worksheet.getCell('B3:E4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('B3:E4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('F1:G1');
            worksheet.getCell('F1:G1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('F1:G1').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('F2:G2');
            worksheet.getCell('G2:F2').value = "Issue Date : 01.02.2019";
            worksheet.getCell('F2:G2').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('F3:G3');
            worksheet.getCell('F3:G3').value = "Rev. No. 00	";
            worksheet.getCell('F3:G3').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('F4:G4');
            worksheet.getCell('F4:G4').value = "Rev Date :";
            worksheet.getCell('F4:G4').alignment = { vertical: 'left', horizontal: 'left' };


            worksheet.mergeCells('A5');
            worksheet.getCell('A5').value = "Sl. No";
            worksheet.getCell('A5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('B5');
            worksheet.getCell('B5').value = "Compliance Description";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Certificate No";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Certificate Validaty From";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Certificate Validaty To";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "File Document";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "File Name";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };


            for (let i = 0; i < legalwfdet.length; i++) {



                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = legalwfdet[i].cslno2.dname;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = legalwfdet[i].cno;

                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = legalwfdet[i].date;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = legalwfdet[i].date1;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = legalwfdet[i].fslno2.ftype;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).value = legalwfdet[i].originalfilename;



            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }
    }
}