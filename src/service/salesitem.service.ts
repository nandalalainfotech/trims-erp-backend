import { Injectable, Req, Res } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
import { Between } from 'typeorm';
import { createReadStream } from "fs";
import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { OrderItemMbDTO } from "src/dto/orderitems.dto";
import { getManager } from 'typeorm';
import { SalesItemMbDTO } from "src/dto/SalesItem.dto";
import { Salesitem001mb } from "src/entity/Salesitem001mb";

var path = require('path');
var fs = require('fs');
const excel = require('exceljs');
var pdf = require('dynamic-html-pdf');

@Injectable()
export class SalesItemMbService {
    constructor(
        @InjectConnection() private readonly connection: Connection,
        @InjectRepository(Salesitem001mb) private readonly salesItemRepository: Repository<Salesitem001mb>) {



    }
    async create(salesItemMbDTO: SalesItemMbDTO): Promise<Salesitem001mb> {
        const salesitem001mb = new Salesitem001mb();
        salesitem001mb.setProperties(salesItemMbDTO);
        return this.salesItemRepository.save(salesitem001mb);
    }
    async update(salesItemMbDTO: SalesItemMbDTO): Promise<Salesitem001mb> {
        const salesitem001mb = new Salesitem001mb();
        salesitem001mb.setProperties(salesItemMbDTO);
        await this.salesItemRepository.update({ slNo: salesitem001mb.slNo }, salesitem001mb);
        return salesitem001mb;
    }

    async findAll(unitslno:any): Promise<Salesitem001mb[]> {
        return await this.salesItemRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno}});
    }
    async getCount(): Promise<string> {
        const entityManager = getManager();
        let result = await getManager().query('select count(*) as row from salesitem001mb',['row']);
        var string=JSON.stringify(result);
        return string;
    }


    findOne(custemerSlno: number): Promise<Salesitem001mb> {
        return this.salesItemRepository.findOne(custemerSlno);
    }

    
    async remove(slNo: number): Promise<void> {
        await this.salesItemRepository.delete(slNo);
    }

    async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {

        let item = await this.salesItemRepository.find({where:{unitslno:unitslno}});

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('item.html', 'utf8');



        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {



                itemcheck: item
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
        // let prodDTOs: ProdDTO[] = [];
        let item = await this.salesItemRepository.find({where:{unitslno:unitslno}});


        if (item.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Item_Details_report'); // creating worksheet
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
                { key: 'A', width: 30.0 },
                { key: 'B', width: 30.0 },
                { key: 'C', width: 35.0 },
                { key: 'D', width: 35.0 },
                { key: 'E', width: 30.0 },
                { key: 'F', width: 30.0 },
                { key: 'G', width: 35.0 },
                { key: 'H', width: 35.0 },

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


            worksheet.mergeCells('B1:G2');
            worksheet.getCell('B1:G2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('B1:G2').fgColor = { argb: 'b03600' };
            worksheet.getCell('B1:G2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('B1:G2').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('B3:G4');
            worksheet.getCell('B3:G4').value = "ITEM DETAILS";
            worksheet.getCell('B3:G4').fgColor = { argb: '00b050' };

            worksheet.getCell('B3:G4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('B3:G4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('H1:H1');
            worksheet.getCell('H1:H1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('H1:H1').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('H2:H2');
            worksheet.getCell('H2:H2').value = "Issue Date : 01.02.2019";
            worksheet.getCell('H2:H2').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('H3:H3');
            worksheet.getCell('H3:H3').value = "Rev. No. 00	";
            worksheet.getCell('H3:H3').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('H4:H4');
            worksheet.getCell('H4:H4').value = "Rev Date :";
            worksheet.getCell('H4:H4').alignment = { vertical: 'left', horizontal: 'left' };

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
            worksheet.getCell('D5').value = "Description";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Supplier Name";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "Lead Time";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "Min Stock";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('H5');
            worksheet.getCell('H5').value = "Recorder Level";
            worksheet.getCell('H5').font = {
                size: 11,
                bold: true
            };




            for (let i = 0; i < item.length; i++) {
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = item[i].procode;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = item[i].proname;

                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = item[i].prodescrip;



            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }

    }


}