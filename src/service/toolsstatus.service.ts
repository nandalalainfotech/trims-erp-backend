import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StatusDTO } from "src/dto/Status.dto";
import { Status001mb } from "src/entity/Status001mb";
import { Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest"
import { createReadStream } from "fs";
import { Fixturestatus001mb } from "src/entity/Fixturestatus001mb";
import { FixtureStatusDTO } from "src/dto/FixtureStatus.dto";
import { Toolsstatus001mb } from "src/entity/Toolsstatus001mb";
import { ToolsStatusDTO } from "src/dto/toolsstatusdto";
var path = require('path');
var fs = require('fs');
const excel = require('exceljs');
var pdf = require('dynamic-html-pdf');

@Injectable()
export class ToolsStatusService {
    constructor(
        @InjectRepository(Toolsstatus001mb) private readonly toolsstatusRepository: Repository<Toolsstatus001mb>) {

    }
    async create(toolsstatusDTO: ToolsStatusDTO): Promise<Toolsstatus001mb> {
        const toolsstatus001mb = new Toolsstatus001mb();
        toolsstatus001mb.setProperties(toolsstatusDTO);
        return this.toolsstatusRepository.save(toolsstatus001mb);
    }
    async update(toolsstatusDTO: ToolsStatusDTO): Promise<Toolsstatus001mb> {
        const toolsstatus001mb = new Toolsstatus001mb();
        toolsstatus001mb.setProperties(toolsstatusDTO);
        await this.toolsstatusRepository.update({ slNo: toolsstatus001mb.slNo }, toolsstatus001mb);
        return toolsstatus001mb;
    }

    async findAll(unitslno:any): Promise<Toolsstatus001mb[]> {
        return await this.toolsstatusRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno}});
    }

    findOne(id: number): Promise<Toolsstatus001mb> {
        return this.toolsstatusRepository.findOne(id);
    }
    async remove(id: number): Promise<void> {
		await this.toolsstatusRepository.delete(id);
	}


    async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {
        let status = await this.toolsstatusRepository.find({where:{unitslno:unitslno}});
        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('toolsstatus.html', 'utf8');

        
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
            path: "./pdf/toolsstatus.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "toolsstatus.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };


    }









    async downloadExcel(unitslno:any,@Req() request: Request, @Res() response: Response) {
        let status = await this.toolsstatusRepository.find({where:{unitslno:unitslno}});
        


        if (status.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('tools_status_reports'); // creating worksheet
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
            worksheet.getCell('B1:D4').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('B1:D2');
            worksheet.getCell('B1:D2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('B1:D2').fgColor = { argb: 'b03600' };  
            worksheet.getCell('B1:D2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('B1:ED2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('B3:D4');
            worksheet.getCell('B3:D4').value = "LIST OF TOOLS & DIE STATUS DETAILS";
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
            worksheet.getCell('B5').value = "Tools Code Group";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = " Tools Name";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Tools Status";
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