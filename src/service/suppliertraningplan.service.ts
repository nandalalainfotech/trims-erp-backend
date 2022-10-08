import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createReadStream } from "fs";
import { SuppliertrainingplanDTO } from "src/dto/Suppliertraningplan.dto";
import { Suppliertrainingplan001wb } from "src/entity/Suppliertrainingplan001wb";
import { Between, Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
var path = require('path');
const excel = require('exceljs');
@Injectable()
export class SuppliertrainingService {

    constructor(
        @InjectRepository(Suppliertrainingplan001wb) private readonly SuppliertrainingRepository: Repository<Suppliertrainingplan001wb>) {

    }

    async create(suppliertrainingplanDTO: SuppliertrainingplanDTO): Promise<Suppliertrainingplan001wb> {
        const suppliertrainingplan001wb = new Suppliertrainingplan001wb();
        suppliertrainingplan001wb.setProperties(suppliertrainingplanDTO);
        return this.SuppliertrainingRepository.save(suppliertrainingplan001wb);
    }

    async update(suppliertrainingplanDTO: SuppliertrainingplanDTO): Promise<Suppliertrainingplan001wb> {
        const suppliertrainingplan001wb = new Suppliertrainingplan001wb();
        suppliertrainingplan001wb.setProperties(suppliertrainingplanDTO);
        await this.SuppliertrainingRepository.update({ slNo: suppliertrainingplan001wb.slNo }, suppliertrainingplan001wb);
        return suppliertrainingplan001wb;
    }

    async findAllBySupplierId(supregslno: number,unitslno:any): Promise<Suppliertrainingplan001wb[]> {
        return this.SuppliertrainingRepository.find({ order: { slNo: "DESC" },relations: ["supregslNo2", "trainingslNo2"], where: { "supregslNo": supregslno,unitslno:unitslno } });
    }

    async findAll(unitslno:any): Promise<Suppliertrainingplan001wb[]> {
        return await this.SuppliertrainingRepository.find({ order: { slNo: "DESC" },relations: ["supregslNo2", "trainingslNo2"],where:{unitslno:unitslno} });
    }

    findOne(id: number): Promise<Suppliertrainingplan001wb> {
        return this.SuppliertrainingRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.SuppliertrainingRepository.delete(id);
    }

    async NotificationAll(unitslno:any): Promise<Suppliertrainingplan001wb[]> {
        const start = new Date();
        const end = new Date();
        end.setDate(end.getDate() + 3)
        const result = await this.SuppliertrainingRepository.find({
            relations: ["supregslNo2"],
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
   
   
    async downloadPdf(supregslNo: number, @Req() request: Request, @Res() response: Response) {
        let supTrainPlan = await this.SuppliertrainingRepository.find({
                    relations: ["supregslNo2", "trainingslNo2"], where: { supregslNo },
                 });

   
        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('supTrainPlan.html', 'utf8');

        
        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {                  
               
                
                supTrainPlancheck: supTrainPlan
             },
            path: "./pdf/supTrainPlan.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "supTrainPlan.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };


    }


    async downloadExcel(supregslNo: number, @Req() request: Request, @Res() response: Response) {
                let supTrainPlan = await this.SuppliertrainingRepository.find({
                     relations: ["supregslNo2", "trainingslNo2"], where: { supregslNo },
                 });
      if (supTrainPlan.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('supTrainPlan_reports'); // creating worksheet
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
            worksheet.getCell('B3:E4').value = "SUPPLIER TRAINING PLAN";
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
            worksheet.getCell('B5').value = "SUPPLIER CODE";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = " SUPPLIER NAME";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = " TRAINING NAME";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Status";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "Date";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
          
          
           
           




            for (let i = 0; i < supTrainPlan.length; i++) {


                
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = supTrainPlan[i].supregslNo2.supplierCode 

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = supTrainPlan[i].supregslNo2.supplierName;
                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = supTrainPlan[i].trainingslNo2.trainingname;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = supTrainPlan[i].status;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = supTrainPlan[i].date;

            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }
    }
 
}
