import { HttpException, HttpStatus, Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DepartmentDTO } from "src/dto/Department.dto";
import { Department001mb } from "src/entity/Department001mb";
import { Repository } from "typeorm";
import { Request } from "supertest";
import { Response } from "express";
import { createReadStream } from "fs";
var path = require('path');
var fs = require('fs');
const excel = require('exceljs');
var pdf = require('dynamic-html-pdf');


@Injectable()
export class DepartmentSettingService {
    constructor(
        @InjectRepository(Department001mb) private readonly departmentRepository: Repository<Department001mb>){
            
        }

        
    async findAll(): Promise<Department001mb[]> {
        return this.departmentRepository.find({order: { slNo: "DESC" }, relations: ["sslno2"] });
    }

    async create(departmentDTO: DepartmentDTO): Promise<Department001mb> {
        let departments = await this.departmentRepository.find();
        for(let i=0;i<departments.length;i++){
            if ( departments[i].department == departmentDTO.department) {
                throw new HttpException('This Department already saved', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        const department001mb = new Department001mb();
        department001mb.setProperties(departmentDTO);
        return this.departmentRepository.save(department001mb);
    } 

    async update(departmentDTO: DepartmentDTO): Promise<Department001mb> {
        let departments = await this.departmentRepository.find();
        for(let i=0;i<departments.length;i++){
            if ( departments[i].department == departmentDTO.department) {
                throw new HttpException('This Department already saved', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        const department001mb = new Department001mb();
        department001mb.setProperties(departmentDTO);
        await this.departmentRepository.update({ slNo: department001mb.slNo }, department001mb);
        return department001mb;
    }

    async remove(slNo: number): Promise<void> {
		await this.departmentRepository.delete(slNo);
	}

    findOne(id: number): Promise<Department001mb> {
        return this.departmentRepository.findOne(id);
    }


    async downloadPdf(@Req() request: Request, @Res() response: Response) {
        let deportment = await this.departmentRepository.find({ relations: ["sslno2"] });
        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('deportment.html', 'utf8');
        let regslno = 0;

        pdf.registerHelper("iforderslno", function (orderslno, options) {
           this.slNo = ++regslno;
          if (this.slNo == undefined) {
          return options.inverse(this);
          } else {
          return options.fn(this, this.slNo);
          }
        });
        
        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {                  
               
                
                deportmentcheck: deportment
             },
            path: "./pdf/deportment.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "deportment.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };


    }

    async downloadExcel(@Req() request: Request, @Res() response: Response) {
        let deportment = await this.departmentRepository.find({ relations: ["sslno2"]});


        if (deportment.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('deportment_reports'); // creating worksheet
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
                { key: 'B', width: 100.0 },
                { key: 'C', width: 45.0 },
                

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
            worksheet.getCell('B1:B4').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('B1:B2');
            worksheet.getCell('B1:B2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('B1:B2').fgColor = { argb: 'b03600' };  
            worksheet.getCell('B1:B2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('B1:B2').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('B3:B4');
            worksheet.getCell('B3:B4').value = "LIST OF DEPARTMENT DETAILS";
            worksheet.getCell('B3:B4').fgColor = { argb: '00b050' };  

            worksheet.getCell('B3:C4').font = {                
                size: 11,
                bold: true
            };
            worksheet.getCell('C3:C4').alignment = { vertical: 'middle', horizontal: 'center' };

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


            worksheet.mergeCells('A5');
            worksheet.getCell('A5').value = "Sl. No";
            worksheet.getCell('A5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('B5');
            worksheet.getCell('B5').value = "Department Name";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value =  "Status";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };

            for (let i = 0; i < deportment.length; i++) {
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = deportment[i].department;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = deportment[i].sslno2.name;

            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });
            

        }
    }
 
}