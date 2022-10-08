import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createReadStream } from "fs";
import { Response } from "express";
import { MachineDTO } from "src/dto/Machine.dto";
import { Machine001mb } from "src/entity/Machine001mb";
import { Request } from "supertest"
var path = require('path');
var fs = require('fs');
const excel = require('exceljs');
var pdf = require('dynamic-html-pdf');

import { getManager, Repository } from "typeorm";
import { Fixture001mb } from "src/entity/Fixture001mb";
import { FixtureDTO } from "src/dto/fixture.dto";
import { Toolsmaster001mb } from "src/entity/Toolsmaster001mb";
import { ToolsMasterDTO } from "src/dto/toolsmaster.dto";

@Injectable()
export class ToolsMasterService {
    constructor(
        @InjectRepository(Toolsmaster001mb) private readonly toolsRepository: Repository<Toolsmaster001mb>) {
    }

    async create(toolsMasterDTO: ToolsMasterDTO): Promise<Toolsmaster001mb> {
        const toolsmaster001mb = new Toolsmaster001mb();
        toolsmaster001mb.setProperties(toolsMasterDTO);
        return this.toolsRepository.save(toolsmaster001mb);
    }

    async update(toolsMasterDTO: ToolsMasterDTO): Promise<Toolsmaster001mb> {
        const toolsmaster001mb = new Toolsmaster001mb();
        toolsmaster001mb.setProperties(toolsMasterDTO);
        await this.toolsRepository.update({ slNo: toolsmaster001mb.slNo }, toolsmaster001mb);
        return toolsmaster001mb;
    }

    async findAll(unitslno:any): Promise<Toolsmaster001mb[]> {
        return this.toolsRepository.find({order: { slNo: "DESC" }, relations: ["tsslno2"] ,where:{unitslno:unitslno}});
    }

    async findAllSlNoAndMcode(unitslno:any): Promise<Toolsmaster001mb[]> {
        return this.toolsRepository.find({select : ['slNo', 'tcode','tname'],where:{unitslno:unitslno}});
    }

    findOne(id: number): Promise<Toolsmaster001mb> {
        return this.toolsRepository.findOne(id);

    }
    async getCount(): Promise<string> {
        const entityManager = getManager();
        let result = await getManager().query('select count(*) as row from toolsmaster001mb',['row']);
        var string=JSON.stringify(result);
        return string;
    }

    async remove(id: string): Promise<void> {
		await this.toolsRepository.delete(id);
	}

    async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {
        let machine = await this.toolsRepository.find({where:{unitslno:unitslno},
            relations: ["tsslno2"],
        });
        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('toolsmaster.html', 'utf8');

        
        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {                  
               
                
                machinecheck: machine
             },
            path: "./pdf/toolsmaster.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "toolsmaster.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };


    }









    async downloadExcel(unitslno:any,@Req() request: Request, @Res() response: Response) {
        let machine = await this.toolsRepository.find({ where:{unitslno:unitslno}, relations: [ "tsslno2", ],});
      
        if (machine.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('tools_reports'); // creating worksheet
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
            worksheet.mergeCells('C1:H2');
            worksheet.getCell('C1:H2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('C1:H2').fgColor = { argb: 'b03600' };  
            worksheet.getCell('C1:H2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C1:H2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('C3:H4');
            worksheet.getCell('C3:H4').value = "LIST OF TOOLS & DIE DETAILS";
            worksheet.getCell('C3:H4').fgColor = { argb: '00b050' };  

            worksheet.getCell('C3:H4').font = {                
                size: 11,
                bold: true
            };
            worksheet.getCell('I3:I4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('I1:I1');
            worksheet.getCell('I1:I1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('I1:I1').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('I2:I2');
            worksheet.getCell('I2:I2').value = "Issue Date : 01.02.2019";
            worksheet.getCell('I2:I2').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('I3:I3');
            worksheet.getCell('I3:I3').value = "Rev. No. 00	";
            worksheet.getCell('I3:I3').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('I4:I4');
            worksheet.getCell('I4:I4').value = "Rev Date :";
            worksheet.getCell('I4:I4').alignment = { vertical: 'left', horizontal: 'left' };



            worksheet.mergeCells('A5');
            worksheet.getCell('A5').value = "Sl. No";
            worksheet.getCell('A5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('B5');
            worksheet.getCell('B5').value = "Tools Code";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Tools Name";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Year of Purchase";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Capacity";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "Type/Size";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "Make";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('H5');
            worksheet.getCell('H5').value = "Location";
            worksheet.getCell('H5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('I5');
            worksheet.getCell('I5').value = "Status";
            worksheet.getCell('I5').font = {
                size: 11,
                bold: true
            };





            for (let i = 0; i < machine.length; i++) {


                
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = machine[i].tcode;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = machine[i].tname;
                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = machine[i].tyear;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = machine[i].tcapacity;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = machine[i].ttype;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).value = machine[i].tmake;
                
                
                worksheet.mergeCells('H' + temp);
                worksheet.getCell('H' + temp).value = machine[i].tlocation;
                
             

            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }
    }
   

}