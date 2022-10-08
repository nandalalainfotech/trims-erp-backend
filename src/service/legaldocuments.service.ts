import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FirstaidMaterialsDTO } from "src/dto/firstaid-materials.dto";
import { LegalDTO } from "src/dto/legaldocuments.dto";
import { Firstaidwb001 } from "src/entity/Firstaidwb001";
import { Legal001mb } from "src/entity/Legal001mb";
import { Between, Repository } from "typeorm";

import { Response } from "express";
import { Request } from "supertest";

import { createReadStream } from "fs";


var path = require('path');
var fs = require('fs');
const excel = require('exceljs');
var pdf = require('dynamic-html-pdf');

@Injectable()
export class LegalDocumentsService {
   
    constructor(
        @InjectRepository(Legal001mb) private readonly legalRepository: Repository<Legal001mb>) {

    }

    async create(legalDTO: LegalDTO): Promise<Legal001mb> {
        const legal001mb = new Legal001mb();    
        legal001mb.setProperties(legalDTO);
        return this.legalRepository.save(legal001mb);
    }
    async update(legalDTO: LegalDTO): Promise<Legal001mb> {
        const legal001mb = new Legal001mb();
        legal001mb.setProperties(legalDTO);
        await this.legalRepository.update({ slNo: legal001mb.slNo }, legal001mb);
        return legal001mb;
    }

    async findAll(unitslno: number): Promise<Legal001mb[]> {
        return await this.legalRepository.find({order: { slNo: "DESC" },where: {'unitslno': unitslno} });
    }


    findOne(id: number): Promise<Legal001mb> {
        return this.legalRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.legalRepository.delete(slNo);
    }


 async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {
        let legaldoc = await this.legalRepository.find({where:{unitslno:unitslno}});

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('legaldoc.html', 'utf8');

       

        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {
                    

                // preplans: preventiveplans,
                legaldoccheck: legaldoc
             },
            path: "./pdf/legaldoc.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "legaldoc.pdf",
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
        let legaldoc = await this.legalRepository.find({where:{unitslno:unitslno}});


        if (legaldoc.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Legal_Doc_Reports'); // creating worksheet
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
                { key: 'A', width: 40.0 },
                { key: 'B', width: 70.0 },
                { key: 'C', width: 50.0 },
                
            ];

            worksheet.columns.forEach((col) => {

                col.style.font = {
                    size: 7,
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


            worksheet.mergeCells('B1:B2');
            worksheet.getCell('B1:B2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('B1:B2').fgColor = { argb: 'b03600' };  
            worksheet.getCell('B1:B2').font = {
                size: 11,
                bold: true                
            };
            worksheet.getCell('B1:B2').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('B3:B4');
            worksheet.getCell('B3:B4').value = "LEGAL DOCUMENT DETAILS";
            worksheet.getCell('B3:B4').fgColor = { argb: '00b050' };  

            worksheet.getCell('B3:B4').font = {                
                size: 11,
                bold: true
            };
            worksheet.getCell('B3:B4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('C1:C1');
            worksheet.getCell('C1:C1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('C1:C1').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('C2:C2');
            worksheet.getCell('C2:C2').value = "Issue Date : 01.02.2019";
            worksheet.getCell('C2:C2').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('C3:C3');
            worksheet.getCell('C3:C3').value = "Rev. No. 00	";
            worksheet.getCell('C3:C3').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('C4:C4');
            worksheet.getCell('C4:C4').value = "Rev Date :";
            worksheet.getCell('C4:C4').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet.mergeCells('A5:A5');
            worksheet.getCell('A5:A5').value = "Sl. No";
            worksheet.getCell('A5:A5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('B5:B5');
            worksheet.getCell('B5:B5').value = "Document Name";
            worksheet.getCell('B5:B5').font = {
                size: 11,
                bold: true
            };
            

            

            for (let i = 0; i < legaldoc.length; i++) {
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);                
                worksheet.getCell('A' + temp).value = i + 1;
                
                worksheet.mergeCells('B' + temp,);
                worksheet.getCell('B' + temp).value = legaldoc[i].dname;

        
            
            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }
        
    }


}