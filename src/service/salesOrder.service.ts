import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SalesOrderDTO } from "src/dto/salesOrder.dto";
import { Salesorder001wb } from "src/entity/Salesorder001wb";
import { Response } from "express";
import { createReadStream } from "fs";
import { PurchaseorderDTO } from "src/dto/Purchaseorder.dto";
import { SupplierQuotationDTO } from "src/dto/supplierquotation.dto";
import { Request } from "supertest";
import { Repository } from "typeorm";
import { Between } from 'typeorm';

var path = require('path');
const excel = require('exceljs');
var fs = require('fs');
var pdf = require('dynamic-html-pdf');




var path = require('path');
var converter = require('number-to-words');

@Injectable()


export class SalesOrderService {

    constructor(
        @InjectRepository(Salesorder001wb) private readonly SalesRepository: Repository<Salesorder001wb>) {

    }

    async create(salesOrderDTO: SalesOrderDTO): Promise<Salesorder001wb> {
        const salesorder001wb = new Salesorder001wb();
        salesorder001wb.setProperties(salesOrderDTO);
        return this.SalesRepository.save(salesorder001wb);
    }

    async update(salesOrderDTO: SalesOrderDTO): Promise<Salesorder001wb> {
        const salesorder001wb = new Salesorder001wb();
        salesorder001wb.setProperties(salesOrderDTO);
        await this.SalesRepository.update({ slNo: salesorder001wb.slNo }, salesorder001wb);
        return salesorder001wb;
    }

    async findAll(unitslno:any): Promise<Salesorder001wb[]> {
        return await this.SalesRepository.find({order: { slNo: "DESC" }, where:{unitslno:unitslno} });
    }

    findOne(id: number): Promise<Salesorder001wb> {
        return this.SalesRepository.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.SalesRepository.delete(id);
    }







    async downloadPdf(@Req() request: Request, @Res() response: Response) {
       

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('salesOrder.html', 'utf8');


        pdf.registerHelper('ifCond', function (v1, v2, options) {
            if (v1 === v2) {
                console.log("v1-->", v1);        
                return options.fn(this);
            }
            return options.inverse(this);
        })

        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var users = [
            {
                name: 'aaa',
                age: 24,
                dob: '1/1/1991'
            },
            {
                name: 'bbb',
                age: 25,
                dob: '1/1/1995'
            },
            {
                name: 'ccc',
                age: 24,
                dob: '1/1/1994'
            }
        ];

        var document = {
            type: 'file',
            template: html,
            context: {
             
               users: users
            },
            path: "./pdf/salesOrder.pdf"
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "salesOrder.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };
    }

    async downloadExcel(@Req() request: Request, @Res() response: Response) {
        let saleOrders = await this.SalesRepository.find({
            // relations: ["porderSlno2", "porderSlno2.suppquotSlno2", "porderSlno2.companySlno2", "porderSlno2.consigneeSlno2"],
            order: {
                porderSlno: 'ASC'

            }
        });

        let SalesOrderDTOs: SalesOrderDTO[] = [];
        let totalcost: number = 0;
        let totals: string = "";
        let slNoTemp = 0;
        for (let saleOrder of saleOrders) {
            if (SalesOrderDTOs.length > 0 && saleOrder.porderSlno == slNoTemp) {
                let flag: boolean = false;
                for (let temp of SalesOrderDTOs) {
                    if (saleOrder.porderSlno == slNoTemp && temp.porderSlno == slNoTemp) {

                        let purchaseorderDTO = new PurchaseorderDTO();
                        // purchaseorderDTO.setProperties(saleOrder.porderSlno2);
                        // purchaseorderDTO.hsn = saleOrder.porderSlno2.hsn;
                        // purchaseorderDTO.partNo = saleOrder.porderSlno2.partNo;
                        // purchaseorderDTO.amount = saleOrder.porderSlno2.amount;
                        // purchaseorderDTO.description = saleOrder.porderSlno2.suppquotSlno2.description;
                        // purchaseorderDTO.quantity = saleOrder.porderSlno2.suppquotSlno2.quantity;
                        // purchaseorderDTO.price = saleOrder.porderSlno2.suppquotSlno2.price;
                        // temp.supplierFrom = saleOrder.porderSlno2.supplierFrom;
                        // temp.company = saleOrder.porderSlno2.companySlno2.company;
                        // temp.consignee = saleOrder.porderSlno2.consigneeSlno2.consignee;



                        // totalcost = totalcost + saleOrder.porderSlno2.amount;
                        temp.total = totalcost;


                        totals = converter.toWords(totalcost);
                        temp.word = totals


                        const newPurReq = [...temp.porder, purchaseorderDTO];
                        temp.porder = newPurReq;
                        slNoTemp = saleOrder.porderSlno;


                        flag = true;
                        break;


                    }
                }
                if (!flag) {

                    totalcost = 0;
                    totals = "";
                    let salesOrderDTO = new SalesOrderDTO();
                    salesOrderDTO.porder = [];
                    salesOrderDTO.setProperties(saleOrder);
                    // salesOrderDTO.supplierFrom = saleOrder.porderSlno2.supplierFrom;
                    // salesOrderDTO.porderSlno = saleOrder.porderSlno;

                    // let purchaseorderDTO = new PurchaseorderDTO();
                    // purchaseorderDTO.setProperties(saleOrder.porderSlno2);
                    // purchaseorderDTO.amount = saleOrder.porderSlno2.amount;
                    // purchaseorderDTO.hsn = saleOrder.porderSlno2.hsn;
                    // purchaseorderDTO.partNo = saleOrder.porderSlno2.partNo;
                    // purchaseorderDTO.description = saleOrder.porderSlno2.suppquotSlno2.description;
                    // purchaseorderDTO.quantity = saleOrder.porderSlno2.suppquotSlno2.quantity;
                    // purchaseorderDTO.price = saleOrder.porderSlno2.suppquotSlno2.price;




                    // totalcost = totalcost + saleOrder.porderSlno2.amount;
                    salesOrderDTO.total = totalcost;

                    totals = converter.toWords(totalcost);
                    salesOrderDTO.word = totals

                    // const newSuppQuot = [...salesOrderDTO.porder, purchaseorderDTO];
                    // salesOrderDTO.porder = newSuppQuot;

                }
            } else {

                let salesOrderDTO = new SalesOrderDTO();
                salesOrderDTO.porder = [];
                salesOrderDTO.setProperties(saleOrder);
                // salesOrderDTO.supplierFrom = saleOrder.porderSlno2.supplierFrom;
                salesOrderDTO.porderSlno = saleOrder.porderSlno;



                let purchaseorderDTO = new PurchaseorderDTO();
                // purchaseorderDTO.setProperties(saleOrder.porderSlno2);
                // purchaseorderDTO.amount = saleOrder.porderSlno2.amount;
                // purchaseorderDTO.hsn = saleOrder.porderSlno2.hsn;
                // purchaseorderDTO.partNo = saleOrder.porderSlno2.partNo;
                // purchaseorderDTO.description = saleOrder.porderSlno2.suppquotSlno2.description;
                // purchaseorderDTO.quantity = saleOrder.porderSlno2.suppquotSlno2.quantity;
                // purchaseorderDTO.price = saleOrder.porderSlno2.suppquotSlno2.price;



                // totalcost = totalcost + saleOrder.porderSlno2.amount;
                salesOrderDTO.total = totalcost;

                totals = converter.toWords(totalcost);
                salesOrderDTO.word = totals
                slNoTemp = saleOrder.porderSlno;

                const newSuppQuot = [...salesOrderDTO.porder, purchaseorderDTO];
                salesOrderDTO.porder = newSuppQuot;
                SalesOrderDTOs.push(salesOrderDTO);
            }

        }


        let workbook = new excel.Workbook();
        for (let i = 0; i < SalesOrderDTOs.length; i++) {
            let worksheet = workbook.addWorksheet('Sales Invoice' + i);
            worksheet.pageSetup.printArea = 'A1:AN28';
            worksheet.columns = [{ key: 'A', width: 10.0 }, { key: 'B', width: 15.0 }, { key: 'C', width: 15.0 }, { key: 'D', width: 15.0 }, { key: 'E', width: 15.0 }, { key: 'F', width: 15.0 }, { key: 'G', width: 15.0 }, { key: 'H', width: 15.0 }];
            worksheet.columns.forEach((col) => {
                // col.style.font = { name: 'Comic Sans MS' };
                col.style.font = {
                    // name: 'Comic Sans MS',
                    // family: 4,
                    size: 7,
                    // underline: true,
                    bold: true,
                    alignment: { wrapText: true }
                };
                col.style.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                col.style.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            })


            worksheet.getRow(1).height = 80;
            worksheet.getRow(2).height = 80;
            worksheet.getRow(3).height = 80;
            worksheet.getRow(4).height = 80;
            worksheet.getRow(5).height = 80;
            worksheet.getRow(6).height = 80;
            worksheet.getRow(7).height = 80;
            worksheet.getRow(8).height = 80;
            worksheet.getRow(9).height = 80;

            worksheet.mergeCells('A1:H1');
            worksheet.getCell('A1:H1').value = "SALES INVOICE";
            worksheet.getCell('A1:H1').font = {
                size: 18,
                bold: true
            };

            worksheet.mergeCells('A2:D4');
            worksheet.getCell('A2:D4').font = {
                size: 10,
                bold: true
            };
            worksheet.getCell('A2:D4').value = {
                'richText': [
                    { 'text': 'Invoice To \n ' },
                    { 'text': SalesOrderDTOs[i].supplierFrom },

                ]
            };

            worksheet.mergeCells('E2:F2');
            worksheet.getCell('E2:F2').font = {
                size: 12,
                bold: true
            };
            worksheet.getCell('E2:F2').value = {
                'richText': [
                    { 'text': 'Voucher No: \n ' },
                    { 'text': SalesOrderDTOs[i].invoiceNo },

                ]
            };

            worksheet.mergeCells('G2:H2');
            worksheet.getCell('G2:H2').font = {
                size: 12,
                bold: true
            };
            worksheet.getCell('G2:H2').value = {
                'richText': [
                    { 'text': 'Dated: \n ' },
                    { 'text': SalesOrderDTOs[i].date },

                ]
            };

            worksheet.mergeCells('E3:F3');
            worksheet.getCell('E3:F3').font = {
                size: 12,
                bold: true
            };
            worksheet.getCell('E3:F3').value = {
                'richText': [
                    { 'text': 'Delivery Note \n ' },
                    { 'text': SalesOrderDTOs[i].deliveryNote },

                ]
            };

            worksheet.mergeCells('G3:H3');
            worksheet.getCell('G3:H3').font = {
                size: 12,
                bold: true
            };
            worksheet.getCell('G3:H3').value = {
                'richText': [
                    { 'text': 'Terms Of Payment: \n ' },
                    { 'text': SalesOrderDTOs[i].modePay },

                ]
            };

            worksheet.mergeCells('E4:F4');
            worksheet.getCell('E4:F4').font = {
                size: 12,
                bold: true
            };
            worksheet.getCell('E4:F4').value = {
                'richText': [
                    { 'text': 'Reference No. and Date: \n ' },
                    { 'text': SalesOrderDTOs[i].refNoDate },

                ]
            };

            worksheet.mergeCells('G4:H4');
            worksheet.getCell('G4:H4').font = {
                size: 12,
                bold: true
            };
            worksheet.getCell('G4:H4').value = {
                'richText': [
                    { 'text': 'Other References: \n ' },
                    { 'text': SalesOrderDTOs[i].otherRef },

                ]
            };


            worksheet.mergeCells('A5:D8');
            worksheet.getCell('A5:D8').font = {
                size: 10,
                bold: true
            };
            worksheet.getCell('A5:D8').value = {
                'richText': [
                    { 'text': 'Consignee (Ship To): \n ' },
                    { 'text': SalesOrderDTOs[i].consignee },

                ]
            };

            worksheet.mergeCells('E5:F5');
            worksheet.getCell('E5:F5').font = {
                size: 12,
                bold: true
            };
            worksheet.getCell('E5:F5').value = {
                'richText': [
                    { 'text': 'Buyer’s Order No. \n ' },
                    { 'text': SalesOrderDTOs[i].buyerOrderNo },

                ]
            };

            worksheet.mergeCells('G5:H5');
            worksheet.getCell('G5:H5').font = {
                size: 12,
                bold: true
            };
            worksheet.getCell('G5:H5').value = {
                'richText': [
                    { 'text': 'Dated \n ' },
                    { 'text': SalesOrderDTOs[i].buyerDate },

                ]
            };

            worksheet.mergeCells('E6:F6');
            worksheet.getCell('E6:F6').font = {
                size: 12,
                bold: true
            };
            worksheet.getCell('E6:F6').value = {
                'richText': [
                    { 'text': 'Dispatch Doc No. \n ' },
                    { 'text': SalesOrderDTOs[i].dispatchDocNo },

                ]
            };

            worksheet.mergeCells('G6:H6');
            worksheet.getCell('G6:H6').font = {
                size: 12,
                bold: true
            };
            worksheet.getCell('G6:H6').value = {
                'richText': [
                    { 'text': 'Delivery Note Date \n ' },
                    { 'text': SalesOrderDTOs[i].deliveryNote },

                ]
            };

            worksheet.mergeCells('E7:F7');
            worksheet.getCell('E7:F7').font = {
                size: 12,
                bold: true
            };
            worksheet.getCell('E7:F7').value = {
                'richText': [
                    { 'text': 'Dispatch Through: \n ' },
                    { 'text': SalesOrderDTOs[i].dispatchThrough },

                ]
            };

            worksheet.mergeCells('G7:H7');
            worksheet.getCell('G7:H7').font = {
                size: 12,
                bold: true
            };
            worksheet.getCell('G7:H7').value = {
                'richText': [
                    { 'text': 'Destination: \n ' },
                    { 'text': SalesOrderDTOs[i].destination },

                ]
            };


            worksheet.mergeCells('E8:F8');
            worksheet.getCell('E8:F8').font = {
                size: 12,
                bold: true
            };
            worksheet.getCell('E8:F8').value = {
                'richText': [
                    { 'text': 'Bill of Lading/LR-RR No. \n ' },
                    { 'text': SalesOrderDTOs[i].billOfLading },

                ]
            };

            worksheet.mergeCells('G8:H8');
            worksheet.getCell('G8:H8').font = {
                size: 12,
                bold: true
            };
            worksheet.getCell('G8:H8').value = {
                'richText': [
                    { 'text': 'Motor Vehicle No. \n ' },
                    { 'text': SalesOrderDTOs[i].motorvehicleNo },
                ]
            };

            worksheet.mergeCells('E9:H9');
            worksheet.getCell('E9:H9').font = {
                size: 12,
                bold: true
            };
            worksheet.getCell('E9:H9').value = {
                'richText': [
                    { 'text': 'Terms of Delivery: \n ' },
                    { 'text': SalesOrderDTOs[i].termsDelivery },

                ]
            };

            worksheet.mergeCells('A9:D9');
            worksheet.getCell('A9:D9').font = {
                size: 12,
                bold: true
            };
            worksheet.getCell('A9:D9').value = {
                'richText': [
                    { 'text': 'Buyers From: \n ' },
                    { 'text': SalesOrderDTOs[i].company },

                ]
            };

            worksheet.mergeCells('A10');
            worksheet.getCell('A10').value = "Sl No";
            worksheet.getCell('A10').font = {
                size: 13,
                bold: true
            };

            worksheet.mergeCells('B10');
            worksheet.getCell('B10').value = "Description of Goods";
            worksheet.getCell('B10').font = {
                size: 13,
                bold: true
            };

            worksheet.mergeCells('C10');
            worksheet.getCell('C10').value = "HSN/SAC";
            worksheet.getCell('C10').font = {
                size: 13,
                bold: true
            };

            worksheet.mergeCells('D10');
            worksheet.getCell('D10').value = "Part No";
            worksheet.getCell('D10').font = {
                size: 13,
                bold: true
            };

            worksheet.mergeCells('E10');
            worksheet.getCell('E10').value = "Quantity";
            worksheet.getCell('E10').font = {
                size: 13,
                bold: true
            };

            worksheet.mergeCells('F10');
            worksheet.getCell('F10').value = "Rate";
            worksheet.getCell('F10').font = {
                size: 13,
                bold: true
            };

            worksheet.mergeCells('G10:H10');
            worksheet.getCell('G10:H10').value = "Amount";
            worksheet.getCell('G10:H10').font = {
                size: 13,
                bold: true
            };

            for (let j = 0; j < SalesOrderDTOs[i].porder.length; j++) {

                let temp = j + 11;
                const row = worksheet.getRow(temp);
                row.height = 70;
                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = SalesOrderDTOs[i].porder[j].slNo;
                worksheet.getCell('A' + temp).font = {
                    size: 12,
                    bold: true
                };
                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = SalesOrderDTOs[i].porder[j].description;
                worksheet.getCell('B' + temp).font = {
                    size: 12,
                    bold: true
                };

                worksheet.mergeCells('C' + temp);
                // worksheet.getCell('C' + temp).value = SalesOrderDTOs[i].porder[j].hsn;
                worksheet.getCell('C' + temp).font = {
                    size: 12,
                    bold: true
                };

                // worksheet.mergeCells('D' + temp);
                // worksheet.getCell('D' + temp).value = SalesOrderDTOs[i].porder[j].partNo;
                // worksheet.getCell('D' + temp).font = {
                //     size: 12,
                //     bold: true
                // };

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = SalesOrderDTOs[i].porder[j].quantity;
                worksheet.getCell('E' + temp).font = {
                    size: 12,
                    bold: true
                };

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = SalesOrderDTOs[i].porder[j].price;
                worksheet.getCell('F' + temp).font = {
                    size: 12,
                    bold: true
                };

                // worksheet.mergeCells(temp, 7, temp, 8);
                // worksheet.getCell(temp, 7, temp, 8).value = SalesOrderDTOs[i].porder[j].amount;
                // worksheet.getCell(temp, 7, temp, 8).font = {
                //     size: 12,
                //     bold: true
                // };
            }

            let last = (SalesOrderDTOs[i].porder.length + 11);

            worksheet.getRow(last).height = 50;
            worksheet.mergeCells(last, 1, last, 6);
            worksheet.getCell(last, 1, last, 6).value = "Total Cost";
            worksheet.getCell(last, 1, last, 6).alignment = { vertical: 'center', horizontal: 'center' };
            worksheet.getCell(last, 1, last, 6).font = {
                size: 12,
                bold: true
            };

            worksheet.mergeCells(last, 7, last, 8);
            worksheet.getCell(last, 7, last, 8).value = SalesOrderDTOs[i].total;
            worksheet.getCell(last, 7, last, 8).font = {
                size: 12,
                bold: true
            };

            let totalwords = (last + 1);
            worksheet.getRow(totalwords).height = 50;
            worksheet.mergeCells(totalwords, 1, totalwords, 8);
            worksheet.getCell(totalwords, 1, totalwords, 8).value = "Amount Chargable ( In Words )";
            worksheet.getCell(totalwords, 1, totalwords, 8).alignment = { vertical: 'center', horizontal: 'center' };
            worksheet.getCell(totalwords, 1, totalwords, 8).font = {
                size: 12,
                bold: true
            };

            worksheet.getCell(totalwords, 1, totalwords, 8).value = {
                'richText': [
                    { 'font': { 'transform': 'capitalize' }, 'text': 'Amount Chargable ( In Words ): \n ' },
                    { 'text': SalesOrderDTOs[i].word },

                ]
            };
        }
        return workbook.xlsx.write(response).then(function () {
            response['status'](200).end();
        });
    }
}