import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createReadStream } from "fs";
import { MaterialRequisitionSlipDTO } from "src/dto/material-req-slip.dto";
import { Materialreqslip001wb } from "src/entity/Materialreqslip001wb";
import { Repository } from "typeorm";


import { Response } from "express";
import { Request } from "supertest";
var path = require('path');
var fs = require('fs');
const excel = require('exceljs');
var pdf = require('dynamic-html-pdf');

@Injectable()
export class MaterialRequisitionSlipService {

    constructor(
        @InjectRepository(Materialreqslip001wb) private readonly MaterialinwardRepository: Repository<Materialreqslip001wb>) {
    }

    async create(materialReqDTO: MaterialRequisitionSlipDTO): Promise<Materialreqslip001wb> {
        const materialreqslip001wb = new Materialreqslip001wb();
        materialreqslip001wb.setProperties(materialReqDTO);
        return this.MaterialinwardRepository.save(materialreqslip001wb);
    }

    async update(materialReqDTO: MaterialRequisitionSlipDTO): Promise<Materialreqslip001wb> {
        const materialreqslip001wb = new Materialreqslip001wb();
        materialreqslip001wb.setProperties(materialReqDTO);
        await this.MaterialinwardRepository.update({ slNo: materialreqslip001wb.slNo }, materialreqslip001wb);
        return materialreqslip001wb;
    }

    async findAll(unitslno:any): Promise<Materialreqslip001wb[]> {
        return this.MaterialinwardRepository.find({order: { slNo: "DESC" }, relations: ["spareSlno2"],where:{unitslno:unitslno} });
    }

    findOne(id: number): Promise<Materialreqslip001wb> {
        return this.MaterialinwardRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.MaterialinwardRepository.delete(id);
    }


async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {        
        let materialreqslip = await this.MaterialinwardRepository.find({ relations: ["spareSlno2"] ,
        where:{unitslno:unitslno}
    });

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('materialreqslip.html', 'utf8');

        
        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {                                
                
                materialreqslipcheck: materialreqslip
             },
            path: "./pdf/materialreqslip.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "materialreqslip.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };


    }









    async downloadExcel(unitslno:any,@Req() request: Request, @Res() response: Response) {        
        let materialreqslip = await this.MaterialinwardRepository.find({ relations: ["spareSlno2"],
        where:{unitslno:unitslno}
     });

        if (materialreqslip.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Material_Requistion_Reports'); // creating worksheet
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
                { key: 'H', width: 45.0 },
                { key: 'I', width: 45.0 }];

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
            worksheet.mergeCells('C1:H2');
            worksheet.getCell('C1:H2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('C1:H2').fgColor = { argb: 'b03600' };  
            worksheet.getCell('C1:H2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C1:H2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('C3:H4');
            worksheet.getCell('C3:H4').value = "MATERIAL REQUISITION SLIP DETAILS";
            worksheet.getCell('C3:H4').fgColor = { argb: '00b050' };  

            worksheet.getCell('C3:H4').font = {                
                size: 11,
                bold: true
            };
            worksheet.getCell('C3:H4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('I1:I1');
            worksheet.getCell('I1:I1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('I1:I1').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('I2:I2');
            worksheet.getCell('I2:I2').value = "Issue Date : 01.02.2019";
            worksheet.getCell('I2:I2').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('I3:I3');
            worksheet.getCell('I3:I3').value = "Rev. No. 00	";
            worksheet.getCell('I3:I3').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('I4:I4');
            worksheet.getCell('I4:I4').value = "Rev Date :";
            worksheet.getCell('I4:I4').alignment = { vertical: 'left', horizontal: 'left' };


            worksheet.mergeCells('A5');
            worksheet.getCell('A5').value = "Sl. No";
            worksheet.getCell('A5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('B5');
            worksheet.getCell('B5').value = "MRS NO";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Date";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Requestor Name";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Department";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "Item Code";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "Description";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('H5');
            worksheet.getCell('H5').value = "Quantity/ Weight";
            worksheet.getCell('H5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('I5');
            worksheet.getCell('I5').value = "Remarks";
            worksheet.getCell('I5').font = {
                size: 11,
                bold: true
            };
  
         








            for (let i = 0; i < materialreqslip.length; i++) {


                
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = materialreqslip[i].mrsNo;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = materialreqslip[i].date;

                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = materialreqslip[i].requestorName;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = materialreqslip[i].department;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = materialreqslip[i].spareSlno2.spares;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).value = materialreqslip[i].description;

                worksheet.mergeCells('H' + temp);
                worksheet.getCell('H' + temp).value = materialreqslip[i].qty;

                worksheet.mergeCells('I' + temp);
                worksheet.getCell('I' + temp).value = materialreqslip[i].remarks;


            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }
    }
}