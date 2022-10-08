import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConsigneeDTO } from "src/dto/Consignee.dto";
import { Consignee001mb } from "src/entity/Consignee001mb";
import { Repository } from "typeorm";

import { Response } from "express";
import { Request } from "supertest";
import { createReadStream } from "fs";
var path = require('path');
var fs = require('fs');
const excel = require('exceljs');
var pdf = require('dynamic-html-pdf');


@Injectable()
export class ConsigneeService {

    constructor(
        @InjectRepository(Consignee001mb) private readonly consigneeRepository: Repository<Consignee001mb>) {

    }
    
    async create(consigneeDTO: ConsigneeDTO): Promise<Consignee001mb> {
        const consignee001mb = new Consignee001mb();
        consignee001mb.setProperties(consigneeDTO);
        return this.consigneeRepository.save(consignee001mb);
    }

    async update(consigneeDTO: ConsigneeDTO): Promise<Consignee001mb> {
        const consignee001mb = new Consignee001mb();
        consignee001mb.setProperties(consigneeDTO);
        await this.consigneeRepository.update({ slNo: consignee001mb.slNo }, consignee001mb);
        return consignee001mb;
    }

    async findAllbyPurchaseOrderId(poslNo: number): Promise<Consignee001mb[]> {
        return this.consigneeRepository.find({order: { slNo: "DESC" }, select: ["slNo","consignee"], where: { "companySlno": poslNo } });
    }

    async findAllByconsignee(consigneeSlno: number): Promise<Consignee001mb[]> {
        return this.consigneeRepository.find({ relations: ["consigneeSlno2"],
        where:{"consigneeSlno": consigneeSlno}, });
    }

    async findAll(unitslno:any): Promise<Consignee001mb[]> {
        return await this.consigneeRepository.find({order: { slNo: "DESC" },relations: ["companySlno2"],where:{unitslno:unitslno}});
    }


    async remove(slNo: number): Promise<void> {
        await this.consigneeRepository.delete(slNo);
    }


async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {        
        let consignee = await this.consigneeRepository.find({relations: ["companySlno2"],where:{unitslno:unitslno}});

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('consignee.html', 'utf8');

        
        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {                                
                
                consigneecheck: consignee
             },
            path: "./pdf/consignee.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "consignee.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };


    }



    async downloadExcel(unitslno:any,@Req() request: Request, @Res() response: Response) {        
        let consignee = await this.consigneeRepository.find({relations: ["companySlno2"],where:{unitslno:unitslno}});

        if (consignee.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Consignee_Reports'); // creating worksheet
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
                { key: 'I', width: 45.0 },
                { key: 'J', width: 45.0 },
                { key: 'K', width: 45.0 },
                { key: 'L', width: 45.0 },
                { key: 'M', width: 45.0 }
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
            worksheet.mergeCells('C1:K2');
            worksheet.getCell('C1:K2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('C1:K2').fgColor = { argb: 'b03600' };  
            worksheet.getCell('C1:K2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C1:K2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('C3:K4');
            worksheet.getCell('C3:K4').value = "CONSIGNEE DETAILS";
            worksheet.getCell('C3:K4').fgColor = { argb: '00b050' };  

            worksheet.getCell('C3:K4').font = {                
                size: 11,
                bold: true
            };
            worksheet.getCell('C3:K4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('L1:M1');
            worksheet.getCell('L1:M1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('L1:M1').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('L2:M2');
            worksheet.getCell('L2:M2').value = "Issue Date : 01.02.2019";
            worksheet.getCell('L2:M2').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('L3:M3');
            worksheet.getCell('L3:M3').value = "Rev. No. 00	";
            worksheet.getCell('L3:M3').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('L4:M4');
            worksheet.getCell('L4:M4').value = "Rev Date :";
            worksheet.getCell('L4:M4').alignment = { vertical: 'left', horizontal: 'left' };


            worksheet.mergeCells('A5');
            worksheet.getCell('A5').value = "Sl. No";
            worksheet.getCell('A5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('B5');
            worksheet.getCell('B5').value = "Company Name";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Consignee";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Address1";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Address2";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "Address2";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "GSTIN";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('H5');
            worksheet.getCell('H5').value = "City";
            worksheet.getCell('H5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('I5');
            worksheet.getCell('I5').value = "State";
            worksheet.getCell('I5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('J5');
            worksheet.getCell('J5').value = "Country";
            worksheet.getCell('J5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('K5');
            worksheet.getCell('K5').value = "Pin Code";
            worksheet.getCell('K5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('L5');
            worksheet.getCell('L5').value = "Email ID";
            worksheet.getCell('L5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('M5');
            worksheet.getCell('M5').value = "Contact No";
            worksheet.getCell('M5').font = {
                size: 11,
                bold: true
            };
            for (let i = 0; i < consignee.length; i++) {
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = consignee[i].companySlno2.company;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = consignee[i].consignee;
                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = consignee[i].address1;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = consignee[i].address2;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = consignee[i].address3;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).value = consignee[i].gstIn;

                worksheet.mergeCells('H' + temp);
                worksheet.getCell('H' + temp).value = consignee[i].city;

                worksheet.mergeCells('I' + temp);
                worksheet.getCell('I' + temp).value = consignee[i].state;

                worksheet.mergeCells('J' + temp);
                worksheet.getCell('J' + temp).value = consignee[i].country;

                worksheet.mergeCells('K' + temp);
                worksheet.getCell('K' + temp).value = consignee[i].pinCode;

                worksheet.mergeCells('L' + temp);
                worksheet.getCell('L' + temp).value = consignee[i].emailId;

                worksheet.mergeCells('M' + temp);
                worksheet.getCell('M' + temp).value = consignee[i].contactNo;

            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });

        }
    }
}