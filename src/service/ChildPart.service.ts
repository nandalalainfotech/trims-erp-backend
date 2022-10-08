import { HttpException, HttpStatus, Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ChildPartDTO } from "src/dto/Childpart.dto";
import { Childpart001mb } from "src/entity/ChildPart001mb";
import { Childpartspecification001wb } from "src/entity/Childpartspecification001wb";
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
export class ChildPartService {
    constructor(

        @InjectRepository(Childpart001mb) private readonly childPartRepository: Repository<Childpart001mb>,
        @InjectRepository(Childpartspecification001wb) private readonly childpartspecificationRepository: Repository<Childpartspecification001wb>) {
    }
    
    async create(childPartDTO: ChildPartDTO): Promise<Childpart001mb> {

        let childpartspecification001wbs: Childpartspecification001wb[] = [];

        for (let i = 0; i < childPartDTO.childpartspecification.length; i++) {
            const childpartspecification001wb = new Childpartspecification001wb();

            childpartspecification001wb.cprtslno2 = childPartDTO.childpartspecification[i].cprtslno2;
            childpartspecification001wb.parameter = childPartDTO.childpartspecification[i].parameter;
            childpartspecification001wb.specification = childPartDTO.childpartspecification[i].specification;
            childpartspecification001wb.inspecmethod = childPartDTO.childpartspecification[i].inspecmethod;
            childpartspecification001wb.unitslno = childPartDTO.unitslno;
            childpartspecification001wb.insertUser = childPartDTO.insertUser;
            childpartspecification001wb.insertDatetime = childPartDTO.insertDatetime;
            let supcontact = await this.childpartspecificationRepository.save(childpartspecification001wb);
            childpartspecification001wbs.push(supcontact);
        }

        if (childpartspecification001wbs.length > 0) {

            const childpart001mb = new Childpart001mb();
            childpart001mb.setProperties(childPartDTO);
            childpart001mb.childpartspecification001wbs = childpartspecification001wbs;
            await this.childPartRepository.save(childpart001mb);
            return childpart001mb;
        }else{
            throw new HttpException('Please Add Specification Details', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(childPartDTO: ChildPartDTO): Promise<Childpart001mb> {
        const childpart001mb = new Childpart001mb();
        childpart001mb.setProperties(childPartDTO);
        await this.childPartRepository.update({ slNo: childpart001mb.slNo }, childpart001mb);
        return childpart001mb;
    }

    async findAll(unitslno:any): Promise<Childpart001mb[]> {        
        return await this.childPartRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno}})
    }
  
    async getCount(): Promise<string> {
        const entityManager = getManager();
        let result = await getManager().query('select count(*) as row from childpart001mb',['row']);
        var string=JSON.stringify(result);
        return string;
    }

    findOne(id: number): Promise<Childpart001mb> {
        return this.childPartRepository.findOne({
            relations: ["childpartspecification001wbs"],
            where: { slNo: id },
        });
    }
    async remove(slNo: number): Promise<void> {
        await this.childPartRepository.delete(slNo);
    }

    async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {

        let childPart = await this.childPartRepository.find({where:{unitslno:unitslno}});

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('childPart.html', 'utf8');

        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {
                ChildPart: childPart
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

        let childPart = await this.childPartRepository.find({where:{unitslno:unitslno}});


        if (childPart.length < 0) {
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


            worksheet.mergeCells('B1:M2');
            worksheet.getCell('B1:M2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('B1:M2').fgColor = { argb: 'b03600' };
            worksheet.getCell('B1:M2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('B1:M2').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('B3:M4');
            worksheet.getCell('B3:M4').value = "CHILD PART DETAILS";
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
            worksheet.getCell('B5').value = "Consumable Code";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Consumable Name";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Consumable Description";
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
           




            for (let i = 0; i < childPart.length; i++) {
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = childPart[i].cpartno;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = childPart[i].cpartname;

                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = childPart[i].descrip;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = childPart[i].splan;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = childPart[i].uom;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).value = childPart[i].qunty;

                worksheet.mergeCells('H' + temp);
                worksheet.getCell('H' + temp).value = childPart[i].gst;

                worksheet.mergeCells('I' + temp);
                worksheet.getCell('I' + temp).value = childPart[i].unitamount;

                worksheet.mergeCells('J' + temp);
                worksheet.getCell('J' + temp).value = childPart[i].hsn;

                worksheet.mergeCells('K' + temp);
                worksheet.getCell('K' + temp).value = childPart[i].location;

                worksheet.mergeCells('L' + temp);
                worksheet.getCell('L' + temp).value = childPart[i].mslevel;

                worksheet.mergeCells('M' + temp);
                worksheet.getCell('M' + temp).value = childPart[i].orderlevel;

                worksheet.mergeCells('N' + temp);
                worksheet.getCell('N' + temp).value = childPart[i].leadtime;

                




            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }

    }


}
