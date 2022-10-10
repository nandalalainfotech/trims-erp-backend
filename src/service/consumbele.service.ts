import { HttpException, HttpStatus, Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConsumbleDTO } from "src/dto/comsumble.dto";
import { PartDTO } from "src/dto/Part.dto";
import { Consumble001mb } from "src/entity/Consumble001mb";
import { Consumerspecification001wb } from "src/entity/Consumerspecification001wb";
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
export class ConsumbleService {
    constructor(

        @InjectRepository(Consumble001mb) private readonly consumbleRepository: Repository<Consumble001mb>,
        @InjectRepository(Consumerspecification001wb) private readonly consumerspecificationRepository: Repository<Consumerspecification001wb>) {
    }
    async findAll(unitslno: any): Promise<Consumble001mb[]> {
        return await this.consumbleRepository.find({ order: { slNo: "DESC" }, where: { unitslno: unitslno }, relations: ["consumerspecification001wbs"], })
    }

    async create(consumbleDTO: ConsumbleDTO): Promise<Consumble001mb> {

        let consumerspecification001wbs: Consumerspecification001wb[] = [];

        for (let i = 0; i < consumbleDTO.consumerspecification001wbs.length; i++) {
            const consumerspecification001wb = new Consumerspecification001wb();

            consumerspecification001wb.consumslno2 = consumbleDTO.consumerspecification001wbs[i].consumslno2;
            consumerspecification001wb.parameter = consumbleDTO.consumerspecification001wbs[i].parameter;
            consumerspecification001wb.specification = consumbleDTO.consumerspecification001wbs[i].specification;
            consumerspecification001wb.inspecmethod = consumbleDTO.consumerspecification001wbs[i].inspecmethod;
            consumerspecification001wb.unitslno = consumbleDTO.unitslno;
            consumerspecification001wb.insertUser = consumbleDTO.insertUser;
            consumerspecification001wb.insertDatetime = consumbleDTO.insertDatetime;
            let supcontact = await this.consumerspecificationRepository.save(consumerspecification001wb);
            consumerspecification001wbs.push(supcontact);
        }

        if (consumerspecification001wbs.length > 0) {

            const consumble001mb = new Consumble001mb();
            consumble001mb.setProperties(consumbleDTO);
            consumble001mb.consumerspecification001wbs = consumerspecification001wbs;
            await this.consumbleRepository.save(consumble001mb);
            return consumble001mb;
        } else {
            throw new HttpException('Please Add Specification Details', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(consumbleDTO: ConsumbleDTO): Promise<Consumble001mb> {

        for (let i = 0; i < consumbleDTO.consumerspecification001wbs.length; i++) {
            const consumerspecification001wb = new Consumerspecification001wb();

            consumerspecification001wb.consumslno = consumbleDTO.consumerspecification001wbs[i].consumslno;
            consumerspecification001wb.parameter = consumbleDTO.consumerspecification001wbs[i].parameter;
            consumerspecification001wb.specification = consumbleDTO.consumerspecification001wbs[i].specification;
            consumerspecification001wb.inspecmethod = consumbleDTO.consumerspecification001wbs[i].inspecmethod;
            consumerspecification001wb.unitslno = consumbleDTO.unitslno;
            consumerspecification001wb.updatedUser = consumbleDTO.updatedUser;
            consumerspecification001wb.updatedDatetime = consumbleDTO.updatedDatetime;
            await this.consumerspecificationRepository.update({ slNo: consumbleDTO.consumerspecification001wbs[i].slNo }, consumerspecification001wb);
        }

        const consumble001mb = new Consumble001mb();
        consumble001mb.setProperties(consumbleDTO);
        await this.consumbleRepository.update({ slNo: consumble001mb.slNo }, consumble001mb);
        return consumble001mb;
    }



    async getCount(): Promise<string> {
        const entityManager = getManager();
        let result = await getManager().query('select count(*) as row from consumble001mb', ['row']);
        var string = JSON.stringify(result);
        return string;
    }


    findOne(id: number): Promise<Consumble001mb> {
        return this.consumbleRepository.findOne({
            relations: ["consumerspecification001wbs"],
            where: { slNo: id },
        });
    }
    async remove(slNo: number): Promise<void> {
        await this.consumbleRepository.delete(slNo);
    }

    async downloadPdf(unitslno: any, @Req() request: Request, @Res() response: Response) {

        let consumable = await this.consumbleRepository.find({ where: { unitslno: unitslno } });

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('Consumable.html', 'utf8');

        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {
                Consumable: consumable
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

    async downloadExcel(unitslno: any, @Req() request: Request, @Res() response: Response) {

        let consumable = await this.consumbleRepository.find({ where: { unitslno: unitslno } });

        if (consumable.length < 0) {
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
            worksheet.getCell('B3:M4').value = "CONSUMABLE ITEM DETAILS";
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





            for (let i = 0; i < consumable.length; i++) {
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = consumable[i].consmno;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = consumable[i].consname;

                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = consumable[i].descrip;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = consumable[i].splan;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = consumable[i].uom;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).value = consumable[i].qunty;

                worksheet.mergeCells('H' + temp);
                worksheet.getCell('H' + temp).value = consumable[i].gst;

                worksheet.mergeCells('I' + temp);
                worksheet.getCell('I' + temp).value = consumable[i].unitamount;

                worksheet.mergeCells('J' + temp);
                worksheet.getCell('J' + temp).value = consumable[i].hsn;

                worksheet.mergeCells('K' + temp);
                worksheet.getCell('K' + temp).value = consumable[i].location;

                worksheet.mergeCells('L' + temp);
                worksheet.getCell('L' + temp).value = consumable[i].mslevel;

                worksheet.mergeCells('M' + temp);
                worksheet.getCell('M' + temp).value = consumable[i].orderlevel;

                worksheet.mergeCells('N' + temp);
                worksheet.getCell('N' + temp).value = consumable[i].leadtime;






            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }

    }


}