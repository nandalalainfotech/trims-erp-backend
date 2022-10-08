import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanydetailsDTO } from "src/dto/Companydetails.dto";
import { Companydetails001mb } from "src/entity/Companydetails001mb";
import { Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
import { createReadStream } from "fs";
var path = require('path');
var fs = require('fs');
const excel = require('exceljs');
var pdf = require('dynamic-html-pdf');


@Injectable()
export class CompanyService {

    constructor(
        @InjectRepository(Companydetails001mb) private readonly companyRepository: Repository<Companydetails001mb>) {

    }
    
    async create(companydetailsDTO: CompanydetailsDTO): Promise<Companydetails001mb> {
        const companydetails001mb = new Companydetails001mb();
        companydetails001mb.setProperties(companydetailsDTO);
        return this.companyRepository.save(companydetails001mb);
    }

    async update(companydetailsDTO: CompanydetailsDTO): Promise<Companydetails001mb> {
        const companydetails001mb = new Companydetails001mb();
        companydetails001mb.setProperties(companydetailsDTO);
        await this.companyRepository.update({ slNo: companydetails001mb.slNo }, companydetails001mb);
        return companydetails001mb;
    }

    async findAll(unitslno:any): Promise<Companydetails001mb[]> {
        return await this.companyRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno}});
    }

    async findAllBycompany(companySlno: number): Promise<Companydetails001mb[]> {
        return this.companyRepository.find({ relations: ["companySlno2"],order: { slNo: "DESC" },
        where:{"companySlno": companySlno}, });
    }

    async remove(slNo: number): Promise<void> {
        await this.companyRepository.delete(slNo);
    }


async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {        
        let companydetails = await this.companyRepository.find({where:{unitslno:unitslno}});

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('companydetails.html', 'utf8');

        
        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {                                
                
                companydetailscheck: companydetails
             },
            path: "./pdf/companydetails.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "companydetails.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };


    }









    async downloadExcel(unitslno:any,@Req() request: Request, @Res() response: Response) {        
        let companydetails = await this.companyRepository.find({where:{unitslno:unitslno}});

        if (companydetails.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Company_Details_Reports'); // creating worksheet
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
                { key: 'L', width: 45.0 }];

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
            worksheet.mergeCells('C1:J2');
            worksheet.getCell('C1:J2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('C1:J2').fgColor = { argb: 'b03600' };  
            worksheet.getCell('C1:J2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C1:J2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('C3:J4');
            worksheet.getCell('C3:J4').value = "COMPANY DETAILS";
            worksheet.getCell('C3:J4').fgColor = { argb: '00b050' };  

            worksheet.getCell('C3:J4').font = {                
                size: 11,
                bold: true
            };
            worksheet.getCell('C3:J4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('K1:L1');
            worksheet.getCell('K1:L1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('K1:L1').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('K2:L2');
            worksheet.getCell('K2:L2').value = "Issue Date : 01.02.2019";
            worksheet.getCell('K2:L2').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('K3:L3');
            worksheet.getCell('K3:L3').value = "Rev. No. 00	";
            worksheet.getCell('K3:L3').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('K4:L4');
            worksheet.getCell('K4:L4').value = "Rev Date :";
            worksheet.getCell('K4:L4').alignment = { vertical: 'left', horizontal: 'left' };


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
            worksheet.getCell('C5').value = "Address1";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Address2";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Address3";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "GSTIN";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "City";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('H5');
            worksheet.getCell('H5').value = "State";
            worksheet.getCell('H5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('I5');
            worksheet.getCell('I5').value = "Country";
            worksheet.getCell('I5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('J5');
            worksheet.getCell('J5').value = "Pin Code";
            worksheet.getCell('J5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('K5');
            worksheet.getCell('K5').value = "Email ID";
            worksheet.getCell('K5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('L5');
            worksheet.getCell('L5').value = "Contact No";
            worksheet.getCell('L5').font = {
                size: 11,
                bold: true
            };







            for (let i = 0; i < companydetails.length; i++) {


                
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = companydetails[i].company;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = companydetails[i].address1;
                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = companydetails[i].address2;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = companydetails[i].address3;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = companydetails[i].gstIn;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).value = companydetails[i].city;

                worksheet.mergeCells('H' + temp);
                worksheet.getCell('H' + temp).value = companydetails[i].state;

                worksheet.mergeCells('I' + temp);
                worksheet.getCell('I' + temp).value = companydetails[i].country;

                worksheet.mergeCells('J' + temp);
                worksheet.getCell('J' + temp).value = companydetails[i].pinCode;

                worksheet.mergeCells('K' + temp);
                worksheet.getCell('K' + temp).value = companydetails[i].emailId;

                worksheet.mergeCells('L' + temp);
                worksheet.getCell('L' + temp).value = companydetails[i].contactNo;

                



            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }
    }
}