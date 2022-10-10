import { HttpException, HttpStatus, Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { createReadStream } from "fs";
import { PurchaseorderDTO } from "src/dto/Purchaseorder.dto";
import { Childpart001mb } from "src/entity/ChildPart001mb";
import { Companydetails001mb } from "src/entity/Companydetails001mb";
import { Consignee001mb } from "src/entity/Consignee001mb";
import { Consumble001mb } from "src/entity/Consumble001mb";
import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { Orderitem001wb } from "src/entity/Orderitem001wb";
import { Part001mb } from "src/entity/Part001mb";
import { Purchaseorder001wb } from "src/entity/Purchaseorder001wb";
import { Purchasereqslip001wb } from "src/entity/Purchasereqslip001wb";
import { Supplierquotation001wb } from "src/entity/Supplierquotation001wb";
import { Supplierregistration001mb } from "src/entity/Supplierregistration001mb";
import { Request } from "supertest";
import { getManager, Repository } from "typeorm";
var path = require("path");
const excel = require("exceljs");
var converter = require("number-to-words");

@Injectable()
export class PurchaseOrderService {
  constructor(
    @InjectRepository(Purchaseorder001wb)
    private readonly PurchaseorderRepository: Repository<Purchaseorder001wb>,
    @InjectRepository(Orderitem001wb)
    private readonly orderItemRepository: Repository<Orderitem001wb>,
    @InjectRepository(Companydetails001mb)
    private readonly companyRepository: Repository<Companydetails001mb>,
    @InjectRepository(Consignee001mb)
    private readonly consigneeRepository: Repository<Consignee001mb>,
    @InjectRepository(Orderitem001mb)
    private readonly orderItemsRepository: Repository<Orderitem001mb>,
    @InjectRepository(Consumble001mb)
    private readonly consumbleRepository: Repository<Consumble001mb>,
    @InjectRepository(Childpart001mb)
    private readonly childPartRepository: Repository<Childpart001mb>,
    @InjectRepository(Part001mb)
    private readonly PartRepository: Repository<Part001mb>,
    @InjectRepository(Supplierregistration001mb)
    private readonly supplierRegRepository: Repository<Supplierregistration001mb>,
    @InjectRepository(Purchasereqslip001wb)
    private readonly PurchasereqslipRepository: Repository<Purchasereqslip001wb>,
    @InjectRepository(Supplierquotation001wb)
    private readonly supplierAuditRepository: Repository<Supplierquotation001wb>
  ) { }

  async create(
    purchaseorderpDTO: PurchaseorderDTO
  ): Promise<Purchaseorder001wb> {
    let orderitem001wbs: Orderitem001wb[] = [];
    for (let i = 0; i < purchaseorderpDTO.orderitemSlno2?.length; i++) {
      const orderitem001wb = new Orderitem001wb();
      orderitem001wb.purchaseslno2 = purchaseorderpDTO.orderitemSlno2[i].purchaseslno2;
      orderitem001wb.itemcode = purchaseorderpDTO.orderitemSlno2[i].itemcode;
      orderitem001wb.itemname = purchaseorderpDTO.orderitemSlno2[i].itemname;
      orderitem001wb.qunty = purchaseorderpDTO.orderitemSlno2[i].qunty;
      orderitem001wb.unitrate = purchaseorderpDTO.orderitemSlno2[i].unitrate;
      orderitem001wb.totalamount =
        purchaseorderpDTO.orderitemSlno2[i].totalamount;
      orderitem001wb.uom = purchaseorderpDTO.orderitemSlno2[i].uom;
      orderitem001wb.hsn = purchaseorderpDTO.orderitemSlno2[i].hsn;
      orderitem001wb.descrip = purchaseorderpDTO.orderitemSlno2[i].descrip;

      orderitem001wb.cucode = purchaseorderpDTO.orderitemSlno2[i].cucode;
      orderitem001wb.cuname = purchaseorderpDTO.orderitemSlno2[i].cuname;
      orderitem001wb.cuqunty = purchaseorderpDTO.orderitemSlno2[i].cuqunty;
      orderitem001wb.cunitrate = purchaseorderpDTO.orderitemSlno2[i].cunitrate;
      orderitem001wb.cutotalamount =
        purchaseorderpDTO.orderitemSlno2[i].cutotalamount;
      orderitem001wb.cuom = purchaseorderpDTO.orderitemSlno2[i].cuom;
      orderitem001wb.chsn = purchaseorderpDTO.orderitemSlno2[i].chsn;
      orderitem001wb.cudescrip = purchaseorderpDTO.orderitemSlno2[i].cudescrip;

      orderitem001wb.cptcode = purchaseorderpDTO.orderitemSlno2[i].cptcode;
      orderitem001wb.cptname = purchaseorderpDTO.orderitemSlno2[i].cptname;
      orderitem001wb.cptqunty = purchaseorderpDTO.orderitemSlno2[i].cptqunty;
      orderitem001wb.cptunitrate =
        purchaseorderpDTO.orderitemSlno2[i].cptunitrate;
      orderitem001wb.cpttotalamount =
        purchaseorderpDTO.orderitemSlno2[i].cpttotalamount;
      orderitem001wb.cptuom = purchaseorderpDTO.orderitemSlno2[i].cptuom;
      orderitem001wb.cpthsn = purchaseorderpDTO.orderitemSlno2[i].cpthsn;
      orderitem001wb.cptdescrip =
        purchaseorderpDTO.orderitemSlno2[i].cptdescrip;

      orderitem001wb.prtcode = purchaseorderpDTO.orderitemSlno2[i].prtcode;
      orderitem001wb.prtmname = purchaseorderpDTO.orderitemSlno2[i].prtmname;
      orderitem001wb.prtqunty = purchaseorderpDTO.orderitemSlno2[i].prtqunty;
      orderitem001wb.prtunitrate =
        purchaseorderpDTO.orderitemSlno2[i].prtunitrate;
      orderitem001wb.prttotalamount =
        purchaseorderpDTO.orderitemSlno2[i].prttotalamount;
      orderitem001wb.prtuom = purchaseorderpDTO.orderitemSlno2[i].prtuom;
      orderitem001wb.prthsn = purchaseorderpDTO.orderitemSlno2[i].prthsn;
      orderitem001wb.prtdescrip =
        purchaseorderpDTO.orderitemSlno2[i].prtdescrip;
      orderitem001wb.unitslno = purchaseorderpDTO.unitslno;
      orderitem001wb.insertUser = purchaseorderpDTO.insertUser;
      orderitem001wb.insertDatetime = purchaseorderpDTO.insertDatetime;
      let orderitem = await this.orderItemRepository.save(orderitem001wb);
      orderitem001wbs.push(orderitem);
    }

    if (orderitem001wbs.length > 0) {
      const purchaseorder001wb = new Purchaseorder001wb();
      purchaseorder001wb.setProperties(purchaseorderpDTO);
      purchaseorder001wb.orderitem001wbs = orderitem001wbs;
      await this.PurchaseorderRepository.save(purchaseorder001wb);
      return purchaseorder001wb;
    } else {
      throw new HttpException('Please Add Item Details', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    purchaseorderpDTO: PurchaseorderDTO
  ): Promise<Purchaseorder001wb> {
    const purchaseorder001wb = new Purchaseorder001wb();
    purchaseorder001wb.setProperties(purchaseorderpDTO);
    await this.PurchaseorderRepository.update(
      { slNo: purchaseorder001wb.slNo },
      purchaseorder001wb
    );
    return purchaseorder001wb;
  }

  async UpdatePO(
    approvel: any,
    pchaseslno: any,
    remarks: any
  ): Promise<Purchaseorder001wb> {
    let purchaseorder001wb = new Purchaseorder001wb();
    purchaseorder001wb.status = approvel;
    purchaseorder001wb.remarks = remarks;
    purchaseorder001wb.updatedDatetime = new Date();
    await this.PurchaseorderRepository.update(
      { slNo: pchaseslno },
      purchaseorder001wb
    );
    return purchaseorder001wb;
  }

  async findAllByMetrialId(purchseSlno: number): Promise<Purchaseorder001wb> {
    return this.PurchaseorderRepository.findOne(purchseSlno);
  }
  async getCount(): Promise<string> {
    const entityManager = getManager();
    let result = await getManager().query(
      "select count(*) as row from Purchaseorder001wb",
      ["row"]
    );
    var string = JSON.stringify(result);
    return string;
  }

  async findAll(unitslno: any): Promise<Purchaseorder001wb[]> {
    return await this.PurchaseorderRepository.find({
      order: { slNo: "DESC" }, relations: ["suplierSlno2"],
      where: { unitslno: unitslno }
    });
  }

  findOne(id: number): Promise<Purchaseorder001wb> {
    return this.PurchaseorderRepository.findOne({
      relations: ["orderitem001wbs", "suplierSlno2"],
      where: { slNo: id },
    });
  }
  findById(purchseId: any): Promise<Purchaseorder001wb> {
    return this.PurchaseorderRepository.findOne({
      where: { slNo: purchseId },
      relations: ["orderitem001wbs"],
    });
  }

  async remove(id: string): Promise<void> {
    await this.PurchaseorderRepository.delete(id);
  }

  async downloadParamsPdf(unitslno: any, id: any, response: Response) {
    let purOrders = await this.PurchaseorderRepository.find({
      relations: ["orderitem001wbs", "suplierSlno2", "suplierSlno2.supplierSlno2", "suplierSlno2.prsno2"],
      where: { slNo: id, unitslno: unitslno },
    });

    let purslip = await this.PurchasereqslipRepository.find();

    let orderitems: Orderitem001wb[] = [];

    let ordeitem = await this.orderItemsRepository.find();

    let consumableitem = await this.consumbleRepository.find();

    let childpart = await this.childPartRepository.find();

    let part = await this.PartRepository.find();


    let totalAmount = 0;

    for (let i = 0; i < purOrders.length; i++) {
      for (let j = 0; j < purOrders[i].orderitem001wbs.length; j++) {
        orderitems.push(purOrders[i].orderitem001wbs[j]);
        totalAmount += purOrders[i].orderitem001wbs[j].totalamount;
        totalAmount += purOrders[i].orderitem001wbs[j].cutotalamount;
        totalAmount += purOrders[i].orderitem001wbs[j].cpttotalamount;
        totalAmount += purOrders[i].orderitem001wbs[j].prttotalamount;

      }
    }






    let totalwords = converter.toWords(totalAmount);
    let Totalwords = totalwords.toUpperCase();

    var fs = require("fs");
    var pdf = require("dynamic-html-pdf");
    var html = fs.readFileSync("purchaseOrder.html", "utf8");
    let orderitemSlno = 0;




    pdf.registerHelper('iforderslno', function (itemcode, options) {
      if (this.itemcode) {
        this.itemcode = this.itemcode ? ordeitem.find(x => x.slNo === this.itemcode)?.itemcode : null;
        this.slNo = ++orderitemSlno;
        return options.fn(this, this.itemcode);
      } else {
        return options.inverse(this);
      }
    })

    pdf.registerHelper('ifcucode', function (cucode, options) {
      if (this.cucode) {
        this.cucode = this.cucode ? consumableitem.find(x => x.slNo === this.cucode)?.consmno : null;
        this.slNo = ++orderitemSlno;
        return options.fn(this, this.cucode);
      } else {
        return options.inverse(this);
      }

    })

    pdf.registerHelper('ifcptcode', function (cptcode, options) {
      if (this.cptcode) {
        this.cptcode = this.cptcode ? childpart.find(x => x.slNo === this.cptcode)?.cpartno : null;
        this.slNo = ++orderitemSlno;
        return options.fn(this, this.cptcode);
      } else {
        return options.inverse(this);
      }
    })

    pdf.registerHelper('ifprtcode', function (prtcode, options) {
      if (this.prtcode) {
        this.prtcode = this.prtcode ? part.find(x => x.slNo === this.prtcode)?.partno : null;
        this.slNo = ++orderitemSlno;
        return options.fn(this, this.prtcode);
      } else {
        return options.inverse(this);
      }
    })

    var options = {
      format: "A3",
      orientation: "landscape",
      border: "10mm",
    };

    var document = {
      type: "file",
      template: html,
      context: {
        purchaseOrder: purOrders,
        orderitems: orderitems,
        totalAmount: totalAmount,
        Totalwords: Totalwords,
      },
      path: "./pdf/purchaseOrder.pdf",
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

  async downloadPdf(unitslno: any, @Req() request: Request, @Res() response: Response) {
    let purOrders = await this.PurchaseorderRepository.find({
      relations: ["orderitem001wbs", "suplierSlno2", "suplierSlno2.supplierSlno2", "suplierSlno2.prsno2"],
      where: { unitslno: unitslno },
      order: { slNo: "DESC" }
    });

    let purslip = await this.PurchasereqslipRepository.find();

    let ordeitem = await this.orderItemsRepository.find();

    let consumableitem = await this.consumbleRepository.find();

    let childpart = await this.childPartRepository.find();

    let part = await this.PartRepository.find();
    let itemSlno = 0


    var fs = require("fs");
    var pdf = require("dynamic-html-pdf");
    var html = fs.readFileSync("purchaseOreders.html", "utf8");

    let tAmount = 0;

    let itemcodes: any;
    let conscodes: any;
    let cpartcodes: any;
    let partcodes: any;


    await pdf.registerHelper("ifitemslno", function (orderslno, options) {
      itemSlno =0
      this.slNo =itemSlno;
      return options.fn(this,this.slNo);
    });


    pdf.registerHelper("iforderslno", function (orderslno, options) {
      const value1 = this.itemcode ? this.itemcode : undefined;
      this.itemcode = this.itemcode ? ordeitem.find(x => x.slNo === value1)?.itemcode : null;
      if (value1 == undefined) {
        return options.inverse(this);
      } else {
        this.slNo=++itemSlno;
        return options.fn(this, this.itemcode);
      }

    });
    pdf.registerHelper('ifcucode', function (cucode, options) {
      const value2 = this.cucode ? this.cucode : undefined;
      this.itemcode = this.cucode ? consumableitem.find(x => x.slNo === value2)?.consmno : null;
      if (value2 == undefined) {
        return options.inverse(this);
      } else {
        this.slNo=++itemSlno;
        return options.fn(this, this.itemcode);
      }
    })

    pdf.registerHelper('ifcptcode', function (cptcode, options) {
      const value3 = this.cptcode ? this.cptcode : undefined;
      this.itemcode = this.cptcode ? childpart.find(x => x.slNo === value3)?.cpartno : null;
      if (value3 == undefined) {
        return options.inverse(this);
      } else {
        this.slNo=++itemSlno;
        return options.fn(this, this.itemcode);
      }
    })

    pdf.registerHelper('ifprtcode', function (prtcode, options) {
      const value4 = this.prtcode ? this.prtcode : undefined;
      this.itemcode = this.prtcode ? part.find(x => x.slNo === value4)?.partno : null;
      if (value4 == undefined) {
        return options.inverse(this);
      } else {
        this.slNo=++itemSlno;
        return options.fn(this, this.itemcode);
      }
    })

    pdf.registerHelper("iftotalamount", function (totalamount, options) {
      this.tAmount = 0;
      let value1 = 0;
      this.tWords = "";
      for (let i = 0; i < this.orderitem001wbs.length; i++) {
        this.tAmount += this.orderitem001wbs[i].totalamount
        value1 = this.orderitem001wbs[i].totalamount;
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

    pdf.registerHelper("ifcpttotalamount", function (cpttotalamount, options) {
      this.tAmount = 0;
      let value1 = 0;
      this.tWords = "";
      for (let i = 0; i < this.orderitem001wbs.length; i++) {
        this.tAmount += this.orderitem001wbs[i].cpttotalamount
        value1 = this.orderitem001wbs[i].cpttotalamount;
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

    pdf.registerHelper("ifcutotalamount", function (cutotalamount, options) {
      this.tAmount = 0;
      let value1 = 0;
      this.tWords = "";
      for (let i = 0; i < this.orderitem001wbs.length; i++) {
        this.tAmount += this.orderitem001wbs[i].cutotalamount
        value1 = this.orderitem001wbs[i].cutotalamount;
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

    pdf.registerHelper("ifprttotalamount", function (prttotalamount, options) {
      this.tAmount = 0;
      let value1 = 0;
      this.tWords = "";
      for (let i = 0; i < this.orderitem001wbs.length; i++) {
        this.tAmount += this.orderitem001wbs[i].prttotalamount
        value1 = this.orderitem001wbs[i].prttotalamount;
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



    var options = {
      format: "A3",
      orientation: "landscape",
      border: "10mm",
    };



    var document = {
      type: "file",
      template: html,
      context: {
        purchaseOrder: purOrders,
        itemcodes: itemcodes,
        conscodes: conscodes,
        cpartcodes: cpartcodes,
        partcodes: partcodes,
        //  puroder: puroder,
      },
      path: "./pdf/purchaseOreders.pdf",
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

  async downloadExcel(unitslno: any, @Req() request: Request, @Res() response: Response) {
    let purOrders = await this.PurchaseorderRepository.find({
      relations: ["orderitem001wbs", "suplierSlno2", "suplierSlno2.supplierSlno2", "suplierSlno2.prsno2"],
      where: { unitslno: unitslno },
      order: { slNo: "DESC" }
    });

    let orderitems = await this.orderItemRepository.find();

    let orderitem = await this.orderItemsRepository.find();

    let consumableitem = await this.consumbleRepository.find();

    let childpart = await this.childPartRepository.find();

    let part = await this.PartRepository.find();

    let supplier = await this.supplierRegRepository.find();

    let supplieraudit = await this.supplierAuditRepository.find();

    let purslip = await this.PurchasereqslipRepository.find();

    let workbook = new excel.Workbook();
    for (let i = 0; i < purOrders.length; i++) {
      let worksheet = workbook.addWorksheet("Statutory_Reports" + i);
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

      worksheet.columns.forEach((col) => {
        col.style.font = {
          size: 10,
          bold: true,
        };
        col.style.alignment = { vertical: "middle", horizontal: "center" };
        col.style.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });

      worksheet.mergeCells("A1:I1");
      worksheet.getCell("A1:I1").value = "PURCHASE ORDER";
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




      worksheet.mergeCells("A2:E2");
      worksheet.getCell("A2:E2").value = {
        richText: [
          { text: "Supplier Code:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + purOrders[i].suplierSlno2.supplierSlno2.supplierCode },
        ],
      };

      worksheet.getCell("A2:E2").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("A2:E2").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A2:E2").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("F2:G2");
      worksheet.getCell("F2:G2").value = {
        richText: [
          { text: "Supplier Name:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + purOrders[i].suplierName },
        ],
      };
      worksheet.getCell("F2:G2").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("F2:G2").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("F2:G2").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("H2:I2");
      worksheet.getCell("H2:I2").value = {
        richText: [
          { text: "Consignee No (Ship To):" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + purOrders[i].suplieraddress },
        ],
      };
      worksheet.getCell("H2:I2").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("H2:I2").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("H2:I2").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("A3:E3");
      worksheet.getCell("A3:E3").value = {
        richText: [
          { text: "PO NO:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + purOrders[i].pono },
        ],
      };
      worksheet.getCell("A3:E3").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("A3:E3").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A3:E3").alignment = {
        vertical: "top",
        horizontal: "left",
      };




      worksheet.mergeCells("F3:G3");
      worksheet.getCell("F3:G3").value = {
        richText: [
          { text: "PRS No:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + purOrders[i].suplierSlno2.prsno2.prsNo },
        ],
      };
      worksheet.getCell("F3:G3").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("F3:G3").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("F3:G3").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("H3:I3");
      worksheet.getCell("H3:I3").value = {
        richText: [
          { text: "Date:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + purOrders[i].date },
        ],
      };
      worksheet.getCell("H3:I3").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("H3:I3").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("H3:I3").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("A4:E4");
      worksheet.getCell("A4:E4").value = {
        richText: [
          { text: "Quotation No:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + purOrders[i].qno },
        ],
      };
      worksheet.getCell("A4:E4").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("A4:E4").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A4:E4").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("F4:G4");
      worksheet.getCell("F4:G4").value = {
        richText: [
          { text: "Dispached Through:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + purOrders[i].dispatchThrough },
        ],
      };
      worksheet.getCell("F4:G4").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("F4:G4").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("F4:G4").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("H4:I4");
      worksheet.getCell("H4:I4").value = {
        richText: [
          { text: "Destination:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + purOrders[i].destination },
        ],
      };
      worksheet.getCell("H4:I4").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("H4:I4").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("H4:I4").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("A5:E5");
      worksheet.getCell("A5:E5").value = {
        richText: [
          { text: "Consignee No (Ship To):" + "\n\n" },
          // { 'font': { 'size': 11, }, 'text': "\n\n" + purOrders[i]. },
        ],
      };
      worksheet.getCell("A5:E5").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("A5:E5").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A5:E5").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("F5:I5");
      worksheet.getCell("F5:I5").value = {
        richText: [
          { text: "Due On:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + purOrders[i].dueOn },
        ],
      };
      worksheet.getCell("F5:I5").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("F5:I5").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("F5:I5").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("A6:E6");
      worksheet.getCell("A6:E6").value = {
        richText: [
          { text: "Supplier (Bill From):" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + purOrders[i].supplierFrom },
        ],
      };
      worksheet.getCell("A6:E6").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("A6:E6").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A6:E6").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("F6:I6");
      worksheet.getCell("F6:I6").value = {
        richText: [
          { text: "Terms Of Delivery:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + purOrders[i].termsDelivery },
        ],
      };
      worksheet.getCell("F6:I6").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("F6:I6").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("F6:I6").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("A7");
      worksheet.getCell("A7").value = "SL No";
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
      worksheet.getCell("B7").value = "Item code";
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
      worksheet.getCell("C7").value = "Item name";
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
      worksheet.getCell("G7").value = "UnitRate";
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

      for (let j = 0; j < purOrders[i].orderitem001wbs.length; j++) {
        if (purOrders[i].orderitem001wbs[j].cucode) {
          let temp = j + 8;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value =
          j+1;
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
          worksheet.getCell("B" + temp).value = purOrders[i].orderitem001wbs[j].cucode ? consumableitem.find(x => x.slNo === purOrders[i].orderitem001wbs[j].cucode)?.consmno : "";
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
          worksheet.getCell("C" + temp).value =
            purOrders[i].orderitem001wbs[j].cuname;
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
          worksheet.getCell("D" + temp).value =
            purOrders[i].orderitem001wbs[j].cudescrip;
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
          worksheet.getCell("E" + temp).value =
            purOrders[i].orderitem001wbs[j].cuom;
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
          worksheet.getCell("F" + temp).value =
            purOrders[i].orderitem001wbs[j].chsn;
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
          worksheet.getCell("G" + temp).value =
            purOrders[i].orderitem001wbs[j].cunitrate;
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
          worksheet.getCell("H" + temp).value =
            purOrders[i].orderitem001wbs[j].cuqunty;
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
          worksheet.getCell("I" + temp).value =
            purOrders[i].orderitem001wbs[j].cutotalamount;
          worksheet.getCell("I" + temp).font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("I" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        } else if (purOrders[i].orderitem001wbs[j].cptcode) {
          let temp = j + 8;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value =
            j+1;
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
          worksheet.getCell("B" + temp).value = purOrders[i].orderitem001wbs[j].cptcode ? childpart.find(x => x.slNo === purOrders[i].orderitem001wbs[j].cptcode)?.cpartno : "";
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
          worksheet.getCell("C" + temp).value =
            purOrders[i].orderitem001wbs[j].cptname;
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
          worksheet.getCell("D" + temp).value =
            purOrders[i].orderitem001wbs[j].cptdescrip;
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
          worksheet.getCell("E" + temp).value =
            purOrders[i].orderitem001wbs[j].cptuom;
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
          worksheet.getCell("F" + temp).value =
            purOrders[i].orderitem001wbs[j].cpthsn;
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
          worksheet.getCell("G" + temp).value =
            purOrders[i].orderitem001wbs[j].cptunitrate;
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
          worksheet.getCell("H" + temp).value =
            purOrders[i].orderitem001wbs[j].cptqunty;
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
          worksheet.getCell("I" + temp).value =
            purOrders[i].orderitem001wbs[j].cpttotalamount;
          worksheet.getCell("I" + temp).font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("I" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        } else if (purOrders[i].orderitem001wbs[j].prtcode) {
          let temp = j + 8;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value =
          j+1;
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
          worksheet.getCell("B" + temp).value = purOrders[i].orderitem001wbs[j].prtcode ? part.find(x => x.slNo === purOrders[i].orderitem001wbs[j].prtcode)?.partno : "";
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
          worksheet.getCell("C" + temp).value =
            purOrders[i].orderitem001wbs[j].prtmname;
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
          worksheet.getCell("D" + temp).value =
            purOrders[i].orderitem001wbs[j].prtdescrip;
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
          worksheet.getCell("E" + temp).value =
            purOrders[i].orderitem001wbs[j].prtuom;
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
          worksheet.getCell("F" + temp).value =
            purOrders[i].orderitem001wbs[j].prthsn;
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
          worksheet.getCell("G" + temp).value =
            purOrders[i].orderitem001wbs[j].prtunitrate;
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
          worksheet.getCell("H" + temp).value =
            purOrders[i].orderitem001wbs[j].prtqunty;
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
          worksheet.getCell("I" + temp).value =
            purOrders[i].orderitem001wbs[j].prttotalamount;
          worksheet.getCell("I" + temp).font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("I" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        } else {
          let temp = j + 8;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value =
          j+1;
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
          worksheet.getCell("B" + temp).value = purOrders[i].orderitem001wbs[j].itemcode ? orderitem.find(x => x.slNo === purOrders[i].orderitem001wbs[j].itemcode)?.itemcode : "";
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
          worksheet.getCell("C" + temp).value =
            purOrders[i].orderitem001wbs[j].itemname;
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
          worksheet.getCell("D" + temp).value =
            purOrders[i].orderitem001wbs[j].descrip;
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
          worksheet.getCell("E" + temp).value =
            purOrders[i].orderitem001wbs[j].uom;
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
          worksheet.getCell("F" + temp).value =
            purOrders[i].orderitem001wbs[j].hsn;
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
          worksheet.getCell("G" + temp).value =
            purOrders[i].orderitem001wbs[j].unitrate;
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
          worksheet.getCell("H" + temp).value =
            purOrders[i].orderitem001wbs[j].qunty;
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
          worksheet.getCell("I" + temp).value =
            purOrders[i].orderitem001wbs[j].totalamount;
          worksheet.getCell("I" + temp).font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("I" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        }
      }

      let purlength = purOrders[i].orderitem001wbs.length + 8;

      for (let k = 0; k < purOrders[i].orderitem001wbs.length; k++) {
        orderitems = purOrders[i].orderitem001wbs;
      }

      let totalAmount = 0;

      for (let z = 0; z < orderitems.length; z++) {
        if (orderitems[z].cucode) {
          totalAmount = totalAmount + orderitems[z].cutotalamount;
        } else if (orderitems[z].cptcode) {
          totalAmount = totalAmount + orderitems[z].cpttotalamount;
        } else if (orderitems[z].prtcode) {
          totalAmount = totalAmount + orderitems[z].prttotalamount;
        } else {
          totalAmount = totalAmount + orderitems[z].totalamount;
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
        horizontal: "center",
      };

      let orderlength = purlength + 1;
      worksheet.getRow(orderlength).height = 150;
      let order = "A" + orderlength + ":" + "I" + orderlength;

      worksheet.mergeCells(order);
      worksheet.getCell(order).value = {
        richText: [
          { font: { size: 11 }, text: Totalwords + "\n\n" },
          { text: "Only" + "\n\n" },
          // { text: "Terms and Conditions" + "\n\n" },
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
      let sign = "A" + signlength + ":" + "D" + signlength;
      worksheet.mergeCells(sign);
      worksheet.getCell(sign).border = {
        // top: { style: 'thin' },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      let signs = "E" + signlength + ":" + "I" + signlength;
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

  async downloadExcel1(unitslno: any, id, response: Response) {
    let purOrders = await this.PurchaseorderRepository.find({
      relations: ["orderitem001wbs", "suplierSlno2", "suplierSlno2.supplierSlno2", "suplierSlno2.prsno2"],
      where: { slNo: id, unitslno: unitslno },
    });

    let orderitems = await this.orderItemRepository.find();

    let orderitem = await this.orderItemsRepository.find();

    let consumableitem = await this.consumbleRepository.find();

    let childpart = await this.childPartRepository.find();

    let part = await this.PartRepository.find();

    let supplier = await this.supplierRegRepository.find();

    let supplieraudit = await this.supplierAuditRepository.find();

    let purslip = await this.PurchasereqslipRepository.find();

    for (let i = 0; i < purOrders.length; i++) {
      orderitems = purOrders[i].orderitem001wbs;

      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet("Statutory_Reports");

      worksheet.getRow(1).height = 40;
      worksheet.getRow(2).height = 40;
      worksheet.getRow(3).height = 40;
      worksheet.getRow(4).height = 40;
      worksheet.getRow(5).height = 40;
      worksheet.getRow(6).height = 50;
      worksheet.getRow(7).height = 20;
      worksheet.getRow(8).height = 20;
      worksheet.getRow(9).height = 20;
      worksheet.getRow(10).height = 20;
      worksheet.getRow(11).height = 20;
      worksheet.getRow(12).height = 20;
      worksheet.getRow(13).height = 20;
      worksheet.getRow(14).height = 20;
      worksheet.columns = [
        { key: "A", width: 30.0 },
        { key: "B", width: 20.0 },
        { key: "C", width: 15.0 },
        { key: "D", width: 15.0 },
        { key: "E", width: 15.0 },
        { key: "F", width: 15.0 },
        { key: "G", width: 20.0 },
        { key: "H", width: 15.0 },
        { key: "I", width: 15.0 },
      ];

      worksheet.columns.forEach((col) => {
        col.style.font = {
          size: 10,
          bold: true,
        };
        col.style.alignment = { vertical: "middle", horizontal: "center" };
        col.style.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });

      worksheet.mergeCells("A1:I1");
      worksheet.getCell("A1:I1").value = "PURCHASE ORDER";
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



      worksheet.mergeCells("A2:E2");
      worksheet.getCell("A2:E2").value = {
        richText: [
          { text: "Supplier Code:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + purOrders[i].suplierSlno2.supplierSlno2.supplierCode },
        ],
      };
      worksheet.getCell("A2:E2").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("A2:E2").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A2:E2").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("F2:G2");
      worksheet.getCell("F2:G2").value = {
        richText: [
          { text: "Supplier Name:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + purOrders[i].suplierName },
        ],
      };
      worksheet.getCell("F2:G2").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("F2:G2").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("F2:G2").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("H2:I2");
      worksheet.getCell("H2:I2").value = {
        richText: [
          { text: "Consignee No (Ship To):" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + purOrders[i].suplieraddress },
        ],
      };
      worksheet.getCell("H2:I2").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("H2:I2").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("H2:I2").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("A3:E3");
      worksheet.getCell("A3:E3").value = {
        richText: [
          { text: "PO NO:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + purOrders[i].pono },
        ],
      };
      worksheet.getCell("A3:E3").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("A3:E3").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A3:E3").alignment = {
        vertical: "top",
        horizontal: "left",
      };




      worksheet.mergeCells("F3:G3");
      worksheet.getCell("F3:G3").value = {
        richText: [
          { text: "PRS No:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + purOrders[i].suplierSlno2.prsno2.prsNo },
        ],
      };
      worksheet.getCell("F3:G3").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("F3:G3").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("F3:G3").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("H3:I3");
      worksheet.getCell("H3:I3").value = {
        richText: [
          { text: "Date:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + purOrders[i].date },
        ],
      };
      worksheet.getCell("H3:I3").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("H3:I3").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("H3:I3").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("A4:E4");
      worksheet.getCell("A4:E4").value = {
        richText: [
          { text: "Quotation No:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + purOrders[i].qno },
        ],
      };
      worksheet.getCell("A4:E4").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("A4:E4").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A4:E4").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("F4:G4");
      worksheet.getCell("F4:G4").value = {
        richText: [
          { text: "Dispached Through:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + purOrders[i].dispatchThrough },
        ],
      };
      worksheet.getCell("F4:G4").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("F4:G4").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("F4:G4").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("H4:I4");
      worksheet.getCell("H4:I4").value = {
        richText: [
          { text: "Destination:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + purOrders[i].destination },
        ],
      };
      worksheet.getCell("H4:I4").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("H4:I4").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("H4:I4").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("A5:E5");
      worksheet.getCell("A5:E5").value = {
        richText: [
          { text: "Consignee No (Ship To):" + "\n\n" },
          // { 'font': { 'size': 11, }, 'text': "\n\n" + purOrders[i]. },
        ],
      };
      worksheet.getCell("A5:E5").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("A5:E5").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A5:E5").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("F5:I5");
      worksheet.getCell("F5:I5").value = {
        richText: [
          { text: "Due On:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + purOrders[i].dueOn },
        ],
      };
      worksheet.getCell("F5:I5").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("F5:I5").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("F5:I5").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("A6:E6");
      worksheet.getCell("A6:E6").value = {
        richText: [
          { text: "Supplier (Bill From):" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + purOrders[i].supplierFrom },
        ],
      };
      worksheet.getCell("A6:E6").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("A6:E6").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A6:E6").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("F6:I6");
      worksheet.getCell("F6:I6").value = {
        richText: [
          { text: "Terms Of Delivery:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + purOrders[i].termsDelivery },
        ],
      };
      worksheet.getCell("F6:I6").font = {
        size: 11,
        bold: true,
      };
      worksheet.getCell("F6:I6").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("F6:I6").alignment = {
        vertical: "top",
        horizontal: "left",
      };

      worksheet.mergeCells("A7");
      worksheet.getCell("A7").value = "SL No";
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
      worksheet.getCell("B7").value = "Item code";
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
      worksheet.getCell("C7").value = "Item name";
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
      worksheet.getCell("G7").value = "UnitRate";
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

      for (let j = 0; j < orderitems.length; j++) {
        if (orderitems[j].cucode) {
          let temp = j + 8;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value =  j+1;
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
          worksheet.getCell("B" + temp).value = orderitems[j].cucode ? consumableitem.find(x => x.slNo === orderitems[j].cucode)?.consmno : "";
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
          worksheet.getCell("C" + temp).value = orderitems[j].cuname;
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
          worksheet.getCell("D" + temp).value = orderitems[j].cudescrip;
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
          worksheet.getCell("E" + temp).value = orderitems[j].cuom;
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
          worksheet.getCell("F" + temp).value = orderitems[j].chsn;
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
          worksheet.getCell("G" + temp).value = orderitems[j].cunitrate;
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
          worksheet.getCell("H" + temp).value = orderitems[j].cuqunty;
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
          worksheet.getCell("I" + temp).value = orderitems[j].cutotalamount;
          worksheet.getCell("I" + temp).font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("I" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        } else if (orderitems[j].cptcode) {
          let temp = j + 8;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value =  j+1;
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
          worksheet.getCell("B" + temp).value = orderitems[j].cptcode ? childpart.find(x => x.slNo === orderitems[j].cptcode)?.cpartno : "";
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
          worksheet.getCell("C" + temp).value = orderitems[j].cptname;
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
          worksheet.getCell("D" + temp).value = orderitems[j].cptdescrip;
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
          worksheet.getCell("E" + temp).value = orderitems[j].cptuom;
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
          worksheet.getCell("F" + temp).value = orderitems[j].cpthsn;
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
          worksheet.getCell("G" + temp).value = orderitems[j].cptunitrate;
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
          worksheet.getCell("H" + temp).value = orderitems[j].cptqunty;
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
          worksheet.getCell("I" + temp).value = orderitems[j].cpttotalamount;
          worksheet.getCell("I" + temp).font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("I" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        } else if (orderitems[j].prtcode) {
          let temp = j + 8;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value =  j+1;
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
          worksheet.getCell("B" + temp).value = orderitems[j].prtcode ? part.find(x => x.slNo === orderitems[j].prtcode)?.partno : "";
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
          worksheet.getCell("C" + temp).value = orderitems[j].prtmname;
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
          worksheet.getCell("D" + temp).value = orderitems[j].prtdescrip;
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
          worksheet.getCell("E" + temp).value = orderitems[j].prtuom;
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
          worksheet.getCell("F" + temp).value = orderitems[j].prthsn;
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
          worksheet.getCell("G" + temp).value = orderitems[j].prtunitrate;
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
          worksheet.getCell("H" + temp).value = orderitems[j].prtqunty;
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
          worksheet.getCell("I" + temp).value = orderitems[j].prttotalamount;
          worksheet.getCell("I" + temp).font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("I" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        } else {
          let temp = j + 8;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value =  j+1;
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
          worksheet.getCell("B" + temp).value = orderitems[j].itemcode ? orderitem.find(x => x.slNo === orderitems[j].itemcode)?.itemcode : "";
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
          worksheet.getCell("C" + temp).value = orderitems[j].itemname;
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
          worksheet.getCell("D" + temp).value = orderitems[j].descrip;
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
          worksheet.getCell("E" + temp).value = orderitems[j].uom;
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
          worksheet.getCell("F" + temp).value = orderitems[j].hsn;
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
          worksheet.getCell("G" + temp).value = orderitems[j].unitrate;
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
          worksheet.getCell("H" + temp).value = orderitems[j].qunty;
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
          worksheet.getCell("I" + temp).value = orderitems[j].totalamount;
          worksheet.getCell("I" + temp).font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("I" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        }
      }

      let purlength = purOrders[i].orderitem001wbs.length + 8;

      for (let k = 0; k < purOrders[i].orderitem001wbs.length; k++) {
        orderitems = purOrders[i].orderitem001wbs;
      }

      let totalAmount = 0;

      for (let z = 0; z < orderitems.length; z++) {
        if (orderitems[z].cucode) {
          totalAmount = totalAmount + orderitems[z].cutotalamount;
        } else if (orderitems[z].cptcode) {
          totalAmount = totalAmount + orderitems[z].cpttotalamount;
        } else if (orderitems[z].prtcode) {
          totalAmount = totalAmount + orderitems[z].prttotalamount;
        } else {
          totalAmount = totalAmount + orderitems[z].totalamount;
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
        horizontal: "center",
      };

      let orderlength = purlength + 1;
      worksheet.getRow(orderlength).height = 150;
      let order = "A" + orderlength + ":" + "I" + orderlength;

      worksheet.mergeCells(order);
      worksheet.getCell(order).value = {
        richText: [
          { font: { size: 11 }, text: Totalwords + "\n\n" },
          { text: "Only" + "\n\n" },
          // { text: "Terms and Conditions" + "\n\n" },
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
      let sign = "A" + signlength + ":" + "D" + signlength;
      worksheet.mergeCells(sign);
      worksheet.getCell(sign).border = {
        // top: { style: 'thin' },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      let signs = "E" + signlength + ":" + "I" + signlength;
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
