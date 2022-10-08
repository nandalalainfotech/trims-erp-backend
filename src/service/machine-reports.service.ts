import { Injectable, Req, Res } from "@nestjs/common";
var path = require('path');
var pdf = require("pdf-creator-node");
var fs = require("fs");

var html = fs.readFileSync("machine-reports.html", "utf8");
import { Response } from "express";
import { Request } from "supertest";
var path = require('path');
const excel = require('exceljs');

import { createReadStream } from "fs";
import { InjectRepository } from "@nestjs/typeorm";
import { Preventiveplan001wb } from "src/entity/Preventiveplan001wb";
import { Repository } from "typeorm";
import { Preventivechecklist001wb } from "src/entity/Preventivechecklist001wb";
import { Dailychecklist001wb } from "src/entity/Dailychecklist001wb";
import { Breakdownreg001wb } from "src/entity/Breakdownreg001wb";

@Injectable()
export class MachineReportsService {
    constructor(
        @InjectRepository(Preventiveplan001wb) private readonly preplanRepository: Repository<Preventiveplan001wb>,
        @InjectRepository(Preventivechecklist001wb) private readonly preCheckRepository: Repository<Preventivechecklist001wb>,
        @InjectRepository(Dailychecklist001wb) private readonly dailycheckRepository: Repository<Dailychecklist001wb>,
        @InjectRepository(Breakdownreg001wb) private readonly breakDownRegRepository: Repository<Breakdownreg001wb>) {

    }

    async downloadPdf(mslno: number, @Req() request: Request, @Res() response: Response) {

        let fs = require('fs');
        let pdf = require('dynamic-html-pdf');
        let html = fs.readFileSync('machine-reports.html', 'utf8');

        let preventiveplans = await this.preplanRepository.find({
            relations: ["mslno2"],
            where: { mslno },
        });

        const newdate = new Date();
        let yearplan = newdate.getFullYear();

        // Custom handlebar helper
        pdf.registerHelper('ifCond', function (v1, v2, options) {
            if (this.status === "P") {
                return options.fn(this);
            }
            return options.inverse(this);
        })

        pdf.registerHelper('switch1', function (value, options) {
            const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            let plansdate = new Date(value);
            let monthName = plansdate ? months[plansdate.getMonth()] : "";
            this.switch_value = monthName;
            this.switch_break = false;
            return options.fn(this);
        });

        pdf.registerHelper('case', function (value, options) {
            if (value == this.switch_value) {
                this.switch_break = true;
                return options.fn(this);
            }

        });

        let preventivechecks = await this.preCheckRepository.find({
            relations: ["mslno2", "cpslno2"],
            where: { mslno },
        });

        let i = 0;
        let preChecklists = preventivechecks[i];

        let dailychecks = await this.dailycheckRepository.find({
            relations: ["mslno2", "cpslno2"],
            where: { mslno },
        });

        let dailycheckslist = dailychecks[0];

        const month1 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const d1 = new Date(dailycheckslist.date);
        let monthNames = month1[d1.getMonth()];

        let Years = d1.getFullYear();

        pdf.registerHelper('switch2', function (value, options) {
            const date = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
            let dailycheckdate = new Date(value);
            let datescounts: number = dailycheckdate ? date[dailycheckdate.getDate()] : 0;
            let counts = datescounts - 1;
            this.switch_value = counts;
            this.switch_break = false;
            return options.fn(this);
        });

        pdf.registerHelper('case', function (value, options) {
            if (value == this.switch_value) {
                this.switch_break = true;
                return options.fn(this);
            }

        });

        let breakDownRegs: any[] = await this.breakDownRegRepository.find({
            relations: ["mslno2", "sslno2", "bdsl2", "rcsl2", "pasl2"],
            where: { mslno },
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
                preplans: preventiveplans,
                yearPlan: yearplan,
                prechecks: preventivechecks, preChecklists,
                bdownRegs: breakDownRegs,
                dailyChecks: dailychecks,
                dailyChecksList: dailycheckslist,
                monthnames: monthNames,
                years: Years,
            },
            path: "./pdf/machine-reports.pdf"    // it is not required if type is buffer
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
    // -------------------------PDF End-------------------------

    async downloadExcel(mslno: number, @Req() request: Request, @Res() response: Response) {
        let preventiveplans = await this.preplanRepository.find({
            relations: ["mslno2"],
            where: { mslno },
        });

        let preventivechecks = await this.preCheckRepository.find({
            relations: ["mslno2", "cpslno2"],
            where: { mslno },
        });

        let dailychecks = await this.dailycheckRepository.find({
            relations: ["mslno2", "cpslno2"],
            where: { mslno },
        });

        let breakDownRegs = await this.breakDownRegRepository.find({
            relations: ["mslno2", "sslno2", "bdsl2", "rcsl2", "pasl2"],
            where: { mslno },
        });

        if (preventiveplans.length < 0 && preventivechecks.length < 0 && dailychecks.length < 0 && breakDownRegs.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Preventive Maintainance Plan'); // creating worksheet
            worksheet.pageSetup.printArea = 'A1:AN28';
            worksheet.columns = [{ key: 'A', width: 5.0 }, { key: 'B', width: 10.0 }, { key: 'C', width: 15.0 }, { key: 'D', width: 7.0 }, { key: 'E', width: 3.0 }, { key: 'F', width: 3.0 }, { key: 'G', width: 3.0 }, { key: 'H', width: 3.0 }, { key: 'I', width: 3.0 }, { key: 'J', width: 3.0 }, { key: 'K', width: 3.0 }, { key: 'L', width: 3.0 }, { key: 'M', width: 3.0 }, { key: 'N', width: 3.0 }, { key: 'O', width: 3.0 }, { key: 'P', width: 3.0 }, { key: 'Q', width: 3.0 }, { key: 'R', width: 3.0 }, { key: 'S', width: 3.0 }, { key: 'T', width: 3.0 }, { key: 'U', width: 3.0 }, { key: 'V', width: 3.0 }, { key: 'W', width: 3.0 }, { key: 'X', width: 3.0 }, { key: 'Y', width: 3.0 }, { key: 'Z', width: 3.0 }, { key: 'AA', width: 3.0 }, { key: 'AB', width: 3.0 }, { key: 'AC', width: 3.0 }, { key: 'AD', width: 3.0 }, { key: 'AE', width: 3.0 }, { key: 'AF', width: 3.0 }, { key: 'AG', width: 3.0 }, { key: 'AH', width: 3.0 }, { key: 'AI', width: 3.0 }, { key: 'AJ', width: 3.0 }, { key: 'AK', width: 3.0 }, { key: 'AL', width: 3.0 }, { key: 'AM', width: 3.0 }, { key: 'AN', width: 3.0 }];
            worksheet.columns.forEach((col) => {
                // col.style.font = { name: 'Comic Sans MS' };
                col.style.font = {
                    // name: 'Comic Sans MS',
                    // family: 4,
                    size: 7,
                    // underline: true,
                    bold: true
                };
                col.style.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            })
            // const imageRow = worksheet.getRow(1);
            // imageRow.height = 60;
            // worksheet.mergeCells(1, 1, 1, 6);
            // worksheet.mergeCells('B2:D2');

            worksheet.mergeCells('A1:B4');
            worksheet.getCell('A1:B4').value = "TRIMS";
            worksheet.getCell('A1:B4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('A1:B4').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('C1:AI2');
            worksheet.getCell('C1:AI2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('C1:AI2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C1:AI2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('AJ1:AN1');
            worksheet.getCell('AJ1:AN1').value = "Format No.SE/MTN/RO1";
            worksheet.mergeCells('AJ2:AN2');
            worksheet.getCell('AJ2:AN2').value = "Issue Date: 01.02.2019";
            worksheet.mergeCells('AJ3:AN3');
            worksheet.getCell('AJ3:AN3').value = "Rev. No. 00";
            worksheet.mergeCells('AJ4:AN4');
            worksheet.getCell('AJ4:AN4').value = "Rev. Date:";
            worksheet.mergeCells('C3:AI4');
            worksheet.getCell('C3:AI4').value = "PREVENTIVE MAINTAINANCE PLAN";
            worksheet.getCell('C3:AI4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C3:AI4').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('A5:A6');
            worksheet.getCell('A5:A6').value = "SL.NO.";
            worksheet.getCell('A5:A6').font = {
                size: 10,
                bold: true
            };
            worksheet.getCell('A5:A6').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getCell('A5:A6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9ECAEE' }, bgColor: { argb: '9ECAEE' } };
            worksheet.mergeCells('B5:B6');
            worksheet.getCell('B5:B6').value = "M/C NO";
            worksheet.getCell('B5:B6').font = {
                size: 10,
                bold: true
            };
            worksheet.getCell('B5:B6').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getCell('B5:B6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9ECAEE' }, bgColor: { argb: '9ECAEE' } };
            worksheet.mergeCells('C5:C6');
            worksheet.getCell('C5:C6').value = "M/C NAME";
            worksheet.getCell('C5:C6').font = {
                size: 10,
                bold: true
            };
            worksheet.getCell('C5:C6').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getCell('C5:C6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9ECAEE' }, bgColor: { argb: '9ECAEE' } };
            worksheet.mergeCells('D5:D6');
            worksheet.getCell('D5:D6').value = "Status";
            worksheet.getCell('D5:D6').font = {
                size: 10,
                bold: true
            };
            worksheet.getCell('D5:D6').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getCell('D5:D6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9ECAEE' }, bgColor: { argb: '9ECAEE' } };
            worksheet.mergeCells('E5:AN5');
            worksheet.getCell('E5:AN5').value = "YEAR :  2021-2022";
            worksheet.getCell('E5:AN5').font = {
                size: 10,
                bold: true
            };
            worksheet.getCell('E5:AN5').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getCell('E5:AN5').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9ECAEE' }, bgColor: { argb: '9ECAEE' } };
            worksheet.mergeCells('E6:G6');
            worksheet.getCell('E6:G6').value = "APR";
            // worksheet.getCell('E5:AN5').font = {
            //     size: 10,
            //     bold: true
            // };
            worksheet.getCell('E6:G6').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getCell('E6:G6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9ECAEE' }, bgColor: { argb: '9ECAEE' } };
            worksheet.mergeCells('H6:J6');
            worksheet.getCell('H6:J6').value = "MAY";
            worksheet.getCell('H6:J6').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getCell('H6:J6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9ECAEE' }, bgColor: { argb: '9ECAEE' } };
            worksheet.mergeCells('K6:M6');
            worksheet.getCell('K6:M6').value = "JUN";
            worksheet.getCell('K6:M6').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getCell('K6:M6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9ECAEE' }, bgColor: { argb: '9ECAEE' } };
            worksheet.mergeCells('N6:P6');
            worksheet.getCell('N6:P6').value = "JUL";
            worksheet.getCell('N6:P6').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getCell('N6:P6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9ECAEE' }, bgColor: { argb: '9ECAEE' } };
            worksheet.mergeCells('Q6:S6');
            worksheet.getCell('Q6:S6').value = "AUG";
            worksheet.getCell('Q6:S6').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getCell('Q6:S6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9ECAEE' }, bgColor: { argb: '9ECAEE' } };
            worksheet.mergeCells('T6:V6');
            worksheet.getCell('T6:V6').value = "SEP";
            worksheet.getCell('T6:V6').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getCell('T6:V6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9ECAEE' }, bgColor: { argb: '9ECAEE' } };
            worksheet.mergeCells('W6:Y6');
            worksheet.getCell('W6:Y6').value = "OCT";
            worksheet.getCell('W6:Y6').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getCell('W6:Y6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9ECAEE' }, bgColor: { argb: '9ECAEE' } };
            worksheet.mergeCells('Z6:AB6');
            worksheet.getCell('Z6:AB6').value = "NOV";
            worksheet.getCell('Z6:AB6').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getCell('Z6:AB6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9ECAEE' }, bgColor: { argb: '9ECAEE' } };
            worksheet.mergeCells('AC6:AE6');
            worksheet.getCell('AC6:AE6').value = "DEC";
            worksheet.getCell('AC6:AE6').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getCell('AC6:AE6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9ECAEE' }, bgColor: { argb: '9ECAEE' } };
            worksheet.mergeCells('AF6:AH6');
            worksheet.getCell('AF6:AH6').value = "JAN";
            worksheet.getCell('AF6:AH6').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getCell('AF6:AH6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9ECAEE' }, bgColor: { argb: '9ECAEE' } };
            worksheet.mergeCells('AI6:AK6');
            worksheet.getCell('AI6:AK6').value = "FEB";
            worksheet.getCell('AI6:AK6').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getCell('AI6:AK6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9ECAEE' }, bgColor: { argb: '9ECAEE' } };
            worksheet.mergeCells('AL6:AN6');
            worksheet.getCell('AL6:AN6').value = "MAR";
            worksheet.getCell('AL6:AN6').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getCell('AL6:AN6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9ECAEE' }, bgColor: { argb: '9ECAEE' } };


            let temp = 0;
            for (let i = 0; i < preventiveplans.length; i++) {
                worksheet.mergeCells(7 + temp, 1, 8 + temp, 1);
                worksheet.getCell(7 + temp, 1, 8 + temp, 1).value = i + 1;
                worksheet.getCell(7 + temp, 1, 8 + temp, 1).alignment = { vertical: 'middle', horizontal: 'center' };
                worksheet.mergeCells(7 + temp, 2, 8 + temp, 2);
                worksheet.getCell(7 + temp, 2, 8 + temp, 2).value = preventiveplans[i].mslno2.mcode;
                worksheet.getCell(7 + temp, 2, 8 + temp, 2).alignment = { vertical: 'middle', horizontal: 'center' };
                worksheet.mergeCells(7 + temp, 3, 8 + temp, 3);
                worksheet.getCell(7 + temp, 3, 8 + temp, 3).value = preventiveplans[i].mslno2.mname;
                worksheet.getCell(7 + temp, 3, 8 + temp, 3).alignment = { vertical: 'middle', horizontal: 'center' };
                if (preventiveplans[i].status == "P") {
                    worksheet.getCell(7 + temp, 4).value = "P";
                    worksheet.getCell(7 + temp, 4).alignment = { vertical: 'middle', horizontal: 'center' };

                    let date = new Date (preventiveplans[i].date);
                    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                    let monthName = months[date.getMonth()];

                    switch (monthName) {
                        case "JAN":
                            worksheet.mergeCells(7 + temp, 32, 7 + temp, 34);
                            worksheet.getCell(7 + temp, 32, 7 + temp, 34).value = preventiveplans[i].date;
                            worksheet.getCell(7 + temp, 32, 7 + temp, 34).alignment = { vertical: 'middle', horizontal: 'center' };
                            worksheet.getCell(7 + temp, 32, 7 + temp, 34).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9EC0FF' }, bgColor: { argb: '9EC0FF' } };
                            break;
                        case "FEB":
                            worksheet.mergeCells(7 + temp, 35, 7 + temp, 37);
                            worksheet.getCell(7 + temp, 35, 7 + temp, 37).value = preventiveplans[i].date;
                            worksheet.getCell(7 + temp, 35, 7 + temp, 37).alignment = { vertical: 'middle', horizontal: 'center' };
                            worksheet.getCell(7 + temp, 35, 7 + temp, 37).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9EC0FF' }, bgColor: { argb: '9EC0FF' } };
                            break;
                        case "MAR":
                            worksheet.mergeCells(7 + temp, 38, 7 + temp, 40);
                            worksheet.getCell(7 + temp, 38, 7 + temp, 40).value = preventiveplans[i].date;
                            worksheet.getCell(7 + temp, 38, 7 + temp, 40).alignment = { vertical: 'middle', horizontal: 'center' };
                            worksheet.getCell(7 + temp, 38, 7 + temp, 40).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9EC0FF' }, bgColor: { argb: '9EC0FF' } };

                            break;
                        case "APR":
                            worksheet.mergeCells(7 + temp, 5, 7 + temp, 7);
                            worksheet.getCell(7 + temp, 5, 7 + temp, 7).value = preventiveplans[i].date;
                            worksheet.getCell(7 + temp, 5, 7 + temp, 7).alignment = { vertical: 'middle', horizontal: 'center' };
                            worksheet.getCell(7 + temp, 5, 7 + temp, 7).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9EC0FF' }, bgColor: { argb: '9EC0FF' } };
                            break;
                        case "MAY":
                            worksheet.mergeCells(7 + temp, 8, 7 + temp, 10);
                            worksheet.getCell(7 + temp, 8, 7 + temp, 10).value = preventiveplans[i].date;
                            worksheet.getCell(7 + temp, 8, 7 + temp, 10).alignment = { vertical: 'middle', horizontal: 'center' };
                            worksheet.getCell(7 + temp, 8, 7 + temp, 10).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9EC0FF' }, bgColor: { argb: '9EC0FF' } };
                            break;
                        case "JUN":
                            worksheet.mergeCells(7 + temp, 11, 7 + temp, 13);
                            worksheet.getCell(7 + temp, 11, 7 + temp, 13).value = preventiveplans[i].date;
                            worksheet.getCell(7 + temp, 11, 7 + temp, 13).alignment = { vertical: 'middle', horizontal: 'center' };
                            worksheet.getCell(7 + temp, 11, 7 + temp, 13).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9EC0FF' }, bgColor: { argb: '9EC0FF' } };
                            break;
                        case "JUL":
                            worksheet.mergeCells(7 + temp, 14, 7 + temp, 16);
                            worksheet.getCell(7 + temp, 14, 7 + temp, 16).value = preventiveplans[i].date;
                            worksheet.getCell(7 + temp, 14, 7 + temp, 16).alignment = { vertical: 'middle', horizontal: 'center' };
                            worksheet.getCell(7 + temp, 14, 7 + temp, 16).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9EC0FF' }, bgColor: { argb: '9EC0FF' } };
                            break;
                        case "AUG":
                            worksheet.mergeCells(7 + temp, 17, 7 + temp, 19);
                            worksheet.getCell(7 + temp, 17, 7 + temp, 19).value = preventiveplans[i].date;
                            worksheet.getCell(7 + temp, 17, 7 + temp, 19).alignment = { vertical: 'middle', horizontal: 'center' };
                            worksheet.getCell(7 + temp, 17, 7 + temp, 19).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9EC0FF' }, bgColor: { argb: '9EC0FF' } };
                            break;
                        case "SEP":
                            worksheet.mergeCells(7 + temp, 20, 7 + temp, 22);
                            worksheet.getCell(7 + temp, 20, 7 + temp, 22).value = preventiveplans[i].date;
                            worksheet.getCell(7 + temp, 20, 7 + temp, 22).alignment = { vertical: 'middle', horizontal: 'center' };
                            worksheet.getCell(7 + temp, 20, 7 + temp, 22).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9EC0FF' }, bgColor: { argb: '9EC0FF' } };
                            break;
                        case "OCT":
                            worksheet.mergeCells(7 + temp, 23, 7 + temp, 25);
                            worksheet.getCell(7 + temp, 23, 7 + temp, 25).value = preventiveplans[i].date;
                            worksheet.getCell(7 + temp, 23, 7 + temp, 25).alignment = { vertical: 'middle', horizontal: 'center' };
                            worksheet.getCell(7 + temp, 23, 7 + temp, 25).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9EC0FF' }, bgColor: { argb: '9EC0FF' } };
                            break;
                        case "NOV":
                            worksheet.mergeCells(7 + temp, 26, 7 + temp, 28);
                            worksheet.getCell(7 + temp, 26, 7 + temp, 28).value = preventiveplans[i].date;
                            worksheet.getCell(7 + temp, 26, 7 + temp, 28).alignment = { vertical: 'middle', horizontal: 'center' };
                            worksheet.getCell(7 + temp, 26, 7 + temp, 28).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9EC0FF' }, bgColor: { argb: '9EC0FF' } };
                            break;
                        case "DEC":
                            worksheet.mergeCells(7 + temp, 29, 7 + temp, 31);
                            worksheet.getCell(7 + temp, 29, 7 + temp, 31).value = preventiveplans[i].date;
                            worksheet.getCell(7 + temp, 29, 7 + temp, 31).alignment = { vertical: 'middle', horizontal: 'center' };
                            worksheet.getCell(7 + temp, 29, 7 + temp, 31).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9EC0FF' }, bgColor: { argb: '9EC0FF' } };
                            break;
                    }


                }
                else if (preventiveplans[i].status == "A") {
                    worksheet.getCell(8 + temp, 4).value = "A";
                    worksheet.getCell(8 + temp, 4).alignment = { vertical: 'middle', horizontal: 'center' };

                    let date = new Date (preventiveplans[i].date);
                    const month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                    let monthname = month[date.getMonth()];
                    switch (monthname) {
                        case "JAN":
                            worksheet.mergeCells(8 + temp, 32, 8 + temp, 34);
                            worksheet.getCell(8 + temp, 32, 8 + temp, 34).value = preventiveplans[i].date;
                            worksheet.getCell(8 + temp, 32, 8 + temp, 34).alignment = { vertical: 'middle', horizontal: 'center' };
                            worksheet.getCell(8 + temp, 32, 8 + temp, 34).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9EFF0E' }, bgColor: { argb: '9EFF0E' } };
                            break;
                        case "FEB":
                            worksheet.mergeCells(8 + temp, 35, 8 + temp, 37);
                            worksheet.getCell(8 + temp, 35, 8 + temp, 37).value = preventiveplans[i].date;
                            worksheet.getCell(8 + temp, 35, 8 + temp, 37).alignment = { vertical: 'middle', horizontal: 'center' };
                            worksheet.getCell(8 + temp, 35, 8 + temp, 37).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9EFF0E' }, bgColor: { argb: '9EFF0E' } };
                            break;
                        case "MAR":
                            worksheet.mergeCells(8 + temp, 38, 8 + temp, 40);
                            worksheet.getCell(8 + temp, 38, 8 + temp, 40).value = preventiveplans[i].date;
                            worksheet.getCell(8 + temp, 38, 8 + temp, 40).alignment = { vertical: 'middle', horizontal: 'center' };
                            worksheet.getCell(8 + temp, 38, 8 + temp, 40).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9EFF0E' }, bgColor: { argb: '9EFF0E' } };
                            break;
                        case "APR":
                            worksheet.mergeCells(8 + temp, 5, 8 + temp, 7);
                            worksheet.getCell(8 + temp, 5, 8 + temp, 7).value = preventiveplans[i].date;
                            worksheet.getCell(8 + temp, 5, 8 + temp, 7).alignment = { vertical: 'middle', horizontal: 'center' };
                            worksheet.getCell(8 + temp, 5, 8 + temp, 7).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9EFF0E' }, bgColor: { argb: '9EFF0E' } };

                            break;
                        case "MAY":
                            worksheet.mergeCells(8 + temp, 8, 8 + temp, 10);
                            worksheet.getCell(8 + temp, 8, 8 + temp, 10).value = preventiveplans[i].date;
                            worksheet.getCell(8 + temp, 8, 8 + temp, 10).alignment = { vertical: 'middle', horizontal: 'center' };
                            worksheet.getCell(8 + temp, 8, 8 + temp, 10).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9EFF0E' }, bgColor: { argb: '9EFF0E' } };

                            break;
                        case "JUN":
                            worksheet.mergeCells(8 + temp, 11, 8 + temp, 13);
                            worksheet.getCell(8 + temp, 11, 8 + temp, 13).value = preventiveplans[i].date;
                            worksheet.getCell(8 + temp, 11, 8 + temp, 13).alignment = { vertical: 'middle', horizontal: 'center' };
                            worksheet.getCell(8 + temp, 11, 8 + temp, 13).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9EFF0E' }, bgColor: { argb: '9EFF0E' } };
                            break;
                        case "JUL":
                            worksheet.mergeCells(8 + temp, 14, 8 + temp, 16);
                            worksheet.getCell(8 + temp, 14, 8 + temp, 16).value = preventiveplans[i].date;
                            worksheet.getCell(8 + temp, 14, 8 + temp, 16).alignment = { vertical: 'middle', horizontal: 'center' };
                            worksheet.getCell(8 + temp, 14, 8 + temp, 16).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9EFF0E' }, bgColor: { argb: '9EFF0E' } };
                            break;
                        case "AUG":
                            worksheet.mergeCells(8 + temp, 17, 8 + temp, 19);
                            worksheet.getCell(8 + temp, 17, 8 + temp, 19).value = preventiveplans[i].date;
                            worksheet.getCell(8 + temp, 17, 8 + temp, 19).alignment = { vertical: 'middle', horizontal: 'center' };
                            worksheet.getCell(8 + temp, 17, 8 + temp, 19).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9EFF0E' }, bgColor: { argb: '9EFF0E' } };
                            break;
                        case "SEP":
                            worksheet.mergeCells(8 + temp, 20, 8 + temp, 22);
                            worksheet.getCell(8 + temp, 20, 8 + temp, 22).value = preventiveplans[i].date;
                            worksheet.getCell(8 + temp, 20, 8 + temp, 22).alignment = { vertical: 'middle', horizontal: 'center' };
                            worksheet.getCell(8 + temp, 20, 8 + temp, 22).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9EFF0E' }, bgColor: { argb: '9EFF0E' } };
                            break;
                        case "OCT":
                            worksheet.mergeCells(8 + temp, 23, 8 + temp, 25);
                            worksheet.getCell(8 + temp, 23, 8 + temp, 25).value = preventiveplans[i].date;
                            worksheet.getCell(8 + temp, 23, 8 + temp, 25).alignment = { vertical: 'middle', horizontal: 'center' };
                            worksheet.getCell(8 + temp, 23, 8 + temp, 25).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9EFF0E' }, bgColor: { argb: '9EFF0E' } };
                            break;
                        case "NOV":
                            worksheet.mergeCells(8 + temp, 26, 8 + temp, 28);
                            worksheet.getCell(8 + temp, 26, 8 + temp, 28).value = preventiveplans[i].date;
                            worksheet.getCell(8 + temp, 26, 8 + temp, 28).alignment = { vertical: 'middle', horizontal: 'center' };
                            worksheet.getCell(8 + temp, 26, 8 + temp, 28).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9EFF0E' }, bgColor: { argb: '9EFF0E' } };
                            break;
                        case "DEC":
                            worksheet.mergeCells(8 + temp, 29, 8 + temp, 31);
                            worksheet.getCell(8 + temp, 29, 8 + temp, 31).value = preventiveplans[i].date;
                            worksheet.getCell(8 + temp, 29, 8 + temp, 31).alignment = { vertical: 'middle', horizontal: 'center' };
                            worksheet.getCell(8 + temp, 29, 8 + temp, 31).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9EFF0E' }, bgColor: { argb: '9EFF0E' } };
                            break;

                    }
                }
                temp = temp + 2;

            }
            // ---------------Preventive Checklist----------------------//

            let worksheet2 = workbook.addWorksheet('Preventive Checklist'); // creating worksheet

            worksheet2.columns = [{ key: 'A', width: 10.0 }, { key: 'B', width: 25.0 }, { key: 'C', width: 25.0 },
            { key: 'D', width: 25.0 }, { key: 'E', width: 25.0 }];

            worksheet2.columns.forEach((col) => {
                // col.style.font = { name: 'Comic Sans MS' };
                col.style.font = {
                    // name: 'Comic Sans MS',
                    // family: 4,
                    size: 7,
                    // underline: true,
                    bold: true
                };
                col.style.border = {
                    top: { style: 'thin' }, left: { style: 'thin' },
                    bottom: { style: 'thin' }, right: { style: 'thin' }
                };
            })
            // const imageRow = worksheet.getRow(1);
            // imageRow.height = 60;
            // worksheet.mergeCells(1, 1, 1, 6);
            // worksheet.mergeCells('B2:D2');

            worksheet2.mergeCells('A1:A4');
            worksheet2.getCell('A1:A4').value = "TRIMS";
            worksheet2.getCell('A1:A4').font = {
                size: 11,
                bold: true
            };
            worksheet2.getCell('A1:A4').alignment = { vertical: 'middle', horizontal: 'center' };


            worksheet2.mergeCells('B1:D2');
            worksheet2.getCell('B1:D2').value = "TRIM SOLUTIONS";
            worksheet2.getCell('B1:D2').font = {
                size: 16,
                bold: true
            };
            worksheet2.getCell('B1:D2').alignment = { vertical: 'middle', horizontal: 'center' };


            worksheet2.mergeCells('E1');
            worksheet2.getCell('E1').value = "Format No. TRIMS/MTN/RO1";
            worksheet2.mergeCells('E2');
            worksheet2.getCell('E2').value = "Issue Date: 01.02.2019";
            worksheet2.mergeCells('E3');
            worksheet2.getCell('E3').value = "Rev. No. 00";
            worksheet2.mergeCells('E4');
            worksheet2.getCell('E4').value = "Rev. Date:";
            worksheet2.mergeCells('B3:D4');
            worksheet2.getCell('B3:D4').value = "PREVENTIVE MAINTAINANCE CHECKLIST";
            worksheet2.getCell('B3:D4').font = {
                size: 16,
                bold: true
            };
            worksheet2.getCell('B3:D4').alignment = { vertical: 'middle', horizontal: 'center' };

            let i = 0;
            worksheet2.mergeCells('A5:C6');
            worksheet2.getCell('A5:C6').value = preventivechecks[i].mslno2.mcode;
            worksheet2.getCell('A5:C6').alignment = { vertical: 'middle', horizontal: 'left' };
            worksheet2.getCell('A5:C6').font = {
                size: 12,
                bold: true
            };

            worksheet2.mergeCells('A7:C8');
            worksheet2.getCell('A7:C8').value = preventivechecks[i].checkpointdate;
            worksheet2.getCell('A7:C8').alignment = { vertical: 'middle', horizontal: 'left' };
            worksheet2.getCell('A7:C8').font = {
                size: 12,
                bold: true
            };

            worksheet2.mergeCells('D5:E8');
            worksheet2.getCell('D5:E8').value = preventivechecks[i].mslno2.mname;
            worksheet2.getCell('D5:E8').font = {
                size: 12,
                bold: true
            };
            worksheet2.getCell('D5:E8').alignment = { vertical: 'middle', horizontal: 'left' };

            worksheet2.getCell('A9').value = "Sl.No:";
            worksheet2.getCell('A9').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet2.getCell('A9').font = {
                size: 12,
                bold: true
            };

            worksheet2.mergeCells('B9:C9');
            worksheet2.getCell('B9:C9').value = "Check Points";
            worksheet2.getCell('B9:C9').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet2.getCell('B9:C9').font = {
                size: 12,
                bold: true
            };

            worksheet2.mergeCells('D9:E9');
            worksheet2.getCell('D9:E9').value = "Observation";
            worksheet2.getCell('D9:E9').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet2.getCell('D9:E9').font = {
                size: 12,
                bold: true
            };



            let checkstemp = 0;
            for (let i = 0; i < preventivechecks.length; i++) {
                worksheet2.mergeCells(10 + checkstemp, 1, 11 + checkstemp, 1);
                worksheet2.getCell(10 + checkstemp, 1, 11 + checkstemp, 1).value = i + 1;
                worksheet2.getCell(10 + checkstemp, 1, 11 + checkstemp, 1).alignment = { vertical: 'middle', horizontal: 'center' };
                worksheet2.getCell(10 + checkstemp, 1, 11 + checkstemp, 1).font = {
                    size: 12,
                    bold: true
                };

                worksheet2.mergeCells(10 + checkstemp, 2, 11 + checkstemp, 3);
                worksheet2.getCell(10 + checkstemp, 2, 11 + checkstemp, 3).value = preventivechecks[i].cpslno2.checkpoints;
                worksheet2.getCell(10 + checkstemp, 2, 11 + checkstemp, 3).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet2.getCell(10 + checkstemp, 2, 11 + checkstemp, 3).font = {
                    size: 12,
                    bold: true
                };

                worksheet2.mergeCells(10 + checkstemp, 4, 11 + checkstemp, 5);
                worksheet2.getCell(10 + checkstemp, 4, 11 + checkstemp, 5).value = preventivechecks[i].observation;
                worksheet2.getCell(10 + checkstemp, 4, 11 + checkstemp, 5).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet2.getCell(10 + checkstemp, 4, 11 + checkstemp, 5).font = {
                    size: 12,
                    bold: true
                };
                checkstemp = checkstemp + 2;
            }




            // ---------------Daily Checklist----------------------//

            let worksheet3 = workbook.addWorksheet('Daily Maintainance Checklist'); // creating worksheet3
            worksheet3.pageSetup.printArea = 'A1:AN28';
            worksheet3.columns = [{ key: 'A', width: 5.0 }, { key: 'B', width: 10.0 }, { key: 'C', width: 20.0 }, { key: 'D', width: 7.0 }, { key: 'E', width: 4.0 }, { key: 'F', width: 4.0 }, { key: 'G', width: 4.0 }, { key: 'H', width: 4.0 }, { key: 'I', width: 4.0 }, { key: 'J', width: 4.0 }, { key: 'K', width: 4.0 }, { key: 'L', width: 4.0 }, { key: 'M', width: 4.0 }, { key: 'N', width: 4.0 }, { key: 'O', width: 4.0 }, { key: 'P', width: 4.0 }, { key: 'Q', width: 4.0 }, { key: 'R', width: 4.0 }, { key: 'S', width: 4.0 }, { key: 'T', width: 4.0 }, { key: 'U', width: 4.0 }, { key: 'V', width: 4.0 }, { key: 'W', width: 4.0 }, { key: 'X', width: 4.0 }, { key: 'Y', width: 4.0 }, { key: 'Z', width: 4.0 }, { key: 'AA', width: 4.0 }, { key: 'AB', width: 4.0 }, { key: 'AC', width: 4.0 }, { key: 'AD', width: 4.0 }, { key: 'AE', width: 4.0 }, { key: 'AF', width: 4.0 }, { key: 'AG', width: 4.0 }, { key: 'AH', width: 4.0 }, { key: 'AI', width: 4.0 }];
            worksheet3.columns.forEach((col) => {
                col.style.font = {
                    size: 9,
                    bold: true
                };
                col.style.alignment = { vertical: 'middle' };
                col.style.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            })
            worksheet3.getRow(1).height = 30;
            worksheet3.getRow(2).height = 30;
            worksheet3.getRow(3).height = 30;
            worksheet3.getRow(4).height = 30;
            worksheet3.getRow(5).height = 30;
            worksheet3.getRow(6).height = 30;
            worksheet3.getRow(7).height = 30;
            worksheet3.getRow(8).height = 40;
            worksheet3.getRow(9).height = 40;
            worksheet3.getRow(10).height = 40;
            worksheet3.getRow(11).height = 40;
            worksheet3.getRow(12).height = 40;
            worksheet3.getRow(13).height = 40;
            worksheet3.getRow(14).height = 40;
            worksheet3.getRow(15).height = 40;
            worksheet3.getRow(16).height = 40;


            worksheet3.mergeCells('A1:B4');
            worksheet3.getCell('A1:B4').value = "TRIMS";
            worksheet3.getCell('A1:B4').font = {
                size: 14,
                bold: true
            };
            worksheet3.getCell('A1:B4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet3.mergeCells('C1:AA2');
            worksheet3.getCell('C1:AA2').value = "TRIM SOLUTIONS";
            worksheet3.getCell('C1:AA2').font = {
                size: 14,
                bold: true
            };
            worksheet3.getCell('C1:AA2').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet3.mergeCells('AB1:AI1');
            worksheet3.getCell('AB1:AI1').value = "Format No. TRIMS/MTN/RO3";

            worksheet3.mergeCells('AB2:AI2');
            worksheet3.getCell('AB2:AI2').value = "Issue Date: 01.02.2019";

            worksheet3.mergeCells('AB3:AI3');
            worksheet3.getCell('AB3:AI3').value = "Rev. No. 001";

            worksheet3.mergeCells('AB4:AI4');
            worksheet3.getCell('AB4:AI4').value = "Rev. Date: 29/10/2020";

            worksheet3.mergeCells('C3:AA4');
            worksheet3.getCell('C3:AA4').value = " DAILY MAINTENANCE CHECK LIST";
            worksheet3.getCell('C3:AA4').font = {
                size: 14,
                bold: true
            };
            worksheet3.getCell('C3:AA4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet3.mergeCells('A5:AI5');
            worksheet3.getCell('A5:AI5').value = "  Machine  Name:  BENDING MACHINE                                                          Machine No :  TRIMS/PB/001                                                                                 Month: NOV                                                                                          Year: 2021";

            worksheet3.mergeCells('A6:A7');
            worksheet3.getCell('A6:A7').value = " S.No";
            worksheet3.getCell('A6:A7').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet3.getCell('A6:A7').font = {
                size: 12,
                bold: true
            };

            worksheet3.mergeCells('B6:C7');
            worksheet3.getCell('B6:C7').value = "Check Points";
            worksheet3.getCell('B6:C7').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet3.getCell('B6:C7').font = {
                size: 12,
                bold: true
            };


            worksheet3.mergeCells('D6:D7');
            worksheet3.getCell('D6:D7').value = "Frq";
            worksheet3.getCell('D6:D7').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet3.getCell('D6:D7').font = {
                size: 12,
                bold: true
            };

            worksheet3.mergeCells('E6:AI6');
            worksheet3.getCell('E6:AI6').value = "Days";
            worksheet3.getCell('E6:AI6').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet3.getCell('E6:AI6').font = {
                size: 12,
                bold: true
            };

            worksheet3.mergeCells('E7');
            worksheet3.getCell('E7').value = "1";

            worksheet3.mergeCells('F7');
            worksheet3.getCell('F7').value = "2";

            worksheet3.mergeCells('G7');
            worksheet3.getCell('G7').value = "3";

            worksheet3.mergeCells('H7');
            worksheet3.getCell('H7').value = "4";

            worksheet3.mergeCells('I7');
            worksheet3.getCell('I7').value = "5";

            worksheet3.mergeCells('J7');
            worksheet3.getCell('J7').value = "6";

            worksheet3.mergeCells('K7');
            worksheet3.getCell('K7').value = "7";

            worksheet3.mergeCells('L7');
            worksheet3.getCell('L7').value = "8";

            worksheet3.mergeCells('M7');
            worksheet3.getCell('M7').value = "9";

            worksheet3.mergeCells('N7');
            worksheet3.getCell('N7').value = "10";

            worksheet3.mergeCells('O7');
            worksheet3.getCell('O7').value = "11";

            worksheet3.mergeCells('P7');
            worksheet3.getCell('P7').value = "12";

            worksheet3.mergeCells('Q7');
            worksheet3.getCell('Q7').value = "13";

            worksheet3.mergeCells('R7');
            worksheet3.getCell('R7').value = "14";

            worksheet3.mergeCells('S7');
            worksheet3.getCell('S7').value = "15";

            worksheet3.mergeCells('T7');
            worksheet3.getCell('T7').value = "16";

            worksheet3.mergeCells('U7');
            worksheet3.getCell('U7').value = "17";

            worksheet3.mergeCells('V7');
            worksheet3.getCell('V7').value = "18";

            worksheet3.mergeCells('W7');
            worksheet3.getCell('W7').value = "19";

            worksheet3.mergeCells('X7');
            worksheet3.getCell('X7').value = "20";

            worksheet3.mergeCells('Y7');
            worksheet3.getCell('Y7').value = "21";

            worksheet3.mergeCells('Z7');
            worksheet3.getCell('Z7').value = "22";

            worksheet3.mergeCells('AA7');
            worksheet3.getCell('AA7').value = "23";

            worksheet3.mergeCells('AB7');
            worksheet3.getCell('AB7').value = "24";

            worksheet3.mergeCells('AC7');
            worksheet3.getCell('AC7').value = "25";

            worksheet3.mergeCells('AD7');
            worksheet3.getCell('AD7').value = "26";

            worksheet3.mergeCells('AE7');
            worksheet3.getCell('AE7').value = "27";

            worksheet3.mergeCells('AF7');
            worksheet3.getCell('AF7').value = "28";

            worksheet3.mergeCells('AG7');
            worksheet3.getCell('AG7').value = "29";

            worksheet3.mergeCells('AH7');
            worksheet3.getCell('AH7').value = "30";

            worksheet3.mergeCells('AI7');
            worksheet3.getCell('AI7').value = "31";

            for (let i = 0; i < dailychecks.length; i++) {
                let temp = 8 + i;
                worksheet3.getCell('A' + temp).value = i + 1;
                worksheet3.getCell('A' + temp).alignment = { vertical: 'middle', horizontal: 'center' };
                worksheet3.mergeCells(temp, 2, temp, 3);
                worksheet3.getCell(temp, 2, temp, 3).value = dailychecks[i].cpslno2.checkpoints;
                worksheet3.getCell('D' + temp).value = "D";
                worksheet3.getCell('D' + temp).alignment = { vertical: 'middle', horizontal: 'center' };


                let d = new Date (dailychecks[i].date);
                const date = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
                let datescounts = date[d.getDate()];
                let counts = datescounts - 1;
                switch (counts) {

                    case 0:
                        worksheet3.getCell('E' + temp).value = "X";
                        break;
                    case 1:
                        worksheet3.getCell('F' + temp).value = "X";
                        break;
                    case 2:
                        worksheet3.getCell('G' + temp).value = "X";
                        break;
                    case 3:
                        worksheet3.getCell('H' + temp).value = "X";
                        break;
                    case 4:
                        worksheet3.getCell('I' + temp).value = "X";
                        break;
                    case 5:
                        worksheet3.getCell('J' + temp).value = "X";
                        break;
                    case 6:
                        worksheet3.getCell('K' + temp).value = "X";
                        break;
                    case 7:
                        worksheet3.getCell('L' + temp).value = "X";
                        break;
                    case 8:
                        worksheet3.getCell('M' + temp).value = "X";
                        break;
                    case 9:
                        worksheet3.getCell('N' + temp).value = "X";
                        break;
                    case 10:
                        worksheet3.getCell('O' + temp).value = "X";
                        break;
                    case 11:
                        worksheet3.getCell('P' + temp).value = "X";
                        break;
                    case 12:
                        worksheet3.getCell('Q' + temp).value = "X";
                        break;
                    case 13:
                        worksheet3.getCell('R' + temp).value = "X";
                        break;
                    case 14:
                        worksheet3.getCell('S' + temp).value = "X";
                        break;
                    case 15:
                        worksheet3.getCell('T' + temp).value = "X";
                        break;
                    case 16:
                        worksheet3.getCell('U' + temp).value = "X";
                        break;
                    case 17:
                        worksheet3.getCell('V' + temp).value = "X";
                        break;
                    case 18:
                        worksheet3.getCell('W' + temp).value = "X";
                        break;
                    case 19:
                        worksheet3.getCell('X' + temp).value = "X";
                        break;
                    case 20:
                        worksheet3.getCell('Y' + temp).value = "X";
                        break;
                    case 21:
                        worksheet3.getCell('Z' + temp).value = "X";
                        break;
                    case 22:
                        worksheet3.getCell('AA' + temp).value = "X";
                        break;
                    case 23:
                        worksheet3.getCell('AB' + temp).value = "X";
                        break;
                    case 24:
                        worksheet3.getCell('AC' + temp).value = "X";
                        break;
                    case 25:
                        worksheet3.getCell('AD' + temp).value = "X";
                        break;
                    case 26:
                        worksheet3.getCell('AE' + temp).value = "X";
                        break;
                    case 27:
                        worksheet3.getCell('AF' + temp).value = "X";
                        break;
                    case 28:
                        worksheet3.getCell('AG' + temp).value = "X";
                        break;
                    case 29:
                        worksheet3.getCell('AH' + temp).value = "X";
                        break;
                    case 30:
                        worksheet3.getCell('AI' + temp).value = "X";
                        break;

                }
            }

            // ---------------BreakDown Register----------------------//

            let worksheet4 = workbook.addWorksheet('Break Down Register'); // creating worksheet4
            // worksheet4.pageSetup.printArea = 'A1:AN213';
            worksheet4.getRow(5).height = 60;
            worksheet4.getRow(6).height = 60;
            worksheet4.getRow(7).height = 60;
            worksheet4.getRow(8).height = 60;
            worksheet4.getRow(9).height = 60;
            worksheet4.getRow(10).height = 60;
            worksheet4.getRow(11).height = 60;
            worksheet4.getRow(12).height = 60;
            worksheet4.getRow(13).height = 60;
            worksheet4.getRow(14).height = 80;
            worksheet4.columns = [{ key: 'A', width: 5.0 }, { key: 'B', width: 15.0 }, { key: 'C', width: 20.0 }, { key: 'D', width: 20.0 }, { key: 'E', width: 20.0 }, { key: 'F', width: 15.0 }, { key: 'G', width: 15.0 }, { key: 'H', width: 15.0 }, { key: 'I', width: 15.0 }, { key: 'J', width: 15.0 }, { key: 'K', width: 15.0 }, { key: 'L', width: 15.0 }, { key: 'M', width: 15.0 }];
            worksheet4.columns.forEach((col) => {
                col.style.font = {
                    size: 10,
                    bold: true
                };
                col.style.alignment = { vertical: 'middle', horizontal: 'center' };
                col.style.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            })

            worksheet4.mergeCells('A1:B4');
            worksheet4.getCell('A1:B4').value = "TRIMS";
            worksheet4.getCell('A1:B4').font = {
                size: 11,
                bold: true
            };
            worksheet4.getCell('A1:B4').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet4.mergeCells('C1:I2');
            worksheet4.getCell('C1:I2').value = "TRIMS SOLUTIONS";
            worksheet4.getCell('C1:I2').font = {
                size: 11,
                bold: true
            };
            worksheet4.getCell('C1:I2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet4.mergeCells('C3:I4');
            worksheet4.getCell('C3:I4').value = "BREAK DOWN REGISTER";
            worksheet4.getCell('C3:I4').font = {
                size: 11,
                bold: true
            };
            worksheet4.getCell('C3:I4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet4.mergeCells('J1:M1');
            worksheet4.getCell('J1:M1').value = "Format No. TRIM SOLUTIONS/MTN/R05";
            worksheet4.getCell('J1:M1').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet4.mergeCells('J2:M2');
            worksheet4.getCell('J2:M2').value = "Issue Date : 01.02.2019";
            worksheet4.getCell('J2:M2').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet4.mergeCells('J3:M3');
            worksheet4.getCell('J3:M3').value = "Rev. No. 00	";
            worksheet4.getCell('J3:M3').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet4.mergeCells('J4:M4');
            worksheet4.getCell('J4:M4').value = "Rev Date :";
            worksheet4.getCell('J4:M4').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet4.mergeCells('A5');
            worksheet4.getCell('A5').value = "Sl. No";
            worksheet4.getCell('A5').font = {
                size: 11,
                bold: true
            };
            worksheet4.mergeCells('B5');
            worksheet4.getCell('B5').value = "Date";
            worksheet4.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet4.mergeCells('C5');
            worksheet4.getCell('C5').value = "Machine Name / No";
            worksheet4.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet4.mergeCells('D5');
            worksheet4.getCell('D5').value = "Details of Breakdown";
            worksheet4.getCell('D5').font = {
                size: 11,
                bold: true
            };
            worksheet4.mergeCells('E5');
            worksheet4.getCell('E5').value = "Rectification  Details";
            worksheet4.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet4.mergeCells('F5');
            worksheet4.getCell('F5').value = "Spares Used";
            worksheet4.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet4.mergeCells('G5');
            worksheet4.getCell('G5').value = "Spares Quantity";
            worksheet4.getCell('G5').font = {
                size: 11,
                bold: true
            };
            worksheet4.mergeCells('H5');
            worksheet4.getCell('H5').value = "Cost of Spares";
            worksheet4.getCell('H5').font = {
                size: 11,
                bold: true
            };
            worksheet4.mergeCells('I5');
            worksheet4.getCell('I5').value = "Breakdown Hours";
            worksheet4.getCell('I5').font = {
                size: 11,
                bold: true
            };
            worksheet4.mergeCells('J5');
            worksheet4.getCell('J5').value = "Total Cost ";
            worksheet4.getCell('J5').font = {
                size: 11,
                bold: true
            };
            worksheet4.mergeCells('K5');
            worksheet4.getCell('K5').value = "Attended By";
            worksheet4.getCell('K5').font = {
                size: 11,
                bold: true
            };
            worksheet4.mergeCells('L5');
            worksheet4.getCell('L5').value = "Remarks";
            worksheet4.getCell('L5').font = {
                size: 11,
                bold: true
            };

            worksheet4.mergeCells('M5');
            worksheet4.getCell('M5').value = "File Name";
            worksheet4.getCell('M5').font = {
                size: 11,
                bold: true
            };

            for (let i = 0; i < breakDownRegs.length; i++) {
                let temp = i + 6;
                worksheet4.mergeCells('A' + temp);
                worksheet4.getCell('A' + temp).value = i + 1;

                worksheet4.mergeCells('B' + temp);
                worksheet4.getCell('B' + temp).value = breakDownRegs[i].date;

                worksheet4.mergeCells('C' + temp);
                worksheet4.getCell('C' + temp).value = breakDownRegs[i].mslno2.mcode;
                worksheet4.mergeCells('D' + temp);
                worksheet4.getCell('D' + temp).value = breakDownRegs[i].bdsl2.name;

                worksheet4.mergeCells('E' + temp);
                worksheet4.getCell('E' + temp).value = breakDownRegs[i].pasl2.name;

                worksheet4.mergeCells('F' + temp);
                worksheet4.getCell('F' + temp).value = breakDownRegs[i].sslno2.spares;

                worksheet4.mergeCells('G' + temp);
                worksheet4.getCell('G' + temp).value = breakDownRegs[i].sparesQty;

                worksheet4.mergeCells('H' + temp);
                worksheet4.getCell('H' + temp).value = breakDownRegs[i].sslno2.sparescost;

                worksheet4.mergeCells('I' + temp);
                worksheet4.getCell('I' + temp).value = breakDownRegs[i].endTime;

                worksheet4.mergeCells('J' + temp);
                worksheet4.getCell('J' + temp).value = breakDownRegs[i].spareCost;

                worksheet4.mergeCells('K' + temp);
                worksheet4.getCell('K' + temp).value = breakDownRegs[i].attendby;

                worksheet4.mergeCells('L' + temp);
                worksheet4.getCell('L' + temp).value = breakDownRegs[i].remarks;

                worksheet4.mergeCells('M' + temp);
                worksheet4.getCell('M' + temp).value = breakDownRegs[i].filename;
            }

            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });
        }
    }
}