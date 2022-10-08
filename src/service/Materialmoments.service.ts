import { HttpException, HttpStatus, Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { createReadStream } from "fs";
import { MaterialmomentsDTO } from "src/dto/Materialmoments.dto";
import { Childpart001mb } from "src/entity/ChildPart001mb";
import { Consumble001mb } from "src/entity/Consumble001mb";
import { Materialmoments001wb } from "src/entity/Materialmoments001wb";
import { Materialreceiveditem001wb } from "src/entity/Materialreceiveditem001wb";
import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { Part001mb } from "src/entity/Part001mb";
import { Rawmaterialinspection001wb } from "src/entity/Rawmaterialinspection001wb";
import { Request } from "supertest";
import { Repository } from "typeorm";
var path = require('path');
const excel = require('exceljs');

var fs = require('fs');
var fs = require('fs');
var pdf = require('dynamic-html-pdf');


@Injectable()


export class MaterialmomentsService {
    length: number;

    constructor(
        @InjectRepository(Materialmoments001wb) private readonly materialmomentsRepository: Repository<Materialmoments001wb>,
        @InjectRepository(Materialreceiveditem001wb) private readonly materialreceiveditemRepository: Repository<Materialreceiveditem001wb>,
        @InjectRepository(Orderitem001mb) private readonly orderItemsRepository: Repository<Orderitem001mb>,
        @InjectRepository(Consumble001mb) private readonly consumbleRepository: Repository<Consumble001mb>,
        @InjectRepository(Childpart001mb) private readonly childPartRepository: Repository<Childpart001mb>,
        @InjectRepository(Part001mb)private readonly PartRepository: Repository<Part001mb>,
        @InjectRepository(Rawmaterialinspection001wb) private readonly rawmaterialinspectionRepository: Repository<Rawmaterialinspection001wb>,
        ) {
    }

    async create(materialmomentsDTO: MaterialmomentsDTO): Promise<Materialmoments001wb> {
        
        const materialmoments001wb = new Materialmoments001wb();
        materialmoments001wb.setProperties(materialmomentsDTO);
        console.log("materialmoments001wb",materialmoments001wb);
        

        let consumableitem = new Rawmaterialinspection001wb();
        let Rawmaterial = new Rawmaterialinspection001wb();
        let childpart = new Rawmaterialinspection001wb();
        let Parts = new Rawmaterialinspection001wb();
        consumableitem = await this.rawmaterialinspectionRepository.findOne({ where: { slNo: materialmomentsDTO.consumslno } });
        Rawmaterial = await this.rawmaterialinspectionRepository.findOne({ where: { slNo: materialmomentsDTO.itemslno } });
        childpart = await this.rawmaterialinspectionRepository.findOne({ where: { slNo: materialmomentsDTO.childslno } });
        Parts = await this.rawmaterialinspectionRepository.findOne({ where: { slNo: materialmomentsDTO.prtslno } });

        if (materialmomentsDTO.itemslno ? (Rawmaterial.acceptedsum > materialmoments001wb.qunty && Rawmaterial.acceptedsum > 0) : false) {
            Rawmaterial.closing = Rawmaterial.acceptedsum - materialmoments001wb.qunty
            Rawmaterial.acceptedsum = Rawmaterial.acceptedsum - materialmoments001wb.qunty;
            await this.rawmaterialinspectionRepository.update({ slNo: materialmomentsDTO.itemslno }, Rawmaterial);
            return this.materialmomentsRepository.save(materialmoments001wb);
        } else if (materialmomentsDTO.consumslno ? (consumableitem.cuacceptedsum > materialmoments001wb.cuqunty && consumableitem.cuacceptedsum > 0) : false) {
            consumableitem.cucolsing = consumableitem.cuacceptedsum - materialmoments001wb.cuqunty;
            consumableitem.cuacceptedsum = consumableitem.cuacceptedsum - materialmoments001wb.cuqunty;
            await this.rawmaterialinspectionRepository.update({ slNo: materialmomentsDTO.consumslno }, consumableitem);
            return this.materialmomentsRepository.save(materialmoments001wb);
        }
        else if (materialmomentsDTO.childslno ? (childpart.cptacceptedsum > materialmoments001wb.cptqunty && childpart.cptacceptedsum > 0) : false) {
            childpart.cptcolsing = childpart.cptacceptedsum - materialmoments001wb.cptqunty;
            childpart.cptacceptedsum = childpart.cptacceptedsum - materialmoments001wb.cptqunty;
            await this.rawmaterialinspectionRepository.update({ slNo: materialmomentsDTO.childslno }, childpart);
            return this.materialmomentsRepository.save(materialmoments001wb);
        }
        else if (materialmomentsDTO.prtslno ? (Parts.prtacceptedsum > materialmoments001wb.prtqunty && Parts.prtacceptedsum > 0) : false) {
            Parts.prtcolsing = Parts.prtacceptedsum - materialmoments001wb.prtqunty;
            Parts.prtacceptedsum = Parts.prtacceptedsum - materialmoments001wb.prtqunty;
            await this.rawmaterialinspectionRepository.update({ slNo: materialmomentsDTO.prtslno }, Parts);
            return this.materialmomentsRepository.save(materialmoments001wb);
        } else {
            throw new HttpException('This Qty are not available in stock', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(materialmomentsDTO: MaterialmomentsDTO): Promise<Materialmoments001wb> {
        const materialmoments001wb = new Materialmoments001wb();
        materialmoments001wb.setProperties(materialmomentsDTO);
        await this.materialmomentsRepository.update({ slNo: materialmoments001wb.slNo },
            materialmoments001wb);
        return materialmoments001wb;
    }

    async findAll(unitslno:any): Promise<Materialmoments001wb[]> {
        return this.materialmomentsRepository.find({
            order: { slNo: "DESC" },
            where:{unitslno:unitslno}
        });
    }

    findOne(id: number): Promise<Materialmoments001wb> {
        return this.materialmomentsRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.materialmomentsRepository.delete(id);
    }

    async downloaditemPdf(unitslno: any, @Req() request: Request, @Res() response: Response) {

        let matmoment = await this.materialmomentsRepository.find({
            where: { unitslno: unitslno },
        });

        let returnRawmaterial = await this.rawmaterialinspectionRepository.find({
            relations: ["itemcode2", "cucode2", "cptcode2", "prtcode2"],
            where: {  unitslno: unitslno },
        })
          


        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('matMomentitem.html', 'utf8');

        pdf.registerHelper('ifitemslno', function (itemslno, options) {
            if (this.itemslno) {
                this.itemslno = this.itemslno ? returnRawmaterial.find(x => x.slNo === this.itemslno)?.itemcode2.itemcode : null;
                return options.fn(this, this.itemslno);
            } else {
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
                Matmoment: matmoment
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

        let matmoment = await this.materialmomentsRepository.find({
            where: { unitslno: unitslno },
        });


        let consumableitem = await this.consumbleRepository.find();
        let materialitem = await this.materialreceiveditemRepository.find();

        let returnRawmaterial = await this.rawmaterialinspectionRepository.find({
            relations: ["itemcode2", "cucode2", "cptcode2", "prtcode2"],
            where: {  unitslno: unitslno },
        })

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('matMomentcuItem.html', 'utf8');

        pdf.registerHelper('ifconsumslno', function (consumslno, options) {
            if (this.consumslno) {
                this.consumslno = this.consumslno ? returnRawmaterial.find(x => x.slNo === this.consumslno)?.cucode2.consmno : null;
                return options.fn(this, this.consumslno);
            } else {
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
                Matmoment: matmoment
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


        let matmoment = await this.materialmomentsRepository.find({
            where: { unitslno: unitslno },
        });

        let childpart = await this.childPartRepository.find();
        let materialitem = await this.materialreceiveditemRepository.find();

        let returnRawmaterial = await this.rawmaterialinspectionRepository.find({
            relations: ["itemcode2", "cucode2", "cptcode2", "prtcode2"],
            where: {  unitslno: unitslno },
        })


        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('matMomentCpart.html', 'utf8');

        pdf.registerHelper('ifchildslno', function (childslno, options) {
            if (this.childslno) {
                this.childslno = this.childslno ? returnRawmaterial.find(x => x.slNo === this.childslno)?.cptcode2.cpartno : null;
                return options.fn(this, this.childslno);
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
                Matmoment: matmoment
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

        let matmoment = await this.materialmomentsRepository.find({
            where: { unitslno: unitslno },
        });

        let part = await this.PartRepository.find();
        let materialitem = await this.materialreceiveditemRepository.find();

        let returnRawmaterial = await this.rawmaterialinspectionRepository.find({
            relations: ["itemcode2", "cucode2", "cptcode2", "prtcode2"],
            where: {  unitslno: unitslno },
        })

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('matMomentPart.html', 'utf8');

        pdf.registerHelper('ifprtslno', function (prtslno, options) {
            if (this.prtslno) {
                this.prtslno = this.prtslno ? returnRawmaterial.find(x => x.slNo === this.prtslno)?.prtcode2.partno : null;
                return options.fn(this, this.prtslno);
            } else {
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
                Matmoment: matmoment
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

        let matmoment = await this.materialmomentsRepository.find({
            where: { unitslno: unitslno },
        })

        let ordeitem = await this.orderItemsRepository.find();
        let materialitem = await this.materialreceiveditemRepository.find();

        
        let returnRawmaterial = await this.rawmaterialinspectionRepository.find({
            relations: ["itemcode2", "cucode2", "cptcode2", "prtcode2"],
            where: {  unitslno: unitslno },
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
                { key: 'F', width: 15.0 },
                { key: 'G', width: 22.0 },
              

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


            worksheet.mergeCells('B1:F2');
            worksheet.getCell('B1:F2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('B1:H2').fgColor = { argb: 'b03600' };
            worksheet.getCell('B1:H2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('B1:F2').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('B3:F4');
        worksheet.getCell('B3:F4').value = "MATERIAL MOVEMENTS ITEM DETAILS";
        worksheet.getCell('B3:F4').fgColor = { argb: '00b050' };

            worksheet.getCell('B3:F4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('B3:F4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('G1');
            worksheet.getCell('G1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('G1').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('G2');
            worksheet.getCell('G2').value = "Issue Date : ";
            worksheet.getCell('G2').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('G3');
            worksheet.getCell('G3').value = "Rev. No. 00	";
            worksheet.getCell('G3').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('G4');
            worksheet.getCell('G4').value = "Rev Date :";
            worksheet.getCell('G4').alignment = { vertical: 'left', horizontal: 'left' };

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
            worksheet.getCell('C5').value = "Issued Quantity";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Issued To";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };

           
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Date";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "Shift";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "Time";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };

            let orderitemarray = [];

            for (let i = 0; i < matmoment.length; i++) {
                if (matmoment[i].itemslno) {
                    orderitemarray.push(matmoment[i])
                }
            }
        
        
            for (let i = 0; i < orderitemarray.length; i++) { 
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = orderitemarray[i].slNo;

           

            worksheet.mergeCells('B' + temp);
            worksheet.getCell('B' + temp).value = orderitemarray[i].itemslno ? returnRawmaterial.find(x => x.slNo === orderitemarray[i].itemslno)?.itemcode2.itemcode : "";

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = orderitemarray[i].qunty;

                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = orderitemarray[i].department;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = orderitemarray[i].date;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = orderitemarray[i].shift;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).value = orderitemarray[i].time;
            }
        return workbook.xlsx.write(response).then(function () {
            response['status'](200).end();
        });    


    }

    // --------------------------Consumable-Excel-------------------------------

    async downloadconsumableExcel(unitslno:any,@Req() request: Request, @Res() response: Response) {

        let matmoment = await this.materialmomentsRepository.find({
            where: { unitslno: unitslno },
        });


        let materialitem = await this.materialreceiveditemRepository.find();

        let returnRawmaterial = await this.rawmaterialinspectionRepository.find({
            relations: ["itemcode2", "cucode2", "cptcode2", "prtcode2"],
            where: {  unitslno: unitslno },
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


        worksheet.mergeCells('B1:F2');
        worksheet.getCell('B1:F2').value = "SRINIVASA ENTERPRISES";
        worksheet.getCell('B1:F2').fgColor = { argb: 'b03600' };
        worksheet.getCell('B1:F2').font = {
            size: 11,
            bold: true
        };
        worksheet.getCell('B1:F2').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('B3:F4');
        worksheet.getCell('B3:F4').value = "MATERIAL MOVEMENTS CONSUMABLE ITEM DETAILS";
        worksheet.getCell('B3:F4').fgColor = { argb: '00b050' };

        worksheet.getCell('B3:F4').font = {
            size: 11,
            bold: true
        };
        worksheet.getCell('B3:F4').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('G1');
        worksheet.getCell('G1').value = "Format No.SE/MTN/R05";
        worksheet.getCell('G1').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('G2');
        worksheet.getCell('G2').value = "Issue Date : ";
        worksheet.getCell('G2').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('G3');
        worksheet.getCell('G3').value = "Rev. No. 00	";
        worksheet.getCell('G3').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('G4');
        worksheet.getCell('G4').value = "Rev Date :";
        worksheet.getCell('G4').alignment = { vertical: 'left', horizontal: 'left' };

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
        worksheet.getCell('C5').value = "Issued Quantity";
        worksheet.getCell('C5').font = {
            size: 11,
            bold: true
        };
        worksheet.mergeCells('D5');
        worksheet.getCell('D5').value = "Issued To";
        worksheet.getCell('D5').font = {
            size: 11,
            bold: true
        };

       
        worksheet.mergeCells('E5');
        worksheet.getCell('E5').value = "Date";
        worksheet.getCell('E5').font = {
            size: 11,
            bold: true
        };
        worksheet.mergeCells('F5');
        worksheet.getCell('F5').value = "Shift";
        worksheet.getCell('F5').font = {
            size: 11,
            bold: true
        };
        worksheet.mergeCells('G5');
        worksheet.getCell('G5').value = "Time";
        worksheet.getCell('G5').font = {
            size: 11,
            bold: true
        };

        let orderitemarray = [];

        for (let i = 0; i < matmoment.length; i++) {
            if (matmoment[i].consumslno) {
                orderitemarray.push(matmoment[i])
            }
        }
      
        for (let i = 0; i < orderitemarray.length; i++) { 
                let temp = i + 6;

            worksheet.mergeCells('A' + temp);
            worksheet.getCell('A' + temp).value = orderitemarray[i].slNo;

  

            worksheet.mergeCells('B' + temp);
            worksheet.getCell('B' + temp).value = orderitemarray[i].consumslno ? returnRawmaterial.find(x => x.slNo === orderitemarray[i].consumslno)?.cucode2.consmno : "";

            worksheet.mergeCells('C' + temp);
            worksheet.getCell('C' + temp).value = orderitemarray[i].cuqunty;

            worksheet.mergeCells('D' + temp);
            worksheet.getCell('D' + temp).value = orderitemarray[i].cudepartment;

            worksheet.mergeCells('E' + temp);
            worksheet.getCell('E' + temp).value = orderitemarray[i].cudate;

            worksheet.mergeCells('F' + temp);
            worksheet.getCell('F' + temp).value = orderitemarray[i].cushift;

            worksheet.mergeCells('G' + temp);
            worksheet.getCell('G' + temp).value = orderitemarray[i].cutime;
            }
            
    return workbook.xlsx.write(response).then(function () {
        response['status'](200).end();
    });    


}


// ------------------------ChildPart-Excel--------------------------

async downloadchildPartExcel(unitslno:any,@Req() request: Request, @Res() response: Response) {

        let matmoment = await this.materialmomentsRepository.find({
            where: { unitslno: unitslno },
        });

        let childpart = await this.childPartRepository.find();
        let materialitem = await this.materialreceiveditemRepository.find();

        let returnRawmaterial = await this.rawmaterialinspectionRepository.find({
            relations: ["itemcode2", "cucode2", "cptcode2", "prtcode2"],
            where: {  unitslno: unitslno },
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


    worksheet.mergeCells('B1:F2');
    worksheet.getCell('B1:F2').value = "SRINIVASA ENTERPRISES";
    worksheet.getCell('B1:F2').fgColor = { argb: 'b03600' };
    worksheet.getCell('B1:F2').font = {
        size: 11,
        bold: true
    };
    worksheet.getCell('B1:F2').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('B3:F4');
        worksheet.getCell('B3:F4').value = "MATERIAL MOVEMENTS CHILD PART DETAILS";
        worksheet.getCell('B3:F4').fgColor = { argb: '00b050' };

    worksheet.getCell('B3:F4').font = {
        size: 11,
        bold: true
    };
    worksheet.getCell('B3:F4').alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('G1');
    worksheet.getCell('G1').value = "Format No.SE/MTN/R05";
    worksheet.getCell('G1').alignment = { vertical: 'left', horizontal: 'left' };
    worksheet.mergeCells('G2');
    worksheet.getCell('G2').value = "Issue Date : ";
    worksheet.getCell('G2').alignment = { vertical: 'left', horizontal: 'left' };
    worksheet.mergeCells('G3');
    worksheet.getCell('G3').value = "Rev. No. 00	";
    worksheet.getCell('G3').alignment = { vertical: 'left', horizontal: 'left' };
    worksheet.mergeCells('G4');
    worksheet.getCell('G4').value = "Rev Date :";
    worksheet.getCell('G4').alignment = { vertical: 'left', horizontal: 'left' };

    worksheet.mergeCells('A5');
            worksheet.getCell('A5').value = "Sl. No";
            worksheet.getCell('A5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('B5');
            worksheet.getCell('B5').value = "Child Part Code";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Issued Quantity";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Issued To";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };

           
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Date";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "Shift";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "Time";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };

            
            let orderitemarray = [];

            for (let i = 0; i < matmoment.length; i++) {
                if (matmoment[i].childslno) {
                    orderitemarray.push(matmoment[i])
                }
            }
          
            for (let i = 0; i < orderitemarray.length; i++) { 
                    let temp = i + 6;

                    worksheet.mergeCells('A' + temp);
                    worksheet.getCell('A' + temp).value = orderitemarray[i].slNo;


            worksheet.mergeCells('B' + temp);
            worksheet.getCell('B' + temp).value = orderitemarray[i].childslno ? returnRawmaterial.find(x => x.slNo === orderitemarray[i].childslno)?.cptcode2.cpartno : "";

            worksheet.mergeCells('C' + temp);
            worksheet.getCell('C' + temp).value = orderitemarray[i].cptqunty;

            worksheet.mergeCells('D' + temp);
            worksheet.getCell('D' + temp).value = orderitemarray[i].cptdepartment;

            worksheet.mergeCells('E' + temp);
            worksheet.getCell('E' + temp).value = orderitemarray[i].cptdate;

            worksheet.mergeCells('F' + temp);
            worksheet.getCell('F' + temp).value = orderitemarray[i].cptshift;

            worksheet.mergeCells('G' + temp);
            worksheet.getCell('G' + temp).value = orderitemarray[i].cpttime;
        }

        return workbook.xlsx.write(response).then(function () {
            response['status'](200).end();
        });


}

// -----------------------------Part-Excel----------------------

    async downloadPartExcel(unitslno: any, @Req() request: Request, @Res() response: Response) {

        let matmoment = await this.materialmomentsRepository.find({
            where: { unitslno: unitslno },
        });

       
        let returnRawmaterial = await this.rawmaterialinspectionRepository.find({
            relations: ["itemcode2", "cucode2", "cptcode2", "prtcode2"],
            where: {  unitslno: unitslno },
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
        { key: 'F', width: 15.0 },
        { key: 'G', width: 15.0 },      

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


    worksheet.mergeCells('B1:F2');
    worksheet.getCell('B1:F2').value = "SRINIVASA ENTERPRISES";
    worksheet.getCell('B1:F2').fgColor = { argb: 'b03600' };
    worksheet.getCell('B1:F2').font = {
        size: 11,
        bold: true
    };
    worksheet.getCell('B1:F2').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('B3:F4');
        worksheet.getCell('B3:F4').value = "MATERIAL MOVEMENTS PART DETAILS";
        worksheet.getCell('B3:F4').fgColor = { argb: '00b050' };

    worksheet.getCell('B3:F4').font = {
        size: 11,
        bold: true
    };
    worksheet.getCell('B3:F4').alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('G1');
    worksheet.getCell('G1').value = "Format No.SE/MTN/R05";
    worksheet.getCell('G1').alignment = { vertical: 'left', horizontal: 'left' };
    worksheet.mergeCells('G2');
    worksheet.getCell('G2').value = "Issue Date : ";
    worksheet.getCell('G2').alignment = { vertical: 'left', horizontal: 'left' };
    worksheet.mergeCells('G3');
    worksheet.getCell('G3').value = "Rev. No. 00	";
    worksheet.getCell('G3').alignment = { vertical: 'left', horizontal: 'left' };
    worksheet.mergeCells('G4');
    worksheet.getCell('G4').value = "Rev Date :";
    worksheet.getCell('G4').alignment = { vertical: 'left', horizontal: 'left' };

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
            worksheet.getCell('C5').value = "Issued Quantity";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Issued To";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };

           
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Date";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "Shift";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "Time";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };

            let orderitemarray = [];

            for (let i = 0; i < matmoment.length; i++) {
                if (matmoment[i].prtslno) {
                    orderitemarray.push(matmoment[i])
                }
            }

          
            for (let i = 0; i < orderitemarray.length; i++) { 

                    let temp = i + 6;

                    worksheet.mergeCells('A' + temp);
                    worksheet.getCell('A' + temp).value = orderitemarray[i].slNo;

            worksheet.mergeCells('B' + temp);
            worksheet.getCell('B' + temp).value = orderitemarray[i].prtslno ? returnRawmaterial.find(x => x.slNo === orderitemarray[i].prtslno)?.prtcode2.partno : "";

            worksheet.mergeCells('C' + temp);
            worksheet.getCell('C' + temp).value = orderitemarray[i].prtqunty;

            worksheet.mergeCells('D' + temp);
            worksheet.getCell('D' + temp).value = orderitemarray[i].prtdepartment;

            worksheet.mergeCells('E' + temp);
            worksheet.getCell('E' + temp).value = orderitemarray[i].prtdate;

            worksheet.mergeCells('F' + temp);
            worksheet.getCell('F' + temp).value = orderitemarray[i].prtshift;

            worksheet.mergeCells('G' + temp);
            worksheet.getCell('G' + temp).value = orderitemarray[i].prttime;

        }
        return workbook.xlsx.write(response).then(function () {
            response['status'](200).end();
        });


}
}