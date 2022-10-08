import { Injectable, Param, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { createReadStream } from "fs";
import { SalesInvoiceDTO } from "src/dto/salesInvoice.dto";
import { Custemer001wb } from "src/entity/Custemer001wb";
import { Salesinvoice001wb } from "src/entity/Salesinvoice001wb";
import { Request } from "supertest";
import { getManager, Repository } from "typeorm";
var path = require("path");
const excel = require("exceljs");
var converter = require("number-to-words");

@Injectable()
export class SalesInvoiceService {
  constructor(
    @InjectRepository(Salesinvoice001wb)
    private readonly salesinvoiceRepository: Repository<Salesinvoice001wb>,
    @InjectRepository(Custemer001wb)
    private readonly custemerRepository: Repository<Custemer001wb>
  ) {}
  async create(salesInvoiceDTO: SalesInvoiceDTO): Promise<Salesinvoice001wb> {
    const salesinvoice001wb = new Salesinvoice001wb();
    salesinvoice001wb.setProperties(salesInvoiceDTO);
    return this.salesinvoiceRepository.save(salesinvoice001wb);
  }

  async update(salesInvoiceDTO: SalesInvoiceDTO): Promise<Salesinvoice001wb> {
    const salesinvoice001wb = new Salesinvoice001wb();
    salesinvoice001wb.setProperties(salesInvoiceDTO);
    await this.salesinvoiceRepository.update(
      { slNo: salesinvoice001wb.slNo },
      salesinvoice001wb
    );
    return salesinvoice001wb;
  }

  async getCount(): Promise<string> {
    const entityManager = getManager();
    let result = await getManager().query(
      "select count(*) as row from salesinvoice001wb",
      ["row"]
    );
    var string = JSON.stringify(result);
    return string;
  }

  async getCount1(): Promise<string> {
    const entityManager = getManager();
    let result = await getManager().query(
      "select count(*) as row from salesinvoice001wb",
      ["row"]
    );
    var string = JSON.stringify(result);
    return string;
  }

  async findAll(unitslno: any): Promise<Salesinvoice001wb[]> {
    return await this.salesinvoiceRepository.find({
      relations: ["custmrSlno2"],order: { slNo: "DESC" },
      where: { unitslno: unitslno },
    });
  }

  findOne(id: number): Promise<Salesinvoice001wb> {
    return this.salesinvoiceRepository.findOne(id);
  }
  async remove(id: number): Promise<void> {
    await this.salesinvoiceRepository.delete(id);
  }
  async downloadParamsPdf(id: any, unitslno: any, response: Response) {
    let salesInvoice = await this.salesinvoiceRepository.find({
      relations: [
        "custemer001wbs",
        "custemer001wbs.custemerSlno2",
        "custmrSlno2",
      ],
      where: { slNo: id, unitslno: unitslno },
    });

    let custemers = await this.custemerRepository.find({
      relations: ["custemerSlno2"],
    });

    for (let i = 0; i < salesInvoice.length; i++) {
      custemers = salesInvoice[i].custemer001wbs;
    }

    let totalAmount = 0;

    for (let i = 0; i < custemers.length; i++) {
      totalAmount = totalAmount + custemers[i].totalamount;
    }

    let totalwords = converter.toWords(totalAmount);
    let Totalwords = totalwords.toUpperCase();

    var fs = require("fs");
    var pdf = require("dynamic-html-pdf");
    var html = fs.readFileSync("SalesInvoicesInd.html", "utf8");

    var options = {
      format: "A3",
      orientation: "landscape",
      border: "10mm",
    };

    var document = {
      type: "file",
      template: html,
      context: {
        salesInvoices: salesInvoice,
        custemers: custemers,
        totalAmount: totalAmount,
        Totalwords: Totalwords,
        // orderitemcode:orderitemcode
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

  async downloadPdf(
    unitslno: any,
    @Req() request: Request,
    @Res() response: Response
  ) {
    let salesInvoice = await this.salesinvoiceRepository.find({
      relations: [
        "custemer001wbs",
        "custemer001wbs.custemerSlno2",
        "custmrSlno2",
      ],
      where: { unitslno: unitslno },
    });

    let custemers = await this.custemerRepository.find({
      relations: ["custemerSlno2"],
    });
    var fs = require("fs");
    var pdf = require("dynamic-html-pdf");
    var html = fs.readFileSync("SalesInvoices.html", "utf8");
    var options = {
      format: "A3",
      orientation: "landscape",
      border: "10mm",
    };

    for (let i = 0; i < salesInvoice.length; i++) {
      let totalAmount = 0;

      for (let j = 0; j < custemers.length; j++) {
        totalAmount = totalAmount + custemers[j].totalamount;
      }

      let totalwords = converter.toWords(totalAmount);
      let Totalwords = totalwords.toUpperCase();

      var document = {
        type: "file",
        template: html,
        context: {
          salesInvoices: salesInvoice,
          custemers: custemers,
          totalAmount: totalAmount,
          Totalwords: Totalwords,
        },
        path: "./pdf/SalesInvoices.pdf",
      };
    }
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

  async downloadExcel(
    unitslno: any,
    @Req() request: Request,
    @Res() response: Response
  ) {
    let salesInvoice = await this.salesinvoiceRepository.find({
      relations: [
        "custemer001wbs",
        "custemer001wbs.custemerSlno2",
        "custmrSlno2",
      ],
      where: { unitslno: unitslno },
    });

    let workbook = new excel.Workbook();
    for (let i = 0; i < salesInvoice.length; i++) {
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
      worksheet.getCell("A1:I1").value = "SALES INVOICE";
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

      worksheet.mergeCells("A2:C2");
      worksheet.getCell("A2:C2").value = {
        richText: [
          { text: "Custemer Code :" + "\n\n" },
          {
            font: { size: 11 },
            text: "\n\n" + salesInvoice[i].custmrSlno2.custemercode,
          },
        ],
      };
      worksheet.getCell("A2:C2").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("A2:C2").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A2:C2").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("D2:F2");
      worksheet.getCell("D2:F2").value = {
        richText: [
          { text: "Date :" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].date },
        ],
      };
      worksheet.getCell("D2:F2").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("D2:F2").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("D2:F2").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("G2:I2");
      worksheet.getCell("G2:I2").value = {
        richText: [
          { text: "Consignee No (Ship To):" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].consignee },
        ],
      };
      worksheet.getCell("G2:I2").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("G2:I2").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("G2:I2").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("A3:C3");
      worksheet.getCell("A3:C3").value = {
        richText: [
          { text: "Custemer Name:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].custmrSlno2.custemername },
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
          { text: "Invoice Date:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].cDate },
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
          { text: "Reference No:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].refno },
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
          { text: "Sales Invoice No:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].sInvoice },
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
          { text: "Dispached Through:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].dispatchThrough },
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
          { text: "Other Reference:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].otherRef },
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
          { text: "PO NO::" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].pono },
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
          { text: "Terms Of Delivery:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].termsDelivery },
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
          { text: "Custemer (Bill From):" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].supplierFrom },
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
          { text: "HSN/SAC:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].hsn },
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

      worksheet.mergeCells("D6:I6");
      worksheet.getCell("D6:I6").value = {
        richText: [
          { text: "Due On:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].dueOn },
        ],
      };
      worksheet.getCell("D6:I6").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("D6:I6").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("D6:I6").alignment = {
        vertical: "top",
        horizontal: "left",
      };


      worksheet.mergeCells("A7");
      worksheet.getCell("A7").value = "SL No";
      worksheet.getCell("A7").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("A7").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("B7");
      worksheet.getCell("B7").value = "Item code";
      worksheet.getCell("B7").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("B7").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("C7");
      worksheet.getCell("C7").value = "Item name";
      worksheet.getCell("C7").font = {
        size: 11,
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
        size: 11,
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
        size: 11,
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
        size: 11,
        bold: true,
      };
      worksheet.getCell("F7").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("G7");
      worksheet.getCell("G7").value = "UnitRate";
      worksheet.getCell("G7").font = {
        size: 11,
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
        size: 11,
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
        size: 11,
        bold: true,
      };
      worksheet.getCell("I7").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

    
      let purlength = salesInvoice[i].custemer001wbs.length + 8;

      let custemers = await this.custemerRepository.find({
        relations: ["custemerSlno2"],
      });

      let totalAmount = 0;

      for (let i = 0; i < salesInvoice.length; i++) {
        custemers = salesInvoice[i].custemer001wbs;
        for (let j = 0; j < custemers.length; j++) {
          totalAmount = totalAmount + custemers[j].totalamount;
        }
      }

      let totalwords = converter.toWords(totalAmount);
      let Totalwords = totalwords.toUpperCase();

      worksheet.mergeCells("B" + purlength);
      worksheet.getCell("B" + purlength).value = "Total";
      worksheet.getCell("B" + purlength).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      worksheet.getCell("B" + purlength).alignment = {
        vertical: "middle",
        horizontal: "right",
      };
      worksheet.getCell("B" + purlength).font = {
        size: 11,
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
        horizontal: "right",
      };

      let orderlength = purlength + 1;
      worksheet.getRow(orderlength).height = 150;
      let order = "A" + orderlength + ":" + "I" + orderlength;

      worksheet.mergeCells(order);
      worksheet.getCell(order).value = "Terms and Conditions" + Totalwords;
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
    let salesInvoice = await this.salesinvoiceRepository.find({
      relations: [
        "custemer001wbs",
        "custemer001wbs.custemerSlno2",
        "custmrSlno2",
      ],
      where: { slNo: id, unitslno: unitslno },
    });
    let custemers = await this.custemerRepository.find({
      relations: ["custemerSlno2"],
    });

   
    for (let i = 0; i < salesInvoice.length; i++) {
      let workbook = new excel.Workbook();
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
      worksheet.getCell("A1:I1").value = "SALES INVOICE";
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

      worksheet.mergeCells("A2:C2");
      worksheet.getCell("A2:C2").value = {
        richText: [
          { text: "Custemer Code :" + "\n\n" },
          {
            font: { size: 11 },
            text: "\n\n" + salesInvoice[i].custmrSlno2.custemercode,
          },
        ],
      };
      worksheet.getCell("A2:C2").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("A2:C2").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A2:C2").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("D2:F2");
      worksheet.getCell("D2:F2").value = {
        richText: [
          { text: "Date :" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].date },
        ],
      };
      worksheet.getCell("D2:F2").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("D2:F2").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("D2:F2").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("G2:I2");
      worksheet.getCell("G2:I2").value = {
        richText: [
          { text: "Consignee No (Ship To):" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].consignee },
        ],
      };
      worksheet.getCell("G2:I2").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("G2:I2").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("G2:I2").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("A3:C3");
      worksheet.getCell("A3:C3").value = {
        richText: [
          { text: "Custemer Name:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].custmrSlno2.custemername },
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
          { text: "Invoice Date:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].cDate },
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
          { text: "Reference No:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].refno },
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
          { text: "Sales Invoice No:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].sInvoice },
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
          { text: "Dispached Through:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].dispatchThrough },
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
          { text: "Other Reference:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].otherRef },
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
          { text: "PO NO::" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].pono },
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
          { text: "Terms Of Delivery:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].termsDelivery },
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
          { text: "Custemer (Bill From):" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].supplierFrom },
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
          { text: "HSN/SAC:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].hsn },
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

      worksheet.mergeCells("D6:I6");
      worksheet.getCell("D6:I6").value = {
        richText: [
          { text: "Due On:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].dueOn },
        ],
      };
      worksheet.getCell("D6:I6").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("D6:I6").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("D6:I6").alignment = {
        vertical: "top",
        horizontal: "left",
      };


      worksheet.mergeCells("A7");
      worksheet.getCell("A7").value = "SL No";
      worksheet.getCell("A7").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("A7").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("B7");
      worksheet.getCell("B7").value = "Item code";
      worksheet.getCell("B7").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("B7").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("C7");
      worksheet.getCell("C7").value = "Item name";
      worksheet.getCell("C7").font = {
        size: 11,
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
        size: 11,
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
        size: 11,
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
        size: 11,
        bold: true,
      };
      worksheet.getCell("F7").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("G7");
      worksheet.getCell("G7").value = "UnitRate";
      worksheet.getCell("G7").font = {
        size: 11,
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
        size: 11,
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
        size: 11,
        bold: true,
      };
      worksheet.getCell("I7").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };


     

      let purlength = salesInvoice[i].custemer001wbs.length + 8;

      let custemers = await this.custemerRepository.find({
        relations: ["custemerSlno2"],
      });
      var fs = require("fs");
      for (let i = 0; i < salesInvoice.length; i++) {
        custemers = salesInvoice[i].custemer001wbs;
      }

      let totalAmount = 0;

      for (let j = 0; j < custemers.length; j++) {
        totalAmount = totalAmount + custemers[j].totalamount;
      }

      let totalwords = converter.toWords(totalAmount);
      let Totalwords = totalwords.toUpperCase();

      worksheet.mergeCells("B" + purlength);
      worksheet.getCell("B" + purlength).value = "Total";
      worksheet.getCell("B" + purlength).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      worksheet.getCell("B" + purlength).alignment = {
        vertical: "middle",
        horizontal: "right",
      };
      worksheet.getCell("B" + purlength).font = {
        size: 11,
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
        horizontal: "right",
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
