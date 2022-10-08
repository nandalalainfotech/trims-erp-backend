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

        for (let i = 0; i < supplierRegDTO.suppliercontacts2.length; i++) {

            const suppliercontact001wb = new Suppliercontact001wb();

            suppliercontact001wb.supplierslNo2 = supplierRegDTO.suppliercontacts2[i].supplierslNo2;
            suppliercontact001wb.pname = supplierRegDTO.suppliercontacts2[i].pname;
            suppliercontact001wb.designation = supplierRegDTO.suppliercontacts2[i].designation;
            suppliercontact001wb.department = supplierRegDTO.suppliercontacts2[i].department;
            suppliercontact001wb.level = supplierRegDTO.suppliercontacts2[i].level;
            suppliercontact001wb.mnumber = supplierRegDTO.suppliercontacts2[i].mnumber;
            suppliercontact001wb.altmnumber = supplierRegDTO.suppliercontacts2[i].altmnumber;
            suppliercontact001wb.mailid = supplierRegDTO.suppliercontacts2[i].mailid;
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
        return this.supplierRegRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno}});
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
        let suplreg: any[] = await this.supplierRegRepository.find({where:{unitslno:unitslno}});

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('suplreg.html', 'utf8');

        var options = {
            format: "A3",
            orientation: "potrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {
                
                suplregcheck: suplreg
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



    async downloadExcel(unitslno:any,@Req() request: Request, @Res() response: Response) {
        let suplreg = await this.supplierRegRepository.find({where:{unitslno:unitslno}});



        if (suplreg.length < 0) {
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
            worksheet.columns = [{ key: 'A', width: 5.0 },
             { key: 'B', width: 40.0 },
              { key: 'C', width: 40.0 },
               { key: 'D', width: 60.0 }, 
               { key: 'E', width: 40.0 },
                { key: 'F', width: 40.0 },
                 { key: 'G', width: 40.0 },
                  { key: 'H', width: 40.0 },
                   { key: 'I', width: 40.0 },
                    { key: 'J', width: 40.0 },
                     { key: 'K', width: 40.0 },
                      { key: 'L', width: 40.0 },
                       { key: 'M', width: 40.0 },
                       { key: 'N', width: 40.0 },
                       { key: 'O', width: 40.0 },
                       { key: 'P', width: 40.0 },
                       { key: 'Q', width: 40.0 }];
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
            worksheet.getCell('C1:J2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C1:J2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('C3:J4');
            worksheet.getCell('C3:J4').value = "SUPPLY REGISTRATION DETAILS";
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
            worksheet.getCell('B5').value = "Supplier Code";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Supplier Name";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Address";

            // worksheet.getCell('D5').alignment = {
            //     wrapText:true,
            // }

            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
                
                
            };

            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Contact Details";
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
            worksheet.getCell('G5').value = "If any Certifications";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('H5');
            worksheet.getCell('H5').value = "Nature of Supplier";
            worksheet.getCell('H5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('I5');
            worksheet.getCell('I5').value = "Product Description";
            worksheet.getCell('I5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('J5');
            worksheet.getCell('J5').value = "Details of Present Reputed Customers";
            worksheet.getCell('J5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('K5');
            worksheet.getCell('K5').value = "Sister Concerns if Any";
            worksheet.getCell('K5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('L5');
            worksheet.getCell('L5').value = "Other Informations";
            worksheet.getCell('L5').font = {
                size: 11,
                bold: true
            };

           
            worksheet.mergeCells('R5');
        

            for (let i = 0; i < suplreg.length; i++) {
                let temp = i + 6;
                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = suplreg[i].supplierCode;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = suplreg[i].supplierName;


                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = suplreg[i].address;
                // worksheet.getCell('D' + temp).alignment = {wrapText:true};



                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = suplreg[i].contact;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = suplreg[i].gstin;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).value = suplreg[i].certification;

                worksheet.mergeCells('H' + temp);
                worksheet.getCell('H' + temp).value = suplreg[i].nature;

                worksheet.mergeCells('I' + temp);
                worksheet.getCell('I' + temp).value = suplreg[i].productDesc;

                worksheet.mergeCells('J' + temp);
                worksheet.getCell('J' + temp).value = suplreg[i].reputedCust;

                worksheet.mergeCells('K' + temp);
                worksheet.getCell('K' + temp).value = suplreg[i].concern;

                worksheet.mergeCells('L' + temp);
                worksheet.getCell('L' + temp).value = suplreg[i].otherInfo;


            }

            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });
        }
    }
}

   
   
