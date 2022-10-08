import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerDTO } from "src/dto/Customer.dto";
import { Customer001mb } from "src/entity/Customer001mb";
import { Repository } from "typeorm";
import { createReadStream } from "fs";
import { Response } from "express";
import { Request } from "supertest";


var path = require('path');
var fs = require('fs');
const excel = require('exceljs');
var pdf = require('dynamic-html-pdf');


@Injectable()
export class CustomerService {
    constructor(@InjectRepository(Customer001mb) private readonly customerRepository: Repository<Customer001mb>) { }
    async create(customerDTO: CustomerDTO): Promise<Customer001mb> {
        const customer001mb = new Customer001mb();
        customer001mb.setProperties(customerDTO);
        return this.customerRepository.save(customer001mb);
    }
    async update(customerDTO: CustomerDTO): Promise<Customer001mb> {
        const customer001mb = new Customer001mb();
        customer001mb.setProperties(customerDTO);
        await this.customerRepository.update({ slNo: customer001mb.slNo }, customer001mb);
        return customer001mb;
    }

    async findAll(): Promise<Customer001mb[]> {
        return await this.customerRepository.find({order: { slNo: "DESC" },});
    }

    findOne(id: number): Promise<Customer001mb> {
        return this.customerRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.customerRepository.delete(slNo);
    }



    async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {

        let customer = await this.customerRepository.find({where:{unitslno:unitslno}});

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('customer.html', 'utf8');



        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {



                customercheck: customer
            },
            path: "./pdf/customer.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "customer.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };


    }

    async downloadExcel(unitslno:any,@Req() request: Request, @Res() response: Response) {

        let customer = await this.customerRepository.find({where:{unitslno:unitslno}});

        if (customer.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Customer_Details_report'); // creating worksheet
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
                { key: 'A', width: 20.0 },
                { key: 'B', width: 20.0 },
                { key: 'C', width: 20.0 },
                { key: 'D', width: 20.0 },
                { key: 'E', width: 20.0 },
                { key: 'F', width: 20.0 },
                { key: 'G', width: 20.0 },
                { key: 'H', width: 20.0 },
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
            worksheet.getCell('B3:H4').value = "PRODUCT DETAILS";
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
            worksheet.getCell('I2').value = "Issue Date : 01.02.2019";
            worksheet.getCell('I2').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('I3');
            worksheet.getCell('I3').value = "Rev. No. 00	";
            worksheet.getCell('I3').alignment = { vertical: 'left', horizontal: 'left' };
            worksheet.mergeCells('I4');
            worksheet.getCell('I4').value = "Rev Date :";
            worksheet.getCell('I4').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet.mergeCells('A5');
            worksheet.getCell('A5').value = "SL.No";
            worksheet.getCell('A5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('B5');
            worksheet.getCell('B5').value = "Customer Name";
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Address";
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "GSTIN";
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Vendor Code";
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "Contact Person Name";
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "Customer Phone";
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('H5');
            worksheet.getCell('H5').value = "Customer Email";
            worksheet.getCell('H5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('I5');
            worksheet.getCell('I5').value = "Major Products";
            worksheet.getCell('I5').font = {
                size: 11,
                bold: true
            };

            for (let i = 0; i < customer.length; i++) {
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).value = i + 1;

                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).value = customer[i].customerName;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).value = customer[i].address;

                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).value = customer[i].gstin;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).value = customer[i].vendorCode;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).value = customer[i].contactPersonName;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).value = customer[i].customerPhone;

                worksheet.mergeCells('H' + temp);
                worksheet.getCell('H' + temp).value = customer[i].customerEmail;

                worksheet.mergeCells('I' + temp);
                worksheet.getCell('I' + temp).value = customer[i].majorProduct;


            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }

    }

}