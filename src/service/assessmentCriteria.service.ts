import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AssessmentCriteriaDTO } from "src/dto/assessmentCriteria.dto";
import { Assessmentcriteria001mb } from "src/entity/Assessmentcriteria001mb";
import { Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
import { createReadStream } from "fs";


var path = require('path');
var fs = require('fs');
const excel = require('exceljs');
var pdf = require('dynamic-html-pdf');

@Injectable()
export class AssessmentCriteriaService {
    constructor(
        @InjectRepository(Assessmentcriteria001mb) private readonly AssessCriteriaRegRepository: Repository<Assessmentcriteria001mb>) {
    }

    async create(assessmentCriteriaDTO: AssessmentCriteriaDTO): Promise<Assessmentcriteria001mb> {
        const assessmentcriteria001mb = new Assessmentcriteria001mb();
        assessmentcriteria001mb.setProperties(assessmentCriteriaDTO);
        return this.AssessCriteriaRegRepository.save(assessmentcriteria001mb);
    }

    async update(assessmentCriteriaDTO: AssessmentCriteriaDTO): Promise<Assessmentcriteria001mb> {
        const assessmentcriteria001mb = new Assessmentcriteria001mb();
        assessmentcriteria001mb.setProperties(assessmentCriteriaDTO);
        await this.AssessCriteriaRegRepository.update({ slNo: assessmentcriteria001mb.slNo },assessmentcriteria001mb);
        return assessmentcriteria001mb;
    }

    async findAll(unitslno:any): Promise<Assessmentcriteria001mb[]> {
        return this.AssessCriteriaRegRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno}});
    }

    findOne(id: number): Promise<Assessmentcriteria001mb> {
        return this.AssessCriteriaRegRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.AssessCriteriaRegRepository.delete(id);
    }



async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {
        
        let assescrtiter = await this.AssessCriteriaRegRepository.find({where:{unitslno:unitslno}});

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('assescrtiter.html', 'utf8');

        
        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {                  
                               
                assescrtitercheck: assescrtiter
             },
            path: "./pdf/assescrtiter.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "assescrtiter.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };


    }
    async downloadExcel(unitslno:any,@Req() request: Request, @Res() response: Response) {
        
        
        let assescrtiter = await this.AssessCriteriaRegRepository.find({where:{unitslno:unitslno}});
        


        if (assescrtiter.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Assessment_Criteria_Reports'); // creating worksheet
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
            worksheet.mergeCells('B1:D2');
            worksheet.getCell('B1:D2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('B1:D2').fgColor = { argb: 'b03600' };  
            worksheet.getCell('B1:D2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('B1:D2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('B3:D4');
            worksheet.getCell('B3:D4').value = "ASSESSMENT CRITERIA DETAILS";
            worksheet.getCell('B3:D4').fgColor = { argb: '00b050' };  

            worksheet.getCell('B3:D4').font = {                
                size: 11,
                bold: true
            };
            worksheet.getCell('B3:D4').alignment = { vertical: 'middle', horizontal: 'center' };

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
            worksheet.getCell('B5').value = "Assessment Criteria";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Details Verified";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Max Score";
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






            for (let i = 0; i < assescrtiter.length; i++) {


                
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = assescrtiter[i].criteria;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = assescrtiter[i].details;
                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = assescrtiter[i].max;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = assescrtiter[i].status;




            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }
    }
}