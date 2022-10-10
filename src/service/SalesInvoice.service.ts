import { HttpException, HttpStatus,Injectable, Param, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { createReadStream } from "fs";
import { SalesInvoiceDTO } from "src/dto/salesInvoice.dto";
import { Custemer001wb } from "src/entity/Custemer001wb";
import { Part001mb } from "src/entity/Part001mb";
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
    private readonly custemerRepository: Repository<Custemer001wb>,
    @InjectRepository(Part001mb) private readonly PartRepository: Repository<Part001mb>,
  ) {}
  async create(salesInvoiceDTO: SalesInvoiceDTO): Promise<Salesinvoice001wb> {
    let custemer001wbs: Custemer001wb[] = [];
    for (let i = 0; i < salesInvoiceDTO.custemer001wbs.length; i++) {
      const custemer001wb = new Custemer001wb();
      custemer001wb.salespartSlno2 = salesInvoiceDTO.custemer001wbs[i].salespartSlno2;
      custemer001wb.prtcode = salesInvoiceDTO.custemer001wbs[i].prtcode;
      custemer001wb.prtmname = salesInvoiceDTO.custemer001wbs[i].prtmname;
      custemer001wb.prtdescrip = salesInvoiceDTO.custemer001wbs[i].prtdescrip;
      custemer001wb.prtqunty = salesInvoiceDTO.custemer001wbs[i].prtqunty;
      custemer001wb.prtuom = salesInvoiceDTO.custemer001wbs[i].prtuom;
      custemer001wb.prthsn = salesInvoiceDTO.custemer001wbs[i].prthsn;
      custemer001wb.prtunitrate = salesInvoiceDTO.custemer001wbs[i].prtunitrate;
      custemer001wb.prttotalamount = salesInvoiceDTO.custemer001wbs[i].prttotalamount;

      custemer001wb.unitslno = salesInvoiceDTO.unitslno;
      custemer001wb.insertUser = salesInvoiceDTO.insertUser;
      custemer001wb.insertDatetime = salesInvoiceDTO.insertDatetime;
      let customeritem = await this.custemerRepository.save(custemer001wb);
      custemer001wbs.push(customeritem);
    }

    if (custemer001wbs.length > 0) {
      const salesinvoice001wb = new Salesinvoice001wb();
      salesinvoice001wb.setProperties(salesInvoiceDTO);
      salesinvoice001wb.custemer001wbs = custemer001wbs;
      return this.salesinvoiceRepository.save(salesinvoice001wb);
    } else {
      throw new HttpException('Please Add Item Details', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(salesInvoiceDTO: SalesInvoiceDTO): Promise<Salesinvoice001wb> {

    for (let i = 0; i < salesInvoiceDTO.custemer001wbs.length; i++) {
      const custemer001wb = new Custemer001wb();
      custemer001wb.salespartSlno = salesInvoiceDTO.custemer001wbs[i].salespartSlno;
      custemer001wb.prtcode = salesInvoiceDTO.custemer001wbs[i].prtcode;
      custemer001wb.prtmname = salesInvoiceDTO.custemer001wbs[i].prtmname;
      custemer001wb.prtdescrip = salesInvoiceDTO.custemer001wbs[i].prtdescrip;
      custemer001wb.prtqunty = salesInvoiceDTO.custemer001wbs[i].prtqunty;
      custemer001wb.prtuom = salesInvoiceDTO.custemer001wbs[i].prtuom;
      custemer001wb.prthsn = salesInvoiceDTO.custemer001wbs[i].prthsn;
      custemer001wb.prtunitrate = salesInvoiceDTO.custemer001wbs[i].prtunitrate;
      custemer001wb.prttotalamount = salesInvoiceDTO.custemer001wbs[i].prttotalamount;

      custemer001wb.unitslno = salesInvoiceDTO.unitslno;
      custemer001wb.updatedUser = salesInvoiceDTO.updatedUser;
      custemer001wb.updatedDatetime = salesInvoiceDTO.updatedDatetime;
      await this.custemerRepository.update({ slNo: salesInvoiceDTO.custemer001wbs[i].slNo }, custemer001wb);
    }

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
      relations: ["custemer001wbs", "custmrSlno2"],order: { slNo: "DESC" },
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
      relations: ["custemer001wbs", "custmrSlno2"],
      where: { slNo: id, unitslno: unitslno },
    });

    let custemers = await this.custemerRepository.find({
      relations: ["salespartSlno2"],
    });

    let part = await this.PartRepository.find();

    for (let i = 0; i < salesInvoice.length; i++) {
      custemers = salesInvoice[i].custemer001wbs;
    }

    let totalAmount = 0;

    for (let i = 0; i < custemers.length; i++) {
      totalAmount = totalAmount + custemers[i].prttotalamount;
    }

    let totalwords = converter.toWords(totalAmount);
    let Totalwords = totalwords.toUpperCase();

    let orderitemSlno = 0;
    var fs = require("fs");
    var pdf = require("dynamic-html-pdf");
    var html = fs.readFileSync("SalesInvoicesInd.html", "utf8");

    pdf.registerHelper("ifprtcode", function (prtcode, options) {
      this.prtcode = this.prtcode ? part.find(x => x.slNo === this.prtcode)?.partno : null;
      if (this.prtcode == undefined) {
        return options.inverse(this);
      } else {
        this.slNo= ++orderitemSlno;
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
        salesInvoices: salesInvoice,
        Custemers: custemers,
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
            "Content-Disposition": "attachment;filename=" + "SalesInvoice.pdf",
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
      relations: ["custemer001wbs", "custmrSlno2"],
      where: { unitslno: unitslno },
    });

    let custemers = await this.custemerRepository.find({
      relations: ["salespartSlno2"],
    });

    let part = await this.PartRepository.find();
    let ItemslNo = 0 ;
    var fs = require("fs");
    var pdf = require("dynamic-html-pdf");
    var html = fs.readFileSync("SalesInvoices.html", "utf8");
    

    await pdf.registerHelper("ifitemslno", function (orderslno, options) {
      ItemslNo =0
      this.slNo =ItemslNo;
      return options.fn(this,this.slNo);
    });

    pdf.registerHelper("iftotalamount", function (totalamount, options) {
      this.tAmount = 0;
      let value1 = 0;
      this.tWords = "";
      for (let i = 0; i < this.custemer001wbs.length; i++) {
        this.tAmount += this.custemer001wbs[i].prttotalamount
        value1 = this.custemer001wbs[i].prttotalamount;
      }
      let totalwords = converter.toWords(this.tAmount);
      this.tWords = totalwords.toUpperCase();
      value1 = value1 ? value1 : undefined;
      if (value1 == undefined) {
        return options.inverse(this);
      } else {
        return options.fn(this, this.tAmount, this.tWords);
      }
    });
    pdf.registerHelper("ifprtcode", function (prtcode, options) {
      this.prtcode = this.prtcode ? part.find(x => x.slNo === this.prtcode)?.partno : null;
      if (this.prtcode == undefined) {
        return options.inverse(this);
      } else {
        this.slNo =++ItemslNo;
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
        salesInvoices: salesInvoice,

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

  async downloadExcel(
    unitslno: any,
    @Req() request: Request,
    @Res() response: Response
  ) {
    let salesInvoice = await this.salesinvoiceRepository.find({
      relations: ["custemer001wbs", "custmrSlno2"],
      where: { unitslno: unitslno },
    });
    ; let salesItem = await this.custemerRepository.find({ relations: ["salespartSlno2"] })

    let part = await this.PartRepository.find();

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

      worksheet.mergeCells('A1:I1');
      worksheet.getCell('A1:I1').value = "SRINIVASA ENTERPRISES";
      worksheet.getCell('A1:I1').font = {
        size: 14,
        bold: true
      };
      worksheet.getCell('A1:I1').alignment = { vertical: 'middle', horizontal: 'center' };

      worksheet.mergeCells("A2:I2");
      worksheet.getCell("A2:I2").value = "SALES INVOICE";
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
          { text: "Custemer Code :" + "\n\n" },
          {
            font: { size: 11 },
            text: "\n\n" + salesInvoice[i].custmrSlno2.custemercode,
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
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].date },
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
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].consignee },
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
          { text: "Custemer Name:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].custmrSlno2.custemername },
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
          { text: "Invoice Date:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].cDate },
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
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].refno },
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
      worksheet.getCell("A4:C4").value = {
        richText: [
          { text: "Sales Invoice No:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].sInvoice },
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
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].dispatchThrough },
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
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].otherRef },
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
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].pono },
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
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].termsDelivery },
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
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].supplierFrom },
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
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].hsn },
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
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].dueOn },
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
      worksheet.getCell("B8").value = "Item code";
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
      worksheet.getCell("C8").value = "Item name";
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


      for (let j = 0; j < salesInvoice[i].custemer001wbs.length; j++) {
        let temp = j + 9;
        worksheet.mergeCells("A" + temp);
        worksheet.getCell("A" + temp).value = j + 1;
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
        worksheet.getCell("B" + temp).value = salesInvoice[i].custemer001wbs[j].prtcode ? part.find(x => x.slNo === salesInvoice[i].custemer001wbs[j].prtcode)?.partno : "";
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
        worksheet.getCell("C" + temp).value = salesInvoice[i].custemer001wbs[j].prtmname;
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
        worksheet.getCell("D" + temp).value = salesInvoice[i].custemer001wbs[j].prtdescrip;
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
        worksheet.getCell("E" + temp).value = salesInvoice[i].custemer001wbs[j].prtuom;
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
        worksheet.getCell("F" + temp).value = salesInvoice[i].custemer001wbs[j].prthsn;
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
        worksheet.getCell("G" + temp).value = salesInvoice[i].custemer001wbs[j].prtunitrate;
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
        worksheet.getCell("H" + temp).value = salesInvoice[i].custemer001wbs[j].prtqunty;
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
        worksheet.getCell("I" + temp).value = salesInvoice[i].custemer001wbs[j].prttotalamount;
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
      let purlength = salesInvoice[i].custemer001wbs.length + 9;
      for (let k = 0; k < salesInvoice[i].custemer001wbs.length; k++) {
        salesItem = salesInvoice[i].custemer001wbs;
      }
      let totalAmount = 0;
      for (let z = 0; z < salesItem.length; z++) {
        totalAmount = totalAmount + salesItem[z].prttotalamount;
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
          { font: { size: 11 }, text: "\n\n" + Totalwords }],
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
    let salesInvoice = await this.salesinvoiceRepository.find({
      relations: ["custemer001wbs", "custmrSlno2"],
      where: { slNo: id, unitslno: unitslno },
    });
    let salesItem = await this.custemerRepository.find({ relations: ["salespartSlno2"] });

    let part = await this.PartRepository.find();
    for (let i = 0; i < salesInvoice.length; i++) {

      salesItem = salesInvoice[i].custemer001wbs;

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
      worksheet.mergeCells('A1:I1');
      worksheet.getCell('A1:I1').value = "SRINIVASA ENTERPRISES";
      worksheet.getCell('A1:I1').font = {
        size: 14,
        bold: true
      };
      worksheet.getCell('A1:I1').alignment = { vertical: 'middle', horizontal: 'center' };

      worksheet.mergeCells("A2:I2");
      worksheet.getCell("A2:I2").value = "SALES INVOICE";
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
          { text: "Custemer Code :" + "\n\n" },
          {
            font: { size: 11 },
            text: "\n\n" + salesInvoice[i].custmrSlno2.custemercode,
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
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].date },
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
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].consignee },
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
          { text: "Custemer Name:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].custmrSlno2.custemername },
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
          { text: "Invoice Date:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].cDate },
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
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].refno },
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
      worksheet.getCell("A4:C4").value = {
        richText: [
          { text: "Sales Invoice No:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].sInvoice },
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
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].dispatchThrough },
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
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].otherRef },
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
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].pono },
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
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].termsDelivery },
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
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].supplierFrom },
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
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].hsn },
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
          { font: { size: 11 }, text: "\n\n" + salesInvoice[i].dueOn },
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
      worksheet.getCell("B8").value = "Item code";
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
      worksheet.getCell("C8").value = "Item name";
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


      for (let j = 0; j < salesInvoice[i].custemer001wbs.length; j++) {
        let temp = j + 9;
        worksheet.mergeCells("A" + temp);
        worksheet.getCell("A" + temp).value = j + 1;
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
        worksheet.getCell("B" + temp).value = salesInvoice[i].custemer001wbs[j].prtcode ? part.find(x => x.slNo === salesInvoice[i].custemer001wbs[j].prtcode)?.partno : "";
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
        worksheet.getCell("C" + temp).value = salesInvoice[i].custemer001wbs[j].prtmname;
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
        worksheet.getCell("D" + temp).value = salesInvoice[i].custemer001wbs[j].prtdescrip;
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
        worksheet.getCell("E" + temp).value = salesInvoice[i].custemer001wbs[j].prtuom;
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
        worksheet.getCell("F" + temp).value = salesInvoice[i].custemer001wbs[j].prthsn;
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
        worksheet.getCell("G" + temp).value = salesInvoice[i].custemer001wbs[j].prtunitrate;
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
        worksheet.getCell("H" + temp).value = salesInvoice[i].custemer001wbs[j].prtqunty;
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
        worksheet.getCell("I" + temp).value = salesInvoice[i].custemer001wbs[j].prttotalamount;
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
      let purlength = salesInvoice[i].custemer001wbs.length + 9;
      for (let k = 0; k < salesInvoice[i].custemer001wbs.length; k++) {
        salesItem = salesInvoice[i].custemer001wbs;
      }
      let totalAmount = 0;
      for (let z = 0; z < salesItem.length; z++) {
        totalAmount = totalAmount + salesItem[z].prttotalamount;
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
          { font: { size: 11 }, text: "\n\n" + Totalwords }],
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
