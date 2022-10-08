import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RootcauseDTO } from "src/dto/rootcause.dto";
import { Rootcause001mb } from "src/entity/Rootcause001mb";
import { Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest"
import { createReadStream } from "fs";
import { Fixturerootcause001mb } from "src/entity/Fixturerootcause001mb";
import { FixtureRootcauseDTO } from "src/dto/fixturerootcause.dto";
var path = require('path');
var fs = require('fs');
const excel = require('exceljs');
var pdf = require('dynamic-html-pdf');

@Injectable()
export class FixtureRootcauseService {

    constructor(
        @InjectRepository(Fixturerootcause001mb) private readonly fixtureRootcauseRepository: Repository<Fixturerootcause001mb>) {

    }
    async create(fixturerootcauseDTO: FixtureRootcauseDTO): Promise<Fixturerootcause001mb> {
        const fixturerootcause001mb = new Fixturerootcause001mb();
        fixturerootcause001mb.setProperties(fixturerootcauseDTO);
        return this.fixtureRootcauseRepository.save(fixturerootcause001mb);
    }
    async update(fixturerootcauseDTO: FixtureRootcauseDTO): Promise<Fixturerootcause001mb> {
        const fixturerootcause001mb = new Fixturerootcause001mb();
        fixturerootcause001mb.setProperties(fixturerootcauseDTO);
        await this.fixtureRootcauseRepository.update({ slNo: fixturerootcause001mb.slNo }, fixturerootcause001mb);
        return fixturerootcause001mb;
    }

    async findAll(unitslno:any): Promise<Fixturerootcause001mb[]> {
        return await this.fixtureRootcauseRepository.find({ order: { slNo: "DESC" },relations: ["sslno2","fbrslno2"] ,where:{unitslno:unitslno}});
    }

    async findAllbyBreakDownId(bdslno: number): Promise<Fixturerootcause001mb[]> {
        return this.fixtureRootcauseRepository.find({order: { slNo: "DESC" }, select: ["slNo","fname"], where: { "fbrslno": bdslno } });
    }

    findOne(id: number): Promise<Fixturerootcause001mb> {
        return this.fixtureRootcauseRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.fixtureRootcauseRepository.delete(slNo);
    }

    async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {
        let rootcause = await this.fixtureRootcauseRepository.find({ where:{unitslno:unitslno},relations: ["sslno2","brslno2"] });
        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('rootcause.html', 'utf8');

        
        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {                  
               
                
                rootcausecheck: rootcause
             },
            path: "./pdf/rootcause.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "rootcause.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };


    }



    async downloadExcel(unitslno:any,@Req() request: Request, @Res() response: Response) {
        let rootcause = await this.fixtureRootcauseRepository.find({ where:{unitslno:unitslno},relations: ["sslno2","brslno2"] });
      if (rootcause.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('rootcause_reports'); // creating worksheet
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
            worksheet.getCell('B1:D2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('B3:D4');
            worksheet.getCell('B3:D4').value = "LIST OF ROOTCAUSE DETAILS";
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
            worksheet.getCell('B5').value = "BreakDown Name";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = " Rootcause Name";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = " Details";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Status";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
          
          
           
           




            for (let i = 0; i < rootcause.length; i++) {


                
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = rootcause[i].fbrslno2.name 

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = rootcause[i].fname;
                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = rootcause[i].fdetails;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = rootcause[i].sslno2.name;

            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }
    }
 
}