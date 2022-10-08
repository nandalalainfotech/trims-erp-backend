import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ToolDTO } from "src/dto/Tool.dto";
import { Tool001mb } from "src/entity/Tool001mb";
import { Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
import { Between } from 'typeorm';
import { createReadStream } from "fs";
import { reduce } from "rxjs";
var path = require('path');
var fs = require('fs');
const excel = require('exceljs');
var pdf = require('dynamic-html-pdf');


@Injectable()
export class ToolService {
    constructor(
        @InjectRepository(Tool001mb) private readonly toolRepository: Repository<Tool001mb>) {
    }

    async create(toolDTO: ToolDTO): Promise<Tool001mb> {
        const tool001mb = new Tool001mb();
        tool001mb.setProperties(toolDTO);
        return this.toolRepository.save(tool001mb);
    }

    async update(toolDTO: ToolDTO): Promise<Tool001mb> {
        const tool001mb = new Tool001mb();
        tool001mb.setProperties(toolDTO);
        await this.toolRepository.update({ slNo: tool001mb.slNo }, tool001mb);
        return tool001mb;
    }

    async findAll(unitslno:any): Promise<Tool001mb[]> {
        return this.toolRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno}});
    }

    findOne(id: number): Promise<Tool001mb> {
        return this.toolRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
		await this.toolRepository.delete(id);
	}


async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {
        let tool = await this.toolRepository.find({where:{unitslno:unitslno}});

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('tool.html', 'utf8');

        
        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {                  
               
                // toolcheck: tool
                toolcheck: tool
             },
            path: "./pdf/tool.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "tool.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };


    }









    async downloadExcel(unitslno:any,@Req() request: Request, @Res() response: Response) {
        // let prodDTOs: ProdDTO[] = [];
        let tool = await this.toolRepository.find({where:{unitslno:unitslno}});


        if (tool.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Tools_Details_Reports'); // creating worksheet
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
            worksheet.getCell('A1:A4').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('B1:E2');
            worksheet.getCell('B1:E2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('B1:E2').fgColor = { argb: 'b03600' };  
            worksheet.getCell('B1:E2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('B1:E2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('B3:E4');
            worksheet.getCell('B3:E4').value = "LIST OF TOOLS , JIGS, FIXTURES & ACCEPTANCE GAUGES";
            worksheet.getCell('B3:E4').fgColor = { argb: '00b050' };  

            worksheet.getCell('B3:E4').font = {                
                size: 11,
                bold: true
            };
            worksheet.getCell('B3:E4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('F1:G1');
            worksheet.getCell('F1:G1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('F1:G1').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('F2:G2');
            worksheet.getCell('F2:G2').value = "Issue Date : 01.02.2019";
            worksheet.getCell('F2:G2').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('F3:G3');
            worksheet.getCell('F3:G3').value = "Rev. No. 00	";
            worksheet.getCell('F3:G3').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('F4:G4');
            worksheet.getCell('F4:G4').value = "Rev Date :";
            worksheet.getCell('F4:G4').alignment = { vertical: 'left', horizontal: 'left' };


            worksheet.mergeCells('A5');
            worksheet.getCell('A5').value = "Sl. No";
            worksheet.getCell('A5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('B5');
            worksheet.getCell('B5').value = "Product No";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Fixiture 1";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Fixiture 2";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Fixiture 3";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "Fixiture 4";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "Fixiture 5";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };







            for (let i = 0; i < tool.length; i++) {


                
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = tool[i].pdno;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = tool[i].fix1;
                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = tool[i].fix2;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = tool[i].fix3;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = tool[i].fix4;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).value = tool[i].fix5;



            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }
    }
}