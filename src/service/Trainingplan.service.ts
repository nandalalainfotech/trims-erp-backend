import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TrainingplanDTO } from "src/dto/Trainingplan.dto";
import { Trainingplan001mb } from "src/entity/Trainingplan001mb";
import { Repository } from "typeorm";

import { Response } from "express";
import { Request } from "supertest";
import { createReadStream } from "fs";
var path = require('path');
var fs = require('fs');
const excel = require('exceljs');
var pdf = require('dynamic-html-pdf');



@Injectable()
export class TrainingplanService {

    constructor(
        @InjectRepository(Trainingplan001mb) private readonly TrainingplanRepository: Repository<Trainingplan001mb>) {

    }

    async create(trainingplanDTO: TrainingplanDTO): Promise<Trainingplan001mb> {
        const trainingplan001mb = new Trainingplan001mb();
        trainingplan001mb.setProperties(trainingplanDTO);
        return this.TrainingplanRepository.save(trainingplan001mb);
    }

    async update(trainingplanDTO: TrainingplanDTO): Promise<Trainingplan001mb> {
        const trainingplan001mb = new Trainingplan001mb();
        trainingplan001mb.setProperties(trainingplanDTO);
        await this.TrainingplanRepository.update({ slNo: trainingplan001mb.slNo }, trainingplan001mb);
        return trainingplan001mb;
    }

    async findAll(unitslno:any): Promise<Trainingplan001mb[]> {
        return await this.TrainingplanRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno}});
    }

    findOne(id: number): Promise<Trainingplan001mb> {
        return this.TrainingplanRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.TrainingplanRepository.delete(id);
    }


    async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {
        
        let trainplan = await this.TrainingplanRepository.find({where:{unitslno:unitslno}});

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('trainplan.html', 'utf8');
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
                trainplancheck: trainplan
             },
            path: "./pdf/trainplan.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "trainplan.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };


    }









    async downloadExcel(unitslno:any,@Req() request: Request, @Res() response: Response) {
              
        let trainplan = await this.TrainingplanRepository.find({where:{unitslno:unitslno}});
        
        if (trainplan.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Supply_Activity_Reports'); // creating worksheet
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
                { key: 'B', width: 100.0 },
                { key: 'C', width: 45.0 },

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

            worksheet.mergeCells('B1:B2');
            worksheet.getCell('B1:B2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('B1:B2').fgColor = { argb: 'b03600' };  
            worksheet.getCell('B1:B2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('B1:B2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('B3:B4');
            worksheet.getCell('B3:B4').value = "SUPPLIER TRAINING PLAN DETAILS";
            worksheet.getCell('B3:B4').fgColor = { argb: '00b050' };  

            worksheet.getCell('B3:B4').font = {                
                size: 11,
                bold: true
            };
            worksheet.getCell('B3:B4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('C1:C1');
            worksheet.getCell('C1:C1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('C1:C1').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('C2:C2');
            worksheet.getCell('C2:C2').value = "Issue Date : 01.02.2019";
            worksheet.getCell('C2:C2').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('C3:C3');
            worksheet.getCell('C3:C3').value = "Rev. No. 00	";
            worksheet.getCell('C3:C3').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('C4:C4');
            worksheet.getCell('C4:C4').value = "Rev Date :";
            worksheet.getCell('C4:C4').alignment = { vertical: 'left', horizontal: 'left' };


            worksheet.mergeCells('A5');
            worksheet.getCell('A5').value = "Sl. No";
            worksheet.getCell('A5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('B5');
            worksheet.getCell('B5').value = "Name Of Training";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Status";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };






            for (let i = 0; i < trainplan.length; i++) {


                
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = trainplan[i].trainingname;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = trainplan[i].status;



            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }
    }
}