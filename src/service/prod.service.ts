import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdDTO } from "src/dto/Prod.dto";
import { Prod001mb } from "src/entity/Prod001mb";
import { Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
import { Between } from 'typeorm';
import { createReadStream } from "fs";


var path = require('path');
var fs = require('fs');
const excel = require('exceljs');
var pdf = require('dynamic-html-pdf');




@Injectable()
export class ProdService {
    constructor(

        @InjectRepository(Prod001mb) private readonly prodRepository: Repository<Prod001mb>) {
    }
    async create(prodDTO: ProdDTO): Promise<Prod001mb> {
        
        const prod001mb = new Prod001mb();
        prod001mb.setProperties(prodDTO);
        return this.prodRepository.save(prod001mb);
    }
    async update(prodDTO: ProdDTO): Promise<Prod001mb> {
        const prod001mb = new Prod001mb();
        prod001mb.setProperties(prodDTO);
        await this.prodRepository.update({ slNo: prod001mb.slNo }, prod001mb);
        return prod001mb;
    }

    async findAll(unitslno:any): Promise<Prod001mb[]> {
        return await this.prodRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno}});
    }

    findOne(id: number): Promise<Prod001mb> {
        return this.prodRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.prodRepository.delete(slNo);
    }



   async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {
        
        let prod = await this.prodRepository.find({where:{unitslno:unitslno}});

        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('prod.html', 'utf8');

       

        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {
                    

                
                prodcheck: prod
             },
            path: "./pdf/prod.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "prod.pdf",
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
        let prod = await this.prodRepository.find({where:{unitslno:unitslno}});


        if (prod.length < 0) {
            return;
        }
        else {
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Product_Details_report'); // creating worksheet

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
                { key: 'A', width: 20.0 },
                { key: 'B', width: 20.0 },
                { key: 'C', width: 25.0 },
                { key: 'D', width: 30.0 },
                { key: 'E', width: 20.0 },
                { key: 'F', width: 20.0 },
                { key: 'G', width: 30.0 },
            ];

            // worksheet.columns.forEach((col) => {

            //     col.style.font = {
            //         size: 7,
            //         bold: true
            //     };
            //     col.style.alignment = { vertical: 'middle', horizontal: 'center' };
            //     col.style.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            // })




            worksheet.mergeCells('A1:A4');
            worksheet.getCell('A1:A4').value = "TRIMS";
            worksheet.getCell('A1:A4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('A1:A4').border = {
                top: { style: 'thick' },
                left: { style: 'thick' },
                bottom: { style: 'thick' },
                right: { style: 'thick' }
            };
            worksheet.getCell('A1:A4').alignment = { vertical: 'middle', horizontal: 'center' };


            worksheet.mergeCells('B1:F2');
            worksheet.getCell('B1:F2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('B1:F2').fgColor = { argb: 'b03600' };  
            worksheet.getCell('B1:F2').font = {
                size: 12,
                bold: true                
            };
            worksheet.getCell('B1:F2').border = {
                top: { style: 'thick' },
                left: { style: 'thick' },
                bottom: { style: 'thick' },
                right: { style: 'thick' }
            };
            worksheet.getCell('B1:F2').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('B3:F4');
            worksheet.getCell('B3:F4').value = "PRODUCT DETAILS";
            worksheet.getCell('B3:F4').fgColor = { argb: '00b050' };  
            worksheet.getCell('B3:F4').font = {                
                size: 11,
                bold: true
            };
            worksheet.getCell('B3:F4').border = {
                top: { style: 'thick' },
                left: { style: 'thick' },
                bottom: { style: 'thick' },
                right: { style: 'thick' }
            };
            worksheet.getCell('B3:F4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('G1');
            worksheet.getCell('G1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('G1').border = {
                top: { style: 'thick' },
                left: { style: 'thick' },
                bottom: { style: 'thick' },
                right: { style: 'thick' }
            };
            worksheet.getCell('G1').alignment = { vertical: 'left', horizontal: 'left' };


            worksheet.mergeCells('G2');
            worksheet.getCell('G2').value = "Issue Date : 01.02.2019";
            worksheet.getCell('G2').border = {
                top: { style: 'thick' },
                left: { style: 'thick' },
                bottom: { style: 'thick' },
                right: { style: 'thick' }
            };
            worksheet.getCell('G2').alignment = { vertical: 'left', horizontal: 'left' };


            worksheet.mergeCells('G3');
            worksheet.getCell('G3').value = "Rev. No. 00	";
            worksheet.getCell('G3').border = {
                top: { style: 'thick' },
                left: { style: 'thick' },
                bottom: { style: 'thick' },
                right: { style: 'thick' }
            };
            worksheet.getCell('G3').alignment = { vertical: 'left', horizontal: 'left' };


            worksheet.mergeCells('G4');
            worksheet.getCell('G4').value = "Rev Date :";
            worksheet.getCell('G4').border = {
                top: { style: 'thick' },
                left: { style: 'thick' },
                bottom: { style: 'thick' },
                right: { style: 'thick' }
            };
            worksheet.getCell('G4').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet.mergeCells('A5');
            worksheet.getCell('A5').value = "Sl. No";
            worksheet.getCell('A5').border = {
                top: { style: 'thick' },
                left: { style: 'thick' },
                bottom: { style: 'thick' },
                right: { style: 'thick' }
            };
            worksheet.getCell('A5').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('B5');
            worksheet.getCell('B5').value = "Product No";
            worksheet.getCell('B5').border = {
                top: { style: 'thick' },
                left: { style: 'thick' },
                bottom: { style: 'thick' },
                right: { style: 'thick' }
            };
            worksheet.getCell('B5').font = {
                size: 11,
                bold: true
            };


            worksheet.mergeCells('C5');
            worksheet.getCell('C5').value = "Product Name";
            worksheet.getCell('C5').border = {
                top: { style: 'thick' },
                left: { style: 'thick' },
                bottom: { style: 'thick' },
                right: { style: 'thick' }
            };
            worksheet.getCell('C5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('D5');
            worksheet.getCell('D5').value = "Reference No";
            worksheet.getCell('D5').border = {
                top: { style: 'thick' },
                left: { style: 'thick' },
                bottom: { style: 'thick' },
                right: { style: 'thick' }
            };
            worksheet.getCell('D5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('E5');
            worksheet.getCell('E5').value = "Drawing No";
            worksheet.getCell('E5').border = {
                top: { style: 'thick' },
                left: { style: 'thick' },
                bottom: { style: 'thick' },
                right: { style: 'thick' }
            };
            worksheet.getCell('E5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('F5');
            worksheet.getCell('F5').value = "Customer Details";
            worksheet.getCell('F5').border = {
                top: { style: 'thick' },
                left: { style: 'thick' },
                bottom: { style: 'thick' },
                right: { style: 'thick' }
            };
            worksheet.getCell('F5').font = {
                size: 11,
                bold: true
            };
            worksheet.mergeCells('G5');
            worksheet.getCell('G5').value = "Remarks";
            worksheet.getCell('G5').border = {
                top: { style: 'thick' },
                left: { style: 'thick' },
                bottom: { style: 'thick' },
                right: { style: 'thick' }
            };
            worksheet.getCell('G5').font = {
                size: 11,
                bold: true
            };

            

            for (let i = 0; i < prod.length; i++) {
                let temp = i + 6;

                worksheet.mergeCells('A' + temp);
                worksheet.getCell('A' + temp).border = {
                    top: { style: 'thick' },
                    left: { style: 'thick' },
                    bottom: { style: 'thick' },
                    right: { style: 'thick' }
                };
                worksheet.getCell('A' + temp).alignment = { vertical: 'middle', horizontal: 'left' };
                worksheet.getCell('A' + temp).value = i + 1;
                
                worksheet.mergeCells('B' + temp);
                worksheet.getCell('B' + temp).border = {
                    top: { style: 'thick' },
                    left: { style: 'thick' },
                    bottom: { style: 'thick' },
                    right: { style: 'thick' }
                };
                worksheet.getCell('B' + temp).value = prod[i].proddno;

                worksheet.mergeCells('C' + temp);
                worksheet.getCell('C' + temp).border = {
                    top: { style: 'thick' },
                    left: { style: 'thick' },
                    bottom: { style: 'thick' },
                    right: { style: 'thick' }
                };
                worksheet.getCell('C' + temp).value = prod[i].proddname;

                worksheet.mergeCells('D' + temp);
                worksheet.getCell('D' + temp).border = {
                    top: { style: 'thick' },
                    left: { style: 'thick' },
                    bottom: { style: 'thick' },
                    right: { style: 'thick' }
                };
                worksheet.getCell('D' + temp).value = prod[i].catno;

                worksheet.mergeCells('E' + temp);
                worksheet.getCell('E' + temp).border = {
                    top: { style: 'thick' },
                    left: { style: 'thick' },
                    bottom: { style: 'thick' },
                    right: { style: 'thick' }
                };
                worksheet.getCell('E' + temp).value = prod[i].drawingno;

                worksheet.mergeCells('F' + temp);
                worksheet.getCell('F' + temp).border = {
                    top: { style: 'thick' },
                    left: { style: 'thick' },
                    bottom: { style: 'thick' },
                    right: { style: 'thick' }
                };
                worksheet.getCell('F' + temp).value = prod[i].cusdetails;

                worksheet.mergeCells('G' + temp);
                worksheet.getCell('G' + temp).border = {
                    top: { style: 'thick' },
                    left: { style: 'thick' },
                    bottom: { style: 'thick' },
                    right: { style: 'thick' }
                };
                worksheet.getCell('G' + temp).value = prod[i].remarks;
        
            
            }
            return workbook.xlsx.write(response).then(function () {
                response['status'](200).end();
            });


        }
        
    }


}