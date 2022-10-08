import { HttpException, HttpStatus, Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createReadStream } from "fs";
import { Response } from "express";
import { SalesInvoiceDTO } from "src/dto/salesInvoice.dto";
import { SalesQuotationDTO } from "src/dto/salesQuotation.dto";
import { Custemer001wb } from "src/entity/Custemer001wb";
import { Partitem001wb } from "src/entity/Partitem001wb";
import { Salesquotation001wb } from "src/entity/SalesQuotation001wb";
import { getManager, Repository } from "typeorm";
import { Request } from "supertest";
import { Part001mb } from "src/entity/Part001mb";
var path = require("path");
const excel = require("exceljs");
var converter = require("number-to-words");



@Injectable()
export class SalesQuotationService {
  constructor(
    @InjectRepository(Salesquotation001wb)private readonly salesQuotationRepository: Repository<Salesquotation001wb>,
    @InjectRepository(Custemer001wb)private readonly custemerRepository: Repository<Custemer001wb>,
    @InjectRepository(Partitem001wb) private readonly partitemRepository: Repository<Partitem001wb>,
    @InjectRepository(Part001mb) private readonly PartRepository: Repository<Part001mb>,
    ) {}

    async create(salesQuotationDTO: SalesQuotationDTO): Promise<Salesquotation001wb> {
      let partitem001wbs: Partitem001wb[] = [];
      for (let i = 0; i < salesQuotationDTO.partitem001wbs.length; i++) {
        const partitem001wb = new Partitem001wb();
        partitem001wb.partitemslNo2 = salesQuotationDTO.partitem001wbs[i].partitemslNo2;
        partitem001wb.prtcode = salesQuotationDTO.partitem001wbs[i].prtcode;
        partitem001wb.prtmname = salesQuotationDTO.partitem001wbs[i].prtmname;
        partitem001wb.prtqunty =salesQuotationDTO.partitem001wbs[i].prtqunty;
        partitem001wb.prtunitrate = salesQuotationDTO.partitem001wbs[i].prtunitrate;
        partitem001wb.prttotalamount = salesQuotationDTO.partitem001wbs[i].prttotalamount;
        partitem001wb.prtuom = salesQuotationDTO.partitem001wbs[i].prtuom;
        partitem001wb.prthsn = salesQuotationDTO.partitem001wbs[i].prthsn;
        partitem001wb.prtdescrip = salesQuotationDTO.partitem001wbs[i].prtdescrip;
        partitem001wb.unitslno = salesQuotationDTO.unitslno;
        partitem001wb.insertUser = salesQuotationDTO.insertUser;
        partitem001wb.insertDatetime = salesQuotationDTO.insertDatetime;
      let orderitem = await this.partitemRepository.save(partitem001wb);
      partitem001wbs.push(orderitem);
    }
    if (partitem001wbs.length > 0) {
      
      const salesquotation001wb = new Salesquotation001wb();      
      salesquotation001wb.setProperties(salesQuotationDTO);
      salesquotation001wb.partitem001wbs = partitem001wbs;
      await this.salesQuotationRepository.save(salesquotation001wb);
      return salesquotation001wb;
    }else{
      throw new HttpException('Please Add Item Details', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

    async update(salesQuotationDTO: SalesQuotationDTO): Promise<Salesquotation001wb> {
    const salesquotation001wb = new Salesquotation001wb();
    salesquotation001wb.setProperties(salesQuotationDTO);
    await this.salesQuotationRepository.update({ slNo: salesquotation001wb.slNo },salesquotation001wb);
    return salesquotation001wb;
    }

  async getCount(): Promise<string> {const entityManager = getManager();
    let result = await getManager().query("select count(*) as row from Salesquotation001wb", ["row"]);
    var string = JSON.stringify(result);
    return string;
  }

  async getCount1(): Promise<string> {const entityManager = getManager();
     let result = await getManager().query("select count(*) as row from Salesquotation001wb",["row"]);
    var string = JSON.stringify(result);
    return string;
  }

  async findAll(unitslno: any): Promise<Salesquotation001wb[]> {
    return await this.salesQuotationRepository.find({
      relations: ["custmrSlno2"],order: { slNo: "DESC" },
      where: { unitslno: unitslno },
    });
  }

  findOne(id: number): Promise<Salesquotation001wb> {
    return this.salesQuotationRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {await this.salesQuotationRepository.delete(id);
  }

  async downloadParamsPdf(id: any, unitslno: any, response: Response) {

    let salesQuotation = await this.salesQuotationRepository.find({
      relations: ["custmrSlno2","partitem001wbs"],
      where: { slNo: id, unitslno: unitslno },
    });


    let partitem = await this.partitemRepository.find({
      relations: ["prtcode2"],
    });

    let part = await this.PartRepository.find();

    
    for (let i = 0; i < salesQuotation.length; i++) {
      partitem = salesQuotation[i].partitem001wbs;
    }

    let totalAmount = 0;

    for (let i = 0; i < partitem.length; i++) {
      totalAmount = totalAmount + partitem[i].prttotalamount;
    }

    let totalwords = converter.toWords(totalAmount);
    let Totalwords = totalwords.toUpperCase();

    var fs = require("fs");
    var pdf = require("dynamic-html-pdf");
    var html = fs.readFileSync("SalesQuotation.html", "utf8");
    

    pdf.registerHelper("ifprtcode", function (prtcode, options) {
      this.prtcode  = this.prtcode?part.find(x => x.slNo === this.prtcode)?.partno : null;
         if (this.prtcode == undefined ) { 
           return options.inverse(this);
         }else{
           return options.fn(this, this.prtcode);   
         }
     });

    var options = {
      format: "A3",
      orientation: "landscape",
      border: "10mm",
    };

    var document = {
      type: "file",
      template: html,
      context: {
        SalesQuotation: salesQuotation,
        Partitem: partitem,
        totalAmount: totalAmount,
        Totalwords: Totalwords,
      },
      path: "./pdf/SalesInvoicesInd.pdf",
    };

    if (document === null) {
      return null;
    } else {
      pdf
        .create(document, options)
        .then((pathRes) => {
          const filestream = createReadStream(pathRes.filename);
          response.writeHead(200, {
            "Content-Disposition": "attachment;filename=" + "PurchaseOrder.pdf",
            "Content-Type": "application/pdf",
          });
          filestream.pipe(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  async downloadPdf(unitslno: any,@Req() request: Request,@Res() response: Response) {

    let salesQuotation = await this.salesQuotationRepository.find({
      relations: ["custmrSlno2","partitem001wbs"],
      where: {  unitslno: unitslno },
      order: { slNo: "DESC" }
    });


    let partitem = await this.partitemRepository.find({
      relations: ["prtcode2"],
    });

    let part = await this.PartRepository.find();

    var fs = require("fs");
    var pdf = require("dynamic-html-pdf");
    var html = fs.readFileSync("SalesQuotations.html", "utf8");

    pdf.registerHelper("iftotalamount", function (totalamount, options) {
      this.tAmount = 0;
      let value1 = 0;
      this.tWords = "";
      for (let i = 0; i < this.partitem001wbs.length; i++) {
        this.tAmount += this.partitem001wbs[i].prttotalamount
        value1 = this.partitem001wbs[i].prttotalamount;   
      }
      let totalwords = converter.toWords(this.tAmount);
      this.tWords = totalwords.toUpperCase();
      value1 = value1 ? value1 : undefined;
      if (value1 == undefined) {
        return options.inverse(this);
      } else {
        return options.fn(this,this.tAmount,this.tWords);
      }
    });

    pdf.registerHelper("ifprtcode", function (prtcode, options) {
      this.prtcode  = this.prtcode?part.find(x => x.slNo === this.prtcode)?.partno : null;
         if (this.prtcode == undefined ) { 
           return options.inverse(this);
         }else{
           return options.fn(this, this.prtcode);   
         }
     });
     
    var options = {
      format: "A3",
      orientation: "landscape",
      border: "10mm",
    };

   
      var document = {
        type: "file",
        template: html,
        context: {
          SalesQuotation: salesQuotation,
        
        },
        path: "./pdf/SalesInvoices.pdf",
      };
    
    if (document === null) {
      return null;
    } else {
      pdf
        .create(document, options)
        .then((pathRes) => {
          const filestream = createReadStream(pathRes.filename);
          response.writeHead(200, {
            "Content-Disposition": "attachment;filename=" + "PurchaseOrder.pdf",
            "Content-Type": "application/pdf",
          });
          filestream.pipe(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  async downloadExcel(unitslno: any,@Req() request: Request,@Res() response: Response) {

    let salesQuotation = await this.salesQuotationRepository.find({
      relations: ["custmrSlno2","partitem001wbs"],
      where: { unitslno: unitslno },
      order: { slNo: "DESC" }
    });

    let partitem = await this.partitemRepository.find({
      relations: ["prtcode2"]
    });


    let part = await this.PartRepository.find();

    let workbook = new excel.Workbook();
    for (let i = 0; i < salesQuotation.length; i++) {
      let worksheet = workbook.addWorksheet("Statutory_Reports" + i); // creating worksheet
      // worksheet.pageSetup.printArea = 'A1:AN213';
      worksheet.getRow(1).height = 40;
      worksheet.getRow(2).height = 40;
      worksheet.getRow(3).height = 40;
      worksheet.getRow(4).height = 40;
      worksheet.getRow(5).height = 60;
      worksheet.getRow(6).height = 60;
      worksheet.getRow(7).height = 60;
      worksheet.getRow(8).height = 60;
      worksheet.getRow(9).height = 60;
      worksheet.getRow(10).height = 60;
      worksheet.getRow(11).height = 60;
      worksheet.getRow(12).height = 60;
      worksheet.getRow(13).height = 60;
      worksheet.getRow(14).height = 80;
      worksheet.columns = [
        { key: "A", width: 20.0 },
        { key: "B", width: 20.0 },
        { key: "C", width: 20.0 },
        { key: "D", width: 20.0 },
        { key: "E", width: 20.0 },
        { key: "F", width: 20.0 },
        { key: "G", width: 20.0 },
        { key: "H", width: 20.0 },
        { key: "I", width: 20.0 },
        { key: "J", width: 20.0 },
        { key: "K", width: 20.0 },
        { key: "L", width: 20.0 },
        { key: "M", width: 20.0 },
        { key: "N", width: 20.0 },
        { key: "P", width: 20.0 },
        { key: "Q", width: 20.0 },
        { key: "R", width: 20.0 },
        { key: "S", width: 20.0 },
        { key: "T", width: 20.0 },
      ];

      worksheet.mergeCells("A1:I1");
      worksheet.getCell("A1:I1").value = "SRINIVASA ENTERPRISES";
      worksheet.getCell("A1:I1").font = {
        size: 16,
        bold: true,
      };
      worksheet.getCell("A1:I1").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A1:I1").alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      worksheet.mergeCells("A2:I2");
      worksheet.getCell("A2:I2").value = "SALES QUOTATION";
      worksheet.getCell("A2:I2").font = {
        size: 16,
        bold: true,
      };
      worksheet.getCell("A2:I2").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A2:I2").alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      worksheet.mergeCells("A3:C3");
      worksheet.getCell("A3:C3").value = {
        richText: [
          { text: "Customer Code :" + "\n\n" },
          {
            font: { size: 11 },
            text: "\n\n" + salesQuotation[i].custmrSlno2.custemercode,
          },
        ],
      };
      worksheet.getCell("A3:C3").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("A3:C3").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A3:C3").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("D3:F3");
      worksheet.getCell("D3:F3").value = {
        richText: [
          { text: "Date :" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesQuotation[i].date },
        ],
      };
      worksheet.getCell("D3:F3").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("D3:F3").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("D3:F3").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("G3:I3");
      worksheet.getCell("G3:I3").value = {
        richText: [
          { text: "Consignee No (Ship To):" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesQuotation[i].consignee },
        ],
      };
      worksheet.getCell("G3:I3").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("G3:I3").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("G3:I3").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("A4:C4");
      worksheet.getCell("A4:C4").value = {
        richText: [
          { text: "Customer Name:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesQuotation[i].custmrSlno2.custemername },
        ],
      };
      worksheet.getCell("A4:C4").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("A4:C4").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A4:C4").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("D4:F4");
      worksheet.getCell("D4:F4").value = {
        richText: [
          { text: "Quotation Date:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesQuotation[i].cDate },
        ],
      };
      worksheet.getCell("D4:F4").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("D4:F4").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("D4:F4").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("G4:I4");
      worksheet.getCell("G4:I4").value = {
        richText: [
          { text: "Reference No:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesQuotation[i].refno },
        ],
      };
      worksheet.getCell("G4:I4").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("G4:I4").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("G4:I4").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("A5:C5");
      worksheet.getCell("A5:C5").value = {
        richText: [
          { text: "Sales Quotation No:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesQuotation[i].sInvoice },
        ],
      };
      worksheet.getCell("A5:C5").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("A5:C5").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A5:C5").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("D5:F5");
      worksheet.getCell("D5:F5").value = {
        richText: [
          { text: "Dispached Through:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesQuotation[i].dispatchThrough },
        ],
      };
      worksheet.getCell("D5:F5").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("D5:F5").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("D5:F5").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("G5:I5");
      worksheet.getCell("G5:I5").value = {
        richText: [
          { text: "Other Reference:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesQuotation[i].otherRef },
        ],
      };
      worksheet.getCell("G5:I5").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("G5:I5").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("G5:I5").alignment = {
        vertical: "top",
        horizontal: "left",
      };


      worksheet.mergeCells("A6:C6");
      worksheet.getCell("A6:C6").value = {
        richText: [
          { text: "PO NO::" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesQuotation[i].pono },
        ],
      };
      worksheet.getCell("A6:C6").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("A6:C6").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A6:C6").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("D6:F6");
      worksheet.getCell("D6:F6").value = {
        richText: [
          { text: "Terms Of Delivery:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesQuotation[i].termsDelivery },
        ],
      };
      worksheet.getCell("D6:F6").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("D6:F6").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("D6:F6").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("G6:I6");
      worksheet.getCell("G6:I6").value = {
        richText: [
          { text: "Custemer (Bill From):" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesQuotation[i].supplierFrom },
        ],
      };
      worksheet.getCell("G6:I6").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("G6:I6").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("G6:I6").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("A7:C7");
      worksheet.getCell("A7:C7").value = {
        richText: [
          { text: "HSN/SAC:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesQuotation[i].hsn },
        ],
      };
      worksheet.getCell("A7:C7").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("A7:C7").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A7:C7").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("D7:I7");
      worksheet.getCell("D7:I7").value = {
        richText: [
          { text: "Due On:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesQuotation[i].dueOn },
        ],
      };
      worksheet.getCell("D7:I7").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("D7:I7").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("D7:I7").alignment = {
        vertical: "top",
        horizontal: "left",
      };


      worksheet.mergeCells("A8");
      worksheet.getCell("A8").value = "SL No";
      worksheet.getCell("A8").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("A8").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("B8");
      worksheet.getCell("B8").value = "Part code";
      worksheet.getCell("B8").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("B8").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("C8");
      worksheet.getCell("C8").value = "Part name";
      worksheet.getCell("C8").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("C8").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("D8");
      worksheet.getCell("D8").value = "Description";
      worksheet.getCell("D8").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("D8").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("E8");
      worksheet.getCell("E8").value = "UOM";
      worksheet.getCell("E8").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("E8").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("F8");
      worksheet.getCell("F8").value = "HSN/SAC";
      worksheet.getCell("F8").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("F8").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("G8");
      worksheet.getCell("G8").value = "UnitRate";
      worksheet.getCell("G8").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("G8").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("H8");
      worksheet.getCell("H8").value = "Quantity";
      worksheet.getCell("H8").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("H8").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("I8");
      worksheet.getCell("I8").value = "TotalAmount";
      worksheet.getCell("I8").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("I8").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

    
      for (let j = 0; j < salesQuotation[i].partitem001wbs.length; j++) {
        let temp = j + 9;
  
        worksheet.mergeCells("A" + temp);
        worksheet.getCell("A" + temp).value = salesQuotation[i].partitem001wbs[j].slNo;
        worksheet.getCell("A" + temp).font = {
          size: 12,
          bold: true,
        };
        worksheet.getCell("A" + temp).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        worksheet.getCell("A" + temp).alignment = {
          vertical: "middle",
          horizontal: "center",
          wraptext: true,
        };
  
        worksheet.mergeCells("B" + temp);
        worksheet.getCell("B" + temp).value = salesQuotation[i].partitem001wbs[j].prtcode ? part.find(x => x.slNo ===   salesQuotation[i].partitem001wbs[j].prtcode)?.partno : "";
        worksheet.getCell("B" + temp).font = {
          size: 12,
          bold: true,
        };
        worksheet.getCell("B" + temp).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        worksheet.getCell("B" + temp).alignment = {
          vertical: "middle",
          horizontal: "center",
          wraptext: true,
        };
  
        worksheet.mergeCells("C" + temp);
        worksheet.getCell("C" + temp).value = salesQuotation[i].partitem001wbs[j].prtmname;
        worksheet.getCell("C" + temp).font = {
          size: 12,
          bold: true,
        };
        worksheet.getCell("C" + temp).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        worksheet.getCell("C" + temp).alignment = {
          vertical: "middle",
          horizontal: "center",
          wraptext: true,
        };
  
        worksheet.mergeCells("D" + temp);
        worksheet.getCell("D" + temp).value = salesQuotation[i].partitem001wbs[j].prtdescrip;
        worksheet.getCell("D" + temp).font = {
          size: 12,
          bold: true,
        };
        worksheet.getCell("D" + temp).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        worksheet.getCell("D" + temp).alignment = {
          vertical: "middle",
          horizontal: "center",
          wraptext: true,
        };
  
        worksheet.mergeCells("E" + temp);
        worksheet.getCell("E" + temp).value =salesQuotation[i].partitem001wbs[j].prtuom;
        worksheet.getCell("E" + temp).font = {
          size: 12,
          bold: true,
        };
        worksheet.getCell("E" + temp).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        worksheet.getCell("E" + temp).alignment = {
          vertical: "middle",
          horizontal: "center",
          wraptext: true,
        };
  
        worksheet.mergeCells("F" + temp);
        worksheet.getCell("F" + temp).value = salesQuotation[i].partitem001wbs[j].prthsn;
        worksheet.getCell("F" + temp).font = {
          size: 12,
          bold: true,
        };
        worksheet.getCell("F" + temp).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        worksheet.getCell("F" + temp).alignment = {
          vertical: "middle",
          horizontal: "center",
          wraptext: true,
        };
  
        worksheet.mergeCells("G" + temp);
        worksheet.getCell("G" + temp).value = salesQuotation[i].partitem001wbs[j].prtunitrate;
        worksheet.getCell("G" + temp).font = {
          size: 12,
          bold: true,
        };
        worksheet.getCell("G" + temp).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        worksheet.getCell("G" + temp).alignment = {
          vertical: "middle",
          horizontal: "center",
          wraptext: true,
        };
  
        worksheet.mergeCells("H" + temp);
        worksheet.getCell("H" + temp).value = salesQuotation[i].partitem001wbs[j].prtqunty;
        worksheet.getCell("H" + temp).font = {
          size: 12,
          bold: true,
        };
        worksheet.getCell("H" + temp).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        worksheet.getCell("H" + temp).alignment = {
          vertical: "middle",
          horizontal: "center",
          wraptext: true,
        };
  
        worksheet.mergeCells("I" + temp);
        worksheet.getCell("I" + temp).value = salesQuotation[i].partitem001wbs[j].prttotalamount;
        worksheet.getCell("I" + temp).font = {
          size: 12,
          bold: true,
        };
        worksheet.getCell("I" + temp).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        worksheet.getCell("I" + temp).alignment = {
          vertical: "middle",
          horizontal: "center",
          wraptext: true,
        };
  
  
        }
       
  
        let purlength = salesQuotation[i].partitem001wbs.length + 9;

        for (let k = 0; k < salesQuotation[i].partitem001wbs.length; k++) {
          partitem = salesQuotation[i].partitem001wbs;
        }
  
        let totalAmount = 0;

        for(let z = 0; z < partitem.length; z++) {
          totalAmount = totalAmount + partitem[z].prttotalamount;
        }
        
  
        let totalwords = converter.toWords(totalAmount);
        let Totalwords = totalwords.toUpperCase();
  
        worksheet.mergeCells("H" + purlength);
        worksheet.getCell("H" + purlength).value = "Total";
        worksheet.getCell("H" + purlength).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
  
        worksheet.getCell("H" + purlength).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        worksheet.getCell("H" + purlength).font = {
          size: 12,
        };
  
        worksheet.mergeCells("I" + purlength);
        worksheet.getCell("I" + purlength).value = totalAmount;
        worksheet.getCell("I" + purlength).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        worksheet.getCell("I" + purlength).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
  
        let orderlength = purlength + 1;
        worksheet.getRow(orderlength).height = 150;
        let order = "A" + orderlength + ":" + "I" + orderlength;
  
        worksheet.mergeCells(order);
        worksheet.getCell(order).value = {
          richText: [
            { font: { size: 11 }, text: "\n\n" + Totalwords },
            { text: "Terms and Conditions" + "\n\n" },
          ],
        };
        worksheet.getCell(order).alignment = {
          vertical: "top",
          horizontal: "left",
        };
        worksheet.getCell(order).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          // bottom: { style: 'thin' },
          right: { style: "thin" },
        };
  
        let signlength = orderlength + 1;
        worksheet.getRow(signlength).height = 60;
        let sign = "A" + signlength + ":" + "E" + signlength;
        worksheet.mergeCells(sign);
        worksheet.getCell(sign).border = {
          // top: { style: 'thin' },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
  
        let signs = "F" + signlength + ":" + "I" + signlength;
        worksheet.mergeCells(signs);
        worksheet.getCell(signs).value = "Authorised Signatory";
        worksheet.getCell(signs).alignment = {
          vertical: "bottom",
          horizontal: "right",
        };
        worksheet.getCell(signs).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
    }

    return workbook.xlsx.write(response).then(function () {
      response["status"](200).end();
    });
  }

  // ----------------------------individual-excel---------------------------

  async downloadExcel1(id: any, unitslno: any, response: Response) {

    let salesQuotation = await this.salesQuotationRepository.find({
      relations: ["custmrSlno2","partitem001wbs"],
      where: { slNo: id, unitslno: unitslno },
    });

    let partitem = await this.partitemRepository.find({
      relations: ["prtcode2"]
    });

    let part = await this.PartRepository.find();
   
   

    for (let i = 0; i < salesQuotation.length; i++) {

      partitem = salesQuotation[i].partitem001wbs;


      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet("Statutory_Reports" + i); // creating worksheet
      worksheet.getRow(1).height = 40;
      worksheet.getRow(2).height = 40;
      worksheet.getRow(3).height = 40;
      worksheet.getRow(4).height = 40;
      worksheet.getRow(5).height = 60;
      worksheet.getRow(6).height = 60;
      worksheet.getRow(7).height = 60;
      worksheet.getRow(8).height = 60;
      worksheet.getRow(9).height = 60;
      worksheet.getRow(10).height = 60;
      worksheet.getRow(11).height = 60;
      worksheet.getRow(12).height = 60;
      worksheet.getRow(13).height = 60;
      worksheet.getRow(14).height = 80;
      worksheet.columns = [
        { key: "A", width: 20.0 },
        { key: "B", width: 20.0 },
        { key: "C", width: 20.0 },
        { key: "D", width: 20.0 },
        { key: "E", width: 20.0 },
        { key: "F", width: 20.0 },
        { key: "G", width: 20.0 },
        { key: "H", width: 20.0 },
        { key: "I", width: 20.0 },
        { key: "J", width: 20.0 },
        { key: "K", width: 20.0 },
        { key: "L", width: 20.0 },
        { key: "M", width: 20.0 },
        { key: "N", width: 20.0 },
        { key: "P", width: 20.0 },
        { key: "Q", width: 20.0 },
        { key: "R", width: 20.0 },
        { key: "S", width: 20.0 },
        { key: "T", width: 20.0 },
      ];
     
      worksheet.mergeCells("A1:I1");
      worksheet.getCell("A1:I1").value = "SRINIVASA ENTERPRISES";
      worksheet.getCell("A1:I1").font = {
        size: 16,
        bold: true,
      };
      worksheet.getCell("A1:I1").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A1:I1").alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      worksheet.mergeCells("A2:I2");
      worksheet.getCell("A2:I2").value = "SALES QUOTATION";
      worksheet.getCell("A2:I2").font = {
        size: 16,
        bold: true,
      };
      worksheet.getCell("A2:I2").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A2:I2").alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      worksheet.mergeCells("A3:C3");
      worksheet.getCell("A3:C3").value = {
        richText: [
          { text: "Customer Code :" + "\n\n" },
          {
            font: { size: 11 },
            text: "\n\n" + salesQuotation[i].custmrSlno2.custemercode,
          },
        ],
      };
      worksheet.getCell("A3:C3").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("A3:C3").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A3:C3").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("D3:F3");
      worksheet.getCell("D3:F3").value = {
        richText: [
          { text: "Date :" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesQuotation[i].date },
        ],
      };
      worksheet.getCell("D3:F3").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("D3:F3").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("D3:F3").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("G3:I3");
      worksheet.getCell("G3:I3").value = {
        richText: [
          { text: "Consignee No (Ship To):" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesQuotation[i].consignee },
        ],
      };
      worksheet.getCell("G3:I3").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("G3:I3").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("G3:I3").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("A4:C4");
      worksheet.getCell("A4:C4").value = {
        richText: [
          { text: "Customer Name:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesQuotation[i].custmrSlno2.custemername },
        ],
      };
      worksheet.getCell("A4:C4").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("A4:C4").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A4:C4").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("D4:F4");
      worksheet.getCell("D4:F4").value = {
        richText: [
          { text: "Quotation Date:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesQuotation[i].cDate },
        ],
      };
      worksheet.getCell("D4:F4").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("D4:F4").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("D4:F4").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("G4:I4");
      worksheet.getCell("G4:I4").value = {
        richText: [
          { text: "Reference No:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesQuotation[i].refno },
        ],
      };
      worksheet.getCell("G4:I4").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("G4:I4").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("G4:I4").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("A5:C5");
      worksheet.getCell("A5:C5").value = {
        richText: [
          { text: "Sales Quotation No:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesQuotation[i].sInvoice },
        ],
      };
      worksheet.getCell("A5:C5").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("A5:C5").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A5:C5").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("D5:F5");
      worksheet.getCell("D5:F5").value = {
        richText: [
          { text: "Dispached Through:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesQuotation[i].dispatchThrough },
        ],
      };
      worksheet.getCell("D5:F5").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("D5:F5").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("D5:F5").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("G5:I5");
      worksheet.getCell("G5:I5").value = {
        richText: [
          { text: "Other Reference:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesQuotation[i].otherRef },
        ],
      };
      worksheet.getCell("G5:I5").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("G5:I5").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("G5:I5").alignment = {
        vertical: "top",
        horizontal: "left",
      };


      worksheet.mergeCells("A6:C6");
      worksheet.getCell("A6:C6").value = {
        richText: [
          { text: "PO NO::" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesQuotation[i].pono },
        ],
      };
      worksheet.getCell("A6:C6").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("A6:C6").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A6:C6").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("D6:F6");
      worksheet.getCell("D6:F6").value = {
        richText: [
          { text: "Terms Of Delivery:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesQuotation[i].termsDelivery },
        ],
      };
      worksheet.getCell("D6:F6").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("D6:F6").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("D6:F6").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("G6:I6");
      worksheet.getCell("G6:I6").value = {
        richText: [
          { text: "Custemer (Bill From):" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesQuotation[i].supplierFrom },
        ],
      };
      worksheet.getCell("G6:I6").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("G6:I6").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("G6:I6").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("A7:C7");
      worksheet.getCell("A7:C7").value = {
        richText: [
          { text: "HSN/SAC:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesQuotation[i].hsn },
        ],
      };
      worksheet.getCell("A7:C7").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("A7:C7").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A7:C7").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("D7:I7");
      worksheet.getCell("D7:I7").value = {
        richText: [
          { text: "Due On:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesQuotation[i].dueOn },
        ],
      };
      worksheet.getCell("D7:I7").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("D7:I7").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("D7:I7").alignment = {
        vertical: "top",
        horizontal: "left",
      };


      worksheet.mergeCells("A8");
      worksheet.getCell("A8").value = "SL No";
      worksheet.getCell("A8").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("A8").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("B8");
      worksheet.getCell("B8").value = "Part code";
      worksheet.getCell("B8").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("B8").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("C8");
      worksheet.getCell("C8").value = "Part name";
      worksheet.getCell("C8").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("C8").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("D8");
      worksheet.getCell("D8").value = "Description";
      worksheet.getCell("D8").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("D8").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("E8");
      worksheet.getCell("E8").value = "UOM";
      worksheet.getCell("E8").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("E8").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("F8");
      worksheet.getCell("F8").value = "HSN/SAC";
      worksheet.getCell("F8").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("F8").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("G8");
      worksheet.getCell("G8").value = "UnitRate";
      worksheet.getCell("G8").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("G8").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("H8");
      worksheet.getCell("H8").value = "Quantity";
      worksheet.getCell("H8").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("H8").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("I8");
      worksheet.getCell("I8").value = "TotalAmount";
      worksheet.getCell("I8").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("I8").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

     
      

      for (let j = 0; j < partitem.length; j++) {
      let temp = j + 9;

      worksheet.mergeCells("A" + temp);
      worksheet.getCell("A" + temp).value = partitem[j].slNo;
      worksheet.getCell("A" + temp).font = {
        size: 12,
        bold: true,
      };
      worksheet.getCell("A" + temp).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A" + temp).alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("B" + temp);
      worksheet.getCell("B" + temp).value = partitem[j].prtcode ? part.find(x => x.slNo ===   partitem[j].prtcode)?.partno : "";
      worksheet.getCell("B" + temp).font = {
        size: 12,
        bold: true,
      };
      worksheet.getCell("B" + temp).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("B" + temp).alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("C" + temp);
      worksheet.getCell("C" + temp).value = partitem[j].prtmname;
      worksheet.getCell("C" + temp).font = {
        size: 12,
        bold: true,
      };
      worksheet.getCell("C" + temp).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("C" + temp).alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("D" + temp);
      worksheet.getCell("D" + temp).value = partitem[j].prtdescrip;
      worksheet.getCell("D" + temp).font = {
        size: 12,
        bold: true,
      };
      worksheet.getCell("D" + temp).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("D" + temp).alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("E" + temp);
      worksheet.getCell("E" + temp).value = partitem[j].prtuom;
      worksheet.getCell("E" + temp).font = {
        size: 12,
        bold: true,
      };
      worksheet.getCell("E" + temp).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("E" + temp).alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("F" + temp);
      worksheet.getCell("F" + temp).value = partitem[j].prthsn;
      worksheet.getCell("F" + temp).font = {
        size: 12,
        bold: true,
      };
      worksheet.getCell("F" + temp).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("F" + temp).alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("G" + temp);
      worksheet.getCell("G" + temp).value = partitem[j].prtunitrate;
      worksheet.getCell("G" + temp).font = {
        size: 12,
        bold: true,
      };
      worksheet.getCell("G" + temp).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("G" + temp).alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("H" + temp);
      worksheet.getCell("H" + temp).value = partitem[j].prtqunty;
      worksheet.getCell("H" + temp).font = {
        size: 12,
        bold: true,
      };
      worksheet.getCell("H" + temp).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("H" + temp).alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("I" + temp);
      worksheet.getCell("I" + temp).value = partitem[j].prttotalamount;
      worksheet.getCell("I" + temp).font = {
        size: 12,
        bold: true,
      };
      worksheet.getCell("I" + temp).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("I" + temp).alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };


      }
     

      let purlength = salesQuotation[i].partitem001wbs.length + 9;

      

      let totalAmount = 0;

      for (let i = 0; i < salesQuotation.length; i++) {
        partitem = salesQuotation[i].partitem001wbs;
        for (let j = 0; j < partitem.length; j++) {
          totalAmount = totalAmount + partitem[j].prttotalamount;
        }
      }

      let totalwords = converter.toWords(totalAmount);
      let Totalwords = totalwords.toUpperCase();

      worksheet.mergeCells("H" + purlength);
      worksheet.getCell("H" + purlength).value = "Total";
      worksheet.getCell("H" + purlength).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      worksheet.getCell("H" + purlength).alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      worksheet.getCell("H" + purlength).font = {
        size: 12,
      };

      worksheet.mergeCells("I" + purlength);
      worksheet.getCell("I" + purlength).value = totalAmount;
      worksheet.getCell("I" + purlength).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("I" + purlength).alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      let orderlength = purlength + 1;
      worksheet.getRow(orderlength).height = 150;
      let order = "A" + orderlength + ":" + "I" + orderlength;

      worksheet.mergeCells(order);
      worksheet.getCell(order).value = {
        richText: [
          { font: { size: 11 }, text: "\n\n" + Totalwords },
          { text: "Terms and Conditions" + "\n\n" },
        ],
      };
      worksheet.getCell(order).alignment = {
        vertical: "top",
        horizontal: "left",
      };
      worksheet.getCell(order).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        // bottom: { style: 'thin' },
        right: { style: "thin" },
      };

      let signlength = orderlength + 1;
      worksheet.getRow(signlength).height = 60;
      let sign = "A" + signlength + ":" + "E" + signlength;
      worksheet.mergeCells(sign);
      worksheet.getCell(sign).border = {
        // top: { style: 'thin' },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      let signs = "F" + signlength + ":" + "I" + signlength;
      worksheet.mergeCells(signs);
      worksheet.getCell(signs).value = "Authorised Signatory";
      worksheet.getCell(signs).alignment = {
        vertical: "bottom",
        horizontal: "right",
      };
      worksheet.getCell(signs).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };


      return workbook.xlsx.write(response).then(function () {
        response["status"](200).end();
      });
    }

    
  }
}