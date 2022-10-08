import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { createReadStream } from "fs";
import { SupplierauditDTO } from "src/dto/supplieraudit.dto";
import { Supplieraudit001wb } from "src/entity/Supplieraudit001wb";
import { Request } from "supertest";
import { Between, LessThan, LessThanOrEqual, MoreThan, Repository } from "typeorm";
var path = require('path');
const excel = require('exceljs');
// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const PDFDocument = require("pdfkit-table");
var fs = require('fs');
// const ErrorResponse = require('../utils/errorResponse');
var fs = require('fs');
var pdf = require('dynamic-html-pdf');

@Injectable()
export class SupplierAuditService {
    constructor(
        @InjectRepository(Supplieraudit001wb) private readonly supplierAuditRepository: Repository<Supplieraudit001wb>) {
    }

    async create(supplierauditDTO: SupplierauditDTO): Promise<Supplieraudit001wb> {
        const supplieraudit001wb = new Supplieraudit001wb();
        supplieraudit001wb.setProperties(supplierauditDTO);
        return this.supplierAuditRepository.save(supplieraudit001wb);
    }

    async update(supplierauditDTO: SupplierauditDTO): Promise<Supplieraudit001wb> {
        const supplieraudit001wb = new Supplieraudit001wb();
        supplieraudit001wb.setProperties(supplierauditDTO);
        await this.supplierAuditRepository.update({ slNo: supplieraudit001wb.slNo },
            supplieraudit001wb);
        return supplieraudit001wb;
    }

    async findAll(): Promise<Supplieraudit001wb[]> {
        return this.supplierAuditRepository.find({ relations: ["supregslno2"] });
    }

    async findAllBySupplierId(supregslno: number,unitslno:any): Promise<Supplieraudit001wb[]> {
        return this.supplierAuditRepository.find({order: { slNo: "DESC" }, relations: ["supregslno2"], where: { "supregslno": supregslno,unitslno:unitslno } });
    }


    findOne(id: number): Promise<Supplieraudit001wb> {
        return this.supplierAuditRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.supplierAuditRepository.delete(id);
    }

    async findNotification(unitslno:any): Promise<Supplieraudit001wb[]> {
        const start = new Date();
        const end = new Date();
        end.setDate(end.getDate() + 3)
        const result = await this.supplierAuditRepository.find({
            relations: ["supregslno2"],
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

    async downloadPdf(supregslno: number, @Req() request: Request, @Res() response: Response) {

     let supPlan = await this.supplierAuditRepository.find({
    relations: ["supregslno2"],
    where: { supregslno },
    });

   
        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('supPlan.html', 'utf8');

        
        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {                  
               
                
                supPlancheck: supPlan
             },
            path: "./pdf/supPlan.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "supPlan.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };


    }


    async downloadExcel(supregslno: number, @Req() request: Request, @Res() response: Response) {
    let supPlan = await this.supplierAuditRepository.find({
    relations: ["supregslno2"],
    where: { supregslno },
    });
      if (supPlan.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('supPlan_reports'); // creating worksheet
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
            worksheet.getCell('B3:D4').value = "SUPPLIER AUDIT PLAN";
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
            worksheet.getCell('E2:E2').value = "Issue Date : 01.02.2022";
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
            worksheet.getCell('D5').value = " Status";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Date";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };

          
          
          
           
           




            for (let i = 0; i < supPlan.length; i++) {


                
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = supPlan[i].supregslno2.supplierCode;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = supPlan[i].supregslno2.supplierName;
                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = supPlan[i].status;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = supPlan[i].date;

               

            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }
    }
 
}
