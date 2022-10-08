import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { createReadStream } from "fs";
import { FireplanDTO } from "src/dto/fireplan.dto";
import { Fireplan001wb } from "src/entity/Fireplan001wb";
import { Request } from "supertest";
import { Between, Repository } from "typeorm";

var path = require('path');
var fs = require('fs');
const excel = require('exceljs');
var pdf = require('dynamic-html-pdf');



@Injectable()
export class FirePlanService {
   
    constructor(
        @InjectRepository(Fireplan001wb ) private readonly fireRepository: Repository<Fireplan001wb >) {

    }

    async create(fireplanDTO: FireplanDTO): Promise<Fireplan001wb > {
        const fireplan001wb  = new Fireplan001wb ();
        
        fireplan001wb  .setProperties(fireplanDTO);
        return this.fireRepository.save(fireplan001wb );
    }
    async update(fireplanDTO: FireplanDTO): Promise<Fireplan001wb > {
        const fireplan001wb  = new Fireplan001wb ();
        fireplan001wb .setProperties(fireplanDTO);
        await this.fireRepository.update({ slNo: fireplan001wb .slNo }, fireplan001wb );
        return fireplan001wb ;
    }
    async findNotificationAll(unitslno:any): Promise<Fireplan001wb[]> {
        const start = new Date();
        const end = new Date();
        start.setDate(start.getDate() +1)
        end.setDate(end.getDate() + 45)
        const result = await this.fireRepository.find({
            where: {
                date: Between(
                    new Date(start),
                    new Date(end),
                ),
                unitslno:unitslno
            },
        });
        return result;
    }

    async findAll(unitslno:any): Promise<Fireplan001wb []> {
        return await this.fireRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno}});
    }

    findOne(id: number): Promise<Fireplan001wb > {
        return this.fireRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.fireRepository.delete(slNo);
    }


    async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {
        let firepl = await this.fireRepository.find({where:{unitslno:unitslno}});

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('firepl.html', 'utf8');

        
        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {                  
               
                
                fireplcheck: firepl
             },
            path: "./pdf/firepl.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "firepl.pdf",
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
        let firepl = await this.fireRepository.find({where:{unitslno:unitslno}});


        if (firepl.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Fireplan_Reports'); // creating worksheet
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
                { key: 'E', width: 45.0 },
                { key: 'F', width: 45.0 },
                

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
            worksheet.getCell('B1:E2').value = "SRINIVASA ENTERPRISIES";
            worksheet.getCell('B1:E2').fgColor = { argb: 'b03600' };  
            worksheet.getCell('B1:E2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('B1:E2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('B3:E4');
            worksheet.getCell('B3:E4').value = "LIST OF FIRE EXTINGUISHERS DETAILS";
            worksheet.getCell('B3:E4').fgColor = { argb: '00b050' };  

            worksheet.getCell('B3:E4').font = {                
                size: 11,
                bold: true
            };
            worksheet.getCell('B3:E4').alignment = { vertical: 'middle', horizontal: 'center' };

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
            worksheet.getCell('B5').value = "Fire Extinquisters";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Application";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Location";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Filling Date";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "Closing Date";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
     







            for (let i = 0; i < firepl.length; i++) {


                
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = firepl[i].fire;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = firepl[i].app;
                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = firepl[i].loc;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = firepl[i].date;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = firepl[i].date1;

            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }
    }
}