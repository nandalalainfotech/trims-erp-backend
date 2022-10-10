import { HttpException, HttpStatus, Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { createReadStream } from "fs";
import { BreakDownRegDTO } from "src/dto/breakdownRegwb.dto";
import { Breakdownreg001wb } from "src/entity/Breakdownreg001wb";
import { Spares001mb } from "src/entity/Spares001mb";
import { Request } from "supertest";
import { Repository } from "typeorm";
var path = require('path');
const excel = require('exceljs');
var path = require('path');
var fs = require("fs");
var html = fs.readFileSync("breakDown.html", "utf8");

@Injectable()
export class BreakDownRegService {

    constructor(
        @InjectRepository(Breakdownreg001wb) private readonly breakDownRegRepository: Repository<Breakdownreg001wb>,
        @InjectRepository(Spares001mb) private readonly spareRepository: Repository<Spares001mb>) {

    }

    async create(file: any, breakDownRegDTO: BreakDownRegDTO): Promise<Breakdownreg001wb> {
        const breakdownreg001wb = new Breakdownreg001wb();
        breakdownreg001wb.setProperties(breakDownRegDTO);
        breakdownreg001wb.originalfilename = file.filename;

        let spares001mb = new Spares001mb();
        spares001mb = await this.spareRepository.findOne({ where: { slNo: breakDownRegDTO.sslno} });
       
        if (spares001mb.minimumstocklevel > breakdownreg001wb.sparesQty && spares001mb.minimumstocklevel > 0) {
            spares001mb.minimumstocklevel = spares001mb.minimumstocklevel - breakdownreg001wb.sparesQty;
            await this.spareRepository.update({ slNo: breakDownRegDTO.sslno }, spares001mb);
            breakdownreg001wb.spareCost = breakdownreg001wb.sparesQty * spares001mb.sparescost;
            return this.breakDownRegRepository.save(breakdownreg001wb);
        } else {
            throw new HttpException('spares are not available in stock', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(file: any, breakDownRegDTO: BreakDownRegDTO): Promise<Breakdownreg001wb> {
        let breakdownreg001wb = new Breakdownreg001wb();
        breakdownreg001wb = await this.breakDownRegRepository.findOne({ where: { slNo: breakDownRegDTO.slNo } });

        if (breakdownreg001wb.sparesQty > breakDownRegDTO.sparesQty) {
            breakDownRegDTO.sparesQty = breakDownRegDTO.sparesQty - breakdownreg001wb.sparesQty;
        } else {

            breakDownRegDTO.sparesQty = breakDownRegDTO.sparesQty - breakdownreg001wb.sparesQty;
        }

        breakdownreg001wb.setProperties(breakDownRegDTO);
        breakdownreg001wb.originalfilename = file.filename;

        let spares001mb = new Spares001mb();
        spares001mb = await this.spareRepository.findOne({ where: { slNo: breakDownRegDTO.sslno } });
       
        if (spares001mb.minimumstocklevel > breakdownreg001wb.sparesQty) {
            spares001mb.minimumstocklevel = spares001mb.minimumstocklevel - breakdownreg001wb.sparesQty;
            await this.spareRepository.update({ slNo: breakDownRegDTO.sslno }, spares001mb);

            if (breakdownreg001wb.sparesQty < 0) {
                breakdownreg001wb.sparesQty = -1 * breakdownreg001wb.sparesQty;
            }
            breakdownreg001wb.spareCost = breakdownreg001wb.sparesQty * spares001mb.sparescost;
            await this.breakDownRegRepository.update({ slNo: breakdownreg001wb.slNo }, breakdownreg001wb);
            return breakdownreg001wb;
        } else {
            throw new HttpException('spares are not available in stock', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    async findAllByMachineId(mslno: number, unitslno:number): Promise<Breakdownreg001wb[]> {
        return this.breakDownRegRepository.find({
            order: { slNo: "DESC" },
            relations: ["mslno2", "sslno2", "bdsl2", "rcsl2", "pasl2"],
            where: { "mslno": mslno, 'unitslno': unitslno }
        });
    }
    async findAllByDashboard(): Promise<any> {
        
        let plans = this.breakDownRegRepository.find();

        return plans;
      
    }
    

    findOne(id: number): Promise<Breakdownreg001wb> {
        return this.breakDownRegRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.breakDownRegRepository.delete(slNo);
    }

    async downloadPdf(mslno: number,unitslno: number, @Req() request: Request, @Res() response: Response) {
        let breakDownRegs: any[] = await this.breakDownRegRepository.find({
            relations: ["mslno2", "sslno2", "bdsl2", "rcsl2", "pasl2"],
            where: { mslno:mslno,unitslno:unitslno },
        });

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('breakDown.html', 'utf8');
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
                bdownRegs: breakDownRegs,
            },
            path: "./pdf/BreakDownRegister.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "preventiveplan.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };
    }

    async downloadExcel(mslno: number,unitslno: number, @Req() request: Request, @Res() response: Response) {

        let breakDownRegs = await this.breakDownRegRepository.find({
            relations: ["mslno2", "sslno2", "bdsl2", "rcsl2", "pasl2"],
            where: { mslno:mslno,unitslno:unitslno },
        });
        if (breakDownRegs.length < 0) {
            return;
        } else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Break Down Register'); // creating worksheet
            // worksheet.pageSetup.printArea = 'A1:AN213';
            worksheet.getRow(5).height = 60;
            worksheet.getRow(6).height = 60;
            worksheet.getRow(7).height = 60;
            worksheet.getRow(8).height = 60;
            worksheet.getRow(9).height = 60;
            worksheet.getRow(10).height = 60;
            worksheet.getRow(11).height = 60;
            worksheet.getRow(12).height = 60;
            worksheet.getRow(13).height = 60;
            worksheet.getRow(14).height = 80;
            worksheet.columns = [
                { key: 'A', width: 5.0 }, 
                { key: 'B', width: 30.0 },
                 { key: 'C', width: 30.0 },
                  { key: 'D', width: 30.0 },
                   { key: 'E', width: 30.0 }, 
                   { key: 'F', width: 30.0 },
                    { key: 'G', width: 30.0 }, 
                    { key: 'H', width: 30.0 },
                     { key: 'I', width: 30.0 }, 
                     { key: 'J', width: 30.0 }, 
                     { key: 'K', width: 30.0 }, 
                     { key: 'L', width: 30.0 }, 
                     { key: 'M', width: 30.0 },
                     { key: 'N', width: 30.0 }];
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
            worksheet.getCell('C1:L2').value = " SRINIVASA ENTERPRISES";
            worksheet.getCell('C1:L2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C1:L2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('C3:L4');
            worksheet.getCell('C3:L4').value = "BREAK DOWN REGISTER";
            worksheet.getCell('C3:L4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C3:L4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('M1:N1');
            worksheet.getCell('M1:N1').value = "FormatNo.SE/PRD/D01";
            worksheet.getCell('M1:N1').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('M2:N2');
            worksheet.getCell('M2:N2').value = "Issue Date : 01.02.2019";
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
            worksheet.getCell('B5').value = "Date";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Machine Name / No";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Details of Breakdown";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Rectification  Details";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "Spares Used";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "Spares Quantity";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('H5');
            worksheet.getCell('H5').value = "Cost of Spares";
            worksheet.getCell('H5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('I5');
            worksheet.getCell('I5').value = "Breakdown Start Time";
            worksheet.getCell('I5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('J5');
            worksheet.getCell('J5').value = "Breakdown End Time";
            worksheet.getCell('J5').font = {
                size: 11,
                bold: true         
            };
            worksheet.mergeCells('K5');
            worksheet.getCell('K5').value = " Total Cost";
            worksheet.getCell('K5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('L5');
            worksheet.getCell('L5').value = "Attended By";
            worksheet.getCell('L5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('M5');
            worksheet.getCell('M5').value = "Remarks";
            worksheet.getCell('M5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('N5');
            worksheet.getCell('N5').value = "File Name";
            worksheet.getCell('N5').font = {
                size: 11,
                bold: true
            };


            for (let i = 0; i < breakDownRegs.length; i++) {
                let temp = i + 6;
                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = breakDownRegs[i].date;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = breakDownRegs[i].mslno2.mcode;
                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = breakDownRegs[i].bdsl2.name;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = breakDownRegs[i].pasl2.name;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = breakDownRegs[i].sslno2.spares;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).value = breakDownRegs[i].sparesQty;

                worksheet.mergeCells('H' + temp);
                worksheet.getCell('H' + temp).value = breakDownRegs[i].sslno2.sparescost;

                worksheet.mergeCells('I' + temp);
                worksheet.getCell('I' + temp).value = breakDownRegs[i].startTime;

                worksheet.mergeCells('J' + temp);
                worksheet.getCell('J' + temp).value = breakDownRegs[i].endTime;

                worksheet.mergeCells('K' + temp);
                worksheet.getCell('K' + temp).value = breakDownRegs[i].spareCost;

                worksheet.mergeCells('L' + temp);
                worksheet.getCell('L' + temp).value = breakDownRegs[i].attendby;

                worksheet.mergeCells('M' + temp);
                worksheet.getCell('M' + temp).value = breakDownRegs[i].remarks;

                worksheet.mergeCells('N' + temp);
                worksheet.getCell('N' + temp).value = breakDownRegs[i].filename;
            }

            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });
        }
    }
}