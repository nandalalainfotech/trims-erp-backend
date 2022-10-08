import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SupplierAssessmentDTO } from "src/dto/supplierAssessment.dto";
import { Supplierassessment001wb } from "src/entity/Supplierassessment001wb";
import { Repository } from "typeorm";
import { Request } from "supertest";
import { Response } from "express";
import { createReadStream } from "fs";
const excel = require('exceljs');

@Injectable()
export class SupplierAssessmentService {
    constructor(
        @InjectRepository(Supplierassessment001wb) private readonly supplierAssessRepository: Repository<Supplierassessment001wb>) {
    }

    async create(supplierAssessmentDTO: SupplierAssessmentDTO): Promise<Supplierassessment001wb> {
        const supplierassessment001wb = new Supplierassessment001wb();
        supplierassessment001wb.setProperties(supplierAssessmentDTO);
        return this.supplierAssessRepository.save(supplierassessment001wb);
    }

    async update(supplierAssessmentDTO: SupplierAssessmentDTO): Promise<Supplierassessment001wb> {
        const supplierassessment001wb = new Supplierassessment001wb();
        supplierassessment001wb.setProperties(supplierAssessmentDTO);
        await this.supplierAssessRepository.update({ slNo: supplierassessment001wb.slNo },
            supplierassessment001wb);
        return supplierassessment001wb;
    }

    async findAll(): Promise<Supplierassessment001wb[]> {
        return this.supplierAssessRepository.find( { order: { slNo: "DESC" },relations: ["assessSlno2","suppSlno2"]});
    }

    async findAllBySupplierId(suppSlno: number,unitslno:any): Promise<Supplierassessment001wb[]> {
        return this.supplierAssessRepository.find({order: { slNo: "DESC" }, relations: ["assessSlno2", "suppSlno2"], 
        where: { "suppSlno": suppSlno,unitslno:unitslno } });
    }

    findOne(id: number): Promise<Supplierassessment001wb> {
        return this.supplierAssessRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.supplierAssessRepository.delete(id);
    }


    async downloadPdf(suppSlno: number, @Req() request: Request, @Res() response: Response) {

        let assessment = await this.supplierAssessRepository.find
        ({ relations: ["assessSlno2", "suppSlno2"], where: { suppSlno } });
        let  score= assessment[0].score

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('assessment.html', 'utf8');

        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {
                assessmentcheck: assessment,
            },
            path: "./pdf/assessment.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "Supplier Assessment Report.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };
    }



    async downloadExcel(suppSlno: number, @Req() request: Request, @Res() response: Response) {
        let assessment = await this.supplierAssessRepository.find({
            relations: ["suppSlno2", "assessSlno2"], where: { suppSlno },
        });

        if (assessment.length < 0) {
            return;
        } else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Supplier Assessment Report'); // creating worksheet
            // worksheet.pageSetup.printArea = 'A1:AN213';

            worksheet.getRow(5).height = 30;
            worksheet.getRow(6).height = 60;
            worksheet.getRow(7).height = 60;
            worksheet.getRow(8).height = 60;
            worksheet.getRow(9).height = 60;
            worksheet.getRow(10).height = 60;
            worksheet.getRow(11).height = 60;
            worksheet.getRow(12).height = 60;
            worksheet.getRow(13).height = 60;
            worksheet.getRow(14).height = 80;
            worksheet.columns = [{ key: 'A', width: 20.0 }, { key: 'B', width: 20.0 }, { key: 'C', width: 20.0 }, { key: 'D', width: 50.0 }, { key: 'E', width: 100.0 }, { key: 'F', width: 15.0 }, { key: 'G', width: 15.0 }, ];
            worksheet.columns.forEach((col) => {
                col.style.font = {
                    size: 10,
                    bold: true
                };
                // col.style.alignment= { wrapText:true }
                col.style.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                col.style.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            })

            worksheet.mergeCells('A1:B4');
            worksheet.getCell('A1:B4').value = "TRIMS";
            worksheet.getCell('A1:B4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('A1:B4').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('C1:E2');
            worksheet.getCell('C1:E2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('C1:E2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C1:E2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('C3:E4');
            worksheet.getCell('C3:E4').value = "SUPPLIER ASSESSMENT FORM";
            worksheet.getCell('C3:E4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('F3:G4').alignment = { vertical: 'middle', horizontal: 'center' };

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
            worksheet.getCell('A5').value = "Sl. No.";
            worksheet.getCell('A5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('B5');
            worksheet.getCell('B5').value = "Supplier Code";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Supplier Name";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Assessment Criteria";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };
           
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Details Verified";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "Max Score";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "Scored";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };
            for (let i = 0; i < assessment.length; i++) {
                let temp = i + 6;
                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;
                
                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = assessment[i].suppSlno2.supplierCode;
                
                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = assessment[i].suppSlno2.supplierName;
                
                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = assessment[i].assessSlno2.criteria;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = assessment[i].assessSlno2.details;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = assessment[i].assessSlno2.max;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).value = assessment[i].score;
                
                // worksheet.mergeCells('D' + temp);
                // worksheet.getCell('D' + temp).value = i + 1;

            }

            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });
        }
    }
}