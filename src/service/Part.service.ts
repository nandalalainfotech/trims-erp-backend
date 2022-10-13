import { HttpException, HttpStatus, Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PartDTO } from "src/dto/Part.dto";
import { Part001mb } from "src/entity/Part001mb";
import { Partspecific001wb } from "src/entity/Partspecific001wb";
import { getManager, Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
import { Between } from 'typeorm';
import { createReadStream } from "fs";
var path = require('path');
var fs = require('fs');
const excel = require('exceljs');
var pdf = require('dynamic-html-pdf');


@Injectable()
export class PartService {
    constructor(

        @InjectRepository(Part001mb) private readonly PartRepository: Repository<Part001mb>,
        @InjectRepository(Partspecific001wb) private readonly partspecificRepository: Repository<Partspecific001wb>) {
    }
    
    async create(partDTO: PartDTO): Promise<Part001mb> {

        let partspecific001wbs: Partspecific001wb[] = [];

        for (let i = 0; i < partDTO.partspecific001wbs.length; i++) {
            const partspecific001wb = new Partspecific001wb();

            partspecific001wb.partslno2 = partDTO.partspecific001wbs[i].partslno2;
            partspecific001wb.parameter = partDTO.partspecific001wbs[i].parameter;
            partspecific001wb.specification = partDTO.partspecific001wbs[i].specification;
            partspecific001wb.inspecmethod = partDTO.partspecific001wbs[i].inspecmethod;
            partspecific001wb.unitslno = partDTO.unitslno;
            partspecific001wb.insertUser = partDTO.insertUser;
            partspecific001wb.insertDatetime = partDTO.insertDatetime;
            let supcontact = await this.partspecificRepository.save(partspecific001wb);
            partspecific001wbs.push(supcontact);
        }

        if (partspecific001wbs.length > 0) {

            const part001mb = new Part001mb();
            part001mb.setProperties(partDTO);
            part001mb.partspecific001wbs = partspecific001wbs;
            await this.PartRepository.save(part001mb);
            return part001mb;
        }else{
            throw new HttpException('Please Add Specification Details', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    async update(partDTO: PartDTO): Promise<Part001mb> {

        for (let i = 0; i < partDTO.partspecific001wbs.length; i++) {
            const partspecific001wb = new Partspecific001wb();

            partspecific001wb.partslno = partDTO.partspecific001wbs[i].partslno;
            partspecific001wb.parameter = partDTO.partspecific001wbs[i].parameter;
            partspecific001wb.specification = partDTO.partspecific001wbs[i].specification;
            partspecific001wb.inspecmethod = partDTO.partspecific001wbs[i].inspecmethod;

            partspecific001wb.unitslno = partDTO.unitslno;
            partspecific001wb.updatedUser = partDTO.updatedUser;
            partspecific001wb.updatedDatetime = partDTO.updatedDatetime;

            await this.partspecificRepository.update({slNo: partDTO.partspecific001wbs[i].slNo},partspecific001wb);
        }

        const part001mb = new Part001mb();
        part001mb.setProperties(partDTO);
        await this.PartRepository.update({ slNo: part001mb.slNo }, part001mb);
        return part001mb;
    }

    async findAll(unitslno:any): Promise<Part001mb[]> {        
        return this.PartRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno},relations: ["partspecific001wbs"]})
    }
  
    async getCount(): Promise<string> {
        const entityManager = getManager();
        let result = await getManager().query('select count(*) as row from part001mb',['row']);
        var string=JSON.stringify(result);
        return string;
    }


    findOne(id: number): Promise<Part001mb> {
        return this.PartRepository.findOne({
            relations: ["partspecific001wbs"],
            where: { slNo: id },
        });
    }
    async remove(slNo: number): Promise<void> {
        await this.PartRepository.delete(slNo);
    }

    async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {

        let part = await this.PartRepository.find({where:{unitslno:unitslno}});

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('part.html', 'utf8');
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
                Part: part
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

        let part = await this.PartRepository.find({where:{unitslno:unitslno}});


        if (part.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Part-Details-Report'); // creating worksheet
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
                { key: 'E', width: 15.0 },
                { key: 'F', width: 15.0 },
                { key: 'G', width: 15.0 },
                { key: 'H', width: 15.0 },
                { key: 'I', width: 15.0 },
                { key: 'J', width: 15.0 },
                { key: 'K', width: 15.0 },
                { key: 'L', width: 15.0 },
                { key: 'M', width: 22.0 },
                { key: 'N', width: 22.0 },
              

            ];

            worksheet.columns.forEach((col) => {

                col.style.font = {
                    size: 7,
                    bold: true
                };
                col.style.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true};
                col.style.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            })




            worksheet.mergeCells('A1:A4');
            worksheet.getCell('A1:A4').value = "TRIMS";
            worksheet.getCell('A1:A4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('A1:A4').alignment = { vertical: 'middle', horizontal: 'center' };


            worksheet.mergeCells('B1:M2');
            worksheet.getCell('B1:M2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('B1:M2').fgColor = { argb: 'b03600' };
            worksheet.getCell('B1:M2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('B1:M2').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('B3:M4');
            worksheet.getCell('B3:M4').value = "PART DETAILS";
            worksheet.getCell('B3:M4').fgColor = { argb: '00b050' };

            worksheet.getCell('B3:M4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('B3:M4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('N1');
            worksheet.getCell('N1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('N1').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('N2');
            worksheet.getCell('N2').value = "Issue Date : ";
            worksheet.getCell('N2').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('N3');
            worksheet.getCell('N3').value = "Rev. No. 00	";
            worksheet.getCell('N3').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('N4');
            worksheet.getCell('N4').value = "Rev Date :";
            worksheet.getCell('N4').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet.mergeCells('A5');
            worksheet.getCell('A5').value = "Sl. No";
            worksheet.getCell('A5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('B5');
            worksheet.getCell('B5').value = "Part Code";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Part Name";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Part Description";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Sampling Plan";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "UOM";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "Quantity";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('H5');
            worksheet.getCell('H5').value = "GST";
            worksheet.getCell('H5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('I5');
            worksheet.getCell('I5').value = "Unit Rate";
            worksheet.getCell('I5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('J5');
            worksheet.getCell('J5').value = "HSN/SAC";
            worksheet.getCell('J5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('K5');
            worksheet.getCell('K5').value = "Location";
            worksheet.getCell('K5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('L5');
            worksheet.getCell('L5').value = "M.S.Level";
            worksheet.getCell('L5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('M5');
            worksheet.getCell('M5').value = "Re-Oreder Level";
            worksheet.getCell('M5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('N5');
            worksheet.getCell('N5').value = "Lead Time";
            worksheet.getCell('N5').font = {
                size: 11,
                bold: true
            };
           




            for (let i = 0; i < part.length; i++) {
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = part[i].partno;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = part[i].partname;

                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = part[i].descrip;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = part[i].splan;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = part[i].uom;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).value = part[i].qunty;

                worksheet.mergeCells('H' + temp);
                worksheet.getCell('H' + temp).value = part[i].gst;

                worksheet.mergeCells('I' + temp);
                worksheet.getCell('I' + temp).value = part[i].unitamount;

                worksheet.mergeCells('J' + temp);
                worksheet.getCell('J' + temp).value = part[i].hsn;

                worksheet.mergeCells('K' + temp);
                worksheet.getCell('K' + temp).value = part[i].location;

                worksheet.mergeCells('L' + temp);
                worksheet.getCell('L' + temp).value = part[i].mslevel;

                worksheet.mergeCells('M' + temp);
                worksheet.getCell('M' + temp).value = part[i].orderlevel;

                worksheet.mergeCells('N' + temp);
                worksheet.getCell('N' + temp).value = part[i].leadtime;

                




            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }

    }


}