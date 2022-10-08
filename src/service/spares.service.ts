import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SparesDTO } from "src/dto/spares.dto";
import { Spares001mb } from "src/entity/Spares001mb";
import { Repository } from "typeorm";
import { Request } from "supertest"
import { createReadStream } from "fs";
import { Response } from "express";
var path = require('path');
var fs = require('fs');
const excel = require('exceljs');
var pdf = require('dynamic-html-pdf');

@Injectable()
export class SpareService {
    constructor(
        @InjectRepository(Spares001mb) private readonly spareRepository: Repository<Spares001mb>) {

    }
    async create(sparesDTO: SparesDTO): Promise<Spares001mb> {
        const spares001mb = new Spares001mb();
        spares001mb.setProperties(sparesDTO);
        return this.spareRepository.save(spares001mb);
    }
    async update(sparesDTO: SparesDTO): Promise<Spares001mb> {
        const spares001mb = new Spares001mb();
        spares001mb.setProperties(sparesDTO);
        await this.spareRepository.update({ slNo: spares001mb.slNo }, spares001mb);
        return spares001mb;
    }

    async findAll(unitslno: any): Promise<Spares001mb[]> {
        return await this.spareRepository.find({ order: { slNo: "DESC" },relations: ["msslno2","sslno2"], where: { 'unitslno': unitslno } });
    }

    findOne(id: number): Promise<Spares001mb> {
        return this.spareRepository.findOne(id);
    }
    async remove(id: number): Promise<void> {
		await this.spareRepository.delete(id);
	}



    async downloadPdf(unitslno:any, @Req() request: Request, @Res() response: Response) {
        let spares = await this.spareRepository.find({ relations: ["msslno2","sslno2"],where:{unitslno:unitslno} });
        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('spares.html', 'utf8');

        
        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {                  
               
                
                sparescheck: spares
             },
            path: "./pdf/spares.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "spares.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };


    }









    async downloadExcel(unitslno:any,@Req() request: Request, @Res() response: Response) {
        let spares = await this.spareRepository.find({ relations: ["msslno2","sslno2"],where:{unitslno:unitslno} });


        if (spares.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('spares_reports'); // creating worksheet
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
                { key: 'A', width: 20.0 },
                { key: 'B', width: 20.0 },
                { key: 'C', width: 20.0 },
                { key: 'D', width: 20.0 },
                { key: 'E', width: 20.0 },
                { key: 'F', width: 20.0 },
                { key: 'G', width: 20.0 },
                { key: 'H', width: 20.0 },
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
            worksheet.getCell('C3:H4').value = "LIST OF SPARES DETAILS";
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
            worksheet.getCell('B5').value = "Machine Code";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Spares";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Spares Cost";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Specification";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "Lead Time";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "Minimum stock Level";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('H5');
            worksheet.getCell('H5').value = "Re-order Level(ROL)";
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
           
            
           
            
           
            




            for (let i = 0; i < spares.length; i++) {


                
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = spares[i].msslno2.mcode;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = spares[i].spares;
                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = spares[i].sparescost;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = spares[i].specification;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = spares[i].leadtime;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).value = spares[i].minimumstocklevel;
                
                
                worksheet.mergeCells('H' + temp);
                worksheet.getCell('H' + temp).value = spares[i].reorderlevel;
                
                worksheet.mergeCells('I' + temp);
                worksheet.getCell('I' + temp).value = spares[i].sslno2.name;

            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }
    }
 
}