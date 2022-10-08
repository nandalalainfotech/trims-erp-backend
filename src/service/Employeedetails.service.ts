import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EmployeeDetailsDTO } from "src/dto/employeedetails.dto";
import { Emp001mb } from "src/entity/Emp001mb";
import { Request } from "supertest";
import { Repository } from "typeorm";
import { Response } from "express";
import { createReadStream } from "fs";

var path = require('path');
const excel = require('exceljs');

var fs = require('fs');

var path = require('path');
var pdf = require('dynamic-html-pdf');

@Injectable()
export class EmployeeDetailsService {

    constructor(
        @InjectRepository(Emp001mb) private readonly empRepository: Repository<Emp001mb>) {

    }
    async create(file: any, employeedetailsDTO: EmployeeDetailsDTO): Promise<Emp001mb> {
        const emp001mb = new Emp001mb();
        emp001mb.setProperties(employeedetailsDTO);
        emp001mb.originalfilename = file.filename;
        return this.empRepository.save(emp001mb);
    }
    async update(file: any, employeedetailsDTO: EmployeeDetailsDTO): Promise<Emp001mb> {
        const emp001mb = new Emp001mb();
        emp001mb.setProperties(employeedetailsDTO);
        emp001mb.originalfilename = file.filename;
        await this.empRepository.update({ slNo: emp001mb.slNo }, emp001mb);
        return emp001mb;
    }

    async findAll(unitslno: number): Promise<Emp001mb[]> {
        return await this.empRepository.find({order: { slNo: "DESC" },where: {'unitslno': unitslno} });
    }

    findOne(id: number): Promise<Emp001mb> {
        return this.empRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.empRepository.delete(slNo);
    }
    




    async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {
        let employeedetails: any[] = await this.empRepository.find({where:{unitslno:unitslno}
        });


        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('employeedetails.html', 'utf8');

        var options = {
            format: "A3",
            orientation: "Landscape",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {
                
                employeedetailscheck: employeedetails
            },
            path: "./pdf/employeedetails.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "employeedetails.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };
    }


    async downloadExcel(unitslno:any,@Req() request: Request, @Res() response: Response) {
        let employeedetails = await this.empRepository.find({
           where:{unitslno:unitslno}
        });



        if (employeedetails.length < 0) {
            return;
        } else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Employee_Details_Reports'); // creating worksheet
            // worksheet.pageSetup.printArea = 'A1:AN213';
            worksheet.getRow(5).height = 60;
            worksheet.getRow(6).height = 60;
            worksheet.getRow(7).height = 60;
            worksheet.getRow(8).height = 60;
            worksheet.getRow(9).height = 60;
            worksheet.getRow(10).height = 60;
            worksheet.getRow(11).height = 60;
            worksheet.getRow(12).height = 60;
            worksheet.getRow(13).height = 60;
            worksheet.getRow(14).height = 80;
            worksheet.columns = [{ key: 'A', width: 5.0 },
             { key: 'B', width: 25.0 },
              { key: 'C', width: 30.0 },
               { key: 'D', width: 30.0 }, 
               { key: 'E', width: 30.0 },
                { key: 'F', width: 30.0 },
                 { key: 'G', width: 30.0 },
                  { key: 'H', width: 30.0 },
                   { key: 'I', width: 30.0 },
                    { key: 'J', width: 30.0 },
                     { key: 'K', width: 30.0 },
                      { key: 'L', width: 30.0 },
                       { key: 'M', width: 30.0 },
                       { key: 'N', width: 30.0 },
                       { key: 'O', width: 30.0 },
                       { key: 'P', width: 30.0 },
                       { key: 'Q', width: 30.0 },
                       { key: 'R', width: 30.0 },
                       { key: 'S', width: 30.0 }];
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
            worksheet.mergeCells('C1:O2');
            worksheet.getCell('C1:O2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('C1:O2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C1:O2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('C3:O4');
            worksheet.getCell('C3:O4').value = "EMPLOYEE DETAILS";
            worksheet.getCell('C3:O4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C3:O4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('P1:S1');
            worksheet.getCell('P1:S1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('P1:S1').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('P2:S2');
            worksheet.getCell('P2:S2').value = "Issue Date : 01.02.2019";
            worksheet.getCell('P2:S2').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('P3:S3');
            worksheet.getCell('P3:S3').value = "Rev. No. 00	";
            worksheet.getCell('P3:S3').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('P4:S4');
            worksheet.getCell('P4:S4').value = "Rev Date :";
            worksheet.getCell('P4:S4').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet.mergeCells('A5');
            worksheet.getCell('A5').value = "Sl. No";
            worksheet.getCell('A5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('B5');
            worksheet.getCell('B5').value = "Employee Code";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Employee Name";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Designation";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Age";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "Date of Joining";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "Date of Birth";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('H5');
            worksheet.getCell('H5').value = "Father Name";
            worksheet.getCell('H5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('I5');
            worksheet.getCell('I5').value = "Blood Group";
            worksheet.getCell('I5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('J5');
            worksheet.getCell('J5').value = "Gender";
            worksheet.getCell('J5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('K5');
            worksheet.getCell('K5').value = "Maritial Status";
            worksheet.getCell('K5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('L5');
            worksheet.getCell('L5').value = "No of Children";
            worksheet.getCell('L5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('M5');
            worksheet.getCell('M5').value = "No of Dependants";
            worksheet.getCell('M5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('N5');
            worksheet.getCell('N5').value = "Temporary Address";
            worksheet.getCell('N5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('O5');
            worksheet.getCell('O5').value = "Permanent Address";
            worksheet.getCell('O5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('P5');
            worksheet.getCell('P5').value = "Educational Qualification";
            worksheet.getCell('P5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('Q5');
            worksheet.getCell('Q5').value = "Experience";
            worksheet.getCell('Q5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('R5');
            worksheet.getCell('R5').value = "Previous Training Details";
            worksheet.getCell('R5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('S5');
            worksheet.getCell('S5').value = "File Details";
            worksheet.getCell('S5').font = {
                size: 11,
                bold: true
            };

            for (let i = 0; i < employeedetails.length; i++) {
                let temp = i + 6;
                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = employeedetails[i].empcode;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = employeedetails[i].empname;
                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = employeedetails[i].des;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = employeedetails[i].age;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = employeedetails[i].doj;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).value = employeedetails[i].dob;

                worksheet.mergeCells('H' + temp);
                worksheet.getCell('H' + temp).value = employeedetails[i].fname;

                worksheet.mergeCells('I' + temp);
                worksheet.getCell('I' + temp).value = employeedetails[i].bgroup;

                worksheet.mergeCells('J' + temp);
                worksheet.getCell('J' + temp).value = employeedetails[i].female;

                worksheet.mergeCells('K' + temp);
                worksheet.getCell('K' + temp).value = employeedetails[i].married;

                worksheet.mergeCells('L' + temp);
                worksheet.getCell('L' + temp).value = employeedetails[i].child;

                worksheet.mergeCells('M' + temp);
                worksheet.getCell('M' + temp).value = employeedetails[i].dep;

                worksheet.mergeCells('N' + temp);
                worksheet.getCell('N' + temp).value = employeedetails[i].add1;

                worksheet.mergeCells('O' + temp);
                worksheet.getCell('O' + temp).value = employeedetails[i].add2;

                worksheet.mergeCells('P' + temp);
                worksheet.getCell('P' + temp).value = employeedetails[i].edu;

                worksheet.mergeCells('Q' + temp);
                worksheet.getCell('Q' + temp).value = employeedetails[i].exp;

                worksheet.mergeCells('R' + temp);
                worksheet.getCell('R' + temp).value = employeedetails[i].det;

                worksheet.mergeCells('S' + temp);
                worksheet.getCell('S' + temp).value = employeedetails[i].filename;

            }

            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });
        }
    }
}

    /*  old data  */
   