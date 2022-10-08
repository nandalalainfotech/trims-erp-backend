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
var path = require('path');
var fs = require('fs');
const excel = require('exceljs');
var pdf = require('dynamic-html-pdf');




@Injectable()
export class RawmaterialinspectionService {
    constructor(

    @InjectRepository(Rawmaterialinspection001wb) private readonly rawmaterialinspectionRepository: Repository<Rawmaterialinspection001wb>,
    @InjectRepository(Orderitem001mb) private readonly orderItemsRepository: Repository<Orderitem001mb>,
    @InjectRepository(Consumble001mb) private readonly consumbleRepository: Repository<Consumble001mb>,
    @InjectRepository(Childpart001mb) private readonly childPartRepository: Repository<Childpart001mb>,
    @InjectRepository(Part001mb)private readonly PartRepository: Repository<Part001mb>) {
    }

    async findAll(unitslno:any): Promise<Rawmaterialinspection001wb[]> {
        return await this.rawmaterialinspectionRepository.find({
            order: { slNo: "DESC" },
            relations:["itemcode2","cucode2","cptcode2","prtcode2"],
            where:{unitslno:unitslno}
        },)
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

    async downloaditemPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {

        let item  = await this.rawmaterialinspectionRepository.find({where:{unitslno:unitslno},
            relations:["itemcode2","cucode2","cptcode2","prtcode2"],
        });


        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('items.html', 'utf8');

        pdf.registerHelper('iforderslno', function (itemcode, options ) {
            if (this.itemcode) {
              return options.fn(this);
            }else{
              return options.inverse(this);
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

    

    async downloadconsumablePdf(unitslno:any,@Req() request: Request, @Res() response: Response) {

        let item  = await this.rawmaterialinspectionRepository.find({where:{unitslno:unitslno},
            relations:["itemcode2","cucode2","cptcode2","prtcode2"],
        });


        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('Consumables.html', 'utf8');

        pdf.registerHelper('ifcucode', function (cucode, options ) {
            if (this.cucode) {
              return options.fn(this);
            }else{
              return options.inverse(this);
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

    async downloadchildPartPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {

        let item  = await this.rawmaterialinspectionRepository.find({where:{unitslno:unitslno},
            relations:["itemcode2","cucode2","cptcode2","prtcode2"],
        });


        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('childParts.html', 'utf8');

        pdf.registerHelper('ifcptcode', function (cptcode, options ) {
            if (this.cptcode) {
              return options.fn(this);
            }else{
              return options.inverse(this);
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

    async downloadPartPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {

        let item  = await this.rawmaterialinspectionRepository.find({where:{unitslno:unitslno},
            relations:["itemcode2","cucode2","cptcode2","prtcode2"],
        });


        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('parts.html', 'utf8');

        pdf.registerHelper('ifprtcode', function (prtcode, options ) {
            if (this.prtcode) {
              return options.fn(this);
            }else{
              return options.inverse(this);
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

    async downloaditemExcel(unitslno:any,@Req() request: Request, @Res() response: Response) {

            let item  = await this.rawmaterialinspectionRepository.find({
            relations:["itemcode2","cucode2","cptcode2","prtcode2"],
            where:{unitslno:unitslno}});
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


            worksheet.mergeCells('B1:H2');
            worksheet.getCell('B1:H2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('B1:H2').fgColor = { argb: 'b03600' };
            worksheet.getCell('B1:H2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('B1:H2').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('B3:H4');
            worksheet.getCell('B3:H4').value = "ITEM DETAILS";
            worksheet.getCell('B3:H4').fgColor = { argb: '00b050' };

            worksheet.getCell('B3:H4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('B3:H4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('I1');
            worksheet.getCell('I1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('I1').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('I2');
            worksheet.getCell('I2').value = "Issue Date : ";
            worksheet.getCell('I2').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('I3');
            worksheet.getCell('I3').value = "Rev. No. 00	";
            worksheet.getCell('I3').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('I4');
            worksheet.getCell('I4').value = "Rev Date :";
            worksheet.getCell('I4').alignment = { vertical: 'left', horizontal: 'left' };

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
            worksheet.getCell('E5').value = "Accepted Quantity";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "Location";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "M.S.Level";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('H5');
            worksheet.getCell('H5').value = "Lead Time";
            worksheet.getCell('H5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('I5');
            worksheet.getCell('I5').value = "Re-Order Level";
            worksheet.getCell('I5').font = {
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
                worksheet.getCell('A' + temp).value = orderitemarray[i].slNo;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = orderitemarray[i].itemcode2.itemcode

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = orderitemarray[i].itemcode2.itemname;

                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = orderitemarray[i].itemcode2.descrip;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = orderitemarray[i].acceptedQty;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = orderitemarray[i].itemcode2.location;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).value = orderitemarray[i].itemcode2.mslevel;

                worksheet.mergeCells('H' + temp);
                worksheet.getCell('H' + temp).value = orderitemarray[i].itemcode2.leadtime;

                worksheet.mergeCells('I' + temp);
                worksheet.getCell('I' + temp).value = orderitemarray[i].itemcode2.orderlevel;

            }
        return workbook.xlsx.write(response).then(function () {
            response['status'](200).end();
        });    


    }

    // --------------------------Consumable-Excel-------------------------------

    async downloadconsumableExcel(unitslno:any,@Req() request: Request, @Res() response: Response) {

        let item  = await this.rawmaterialinspectionRepository.find({
        relations:["itemcode2","cucode2","cptcode2","prtcode2"],
        where:{unitslno:unitslno}});
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
        worksheet.getCell('E5').value = "Consumable Quantity";
        worksheet.getCell('E5').font = {
            size: 11,
            bold: true
        };
        worksheet.mergeCells('F5');
        worksheet.getCell('F5').value = "Accepted Quantity";
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

        let orderitemarray = [];

        for (let i = 0; i < item.length; i++) {
            if (item[i].cucode) {
                orderitemarray.push(item[i])
            }
        }        
      
        for (let i = 0; i < orderitemarray.length; i++) { 
          let temp = i + 6;
   
            worksheet.mergeCells('A' + temp);
            worksheet.getCell('A' + temp).value = orderitemarray[i].slNo;

            worksheet.mergeCells('B' + temp);
            worksheet.getCell('B' + temp).value = orderitemarray[i].cucode2.consmno;

            worksheet.mergeCells('C' + temp);
            worksheet.getCell('C' + temp).value = orderitemarray[i].cucode2.consname;

            worksheet.mergeCells('D' + temp);
            worksheet.getCell('D' + temp).value = orderitemarray[i].cucode2.descrip;

            worksheet.mergeCells('E' + temp);
            worksheet.getCell('E' + temp).value = orderitemarray[i].cuqunty;

            worksheet.mergeCells('F' + temp);
            worksheet.getCell('F' + temp).value = orderitemarray[i].cuacceptedQty;

            worksheet.mergeCells('G' + temp);
            worksheet.getCell('G' + temp).value = orderitemarray[i].cucode2.location;

            worksheet.mergeCells('H' + temp);
            worksheet.getCell('H' + temp).value = orderitemarray[i].cucode2.mslevel;

            worksheet.mergeCells('I' + temp);
            worksheet.getCell('I' + temp).value = orderitemarray[i].cucode2.leadtime;

            worksheet.mergeCells('J' + temp);
            worksheet.getCell('J' + temp).value = orderitemarray[i].cucode2.orderlevel;

        }
    return workbook.xlsx.write(response).then(function () {
        response['status'](200).end();
    });    


}


// ------------------------ChildPart-Excel--------------------------

async downloadchildPartExcel(unitslno:any,@Req() request: Request, @Res() response: Response) {

    let item  = await this.rawmaterialinspectionRepository.find({
    relations:["itemcode2","cucode2","cptcode2","prtcode2"],
    where:{unitslno:unitslno}});
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
    worksheet.getCell('E5').value = "ChildPart Quantity";
    worksheet.getCell('E5').font = {
        size: 11,
        bold: true
    };
    worksheet.mergeCells('F5');
    worksheet.getCell('F5').value = "Accepted Quantity";
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

    let orderitemarray = [];

    for (let i = 0; i < item.length; i++) {
        if (item[i].cptcode) {
            orderitemarray.push(item[i])
        }
    }   
    
    
  
    for (let i = 0; i < orderitemarray.length; i++) { 
      let temp = i + 6;

        worksheet.mergeCells('A' + temp);
        worksheet.getCell('A' + temp).value = orderitemarray[i].slNo;

        worksheet.mergeCells('B' + temp);
        worksheet.getCell('B' + temp).value = orderitemarray[i].cptcode2.cpartno;

        worksheet.mergeCells('C' + temp);
        worksheet.getCell('C' + temp).value = orderitemarray[i].cptcode2.cpartname;

        worksheet.mergeCells('D' + temp);
        worksheet.getCell('D' + temp).value = orderitemarray[i].cptcode2.descrip;

        worksheet.mergeCells('E' + temp);
        worksheet.getCell('E' + temp).value = orderitemarray[i].cptqunty;

        worksheet.mergeCells('F' + temp);
        worksheet.getCell('F' + temp).value = orderitemarray[i].cptacceptedQty;

        worksheet.mergeCells('G' + temp);
        worksheet.getCell('G' + temp).value = orderitemarray[i].cptcode2.location;

        worksheet.mergeCells('H' + temp);
        worksheet.getCell('H' + temp).value = orderitemarray[i].cptcode2.mslevel;

        worksheet.mergeCells('I' + temp);
        worksheet.getCell('I' + temp).value = orderitemarray[i].cptcode2.leadtime;

        worksheet.mergeCells('J' + temp);
        worksheet.getCell('J' + temp).value = orderitemarray[i].cptcode2.orderlevel;

    }
return workbook.xlsx.write(response).then(function () {
    response['status'](200).end();
});    


}

// -----------------------------Part-Excel----------------------

async downloadPartExcel(unitslno:any,@Req() request: Request, @Res() response: Response) {

    let item  = await this.rawmaterialinspectionRepository.find({
    relations:["itemcode2","cucode2","cptcode2","prtcode2"],
    where:{unitslno:unitslno}});
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
    worksheet.getCell('E5').value = "Part Quantity";
    worksheet.getCell('E5').font = {
        size: 11,
        bold: true
    };
    worksheet.mergeCells('F5');
    worksheet.getCell('F5').value = "Accepted Quantity";
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

    let orderitemarray = [];

    for (let i = 0; i < item.length; i++) {
        if (item[i].prtcode) {
            orderitemarray.push(item[i])
        }
    }   
    
    
  
    for (let i = 0; i < orderitemarray.length; i++) { 
      let temp = i + 6;

        worksheet.mergeCells('A' + temp);
        worksheet.getCell('A' + temp).value = orderitemarray[i].slNo;

        worksheet.mergeCells('B' + temp);
        worksheet.getCell('B' + temp).value = orderitemarray[i].prtcode2.partno;

        worksheet.mergeCells('C' + temp);
        worksheet.getCell('C' + temp).value = orderitemarray[i].prtcode2.partname;

        worksheet.mergeCells('D' + temp);
        worksheet.getCell('D' + temp).value = orderitemarray[i].prtcode2.descrip;

        worksheet.mergeCells('E' + temp);
        worksheet.getCell('E' + temp).value = orderitemarray[i].cptqunty;

        worksheet.mergeCells('F' + temp);
        worksheet.getCell('F' + temp).value = orderitemarray[i].cptacceptedQty;

        worksheet.mergeCells('G' + temp);
        worksheet.getCell('G' + temp).value = orderitemarray[i].prtcode2.location;

        worksheet.mergeCells('H' + temp);
        worksheet.getCell('H' + temp).value = orderitemarray[i].prtcode2.mslevel;

        worksheet.mergeCells('I' + temp);
        worksheet.getCell('I' + temp).value = orderitemarray[i].prtcode2.leadtime;

        worksheet.mergeCells('J' + temp);
        worksheet.getCell('J' + temp).value = orderitemarray[i].prtcode2.orderlevel;

    }
return workbook.xlsx.write(response).then(function () {
    response['status'](200).end();
});    


}

}








