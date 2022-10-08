import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Rawmaterialinspection001wb } from "src/entity/Rawmaterialinspection001wb";
import { RawmaterialinspectionDTO } from "src/dto/Rawmaterialinspection.dto";
import { Response } from "express";
import { Request } from "supertest";
import { Between } from 'typeorm';
import { createReadStream } from "fs";
import { Purchasereqitem001wb } from "src/entity/Purchasereqitem001wb";
import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { Consumble001mb } from "src/entity/Consumble001mb";
import { Childpart001mb } from "src/entity/ChildPart001mb";
import { Part001mb } from "src/entity/Part001mb";
import { count } from "rxjs";
import { Materialinspection001wb } from "src/entity/MaterialInspection001wb";
var path = require('path');
var fs = require('fs');
const excel = require('exceljs');
var pdf = require('dynamic-html-pdf');




@Injectable()
export class RawmaterialinspectionService {
    [x: string]: any;
    constructor(

        @InjectRepository(Rawmaterialinspection001wb) private readonly rawmaterialinspectionRepository: Repository<Rawmaterialinspection001wb>,
        @InjectRepository(Orderitem001mb) private readonly orderItemsRepository: Repository<Orderitem001mb>,
        @InjectRepository(Consumble001mb) private readonly consumbleRepository: Repository<Consumble001mb>,
        @InjectRepository(Childpart001mb) private readonly childPartRepository: Repository<Childpart001mb>,
        @InjectRepository(Part001mb) private readonly PartRepository: Repository<Part001mb>,
        @InjectRepository(Materialinspection001wb) private readonly materialinspectionRepository: Repository<Materialinspection001wb>) {
    }

    async findAll(unitslno: any): Promise<Rawmaterialinspection001wb[]> {
        return await this.rawmaterialinspectionRepository.find({
            order: { slNo: "DESC" },
            relations: ["itemcode2", "cucode2", "cptcode2", "prtcode2"],

        });
    }

    async findByItem(unitslno: any): Promise<any> {
        // return await this.rawmaterialinspectionRepository.createQueryBuilder("rawmaterialinspection001wb").select("test");
        let result = await this.rawmaterialinspectionRepository.createQueryBuilder("rawmaterialinspection001wb")
            .leftJoinAndSelect("rawmaterialinspection001wb.itemcode2", "itemcode2")
            .addSelect('SUM(rawmaterialinspection001wb.acceptedQty)', 'acceptedsum')
            .addSelect('SUM(rawmaterialinspection001wb.rejectedQty)', 'rejectesum')
            .groupBy("rawmaterialinspection001wb.itemcode")
            .getRawMany();
        // console.log("result",result);
        return result;
    }

    async findByConsumableItem(unitslno: any): Promise<any> {
        // return await this.rawmaterialinspectionRepository.createQueryBuilder("rawmaterialinspection001wb").select("test");
        return await this.rawmaterialinspectionRepository.createQueryBuilder("rawmaterialinspection001wb")
            .leftJoinAndSelect("rawmaterialinspection001wb.cucode2", "cucode2")
            .addSelect('SUM(rawmaterialinspection001wb.cuacceptedQty)', 'cuacceptedsum')
            .addSelect('SUM(rawmaterialinspection001wb.curejectedQty)', 'curejectesum')
            .groupBy("rawmaterialinspection001wb.cucode")
            .getRawMany();

    }


    async findByChildItem(unitslno: any): Promise<any> {
        // return await this.rawmaterialinspectionRepository.createQueryBuilder("rawmaterialinspection001wb").select("test");
        return await this.rawmaterialinspectionRepository.createQueryBuilder("rawmaterialinspection001wb")
            .leftJoinAndSelect("rawmaterialinspection001wb.cptcode2", "cptcode2")
            .addSelect('SUM(rawmaterialinspection001wb.cptacceptedQty)', 'cptacceptedsum')
            .addSelect('SUM(rawmaterialinspection001wb.cptrejectedQty)', 'cptrejectesum')
            .groupBy("rawmaterialinspection001wb.cptcode")
            // .groupBy("rawmaterialinspection001wb.prtcode") 
            .getRawMany();

    }
    async findByPartItem(unitslno: any): Promise<any> {
        // return await this.rawmaterialinspectionRepository.createQueryBuilder("rawmaterialinspection001wb").select("test");
        return await this.rawmaterialinspectionRepository.createQueryBuilder("rawmaterialinspection001wb")
            .leftJoinAndSelect("rawmaterialinspection001wb.prtcode2", "prtcode2")
            .addSelect('SUM(rawmaterialinspection001wb.prtacceptedQty)', 'prtacceptedsum')
            .addSelect('SUM(rawmaterialinspection001wb.prtrejectedQty)', 'prtrejectesum')
            .groupBy("rawmaterialinspection001wb.prtcode")
            .getRawMany();

    }
    async create(rawmaterialinspectionDTO: RawmaterialinspectionDTO): Promise<Rawmaterialinspection001wb> {
        const rawmaterialinspection001wb = new Rawmaterialinspection001wb();
        rawmaterialinspection001wb.setProperties(rawmaterialinspectionDTO);
        return this.rawmaterialinspectionRepository.save(rawmaterialinspection001wb);
    }
    async update(rawmaterialinspectionDTO: RawmaterialinspectionDTO): Promise<Rawmaterialinspection001wb> {
        const rawmaterialinspection001wb = new Rawmaterialinspection001wb();
        rawmaterialinspection001wb.setProperties(rawmaterialinspectionDTO);
        await this.rawmaterialinspectionRepository.update({ slNo: rawmaterialinspection001wb.slNo }, rawmaterialinspection001wb);
        return rawmaterialinspection001wb;
    }

   
    
    findOne(id: number): Promise<Rawmaterialinspection001wb> {
        return this.rawmaterialinspectionRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.rawmaterialinspectionRepository.delete(slNo);
    }

    // -----------Stock-Pdf && Excel ---------------------

    async downloaditemPdf(unitslno: any, @Req() request: Request, @Res() response: Response) {

        let ordeitem = await this.rawmaterialinspectionRepository.find({
            relations: ["itemcode2", "cucode2", "cptcode2", "prtcode2"],
            where: { unitslno: unitslno },
            order: { slNo: "DESC" }
        });

        let rawmetriealcodes: any = []
        for (let i = 0; i < ordeitem.length; i++) {
            if (ordeitem[i].itemcode) {
                rawmetriealcodes.push(ordeitem[i])

            }
        }

        rawmetriealcodes = rawmetriealcodes.filter((e, i) => rawmetriealcodes.findIndex(a => a["itemcode"] === e["itemcode"]) === i);



        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('items.html', 'utf8');

        // pdf.registerHelper('iforderslno', function (itemcode, options) {
        //     if (this.itemcode) {
        //         return options.fn(this);
        //     } else {
        //         return options.inverse(this);
        //     }
        // })

        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {
                Item: rawmetriealcodes
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

    

    async downloadconsumablePdf(unitslno: any, @Req() request: Request, @Res() response: Response) {
        let ordeitem = await this.rawmaterialinspectionRepository.find({
            relations: ["itemcode2", "cucode2", "cptcode2", "prtcode2"],
            where: { unitslno: unitslno },
            order: { slNo: "DESC" }
        });
        let Consumablecodes: any = []
        for (let i = 0; i < ordeitem.length; i++) {
            if (ordeitem[i].cucode) {
                Consumablecodes.push(ordeitem[i])

            }
        }

        Consumablecodes = Consumablecodes.filter((e, i) => Consumablecodes.findIndex(a => a["cucode"] === e["cucode"]) === i);

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('Consumables.html', 'utf8');

        // pdf.registerHelper('ifcucode', function (cucode, options) {
        //     if (this.cucode) {
        //         return options.fn(this);
        //     } else {
        //         return options.inverse(this);
        //     }
        // })

        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {
                Item: Consumablecodes
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

    async downloadchildPartPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {

        let ordeitem = await this.rawmaterialinspectionRepository.find({
            relations: ["itemcode2", "cucode2", "cptcode2", "prtcode2"],
            where: { unitslno: unitslno },
            order: { slNo: "DESC" }
        });

        let ChildPartcodes: any = []
        for (let i = 0; i < ordeitem.length; i++) {
            if (ordeitem[i].cptcode) {
                ChildPartcodes.push(ordeitem[i])

            }
        }

        ChildPartcodes = ChildPartcodes.filter((e, i) => ChildPartcodes.findIndex(a => a["cptcode"] === e["cptcode"]) === i);


        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('childParts.html', 'utf8');

        // pdf.registerHelper('ifcptcode', function (cptcode, options) {
        //     if (this.cptcode) {
        //         return options.fn(this);
        //     } else {
        //         return options.inverse(this);
        //     }
        // })

        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {
                Item: ChildPartcodes
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

    async downloadPartPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {


        let ordeitem = await this.rawmaterialinspectionRepository.find({
            relations: ["itemcode2", "cucode2", "cptcode2", "prtcode2"],
            where: { unitslno: unitslno },
            order: { slNo: "DESC" }
        });

        let Partcodes: any = []
        for (let i = 0; i < ordeitem.length; i++) {
            if (ordeitem[i].prtcode) {
                Partcodes.push(ordeitem[i])

            }
        }

        Partcodes = Partcodes.filter((e, i) => Partcodes.findIndex(a => a["prtcode"] === e["prtcode"]) === i);


        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('parts.html', 'utf8');

        // pdf.registerHelper('ifprtcode', function (prtcode, options) {
        //     if (this.prtcode) {
        //         return options.fn(this);
        //     } else {
        //         return options.inverse(this);
        //     }
        // })

        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {
                Item: Partcodes
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







// ----------------------Item-Excel------------------------

    async downloaditemExcel(unitslno: any, @Req() request: Request, @Res() response: Response) {

        let ordeitem = await this.rawmaterialinspectionRepository.find({
            relations: ["itemcode2", "cucode2", "cptcode2", "prtcode2"],
            where: { unitslno: unitslno },
            order: { slNo: "DESC" }
        });


        let item = await this.rawmaterialinspectionRepository.createQueryBuilder("rawmaterialinspection001wb")
            .leftJoinAndSelect("rawmaterialinspection001wb.itemcode2", "itemcode2")
            .addSelect('rawmaterialinspection001wb.acceptedsum', 'acceptedsum')
            .addSelect('rawmaterialinspection001wb.rejectesum', 'rejectesum')
            .where("rawmaterialinspection001wb.unitslno = :unitslno", { unitslno: unitslno })
            .orderBy('rawmaterialinspection001wb.itemcode', 'DESC')
            .groupBy("rawmaterialinspection001wb.itemcode")
            .getRawMany();






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
            { key: 'D', width: 22.0 },
            { key: 'E', width: 22.0 },
            { key: 'F', width: 15.0 },
            { key: 'G', width: 15.0 },
            { key: 'H', width: 15.0 },
            { key: 'I', width: 20.0 },
            { key: 'J', width: 25.0 },


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


        worksheet.mergeCells('B1:I2');
        worksheet.getCell('B1:I2').value = "SRINIVASA ENTERPRISES";
        worksheet.getCell('B1:I2').fgColor = { argb: 'b03600' };
        worksheet.getCell('B1:I2').font = {
            size: 11,
            bold: true
        };
        worksheet.getCell('B1:I2').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('B3:I4');
        worksheet.getCell('B3:I4').value = "ITEM DETAILS";
        worksheet.getCell('B3:I4').fgColor = { argb: '00b050' };

        worksheet.getCell('B3:I4').font = {
            size: 11,
            bold: true
        };
        worksheet.getCell('B3:I4').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('J1');
        worksheet.getCell('J1').value = "Format No.SE/MTN/R05";
        worksheet.getCell('J1').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('J2');
        worksheet.getCell('J2').value = "Issue Date : ";
        worksheet.getCell('J2').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('J3');
        worksheet.getCell('J3').value = "Rev. No. 00	";
        worksheet.getCell('J3').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('J4');
        worksheet.getCell('J4').value = "Rev Date :";
        worksheet.getCell('J4').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet.mergeCells('A5');
            worksheet.getCell('A5').value = "Sl. No";
            worksheet.getCell('A5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('B5');
            worksheet.getCell('B5').value = "Item Code";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Item Name";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Item Description";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };


        worksheet.mergeCells('E5');
        worksheet.getCell('E5').value = "Opening Balance";
        worksheet.getCell('E5').font = {
            size: 11,
            bold: true
        };
        worksheet.mergeCells('F5');
        worksheet.getCell('F5').value = "Closing Balance";
        worksheet.getCell('F5').font = {
            size: 11,
            bold: true
        };
        worksheet.mergeCells('G5');
        worksheet.getCell('G5').value = "Location";
        worksheet.getCell('G5').font = {
            size: 11,
            bold: true
        };

        worksheet.mergeCells('H5');
        worksheet.getCell('H5').value = "M.S.Level";
        worksheet.getCell('H5').font = {
            size: 11,
            bold: true
        };

        worksheet.mergeCells('I5');
        worksheet.getCell('I5').value = "Lead Time";
        worksheet.getCell('I5').font = {
            size: 11,
            bold: true
        };

        worksheet.mergeCells('J5');
        worksheet.getCell('J5').value = "Re-Order Level";
        worksheet.getCell('J5').font = {
            size: 11,
            bold: true
        };



        // let orderitemarray = [];

        // for (let i = item.length-1; i < item.length; i++) {
        //     if (item[i].itemcode) {
        //         orderitemarray.push(item[i])
        //     }

        // }
        // console.log("item", orderitemarray);

        let rawmetriealcodes: any = []
        for (let i = 0; i < ordeitem.length; i++) {
            if (ordeitem[i].itemcode) {
                rawmetriealcodes.push(ordeitem[i])

            }
        }

        rawmetriealcodes = rawmetriealcodes.filter((e, i) => rawmetriealcodes.findIndex(a => a["itemcode"] === e["itemcode"]) === i);


        for (let i = 0; i < rawmetriealcodes.length; i++) {
            let temp = i + 6;

            worksheet.mergeCells('A' + temp);
            worksheet.getCell('A' + temp).value = rawmetriealcodes[i].slNo;

            worksheet.mergeCells('B' + temp);
            worksheet.getCell('B' + temp).value = rawmetriealcodes[i].itemcode2.itemcode

            worksheet.mergeCells('C' + temp);
            worksheet.getCell('C' + temp).value = rawmetriealcodes[i].itemcode2.itemname;

            worksheet.mergeCells('D' + temp);
            worksheet.getCell('D' + temp).value = rawmetriealcodes[i].itemcode2.descrip;

            worksheet.mergeCells('E' + temp);
            worksheet.getCell('E' + temp).value = rawmetriealcodes[i].acceptedsum;

            worksheet.mergeCells('F' + temp);
            worksheet.getCell('F' + temp).value = rawmetriealcodes[i].closing;

            worksheet.mergeCells('G' + temp);
            worksheet.getCell('G' + temp).value = rawmetriealcodes[i].itemcode2.location;

            worksheet.mergeCells('H' + temp);
            worksheet.getCell('H' + temp).value = rawmetriealcodes[i].itemcode2.mslevel;

            worksheet.mergeCells('I' + temp);
            worksheet.getCell('I' + temp).value = rawmetriealcodes[i].itemcode2.leadtime;

            worksheet.mergeCells('J' + temp);
            worksheet.getCell('J' + temp).value = rawmetriealcodes[i].itemcode2.orderlevel;

            }
        return workbook.xlsx.write(response).then(function () {
            response['status'](200).end();
        });    


    }

    // --------------------------Consumable-Excel-------------------------------

    async downloadconsumableExcel(unitslno: any, @Req() request: Request, @Res() response: Response) {


        let ordeitem = await this.rawmaterialinspectionRepository.find({
            relations: ["itemcode2", "cucode2", "cptcode2", "prtcode2"],
            where: { unitslno: unitslno },
            order: { slNo: "DESC" }
        });

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
            { key: 'D', width: 22.0 },
            { key: 'E', width: 22.0 },
            { key: 'F', width: 15.0 },
            { key: 'G', width: 15.0 },
            { key: 'H', width: 15.0 },
            { key: 'I', width: 15.0 },
            { key: 'I', width: 20.0 },
          

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


        worksheet.mergeCells('B1:I2');
        worksheet.getCell('B1:I2').value = "SRINIVASA ENTERPRISES";
        worksheet.getCell('B1:I2').fgColor = { argb: 'b03600' };
        worksheet.getCell('B1:I2').font = {
            size: 11,
            bold: true
        };
        worksheet.getCell('B1:I2').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('B3:I4');
        worksheet.getCell('B3:I4').value = "CONSUMABLE ITEM DETAILS";
        worksheet.getCell('B3:I4').fgColor = { argb: '00b050' };

        worksheet.getCell('B3:I4').font = {
            size: 11,
            bold: true
        };
        worksheet.getCell('B3:I4').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('J1');
        worksheet.getCell('J1').value = "Format No.SE/MTN/R05";
        worksheet.getCell('J1').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('J2');
        worksheet.getCell('J2').value = "Issue Date : ";
        worksheet.getCell('J2').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('J3');
        worksheet.getCell('J3').value = "Rev. No. 00	";
        worksheet.getCell('J3').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('J4');
        worksheet.getCell('J4').value = "Rev Date :";
        worksheet.getCell('J4').alignment = { vertical: 'left', horizontal: 'left' };

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
        worksheet.getCell('E5').value = "Opening Balance";
        worksheet.getCell('E5').font = {
            size: 11,
            bold: true
        };
        worksheet.mergeCells('F5');
        worksheet.getCell('F5').value = "Closing Balance";
        worksheet.getCell('F5').font = {
            size: 11,
            bold: true
        };
        worksheet.mergeCells('G5');
        worksheet.getCell('G5').value = "Location";
        worksheet.getCell('G5').font = {
            size: 11,
            bold: true
        };

        worksheet.mergeCells('H5');
        worksheet.getCell('H5').value = "Min Stock Level";
        worksheet.getCell('H5').font = {
            size: 11,
            bold: true
        };

        worksheet.mergeCells('I5');
        worksheet.getCell('I5').value = "Lead Time";
        worksheet.getCell('I5').font = {
            size: 11,
            bold: true
        };

        worksheet.mergeCells('J5');
        worksheet.getCell('J5').value = "Re-Oreder Level";
        worksheet.getCell('J5').font = {
            size: 11,
            bold: true
        };

        // let orderitemarray = [];

        // for (let i = 0; i < item.length; i++) {
        //     if (item[i].cucode) {
        //         orderitemarray.push(item[i])
        //     }
        // }

        let Consumablecodes: any = []
        for (let i = 0; i < ordeitem.length; i++) {
            if (ordeitem[i].cucode) {
                Consumablecodes.push(ordeitem[i])

            }
        }

        Consumablecodes = Consumablecodes.filter((e, i) => Consumablecodes.findIndex(a => a["cucode"] === e["cucode"]) === i);

        for (let i = 0; i < Consumablecodes.length; i++) {
            let temp = i + 6;

            worksheet.mergeCells('A' + temp);
            worksheet.getCell('A' + temp).value = Consumablecodes[i].slNo;

            worksheet.mergeCells('B' + temp);
            worksheet.getCell('B' + temp).value = Consumablecodes[i].cucode2.consmno;

            worksheet.mergeCells('C' + temp);
            worksheet.getCell('C' + temp).value = Consumablecodes[i].cucode2.consname;

            worksheet.mergeCells('D' + temp);
            worksheet.getCell('D' + temp).value = Consumablecodes[i].cucode2.descrip;

            worksheet.mergeCells('E' + temp);
            worksheet.getCell('E' + temp).value = Consumablecodes[i].cuacceptedsum;

            worksheet.mergeCells('F' + temp);
            worksheet.getCell('F' + temp).value = Consumablecodes[i].cucolsing;

            worksheet.mergeCells('G' + temp);
            worksheet.getCell('G' + temp).value = Consumablecodes[i].cucode2.location;

            worksheet.mergeCells('H' + temp);
            worksheet.getCell('H' + temp).value = Consumablecodes[i].cucode2.mslevel;

            worksheet.mergeCells('I' + temp);
            worksheet.getCell('I' + temp).value = Consumablecodes[i].cucode2.leadtime;

            worksheet.mergeCells('J' + temp);
            worksheet.getCell('J' + temp).value = Consumablecodes[i].cucode2.orderlevel;

        }
        return workbook.xlsx.write(response).then(function () {
            response['status'](200).end();
        });


    }


    // ------------------------ChildPart-Excel--------------------------

    async downloadchildPartExcel(unitslno: any, @Req() request: Request, @Res() response: Response) {

        let ordeitem = await this.rawmaterialinspectionRepository.find({
            relations: ["itemcode2", "cucode2", "cptcode2", "prtcode2"],
            where: { unitslno: unitslno },
            order: { slNo: "DESC" }
        });

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
        { key: 'D', width: 22.0 },
        { key: 'E', width: 22.0 },
        { key: 'F', width: 15.0 },
        { key: 'G', width: 15.0 },
        { key: 'H', width: 15.0 },
        { key: 'I', width: 15.0 },
        { key: 'I', width: 20.0 },
      

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


    worksheet.mergeCells('B1:I2');
    worksheet.getCell('B1:I2').value = "SRINIVASA ENTERPRISES";
    worksheet.getCell('B1:I2').fgColor = { argb: 'b03600' };
    worksheet.getCell('B1:I2').font = {
        size: 11,
        bold: true
    };
    worksheet.getCell('B1:I2').alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('B3:I4');
    worksheet.getCell('B3:I4').value = "CHILD PART DETAILS";
    worksheet.getCell('B3:I4').fgColor = { argb: '00b050' };

    worksheet.getCell('B3:I4').font = {
        size: 11,
        bold: true
    };
    worksheet.getCell('B3:I4').alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('J1');
    worksheet.getCell('J1').value = "Format No.SE/MTN/R05";
    worksheet.getCell('J1').alignment = { vertical: 'left', horizontal: 'left' };
    worksheet.mergeCells('J2');
    worksheet.getCell('J2').value = "Issue Date : ";
    worksheet.getCell('J2').alignment = { vertical: 'left', horizontal: 'left' };
    worksheet.mergeCells('J3');
    worksheet.getCell('J3').value = "Rev. No. 00	";
    worksheet.getCell('J3').alignment = { vertical: 'left', horizontal: 'left' };
    worksheet.mergeCells('J4');
    worksheet.getCell('J4').value = "Rev Date :";
    worksheet.getCell('J4').alignment = { vertical: 'left', horizontal: 'left' };

    worksheet.mergeCells('A5');
    worksheet.getCell('A5').value = "Sl. No";
    worksheet.getCell('A5').font = {
        size: 11,
        bold: true
    };
    worksheet.mergeCells('B5');
    worksheet.getCell('B5').value = "ChildPart Code";
    worksheet.getCell('B5').font = {
        size: 11,
        bold: true
    };
    worksheet.mergeCells('C5');
    worksheet.getCell('C5').value = "ChildPart Name";
    worksheet.getCell('C5').font = {
        size: 11,
        bold: true
    };
    worksheet.mergeCells('D5');
    worksheet.getCell('D5').value = "ChildPart Description";
    worksheet.getCell('D5').font = {
        size: 11,
        bold: true
    };


        worksheet.mergeCells('E5');
        worksheet.getCell('E5').value = "Opening Balance";
        worksheet.getCell('E5').font = {
            size: 11,
            bold: true
        };
        worksheet.mergeCells('F5');
        worksheet.getCell('F5').value = "Colosing Balance";
        worksheet.getCell('F5').font = {
            size: 11,
            bold: true
        };
        worksheet.mergeCells('G5');
        worksheet.getCell('G5').value = "Location";
        worksheet.getCell('G5').font = {
            size: 11,
            bold: true
        };

    worksheet.mergeCells('H5');
    worksheet.getCell('H5').value = "Min Stock Level";
    worksheet.getCell('H5').font = {
        size: 11,
        bold: true
    };

    worksheet.mergeCells('I5');
    worksheet.getCell('I5').value = "Lead Time";
    worksheet.getCell('I5').font = {
        size: 11,
        bold: true
    };

    worksheet.mergeCells('J5');
    worksheet.getCell('J5').value = "Re-Oreder Level";
    worksheet.getCell('J5').font = {
        size: 11,
        bold: true
    };

        // let orderitemarray = [];

        // for (let i = 0; i < item.length; i++) {
        //     if (item[i].cptcode) {
        //         orderitemarray.push(item[i])
        //     }
        // }

        let ChildPartcodes: any = []
        for (let i = 0; i < ordeitem.length; i++) {
            if (ordeitem[i].cptcode) {
                ChildPartcodes.push(ordeitem[i])

            }
        }

        ChildPartcodes = ChildPartcodes.filter((e, i) => ChildPartcodes.findIndex(a => a["cptcode"] === e["cptcode"]) === i);


        for (let i = 0; i < ChildPartcodes.length; i++) {
            let temp = i + 6;

            worksheet.mergeCells('A' + temp);
            worksheet.getCell('A' + temp).value = ChildPartcodes[i].slNo;

            worksheet.mergeCells('B' + temp);
            worksheet.getCell('B' + temp).value = ChildPartcodes[i].cptcode2.cpartno;

            worksheet.mergeCells('C' + temp);
            worksheet.getCell('C' + temp).value = ChildPartcodes[i].cptcode2.cpartname;

            worksheet.mergeCells('D' + temp);
            worksheet.getCell('D' + temp).value = ChildPartcodes[i].cptcode2.descrip;

            worksheet.mergeCells('E' + temp);
            worksheet.getCell('E' + temp).value = ChildPartcodes[i].cptacceptedsum;

            worksheet.mergeCells('F' + temp);
            worksheet.getCell('F' + temp).value = ChildPartcodes[i].cptcolsing;

            worksheet.mergeCells('G' + temp);
            worksheet.getCell('G' + temp).value = ChildPartcodes[i].cptcode2.location;

            worksheet.mergeCells('H' + temp);
            worksheet.getCell('H' + temp).value = ChildPartcodes[i].cptcode2.mslevel;

            worksheet.mergeCells('I' + temp);
            worksheet.getCell('I' + temp).value = ChildPartcodes[i].cptcode2.leadtime;

            worksheet.mergeCells('J' + temp);
            worksheet.getCell('J' + temp).value = ChildPartcodes[i].cptcode2.orderlevel;

        }
        return workbook.xlsx.write(response).then(function () {
            response['status'](200).end();
        });


}

    // -----------------------------Part-Excel----------------------

    async downloadPartExcel(unitslno: any, @Req() request: Request, @Res() response: Response) {

        let ordeitem = await this.rawmaterialinspectionRepository.find({
            relations: ["itemcode2", "cucode2", "cptcode2", "prtcode2"],
            where: { unitslno: unitslno },
            order: { slNo: "DESC" }
        });

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
        { key: 'D', width: 22.0 },
        { key: 'E', width: 22.0 },
        { key: 'F', width: 15.0 },
        { key: 'G', width: 15.0 },
        { key: 'H', width: 15.0 },
        { key: 'I', width: 15.0 },
        { key: 'I', width: 20.0 },
      

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


    worksheet.mergeCells('B1:I2');
    worksheet.getCell('B1:I2').value = "SRINIVASA ENTERPRISES";
    worksheet.getCell('B1:I2').fgColor = { argb: 'b03600' };
    worksheet.getCell('B1:I2').font = {
        size: 11,
        bold: true
    };
    worksheet.getCell('B1:I2').alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('B3:I4');
    worksheet.getCell('B3:I4').value = "PART DETAILS";
    worksheet.getCell('B3:I4').fgColor = { argb: '00b050' };

    worksheet.getCell('B3:I4').font = {
        size: 11,
        bold: true
    };
    worksheet.getCell('B3:I4').alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('J1');
    worksheet.getCell('J1').value = "Format No.SE/MTN/R05";
    worksheet.getCell('J1').alignment = { vertical: 'left', horizontal: 'left' };
    worksheet.mergeCells('J2');
    worksheet.getCell('J2').value = "Issue Date : ";
    worksheet.getCell('J2').alignment = { vertical: 'left', horizontal: 'left' };
    worksheet.mergeCells('J3');
    worksheet.getCell('J3').value = "Rev. No. 00	";
    worksheet.getCell('J3').alignment = { vertical: 'left', horizontal: 'left' };
    worksheet.mergeCells('J4');
    worksheet.getCell('J4').value = "Rev Date :";
    worksheet.getCell('J4').alignment = { vertical: 'left', horizontal: 'left' };

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
        worksheet.getCell('E5').value = "Opening Balance";
        worksheet.getCell('E5').font = {
            size: 11,
            bold: true
        };
        worksheet.mergeCells('F5');
        worksheet.getCell('F5').value = "Closing Balance";
        worksheet.getCell('F5').font = {
            size: 11,
            bold: true
        };
        worksheet.mergeCells('G5');
        worksheet.getCell('G5').value = "Location";
        worksheet.getCell('G5').font = {
            size: 11,
            bold: true
        };

    worksheet.mergeCells('H5');
    worksheet.getCell('H5').value = "Min Stock Level";
    worksheet.getCell('H5').font = {
        size: 11,
        bold: true
    };

    worksheet.mergeCells('I5');
    worksheet.getCell('I5').value = "Lead Time";
    worksheet.getCell('I5').font = {
        size: 11,
        bold: true
    };

    worksheet.mergeCells('J5');
    worksheet.getCell('J5').value = "Re-Oreder Level";
    worksheet.getCell('J5').font = {
        size: 11,
        bold: true
    };

        // let orderitemarray = [];

        // for (let i = 0; i < item.length; i++) {
        //     if (item[i].prtcode) {
        //         orderitemarray.push(item[i])
        //     }
        // }

        let Partcodes: any = []
        for (let i = 0; i < ordeitem.length; i++) {
            if (ordeitem[i].prtcode) {
                Partcodes.push(ordeitem[i])

            }
        }

        Partcodes = Partcodes.filter((e, i) => Partcodes.findIndex(a => a["prtcode"] === e["prtcode"]) === i);

        for (let i = 0; i < Partcodes.length; i++) {
            let temp = i + 6;

            worksheet.mergeCells('A' + temp);
            worksheet.getCell('A' + temp).value = Partcodes[i].slNo;

            worksheet.mergeCells('B' + temp);
            worksheet.getCell('B' + temp).value = Partcodes[i].prtcode2.partno;

            worksheet.mergeCells('C' + temp);
            worksheet.getCell('C' + temp).value = Partcodes[i].prtcode2.partname;

            worksheet.mergeCells('D' + temp);
            worksheet.getCell('D' + temp).value = Partcodes[i].prtcode2.descrip;

            worksheet.mergeCells('E' + temp);
            worksheet.getCell('E' + temp).value = Partcodes[i].prtacceptedsum;

            worksheet.mergeCells('F' + temp);
            worksheet.getCell('F' + temp).value = Partcodes[i].prtcolsing;

            worksheet.mergeCells('G' + temp);
            worksheet.getCell('G' + temp).value = Partcodes[i].prtcode2.location;

            worksheet.mergeCells('H' + temp);
            worksheet.getCell('H' + temp).value = Partcodes[i].prtcode2.mslevel;

            worksheet.mergeCells('I' + temp);
            worksheet.getCell('I' + temp).value = Partcodes[i].prtcode2.leadtime;

            worksheet.mergeCells('J' + temp);
            worksheet.getCell('J' + temp).value = Partcodes[i].prtcode2.orderlevel;

        }
        return workbook.xlsx.write(response).then(function () {
            response['status'](200).end();
        });


    }



    // ------------Stock-Inward Pdf && Excel--------------

    async downloaditemStockpdf(unitslno: any, @Req() request: Request, @Res() response: Response) {

        let item = await this.rawmaterialinspectionRepository.find({
            where: { unitslno: unitslno },
            relations: ["itemcode2", "cucode2", "cptcode2", "prtcode2"],
            order: { slNo: "DESC" },
        });
        let incoming = await this.materialinspectionRepository.find({
            order: { slNo: "DESC" },
            relations: ["rawmaterialinspection001wbs"],
            where: { unitslno: unitslno }
        })


        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('itemsStock.html', 'utf8');

        pdf.registerHelper('iforderslno', function (itemcode, options) {
            if (this.itemcode) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        })

        pdf.registerHelper('ifdate', function (insertDatetime, options) {
            const today = new Date(this.insertDatetime);
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1;
            let dd = today.getDate();
            this.insertDatetime = dd + '-' + mm + '-' + yyyy;
            this.slNo = incoming.find(x => x.slNo == this.rawmaterialslno)?.iirno;
            if (this.insertDatetime) {
                return options.fn(this, this.insertDatetime, this.slNo);
            }
        })

        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {
                Item: item
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



    async downloadconsumableStockPdf(unitslno: any, @Req() request: Request, @Res() response: Response) {

        let item = await this.rawmaterialinspectionRepository.find({
            where: { unitslno: unitslno },
            relations: ["itemcode2", "cucode2", "cptcode2", "prtcode2"],
            order: { slNo: "DESC" },
        });
        let incoming = await this.materialinspectionRepository.find({
            order: { slNo: "DESC" },
            relations: ["rawmaterialinspection001wbs"],
            where: { unitslno: unitslno }
        })

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('ConsumablesStock.html', 'utf8');

        pdf.registerHelper('ifcucode', function (cucode, options) {
            if (this.cucode) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        })

        pdf.registerHelper('ifdate', function (insertDatetime, options) {
            const today = new Date(this.insertDatetime);
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1;
            let dd = today.getDate();
            this.insertDatetime = dd + '-' + mm + '-' + yyyy;
            this.slNo = incoming.find(x => x.slNo == this.rawmaterialslno)?.iirno;
            if (this.insertDatetime) {
                return options.fn(this, this.insertDatetime, this.slNo);
            }
        })


        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {
                Item: item
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

    async downloadchildPartStockPdf(unitslno: any, @Req() request: Request, @Res() response: Response) {

        let item = await this.rawmaterialinspectionRepository.find({
            where: { unitslno: unitslno },
            relations: ["itemcode2", "cucode2", "cptcode2", "prtcode2"],
            order: { slNo: "DESC" },
        });

        let incoming = await this.materialinspectionRepository.find({
            order: { slNo: "DESC" },
            relations: ["rawmaterialinspection001wbs"],
            where: { unitslno: unitslno }
        })

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('childPartsStock.html', 'utf8');

        pdf.registerHelper('ifcptcode', function (cptcode, options) {
            if (this.cptcode) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        })

        pdf.registerHelper('ifdate', function (insertDatetime, options) {
            const today = new Date(this.insertDatetime);
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1;
            let dd = today.getDate();
            this.insertDatetime = dd + '-' + mm + '-' + yyyy;
            this.slNo = incoming.find(x => x.slNo == this.rawmaterialslno)?.iirno;
            if (this.insertDatetime) {
                return options.fn(this, this.insertDatetime, this.slNo);
            }
        })


        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {
                Item: item
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

    async downloadPartStockPdf(unitslno: any, @Req() request: Request, @Res() response: Response) {

        let item = await this.rawmaterialinspectionRepository.find({
            where: { unitslno: unitslno },
            relations: ["itemcode2", "cucode2", "cptcode2", "prtcode2"],
            order: { slNo: "DESC" },
        });
        let incoming = await this.materialinspectionRepository.find({
            order: { slNo: "DESC" },
            relations: ["rawmaterialinspection001wbs"],
            where: { unitslno: unitslno }
        })

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('partsStock.html', 'utf8');

        pdf.registerHelper('ifprtcode', function (prtcode, options) {
            if (this.prtcode) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        })

        pdf.registerHelper('ifdate', function (insertDatetime, options) {
            const today = new Date(this.insertDatetime);
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1;
            let dd = today.getDate();
            this.insertDatetime = dd + '-' + mm + '-' + yyyy;
            this.slNo = incoming.find(x => x.slNo == this.rawmaterialslno)?.iirno;
            if (this.insertDatetime) {
                return options.fn(this, this.insertDatetime, this.slNo);
            }
        })


        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {
                Item: item
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







    // ----------------------Item-Excel------------------------

    async downloaditemStockExcel(unitslno: any, @Req() request: Request, @Res() response: Response) {

        let item = await this.rawmaterialinspectionRepository.find({
            where: { unitslno: unitslno },
            relations: ["itemcode2", "cucode2", "cptcode2", "prtcode2"],
            order: { slNo: "DESC" },
        });
        let incoming = await this.materialinspectionRepository.find({
            order: { slNo: "DESC" },
            relations: ["rawmaterialinspection001wbs"],
            where: { unitslno: unitslno }
        })
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
            { key: 'D', width: 22.0 },
            { key: 'E', width: 22.0 },
            { key: 'F', width: 25.0 },
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


        worksheet.mergeCells('B1:E2');
        worksheet.getCell('B1:E2').value = "SRINIVASA ENTERPRISES";
        worksheet.getCell('B1:E2').fgColor = { argb: 'b03600' };
        worksheet.getCell('B1:E2').font = {
            size: 11,
            bold: true
        };
        worksheet.getCell('B1:E2').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('B3:E4');
        worksheet.getCell('B3:E4').value = "ITEM DETAILS";
        worksheet.getCell('B3:E4').fgColor = { argb: '00b050' };

        worksheet.getCell('B3:E4').font = {
            size: 11,
            bold: true
        };
        worksheet.getCell('B3:E4').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('F1');
        worksheet.getCell('F1').value = "Format No.SE/MTN/R05";
        worksheet.getCell('F1').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('F2');
        worksheet.getCell('F2').value = "Issue Date : ";
        worksheet.getCell('F2').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('F3');
        worksheet.getCell('F3').value = "Rev. No. 00	";
        worksheet.getCell('F3').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('F4');
        worksheet.getCell('F4').value = "Rev Date :";
        worksheet.getCell('F4').alignment = { vertical: 'left', horizontal: 'left' };

        worksheet.mergeCells('A5');
        worksheet.getCell('A5').value = "Incoming No";
        worksheet.getCell('A5').font = {
            size: 11,
            bold: true
        };
        worksheet.mergeCells('B5');
        worksheet.getCell('B5').value = "Item Code";
        worksheet.getCell('B5').font = {
            size: 11,
            bold: true
        };
        worksheet.mergeCells('C5');
        worksheet.getCell('C5').value = "Item Name";
        worksheet.getCell('C5').font = {
            size: 11,
            bold: true
        };
        worksheet.mergeCells('D5');
        worksheet.getCell('D5').value = "Item Description";
        worksheet.getCell('D5').font = {
            size: 11,
            bold: true
        };


        worksheet.mergeCells('E5');
        worksheet.getCell('E5').value = "Accepted Quantity";
        worksheet.getCell('E5').font = {
            size: 11,
            bold: true
        };
        worksheet.mergeCells('F5');
        worksheet.getCell('F5').value = "Accepted Date";
        worksheet.getCell('F5').font = {
            size: 11,
            bold: true
        };




        let orderitemarray = [];

        for (let i = 0; i < item.length; i++) {

            if (item[i].itemcode) {
                orderitemarray.push(item[i])
            }
        }





        for (let i = 0; i < orderitemarray.length; i++) {
            let temp = i + 6;

            worksheet.mergeCells('A' + temp);
            worksheet.getCell('A' + temp).value = orderitemarray[i].rawmaterialslno ? incoming.find(x => x.slNo == orderitemarray[i].rawmaterialslno)?.iirno : null;

            worksheet.mergeCells('B' + temp);
            worksheet.getCell('B' + temp).value = orderitemarray[i].itemcode2.itemcode;

            worksheet.mergeCells('C' + temp);
            worksheet.getCell('C' + temp).value = orderitemarray[i].itemcode2.itemname;

            worksheet.mergeCells('D' + temp);
            worksheet.getCell('D' + temp).value = orderitemarray[i].itemcode2.descrip;

            worksheet.mergeCells('E' + temp);
            worksheet.getCell('E' + temp).value = orderitemarray[i].acceptedQty;

            worksheet.mergeCells('F' + temp);
            worksheet.getCell('F' + temp).value = orderitemarray[i].insertDatetime;


        }
        return workbook.xlsx.write(response).then(function () {
            response['status'](200).end();
        });


    }

    // --------------------------Consumable-Excel-------------------------------

    async downloadconsumableStockExcel(unitslno: any, @Req() request: Request, @Res() response: Response) {

        let item = await this.rawmaterialinspectionRepository.find({
            relations: ["itemcode2", "cucode2", "cptcode2", "prtcode2"],
            order: { slNo: "DESC" },
            where: { unitslno: unitslno }
        });

        let incoming = await this.materialinspectionRepository.find({
            order: { slNo: "DESC" },
            relations: ["rawmaterialinspection001wbs"],
            where: { unitslno: unitslno }
        })

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
            { key: 'D', width: 22.0 },
            { key: 'E', width: 22.0 },
            { key: 'F', width: 25.0 },



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


        worksheet.mergeCells('B1:E2');
        worksheet.getCell('B1:E2').value = "SRINIVASA ENTERPRISES";
        worksheet.getCell('B1:E2').fgColor = { argb: 'b03600' };
        worksheet.getCell('B1:E2').font = {
            size: 11,
            bold: true
        };
        worksheet.getCell('B1:E2').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('B3:E4');
        worksheet.getCell('B3:E4').value = "CONSUMABLE ITEM DETAILS";
        worksheet.getCell('B3:E4').fgColor = { argb: '00b050' };

        worksheet.getCell('B3:E4').font = {
            size: 11,
            bold: true
        };
        worksheet.getCell('B3:E4').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('F1');
        worksheet.getCell('F1').value = "Format No.SE/MTN/R05";
        worksheet.getCell('F1').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('F2');
        worksheet.getCell('F2').value = "Issue Date : ";
        worksheet.getCell('F2').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('F3');
        worksheet.getCell('F3').value = "Rev. No. 00	";
        worksheet.getCell('F3').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('F4');
        worksheet.getCell('F4').value = "Rev Date :";
        worksheet.getCell('F4').alignment = { vertical: 'left', horizontal: 'left' };

        worksheet.mergeCells('A5');
        worksheet.getCell('A5').value = "Incomig No";
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
        worksheet.getCell('E5').value = "Accepted Quantity";
        worksheet.getCell('E5').font = {
            size: 11,
            bold: true
        };
        worksheet.mergeCells('F5');
        worksheet.getCell('F5').value = "Accepted Date";
        worksheet.getCell('F5').font = {
            size: 11,
            bold: true
        };


        let orderitemarray = [];

        for (let i = 0; i < item.length; i++) {
            if (item[i].cucode) {
                orderitemarray.push(item[i])
            }
        }

        for (let i = 0; i < orderitemarray.length; i++) {
            let temp = i + 6;

            worksheet.mergeCells('A' + temp);
            worksheet.getCell('A' + temp).value = orderitemarray[i].rawmaterialslno ? incoming.find(x => x.slNo == orderitemarray[i].rawmaterialslno)?.iirno : null;

            worksheet.mergeCells('B' + temp);
            worksheet.getCell('B' + temp).value = orderitemarray[i].cucode2.consmno;

            worksheet.mergeCells('C' + temp);
            worksheet.getCell('C' + temp).value = orderitemarray[i].cucode2.consname;

            worksheet.mergeCells('D' + temp);
            worksheet.getCell('D' + temp).value = orderitemarray[i].cucode2.descrip;

            worksheet.mergeCells('E' + temp);
            worksheet.getCell('E' + temp).value = orderitemarray[i].cuacceptedQty;

            worksheet.mergeCells('F' + temp);
            worksheet.getCell('F' + temp).value = orderitemarray[i].insertDatetime;

        }
        return workbook.xlsx.write(response).then(function () {
            response['status'](200).end();
        });


    }


    // ------------------------ChildPart-Excel--------------------------

    async downloadchildPartStockExcel(unitslno: any, @Req() request: Request, @Res() response: Response) {

        let item = await this.rawmaterialinspectionRepository.find({
            relations: ["itemcode2", "cucode2", "cptcode2", "prtcode2"],
            order: { slNo: "DESC" },
            where: { unitslno: unitslno }
        });

        let incoming = await this.materialinspectionRepository.find({
            order: { slNo: "DESC" },
            relations: ["rawmaterialinspection001wbs"],
            where: { unitslno: unitslno }
        })

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
            { key: 'D', width: 22.0 },
            { key: 'E', width: 22.0 },
            { key: 'F', width: 25.0 },
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


        worksheet.mergeCells('B1:E2');
        worksheet.getCell('B1:E2').value = "SRINIVASA ENTERPRISES";
        worksheet.getCell('B1:E2').fgColor = { argb: 'b03600' };
        worksheet.getCell('B1:E2').font = {
            size: 11,
            bold: true
        };
        worksheet.getCell('B1:E2').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('B3:E4');
        worksheet.getCell('B3:E4').value = "CHILD PART DETAILS";
        worksheet.getCell('B3:E4').fgColor = { argb: '00b050' };

        worksheet.getCell('B3:E4').font = {
            size: 11,
            bold: true
        };
        worksheet.getCell('B3:E4').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('F1');
        worksheet.getCell('F1').value = "Format No.SE/MTN/R05";
        worksheet.getCell('F1').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('F2');
        worksheet.getCell('F2').value = "Issue Date : ";
        worksheet.getCell('F2').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('F3');
        worksheet.getCell('F3').value = "Rev. No. 00	";
        worksheet.getCell('F3').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('F4');
        worksheet.getCell('F4').value = "Rev Date :";
        worksheet.getCell('F4').alignment = { vertical: 'left', horizontal: 'left' };

        worksheet.mergeCells('A5');
        worksheet.getCell('A5').value = "Icoming No";
        worksheet.getCell('A5').font = {
            size: 11,
            bold: true
        };
        worksheet.mergeCells('B5');
        worksheet.getCell('B5').value = "ChildPart Code";
        worksheet.getCell('B5').font = {
            size: 11,
            bold: true
        };
        worksheet.mergeCells('C5');
        worksheet.getCell('C5').value = "ChildPart Name";
        worksheet.getCell('C5').font = {
            size: 11,
            bold: true
        };
        worksheet.mergeCells('D5');
        worksheet.getCell('D5').value = "ChildPart Description";
        worksheet.getCell('D5').font = {
            size: 11,
            bold: true
        };


        worksheet.mergeCells('E5');
        worksheet.getCell('E5').value = "Accepted Quantity";
        worksheet.getCell('E5').font = {
            size: 11,
            bold: true
        };
        worksheet.mergeCells('F5');
        worksheet.getCell('F5').value = "Accepted Date";
        worksheet.getCell('F5').font = {
            size: 11,
            bold: true
        };

        let orderitemarray = [];

        for (let i = 0; i < item.length; i++) {
            if (item[i].cptcode) {
                orderitemarray.push(item[i])
            }
        }



        for (let i = 0; i < orderitemarray.length; i++) {
            let temp = i + 6;

            worksheet.mergeCells('A' + temp);
            worksheet.getCell('A' + temp).value = orderitemarray[i].rawmaterialslno ? incoming.find(x => x.slNo == orderitemarray[i].rawmaterialslno)?.iirno : null;

            worksheet.mergeCells('B' + temp);
            worksheet.getCell('B' + temp).value = orderitemarray[i].cptcode2.cpartno;

            worksheet.mergeCells('C' + temp);
            worksheet.getCell('C' + temp).value = orderitemarray[i].cptcode2.cpartname;

            worksheet.mergeCells('D' + temp);
            worksheet.getCell('D' + temp).value = orderitemarray[i].cptcode2.descrip;

            worksheet.mergeCells('E' + temp);
            worksheet.getCell('E' + temp).value = orderitemarray[i].cptacceptedQty;

            worksheet.mergeCells('F' + temp);
            worksheet.getCell('F' + temp).value = orderitemarray[i].insertDatetime;
        }
        return workbook.xlsx.write(response).then(function () {
            response['status'](200).end();
        });


    }

    // -----------------------------Part-Excel----------------------

    async downloadPartStockExcel(unitslno: any, @Req() request: Request, @Res() response: Response) {

        let item = await this.rawmaterialinspectionRepository.find({
            relations: ["itemcode2", "cucode2", "cptcode2", "prtcode2"],
            order: { slNo: "DESC" },
            where: { unitslno: unitslno }
        });

        let incoming = await this.materialinspectionRepository.find({
            order: { slNo: "DESC" },
            relations: ["rawmaterialinspection001wbs"],
            where: { unitslno: unitslno }
        })

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
            { key: 'D', width: 22.0 },
            { key: 'E', width: 22.0 },
            { key: 'F', width: 25.0 },

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


        worksheet.mergeCells('B1:E2');
        worksheet.getCell('B1:E2').value = "SRINIVASA ENTERPRISES";
        worksheet.getCell('B1:E2').fgColor = { argb: 'b03600' };
        worksheet.getCell('B1:E2').font = {
            size: 11,
            bold: true
        };
        worksheet.getCell('B1:E2').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('B3:E4');
        worksheet.getCell('B3:E4').value = "PART DETAILS";
        worksheet.getCell('B3:E4').fgColor = { argb: '00b050' };

        worksheet.getCell('B3:E4').font = {
            size: 11,
            bold: true
        };
        worksheet.getCell('B3:E4').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('F1');
        worksheet.getCell('F1').value = "Format No.SE/MTN/R05";
        worksheet.getCell('F1').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('F2');
        worksheet.getCell('F2').value = "Issue Date : ";
        worksheet.getCell('F2').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('F3');
        worksheet.getCell('F3').value = "Rev. No. 00	";
        worksheet.getCell('F3').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('F4');
        worksheet.getCell('F4').value = "Rev Date :";
        worksheet.getCell('F4').alignment = { vertical: 'left', horizontal: 'left' };

        worksheet.mergeCells('A5');
        worksheet.getCell('A5').value = "Incoming No";
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
        worksheet.getCell('E5').value = "Accepted Quantity";
        worksheet.getCell('E5').font = {
            size: 11,
            bold: true
        };
        worksheet.mergeCells('F5');
        worksheet.getCell('F5').value = "Accepted Date";
        worksheet.getCell('F5').font = {
            size: 11,
            bold: true
        };


        let orderitemarray = [];

        for (let i = 0; i < item.length; i++) {
            if (item[i].prtcode) {
                orderitemarray.push(item[i])
            }
        }



        for (let i = 0; i < orderitemarray.length; i++) {
            let temp = i + 6;

            worksheet.mergeCells('A' + temp);
            worksheet.getCell('A' + temp).value = orderitemarray[i].rawmaterialslno ? incoming.find(x => x.slNo == orderitemarray[i].rawmaterialslno)?.iirno : null;

        worksheet.mergeCells('B' + temp);
        worksheet.getCell('B' + temp).value = orderitemarray[i].prtcode2.partno;

        worksheet.mergeCells('C' + temp);
        worksheet.getCell('C' + temp).value = orderitemarray[i].prtcode2.partname;

        worksheet.mergeCells('D' + temp);
        worksheet.getCell('D' + temp).value = orderitemarray[i].prtcode2.descrip;

            worksheet.mergeCells('E' + temp);
            worksheet.getCell('E' + temp).value = orderitemarray[i].prtacceptedQty;

            worksheet.mergeCells('F' + temp);
            worksheet.getCell('F' + temp).value = orderitemarray[i].insertDatetime;

        }
        return workbook.xlsx.write(response).then(function () {
            response['status'](200).end();
        });


}

}








