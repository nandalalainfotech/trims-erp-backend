import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FirstaidMaterialsDTO } from "src/dto/firstaid-materials.dto";
import { Firstaidwb001 } from "src/entity/Firstaidwb001";
import { Between, Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
import { createReadStream } from "fs";
var path = require('path');
const excel = require('exceljs');

var fs = require('fs');
var fs = require('fs');
var pdf = require('dynamic-html-pdf');



@Injectable()
export class FirstaidMaterialsService {
   
    constructor(
        @InjectRepository(Firstaidwb001) private readonly firstaidRepository: Repository<Firstaidwb001>) {

    }

    async create(firstaidMaterialsDTO: FirstaidMaterialsDTO): Promise<Firstaidwb001> {
        const firstaidwb001 = new Firstaidwb001();
        
        firstaidwb001.setProperties(firstaidMaterialsDTO);
        return this.firstaidRepository.save(firstaidwb001);
    }
    async update(firstaidMaterialsDTO: FirstaidMaterialsDTO): Promise<Firstaidwb001> {
        const firstaidwb001 = new Firstaidwb001();
        firstaidwb001.setProperties(firstaidMaterialsDTO);
        await this.firstaidRepository.update({ slNo: firstaidwb001.slNo }, firstaidwb001);
        return firstaidwb001;
    }

    async findeNotificationAll(unitslno:any): Promise<Firstaidwb001[]> {
        const start = new Date();
        const end = new Date();
        end.setDate(end.getDate() +45)
        const result = await this.firstaidRepository.find({
            // relations: ["eslno2"],
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
    async findAll(unitslno:number): Promise<Firstaidwb001[]> {
        return this.firstaidRepository.find({order: { slNo: "DESC" },where: {'unitslno': unitslno }});
    }
    
    async findAllByEmployeId(eslno: number): Promise<Firstaidwb001[]> {
        return this.firstaidRepository.find();
    }

    findOne(id: number): Promise<Firstaidwb001> {
        return this.firstaidRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.firstaidRepository.delete(slNo);
    }


    async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {

        let fstaidmet = await this.firstaidRepository.find({            
            where: { unitslno:unitslno },
        });

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('fstaidmet.html', 'utf8');

        
        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {                  
               
        
                fstaidmetcheck: fstaidmet
             },
            path: "./pdf/fstaidmet.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "fstaidmet.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };


    }






    async downloadExcel(unitslno:any,@Req() request: Request, @Res() response: Response) {
        
        let fstaidmet = await this.firstaidRepository.find({
            where: { unitslno:unitslno },
        });



        if (fstaidmet.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Firstaidmaterial_Reports'); // creating worksheet
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
                { key: 'G', width: 45.0 },

            ];

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
            worksheet.mergeCells('C1:E2');
            worksheet.getCell('C1:E2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('C1:E2').fgColor = { argb: 'b03600' };  
            worksheet.getCell('C1:E2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C1:E2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('C3:E4');
            worksheet.getCell('C3:E4').value = "LIST OF FIRST AID MATERIALS DETAILS";
            worksheet.getCell('C3:E4').fgColor = { argb: '00b050' };  

            worksheet.getCell('C3:E4').font = {                
                size: 11,
                bold: true
            };
            worksheet.getCell('C3:E4').alignment = { vertical: 'middle', horizontal: 'center' };

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
            worksheet.getCell('B5').value = "First Aid Box Number";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Name of the Medicine";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Date";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Application";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "Location";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
       


            for (let i = 0; i < fstaidmet.length; i++) {


                
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = fstaidmet[i].fabxno;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = fstaidmet[i].mname;
                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = fstaidmet[i].date;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = fstaidmet[i].app;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = fstaidmet[i].loc;



            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }
    }
}

