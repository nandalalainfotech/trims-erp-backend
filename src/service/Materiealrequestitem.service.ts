import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
import { Between } from 'typeorm';
import { createReadStream } from "fs";
import { Materiealrequestitem001wb } from "src/entity/Materiealrequestitem001wb";
import { MateriealrequestitemDTO } from "src/dto/Materiealrequestitem.dto";

var path = require('path');
var fs = require('fs');
const excel = require('exceljs');
var pdf = require('dynamic-html-pdf');





@Injectable()

export class MateriealrequestitemService {
    constructor(
        @InjectRepository(Materiealrequestitem001wb) private readonly materiealrequestitemRepository: Repository<Materiealrequestitem001wb>) {
    }

    async create(materiealrequestitemDTO:MateriealrequestitemDTO): Promise<Materiealrequestitem001wb> {
        const materiealrequestitem001wb = new Materiealrequestitem001wb();
        materiealrequestitem001wb.setProperties(materiealrequestitemDTO);
        return this.materiealrequestitemRepository.save(materiealrequestitem001wb);
    }

    async update(materiealrequestitemDTO: MateriealrequestitemDTO): Promise<Materiealrequestitem001wb> {
        const materiealrequestitem001wb = new Materiealrequestitem001wb();
        materiealrequestitem001wb.setProperties(materiealrequestitemDTO);
        await this.materiealrequestitemRepository.update({ slNo: materiealrequestitem001wb.slNo }, materiealrequestitem001wb);
        return materiealrequestitem001wb;
    }

    async findAll(unitslno: number): Promise<Materiealrequestitem001wb[]> {
        return this.materiealrequestitemRepository.find({
            order: { slNo: "DESC" }
        });
    }


    findOne(id: number): Promise<Materiealrequestitem001wb> {
        return this.materiealrequestitemRepository.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.materiealrequestitemRepository.delete(id);
    }

     // -----------Stock-Pdf && Excel ---------------------

     async downloaditemPdf(unitslno: any, @Req() request: Request, @Res() response: Response) {

        let ordeitem = await this.materiealrequestitemRepository.find();



        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('MatReqitems.html', 'utf8');
        let itemslno = 0
     
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
            this.slNo = ++itemslno
            if (this.insertDatetime) {
                return options.fn(this, this.insertDatetime,this.slNo);
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
                Item: ordeitem
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
        let ordeitem = await this.materiealrequestitemRepository.find();

     
        let consumbleSlno = 0
        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('MatReqConsumables.html', 'utf8');

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
            this.slNo = ++consumbleSlno
            if (this.insertDatetime) {
                return options.fn(this, this.insertDatetime,this.slNo);
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
                Item: ordeitem
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

    async downloadchildPartPdf(unitslno: any, @Req() request: Request, @Res() response: Response) {

        let ordeitem = await this.materiealrequestitemRepository.find();

      

        let childSlno = 0
        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('MatReqchildParts.html', 'utf8');

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
            this.slNo = ++childSlno
            if (this.insertDatetime) {
                return options.fn(this, this.insertDatetime,this.slNo);
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
                Item: ordeitem
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

    async downloadPartPdf(unitslno: any, @Req() request: Request, @Res() response: Response) {


        let ordeitem = await this.materiealrequestitemRepository.find();

        let partSlno = 0;
        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('MatReqparts.html', 'utf8');
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
            this.slNo = ++partSlno
            if (this.insertDatetime) {
                return options.fn(this, this.insertDatetime,this.slNo);
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
                Item: ordeitem
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

        let Rawmaterial = await this.materiealrequestitemRepository.find();

       





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
        worksheet.getCell('E5').value = "Re-order Qty";
        worksheet.getCell('E5').font = {
            size: 11,
            bold: true
        };
        worksheet.mergeCells('F5');
        worksheet.getCell('F5').value = "Date";
        worksheet.getCell('F5').font = {
            size: 11,
            bold: true
        };
       

        let orderitemarray = [];

        for (let i = 0; i < Rawmaterial.length; i++) {
            if (Rawmaterial[i].itemcode) {
                orderitemarray.push(Rawmaterial[i])
            }

        }



        for (let i = 0; i < orderitemarray.length; i++) {
            let temp = i + 6;

            worksheet.mergeCells('A' + temp);
            worksheet.getCell('A' + temp).value = i+1;

            worksheet.mergeCells('B' + temp);
            worksheet.getCell('B' + temp).value = orderitemarray[i].itemcode

            worksheet.mergeCells('C' + temp);
            worksheet.getCell('C' + temp).value = orderitemarray[i].itemname;

            worksheet.mergeCells('D' + temp);
            worksheet.getCell('D' + temp).value = orderitemarray[i].descrip;

            worksheet.mergeCells('E' + temp);
            worksheet.getCell('E' + temp).value = orderitemarray[i].qunty;

            worksheet.mergeCells('F' + temp);
            worksheet.getCell('F' + temp).value = orderitemarray[i].insertDatetime;

        

        }
        return workbook.xlsx.write(response).then(function () {
            response['status'](200).end();
        });


    }

    // --------------------------Consumable-Excel-------------------------------

    async downloadconsumableExcel(unitslno: any, @Req() request: Request, @Res() response: Response) {


        let Rawmaterial = await this.materiealrequestitemRepository.find();


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
        worksheet.getCell('E5').value = "Re-order Qty";
        worksheet.getCell('E5').font = {
            size: 11,
            bold: true
        };
        worksheet.mergeCells('F5');
        worksheet.getCell('F5').value = "Date";
        worksheet.getCell('F5').font = {
            size: 11,
            bold: true
        };
       

        let orderitemarray = [];

        for (let i = 0; i < Rawmaterial.length; i++) {
            if (Rawmaterial[i].cucode) {
                orderitemarray.push(Rawmaterial[i])
            }
        }

    
        for (let i = 0; i < orderitemarray.length; i++) {
            let temp = i + 6;

            worksheet.mergeCells('A' + temp);
            worksheet.getCell('A' + temp).value =i+1;

            worksheet.mergeCells('B' + temp);
            worksheet.getCell('B' + temp).value = orderitemarray[i].cucode;

            worksheet.mergeCells('C' + temp);
            worksheet.getCell('C' + temp).value = orderitemarray[i].cuname;

            worksheet.mergeCells('D' + temp);
            worksheet.getCell('D' + temp).value = orderitemarray[i].cudescrip;

            worksheet.mergeCells('E' + temp);
            worksheet.getCell('E' + temp).value = orderitemarray[i].cuqunty;

            worksheet.mergeCells('F' + temp);
            worksheet.getCell('F' + temp).value = orderitemarray[i].insertDatetime;

          

        }
        return workbook.xlsx.write(response).then(function () {
            response['status'](200).end();
        });


    }


    // ------------------------ChildPart-Excel--------------------------

    async downloadchildPartExcel(unitslno: any, @Req() request: Request, @Res() response: Response) {

        let Rawmaterial = await this.materiealrequestitemRepository.find();


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
        worksheet.getCell('E5').value = "Re-order Qty";
        worksheet.getCell('E5').font = {
            size: 11,
            bold: true
        };
        worksheet.mergeCells('F5');
        worksheet.getCell('F5').value = "Date";
        worksheet.getCell('F5').font = {
            size: 11,
            bold: true
        };
       

        let orderitemarray = [];

        for (let i = 0; i < Rawmaterial.length; i++) {
            if (Rawmaterial[i].cptcode) {
                orderitemarray.push(Rawmaterial[i])
            }
        }



        for (let i = 0; i < orderitemarray.length; i++) {
            let temp = i + 6;

            worksheet.mergeCells('A' + temp);
            worksheet.getCell('A' + temp).value = i+1;

            worksheet.mergeCells('B' + temp);
            worksheet.getCell('B' + temp).value = orderitemarray[i].cptcode

            worksheet.mergeCells('C' + temp);
            worksheet.getCell('C' + temp).value = orderitemarray[i].cptname;

            worksheet.mergeCells('D' + temp);
            worksheet.getCell('D' + temp).value = orderitemarray[i].cptdescrip;

            worksheet.mergeCells('E' + temp);
            worksheet.getCell('E' + temp).value = orderitemarray[i].cptqunty;

            worksheet.mergeCells('F' + temp);
            worksheet.getCell('F' + temp).value = orderitemarray[i].insertDatetime;

         

        }
        return workbook.xlsx.write(response).then(function () {
            response['status'](200).end();
        });


    }

    // -----------------------------Part-Excel----------------------

    async downloadPartExcel(unitslno: any, @Req() request: Request, @Res() response: Response) {

        let Rawmaterial = await this.materiealrequestitemRepository.find();


        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet('Part Details_report'); // creating worksheet
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
        worksheet.getCell('E5').value = "Re-order Qty";
        worksheet.getCell('E5').font = {
            size: 11,
            bold: true
        };
        worksheet.mergeCells('F5');
        worksheet.getCell('F5').value = "Date";
        worksheet.getCell('F5').font = {
            size: 11,
            bold: true
        };
       

        let orderitemarray = [];

        for (let i = 0; i < Rawmaterial.length; i++) {
            if (Rawmaterial[i].prtcode) {
                orderitemarray.push(Rawmaterial[i])
            }
        }


        for (let i = 0; i < orderitemarray.length; i++) {
            let temp = i + 6;

            worksheet.mergeCells('A' + temp);
            worksheet.getCell('A' + temp).value = i+1;

            worksheet.mergeCells('B' + temp);
            worksheet.getCell('B' + temp).value = orderitemarray[i].prtcode;

            worksheet.mergeCells('C' + temp);
            worksheet.getCell('C' + temp).value = orderitemarray[i].prtname;

            worksheet.mergeCells('D' + temp);
            worksheet.getCell('D' + temp).value = orderitemarray[i].prtdescrip;

            worksheet.mergeCells('E' + temp);
            worksheet.getCell('E' + temp).value = orderitemarray[i].prtqunty;

            worksheet.mergeCells('F' + temp);
            worksheet.getCell('F' + temp).value = orderitemarray[i].insertDatetime;

           

        }
        return workbook.xlsx.write(response).then(function () {
            response['status'](200).end();
        });


    }




}