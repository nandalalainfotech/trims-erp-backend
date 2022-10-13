import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest"
import { createReadStream } from "fs";
import { Suppliertype001mb } from "src/entity/Suppliertype001mb";
import { SuppliertypeDTO } from "src/dto/Suppliertype.dto";
const excel = require('exceljs');


@Injectable()
export class SuppliertypeService {
    constructor(
        @InjectRepository(Suppliertype001mb) private readonly  suppliertypeRepository: Repository<Suppliertype001mb>) {

    }
    async create(suppliertypeDTO: SuppliertypeDTO): Promise<Suppliertype001mb> {
        const suppliertype001mb = new Suppliertype001mb();
        suppliertype001mb.setProperties(suppliertypeDTO);
        return this.suppliertypeRepository.save(suppliertype001mb);
    }
    async update(suppliertypeDTO: SuppliertypeDTO): Promise<Suppliertype001mb> {
        const suppliertype001mb = new Suppliertype001mb();
        suppliertype001mb.setProperties(suppliertypeDTO);
        await this.suppliertypeRepository.update({ slNo: suppliertype001mb.slNo }, suppliertype001mb);
        return suppliertype001mb;
    }

    async findAll(unitslno:any): Promise<Suppliertype001mb[]> {
        return await this.suppliertypeRepository.find({order: { slNo: "DESC" },relations:["sslno2"],where:{unitslno:unitslno}});
    }

    findOne(id: number): Promise<Suppliertype001mb> {
        return this.suppliertypeRepository.findOne(id);
    }
    async remove(id: number): Promise<void> {
		await this.suppliertypeRepository.delete(id);
	}

    async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {

        let suptype = await this.suppliertypeRepository.find({where:{unitslno:unitslno},relations:["sslno2"],});

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('suptype.html', 'utf8');
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
                Suptype: suptype
            },
            path: "./pdf/item.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "item.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };


    }

    async downloadExcel(unitslno:any,@Req() request: Request, @Res() response: Response) {

        let suptype = await this.suppliertypeRepository.find({where:{unitslno:unitslno},relations:["sslno2"],});


        if (suptype.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Child Part Details_report'); // creating worksheet
            worksheet.views = [{ showGridLines: false }];

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
                { key: 'A', width: 15.0 },
                { key: 'B', width: 20.0 },
                { key: 'C', width: 20.0 },
                { key: 'D', width: 20.0 },
                { key: 'E', width: 24.0 },
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


            worksheet.mergeCells('B1:D2');
            worksheet.getCell('B1:D2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('B1:D2').fgColor = { argb: 'b03600' };
            worksheet.getCell('B1:D2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('B1:D2').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('B3:D4');
            worksheet.getCell('B3:D4').value = "SUUPLIER TYPE DETAILS";
            worksheet.getCell('B3:D4').fgColor = { argb: '00b050' };

            worksheet.getCell('B3:D4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('B3:D4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('E1');
            worksheet.getCell('E1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('E1').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('E2');
            worksheet.getCell('E2').value = "Issue Date : ";
            worksheet.getCell('E2').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('E3');
            worksheet.getCell('E3').value = "Rev. No. 00	";
            worksheet.getCell('E3').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('E4');
            worksheet.getCell('E4').value = "Rev Date :";
            worksheet.getCell('E4').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet.mergeCells('A5');
            worksheet.getCell('A5').value = "Sl. No";
            worksheet.getCell('A5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('B5');
            worksheet.getCell('B5').value = "Name";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Description";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Order";
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
         
           




            for (let i = 0; i < suptype.length; i++) {
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = suptype[i].name;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = suptype[i].descrip;

                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = suptype[i].order;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = suptype[i].sslno2.status;

                
                




            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }

    }
}