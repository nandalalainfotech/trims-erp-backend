import { HttpException, HttpStatus, Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerpomasterDTO } from "src/dto/Customerpomaster.dto";
import { Customerpoitem001wb } from "src/entity/Customerpoitem001wb";
import { Customerpomaster001mb } from "src/entity/Customerpomaster001mb";
import { Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
import { Between } from 'typeorm';
import { createReadStream } from "fs";
import { Part001mb } from "src/entity/Part001mb";
import { Custemerregistration001mb } from "src/entity/Custemerregistration001mb";
var path = require('path');
const excel = require('exceljs');
var fs = require('fs');
var pdf = require('dynamic-html-pdf');

@Injectable()
export class CustomerpomasterService {
    constructor(
        @InjectRepository(Customerpomaster001mb)private readonly CustomerpomasterRepository: Repository<Customerpomaster001mb>,
        @InjectRepository(Customerpoitem001wb)private readonly CustomerpoitemRepository: Repository<Customerpoitem001wb>,
        @InjectRepository(Part001mb)private readonly PartRepository: Repository<Part001mb>,
        @InjectRepository(Custemerregistration001mb) private readonly custemerRegRepository: Repository<Custemerregistration001mb>,

    ) { }


    async create(customerpomasterDTO: CustomerpomasterDTO): Promise<Customerpomaster001mb> {
       
        let customerpoitem001wbs: Customerpoitem001wb[] = [];
        for (let i = 0; i < customerpomasterDTO.customerpoitem001wbs.length; i++) {
            const customerpoitem001wb = new Customerpoitem001wb();
            customerpoitem001wb.customerpoSlno2 = customerpomasterDTO.customerpoitem001wbs[i].customerpoSlno2;
            customerpoitem001wb.prtcode = customerpomasterDTO.customerpoitem001wbs[i].prtcode;
            customerpoitem001wb.prtmname = customerpomasterDTO.customerpoitem001wbs[i].prtmname;
            customerpoitem001wb.prtdescrip = customerpomasterDTO.customerpoitem001wbs[i].prtdescrip;
            customerpoitem001wb.prtqunty = customerpomasterDTO.customerpoitem001wbs[i].prtqunty;
            customerpoitem001wb.prtuom = customerpomasterDTO.customerpoitem001wbs[i].prtuom;
            customerpoitem001wb.prthsn = customerpomasterDTO.customerpoitem001wbs[i].prthsn;
            customerpoitem001wb.prtunitrate = customerpomasterDTO.customerpoitem001wbs[i].prtunitrate;
            customerpoitem001wb.prttotalamount = customerpomasterDTO.customerpoitem001wbs[i].prttotalamount;

            customerpoitem001wb.drawingNo = customerpomasterDTO.customerpoitem001wbs[i].drawingNo;
            customerpoitem001wb.revisionNo = customerpomasterDTO.customerpoitem001wbs[i].revisionNo;
            customerpoitem001wb.revisionDate = new Date(customerpomasterDTO.customerpoitem001wbs[i].revisionDate);
            customerpoitem001wb.hsn = customerpomasterDTO.customerpoitem001wbs[i].hsn;
            customerpoitem001wb.gst = customerpomasterDTO.customerpoitem001wbs[i].gst;

            customerpoitem001wb.unitslno = customerpomasterDTO.unitslno;
            customerpoitem001wb.insertUser = customerpomasterDTO.insertUser;
            customerpoitem001wb.insertDatetime = customerpomasterDTO.insertDatetime;
            let customerpoitem = await this.CustomerpoitemRepository.save(customerpoitem001wb);
            customerpoitem001wbs.push(customerpoitem);

        }
        if (customerpoitem001wbs.length > 0) {
            const customerpomaster001mb = new Customerpomaster001mb();
            customerpomaster001mb.setProperties(customerpomasterDTO);
            customerpomaster001mb.customerpoitem001wbs = customerpoitem001wbs;
            await this.CustomerpomasterRepository.save(customerpomaster001mb);
            return customerpomaster001mb;
        } else {
            throw new HttpException('Please Add Item Details', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    async update(customerpomasterDTO: CustomerpomasterDTO): Promise<Customerpomaster001mb> {
        
        for (let i = 0; i < customerpomasterDTO.customerpoitem001wbs.length; i++) {
            const customerpoitem001wb = new Customerpoitem001wb();
            customerpoitem001wb.customerpoSlno = customerpomasterDTO.customerpoitem001wbs[i].customerpoSlno;
            customerpoitem001wb.prtcode = customerpomasterDTO.customerpoitem001wbs[i].prtcode;
            customerpoitem001wb.prtmname = customerpomasterDTO.customerpoitem001wbs[i].prtmname;
            customerpoitem001wb.prtdescrip = customerpomasterDTO.customerpoitem001wbs[i].prtdescrip;
            customerpoitem001wb.prtqunty = customerpomasterDTO.customerpoitem001wbs[i].prtqunty;
            customerpoitem001wb.prtuom = customerpomasterDTO.customerpoitem001wbs[i].prtuom;
            customerpoitem001wb.prthsn = customerpomasterDTO.customerpoitem001wbs[i].prthsn;
            customerpoitem001wb.prtunitrate = customerpomasterDTO.customerpoitem001wbs[i].prtunitrate;
            customerpoitem001wb.prttotalamount = customerpomasterDTO.customerpoitem001wbs[i].prttotalamount;
            customerpoitem001wb.drawingNo = customerpomasterDTO.customerpoitem001wbs[i].drawingNo;
            customerpoitem001wb.revisionNo = customerpomasterDTO.customerpoitem001wbs[i].revisionNo;
            customerpoitem001wb.revisionDate = new Date(customerpomasterDTO.customerpoitem001wbs[i].revisionDate);
            customerpoitem001wb.hsn = customerpomasterDTO.customerpoitem001wbs[i].hsn;
            customerpoitem001wb.gst = customerpomasterDTO.customerpoitem001wbs[i].gst;

            customerpoitem001wb.unitslno = customerpomasterDTO.unitslno;
            customerpoitem001wb.updatedUser = customerpomasterDTO.updatedUser;
            customerpoitem001wb.updatedDatetime = customerpomasterDTO.updatedDatetime;

            await this.CustomerpoitemRepository.update({ slNo: customerpomasterDTO.customerpoitem001wbs[i].slNo }, customerpoitem001wb);
        }

        const customerpomaster001mb = new Customerpomaster001mb();
        customerpomaster001mb.setProperties(customerpomasterDTO);
        await this.CustomerpomasterRepository.update({ slNo: customerpomaster001mb.slNo }, customerpomaster001mb);
        return customerpomaster001mb;

    }

    async findAll(unitslno: any): Promise<Customerpomaster001mb[]> {
        return await this.CustomerpomasterRepository.find({
            relations: ["customerpoitem001wbs"],
            order: { slNo: "DESC" },
            where: { unitslno: unitslno },
        });
    }

    async remove(slNo: number): Promise<void> {
        await this.CustomerpomasterRepository.delete(slNo);
    }


    async downloadPdf(unitslno: any, @Req() request: Request, @Res() response: Response) {

        let customerPomaster = await this.CustomerpomasterRepository.find({ where: { unitslno: unitslno },order: { slNo: "DESC" },
        relations: ["customerpoitem001wbs",]});

        let part = await this.PartRepository.find();

        let cusReg = await this.custemerRegRepository.find();


        var fs = require('fs');
        var pdf = require('dynamic-html-pdf');
        var html = fs.readFileSync('customerPomasters.html', 'utf8');
        let ItemslNo = 0;

        pdf.registerHelper("ifitemslno", function (orderslno, options) {
            ItemslNo = 0;
            this.slNo = ItemslNo;
            return options.fn(this,this.slNo);
        });


        pdf.registerHelper("ifcustemercode", function (custemercode, options) {
          this.custemercode  = this.custemercode?cusReg.find(x => x.slNo === this.custemercode)?.custemercode : null;
             if (this.custemercode == undefined ) { 
               return options.inverse(this);
             }else{
               return options.fn(this, this.custemercode);   
             }
         });
        
      
         pdf.registerHelper("ifprtcode", function (prtcode, options) {
          this.prtcode  = this.prtcode?part.find(x => x.slNo === this.prtcode)?.partno : null;
             if (this.prtcode == undefined ) { 
               return options.inverse(this);
             }else{
              this.slNo = ++ItemslNo;
               return options.fn(this, this.prtcode);   
             }
         });

        var options = {
            format: "A3",
            orientation: "landscape",
            border: "10mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {
                CustomerPomaster: customerPomaster
            },
            path: "./pdf/suplreg.pdf"    // it is not required if type is buffer
        };

        if (document === null) {
            return null;

        } else {
            pdf.create(document, options).then((pathRes) => {
                const filestream = createReadStream(pathRes.filename);
                response.writeHead(200, {
                    "Content-Disposition": "attachment;filename=" + "suplreg.pdf",
                    'Content-Type': 'application/pdf'
                });
                filestream.pipe(response);
            }).catch((error) => {
                console.error(error);
            });
        };
    }


    async downloadIDPdf(unitslno: any,id: any, @Req() request: Request, @Res() response: Response) {

      let customerPomaster = await this.CustomerpomasterRepository.find({ where: { slNo: id,unitslno: unitslno },order: { slNo: "DESC" },
      relations: ["customerpoitem001wbs",]});

      let part = await this.PartRepository.find();

      let cusReg = await this.custemerRegRepository.find();


      var fs = require('fs');
      var pdf = require('dynamic-html-pdf');
      var html = fs.readFileSync('customerPomaster.html', 'utf8');
      let ItemslNo = 0; 

      pdf.registerHelper("ifcustemercode", function (custemercode, options) {
        this.custemercode  = this.custemercode?cusReg.find(x => x.slNo === this.custemercode)?.custemercode : null;
           if (this.custemercode == undefined ) { 
             return options.inverse(this);
           }else{
             return options.fn(this, this.custemercode);   
           }
       });
      
    
       pdf.registerHelper("ifprtcode", function (prtcode, options) {
        this.prtcode  = this.prtcode?part.find(x => x.slNo === this.prtcode)?.partno : null;
           if (this.prtcode == undefined ) { 
             return options.inverse(this);
           }else{
            this.slNo = ++ItemslNo;
             return options.fn(this, this.prtcode);   
           }
       });

      var options = {
          format: "A3",
          orientation: "landscape",
          border: "10mm"
      };

      var document = {
          type: 'file',     // 'file' or 'buffer'
          template: html,
          context: {
              CustomerPomaster: customerPomaster
          },
          path: "./pdf/suplreg.pdf"    // it is not required if type is buffer
      };

      if (document === null) {
          return null;

      } else {
          pdf.create(document, options).then((pathRes) => {
              const filestream = createReadStream(pathRes.filename);
              response.writeHead(200, {
                  "Content-Disposition": "attachment;filename=" + "suplreg.pdf",
                  'Content-Type': 'application/pdf'
              });
              filestream.pipe(response);
          }).catch((error) => {
              console.error(error);
          });
      };
  }



    async downloadExcel(unitslno: any, @Req() request: Request, @Res() response: Response) {

        let customerPomaster = await this.CustomerpomasterRepository.find({ where: { unitslno: unitslno },order: { slNo: "DESC" },
        relations: ["customerpoitem001wbs",]});

        let part = await this.PartRepository.find();

        let cusReg = await this.custemerRegRepository.find();

        
        let workbook = new excel.Workbook();
        for (let i = 0; i < customerPomaster.length; i++) {
            
            let worksheet = workbook.addWorksheet(''); 
            worksheet.getRow(5).height = 20;
            worksheet.getRow(6).height = 20;
            worksheet.getRow(7).height = 20;
            worksheet.getRow(8).height = 20;
            worksheet.getRow(9).height = 20;
            worksheet.getRow(10).height = 20;
            worksheet.getRow(11).height = 20;
            worksheet.getRow(12).height = 20;
            worksheet.getRow(13).height = 20;
            worksheet.getRow(14).height = 20;
            worksheet.columns = [{ key: 'A', width: 25.0 },
            { key: 'B', width: 25.0 },
            { key: 'C', width: 25.0 },
            { key: 'D', width: 25.0 },
            { key: 'E', width: 25.0 },
            { key: 'F', width: 25.0 },
            { key: 'G', width: 25.0 },
            { key: 'H', width: 25.0 },
            { key: 'I', width: 25.0 },
            { key: 'J', width: 25.0 },
            { key: 'K', width: 25.0 },
            { key: 'L', width: 25.0 },
            { key: 'M', width: 25.0 },
            { key: 'M', width: 15.0 },];
            worksheet.columns.forEach((col) => {
                col.style.font = {
                    size: 10,
                    bold: true
                };
                col.style.alignment = { vertical: 'middle', horizontal: 'center' };
                col.style.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            })

            worksheet.mergeCells('A1:B4');
            worksheet.getCell('A1:B4').value = "TRIMS";
            worksheet.getCell('A1:B4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('A1:B4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('C1:L2');
            worksheet.getCell('C1:L2').value = "SRINIVASA ENTERPRISES";
            worksheet.getCell('C1:L2').font = {
                size: 14,
                bold: true
            };
            worksheet.getCell('C1:L2').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('C3:L4');
            worksheet.getCell('C3:L4').value = "CUSTOMER REGISTRATION DETAILS";
            worksheet.getCell('C3:L4').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell('C3:L4').alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells('M1:N1');
            worksheet.getCell('M1:N1').value = "Format No.SE/MTN/R05";
            worksheet.getCell('M1:N1').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet.mergeCells('M2:N2');
            worksheet.getCell('M2:N2').value = "Issue Date : ";
            worksheet.getCell('M2:N2').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet.mergeCells('M3:N3');
            worksheet.getCell('M3:N3').value = "Rev. No. 00	";
            worksheet.getCell('M3:N3').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet.mergeCells('M4:N4');
            worksheet.getCell('M4:N4').value = "Rev Date :";
            worksheet.getCell('M4:N4').alignment = { vertical: 'left', horizontal: 'left' };

            worksheet.mergeCells('A5:C5');
            worksheet.getCell('A5:C5').value = {
                richText: [
                  { text: "Customer Code:" + "\n\n" },
                  { font: { size: 11 }, text:  customerPomaster[i].custemercode ? cusReg.find(x => x.slNo ==  customerPomaster[i].custemercode)?.custemercode : null},

                ],
              };
            
            worksheet.getCell('A5:C5').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("A5:C5").alignment = {vertical: "top",horizontal: "left",};

            worksheet.mergeCells('D5:F5');
            worksheet.getCell('D5:F5').value = {
                richText: [
                  { text: "Customer Name:" + "\n\n" },
                  { font: { size: 11 }, text: "\n\n" + customerPomaster[i].custemername },
                ],
              };
            
            worksheet.getCell('D5:F5').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("D5:F5").alignment = {  vertical: "top", horizontal: "left",};

            worksheet.mergeCells('G5:I5');
            worksheet.getCell('G5:I5').value = {
                richText: [
                  { text: "Custemer PO No:" + "\n\n" },
                  { font: { size: 11 }, text: "\n\n" + customerPomaster[i].custemerPONo },
                ],
              };
            
            worksheet.getCell('G5:I5').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("G5:I5").alignment = {  vertical: "top", horizontal: "left",};

            worksheet.mergeCells('J5:N5');
            worksheet.getCell('J5:N5').value = {
                richText: [
                  { text: "PO Date:" + "\n\n" },
                  { font: { size: 11 }, text: "\n\n" + customerPomaster[i].poDate },
                ],
            };
            worksheet.getCell('J5:N5').font = { size: 11,bold: true};
            worksheet.getCell("J5:N5").alignment = {  vertical: "top", horizontal: "left",};

            worksheet.mergeCells('A6:C6');
            worksheet.getCell('A6:C6').value = {
                richText: [
                  { text: "Delivery Date:" + "\n\n" },
                  { font: { size: 11 }, text: "\n\n" + customerPomaster[i].deliveryDate},
                ],
            };
            worksheet.getCell('A6:C6').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("A6:C6").alignment = {  vertical: "top", horizontal: "left",};

            worksheet.mergeCells('D6:F6');
            worksheet.getCell('D6:F6').value = {
                richText: [
                  { text: "Packing Condition:" + "\n\n" },
                  { font: { size: 11 }, text: "\n\n" + customerPomaster[i].packing },
                ],
              };
            worksheet.getCell('D6:F6').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("D6:F6").alignment = {  vertical: "top", horizontal: "left",};

            worksheet.mergeCells('G6:I6');
            worksheet.getCell('G6:I6').value = {
                richText: [
                  { text: "Logistic Condition:" + "\n\n" },
                  { font: { size: 11 }, text: "\n\n" + customerPomaster[i].logistic },
                ],
              };
            worksheet.getCell('G6:I6').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("G6:I6").alignment = {  vertical: "top", horizontal: "left",};
            
            worksheet.mergeCells('J6:N6');
            worksheet.getCell('J6:N6').value =   {
                richText: [
                  { text: "Inspection Condition:" + "\n\n" },
                  { font: { size: 11 }, text: "\n\n" + customerPomaster[i].inspection },
                ],
              };
            worksheet.getCell('J6:N6').font = {
                size: 11,
                bold: true
            };
            worksheet.getCell("J6:N6").alignment = {  vertical: "top", horizontal: "left",};

           

            worksheet.mergeCells("A7");
            worksheet.getCell("A7").value = "Sl No";
            worksheet.getCell("A7").font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("A7").alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };

            worksheet.mergeCells("B7");
            worksheet.getCell("B7").value = "Part Code";
            worksheet.getCell("B7").font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("B7").alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };

            worksheet.mergeCells("C7");
            worksheet.getCell("C7").value = "Part Name";
            worksheet.getCell("C7").font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("C7").alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };

            worksheet.mergeCells("D7");
            worksheet.getCell("D7").value = "Description";
            worksheet.getCell("D7").font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("D7").alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };

            worksheet.mergeCells("E7");
            worksheet.getCell("E7").value = "UOM";
            worksheet.getCell("E7").font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("E7").alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };

            worksheet.mergeCells("F7");
            worksheet.getCell("F7").value = "HSN/SAC";
            worksheet.getCell("F7").font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("F7").alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };

            worksheet.mergeCells("G7");
            worksheet.getCell("G7").value = "Unit Rate";
            worksheet.getCell("G7").font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("G7").alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };


            worksheet.mergeCells("H7");
            worksheet.getCell("H7").value = "Quantity";
            worksheet.getCell("H7").font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("H7").alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };


            worksheet.mergeCells("I7");
            worksheet.getCell("I7").value = "TotalAmount";
            worksheet.getCell("I7").font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("I7").alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };

            worksheet.mergeCells("J7");
            worksheet.getCell("J7").value = "Drawing No";
            worksheet.getCell("J7").font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("J7").alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };

            worksheet.mergeCells("K7");
            worksheet.getCell("K7").value = "Revision No";
            worksheet.getCell("K7").font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("K7").alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };

            worksheet.mergeCells("L7");
            worksheet.getCell("L7").value = "Revision Date";
            worksheet.getCell("L7").font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("L7").alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };

            worksheet.mergeCells("M7");
            worksheet.getCell("M7").value = "HSN/SAC";
            worksheet.getCell("M7").font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("M7").alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };

            worksheet.mergeCells("N7");
            worksheet.getCell("N7").value = "GST %";
            worksheet.getCell("N7").font = {
              size: 12,
              bold: true,
            };
            worksheet.getCell("N7").alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };

            for (let j = 0; j < customerPomaster[i].customerpoitem001wbs.length; j++) {
                

            let temp = j + 8;

            worksheet.mergeCells("A" + temp);
            worksheet.getCell("A" + temp).value = j + 1,
            worksheet.getCell("A" + temp).font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("A" + temp).alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };

            worksheet.mergeCells("B" + temp);
            worksheet.getCell("B" + temp).value = customerPomaster[i].customerpoitem001wbs[j].prtcode ? part.find(x => x.slNo ===  customerPomaster[i].customerpoitem001wbs[j].prtcode)?.partno : "";
            worksheet.getCell("B" + temp).font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("B" + temp).alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };

            worksheet.mergeCells("C" + temp);
            worksheet.getCell("C" + temp).value = customerPomaster[i].customerpoitem001wbs[j].prtmname;
            worksheet.getCell("C" + temp).font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("C" + temp).alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };

            worksheet.mergeCells("D" + temp);
            worksheet.getCell("D" + temp).value = customerPomaster[i].customerpoitem001wbs[j].prtdescrip;
            worksheet.getCell("D" + temp).font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("D" + temp).alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };

            worksheet.mergeCells("E" + temp);
            worksheet.getCell("E" + temp).value = customerPomaster[i].customerpoitem001wbs[j].prtuom;
            worksheet.getCell("E" + temp).font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("E" + temp).alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };

            worksheet.mergeCells("F" + temp);
            worksheet.getCell("F" + temp).value = customerPomaster[i].customerpoitem001wbs[j].prthsn;
            worksheet.getCell("F" + temp).font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("F" + temp).alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };

            worksheet.mergeCells("G" + temp);
            worksheet.getCell("G" + temp).value = customerPomaster[i].customerpoitem001wbs[j].prtunitrate;
            worksheet.getCell("G" + temp).font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("G" + temp).alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };

            worksheet.mergeCells("H" + temp);
            worksheet.getCell("H" + temp).value = customerPomaster[i].customerpoitem001wbs[j].prtqunty;
            worksheet.getCell("H" + temp).font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("H" + temp).alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };


            worksheet.mergeCells("I" + temp);
            worksheet.getCell("I" + temp).value = customerPomaster[i].customerpoitem001wbs[j].prttotalamount;
            worksheet.getCell("I" + temp).font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("I" + temp).alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };

            worksheet.mergeCells("J" + temp);
            worksheet.getCell("J" + temp).value = customerPomaster[i].customerpoitem001wbs[j].drawingNo;
            worksheet.getCell("J" + temp).font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("J" + temp).alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };

            worksheet.mergeCells("K" + temp);
            worksheet.getCell("K" + temp).value = customerPomaster[i].customerpoitem001wbs[j].revisionNo;
            worksheet.getCell("K" + temp).font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("K" + temp).alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };


            worksheet.mergeCells("L" + temp);
            worksheet.getCell("L" + temp).value = customerPomaster[i].customerpoitem001wbs[j].revisionDate;
            worksheet.getCell("L" + temp).font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("L" + temp).alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };

            worksheet.mergeCells("M" + temp);
            worksheet.getCell("M" + temp).value = customerPomaster[i].customerpoitem001wbs[j].hsn;
            worksheet.getCell("M" + temp).font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("M" + temp).alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };

            worksheet.mergeCells("N" + temp);
            worksheet.getCell("N" + temp).value = customerPomaster[i].customerpoitem001wbs[j].gst;
            worksheet.getCell("N" + temp).font = {
                size: 12,
                bold: true,
            };
            worksheet.getCell("N" + temp).alignment = {
                vertical: "middle",
                horizontal: "center",
                wraptext: true,
            };


            }
              
        }
        return workbook.xlsx.write(response).then(function () {
            response['status'](200).end();
        });
    }


    async downloadIDExcel(unitslno: any,id: any, @Req() request: Request, @Res() response: Response) {

      let customerPomaster = await this.CustomerpomasterRepository.find({ where: { slNo: id,unitslno: unitslno },order: { slNo: "DESC" },
      relations: ["customerpoitem001wbs",]});

      let part = await this.PartRepository.find();

      let cusReg = await this.custemerRegRepository.find();

      let cusPoitem = await this.CustomerpoitemRepository.find();
      
      for (let i = 0; i < customerPomaster.length; i++) {

        cusPoitem = customerPomaster[i].customerpoitem001wbs;
          
        let workbook = new excel.Workbook();
          let worksheet = workbook.addWorksheet(''); 
          worksheet.getRow(5).height = 20;
          worksheet.getRow(6).height = 20;
          worksheet.getRow(7).height = 20;
          worksheet.getRow(8).height = 20;
          worksheet.getRow(9).height = 20;
          worksheet.getRow(10).height = 20;
          worksheet.getRow(11).height = 20;
          worksheet.getRow(12).height = 20;
          worksheet.getRow(13).height = 20;
          worksheet.getRow(14).height = 20;
          worksheet.columns = [{ key: 'A', width: 25.0 },
          { key: 'B', width: 25.0 },
          { key: 'C', width: 25.0 },
          { key: 'D', width: 25.0 },
          { key: 'E', width: 25.0 },
          { key: 'F', width: 25.0 },
          { key: 'G', width: 25.0 },
          { key: 'H', width: 25.0 },
          { key: 'I', width: 25.0 },
          { key: 'J', width: 25.0 },
          { key: 'K', width: 25.0 },
          { key: 'L', width: 25.0 },
          { key: 'M', width: 25.0 },
          { key: 'M', width: 15.0 },
        ];
          worksheet.columns.forEach((col) => {
              col.style.font = {
                  size: 10,
                  bold: true
              };
              col.style.alignment = { vertical: 'middle', horizontal: 'center' };
              col.style.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
          })

          worksheet.mergeCells('A1:B4');
          worksheet.getCell('A1:B4').value = "TRIMS";
          worksheet.getCell('A1:B4').font = {
              size: 11,
              bold: true
          };
          worksheet.getCell('A1:B4').alignment = { vertical: 'middle', horizontal: 'center' };

          worksheet.mergeCells('C1:L2');
          worksheet.getCell('C1:L2').value = "SRINIVASA ENTERPRISES";
          worksheet.getCell('C1:L2').font = {
              size: 14,
              bold: true
          };
          worksheet.getCell('C1:L2').alignment = { vertical: 'middle', horizontal: 'center' };

          worksheet.mergeCells('C3:L4');
          worksheet.getCell('C3:L4').value = "CUSTOMER REGISTRATION DETAILS";
          worksheet.getCell('C3:L4').font = {
              size: 11,
              bold: true
          };
          worksheet.getCell('C3:L4').alignment = { vertical: 'middle', horizontal: 'center' };

          worksheet.mergeCells('M1:N1');
          worksheet.getCell('M1:N1').value = "Format No.SE/MTN/R05";
          worksheet.getCell('M1:N1').alignment = { vertical: 'left', horizontal: 'left' };

          worksheet.mergeCells('M2:N2');
          worksheet.getCell('M2:N2').value = "Issue Date : ";
          worksheet.getCell('M2:N2').alignment = { vertical: 'left', horizontal: 'left' };

          worksheet.mergeCells('M3:N3');
          worksheet.getCell('M3:N3').value = "Rev. No. 00	";
          worksheet.getCell('M3:N3').alignment = { vertical: 'left', horizontal: 'left' };

          worksheet.mergeCells('M4:N4');
          worksheet.getCell('M4:N4').value = "Rev Date :";
          worksheet.getCell('M4:N4').alignment = { vertical: 'left', horizontal: 'left' };

          worksheet.mergeCells('A5:C5');
          worksheet.getCell('A5:C5').value = {
              richText: [
                { text: "Customer Code:" + "\n\n" },
                { font: { size: 11 }, text:  customerPomaster[i].custemercode ? cusReg.find(x => x.slNo ==  customerPomaster[i].custemercode)?.custemercode : null},

              ],
            };
          
          worksheet.getCell('A5:C5').font = {
              size: 11,
              bold: true
          };
          worksheet.getCell("A5:C5").alignment = {vertical: "top",horizontal: "left",};

          worksheet.mergeCells('D5:F5');
          worksheet.getCell('D5:F5').value = {
              richText: [
                { text: "Customer Name:" + "\n\n" },
                { font: { size: 11 }, text: "\n\n" + customerPomaster[i].custemername },
              ],
            };
          
          worksheet.getCell('D5:F5').font = {
              size: 11,
              bold: true
          };
          worksheet.getCell("D5:F5").alignment = {  vertical: "top", horizontal: "left",};

          worksheet.mergeCells('G5:I5');
          worksheet.getCell('G5:I5').value = {
              richText: [
                { text: "Custemer PO No:" + "\n\n" },
                { font: { size: 11 }, text: "\n\n" + customerPomaster[i].custemerPONo },
              ],
            };
          
          worksheet.getCell('G5:I5').font = {
              size: 11,
              bold: true
          };
          worksheet.getCell("G5:I5").alignment = {  vertical: "top", horizontal: "left",};

          worksheet.mergeCells('J5:N5');
          worksheet.getCell('J5:N5').value = {
              richText: [
                { text: "PO Date:" + "\n\n" },
                { font: { size: 11 }, text: "\n\n" + customerPomaster[i].poDate },
              ],
          };
          worksheet.getCell('J5:N5').font = { size: 11,bold: true};
          worksheet.getCell("J5:N5").alignment = {  vertical: "top", horizontal: "left",};

          worksheet.mergeCells('A6:C6');
          worksheet.getCell('A6:C6').value = {
              richText: [
                { text: "Delivery Date:" + "\n\n" },
                { font: { size: 11 }, text: "\n\n" + customerPomaster[i].deliveryDate},
              ],
          };
          worksheet.getCell('A6:C6').font = {
              size: 11,
              bold: true
          };
          worksheet.getCell("A6:C6").alignment = {  vertical: "top", horizontal: "left",};

          worksheet.mergeCells('D6:F6');
          worksheet.getCell('D6:F6').value = {
              richText: [
                { text: "Packing Condition:" + "\n\n" },
                { font: { size: 11 }, text: "\n\n" + customerPomaster[i].packing },
              ],
            };
          worksheet.getCell('D6:F6').font = {
              size: 11,
              bold: true
          };
          worksheet.getCell("D6:F6").alignment = {  vertical: "top", horizontal: "left",};

          worksheet.mergeCells('G6:I6');
          worksheet.getCell('G6:I6').value = {
              richText: [
                { text: "Logistic Condition:" + "\n\n" },
                { font: { size: 11 }, text: "\n\n" + customerPomaster[i].logistic },
              ],
            };
          worksheet.getCell('G6:I6').font = {
              size: 11,
              bold: true
          };
          worksheet.getCell("G6:I6").alignment = {  vertical: "top", horizontal: "left",};
          
          worksheet.mergeCells('J6:N6');
          worksheet.getCell('J6:N6').value =   {
              richText: [
                { text: "Inspection Condition:" + "\n\n" },
                { font: { size: 11 }, text: "\n\n" + customerPomaster[i].inspection },
              ],
            };
          worksheet.getCell('J6:N6').font = {
              size: 11,
              bold: true
          };
          worksheet.getCell("J6:N6").alignment = {  vertical: "top", horizontal: "left",};

         

          worksheet.mergeCells("A7");
          worksheet.getCell("A7").value = "Sl No";
          worksheet.getCell("A7").font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("A7").alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("B7");
          worksheet.getCell("B7").value = "Part Code";
          worksheet.getCell("B7").font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("B7").alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("C7");
          worksheet.getCell("C7").value = "Part Name";
          worksheet.getCell("C7").font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("C7").alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("D7");
          worksheet.getCell("D7").value = "Description";
          worksheet.getCell("D7").font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("D7").alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("E7");
          worksheet.getCell("E7").value = "UOM";
          worksheet.getCell("E7").font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("E7").alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("F7");
          worksheet.getCell("F7").value = "HSN/SAC";
          worksheet.getCell("F7").font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("F7").alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("G7");
          worksheet.getCell("G7").value = "Unit Rate";
          worksheet.getCell("G7").font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("G7").alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };


          worksheet.mergeCells("H7");
          worksheet.getCell("H7").value = "Quantity";
          worksheet.getCell("H7").font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("H7").alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };


          worksheet.mergeCells("I7");
          worksheet.getCell("I7").value = "TotalAmount";
          worksheet.getCell("I7").font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("I7").alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("J7");
          worksheet.getCell("J7").value = "Drawing No";
          worksheet.getCell("J7").font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("J7").alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("K7");
          worksheet.getCell("K7").value = "Revision No";
          worksheet.getCell("K7").font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("K7").alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("L7");
          worksheet.getCell("L7").value = "Revision Date";
          worksheet.getCell("L7").font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("L7").alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("M7");
          worksheet.getCell("M7").value = "HSN/SAC";
          worksheet.getCell("M7").font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("M7").alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("N7");
          worksheet.getCell("N7").value = "GST %";
          worksheet.getCell("N7").font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("N7").alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          for (let j = 0; j < cusPoitem.length; j++) {
              

          let temp = j + 8;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value = j + 1,
          worksheet.getCell("A" + temp).font = {
              size: 12,
              bold: true,
          };
          worksheet.getCell("A" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
          };

          worksheet.mergeCells("B" + temp);
          worksheet.getCell("B" + temp).value = cusPoitem[j].prtcode ? part.find(x => x.slNo ===  cusPoitem[j].prtcode)?.partno : "";
          worksheet.getCell("B" + temp).font = {
              size: 12,
              bold: true,
          };
          worksheet.getCell("B" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
          };

          worksheet.mergeCells("C" + temp);
          worksheet.getCell("C" + temp).value =  cusPoitem[j].prtmname;
          worksheet.getCell("C" + temp).font = {
              size: 12,
              bold: true,
          };
          worksheet.getCell("C" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
          };

          worksheet.mergeCells("D" + temp);
          worksheet.getCell("D" + temp).value = cusPoitem[j].prtdescrip;
          worksheet.getCell("D" + temp).font = {
              size: 12,
              bold: true,
          };
          worksheet.getCell("D" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
          };

          worksheet.mergeCells("E" + temp);
          worksheet.getCell("E" + temp).value =  cusPoitem[j].prtuom;
          worksheet.getCell("E" + temp).font = {
              size: 12,
              bold: true,
          };
          worksheet.getCell("E" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
          };

          worksheet.mergeCells("F" + temp);
          worksheet.getCell("F" + temp).value = cusPoitem[j].prthsn;
          worksheet.getCell("F" + temp).font = {
              size: 12,
              bold: true,
          };
          worksheet.getCell("F" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
          };

          worksheet.mergeCells("G" + temp);
          worksheet.getCell("G" + temp).value = cusPoitem[j].prtunitrate;
          worksheet.getCell("G" + temp).font = {
              size: 12,
              bold: true,
          };
          worksheet.getCell("G" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
          };

          worksheet.mergeCells("H" + temp);
          worksheet.getCell("H" + temp).value = cusPoitem[j].prtqunty;
          worksheet.getCell("H" + temp).font = {
              size: 12,
              bold: true,
          };
          worksheet.getCell("H" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
          };


          worksheet.mergeCells("I" + temp);
          worksheet.getCell("I" + temp).value = cusPoitem[j].prttotalamount;
          worksheet.getCell("I" + temp).font = {
              size: 12,
              bold: true,
          };
          worksheet.getCell("I" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
          };

          worksheet.mergeCells("J" + temp);
          worksheet.getCell("J" + temp).value = cusPoitem[j].drawingNo;
          worksheet.getCell("J" + temp).font = {
              size: 12,
              bold: true,
          };
          worksheet.getCell("J" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
          };

          worksheet.mergeCells("K" + temp);
          worksheet.getCell("K" + temp).value = cusPoitem[j].revisionNo;
          worksheet.getCell("K" + temp).font = {
              size: 12,
              bold: true,
          };
          worksheet.getCell("K" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
          };


          worksheet.mergeCells("L" + temp);
          worksheet.getCell("L" + temp).value = cusPoitem[j].revisionDate;
          worksheet.getCell("L" + temp).font = {
              size: 12,
              bold: true,
          };
          worksheet.getCell("L" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
          };

          worksheet.mergeCells("M" + temp);
          worksheet.getCell("M" + temp).value = cusPoitem[j].hsn;
          worksheet.getCell("M" + temp).font = {
              size: 12,
              bold: true,
          };
          worksheet.getCell("M" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
          };

          worksheet.mergeCells("N" + temp);
          worksheet.getCell("N" + temp).value = cusPoitem[j].gst;
          worksheet.getCell("N" + temp).font = {
              size: 12,
              bold: true,
          };
          worksheet.getCell("N" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
          };


          }
            
      
      return workbook.xlsx.write(response).then(function () {
          response['status'](200).end();
      });
    }
  }


}