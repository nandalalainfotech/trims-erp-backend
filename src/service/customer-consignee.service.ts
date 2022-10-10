import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerConsigneeDTO } from "src/dto/customer-consignee.dto";
import { Customerconsignee001mb } from "src/entity/Customerconsignee001mb";
import { Repository } from "typeorm";
var path = require('path');
const excel = require('exceljs');
var fs = require('fs');
var pdf = require('dynamic-html-pdf');
import { Response } from "express";
import { Request } from "supertest";
import { Between } from 'typeorm';
import { createReadStream } from "fs";

@Injectable()
export class CustomerConsigneeService {

    constructor(
        @InjectRepository(Customerconsignee001mb) private readonly CustomerConsigneeRepository: Repository<Customerconsignee001mb>) {

    }

    async create(customerConsigneeDTO: CustomerConsigneeDTO): Promise<Customerconsignee001mb> {
        const customerconsignee001mb = new Customerconsignee001mb();
        customerconsignee001mb.setProperties(customerConsigneeDTO);
        return this.CustomerConsigneeRepository.save(customerconsignee001mb);
    }

    async update(customerConsigneeDTO: CustomerConsigneeDTO): Promise<Customerconsignee001mb> {
        const customerconsignee001mb = new Customerconsignee001mb();
        customerconsignee001mb.setProperties(customerConsigneeDTO);
        await this.CustomerConsigneeRepository.update({ slNo: customerconsignee001mb.slNo }, customerconsignee001mb);
        return customerconsignee001mb;
    }

    async findAll(unitslno: any): Promise<Customerconsignee001mb[]> {
        return await this.CustomerConsigneeRepository.find({ order: { slNo: "DESC" }, relations: ["consigneeSlno2"], where: { unitslno: unitslno } });
    }
    

    findOne(id: number): Promise<Customerconsignee001mb> {
        return this.CustomerConsigneeRepository.findOne(id);
    }

    async remove(slNo: number): Promise<void> {
        await this.CustomerConsigneeRepository.delete(slNo);
    }

    async findAllbyConsigneeId(poslNo: number): Promise<Customerconsignee001mb[]> {
        return this.CustomerConsigneeRepository.find({ select: ["slNo", "consignee"], where: { "consigneeSlno": poslNo } });
    }

    async downloadPdf(unitslno: any, @Req() request: Request, @Res() response: Response) {
        let customerconsignee: any[] = await this.CustomerConsigneeRepository.find({ where: { unitslno: unitslno },
            relations: ["consigneeSlno2"]  });

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('customerConsignee.html', 'utf8');

        var options = {
            format: "A3",
            orientation: "potrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {

                customerconsignee: customerconsignee
            },
            path: "./pdf/suplreg.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "suplreg.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };
    }



    async downloadExcel(unitslno: any, @Req() request: Request, @Res() response: Response) {
        let customerconsignee = await this.CustomerConsigneeRepository.find({
             where: { unitslno: unitslno },relations: ["consigneeSlno2"] });



        if (customerconsignee.length < 0) {
            return;
        } else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Supply_Registartion_Reports'); // creating worksheet
            // worksheet.pageSetup.printArea = 'A1:AN213';
            worksheet.getRow(5).height = 20;
            worksheet.getRow(6).height = 20;
            worksheet.getRow(7).height = 20;
            worksheet.getRow(8).height = 20;
            worksheet.getRow(9).height = 20;
            worksheet.getRow(10).height = 20;
            worksheet.getRow(11).height = 20;
            worksheet.getRow(12).height = 20;
            worksheet.getRow(13).height = 20;
            worksheet.getRow(14).height = 20;
            worksheet.columns = [{ key: 'A', width: 10.0 },
            { key: 'B', width: 20.0 },
            { key: 'C', width: 20.0 },
            { key: 'D', width: 20.0 },
            { key: 'E', width: 20.0 },
            { key: 'F', width: 20.0 },
            { key: 'G', width: 20.0 },
            { key: 'H', width: 20.0 },
            { key: 'I', width: 20.0 },
            { key: 'J', width: 20.0 },
            { key: 'K', width: 20.0 },
            { key: 'L', width: 20.0 },
            { key: 'M', width: 20.0 },
            { key: 'N', width: 20.0 },
            { key: 'O', width: 20.0 },
            { key: 'P', width: 20.0 },
            { key: 'Q', width: 20.0 }];
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

            worksheet.mergeCells('C1:L2');
            worksheet.getCell('C1:L2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('C1:L2').font = {
                size: 14,
                bold: true
            };
            worksheet.getCell('C1:L2').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('C3:L4');
            worksheet.getCell('C3:L4').value = "CUSTOMER CONSIGNEE DETAILS";
            worksheet.getCell('C3:L4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C3:J4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('M1:N1');
            worksheet.getCell('M1:N1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('M1:N1').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet.mergeCells('M2:N2');
            worksheet.getCell('M2:N2').value = "Issue Date : ";
            worksheet.getCell('M2:N2').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet.mergeCells('M3:N3');
            worksheet.getCell('M3:N3').value = "Rev. No. 00	";
            worksheet.getCell('M3:N3').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet.mergeCells('M4:N4');
            worksheet.getCell('M4:N4').value = "Rev Date :";
            worksheet.getCell('M4:N4').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet.mergeCells('A5');
            worksheet.getCell('A5').value = "Sl. No";
            worksheet.getCell('A5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('B5');
            worksheet.getCell('B5').value = "Customer Code";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Company Name";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Consignee";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true


            };

            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Address 1";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "Address 2";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "Address 3";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('H5');
            worksheet.getCell('H5').value = "GST IN";
            worksheet.getCell('H5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('I5');
            worksheet.getCell('I5').value = "City";
            worksheet.getCell('I5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('J5');
            worksheet.getCell('J5').value = "State";
            worksheet.getCell('J5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('K5');
            worksheet.getCell('K5').value = "Country";
            worksheet.getCell('K5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('L5');
            worksheet.getCell('L5').value = "Pin code";
            worksheet.getCell('L5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('M5');
            worksheet.getCell('M5').value = "Email ID";
            worksheet.getCell('M5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('N5');
            worksheet.getCell('N5').value = "Contact No";
            worksheet.getCell('N5').font = {
                size: 11,
                bold: true
            };


            worksheet.mergeCells('R5');


            for (let i = 0; i < customerconsignee.length; i++) {
                let temp = i + 6;
                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = customerconsignee[i].consigneeSlno2.custemercode;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = customerconsignee[i].consigneeSlno2.custemername;


                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = customerconsignee[i].consignee;


                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = customerconsignee[i].address1;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = customerconsignee[i].address2;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).value = customerconsignee[i].address3;

                worksheet.mergeCells('H' + temp);
                worksheet.getCell('H' + temp).value = customerconsignee[i].gstIn;

                worksheet.mergeCells('I' + temp);
                worksheet.getCell('I' + temp).value = customerconsignee[i].city;

                worksheet.mergeCells('J' + temp);
                worksheet.getCell('J' + temp).value = customerconsignee[i].state;

                worksheet.mergeCells('K' + temp);
                worksheet.getCell('K' + temp).value = customerconsignee[i].country;

                worksheet.mergeCells('L' + temp);
                worksheet.getCell('L' + temp).value = customerconsignee[i].pinCode;

                worksheet.mergeCells('M' + temp);
                worksheet.getCell('M' + temp).value = customerconsignee[i].emailId;

                worksheet.mergeCells('N' + temp);
                worksheet.getCell('N' + temp).value = customerconsignee[i].contactNo;


            }

            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });
        }
    }
}