import { HttpException, HttpStatus, Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SupplierRegistrationDTO } from "src/dto/supplier-registration.dto";
import { Supplierregistration001mb } from "src/entity/Supplierregistration001mb";
import { getManager, Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
import { Between } from 'typeorm';
import { createReadStream } from "fs";
import { Suppliercontact001wb } from "src/entity/Suppliercontact001wb";

var path = require('path');
const excel = require('exceljs');
var fs = require('fs');
var pdf = require('dynamic-html-pdf');


@Injectable()
export class SupplierRegistrationService {
    constructor(
        @InjectRepository(Supplierregistration001mb) private readonly supplierRegRepository: Repository<Supplierregistration001mb>,
        @InjectRepository(Suppliercontact001wb) private readonly SupplierContactRepository: Repository<Suppliercontact001wb>) {
    }


    async create(supplierRegDTO: SupplierRegistrationDTO): Promise<Supplierregistration001mb> {


        let suppliercontact001wbs: Suppliercontact001wb[] = [];

        for (let i = 0; i < supplierRegDTO.suppliercontact001wbs.length; i++) {

            const suppliercontact001wb = new Suppliercontact001wb();

            suppliercontact001wb.supplierslNo2 = supplierRegDTO.suppliercontact001wbs[i].supplierslNo2;
            suppliercontact001wb.pname = supplierRegDTO.suppliercontact001wbs[i].pname;
            suppliercontact001wb.designation = supplierRegDTO.suppliercontact001wbs[i].designation;
            suppliercontact001wb.department = supplierRegDTO.suppliercontact001wbs[i].department;
            suppliercontact001wb.level = supplierRegDTO.suppliercontact001wbs[i].level;
            suppliercontact001wb.mnumber = supplierRegDTO.suppliercontact001wbs[i].mnumber;
            suppliercontact001wb.altmnumber = supplierRegDTO.suppliercontact001wbs[i].altmnumber;
            suppliercontact001wb.mailid = supplierRegDTO.suppliercontact001wbs[i].mailid;
            suppliercontact001wb.unitslno = supplierRegDTO.unitslno;
            suppliercontact001wb.insertUser = supplierRegDTO.insertUser;
            suppliercontact001wb.insertDatetime = supplierRegDTO.insertDatetime;
            let supcontact = await this.SupplierContactRepository.save(suppliercontact001wb);
            suppliercontact001wbs.push(supcontact);
        }

        if (suppliercontact001wbs.length > 0) {

            const supplierregistration001mb = new Supplierregistration001mb();
            supplierregistration001mb.setProperties(supplierRegDTO);
            supplierregistration001mb.suppliercontact001wbs = suppliercontact001wbs;
            await this.supplierRegRepository.save(supplierregistration001mb);
            return supplierregistration001mb;
        }else{
            throw new HttpException('Please Enter Contact Details', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async create2(file: any,supplierRegDTO: SupplierRegistrationDTO): Promise<Supplierregistration001mb> {
        let supplierregistration001mb = new Supplierregistration001mb();
        supplierregistration001mb.setProperties(supplierRegDTO);
        supplierregistration001mb = await this.supplierRegRepository.findOne({ where: { slNo: supplierRegDTO.slNo } });
        supplierregistration001mb.originalfilename = file.filename;
        await this.supplierRegRepository.update({ slNo: supplierRegDTO.slNo },supplierregistration001mb);
        return supplierregistration001mb;
     }

    

    async update(supplierRegDTO: SupplierRegistrationDTO): Promise<Supplierregistration001mb> {

        for (let i = 0; i < supplierRegDTO.suppliercontact001wbs.length; i++) {

            const suppliercontact001wb = new Suppliercontact001wb();

            suppliercontact001wb.supplierslNo = supplierRegDTO.suppliercontact001wbs[i].supplierslNo;
            suppliercontact001wb.pname = supplierRegDTO.suppliercontact001wbs[i].pname;
            suppliercontact001wb.designation = supplierRegDTO.suppliercontact001wbs[i].designation;
            suppliercontact001wb.department = supplierRegDTO.suppliercontact001wbs[i].department;
            suppliercontact001wb.level = supplierRegDTO.suppliercontact001wbs[i].level;
            suppliercontact001wb.mnumber = supplierRegDTO.suppliercontact001wbs[i].mnumber;
            suppliercontact001wb.altmnumber = supplierRegDTO.suppliercontact001wbs[i].altmnumber;
            suppliercontact001wb.mailid = supplierRegDTO.suppliercontact001wbs[i].mailid;
            suppliercontact001wb.unitslno = supplierRegDTO.unitslno;
            suppliercontact001wb.updatedUser = supplierRegDTO.updatedUser;
            suppliercontact001wb.updatedDatetime = supplierRegDTO.updatedDatetime;

            await this.SupplierContactRepository.update({ slNo: supplierRegDTO.suppliercontact001wbs[i].slNo }, suppliercontact001wb);
        }

        const supplierregistration001mb = new Supplierregistration001mb();
        supplierregistration001mb.setProperties(supplierRegDTO);
        await this.supplierRegRepository.update({ slNo: supplierregistration001mb.slNo },
            supplierregistration001mb);
        return supplierregistration001mb;
    }

    async getCount(): Promise<string> {
        const entityManager = getManager();
        let result = await getManager().query('select count(*) as row from supplierregistration001mb', ['row']);
        var string = JSON.stringify(result);
        return string;
    }

    async findAll(unitslno:any): Promise<Supplierregistration001mb[]> {
        return this.supplierRegRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno}, relations: ["suppliercontact001wbs"]});
    }

    async findAllSlNoAndSuppcode(unitslno:any): Promise<Supplierregistration001mb[]> {
        return this.supplierRegRepository.find({order: { slNo: "DESC" },select : ['slNo', 'supplierName','supplierCode'], where:{unitslno:unitslno}});
    }

    findOne(id: number): Promise<Supplierregistration001mb> {
        return this.supplierRegRepository.findOne(id);
    }

    findimg(img: any,@Req() request: Request, @Res() response: Response) {
         response.sendFile(img, { root: './uploads'});
    }

    async remove(id: string): Promise<void> {
        await this.supplierRegRepository.delete(id);
    }


 async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {
        let suplreg: any[] = await this.supplierRegRepository.find({where:{unitslno:unitslno }, order: { slNo: "DESC" }, relations: ["suppliercontact001wbs"] });
        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('suplregs.html', 'utf8');
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
                
                Suplreg: suplreg
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
        let suplreg = await this.supplierRegRepository.find({ where: { slNo: id, unitslno: unitslno }, order: { slNo: "DESC" }, relations: ["suppliercontact001wbs"] });

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('suplreg.html', 'utf8');
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

                Suplreg: suplreg
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
        let suplreg = await this.supplierRegRepository.find({ where: { unitslno: unitslno }, order: { slNo: "DESC" }, relations: ["suppliercontact001wbs"] });


        let workbook = new excel.Workbook();

        for (let i = 0; i < suplreg.length; i++) {
            let worksheet = workbook.addWorksheet('Supplier-Registration-Reports' + i); // creating worksheet
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
            worksheet.columns = [{ key: 'A', width: 24.0 },
            { key: 'B', width: 24.0 },
            { key: 'C', width: 24.0 },
            { key: 'D', width: 24.0 },
            { key: 'E', width: 24.0 },
            { key: 'F', width: 24.0 },
            { key: 'G', width: 24.0 },
            { key: 'H', width: 30.0 },
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

            worksheet.mergeCells('C1:G2');
            worksheet.getCell('C1:G2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('C1:G2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C1:G2').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('C3:G4');
            worksheet.getCell('C3:G4').value = "SUPPLY REGISTRATION DETAILS";
            worksheet.getCell('C3:G4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C3:G4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('H1');
            worksheet.getCell('H1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('H1').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet.mergeCells('H2');
            worksheet.getCell('H2').value = "Issue Date : 01.02.2019";
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
                    { text: "Supplier Code:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].supplierCode },
                ],
            };
            worksheet.getCell('A5:B5').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("A5:B5").alignment = { vertical: "top", horizontal: "left", };


            worksheet.mergeCells('C5:E5');
            worksheet.getCell('C5:E5').value = {
                richText: [
                    { text: "Supplier Name:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].supplierName },
                ],
            };
            worksheet.getCell('C5:E5').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("C5:E5").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('F5:G5');
            worksheet.getCell('F5:G5').value = {
                richText: [
                    { text: "Address:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].address },
                ],
            };
            worksheet.getCell('F5:G5').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("F5:G5").alignment = { vertical: "top", horizontal: "left", };


            worksheet.mergeCells('H5');
            worksheet.getCell('H5').value = {
                richText: [
                    { text: "Contact Details:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].contact },
                ],
            };
            worksheet.getCell('H5').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("H5").alignment = { vertical: "top", horizontal: "left", };


            worksheet.mergeCells('A6:B6');
            worksheet.getCell('A6:B6').value = {
                richText: [
                    { text: "GSTIN:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].gstin },
                ],
            };
            worksheet.getCell('A6:B6').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("A6:B6").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('C6:E6');
            worksheet.getCell('C6:E6').value = {
                richText: [
                    { text: "If any Certifications:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].certification },
                ],
            };
            worksheet.getCell('C6:E6').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("C6:E6").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('F6:G6');
            worksheet.getCell('F6:G6').value = {
                richText: [
                    { text: "Nature of Supplier:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].nature },
                ],
            };
            worksheet.getCell('F6:G6').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("F6:G6").alignment = { vertical: "top", horizontal: "left", };


            worksheet.mergeCells('H6');
            worksheet.getCell('H6').value = {
                richText: [
                    { text: "Product Description:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].productDesc },
                ],
            };
            worksheet.getCell('H6').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("H6").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('A7:B7');
            worksheet.getCell('A7:B7').value = {
                richText: [
                    { text: "Details of Present Reputed Customers:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].reputedCust },
                ],
            };
            worksheet.getCell('A7:B7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("A7:B7").alignment = { vertical: "top", horizontal: "left", };


            worksheet.mergeCells('C7:E7');
            worksheet.getCell('C7:E7').value = {
                richText: [
                    { text: "Sister Concerns if Any:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].concern },
                ],
            };
            worksheet.getCell('C7:E7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("C7:E7").alignment = { vertical: "top", horizontal: "left", };


            worksheet.mergeCells('F7:G7');
            worksheet.getCell('F7:G7').value = {
                richText: [
                    { text: "Other Informations:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].otherInfo },
                ],
            };
            worksheet.getCell('F7:G7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("F7:G7").alignment = { vertical: "top", horizontal: "left", };


            worksheet.mergeCells('H7');
            worksheet.getCell('H7').value = {
                richText: [
                    { text: "Web Site:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].website },
                ],
            };
            worksheet.getCell('H7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("H7").alignment = { vertical: "top", horizontal: "left", };


            worksheet.mergeCells('A8:B8');
            worksheet.getCell('A8:B8').value = {
                richText: [
                    { text: "Select Category:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].supcategory },
                ],
            };
            worksheet.getCell('A8:B8').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("A8:B8").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('C8:E8');
            worksheet.getCell('C8:E8').value = {
                richText: [
                    { text: "Account Name:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].acName },
                ],
            };
            worksheet.getCell('C8:E8').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("C8:E8").alignment = { vertical: "top", horizontal: "left", };


            worksheet.mergeCells('F8:G8');
            worksheet.getCell('F8:G8').value = {
                richText: [
                    { text: "Bank Name:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].bankName },
                ],
            };
            worksheet.getCell('F8:G8').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("F8:G8").alignment = { vertical: "top", horizontal: "left", };


            worksheet.mergeCells('H8');
            worksheet.getCell('H8').value = {
                richText: [
                    { text: "Branch Name:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].branch },
                ],
            };
            worksheet.getCell('H8').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("H8").alignment = { vertical: "top", horizontal: "left", };


            worksheet.mergeCells('A9:D9');
            worksheet.getCell('A9:D9').value = {
                richText: [
                    { text: "Account Number:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].acNo },
                ],
            };
            worksheet.getCell('A9:D9').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("A9:D9").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('E9:H9');
            worksheet.getCell('E9:H9').value = {
                richText: [
                    { text: "IFSC Code:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].ifscCode },
                ],
            };
            worksheet.getCell('E9:H9').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("E9:H9").alignment = { vertical: "top", horizontal: "left", };



            worksheet.mergeCells('A10');
            worksheet.getCell('A10').value = "Sl-No";
            worksheet.getCell('A10').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('B10');
            worksheet.getCell('B10').value = "Person Name";
            worksheet.getCell('B10').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C10');
            worksheet.getCell('C10').value = "Designation";
            worksheet.getCell('C10').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('D10');
            worksheet.getCell('D10').value = "Department";
            worksheet.getCell('D10').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('E10');
            worksheet.getCell('E10').value = "Level";
            worksheet.getCell('E10').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('F10');
            worksheet.getCell('F10').value = "Mobile Number";
            worksheet.getCell('F10').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('G10');
            worksheet.getCell('G10').value = "Telephone";
            worksheet.getCell('G10').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('H10');
            worksheet.getCell('H10').value = "Mail Id";
            worksheet.getCell('H10').font = {
                size: 11,
                bold: true
            };

            for (let j = 0; j < suplreg[i].suppliercontact001wbs.length; j++) {

                let temp = j + 11;

                worksheet.mergeCells("A" + temp);
                worksheet.getCell("A" + temp).value = j + 1,
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
                worksheet.getCell("B" + temp).value = suplreg[i].suppliercontact001wbs[j].pname,
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
                worksheet.getCell("C" + temp).value = suplreg[i].suppliercontact001wbs[j].designation,
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
                worksheet.getCell("D" + temp).value = suplreg[i].suppliercontact001wbs[j].department,
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
                worksheet.getCell("E" + temp).value = suplreg[i].suppliercontact001wbs[j].level,
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
                worksheet.getCell("F" + temp).value = suplreg[i].suppliercontact001wbs[j].mnumber,
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
                worksheet.getCell("G" + temp).value = suplreg[i].suppliercontact001wbs[j].altmnumber,
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
                worksheet.getCell("H" + temp).value = suplreg[i].suppliercontact001wbs[j].mailid,
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
        let suplreg = await this.supplierRegRepository.find({ where: { slNo: id, unitslno: unitslno }, order: { slNo: "DESC" }, relations: ["suppliercontact001wbs"] });

        let supContact = await this.SupplierContactRepository.find();
        

        for (let i = 0; i < suplreg.length; i++) {

            supContact = suplreg[i].suppliercontact001wbs;

            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Supplier-Registration-Reports'); // creating worksheet
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
            worksheet.columns = [{ key: 'A', width: 24.0 },
            { key: 'B', width: 24.0 },
            { key: 'C', width: 24.0 },
            { key: 'D', width: 24.0 },
            { key: 'E', width: 24.0 },
            { key: 'F', width: 24.0 },
            { key: 'G', width: 24.0 },
            { key: 'H', width: 30.0 },
            ];
            worksheet.columns.forEach((col) => {

                col.style.font = {
                    size: 7,
                    bold: true
                };
                col.style.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true};
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
                size: 11,
                bold: true
            };
            worksheet.getCell('C1:G2').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('C3:G4');
            worksheet.getCell('C3:G4').value = "SUPPLY REGISTRATION DETAILS";
            worksheet.getCell('C3:G4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C3:G4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('H1');
            worksheet.getCell('H1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('H1').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet.mergeCells('H2');
            worksheet.getCell('H2').value = "Issue Date : 01.02.2019";
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
                    { text: "Supplier Code:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].supplierCode },
                ],
            };
            worksheet.getCell('A5:B5').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("A5:B5").alignment = { vertical: "top", horizontal: "left", };


            worksheet.mergeCells('C5:E5');
            worksheet.getCell('C5:E5').value = {
                richText: [
                    { text: "Supplier Name:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].supplierName },
                ],
            };
            worksheet.getCell('C5:E5').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("C5:E5").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('F5:G5');
            worksheet.getCell('F5:G5').value = {
                richText: [
                    { text: "Address:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].address },
                ],
            };
            worksheet.getCell('F5:G5').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("F5:G5").alignment = { vertical: "top", horizontal: "left", };


            worksheet.mergeCells('H5');
            worksheet.getCell('H5').value = {
                richText: [
                    { text: "Contact Details:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].contact },
                ],
            };
            worksheet.getCell('H5').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("H5").alignment = { vertical: "top", horizontal: "left", };


            worksheet.mergeCells('A6:B6');
            worksheet.getCell('A6:B6').value = {
                richText: [
                    { text: "GSTIN:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].gstin },
                ],
            };
            worksheet.getCell('A6:B6').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("A6:B6").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('C6:E6');
            worksheet.getCell('C6:E6').value = {
                richText: [
                    { text: "If any Certifications:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].certification },
                ],
            };
            worksheet.getCell('C6:E6').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("C6:E6").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('F6:G6');
            worksheet.getCell('F6:G6').value = {
                richText: [
                    { text: "Nature of Supplier:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].nature },
                ],
            };
            worksheet.getCell('F6:G6').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("F6:G6").alignment = { vertical: "top", horizontal: "left", };


            worksheet.mergeCells('H6');
            worksheet.getCell('H6').value = {
                richText: [
                    { text: "Product Description:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].productDesc },
                ],
            };
            worksheet.getCell('H6').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("H6").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('A7:B7');
            worksheet.getCell('A7:B7').value = {
                richText: [
                    { text: "Details of Present Reputed Customers:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].reputedCust },
                ],
            };
            worksheet.getCell('A7:B7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("A7:B7").alignment = { vertical: "top", horizontal: "left", };


            worksheet.mergeCells('C7:E7');
            worksheet.getCell('C7:E7').value = {
                richText: [
                    { text: "Sister Concerns if Any:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].concern },
                ],
            };
            worksheet.getCell('C7:E7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("C7:E7").alignment = { vertical: "top", horizontal: "left", };


            worksheet.mergeCells('F7:G7');
            worksheet.getCell('F7:G7').value = {
                richText: [
                    { text: "Other Informations:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].otherInfo },
                ],
            };
            worksheet.getCell('F7:G7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("F7:G7").alignment = { vertical: "top", horizontal: "left", };


            worksheet.mergeCells('H7');
            worksheet.getCell('H7').value = {
                richText: [
                    { text: "Web Site:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].website },
                ],
            };
            worksheet.getCell('H7').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("H7").alignment = { vertical: "top", horizontal: "left", };


            worksheet.mergeCells('A8:B8');
            worksheet.getCell('A8:B8').value = {
                richText: [
                    { text: "Select Category:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].supcategory },
                ],
            };
            worksheet.getCell('A8:B8').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("A8:B8").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('C8:E8');
            worksheet.getCell('C8:E8').value = {
                richText: [
                    { text: "Account Name:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].acName },
                ],
            };
            worksheet.getCell('C8:E8').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("C8:E8").alignment = { vertical: "top", horizontal: "left", };


            worksheet.mergeCells('F8:G8');
            worksheet.getCell('F8:G8').value = {
                richText: [
                    { text: "Bank Name:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].bankName },
                ],
            };
            worksheet.getCell('F8:G8').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("F8:G8").alignment = { vertical: "top", horizontal: "left", };


            worksheet.mergeCells('H8');
            worksheet.getCell('H8').value = {
                richText: [
                    { text: "Branch Name:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].branch },
                ],
            };
            worksheet.getCell('H8').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("H8").alignment = { vertical: "top", horizontal: "left", };


            worksheet.mergeCells('A9:D9');
            worksheet.getCell('A9:D9').value = {
                richText: [
                    { text: "Account Number:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].acNo },
                ],
            };
            worksheet.getCell('A9:D9').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("A9:D9").alignment = { vertical: "top", horizontal: "left", };

            worksheet.mergeCells('E9:H9');
            worksheet.getCell('E9:H9').value = {
                richText: [
                    { text: "IFSC Code:" + "\n\n" },
                    { font: { size: 11 }, text: suplreg[i].ifscCode },
                ],
            };
            worksheet.getCell('E9:H9').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("E9:H9").alignment = { vertical: "top", horizontal: "left", };



            worksheet.mergeCells('A10');
            worksheet.getCell('A10').value = "Sl-No";
            worksheet.getCell('A10').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('B10');
            worksheet.getCell('B10').value = "Person Name";
            worksheet.getCell('B10').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C10');
            worksheet.getCell('C10').value = "Designation";
            worksheet.getCell('C10').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('D10');
            worksheet.getCell('D10').value = "Department";
            worksheet.getCell('D10').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('E10');
            worksheet.getCell('E10').value = "Level";
            worksheet.getCell('E10').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('F10');
            worksheet.getCell('F10').value = "Mobile Number";
            worksheet.getCell('F10').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('G10');
            worksheet.getCell('G10').value = "Telephone";
            worksheet.getCell('G10').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('H10');
            worksheet.getCell('H10').value = "Mail Id";
            worksheet.getCell('H10').font = {
                size: 11,
                bold: true
            };

            for (let j = 0; j < supContact.length; j++) {

                let temp = j + 11;

                worksheet.mergeCells("A" + temp);
                worksheet.getCell("A" + temp).value = j + 1,
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
                worksheet.getCell("B" + temp).value = supContact[j].pname,
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
                worksheet.getCell("C" + temp).value = supContact[j].designation,
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
                worksheet.getCell("D" + temp).value = supContact[j].department,
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
                worksheet.getCell("E" + temp).value = supContact[j].level,
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
                worksheet.getCell("F" + temp).value = supContact[j].mnumber,
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
                worksheet.getCell("G" + temp).value = supContact[j].altmnumber,
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
                worksheet.getCell("H" + temp).value = supContact[j].mailid,
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

   
   
