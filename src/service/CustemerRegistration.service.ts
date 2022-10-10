import { HttpException, HttpStatus, Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getManager, Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
import { Between } from 'typeorm';
import { createReadStream } from "fs";
import { Custemerregistration001mb } from "src/entity/Custemerregistration001mb";
import { CustemerRegistrationDTO } from "src/dto/custemerRegistration.dto";
import { Customercontact001wb } from "src/entity/customercontact001wb";

var path = require('path');
const excel = require('exceljs');
var fs = require('fs');
var pdf = require('dynamic-html-pdf');


@Injectable()
export class CustemerRegistrationService {
    constructor(
        @InjectRepository(Custemerregistration001mb) private readonly custemerRegRepository: Repository<Custemerregistration001mb>,
        @InjectRepository(Customercontact001wb) private readonly CustomerContactRepository: Repository<Customercontact001wb>) {
    }
    customercontacts2
    async create(custemerRegDTO: CustemerRegistrationDTO): Promise<Custemerregistration001mb> {

        let customercontact001wbs: Customercontact001wb[] = [];

        for (let i = 0; i < custemerRegDTO.customercontact001wbs.length; i++) {

            const customercontact001wb = new Customercontact001wb();

            customercontact001wb.customerslNo2 = custemerRegDTO.customercontact001wbs[i].customerslNo2;
            customercontact001wb.pname = custemerRegDTO.customercontact001wbs[i].pname;
            customercontact001wb.designation = custemerRegDTO.customercontact001wbs[i].designation;
            customercontact001wb.department = custemerRegDTO.customercontact001wbs[i].department;
            customercontact001wb.level = custemerRegDTO.customercontact001wbs[i].level;
            customercontact001wb.mnumber = custemerRegDTO.customercontact001wbs[i].mnumber;
            customercontact001wb.altmnumber = custemerRegDTO.customercontact001wbs[i].altmnumber;
            customercontact001wb.mailid = custemerRegDTO.customercontact001wbs[i].mailid;
            customercontact001wb.unitslno = custemerRegDTO.unitslno;
            customercontact001wb.insertUser = custemerRegDTO.insertUser;
            customercontact001wb.insertDatetime = custemerRegDTO.insertDatetime;
            let customercontact = await this.CustomerContactRepository.save(customercontact001wb);
            customercontact001wbs.push(customercontact);
        }

        if (customercontact001wbs.length > 0) {

            const custemerregistration001mb = new Custemerregistration001mb();
            custemerregistration001mb.setProperties(custemerRegDTO);
            custemerregistration001mb.customercontact001wbs = customercontact001wbs;
            await this.custemerRegRepository.save(custemerregistration001mb);
            return custemerregistration001mb;
        } else {
            throw new HttpException('Please Enter Contact Details', HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    async update(custemerRegDTO: CustemerRegistrationDTO): Promise<Custemerregistration001mb> {

        for (let i = 0; i < custemerRegDTO.customercontact001wbs.length; i++) {

            const customercontact001wb = new Customercontact001wb();

            customercontact001wb.customerslNo = custemerRegDTO.customercontact001wbs[i].customerslNo;
            customercontact001wb.pname = custemerRegDTO.customercontact001wbs[i].pname;
            customercontact001wb.designation = custemerRegDTO.customercontact001wbs[i].designation;
            customercontact001wb.department = custemerRegDTO.customercontact001wbs[i].department;
            customercontact001wb.level = custemerRegDTO.customercontact001wbs[i].level;
            customercontact001wb.mnumber = custemerRegDTO.customercontact001wbs[i].mnumber;
            customercontact001wb.altmnumber = custemerRegDTO.customercontact001wbs[i].altmnumber;
            customercontact001wb.mailid = custemerRegDTO.customercontact001wbs[i].mailid;
            customercontact001wb.unitslno = custemerRegDTO.unitslno;
            customercontact001wb.updatedUser = custemerRegDTO.updatedUser;
            customercontact001wb.updatedDatetime = custemerRegDTO.updatedDatetime;

            await this.CustomerContactRepository.update({ slNo: custemerRegDTO.customercontact001wbs[i].slNo }, customercontact001wb);
        }

        const custemerregistration001mb = new Custemerregistration001mb();
        custemerregistration001mb.setProperties(custemerRegDTO);
        await this.custemerRegRepository.update({ slNo: custemerregistration001mb.slNo },
            custemerregistration001mb);
        return custemerregistration001mb;
    }

    async findAll(unitslno: any): Promise<Custemerregistration001mb[]> {
        return this.custemerRegRepository.find({ order: { slNo: "DESC" }, where: { unitslno: unitslno }, relations: ["customercontact001wbs"] });
    }

    async findAllSlNoAndSuppcode(): Promise<Custemerregistration001mb[]> {
        return this.custemerRegRepository.find();
    }

    findOne(id: number): Promise<Custemerregistration001mb> {
        return this.custemerRegRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.custemerRegRepository.delete(id);
    }

    async getCount(): Promise<string> {
        const entityManager = getManager();
        let result = await getManager().query('select count(*) as row from custemerregistration001mb', ['row']);
        var string = JSON.stringify(result);
        return string;
    }

    async downloadPdf(unitslno: any, @Req() request: Request, @Res() response: Response) {
        let customeReg = await this.custemerRegRepository.find({
            where: { unitslno: unitslno }, order: { slNo: "DESC" },
            relations: ["customercontact001wbs", "customerconsignee001mbs"]
        });

        let customerContacts = await this.CustomerContactRepository.find({ where: { unitslno: unitslno }, order: { slNo: "DESC" } });
       

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('customerRegistrations.html', 'utf8');
        let ItemslNo = 0;

        pdf.registerHelper("ifitemslno", function (orderslno, options) {
            ItemslNo = 0;
            this.slNo = ItemslNo;
            return options.fn(this,this.slNo);
        });

        pdf.registerHelper("ifSlno", function (orderslno, options) {
            this.slNo = ++ItemslNo;
            return options.fn(this,this.slNo);
        });

        var options = {
            format: "A3",
            orientation: "landscape",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {
                CustomeReg: customeReg,
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

    async downloadIDPdf(unitslno: any, id: any, @Req() request: Request, @Res() response: Response) {
        let customeReg = await this.custemerRegRepository.find({
            where: { slNo: id, unitslno: unitslno }, order: { slNo: "DESC" },
            relations: ["customercontact001wbs", "customerconsignee001mbs"]
        });

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('customerRegistration.html', 'utf8');
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
            orientation: "landscape",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {
                CustomeReg: customeReg
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
        let customeReg = await this.custemerRegRepository.find({
            where: { unitslno: unitslno }, order: { slNo: "DESC" },
            relations: ["customercontact001wbs", "customerconsignee001mbs"]
        });

        let workbook = new excel.Workbook();
        for (let i = 0; i < customeReg.length; i++) {

            let worksheet = workbook.addWorksheet('');
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
            worksheet.columns = [{ key: 'A', width: 25.0 },
            { key: 'B', width: 25.0 },
            { key: 'C', width: 25.0 },
            { key: 'D', width: 25.0 },
            { key: 'E', width: 25.0 },
            { key: 'F', width: 25.0 },
            { key: 'G', width: 25.0 },
            { key: 'H', width: 25.0 },];
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

            worksheet.mergeCells('C1:G2');
            worksheet.getCell('C1:G2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('C1:G2').font = {
                size: 14,
                bold: true
            };
            worksheet.getCell('C1:G2').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('C3:G4');
            worksheet.getCell('C3:G4').value = "CUSTOMER REGISTRATION DETAILS";
            worksheet.getCell('C3:G4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C3:G4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('H1');
            worksheet.getCell('H1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('H1').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet.mergeCells('H2');
            worksheet.getCell('H2').value = "Issue Date : ";
            worksheet.getCell('H2').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet.mergeCells('H3');
            worksheet.getCell('H3').value = "Rev. No. 00	";
            worksheet.getCell('H3').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet.mergeCells('H4');
            worksheet.getCell('H4').value = "Rev Date :";
            worksheet.getCell('H4').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet.mergeCells('A5:B5');
            worksheet.getCell('A5:B5').value = {
                richText: [
                    { text: "Customer Code:" + "\n\n" },
                    { font: { size: 11 }, text: "\n\n" + customeReg[i].custemercode },
                ],
            };

            worksheet.getCell('A5:B5').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("A5:B5").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('C5:D5');
            worksheet.getCell('C5:D5').value = {
                richText: [
                    { text: "Customer Name:" + "\n\n" },
                    { font: { size: 11 }, text: "\n\n" + customeReg[i].custemername },
                ],
            };

            worksheet.getCell('C5:D5').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("C5:D5").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('E5:F5');
            worksheet.getCell('E5:F5').value = {
                richText: [
                    { text: "Customer Address:" + "\n\n" },
                    { font: { size: 11 }, text: "\n\n" + customeReg[i].address },
                ],
            };

            worksheet.getCell('E5:F5').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("E5:F5").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('G5:H5');
            worksheet.getCell('G5:H5').value = {
                richText: [
                    { text: "GSTIN:" + "\n\n" },
                    { font: { size: 11 }, text: "\n\n" + customeReg[i].gstin },
                ],
            };
            worksheet.getCell('G5:H5').font = { size: 11, bold: true };
            worksheet.getCell("G5:H5").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('A6:B6');
            worksheet.getCell('A6:B6').value = {
                richText: [
                    { text: "If any Certifications:" + "\n\n" },
                    { font: { size: 11 }, text: "\n\n" + customeReg[i].certification },
                ],
            };
            worksheet.getCell('A6:B6').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("A6:B6").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('C6:D6');
            worksheet.getCell('C6:D6').value = {
                richText: [
                    { text: "Product Description:" + "\n\n" },
                    { font: { size: 11 }, text: "\n\n" + customeReg[i].productDesc },
                ],
            };
            worksheet.getCell('C6:D6').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("C6:D6").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('E6:F6');
            worksheet.getCell('E6:F6').value = {
                richText: [
                    { text: "Details of Present Reputed Customers:" + "\n\n" },
                    { font: { size: 11 }, text: "\n\n" + customeReg[i].reputedCust },
                ],
            };
            worksheet.getCell('E6:F6').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("E6:F6").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('G6:H6');
            worksheet.getCell('G6:H6').value = {
                richText: [
                    { text: "Sister Concerns if Any:" + "\n\n" },
                    { font: { size: 11 }, text: "\n\n" + customeReg[i].concern },
                ],
            };
            worksheet.getCell('G6:H6').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("G6:H6").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('A7:D7');
            worksheet.getCell('A7:D7').value = {
                richText: [
                    { text: "Web Site:" + "\n\n" },
                    { font: { size: 11 }, text: "\n\n" + customeReg[i].website },
                ],
            };
            worksheet.getCell('A7:D7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("A7:D7").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('E7:H7');
            worksheet.getCell('E7:H7').value = {
                richText: [
                    { text: "Other Informations:" + "\n\n" },
                    { font: { size: 11 }, text: "\n\n" + customeReg[i].otherInfo },
                ],
            };
            worksheet.getCell('E7:H7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("E7:H7").alignment = { vertical: "top", horizontal: "left", };


            worksheet.mergeCells("A8");
            worksheet.getCell("A8").value = "SlNo";
            worksheet.getCell("A8").font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("A8").alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };

            worksheet.mergeCells("B8");
            worksheet.getCell("B8").value = "Person Name";
            worksheet.getCell("B8").font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("B8").alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };

            worksheet.mergeCells("C8");
            worksheet.getCell("C8").value = "Designation";
            worksheet.getCell("C8").font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("C8").alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };

            worksheet.mergeCells("D8");
            worksheet.getCell("D8").value = "Department";
            worksheet.getCell("D8").font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("D8").alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };

            worksheet.mergeCells("E8");
            worksheet.getCell("E8").value = "Level";
            worksheet.getCell("E8").font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("E8").alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };

            worksheet.mergeCells("F8");
            worksheet.getCell("F8").value = "Contact No1";
            worksheet.getCell("F8").font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("F8").alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };

            worksheet.mergeCells("G8");
            worksheet.getCell("G8").value = "Contact No2";
            worksheet.getCell("G8").font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("G8").alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };


            worksheet.mergeCells("H8");
            worksheet.getCell("H8").value = "Mail Id";
            worksheet.getCell("H8").font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("H8").alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };

            for (let j = 0; j < customeReg[i].customercontact001wbs.length; j++) {


                let temp = j + 9;

                worksheet.mergeCells("A" + temp);
                worksheet.getCell("A" + temp).value = j + 1;
                worksheet.getCell("A" + temp).font = {
                    size: 12,
                    bold: true,
                };
                worksheet.getCell("A" + temp).alignment = {
                    vertical: "middle",
                    horizontal: "center",
                    wraptext: true,
                };

                worksheet.mergeCells("B" + temp);
                worksheet.getCell("B" + temp).value = customeReg[i].customercontact001wbs[j].pname;
                worksheet.getCell("B" + temp).font = {
                    size: 12,
                    bold: true,
                };
                worksheet.getCell("B" + temp).alignment = {
                    vertical: "middle",
                    horizontal: "center",
                    wraptext: true,
                };

                worksheet.mergeCells("C" + temp);
                worksheet.getCell("C" + temp).value = customeReg[i].customercontact001wbs[j].designation;
                worksheet.getCell("C" + temp).font = {
                    size: 12,
                    bold: true,
                };
                worksheet.getCell("C" + temp).alignment = {
                    vertical: "middle",
                    horizontal: "center",
                    wraptext: true,
                };

                worksheet.mergeCells("D" + temp);
                worksheet.getCell("D" + temp).value = customeReg[i].customercontact001wbs[j].department;
                worksheet.getCell("D" + temp).font = {
                    size: 12,
                    bold: true,
                };
                worksheet.getCell("D" + temp).alignment = {
                    vertical: "middle",
                    horizontal: "center",
                    wraptext: true,
                };

                worksheet.mergeCells("E" + temp);
                worksheet.getCell("E" + temp).value = customeReg[i].customercontact001wbs[j].level;
                worksheet.getCell("E" + temp).font = {
                    size: 12,
                    bold: true,
                };
                worksheet.getCell("E" + temp).alignment = {
                    vertical: "middle",
                    horizontal: "center",
                    wraptext: true,
                };

                worksheet.mergeCells("F" + temp);
                worksheet.getCell("F" + temp).value = customeReg[i].customercontact001wbs[j].mnumber;
                worksheet.getCell("F" + temp).font = {
                    size: 12,
                    bold: true,
                };
                worksheet.getCell("F" + temp).alignment = {
                    vertical: "middle",
                    horizontal: "center",
                    wraptext: true,
                };

                worksheet.mergeCells("G" + temp);
                worksheet.getCell("G" + temp).value = customeReg[i].customercontact001wbs[j].altmnumber;
                worksheet.getCell("G" + temp).font = {
                    size: 12,
                    bold: true,
                };
                worksheet.getCell("G" + temp).alignment = {
                    vertical: "middle",
                    horizontal: "center",
                    wraptext: true,
                };

                worksheet.mergeCells("H" + temp);
                worksheet.getCell("H" + temp).value = customeReg[i].customercontact001wbs[j].mailid;
                worksheet.getCell("H" + temp).font = {
                    size: 12,
                    bold: true,
                };
                worksheet.getCell("H" + temp).alignment = {
                    vertical: "middle",
                    horizontal: "center",
                    wraptext: true,
                };


            }

        }
        return workbook.xlsx.write(response).then(function () {
            response['status'](200).end();
        });
    }


    async downloadIDExcel(unitslno: any, id: any, @Req() request: Request, @Res() response: Response) {

        let customeReg = await this.custemerRegRepository.find({
            where: { slNo: id, unitslno: unitslno }, order: { slNo: "DESC" },
            relations: ["customercontact001wbs", "customerconsignee001mbs"]
        });

        let customeRegContact = await this.CustomerContactRepository.find();

        for (let i = 0; i < customeReg.length; i++) {

            customeRegContact = customeReg[i].customercontact001wbs;

            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('');
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
            worksheet.columns = [{ key: 'A', width: 25.0 },
            { key: 'B', width: 25.0 },
            { key: 'C', width: 25.0 },
            { key: 'D', width: 25.0 },
            { key: 'E', width: 25.0 },
            { key: 'F', width: 25.0 },
            { key: 'G', width: 25.0 },
            { key: 'H', width: 25.0 },];
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

            worksheet.mergeCells('C1:G2');
            worksheet.getCell('C1:G2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('C1:G2').font = {
                size: 14,
                bold: true
            };
            worksheet.getCell('C1:G2').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('C3:G4');
            worksheet.getCell('C3:G4').value = "CUSTOMER REGISTRATION DETAILS";
            worksheet.getCell('C3:G4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C3:G4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('H1');
            worksheet.getCell('H1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('H1').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet.mergeCells('H2');
            worksheet.getCell('H2').value = "Issue Date : ";
            worksheet.getCell('H2').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet.mergeCells('H3');
            worksheet.getCell('H3').value = "Rev. No. 00	";
            worksheet.getCell('H3').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet.mergeCells('H4');
            worksheet.getCell('H4').value = "Rev Date :";
            worksheet.getCell('H4').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet.mergeCells('A5:B5');
            worksheet.getCell('A5:B5').value = {
                richText: [
                    { text: "Customer Code:" + "\n\n" },
                    { font: { size: 11 }, text: "\n\n" + customeReg[i].custemercode },
                ],
            };

            worksheet.getCell('A5:B5').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("A5:B5").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('C5:D5');
            worksheet.getCell('C5:D5').value = {
                richText: [
                    { text: "Customer Name:" + "\n\n" },
                    { font: { size: 11 }, text: "\n\n" + customeReg[i].custemername },
                ],
            };

            worksheet.getCell('C5:D5').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("C5:D5").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('E5:F5');
            worksheet.getCell('E5:F5').value = {
                richText: [
                    { text: "Customer Address:" + "\n\n" },
                    { font: { size: 11 }, text: "\n\n" + customeReg[i].address },
                ],
            };

            worksheet.getCell('E5:F5').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("E5:F5").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('G5:H5');
            worksheet.getCell('G5:H5').value = {
                richText: [
                    { text: "GSTIN:" + "\n\n" },
                    { font: { size: 11 }, text: "\n\n" + customeReg[i].gstin },
                ],
            };
            worksheet.getCell('G5:H5').font = { size: 11, bold: true };
            worksheet.getCell("G5:H5").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('A6:B6');
            worksheet.getCell('A6:B6').value = {
                richText: [
                    { text: "If any Certifications:" + "\n\n" },
                    { font: { size: 11 }, text: "\n\n" + customeReg[i].certification },
                ],
            };
            worksheet.getCell('A6:B6').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("A6:B6").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('C6:D6');
            worksheet.getCell('C6:D6').value = {
                richText: [
                    { text: "Product Description:" + "\n\n" },
                    { font: { size: 11 }, text: "\n\n" + customeReg[i].productDesc },
                ],
            };
            worksheet.getCell('C6:D6').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("C6:D6").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('E6:F6');
            worksheet.getCell('E6:F6').value = {
                richText: [
                    { text: "Details of Present Reputed Customers:" + "\n\n" },
                    { font: { size: 11 }, text: "\n\n" + customeReg[i].reputedCust },
                ],
            };
            worksheet.getCell('E6:F6').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("E6:F6").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('G6:H6');
            worksheet.getCell('G6:H6').value = {
                richText: [
                    { text: "Sister Concerns if Any:" + "\n\n" },
                    { font: { size: 11 }, text: "\n\n" + customeReg[i].concern },
                ],
            };
            worksheet.getCell('G6:H6').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("G6:H6").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('A7:D7');
            worksheet.getCell('A7:D7').value = {
                richText: [
                    { text: "Web Site:" + "\n\n" },
                    { font: { size: 11 }, text: "\n\n" + customeReg[i].website },
                ],
            };
            worksheet.getCell('A7:D7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("A7:D7").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('E7:H7');
            worksheet.getCell('E7:H7').value = {
                richText: [
                    { text: "Other Informations:" + "\n\n" },
                    { font: { size: 11 }, text: "\n\n" + customeReg[i].otherInfo },
                ],
            };
            worksheet.getCell('E7:H7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("E7:H7").alignment = { vertical: "top", horizontal: "left", };


            worksheet.mergeCells("A8");
            worksheet.getCell("A8").value = "SlNo";
            worksheet.getCell("A8").font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("A8").alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };

            worksheet.mergeCells("B8");
            worksheet.getCell("B8").value = "Person Name";
            worksheet.getCell("B8").font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("B8").alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };

            worksheet.mergeCells("C8");
            worksheet.getCell("C8").value = "Designation";
            worksheet.getCell("C8").font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("C8").alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };

            worksheet.mergeCells("D8");
            worksheet.getCell("D8").value = "Department";
            worksheet.getCell("D8").font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("D8").alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };

            worksheet.mergeCells("E8");
            worksheet.getCell("E8").value = "Level";
            worksheet.getCell("E8").font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("E8").alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };

            worksheet.mergeCells("F8");
            worksheet.getCell("F8").value = "Contact No1";
            worksheet.getCell("F8").font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("F8").alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };

            worksheet.mergeCells("G8");
            worksheet.getCell("G8").value = "Contact No2";
            worksheet.getCell("G8").font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("G8").alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };


            worksheet.mergeCells("H8");
            worksheet.getCell("H8").value = "Mail Id";
            worksheet.getCell("H8").font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("H8").alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };

            for (let j = 0; j < customeRegContact.length; j++) {


                let temp = j + 9;


                worksheet.mergeCells("A" + temp);
                worksheet.getCell("A" + temp).value = j + 1;
                worksheet.getCell("A" + temp).font = {
                    size: 12,
                    bold: true,
                };
                worksheet.getCell("A" + temp).alignment = {
                    vertical: "middle",
                    horizontal: "center",
                    wraptext: true,
                };

                worksheet.mergeCells("B" + temp);
                worksheet.getCell("B" + temp).value = customeRegContact[j].pname;
                worksheet.getCell("B" + temp).font = {
                    size: 12,
                    bold: true,
                };
                worksheet.getCell("B" + temp).alignment = {
                    vertical: "middle",
                    horizontal: "center",
                    wraptext: true,
                };

                worksheet.mergeCells("C" + temp);
                worksheet.getCell("C" + temp).value = customeRegContact[j].designation;
                worksheet.getCell("C" + temp).font = {
                    size: 12,
                    bold: true,
                };
                worksheet.getCell("C" + temp).alignment = {
                    vertical: "middle",
                    horizontal: "center",
                    wraptext: true,
                };

                worksheet.mergeCells("D" + temp);
                worksheet.getCell("D" + temp).value = customeRegContact[j].department;
                worksheet.getCell("D" + temp).font = {
                    size: 12,
                    bold: true,
                };
                worksheet.getCell("D" + temp).alignment = {
                    vertical: "middle",
                    horizontal: "center",
                    wraptext: true,
                };

                worksheet.mergeCells("E" + temp);
                worksheet.getCell("E" + temp).value = customeRegContact[j].level;
                worksheet.getCell("E" + temp).font = {
                    size: 12,
                    bold: true,
                };
                worksheet.getCell("E" + temp).alignment = {
                    vertical: "middle",
                    horizontal: "center",
                    wraptext: true,
                };

                worksheet.mergeCells("F" + temp);
                worksheet.getCell("F" + temp).value = customeRegContact[j].mnumber;
                worksheet.getCell("F" + temp).font = {
                    size: 12,
                    bold: true,
                };
                worksheet.getCell("F" + temp).alignment = {
                    vertical: "middle",
                    horizontal: "center",
                    wraptext: true,
                };

                worksheet.mergeCells("G" + temp);
                worksheet.getCell("G" + temp).value = customeRegContact[j].altmnumber;
                worksheet.getCell("G" + temp).font = {
                    size: 12,
                    bold: true,
                };
                worksheet.getCell("G" + temp).alignment = {
                    vertical: "middle",
                    horizontal: "center",
                    wraptext: true,
                };

                worksheet.mergeCells("H" + temp);
                worksheet.getCell("H" + temp).value = customeRegContact[j].mailid;
                worksheet.getCell("H" + temp).font = {
                    size: 12,
                    bold: true,
                };
                worksheet.getCell("H" + temp).alignment = {
                    vertical: "middle",
                    horizontal: "center",
                    wraptext: true,
                };


            }


            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });
        }
    }

}

