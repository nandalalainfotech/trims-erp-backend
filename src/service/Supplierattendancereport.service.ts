import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SupplierattendancereportDTO } from "src/dto/Supplierattendancereport.dto";
import { Supplierattendancereport001wb } from "src/entity/Supplierattendancereport001wb";
import { Between, Repository } from "typeorm";
import { Request } from "supertest";
import { Response } from "express";
import { createReadStream } from "fs";
const excel = require('exceljs');

@Injectable()
export class SupplierattendanceService {

    constructor(
        @InjectRepository(Supplierattendancereport001wb) private readonly SupplierattendanceRepository: Repository<Supplierattendancereport001wb>) {

    }

    async create(supplierattendancereportDTO: SupplierattendancereportDTO): Promise<Supplierattendancereport001wb> {
        const supplierattendancereport001wb = new Supplierattendancereport001wb();
        supplierattendancereport001wb.setProperties(supplierattendancereportDTO);
        return this.SupplierattendanceRepository.save(supplierattendancereport001wb);
    }

    async update(supplierattendancereportDTO: SupplierattendancereportDTO): Promise<Supplierattendancereport001wb> {
        const supplierattendancereport001wb = new Supplierattendancereport001wb();
        supplierattendancereport001wb.setProperties(supplierattendancereportDTO);
        await this.SupplierattendanceRepository.update({ slNo: supplierattendancereport001wb.slNo }, supplierattendancereport001wb);
        return supplierattendancereport001wb;
    }

    async findAllBySupplierId(supregslNo: number,unitslno:any): Promise<Supplierattendancereport001wb[]> {
        return this.SupplierattendanceRepository.find({order: { slNo: "DESC" }, relations: ["supregslNo2", "trainingslNo2"], where: { "supregslNo": supregslNo,unitslno:unitslno } });
    }

    async findAll(): Promise<Supplierattendancereport001wb[]> {
        return await this.SupplierattendanceRepository.find({ order: { slNo: "DESC" },relations: ["supregslNo2", "trainingslNo2"] });
    }

    findOne(id: number): Promise<Supplierattendancereport001wb> {
        return this.SupplierattendanceRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.SupplierattendanceRepository.delete(id);
    }

    async downloadPdf(supregslNo: number, @Req() request: Request, @Res() response: Response) {

        let attendancereprts = await this.SupplierattendanceRepository.find({
            relations: ["supregslNo2", "trainingslNo2"], where: { supregslNo },
        });

        let trainername = attendancereprts[0].trainerName
        const newdate = new Date();
        let yearplan = newdate.getFullYear();

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('attendanceReports.html', 'utf8');

        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {
                attendReports: attendancereprts,
                trainer: trainername,
                yearPlan: yearplan
            },
            path: "./pdf/Training Attendance Report.pdf"    // it is not required if type is buffer
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
         let attendancereprts = await this.SupplierattendanceRepository.find({
             relations: ["supregslNo2", "trainingslNo2"], where: { supregslNo },
         });
       if (attendancereprts.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('attendancereprts_Details_Reports'); // creating worksheet
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

            worksheet.mergeCells('A1:A4');
            worksheet.getCell('A1:A4').value = "TRIMS";
            worksheet.getCell('A1:A4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('A1:A4').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('B1:G2');
            worksheet.getCell('B1:G2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('B1:G2').fgColor = { argb: 'b03600' };  
            worksheet.getCell('B1:G2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('B1:G2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('B3:G4');
            worksheet.getCell('B3:G4').value = "SUPPLIER ATTENDANCE REPORT FORM";
            worksheet.getCell('B3:G4').fgColor = { argb: '00b050' };  

            worksheet.getCell('B3:G4').font = {                
                size: 11,
                bold: true
            };
            worksheet.getCell('B3:G4').alignment = { vertical: 'middle', horizontal: 'center' };

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
            worksheet.getCell('A5').value = "Sl. No";
            worksheet.getCell('A5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('B5');
            worksheet.getCell('B5').value = "SUPPLIER CODE";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "SUPPLIER NAME";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "TRAINEE NAME";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "TRAINING TOPIC";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "TRAINEE NAME";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "DATE";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('H5');
            worksheet.getCell('H5').value = "TRAINEE ROLE";
            worksheet.getCell('H5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('I5');
            worksheet.getCell('I5').value = "ATTEND STATUS";
            worksheet.getCell('I5').font = {
                size: 11,
                bold: true
            };







            for (let i = 0; i < attendancereprts.length; i++) {


                
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = attendancereprts[i].supregslNo2.supplierCode;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = attendancereprts[i].supregslNo2.supplierName;
                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = attendancereprts[i].trainingslNo2.trainingname;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = attendancereprts[i].traineeName;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = attendancereprts[i].trainingslNo2.trainingname;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).value = attendancereprts[i].date;

                worksheet.mergeCells('H' + temp);
                worksheet.getCell('H' + temp).value = attendancereprts[i].traineeRole;

                worksheet.mergeCells('I' + temp);
                worksheet.getCell('I' + temp).value = attendancereprts[i].attendancestatus;



            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }
    }
}

//     async downloadExcel(supregslNo: number, @Req() request: Request, @Res() response: Response) {
//         let attendancereprts = await this.SupplierattendanceRepository.find({
//             relations: ["supregslNo2", "trainingslNo2"], where: { supregslNo },
//         });

//         if (attendancereprts.length < 0) {
//             return;
//         } else {
//             let workbook = new excel.Workbook();
//             let worksheet = workbook.addWorksheet('Training Attendance Report'); // creating worksheet
//             // worksheet.pageSetup.printArea = 'A1:AN213';

//             worksheet.getRow(5).height = 30;
//             worksheet.getRow(6).height = 60;
//             worksheet.getRow(7).height = 60;
//             worksheet.getRow(8).height = 60;
//             worksheet.getRow(9).height = 60;
//             worksheet.getRow(10).height = 60;
//             worksheet.getRow(11).height = 60;
//             worksheet.getRow(12).height = 60;
//             worksheet.getRow(13).height = 60;
//             worksheet.getRow(14).height = 80;
//             worksheet.columns = [{ key: 'A', width: 20.0 }, { key: 'B', width: 20.0 }, { key: 'C', width: 20.0 }, { key: 'D', width: 8.0 }, { key: 'E', width: 20.0 }, { key: 'F', width: 15.0 }, { key: 'G', width: 15.0 }, { key: 'H', width: 15.0 }];
//             worksheet.columns.forEach((col) => {
//                 col.style.font = {
//                     size: 10,
//                     bold: true
//                 };
//                 // col.style.alignment= { wrapText:true }
//                 col.style.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
//                 col.style.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
//             })

//             worksheet.mergeCells('A1:B4');
//             worksheet.getCell('A1:B4').value = "TRIMS";
//             worksheet.getCell('A1:B4').font = {
//                 size: 11,
//                 bold: true
//             };
//             worksheet.getCell('A1:B4').alignment = { vertical: 'middle', horizontal: 'center' };
//             worksheet.mergeCells('C1:F2');
//             worksheet.getCell('C1:F2').value = "TRIMS SOLUTIONS";
//             worksheet.getCell('C1:F2').font = {
//                 size: 11,
//                 bold: true
//             };
//             worksheet.getCell('C1:F2').alignment = { vertical: 'middle', horizontal: 'center' };
//             worksheet.mergeCells('C3:F4');
//             worksheet.getCell('C3:F4').value = "TRAINING ATTENDANCE REPORT";
//             worksheet.getCell('C3:F4').font = {
//                 size: 11,
//                 bold: true
//             };
//             worksheet.getCell('C3:F4').alignment = { vertical: 'middle', horizontal: 'center' };

//             worksheet.mergeCells('G1:H1');
//             worksheet.getCell('G1:H1').value = "Format No. MPV/PUR/R09";
//             worksheet.getCell('G1:H1').alignment = { vertical: 'left', horizontal: 'left' };
//             worksheet.mergeCells('G2:H2');
//             worksheet.getCell('G2:H2').value = "Issue Date : 01.02.2019";
//             worksheet.getCell('G2:H2').alignment = { vertical: 'left', horizontal: 'left' };
//             worksheet.mergeCells('G3:H3');
//             worksheet.getCell('G3:H3').value = "Rev. No. 00	";
//             worksheet.getCell('G3:H3').alignment = { vertical: 'left', horizontal: 'left' };
//             worksheet.mergeCells('G4:H4');
//             worksheet.getCell('G4:H4').value = "Rev Date :";
//             worksheet.getCell('G4:H4').alignment = { vertical: 'left', horizontal: 'left' };

//             worksheet.mergeCells('A5:D5');
//             worksheet.getCell('A5:D5').value = "Trainer Name:";
//             worksheet.getCell('A5:D5').alignment = { vertical: 'center', horizontal: 'right' };
//             worksheet.getCell('A5:D5').border = {
//                 right: { style: 'thin', color: { argb: 'FFFFFFFF' } }
//             };
//             worksheet.getCell('A5:D5').font = {
//                 size: 12,
//                 bold: true
//             };
//             worksheet.mergeCells('E5:H5');
//             worksheet.getCell('E5:H5').value = attendancereprts[0].trainerName;
//             worksheet.getCell('E5:H5').alignment = { vertical: 'center', horizontal: 'left' };
//             worksheet.getCell('E5:H5').border = {
//                 left: { style: 'thin', color: { argb: 'FFFFFFFF' } }
//             };
//             worksheet.getCell('E5:H5').font = {
//                 size: 12,
//                 bold: true
//             };

//             worksheet.mergeCells('A6');
//             worksheet.getCell('A6').value = "Supplier Name";
//             worksheet.getCell('A6').font = {
//                 size: 11,
//                 bold: true
//             };
//             worksheet.mergeCells('B6');
//             worksheet.getCell('B6').value = "Date";
//             worksheet.getCell('B6').font = {
//                 size: 11,
//                 bold: true
//             };
//             worksheet.mergeCells('C6');
//             worksheet.getCell('C6').value = "Training Topic";
//             worksheet.getCell('C6').font = {
//                 size: 11,
//                 bold: true
//             };
//             worksheet.mergeCells('D6');
//             worksheet.getCell('D6').value = "Sl. No.";
//             worksheet.getCell('D6').font = {
//                 size: 11,
//                 bold: true
//             };
//             worksheet.mergeCells('E6');
//             worksheet.getCell('E6').value = "Trainee Name";
//             worksheet.getCell('E6').font = {
//                 size: 11,
//                 bold: true
//             };
//             worksheet.mergeCells('F6');
//             worksheet.getCell('F6').value = "Trainee Role";
//             worksheet.getCell('F6').font = {
//                 size: 11,
//                 bold: true
//             };
//             worksheet.mergeCells('G6');
//             worksheet.getCell('G6').value = "Attendance Status";
//             worksheet.getCell('G6').font = {
//                 size: 11,
//                 bold: true
//             };
//             worksheet.mergeCells('H6');
//             worksheet.getCell('H6').value = "Signature";
//             worksheet.getCell('H6').font = {
//                 size: 11,
//                 bold: true
//             };

//             for (let i = 0; i < attendancereprts.length; i++) {
//                 let temp = i + 7;
//                 worksheet.mergeCells('A' + temp);
//                 worksheet.getCell('A' + temp).value = attendancereprts[i].supregslNo2.supplierName;

//                 worksheet.mergeCells('B' + temp);
//                 worksheet.getCell('B' + temp).value = attendancereprts[i].date;

//                 worksheet.mergeCells('C' + temp);
//                 worksheet.getCell('C' + temp).value = attendancereprts[i].trainingslNo2.trainingname;
//                 worksheet.mergeCells('D' + temp);
//                 worksheet.getCell('D' + temp).value = i + 1;

//                 worksheet.mergeCells('E' + temp);
//                 worksheet.getCell('E' + temp).value = attendancereprts[i].traineeName;

//                 worksheet.mergeCells('F' + temp);
//                 worksheet.getCell('F' + temp).value = attendancereprts[i].traineeRole;

//                 worksheet.mergeCells('G' + temp);
//                 worksheet.getCell('G' + temp).value = attendancereprts[i].attendancestatus;

//                 worksheet.mergeCells('H' + temp);
//                 worksheet.getCell('H' + temp).value = "";
//             }

//             return workbook.xlsx.write(response).then(function () {
//                 response['status'](200).end();
//             });
//         }
//     }
// }