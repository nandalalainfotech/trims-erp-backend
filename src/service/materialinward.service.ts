import { HttpException, HttpStatus, Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MaterialinwardDTO } from "src/dto/Materialinward.dto";
import { Materialinward001wb } from "src/entity/Materialinward001wb";
import { getManager, Repository } from "typeorm";

import { Response } from "express";
import { Request } from "supertest";
import { createReadStream } from "fs";
import { Materialreceiveditem001wb } from "src/entity/Materialreceiveditem001wb";
import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { Consumble001mb } from "src/entity/Consumble001mb";
import { Childpart001mb } from "src/entity/ChildPart001mb";
import { Part001mb } from "src/entity/Part001mb";
var path = require("path");
var fs = require("fs");
const excel = require("exceljs");
var pdf = require("dynamic-html-pdf");
var converter = require("number-to-words");

@Injectable()
export class MaterialinwardService {
  constructor(
    @InjectRepository(Materialinward001wb)
    private readonly MaterialinwardRepository: Repository<Materialinward001wb>,
    @InjectRepository(Materialreceiveditem001wb)
    private readonly materialreceiveditemRepository: Repository<Materialreceiveditem001wb>,
    @InjectRepository(Orderitem001mb)
    private readonly orderItemsRepository: Repository<Orderitem001mb>,
    @InjectRepository(Consumble001mb)
    private readonly consumbleRepository: Repository<Consumble001mb>,
    @InjectRepository(Childpart001mb)
    private readonly childPartRepository: Repository<Childpart001mb>,
    @InjectRepository(Part001mb)
    private readonly PartRepository: Repository<Part001mb>
  ) { }

  async create(
    materialinwardDTO: MaterialinwardDTO
  ): Promise<Materialinward001wb> {
    let materialreceiveditem001wbs: Materialreceiveditem001wb[] = [];
    for (let i = 0; i < materialinwardDTO.materialreceiveditem001wbs.length; i++) {
      let materialreceiveditem001wb = new Materialreceiveditem001wb();

      materialreceiveditem001wb.materialSlno2 = materialinwardDTO.materialreceiveditem001wbs[i].materialSlno2;
      materialreceiveditem001wb.itemcode = materialinwardDTO.materialreceiveditem001wbs[i].itemcode;
      materialreceiveditem001wb.itemname = materialinwardDTO.materialreceiveditem001wbs[i].itemname;
      materialreceiveditem001wb.qunty = materialinwardDTO.materialreceiveditem001wbs[i].qunty;
      materialreceiveditem001wb.unitrate = materialinwardDTO.materialreceiveditem001wbs[i].unitrate;
      materialreceiveditem001wb.totalamount = materialinwardDTO.materialreceiveditem001wbs[i].totalamount;
      materialreceiveditem001wb.acceptedQty = materialinwardDTO.materialreceiveditem001wbs[i].acceptedQty;
      materialreceiveditem001wb.receivedQty = materialinwardDTO.materialreceiveditem001wbs[i].receivedQty;
      materialreceiveditem001wb.rejectedQty = materialinwardDTO.materialreceiveditem001wbs[i].rejectedQty;
      materialreceiveditem001wb.outstanding = materialinwardDTO.materialreceiveditem001wbs[i].outstanding;

      materialreceiveditem001wb.descrip = materialinwardDTO.materialreceiveditem001wbs[i].descrip;
      materialreceiveditem001wb.cudescrip = materialinwardDTO.materialreceiveditem001wbs[i].cudescrip;
      materialreceiveditem001wb.cptdescrip = materialinwardDTO.materialreceiveditem001wbs[i].cptdescrip;
      materialreceiveditem001wb.prtdescrip = materialinwardDTO.materialreceiveditem001wbs[i].prtdescrip;

      materialreceiveditem001wb.cucode = materialinwardDTO.materialreceiveditem001wbs[i].cucode;
      materialreceiveditem001wb.cuname = materialinwardDTO.materialreceiveditem001wbs[i].cuname;
      materialreceiveditem001wb.cuqunty = materialinwardDTO.materialreceiveditem001wbs[i].cuqunty;
      materialreceiveditem001wb.cunitrate = materialinwardDTO.materialreceiveditem001wbs[i].cunitrate;
      materialreceiveditem001wb.cutotalamount = materialinwardDTO.materialreceiveditem001wbs[i].cutotalamount;

      materialreceiveditem001wb.cptcode = materialinwardDTO.materialreceiveditem001wbs[i].cptcode;
      materialreceiveditem001wb.cptname = materialinwardDTO.materialreceiveditem001wbs[i].cptname;
      materialreceiveditem001wb.cptqunty = materialinwardDTO.materialreceiveditem001wbs[i].cptqunty;
      materialreceiveditem001wb.cptunitrate = materialinwardDTO.materialreceiveditem001wbs[i].cptunitrate;
      materialreceiveditem001wb.cpttotalamount = materialinwardDTO.materialreceiveditem001wbs[i].cpttotalamount;

      materialreceiveditem001wb.prtcode = materialinwardDTO.materialreceiveditem001wbs[i].prtcode;
      materialreceiveditem001wb.prtmname = materialinwardDTO.materialreceiveditem001wbs[i].prtmname;
      materialreceiveditem001wb.prtqunty = materialinwardDTO.materialreceiveditem001wbs[i].prtqunty;
      materialreceiveditem001wb.prtunitrate = materialinwardDTO.materialreceiveditem001wbs[i].prtunitrate;
      materialreceiveditem001wb.prttotalamount = materialinwardDTO.materialreceiveditem001wbs[i].prttotalamount;

      materialreceiveditem001wb.cureceivedQty = materialinwardDTO.materialreceiveditem001wbs[i].cureceivedQty;
      materialreceiveditem001wb.cuacceptedQty = materialinwardDTO.materialreceiveditem001wbs[i].cuacceptedQty;
      materialreceiveditem001wb.curejectedQty = materialinwardDTO.materialreceiveditem001wbs[i].curejectedQty;
      materialreceiveditem001wb.cuoutstanding = materialinwardDTO.materialreceiveditem001wbs[i].cuoutstanding;

      materialreceiveditem001wb.cptreceivedQty = materialinwardDTO.materialreceiveditem001wbs[i].cptreceivedQty;
      materialreceiveditem001wb.cptacceptedQty = materialinwardDTO.materialreceiveditem001wbs[i].cptacceptedQty;
      materialreceiveditem001wb.cptrejectedQty = materialinwardDTO.materialreceiveditem001wbs[i].cptrejectedQty;
      materialreceiveditem001wb.cptoutstanding = materialinwardDTO.materialreceiveditem001wbs[i].cptoutstanding;

      materialreceiveditem001wb.prtreceivedQty = materialinwardDTO.materialreceiveditem001wbs[i].prtreceivedQty;
      materialreceiveditem001wb.prtacceptedQty = materialinwardDTO.materialreceiveditem001wbs[i].prtacceptedQty;
      materialreceiveditem001wb.prtrejectedQty = materialinwardDTO.materialreceiveditem001wbs[i].prtrejectedQty;
      materialreceiveditem001wb.prtoutstanding = materialinwardDTO.materialreceiveditem001wbs[i].prtoutstanding;

      materialreceiveditem001wb.unitslno = materialinwardDTO.unitslno;
      materialreceiveditem001wb.insertUser = materialinwardDTO.insertUser;
      materialreceiveditem001wb.insertDatetime = materialinwardDTO.insertDatetime;
      let orderitem = await this.materialreceiveditemRepository.save(materialreceiveditem001wb);
      materialreceiveditem001wbs.push(orderitem);
    }

    if (materialreceiveditem001wbs.length > 0) {
      const materialinward001wb = new Materialinward001wb();
      materialinward001wb.setProperties(materialinwardDTO);
      materialinward001wb.materialreceiveditem001wbs = materialreceiveditem001wbs;
      await this.MaterialinwardRepository.save(materialinward001wb);
      return materialinward001wb;
    } else {
      throw new HttpException('Please Enter Item Details', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(materialinwardDTO: MaterialinwardDTO): Promise<Materialinward001wb> {
    for (let i = 0; i < materialinwardDTO.materialreceiveditem001wbs.length; i++) {
      let materialreceiveditem001wb = new Materialreceiveditem001wb();

      materialreceiveditem001wb.acceptedQty = materialinwardDTO.materialreceiveditem001wbs[i].acceptedQty;
      materialreceiveditem001wb.receivedQty = materialinwardDTO.materialreceiveditem001wbs[i].receivedQty;
      materialreceiveditem001wb.rejectedQty = materialinwardDTO.materialreceiveditem001wbs[i].rejectedQty;
      materialreceiveditem001wb.outstanding = materialinwardDTO.materialreceiveditem001wbs[i].outstanding;

      materialreceiveditem001wb.cureceivedQty = materialinwardDTO.materialreceiveditem001wbs[i].cureceivedQty;
      materialreceiveditem001wb.cuacceptedQty = materialinwardDTO.materialreceiveditem001wbs[i].cuacceptedQty;
      materialreceiveditem001wb.curejectedQty = materialinwardDTO.materialreceiveditem001wbs[i].curejectedQty;
      materialreceiveditem001wb.cuoutstanding = materialinwardDTO.materialreceiveditem001wbs[i].cuoutstanding;

      materialreceiveditem001wb.cptreceivedQty = materialinwardDTO.materialreceiveditem001wbs[i].cptreceivedQty;
      materialreceiveditem001wb.cptacceptedQty = materialinwardDTO.materialreceiveditem001wbs[i].cptacceptedQty;
      materialreceiveditem001wb.cptrejectedQty = materialinwardDTO.materialreceiveditem001wbs[i].cptrejectedQty;
      materialreceiveditem001wb.cptoutstanding = materialinwardDTO.materialreceiveditem001wbs[i].cptoutstanding;

      materialreceiveditem001wb.prtreceivedQty = materialinwardDTO.materialreceiveditem001wbs[i].prtreceivedQty;
      materialreceiveditem001wb.prtacceptedQty = materialinwardDTO.materialreceiveditem001wbs[i].prtacceptedQty;
      materialreceiveditem001wb.prtrejectedQty = materialinwardDTO.materialreceiveditem001wbs[i].prtrejectedQty;
      materialreceiveditem001wb.prtoutstanding = materialinwardDTO.materialreceiveditem001wbs[i].prtoutstanding;

      materialreceiveditem001wb.unitslno = materialinwardDTO.unitslno;
      materialreceiveditem001wb.updatedUser = materialinwardDTO.updatedUser;
      materialreceiveditem001wb.updatedDatetime = materialinwardDTO.updatedDatetime;
      await this.materialreceiveditemRepository.update({ materialSlno: materialinwardDTO.materialreceiveditem001wbs[i].materialSlno }, materialreceiveditem001wb);

    }
    const materialinward001wb = new Materialinward001wb();
    materialinward001wb.setProperties(materialinwardDTO);
    await this.MaterialinwardRepository.update({ slNo: materialinward001wb.slNo }, materialinward001wb);
    return materialinward001wb;

  }

  async UpdateMaterialinward(approvel: any, materialSlno: any, remarks: any): Promise<Materialinward001wb> {
    let materialinward001wb = new Materialinward001wb();
    materialinward001wb.status = approvel;
    materialinward001wb.remarks = remarks;
    materialinward001wb.updatedDatetime = new Date();
    await this.MaterialinwardRepository.update({ slNo: materialSlno }, materialinward001wb);
    return materialinward001wb;
  }

  async findAll(unitslno: any): Promise<Materialinward001wb[]> {
    return this.MaterialinwardRepository.find({
      relations: ["materialreceiveditem001wbs", "purchseSlno2"],
      order: { slNo: "DESC" },
      where: { unitslno: unitslno },
    });
  }

  async getCount(): Promise<string> {
    const entityManager = getManager();
    let result = await getManager().query("select count(*) as row from materialinward001wb", ["row"]);
    var string = JSON.stringify(result);
    return string;
  }

  findOne(id: number): Promise<Materialinward001wb> {
    return this.MaterialinwardRepository.findOne({
      relations: ["materialreceiveditem001wbs"],
      where: { slNo: id },
    });
  }

  async remove(id: string): Promise<void> {
    await this.MaterialinwardRepository.delete(id);
  }

  async downloadPdf(unitslno: any, @Req() request: Request, @Res() response: Response) {
    let materialinward = await this.MaterialinwardRepository.find({
      relations: ["materialreceiveditem001wbs", "purchseSlno2"],
      where: { unitslno: unitslno },
      order: { slNo: "DESC" }
    });

    let ordeitem = await this.orderItemsRepository.find();

    let consumableitem = await this.consumbleRepository.find();

    let childpart = await this.childPartRepository.find();

    let part = await this.PartRepository.find();
   
    let itemslno = 0;
    var fs = require("fs");
    var pdf = require("dynamic-html-pdf");
    var html = fs.readFileSync("materialinwards.html", "utf8");
  

    var options = {
      format: "A3",
      orientation: "landscape",
      border: "10mm",
    };

    await pdf.registerHelper("ifitemslno", function (orderslno, options) {
      itemslno =0
      this.slNo =itemslno;
      return options.fn(this,this.slNo);
    });

    pdf.registerHelper("iforderslno", function (orderslno, options) {
     
      const value1 = this.itemcode ? this.itemcode : undefined;
      this.itemcode = this.itemcode ? ordeitem.find(x => x.slNo === value1)?.itemcode : null;
     if (value1 == undefined) {
        return options.inverse(this);
      } else {
        this.slNo = ++itemslno
        return options.fn(this, this.itemcode);
      }
    });
    pdf.registerHelper("ifcucode", function (cucode, options) {
      const value2 = this.cucode ? this.cucode : undefined;
      this.itemcode = this.cucode ? consumableitem.find(x => x.slNo === value2)?.consmno : null;
      let consumslno = 0;
      if (value2 == undefined) {
        return options.inverse(this);
      } else {
        this.slNo = ++itemslno;
        return options.fn(this, this.itemcode);
      }
    });

    pdf.registerHelper("ifcptcode", function (cptcode, options) {
      const value3 = this.cptcode ? this.cptcode : undefined;
      this.itemcode = this.cptcode ? childpart.find(x => x.slNo === value3)?.cpartno : null;
      let childslno = 0;
      if (value3 == undefined) {
        
        return options.inverse(this);
      } else {
        this.slNo = ++itemslno
      return options.fn(this, this.itemcode);
      }
    });

    pdf.registerHelper("ifprtcode", function (prtcode, options) {
      const value4 = this.prtcode ? this.prtcode : undefined;
      this.itemcode = this.prtcode ? part.find(x => x.slNo === value4)?.partno : null;
      let partlno = 0;
      if (value4 == undefined) {
        return options.inverse(this);
      } else {
        this.slNo = ++itemslno
        return options.fn(this, this.itemcode);
      }
    });

    pdf.registerHelper("iftotalamount", function (totalamount, options) {
      this.tAmount = 0;
      let value1 = 0;
      this.tWords = "";
      for (let i = 0; i < this.materialreceiveditem001wbs.length; i++) {
        this.tAmount += this.materialreceiveditem001wbs[i].totalamount
        value1 = this.materialreceiveditem001wbs[i].totalamount;
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
      for (let i = 0; i < this.materialreceiveditem001wbs.length; i++) {
        this.tAmount += this.materialreceiveditem001wbs[i].cpttotalamount
        value1 = this.materialreceiveditem001wbs[i].cpttotalamount;
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
      for (let i = 0; i < this.materialreceiveditem001wbs.length; i++) {
        this.tAmount += this.materialreceiveditem001wbs[i].cutotalamount
        value1 = this.materialreceiveditem001wbs[i].cutotalamount;
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
      for (let i = 0; i < this.materialreceiveditem001wbs.length; i++) {
        this.tAmount += this.materialreceiveditem001wbs[i].prttotalamount
        value1 = this.materialreceiveditem001wbs[i].prttotalamount;
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



    var document = {
      type: "file", // 'file' or 'buffer'
      template: html,
      context: {
        Materialinward: materialinward,
      },
      path: "./pdf/materialinward.pdf", // it is not required if type is buffer
    };

    if (document === null) {
      return null;
    } else {
      pdf
        .create(document, options)
        .then((pathRes) => {
          const filestream = createReadStream(pathRes.filename);
          response.writeHead(200, {
            "Content-Disposition":
              "attachment;filename=" + "materialinward.pdf",
            "Content-Type": "application/pdf",
          });
          filestream.pipe(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  async downloadIDPdf(unitslno: any, id: any, response: Response) {
    let materialinward = await this.MaterialinwardRepository.find({
      where: { slNo: id, unitslno: unitslno },
      relations: ["materialreceiveditem001wbs", "purchseSlno2"],
    });

    let ordeitem = await this.orderItemsRepository.find();

    let consumableitem = await this.consumbleRepository.find();

    let childpart = await this.childPartRepository.find();

    let part = await this.PartRepository.find();

    let materialinwarditem: Materialreceiveditem001wb[] = [];

    let totalAmount = 0;

    for (let i = 0; i < materialinward.length; i++) {
      for (
        let j = 0;
        j < materialinward[i].materialreceiveditem001wbs.length;
        j++
      ) {
        materialinwarditem.push(
          materialinward[i].materialreceiveditem001wbs[j]
        );
        totalAmount +=
          materialinward[i].materialreceiveditem001wbs[j].totalamount;
        totalAmount +=
          materialinward[i].materialreceiveditem001wbs[j].cutotalamount;
        totalAmount +=
          materialinward[i].materialreceiveditem001wbs[j].cpttotalamount;
        totalAmount +=
          materialinward[i].materialreceiveditem001wbs[j].prttotalamount;
      }
    }


    let totalwords = converter.toWords(totalAmount);
    let Totalwords = totalwords.toUpperCase();

    var fs = require("fs");
    var pdf = require("dynamic-html-pdf");
    var html = fs.readFileSync("materialinward.html", "utf8");
    let regslno = 0;
    pdf.registerHelper('iforderslno', function (itemcode, options) {
      if (this.itemcode) {
        this.itemcode = this.itemcode ? ordeitem.find(x => x.slNo === this.itemcode)?.itemcode : null;
        this.slNo = ++regslno
        return options.fn(this, this.itemcode);
      } else {
        return options.inverse(this);
      }
    });

    pdf.registerHelper('ifcucode', function (cucode, options) {
      if (this.cucode) {
        this.cucode = this.cucode ? consumableitem.find(x => x.slNo === this.cucode)?.consmno : null;
        this.slNo = ++regslno
        return options.fn(this, this.cucode);
      } else {
        return options.inverse(this);
      }

    });

    pdf.registerHelper('ifcptcode', function (cptcode, options) {
      if (this.cptcode) {
        this.cptcode = this.cptcode ? childpart.find(x => x.slNo === this.cptcode)?.cpartno : null;
        this.slNo = ++regslno
        return options.fn(this, this.cptcode);
      } else {
        return options.inverse(this);
      }
    });

    pdf.registerHelper('ifprtcode', function (prtcode, options) {
      if (this.prtcode) {
        this.prtcode = this.prtcode ? part.find(x => x.slNo === this.prtcode)?.partno : null;
        this.slNo = ++regslno
        return options.fn(this, this.prtcode);
      } else {
        return options.inverse(this);
      }
    });

    var options = {
      format: "A3",
      orientation: "landscape",
      border: "10mm",
    };

    var document = {
      type: "file", // 'file' or 'buffer'
      template: html,
      context: {
        Materialinward: materialinward,
        Materialinwarditem: materialinwarditem,
        totalAmount: totalAmount,
        Totalwords: Totalwords,
      },
      path: "./pdf/materialinward.pdf", // it is not required if type is buffer
    };

    if (document === null) {
      return null;
    } else {
      pdf
        .create(document, options)
        .then((pathRes) => {
          const filestream = createReadStream(pathRes.filename);
          response.writeHead(200, {
            "Content-Disposition":
              "attachment;filename=" + "materialinward.pdf",
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
    let materialinward = await this.MaterialinwardRepository.find({
      relations: ["materialreceiveditem001wbs", "purchseSlno2"],
      where: { unitslno: unitslno },
      order: { slNo: "DESC" }
    });
    let materialinwarditem = await this.materialreceiveditemRepository.find();
    let ordeitem = await this.orderItemsRepository.find();
    let consumableitem = await this.consumbleRepository.find();
    let childpart = await this.childPartRepository.find();
    let part = await this.PartRepository.find();

    let workbook = new excel.Workbook();

    for (let i = 0; i < materialinward.length; i++) {
      let worksheet = workbook.addWorksheet("Material-Inward-Reports" + i + 1); // creating worksheet
      worksheet.getRow(1).height = 25;
      worksheet.getRow(2).height = 25;
      worksheet.getRow(3).height = 25;
      worksheet.getRow(4).height = 25;
      worksheet.getRow(5).height = 25;
      worksheet.getRow(6).height = 25;
      worksheet.getRow(7).height = 25;
      worksheet.getRow(8).height = 25;
      worksheet.getRow(9).height = 25;
      worksheet.getRow(10).height = 25;
      worksheet.getRow(11).height = 25;
      worksheet.getRow(12).height = 25;
      worksheet.getRow(13).height = 25;
      worksheet.getRow(14).height = 25;
      worksheet.columns = [
        { key: "A", width: 20.0 },
        { key: "B", width: 20.0 },
        { key: "C", width: 20.0 },
        { key: "D", width: 20.0 },
        { key: "E", width: 20.0 },
        { key: "F", width: 25.0 },
        { key: "G", width: 25.0 },
        { key: "H", width: 25.0 },
        { key: "I", width: 25.0 },
        { key: "J", width: 25.0 },
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

      worksheet.mergeCells("A1:J1");
      worksheet.getCell("A1:J1").value = "SRINIVASA ENTERPRISES";
      worksheet.getCell("A1:J1").font = {
        size: 18,
        bold: true,
      };
      worksheet.getCell("A1:J1").alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      worksheet.mergeCells("A2:J2");
      worksheet.getCell("A2:J2").value = "MATERIAL INWARD RECORD";
      worksheet.getCell("A2:J2").font = {
        size: 16,
        bold: true,
      };
      worksheet.getCell("A2:J2").alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      worksheet.mergeCells("A3:C3");
      worksheet.getCell("A3:C3").value = {
        richText: [
          { text: "DC NO:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + materialinward[i].dcNo },
        ],
      };
      worksheet.getCell("A3:C3").font = {
        size: 16,
        bold: true,
      };
      worksheet.getCell("A3:C3").alignment = {
        vertical: "middle",
        horizontal: "left",
      };

      worksheet.mergeCells("D3:F3");
      worksheet.getCell("D3:F3").value = {
        richText: [
          { text: "Invoice No:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + materialinward[i].invoiceno },
        ],
      };
      worksheet.getCell("D3:F3").font = {
        size: 16,
        bold: true,
      };
      worksheet.getCell("D3:F3").alignment = {
        vertical: "middle",
        horizontal: "left",
      };

      worksheet.mergeCells("G3:J3");
      worksheet.getCell("G3:J3").value = {
        richText: [
          { text: "DC Date:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + materialinward[i].dcDate },
        ],
      };
      worksheet.getCell("G3:J3").font = {
        size: 16,
        bold: true,
      };
      worksheet.getCell("G3:J3").alignment = {
        vertical: "middle",
        horizontal: "left",
      };

      worksheet.mergeCells("A4:C4");
      worksheet.getCell("A4:C4").value = {
        richText: [
          { text: "PO NO:" + "\n\n" },
          {
            font: { size: 11 },
            text: "\n\n" + materialinward[i].purchseSlno2.pono,
          },
        ],
      };
      worksheet.getCell("A4:C4").font = {
        size: 16,
        bold: true,
      };
      worksheet.getCell("A4:C4").alignment = {
        vertical: "middle",
        horizontal: "left",
      };

      worksheet.mergeCells("D4:F4");
      worksheet.getCell("D4:F4").value = {
        richText: [
          { text: "Supplier Name:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + materialinward[i].supliername },
        ],
      };
      worksheet.getCell("D4:F4").font = {
        size: 16,
        bold: true,
      };
      worksheet.getCell("D4:F4").alignment = {
        vertical: "middle",
        horizontal: "left",
      };

      worksheet.mergeCells("G4:J4");
      worksheet.getCell("G4:J4").value = {
        richText: [
          { text: "Goods Recieved No:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + materialinward[i].grn },
        ],
      };
      worksheet.getCell("G4:J4").font = {
        size: 16,
        bold: true,
      };
      worksheet.getCell("G4:J4").alignment = {
        vertical: "middle",
        horizontal: "left",
      };

      worksheet.mergeCells("A5");
      worksheet.getCell("A5").value = "SL No";
      worksheet.getCell("A5").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("A5").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("B5");
      worksheet.getCell("B5").value = "Item code";
      worksheet.getCell("B5").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("B5").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("C5");
      worksheet.getCell("C5").value = "Item name";
      worksheet.getCell("C5").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("C5").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("D5");
      worksheet.getCell("D5").value = "UnitRate";
      worksheet.getCell("D5").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("D5").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("E5");
      worksheet.getCell("E5").value = "Quantity";
      worksheet.getCell("E5").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("E5").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("F5");
      worksheet.getCell("F5").value = "Received Quantity";
      worksheet.getCell("F5").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("F5").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("G5");
      worksheet.getCell("G5").value = "Accepted Quantity";
      worksheet.getCell("G5").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("G5").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("H5");
      worksheet.getCell("H5").value = "Rejected Quantity";
      worksheet.getCell("H5").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("H5").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("I5");
      worksheet.getCell("I5").value = "Outstanding Quantity";
      worksheet.getCell("I5").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("I5").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("J5");
      worksheet.getCell("J5").value = "Total Amount";
      worksheet.getCell("J5").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("J5").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      for (let j = 0; j < materialinward[i].materialreceiveditem001wbs.length; j++) {
        if (materialinward[i].materialreceiveditem001wbs[j].cucode) {
          let temp = j + 6;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value =
            j + 1;
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
          worksheet.getCell("B" + temp).value = materialinward[i].materialreceiveditem001wbs[j].cucode ? consumableitem.find(x => x.slNo === materialinward[i].materialreceiveditem001wbs[j].cucode)?.consmno : "";
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
            materialinward[i].materialreceiveditem001wbs[j].cuname;
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
            materialinward[i].materialreceiveditem001wbs[j].cunitrate;
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
            materialinward[i].materialreceiveditem001wbs[j].cuqunty;
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
            materialinward[i].materialreceiveditem001wbs[j].cureceivedQty;
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
            materialinward[i].materialreceiveditem001wbs[j].cuacceptedQty;
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
            materialinward[i].materialreceiveditem001wbs[j].curejectedQty;
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
            materialinward[i].materialreceiveditem001wbs[j].cuoutstanding;
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
          worksheet.getCell("J" + temp).value =
            materialinward[i].materialreceiveditem001wbs[j].cutotalamount;
          worksheet.getCell("J" + temp).font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("J" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        } else if (materialinward[i].materialreceiveditem001wbs[j].cptcode) {
          let temp = j + 6;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value =
            j + 1;
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
          worksheet.getCell("B" + temp).value = materialinward[i].materialreceiveditem001wbs[j].cptcode ? childpart.find(x => x.slNo === materialinward[i].materialreceiveditem001wbs[j].cptcode)?.cpartno : "";
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
            materialinward[i].materialreceiveditem001wbs[j].cptname;
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
            materialinward[i].materialreceiveditem001wbs[j].cptunitrate;
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
            materialinward[i].materialreceiveditem001wbs[j].cptqunty;
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
            materialinward[i].materialreceiveditem001wbs[j].cptreceivedQty;
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
            materialinward[i].materialreceiveditem001wbs[j].cptacceptedQty;
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
            materialinward[i].materialreceiveditem001wbs[j].cptrejectedQty;
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
            materialinward[i].materialreceiveditem001wbs[j].cptoutstanding;
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
          worksheet.getCell("J" + temp).value =
            materialinward[i].materialreceiveditem001wbs[j].cpttotalamount;
          worksheet.getCell("J" + temp).font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("J" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        } else if (materialinward[i].materialreceiveditem001wbs[j].prtcode) {
          let temp = j + 6;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value =
            j + 1;
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
          worksheet.getCell("B" + temp).value = materialinward[i].materialreceiveditem001wbs[j].prtcode ? part.find(x => x.slNo === materialinward[i].materialreceiveditem001wbs[j].prtcode)?.partno : "";
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
            materialinward[i].materialreceiveditem001wbs[j].prtmname;
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
            materialinward[i].materialreceiveditem001wbs[j].prtunitrate;
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
            materialinward[i].materialreceiveditem001wbs[j].prtqunty;
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
            materialinward[i].materialreceiveditem001wbs[j].prtreceivedQty;
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
            materialinward[i].materialreceiveditem001wbs[j].prtacceptedQty;
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
            materialinward[i].materialreceiveditem001wbs[j].prtrejectedQty;
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
            materialinward[i].materialreceiveditem001wbs[j].prtoutstanding;
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
          worksheet.getCell("J" + temp).value =
            materialinward[i].materialreceiveditem001wbs[j].prttotalamount;
          worksheet.getCell("J" + temp).font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("J" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        } else {
          let temp = j + 6;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value =
            j + 1;
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
          worksheet.getCell("B" + temp).value = materialinward[i].materialreceiveditem001wbs[j].itemcode ? ordeitem.find(x => x.slNo === materialinward[i].materialreceiveditem001wbs[j].itemcode)?.itemcode : "";
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
            materialinward[i].materialreceiveditem001wbs[j].itemname;
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
            materialinward[i].materialreceiveditem001wbs[j].unitrate;
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
            materialinward[i].materialreceiveditem001wbs[j].qunty;
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
            materialinward[i].materialreceiveditem001wbs[j].receivedQty;
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
            materialinward[i].materialreceiveditem001wbs[j].acceptedQty;
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
            materialinward[i].materialreceiveditem001wbs[j].rejectedQty;
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
            materialinward[i].materialreceiveditem001wbs[j].outstanding;
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
          worksheet.getCell("J" + temp).value =
            materialinward[i].materialreceiveditem001wbs[j].totalamount;
          worksheet.getCell("J" + temp).font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("J" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        }
      }

      let purlength = materialinward[i].materialreceiveditem001wbs.length + 6;

      for (let k = 0; k < materialinward[i].materialreceiveditem001wbs.length; k++) {
        materialinwarditem = materialinward[i].materialreceiveditem001wbs;
      }

      let totalAmount = 0;

      for (let z = 0; z < materialinwarditem.length; z++) {
        if (materialinwarditem[z].cucode) {
          totalAmount = totalAmount + materialinwarditem[z].cutotalamount;
        } else if (materialinwarditem[z].cptcode) {
          totalAmount = totalAmount + materialinwarditem[z].cpttotalamount;
        } else if (materialinwarditem[z].prtcode) {
          totalAmount = totalAmount + materialinwarditem[z].prttotalamount;
        } else {
          totalAmount = totalAmount + materialinwarditem[z].totalamount;
        }
      }

      let totalwords = converter.toWords(totalAmount);
      let Totalwords = totalwords.toUpperCase();

      worksheet.mergeCells("I" + purlength);
      worksheet.getCell("I" + purlength).value = "Total";
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
      worksheet.getCell("I" + purlength).font = {
        size: 11,
      };

      worksheet.mergeCells("J" + purlength);
      worksheet.getCell("J" + purlength).value = totalAmount;
      worksheet.getCell("J" + purlength).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("J" + purlength).alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      let orderlength = purlength + 1;
      worksheet.getRow(orderlength).height = 150;
      let order = "A" + orderlength + ":" + "J" + orderlength;

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
      let sign = "A" + signlength + ":" + "E" + signlength;
      worksheet.mergeCells(sign);
      worksheet.getCell(sign).border = {
        // top: { style: 'thin' },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      let signs = "F" + signlength + ":" + "J" + signlength;
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

  async downloadIDExcel(unitslno: any, id, response: Response) {
    let materialinward = await this.MaterialinwardRepository.find({
      where: { slNo: id, unitslno: unitslno },
      relations: ["materialreceiveditem001wbs", "purchseSlno2"],
    });
    let materialinwarditem = await this.materialreceiveditemRepository.find();
    let ordeitem = await this.orderItemsRepository.find();
    let consumableitem = await this.consumbleRepository.find();
    let childpart = await this.childPartRepository.find();
    let part = await this.PartRepository.find();

    for (let i = 0; i < materialinward.length; i++) {
      materialinwarditem = materialinward[i].materialreceiveditem001wbs;

      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet("Material-Inward-Reports" + i + 1); // creating worksheet
      worksheet.getRow(3).height = 50;
      worksheet.getRow(4).height = 30;
      worksheet.getRow(5).height = 30;
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
        { key: "A", width: 20.0 },
        { key: "B", width: 25.0 },
        { key: "C", width: 25.0 },
        { key: "D", width: 25.0 },
        { key: "E", width: 20.0 },
        { key: "F", width: 25.0 },
        { key: "G", width: 25.0 },
        { key: "H", width: 25.0 },
        { key: "I", width: 25.0 },
        { key: "j", width: 25.0 },
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

      worksheet.mergeCells("A1:J1");
      worksheet.getCell("A1:J1").value = "SRINIVASA ENTERPRISES";
      worksheet.getCell("A1:J1").font = {
        size: 18,
        bold: true,
      };
      worksheet.getCell("A1:J1").alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      worksheet.mergeCells("A2:J2");
      worksheet.getCell("A2:J2").value = "MATERIAL INWARD RECORD";
      worksheet.getCell("A2:J2").font = {
        size: 16,
        bold: true,
      };
      worksheet.getCell("A2:J2").alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      worksheet.mergeCells("A3:C3");
      worksheet.getCell("A3:C3").value = {
        richText: [
          { text: "DC NO:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + materialinward[i].dcNo },
        ],
      };
      worksheet.getCell("A3:C3").font = {
        size: 16,
        bold: true,
      };
      worksheet.getCell("A3:C3").alignment = {
        vertical: "middle",
        horizontal: "left",
      };

      worksheet.mergeCells("D3:F3");
      worksheet.getCell("D3:F3").value = {
        richText: [
          { text: "Invoice No:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + materialinward[i].invoiceno },
        ],
      };
      worksheet.getCell("D3:F3").font = {
        size: 16,
        bold: true,
      };
      worksheet.getCell("D3:F3").alignment = {
        vertical: "middle",
        horizontal: "left",
      };

      worksheet.mergeCells("G3:J3");
      worksheet.getCell("G3:J3").value = {
        richText: [
          { text: "DC Date:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + materialinward[i].dcDate },
        ],
      };
      worksheet.getCell("G3:J3").font = {
        size: 16,
        bold: true,
      };
      worksheet.getCell("G3:J3").alignment = {
        vertical: "middle",
        horizontal: "left",
      };

      worksheet.mergeCells("A4:C4");
      worksheet.getCell("A4:C4").value = {
        richText: [
          { text: "PO NO:" + "\n\n" },
          {
            font: { size: 11 },
            text: "\n\n" + materialinward[i].purchseSlno2.pono,
          },
        ],
      };
      worksheet.getCell("A4:C4").font = {
        size: 16,
        bold: true,
      };
      worksheet.getCell("A4:C4").alignment = {
        vertical: "middle",
        horizontal: "left",
      };

      worksheet.mergeCells("D4:F4");
      worksheet.getCell("D4:F4").value = {
        richText: [
          { text: "Supplier Name:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + materialinward[i].supliername },
        ],
      };
      worksheet.getCell("D4:F4").font = {
        size: 16,
        bold: true,
      };
      worksheet.getCell("D4:F4").alignment = {
        vertical: "middle",
        horizontal: "left",
      };

      worksheet.mergeCells("G4:J4");
      worksheet.getCell("G4:J4").value = {
        richText: [
          { text: "Goods Recieved No:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + materialinward[i].grn },
        ],
      };
      worksheet.getCell("G4:J4").font = {
        size: 16,
        bold: true,
      };
      worksheet.getCell("G4:J4").alignment = {
        vertical: "middle",
        horizontal: "left",
      };

      worksheet.mergeCells("A5");
      worksheet.getCell("A5").value = "SL No";
      worksheet.getCell("A5").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("A5").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("B5");
      worksheet.getCell("B5").value = "Item code";
      worksheet.getCell("B5").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("B5").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("C5");
      worksheet.getCell("C5").value = "Item name";
      worksheet.getCell("C5").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("C5").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("D5");
      worksheet.getCell("D5").value = "UnitRate";
      worksheet.getCell("D5").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("D5").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("E5");
      worksheet.getCell("E5").value = "Quantity";
      worksheet.getCell("E5").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("E5").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("F5");
      worksheet.getCell("F5").value = "Received Quantity";
      worksheet.getCell("F5").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("F5").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("G5");
      worksheet.getCell("G5").value = "Accepted Quantity";
      worksheet.getCell("G5").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("G5").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("H5");
      worksheet.getCell("H5").value = "Rejected Quantity";
      worksheet.getCell("H5").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("H5").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("I5");
      worksheet.getCell("I5").value = "Outstanding Quantity";
      worksheet.getCell("I5").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("I5").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      worksheet.mergeCells("J5");
      worksheet.getCell("J5").value = "Total Amount";
      worksheet.getCell("J5").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("J5").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      for (let j = 0; j < materialinwarditem.length; j++) {
        if (materialinwarditem[j].cucode) {
          let temp = j + 6;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value = j + 1;
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
          worksheet.getCell("B" + temp).value = materialinwarditem[j].cucode ? consumableitem.find(x => x.slNo === materialinwarditem[j].cucode)?.consmno : "";
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
          worksheet.getCell("C" + temp).value = materialinwarditem[j].cuname;
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
          worksheet.getCell("D" + temp).value = materialinwarditem[j].cunitrate;
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
          worksheet.getCell("E" + temp).value = materialinwarditem[j].cuqunty;
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
            materialinwarditem[j].cureceivedQty;
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
            materialinwarditem[j].cuacceptedQty;
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
            materialinwarditem[j].curejectedQty;
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
            materialinwarditem[j].cuoutstanding;
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
          worksheet.getCell("J" + temp).value =
            materialinwarditem[j].cutotalamount;
          worksheet.getCell("J" + temp).font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("J" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        } else if (materialinwarditem[j].cptcode) {
          let temp = j + 6;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value =
            j + 1;
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
          worksheet.getCell("B" + temp).value = materialinwarditem[j].cptcode ? childpart.find(x => x.slNo === materialinwarditem[j].cptcode)?.cpartno : "";
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
          worksheet.getCell("C" + temp).value = materialinwarditem[j].cptname;
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
            materialinwarditem[j].cptunitrate;
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
          worksheet.getCell("E" + temp).value = materialinwarditem[j].cptqunty;
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
            materialinwarditem[j].cptreceivedQty;
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
            materialinwarditem[j].cptacceptedQty;
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
            materialinwarditem[j].cptrejectedQty;
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
            materialinwarditem[j].cptoutstanding;
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
          worksheet.getCell("J" + temp).value =
            materialinwarditem[j].cpttotalamount;
          worksheet.getCell("J" + temp).font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("J" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        } else if (materialinwarditem[j].prtcode) {
          let temp = j + 6;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value = j + 1;
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
          worksheet.getCell("B" + temp).value = materialinwarditem[j].prtcode ? part.find(x => x.slNo === materialinwarditem[j].prtcode)?.partno : "";
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
          worksheet.getCell("C" + temp).value = materialinwarditem[j].prtmname;
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
            materialinwarditem[j].prtunitrate;
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
          worksheet.getCell("E" + temp).value = materialinwarditem[j].prtqunty;
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
            materialinwarditem[j].prtreceivedQty;
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
            materialinwarditem[j].prtacceptedQty;
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
            materialinwarditem[j].prtrejectedQty;
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
            materialinwarditem[j].prtoutstanding;
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
          worksheet.getCell("J" + temp).value =
            materialinwarditem[j].prttotalamount;
          worksheet.getCell("J" + temp).font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("J" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        } else {
          let temp = j + 6;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value = j + 1;
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
          worksheet.getCell("B" + temp).value = materialinwarditem[j].itemcode ? ordeitem.find(x => x.slNo === materialinwarditem[j].itemcode)?.itemcode : "";
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
          worksheet.getCell("C" + temp).value = materialinwarditem[j].itemname;
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
          worksheet.getCell("D" + temp).value = materialinwarditem[j].unitrate;
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
          worksheet.getCell("E" + temp).value = materialinwarditem[j].qunty;
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
            materialinwarditem[j].receivedQty;
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
            materialinwarditem[j].acceptedQty;
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
            materialinwarditem[j].rejectedQty;
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
            materialinwarditem[j].outstanding;
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
          worksheet.getCell("J" + temp).value =
            materialinwarditem[j].totalamount;
          worksheet.getCell("J" + temp).font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("J" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        }
      }

      let purlength = materialinward[i].materialreceiveditem001wbs.length + 6;

      for (
        let k = 0;
        k < materialinward[i].materialreceiveditem001wbs.length;
        k++
      ) {
        materialinwarditem = materialinward[i].materialreceiveditem001wbs;
      }

      let totalAmount = 0;

      for (let z = 0; z < materialinwarditem.length; z++) {
        if (materialinwarditem[z].cucode) {
          totalAmount = totalAmount + materialinwarditem[z].cutotalamount;
        } else if (materialinwarditem[z].cptcode) {
          totalAmount = totalAmount + materialinwarditem[z].cpttotalamount;
        } else if (materialinwarditem[z].prtcode) {
          totalAmount = totalAmount + materialinwarditem[z].prttotalamount;
        } else {
          totalAmount = totalAmount + materialinwarditem[z].totalamount;
        }
      }

      let totalwords = converter.toWords(totalAmount);
      let Totalwords = totalwords.toUpperCase();

      worksheet.mergeCells("I" + purlength);
      worksheet.getCell("I" + purlength).value = "Total";
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
      worksheet.getCell("I" + purlength).font = {
        size: 11,
      };

      worksheet.mergeCells("J" + purlength);
      worksheet.getCell("J" + purlength).value = totalAmount;
      worksheet.getCell("J" + purlength).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("J" + purlength).alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      let orderlength = purlength + 1;
      worksheet.getRow(orderlength).height = 150;
      let order = "A" + orderlength + ":" + "J" + orderlength;

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
      let sign = "A" + signlength + ":" + "E" + signlength;
      worksheet.mergeCells(sign);
      worksheet.getCell(sign).border = {
        // top: { style: 'thin' },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      let signs = "F" + signlength + ":" + "J" + signlength;
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
