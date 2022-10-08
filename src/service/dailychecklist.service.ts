import { HttpException, HttpStatus, Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DailyChecklistDTO } from "src/dto/DailyChecklist.dto";
import { Dailychecklist001wb } from "src/entity/Dailychecklist001wb";
import { Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
import { createReadStream } from "fs";
const excel = require('exceljs');

@Injectable()
export class DailyCheckListService {

    constructor(
        @InjectRepository(Dailychecklist001wb) private readonly dailycheckRepository: Repository<Dailychecklist001wb>) {
    }

    async create(dailyChecklistDTO: DailyChecklistDTO): Promise<Dailychecklist001wb> {
        let dailychecklists = await this.dailycheckRepository.find({ relations: ["mslno2", "cpslno2"] });
        for (let i = 0; i < dailychecklists.length; i++) {
            let date1 = new Date(dailyChecklistDTO.date).setHours(0, 0, 0, 0);
            let date2 = new Date(dailychecklists[i].date).setHours(0, 0, 0, 0);

            if (date1 == date2 && dailychecklists[i].cpslno2.slNo == dailyChecklistDTO.cpslno) {
                throw new HttpException('Already Check Points Checked', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        const dailychecklist001wb = new Dailychecklist001wb();
        dailychecklist001wb.setProperties(dailyChecklistDTO);
        return this.dailycheckRepository.save(dailychecklist001wb);
    }

    async update(dailyChecklistDTO: DailyChecklistDTO): Promise<Dailychecklist001wb> {
        const dailychecklist001wb = new Dailychecklist001wb();
        dailychecklist001wb.setProperties(dailyChecklistDTO);
        await this.dailycheckRepository.update({ slNo: dailychecklist001wb.slNo }, dailychecklist001wb);
        return dailychecklist001wb;
    }

    async findAll(): Promise<Dailychecklist001wb[]> {
        return await this.dailycheckRepository.find({order: { slNo: "DESC" }, relations: ["mcslno2",] });
    }

    async findAllByMachineId(mslno: number, unitslno: number): Promise<Dailychecklist001wb[]> {
        return this.dailycheckRepository.find({ order: { slNo: "DESC" },relations: ["mslno2", "cpslno2"], where: { "mslno": mslno, 'unitslno': unitslno } });
    }

    findOne(id: number): Promise<Dailychecklist001wb> {
        return this.dailycheckRepository.findOne(id);
    }

    async remove(slNo: number): Promise<void> {
        await this.dailycheckRepository.delete(slNo);
    }

    async downloadPdf(mslno: number,unitslno: number, @Req() request: Request, @Res() response: Response) {

        let dailychecks = await this.dailycheckRepository.find({
            relations: ["mslno2", "cpslno2"],
            where: { mslno:mslno,unitslno:unitslno  },
        });

        let i = 0;
        let dailycheckslist = dailychecks[i];

        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const d = new Date(dailycheckslist.date);
        let monthName = month[d.getMonth()];

        let Year = d.getFullYear();

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('dailyCheck.html', 'utf8');

    

        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {
                dailyChecks: dailychecks,
                // dailyChecksList: dailycheckslist,
                // monthnames: monthName,
                // years: Year,
            },
            path: "./pdf/dailychecklist.pdf"    // it is not required if type is buffer
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
        let dailychecks = await this.dailycheckRepository.find({
            relations: ["mslno2", "cpslno2"],
            where: { mslno:mslno,unitslno:unitslno  },
        });

        
        if (dailychecks.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('dailychecks_reports'); // creating worksheet
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
            worksheet.getCell('B3:D4').value = "DAILY  MAINTENANCE CHECKLIST";
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
            worksheet.getCell('E2:E2').value = "Issue Date : 01.02.2019";
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
            worksheet.getCell('B5').value = "MACHINE CODE";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = " MACHINE NAME";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = " CHECK POINTS";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "DATE";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };

          
          
          
           
           




            for (let i = 0; i < dailychecks.length; i++) {


                
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = dailychecks[i].mslno2.mcode;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = dailychecks[i].mslno2.mname;
                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = dailychecks[i].cpslno2.checkpoints;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = dailychecks[i].date;

               

            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }
    }
 
}

