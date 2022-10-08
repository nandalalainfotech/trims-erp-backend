import { HttpException, HttpStatus, Injectable, Req, Res } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
import { Between } from 'typeorm';
import { createReadStream } from "fs";
import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { OrderItemMbDTO } from "src/dto/orderitems.dto";
import { getManager } from 'typeorm';
import { Orderitemspecification001wb } from "src/entity/Orderitemspecification001wb";

var path = require('path');
var fs = require('fs');
const excel = require('exceljs');
var pdf = require('dynamic-html-pdf');

@Injectable()
export class OrderItemMbService {
    constructor(
        @InjectConnection() private readonly connection: Connection,
        @InjectRepository(Orderitem001mb) private readonly orderItemsRepository: Repository<Orderitem001mb>,
        @InjectRepository(Orderitemspecification001wb) private readonly orderitemspecificationRepository: Repository<Orderitemspecification001wb>) {

    }
    async findAll(unitslno:any): Promise<Orderitem001mb[]> {
        return await this.orderItemsRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno},relations:['orderitemspecification001wbs']});
    }
    async create(orderItemMbDTO: OrderItemMbDTO): Promise<Orderitem001mb> {
        let orderitemspecification001wbs: Orderitemspecification001wb[] = [];
        for (let i = 0; i < orderItemMbDTO.Orderitemspecification.length; i++) {
            const orderitemspecification001wb = new Orderitemspecification001wb();

            orderitemspecification001wb.itemslno2 = orderItemMbDTO.Orderitemspecification[i].itemslno2;
            orderitemspecification001wb.parameter = orderItemMbDTO.Orderitemspecification[i].parameter;
            orderitemspecification001wb.specification = orderItemMbDTO.Orderitemspecification[i].specification;
            orderitemspecification001wb.inspecmethod = orderItemMbDTO.Orderitemspecification[i].inspecmethod;
            orderitemspecification001wb.unitslno = orderItemMbDTO.unitslno;
             orderitemspecification001wb.insertUser = orderItemMbDTO.insertUser;orderitemspecification001wb.insertUser = orderItemMbDTO.insertUser;
            orderitemspecification001wb.insertDatetime = orderItemMbDTO.insertDatetime;
            let supcontact = await this.orderitemspecificationRepository.save(orderitemspecification001wb);
            orderitemspecification001wbs.push(supcontact);
        }
        if (orderitemspecification001wbs.length > 0) {
            const orderitem001mb = new Orderitem001mb();
            orderitem001mb.setProperties(orderItemMbDTO);
            orderitem001mb.orderitemspecification001wbs = orderitemspecification001wbs;
            await this.orderItemsRepository.save(orderitem001mb);
            return orderitem001mb;
        }else{
            throw new HttpException('Please Add Specification Details', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(orderItemMbDTO: OrderItemMbDTO): Promise<Orderitem001mb> {
        const orderitem001mb = new Orderitem001mb();
        orderitem001mb.setProperties(orderItemMbDTO);
        await this.orderItemsRepository.update({ slNo: orderitem001mb.slNo }, orderitem001mb);
        return orderitem001mb;
    }

   
    async getCount(): Promise<string> {
        const entityManager = getManager();
        // let result = await getManager().query('select CONCAT("IC",RIGHT(CONCAT("0000", count(*)), 4)) as row from orderitem001mb',['row']);
        let result = await getManager().query('select count(*) as row from orderitem001mb',['row']);
        var string=JSON.stringify(result);
        return string;
    }


    
  findOne(id: number): Promise<Orderitem001mb> {
    return this.orderItemsRepository.findOne({
      relations: ["orderitemspecification001wbs"],
      where: { slNo: id },
    });
  }
    
    async remove(slNo: number): Promise<void> {
        await this.orderItemsRepository.delete(slNo);
    }

    async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {

        let item = await this.orderItemsRepository.find({where:{unitslno:unitslno}});

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
        let item = await this.orderItemsRepository.find({where:{unitslno:unitslno}});


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
                { key: 'A', width: 15.0 },
                { key: 'B', width: 15.0 },
                { key: 'C', width: 15.0 },
                { key: 'D', width: 18.0 },
                { key: 'E', width: 15.0 },
                { key: 'F', width: 15.0 },
                { key: 'G', width: 15.0 },
                { key: 'H', width: 15.0 },
                { key: 'I', width: 15.0 },
                { key: 'J', width: 15.0 },
                { key: 'K', width: 15.0 },
                { key: 'L', width: 15.0 },
                { key: 'M', width: 22.0 },
              

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


            worksheet.mergeCells('B1:L2');
            worksheet.getCell('B1:L2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('B1:L2').fgColor = { argb: 'b03600' };
            worksheet.getCell('B1:L2').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('B1:L2').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('B3:L4');
            worksheet.getCell('B3:L4').value = "ITEM DETAILS";
            worksheet.getCell('B3:L4').fgColor = { argb: '00b050' };

            worksheet.getCell('B3:L4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('B3:L4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('M1');
            worksheet.getCell('M1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('M1').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('M2');
            worksheet.getCell('M2').value = "Issue Date : ";
            worksheet.getCell('M2').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('M3');
            worksheet.getCell('M3').value = "Rev. No. 00	";
            worksheet.getCell('M3').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('M4');
            worksheet.getCell('M4').value = "Rev Date :";
            worksheet.getCell('M4').alignment = { vertical: 'left', horizontal: 'left' };

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
            worksheet.getCell('E5').value = "UOM";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "Quantity";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "GST";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('H5');
            worksheet.getCell('H5').value = "Unit Rate";
            worksheet.getCell('H5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('I5');
            worksheet.getCell('I5').value = "HSN/SAC";
            worksheet.getCell('I5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('J5');
            worksheet.getCell('J5').value = "Location";
            worksheet.getCell('J5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('K5');
            worksheet.getCell('K5').value = "M.S.Level";
            worksheet.getCell('K5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('L5');
            worksheet.getCell('L5').value = "Re-Oreder Level";
            worksheet.getCell('L5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('M5');
            worksheet.getCell('M5').value = "Lead Time";
            worksheet.getCell('M5').font = {
                size: 11,
                bold: true
            };
           




            for (let i = 0; i < item.length; i++) {
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = item[i].itemcode;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = item[i].itemname;

                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = item[i].descrip;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = item[i].uom;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = item[i].qunty;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).value = item[i].gst;

                worksheet.mergeCells('H' + temp);
                worksheet.getCell('H' + temp).value = item[i].unitamount;

                worksheet.mergeCells('I' + temp);
                worksheet.getCell('I' + temp).value = item[i].hsn;

                worksheet.mergeCells('J' + temp);
                worksheet.getCell('J' + temp).value = item[i].location;

                worksheet.mergeCells('K' + temp);
                worksheet.getCell('K' + temp).value = item[i].mslevel;

                worksheet.mergeCells('L' + temp);
                worksheet.getCell('L' + temp).value = item[i].orderlevel;

                worksheet.mergeCells('M' + temp);
                worksheet.getCell('M' + temp).value = item[i].leadtime;

                




            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }

    }


}