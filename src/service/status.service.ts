import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StatusDTO } from "src/dto/Status.dto";
import { Status001mb } from "src/entity/Status001mb";
import { Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest"
import { createReadStream } from "fs";
var path = require('path');
var fs = require('fs');
const excel = require('exceljs');
var pdf = require('dynamic-html-pdf');

@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status001mb) private readonly statusRepository: Repository<Status001mb>) {

    }
    async create(statusDTO: StatusDTO): Promise<Status001mb> {
        const status001mb = new Status001mb();
        status001mb.setProperties(statusDTO);
        return this.statusRepository.save(status001mb);
    }
    async update(statusDTO: StatusDTO): Promise<Status001mb> {
        const status001mb = new Status001mb();
        status001mb.setProperties(statusDTO);
        await this.statusRepository.update({ slNo: status001mb.slNo }, status001mb);
        return status001mb;
    }

    async findAll(): Promise<Status001mb[]> {
        return await this.statusRepository.find({order: { slNo: "DESC" },});
    }

    async findAllByStatusId(): Promise<Status001mb[]> {
        return this.statusRepository.find({ where: { codeGroup: 4 } });
    }

    async findAllByApporuvedId(): Promise<Status001mb[]> {
        return this.statusRepository.find({ where: { codeGroup: 1 } });
    }

   

    findOne(id: number): Promise<Status001mb> {
        return this.statusRepository.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.statusRepository.delete(id);
    }

    async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {
        let status = await this.statusRepository.find({where:{unitslno:unitslno}});
        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('status.html', 'utf8');
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


                statuscheck: status
            },
            path: "./pdf/status.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "status.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };


    }









    async downloadExcel(unitslno:any,@Req() request: Request, @Res() response: Response) {
        let status = await this.statusRepository.find({where:{unitslno:unitslno}});



        if (status.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('status_reports'); // creating worksheet
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
            worksheet.mergeCells('B1:C2');
            worksheet.getCell('B1:C2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('B1:C2').fgColor = { argb: 'b03600' };
            worksheet.getCell('B1:C2').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('B3:C4');
            worksheet.getCell('B3:C4').value = "LIST OF MACHINE STATUS DETAILS";
            worksheet.getCell('B3:C4').fgColor = { argb: '00b050' };

            worksheet.getCell('B3:C4').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('D1');
            worksheet.getCell('D1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('D1').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('D2');
            worksheet.getCell('D2').value = "Issue Date : 01.02.2019";
            worksheet.getCell('D2').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('D3');
            worksheet.getCell('D3').value = "Rev. No. 00	";
            worksheet.getCell('D3').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('D4');
            worksheet.getCell('D4').value = "Rev Date :";
            worksheet.getCell('D4').alignment = { vertical: 'left', horizontal: 'left' };


            worksheet.mergeCells('A5');
            worksheet.getCell('A5').value = "Sl. No";
            worksheet.getCell('A5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('B5');
            worksheet.getCell('B5').value = "Code Group";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Name";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Status ";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };
          

            for (let i = 0; i < status.length; i++) {



                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = status[i].codeGroup;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = status[i].name;

                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = status[i].status;

                
            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }
    }

}