import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SupplierreportDTO } from "src/dto/Supplierreport.dto";
import { Supplierreport001wb } from "src/entity/Supplierreport001wb";
import { Repository } from "typeorm";
import { Request } from "supertest";
import { Response } from "express";
import { createReadStream } from "fs";
const excel = require('exceljs');


@Injectable()
export class SupplierreportService {

    constructor(
        @InjectRepository(Supplierreport001wb) private readonly SupplierreportRepository: Repository<Supplierreport001wb>) {

    }
    async create(supplierreportDTO: SupplierreportDTO): Promise<Supplierreport001wb> {
        const supplierreport001wb = new Supplierreport001wb();
        supplierreport001wb.setProperties(supplierreportDTO);
        return this.SupplierreportRepository.save(supplierreport001wb);
    }
    async update(supplierreportDTO: SupplierreportDTO): Promise<Supplierreport001wb> {
        const supplierreport001wb = new Supplierreport001wb();
        supplierreport001wb.setProperties(supplierreportDTO);
        await this.SupplierreportRepository.update({ slNo: supplierreport001wb.slNo }, supplierreport001wb);
        return supplierreport001wb;
    }

    async findAll(): Promise<Supplierreport001wb[]> {
        return await this.SupplierreportRepository.find({order: { slNo: "DESC" },relations: ["supregslNo2", "activeslNo2", "supcheckslNo2"]});
    }

    async findAllBySupplierId(supregslno: number,unitslno:any): Promise<Supplierreport001wb[]> {
        return this.SupplierreportRepository.find({order: { slNo: "DESC" }, relations: ["supregslNo2","activeslNo2", "supcheckslNo2"], where: { "supregslNo": supregslno,unitslno:unitslno } });
    }

    findOne(id: number): Promise<Supplierreport001wb> {
        return this.SupplierreportRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.SupplierreportRepository.delete(slNo);
    }


    async downloadPdf(supregslNo: number, @Req() request: Request, @Res() response: Response) {

        let supreport = await this.SupplierreportRepository.find({
            relations: ["supregslNo2","activeslNo2", "supcheckslNo2"], where: { supregslNo },
        });

         let observation = supreport[0].observation
        // const newdate = new Date();
        // let yearplan = newdate.getFullYear();

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('supreport.html', 'utf8');

        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {
                supreportcheck: supreport
                // trainer: trainername,
                // yearPlan: yearplan
            },
            path: "./pdf/supreport.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "Training Attendance Report.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };
    }



    async downloadExcel(supregslNo: number, @Req() request: Request, @Res() response: Response) {
        let supreport = await this.SupplierreportRepository.find
        ({ relations: ["supregslNo2","activeslNo2", "supcheckslNo2"], where: { supregslNo } });

        if (supreport.length < 0) {
            return;
        } else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Training Attendance Report'); // creating worksheet
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
            worksheet.columns = [
                { key: 'A', width: 20.0 }, 
                { key: 'B', width: 20.0 }, 
                { key: 'C', width: 20.0 }, 
                { key: 'D', width: 20.0 }, 
                { key: 'E', width: 100.0 }, 
                { key: 'F', width: 15.0 }, 
                { key: 'G', width: 15.0 },
                { key: 'H', width: 15.0 }, 
                { key: 'I', width: 15.0 }, 
                 ];
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
            worksheet.mergeCells('C1:G2');
            worksheet.getCell('C1:G2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('C1:G2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C1:G2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('C3:G4');
            worksheet.getCell('C3:G4').value = "SUPPLIER  AUDIT REPORT";
            worksheet.getCell('C3:G4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('H3:I4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('H1:I1');
            worksheet.getCell('H1:I1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('H1:I1').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('H2:I2');
            worksheet.getCell('H2:I2').value = "Issue Date : 01.02.2019";
            worksheet.getCell('H2:I2').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('H3:I3');
            worksheet.getCell('H3:I3').value = "Rev. No. 00	";
            worksheet.getCell('H3:I3').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('H4:I4');
            worksheet.getCell('H4:I4').value = "Rev Date :";
            worksheet.getCell('H4:I4').alignment = { vertical: 'left', horizontal: 'left' };

            
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
            worksheet.getCell('D5').value = "Activity";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };
           
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Check Points";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "Observation";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "Audit Score";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('H5');
            worksheet.getCell('H5').value = "NCR Ref";
            worksheet.getCell('H5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('I5');
            worksheet.getCell('I5').value = "Remarks";
            worksheet.getCell('I5').font = {
                size: 11,
                bold: true
            };
           
            
           
            for (let i = 0; i < supreport.length; i++) {
                let temp = i + 6;
                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;
                
                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = supreport[i].supregslNo2.supplierCode;
                
                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = supreport[i].supregslNo2.supplierName;
                
                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = supreport[i].activeslNo2.activity;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = supreport[i].supcheckslNo2.checkpointsName;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = supreport[i].observation;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).value = supreport[i].auditScore;
               
                worksheet.mergeCells('H' + temp);
                worksheet.getCell('H' + temp).value = supreport[i].ncrRef;
                
                worksheet.mergeCells('I' + temp);
                worksheet.getCell('I' + temp).value = supreport[i].remarks;
               

            }

            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });
        }
    }
}