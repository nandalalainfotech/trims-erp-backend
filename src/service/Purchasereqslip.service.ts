import { HttpException, HttpStatus, Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PurchasereqslipDTO } from "src/dto/Purchasereqslip.dto";
import { Purchasereqslip001wb } from "src/entity/Purchasereqslip001wb";
import { getManager, Repository } from "typeorm";
import { Request } from "supertest";
import { createReadStream } from "fs";
import { Response } from "express";
import { Purchasereqitem001wb } from "src/entity/Purchasereqitem001wb";
import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { Consumble001mb } from "src/entity/Consumble001mb";
import { Childpart001mb } from "src/entity/ChildPart001mb";
import { Part001mb } from "src/entity/Part001mb";

var path = require("path");
const excel = require("exceljs");
var converter = require("number-to-words");
let value5 = 0;
@Injectable()
export class PurchasereqslipService {
  constructor(
    @InjectRepository(Purchasereqslip001wb)
    private readonly PurchasereqslipRepository: Repository<Purchasereqslip001wb>,
    @InjectRepository(Purchasereqitem001wb)
    private readonly purchasereqslipitemRepository: Repository<Purchasereqitem001wb>,
    @InjectRepository(Orderitem001mb)
    private readonly orderItemsRepository: Repository<Orderitem001mb>,
    @InjectRepository(Consumble001mb)
    private readonly consumbleRepository: Repository<Consumble001mb>,
    @InjectRepository(Childpart001mb)
    private readonly childPartRepository: Repository<Childpart001mb>,
    @InjectRepository(Part001mb)
    private readonly PartRepository: Repository<Part001mb>
  ) {}

  async create(
    purchasereqslipDTO: PurchasereqslipDTO
  ): Promise<Purchasereqslip001wb> {
    let purchasereqitem001wbs: Purchasereqitem001wb[] = [];
    for (let i = 0; i < purchasereqslipDTO.purchasereqitem001wbs.length; i++) {
      const purchasereqitem001wb = new Purchasereqitem001wb();
      purchasereqitem001wb.prslno2 =
        purchasereqslipDTO.purchasereqitem001wbs[i].prslno2;
      purchasereqitem001wb.orderslno =
        purchasereqslipDTO.purchasereqitem001wbs[i].orderslno;
      purchasereqitem001wb.itemname =
        purchasereqslipDTO.purchasereqitem001wbs[i].itemname;
      purchasereqitem001wb.qunty = purchasereqslipDTO.purchasereqitem001wbs[i].qunty;
      purchasereqitem001wb.unitrate =
        purchasereqslipDTO.purchasereqitem001wbs[i].unitrate;
      purchasereqitem001wb.totalamount =
        purchasereqslipDTO.purchasereqitem001wbs[i].totalamount;
      purchasereqitem001wb.uom = purchasereqslipDTO.purchasereqitem001wbs[i].uom;
      purchasereqitem001wb.hsn = purchasereqslipDTO.purchasereqitem001wbs[i].hsn;
      purchasereqitem001wb.descrip =
        purchasereqslipDTO.purchasereqitem001wbs[i].descrip;

      purchasereqitem001wb.cucode =
        purchasereqslipDTO.purchasereqitem001wbs[i].cucode;
      purchasereqitem001wb.cuname =
        purchasereqslipDTO.purchasereqitem001wbs[i].cuname;
      purchasereqitem001wb.cuqunty =
        purchasereqslipDTO.purchasereqitem001wbs[i].cuqunty;
      purchasereqitem001wb.cunitrate =
        purchasereqslipDTO.purchasereqitem001wbs[i].cunitrate;
      purchasereqitem001wb.cutotalamount =
        purchasereqslipDTO.purchasereqitem001wbs[i].cutotalamount;
      purchasereqitem001wb.cuom = purchasereqslipDTO.purchasereqitem001wbs[i].cuom;
      purchasereqitem001wb.chsn = purchasereqslipDTO.purchasereqitem001wbs[i].chsn;
      purchasereqitem001wb.cudescrip =
        purchasereqslipDTO.purchasereqitem001wbs[i].cudescrip;

      purchasereqitem001wb.cptcode =
        purchasereqslipDTO.purchasereqitem001wbs[i].cptcode;
      purchasereqitem001wb.cptname =
        purchasereqslipDTO.purchasereqitem001wbs[i].cptname;
      purchasereqitem001wb.cptqunty =
        purchasereqslipDTO.purchasereqitem001wbs[i].cptqunty;
      purchasereqitem001wb.cptunitrate =
        purchasereqslipDTO.purchasereqitem001wbs[i].cptunitrate;
      purchasereqitem001wb.cpttotalamount =
        purchasereqslipDTO.purchasereqitem001wbs[i].cpttotalamount;
      purchasereqitem001wb.cptuom =
        purchasereqslipDTO.purchasereqitem001wbs[i].cptuom;
      purchasereqitem001wb.cpthsn =
        purchasereqslipDTO.purchasereqitem001wbs[i].cpthsn;
      purchasereqitem001wb.cptdescrip =
        purchasereqslipDTO.purchasereqitem001wbs[i].cptdescrip;

      purchasereqitem001wb.prtcode =
        purchasereqslipDTO.purchasereqitem001wbs[i].prtcode;
      purchasereqitem001wb.prtmname =
        purchasereqslipDTO.purchasereqitem001wbs[i].prtmname;
      purchasereqitem001wb.prtqunty =
        purchasereqslipDTO.purchasereqitem001wbs[i].prtqunty;
      purchasereqitem001wb.prtunitrate =
        purchasereqslipDTO.purchasereqitem001wbs[i].prtunitrate;
      purchasereqitem001wb.prttotalamount =
        purchasereqslipDTO.purchasereqitem001wbs[i].prttotalamount;
      purchasereqitem001wb.prtuom =
        purchasereqslipDTO.purchasereqitem001wbs[i].prtuom;
      purchasereqitem001wb.prthsn =
        purchasereqslipDTO.purchasereqitem001wbs[i].prthsn;
      purchasereqitem001wb.prtdescrip =
        purchasereqslipDTO.purchasereqitem001wbs[i].prtdescrip;
      purchasereqitem001wb.unitslno = purchasereqslipDTO.unitslno;
      purchasereqitem001wb.insertUser = purchasereqslipDTO.insertUser;
      purchasereqitem001wb.insertDatetime = purchasereqslipDTO.insertDatetime;
      let orderitem = await this.purchasereqslipitemRepository.save(
        purchasereqitem001wb
      );
      purchasereqitem001wbs.push(orderitem);
    }

    if (purchasereqitem001wbs.length > 0) {
      const purchasereqslip001wb = new Purchasereqslip001wb();
      purchasereqslip001wb.setProperties(purchasereqslipDTO);
      purchasereqslip001wb.purchasereqitem001wbs = purchasereqitem001wbs;
      await this.PurchasereqslipRepository.save(purchasereqslip001wb);
      return purchasereqslip001wb;
    }else{
      throw new HttpException('Please Add Item Details', HttpStatus.INTERNAL_SERVER_ERROR);
   }
  }

  async submitStatusUpdate(): Promise<Purchasereqslip001wb> {
    const purchasereqslip001wb = new Purchasereqslip001wb();
    purchasereqslip001wb.status = "Approval Request Submitted";
    purchasereqslip001wb.updatedDatetime = new Date();
    return purchasereqslip001wb;
  }

  async approvalStatusupdate(): Promise<Purchasereqslip001wb> {
    const purchasereqslip001wb = new Purchasereqslip001wb();
    return purchasereqslip001wb;
  }

  async updatereqslip(
    approvel: any,
    pchaseslno: any,
    remarks: any
  ): Promise<Purchasereqslip001wb> {
    let purchasereqslip001wb = new Purchasereqslip001wb();
    purchasereqslip001wb.status = approvel;
    purchasereqslip001wb.remarks = remarks;
    purchasereqslip001wb.updatedDatetime = new Date();
    await this.PurchasereqslipRepository.update(
      { slNo: pchaseslno },
      purchasereqslip001wb
    );
    return purchasereqslip001wb;
  }

  async update( purchasereqslipDTO: PurchasereqslipDTO): Promise<Purchasereqslip001wb> {

    for (let i = 0; i < purchasereqslipDTO.purchasereqitem001wbs.length; i++) {
      const purchasereqitem001wb = new Purchasereqitem001wb();

      purchasereqitem001wb.orderslno =purchasereqslipDTO.purchasereqitem001wbs[i].orderslno;
      purchasereqitem001wb.itemname =purchasereqslipDTO.purchasereqitem001wbs[i].itemname;
      purchasereqitem001wb.qunty = purchasereqslipDTO.purchasereqitem001wbs[i].qunty;
      purchasereqitem001wb.unitrate =purchasereqslipDTO.purchasereqitem001wbs[i].unitrate;
      purchasereqitem001wb.totalamount =purchasereqslipDTO.purchasereqitem001wbs[i].totalamount;
      purchasereqitem001wb.uom = purchasereqslipDTO.purchasereqitem001wbs[i].uom;
      purchasereqitem001wb.hsn = purchasereqslipDTO.purchasereqitem001wbs[i].hsn;
      purchasereqitem001wb.descrip =purchasereqslipDTO.purchasereqitem001wbs[i].descrip;

      purchasereqitem001wb.cucode =purchasereqslipDTO.purchasereqitem001wbs[i].cucode;
      purchasereqitem001wb.cuname =purchasereqslipDTO.purchasereqitem001wbs[i].cuname;
      purchasereqitem001wb.cuqunty =purchasereqslipDTO.purchasereqitem001wbs[i].cuqunty;
      purchasereqitem001wb.cunitrate =purchasereqslipDTO.purchasereqitem001wbs[i].cunitrate;
      purchasereqitem001wb.cutotalamount =purchasereqslipDTO.purchasereqitem001wbs[i].cutotalamount;
      purchasereqitem001wb.cuom = purchasereqslipDTO.purchasereqitem001wbs[i].cuom;
      purchasereqitem001wb.chsn = purchasereqslipDTO.purchasereqitem001wbs[i].chsn;
      purchasereqitem001wb.cudescrip =purchasereqslipDTO.purchasereqitem001wbs[i].cudescrip;

      purchasereqitem001wb.cptcode =purchasereqslipDTO.purchasereqitem001wbs[i].cptcode;
      purchasereqitem001wb.cptname =purchasereqslipDTO.purchasereqitem001wbs[i].cptname;
      purchasereqitem001wb.cptqunty =purchasereqslipDTO.purchasereqitem001wbs[i].cptqunty;
      purchasereqitem001wb.cptunitrate =purchasereqslipDTO.purchasereqitem001wbs[i].cptunitrate;
      purchasereqitem001wb.cpttotalamount =purchasereqslipDTO.purchasereqitem001wbs[i].cpttotalamount;
      purchasereqitem001wb.cptuom =purchasereqslipDTO.purchasereqitem001wbs[i].cptuom;
      purchasereqitem001wb.cpthsn =purchasereqslipDTO.purchasereqitem001wbs[i].cpthsn;
      purchasereqitem001wb.cptdescrip =purchasereqslipDTO.purchasereqitem001wbs[i].cptdescrip;

      purchasereqitem001wb.prtcode =purchasereqslipDTO.purchasereqitem001wbs[i].prtcode;
      purchasereqitem001wb.prtmname =purchasereqslipDTO.purchasereqitem001wbs[i].prtmname;
      purchasereqitem001wb.prtqunty =purchasereqslipDTO.purchasereqitem001wbs[i].prtqunty;
      purchasereqitem001wb.prtunitrate =purchasereqslipDTO.purchasereqitem001wbs[i].prtunitrate;
      purchasereqitem001wb.prttotalamount =purchasereqslipDTO.purchasereqitem001wbs[i].prttotalamount;
      purchasereqitem001wb.prtuom =purchasereqslipDTO.purchasereqitem001wbs[i].prtuom;
      purchasereqitem001wb.prthsn =purchasereqslipDTO.purchasereqitem001wbs[i].prthsn;
      purchasereqitem001wb.prtdescrip = purchasereqslipDTO.purchasereqitem001wbs[i].prtdescrip;

      purchasereqitem001wb.unitslno = purchasereqslipDTO.unitslno;
      purchasereqitem001wb.updatedUser = purchasereqslipDTO.updatedUser;
      purchasereqitem001wb.updatedDatetime = purchasereqslipDTO.updatedDatetime;

      await this.purchasereqslipitemRepository.update({ slNo: purchasereqslipDTO.purchasereqitem001wbs[i].slNo},purchasereqitem001wb);

    }

    const purchasereqslip001wb = new Purchasereqslip001wb();
    purchasereqslip001wb.setProperties(purchasereqslipDTO);
    await this.PurchasereqslipRepository.update({ slNo: purchasereqslip001wb.slNo },purchasereqslip001wb);
    return purchasereqslip001wb;
  }

  async findAll(unitslno: any): Promise<Purchasereqslip001wb[]> {
    return await this.PurchasereqslipRepository.find({relations: ["purchasereqitem001wbs"],
      order: { slNo: "DESC" },
      where: { unitslno: unitslno },
    });
  }

  async findAllbyBreakDownId(): Promise<Purchasereqslip001wb[]> {
    return this.PurchasereqslipRepository.find();
  }

  findOne(id: number): Promise<Purchasereqslip001wb> {
    return this.PurchasereqslipRepository.findOne({
      relations: ["purchasereqitem001wbs"],
      where: { slNo: id },
    });
  }
  async remove(slNo: number): Promise<void> {
    await this.PurchasereqslipRepository.delete(slNo);
  }

  async getCount(): Promise<string> {
    const entityManager = getManager();
    let result = await getManager().query(
      "select count(*) as row from Purchasereqslip001wb",
      ["row"]
    );
    var string = JSON.stringify(result);
    return string;
  }

  async downloadIDPdf(unitslno:any,id: any, response: Response) {
    let purchaslip = await this.PurchasereqslipRepository.find({
      where: { slNo: id ,unitslno:unitslno},
      relations: [
        "purchasereqitem001wbs",
        "purchasereqitem001wbs.orderslno2",
        "purchasereqitem001wbs.cptcode2",
        "purchasereqitem001wbs.cucode2",
        "purchasereqitem001wbs.prslno2",
        "purchasereqitem001wbs.prtcode2",
      ],
    });

    

    let purchasereqslipitems: Purchasereqitem001wb[] = [];

    let totalAmount: number = null;

    for (let i = 0; i < purchaslip.length; i++) {
      
      for (let j = 0; j < purchaslip[i].purchasereqitem001wbs.length; j++) {
        purchasereqslipitems.push(purchaslip[i].purchasereqitem001wbs[j]);
        totalAmount += purchaslip[i].purchasereqitem001wbs[j].totalamount;
        totalAmount += purchaslip[i].purchasereqitem001wbs[j].cutotalamount;
        totalAmount += purchaslip[i].purchasereqitem001wbs[j].cpttotalamount;
        totalAmount += purchaslip[i].purchasereqitem001wbs[j].prttotalamount;
      }
    }

    let formattedToday = "";
    
    for (let i = 0; i < purchaslip.length; i++) {
      const today = new Date(purchaslip[i].date);
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1;
      let dd = today.getDate();
      formattedToday = dd + '-' + mm + '-' + yyyy;
    }
    
    
    

    let totalwords = converter.toWords(totalAmount);
    let Totalwords = totalwords.toUpperCase();

    var fs = require("fs");
    var pdf = require("dynamic-html-pdf");
    var html = fs.readFileSync("purchaslip.html", "utf8");
    let orderitemSlno = 0;

    pdf.registerHelper("iforderslno", function (orderslno, options) {
      for (let i = 0; i < purchaslip.length; i++) {
        if (purchaslip[i].purchasereqitem001wbs[i].orderslno) {
          purchasereqslipitems = purchaslip[i].purchasereqitem001wbs;
          this.slNo= ++orderitemSlno;
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      }
    });

    pdf.registerHelper("ifcucode", function (cucode, options) {
      for (let i = 0; i < purchaslip.length; i++) {
        if (purchaslip[i].purchasereqitem001wbs[i].cucode) {
          purchasereqslipitems = purchaslip[i].purchasereqitem001wbs;
          this.slNo= ++orderitemSlno;
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      }
    });

    pdf.registerHelper("ifcptcode", function (cptcode, options) {
      for (let i = 0; i < purchaslip.length; i++) {
        if (purchaslip[i].purchasereqitem001wbs[i].cptcode) {
          purchasereqslipitems = purchaslip[i].purchasereqitem001wbs;
          this.slNo= ++orderitemSlno;
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      }
    });

    pdf.registerHelper("ifprtcode", function (prtcode, options) {
      for (let i = 0; i < purchaslip.length; i++) {
        if (purchaslip[i].purchasereqitem001wbs[i].prtcode) {
          purchasereqslipitems = purchaslip[i].purchasereqitem001wbs;
          this.slNo= ++orderitemSlno;
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
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
        purchaslipcheck: purchaslip,
        Purchasereqslipitems: purchasereqslipitems,
        totalAmount: totalAmount,
        formattedToday: formattedToday,

        Totalwords: Totalwords,
      },
      path: "./pdf/purchaslip.pdf", // it is not required if type is buffer
    };

    if (document === null) {
      return null;
    } else {
      pdf
        .create(document, options)
        .then((pathRes) => {
          const filestream = createReadStream(pathRes.filename);
          response.writeHead(200, {
            "Content-Disposition": "attachment;filename=" + "purchaslip.pdf",
            "Content-Type": "application/pdf",
          });
          filestream.pipe(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {
    let purchaslip = await this.PurchasereqslipRepository.find({
      relations: [
        "purchasereqitem001wbs",
        "purchasereqitem001wbs.orderslno2",
        "purchasereqitem001wbs.cptcode2",
        "purchasereqitem001wbs.cucode2",
        "purchasereqitem001wbs.prslno2",
        "purchasereqitem001wbs.prtcode2",
      ],
      where:{unitslno:unitslno},
      order: { slNo: "DESC" }
    });
 
    
    

    var fs = require("fs");
    var pdf = require("dynamic-html-pdf");
    var html = fs.readFileSync("purchasSlips.html", "utf8");
    let ItemslNo =0

    var options = {
      format: "A3",
      orientation: "landscape",
      border: "10mm",
    };

    let date = ""
    for(let i = 0; i < purchaslip.length; i++) {
        const today = new Date(purchaslip[i].date);
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        date = dd + '-' + mm + '-' + yyyy;
    }

    
    await pdf.registerHelper("ifitemslno", function (orderslno, options) {
      ItemslNo =0
      this.slNo =ItemslNo;
      return options.fn(this,this.slNo);
    });

    await pdf.registerHelper("iforderslno", function (orderslno, options) {
      const value1 = this.orderslno2 ? this.orderslno2.itemcode : undefined;

      if (value1 == undefined) {
        return options.inverse(this);
      } else {
        this.slNo =++ItemslNo;
        return options.fn(this,this.slNo);
      }
    });

    await pdf.registerHelper("ifcucode", function (cucode, options) {
      const value2 = this.cucode2 ? this.cucode2.consmno : undefined;
      if (value2 == undefined) {
        return options.inverse(this);
      } else {
        this.slNo =++ItemslNo;
        return options.fn(this,this.slNo);
      }
    });

    await pdf.registerHelper("ifcptcode", function (cptcode, options) {
      const value3 = this.cptcode2 ? this.cptcode2.cpartno : undefined;
      if (value3 == undefined) {
        return options.inverse(this,this.slNo);
      } else {
        this.slNo =++ItemslNo;
        return options.fn(this,this.slNo);
      }
    });

    await pdf.registerHelper("ifprtcode", function (prtcode, options) {
      const value4 = this.prtcode2 ? this.prtcode2.partno : undefined;
      if (value4 == undefined) {
        return options.inverse(this);
      } else {
        this.slNo =++ItemslNo;
        return options.fn(this, this.slNo);
      }
    });

    await pdf.registerHelper("iftotalamount", function (totalamount, options) {
      this.tAmount = 0;
      let value1 = 0;
      this.tWords = "";
      for (let i = 0; i < this.purchasereqitem001wbs.length; i++) {
        this.tAmount += this.purchasereqitem001wbs[i].totalamount
        value1 = this.purchasereqitem001wbs[i].totalamount;
        let totalwords = converter.toWords(this.tAmount);
        this.tWords = totalwords.toUpperCase();
      }
      
      value1 = value1 ? value1 : undefined;
      if (value1 == undefined) {
        return options.inverse(this);
      } else {
        return options.fn(this,this.tAmount,this.tWords);
      }
    });

    await pdf.registerHelper("ifcpttotalamount", function (cpttotalamount, options) {
      this.tAmount = 0;
      let value1 = 0;
      this.tWords = "";
      for (let i = 0; i < this.purchasereqitem001wbs.length; i++) {
        this.tAmount += this.purchasereqitem001wbs[i].cpttotalamount
        value1 = this.purchasereqitem001wbs[i].cpttotalamount;
        let totalwords = converter.toWords(this.tAmount);
        this.tWords = totalwords.toUpperCase();
      }
      value1 = value1 ? value1 : undefined;
      if (value1 == undefined) {
        return options.inverse(this);
      } else {
        return options.fn(this,this.tAmount,this.tWords);
      }
    });

    await pdf.registerHelper("ifcutotalamount", function (cutotalamount, options) {
      this.tAmount=0;
      let value1=0;
      this.tWords = "";
      for (let i = 0; i < this.purchasereqitem001wbs.length; i++) {
        this.tAmount += this.purchasereqitem001wbs[i].cutotalamount
        value1 = this.purchasereqitem001wbs[i].cutotalamount;
        let totalwords = converter.toWords(this.tAmount);
        this.tWords = totalwords.toUpperCase();
      }
      value1 = value1 ? value1 : undefined;
      if (value1 == undefined) {
        return options.inverse(this);
      } else {
        return options.fn(this,this.tAmount,this.tWords);
      }
    });

    await pdf.registerHelper("ifprttotalamount", function (prttotalamount, options) {
      this.tAmount=0;
      let value1=0;
      this.tWords = "";
      for (let i = 0; i < this.purchasereqitem001wbs.length; i++) {
        this.tAmount += this.purchasereqitem001wbs[i].prttotalamount
        value1 = this.purchasereqitem001wbs[i].prttotalamount;
        let totalwords = converter.toWords(this.tAmount);
        this.tWords = totalwords.toUpperCase();
      }
      value1 = value1 ? value1 : undefined;
      if (value1 == undefined) {
        return options.inverse(this);
      } else {
        return options.fn(this,this.tAmount,this.tWords);
      }
    });


  

    var document = {
      type: "file", // 'file' or 'buffer'
      template: html,
      context: {
        purchaslipcheck: purchaslip,
      },
      path: "./pdf/purchasSlips.pdf", // it is not required if type is buffer
    };

    if (document === null) {
      return null;
    } else {
      pdf
        .create(document, options)
        .then((pathRes) => {
          const filestream = createReadStream(pathRes.filename);
          response.writeHead(200, {
            "Content-Disposition": "attachment;filename=" + "purchasSlips.pdf",
            "Content-Type": "application/pdf",
          });
          filestream.pipe(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  async downloadExcel(unitslno:any,@Req() request: Request, @Res() response: Response) {
    let purchaslip = await this.PurchasereqslipRepository.find({
      relations: [
        "purchasereqitem001wbs",
        "purchasereqitem001wbs.orderslno2",
        "purchasereqitem001wbs.cptcode2",
        "purchasereqitem001wbs.cucode2",
        "purchasereqitem001wbs.prslno2",
        "purchasereqitem001wbs.prtcode2",
      ],
      where:{unitslno:unitslno},
      order: { slNo: "DESC" }
    });

    let purchasereqslipitems = await this.purchasereqslipitemRepository.find();

    let ordeitem = await this.orderItemsRepository.find();

    let consumableitem = await this.consumbleRepository.find();

    let childpart = await this.childPartRepository.find();

    let part = await this.PartRepository.find();

    let workbook = new excel.Workbook();

    for (let i = 0; i < purchaslip.length; i++) {
      let worksheet = workbook.addWorksheet("PurchaseReq_Reports" + i); // creating worksheet
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
      worksheet.getCell("A1:I1").value = "SRINIVASA ENTERPRISES";
      worksheet.getCell("A1:I1").font = {
        size: 18,
        bold: true,
      };
      worksheet.getCell("A1:I1").alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      worksheet.mergeCells("A2:I2");
      worksheet.getCell("A2:I2").value = "PURCHASE REQUISITION SLIP";
      worksheet.getCell("A2:I2").font = {
        size: 16,
        bold: true,
      };
      worksheet.getCell("A2:I2").alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      worksheet.mergeCells("A3:I3");
      worksheet.getCell("A3:I3").value = "TO:";
      worksheet.getCell("A3:I3").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("A3:I3").alignment = {
        vertical: "top",
        horizontal: "left",
        wraptext: true,
      };

      worksheet.mergeCells("A4:D4");
      worksheet.getCell("A4:D4").value = {
        richText: [
          { text: "PRS NO :" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + purchaslip[i].prsNo },
        ],
      };

      worksheet.getCell("A4:D4").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("A4:D4").alignment = {
        vertical: "middle",
        horizontal: "left",
        wraptext: true,
      };

      const today = new Date(purchaslip[i].date);
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1;
      let dd = today.getDate();
      const formattedToday = dd + '-' + mm + '-' + yyyy;

      worksheet.mergeCells("E4:I4");
      worksheet.getCell("E4:I4").value = {
        richText: [
          { text: "Date:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + formattedToday },
        ],
      };
      worksheet.getCell("E4:I4").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("E4:I4").alignment = {
        vertical: "middle",
        horizontal: "left",
        wraptext: true,
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
      worksheet.getCell("D5").value = "Description";
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
      worksheet.getCell("E5").value = "UOM";
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
      worksheet.getCell("F5").value = "HSN/SAC";
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
      worksheet.getCell("G5").value = "Unit Rate";
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
      worksheet.getCell("H5").value = "Quantity";
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
      worksheet.getCell("I5").value = "TotalAmount";
      worksheet.getCell("I5").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("I5").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      for (let j = 0; j < purchaslip[i].purchasereqitem001wbs.length; j++) {
        if (purchaslip[i].purchasereqitem001wbs[j].cucode || null) {
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
          worksheet.getCell("B" + temp).value =
            purchaslip[i].purchasereqitem001wbs[j].cucode2.consmno;
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
            purchaslip[i].purchasereqitem001wbs[j].cuname;
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
            purchaslip[i].purchasereqitem001wbs[j].cudescrip;
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
            purchaslip[i].purchasereqitem001wbs[j].cuom;
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
            purchaslip[i].purchasereqitem001wbs[j].chsn;
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
            purchaslip[i].purchasereqitem001wbs[j].cunitrate;
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
            purchaslip[i].purchasereqitem001wbs[j].cuqunty;
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
            purchaslip[i].purchasereqitem001wbs[j].cutotalamount;
          worksheet.getCell("I" + temp).font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("I" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        } else if (purchaslip[i].purchasereqitem001wbs[j].cptcode || null) {
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
          worksheet.getCell("B" + temp).value =
            purchaslip[i].purchasereqitem001wbs[j].cptcode2.cpartno;
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
            purchaslip[i].purchasereqitem001wbs[j].cptname;
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
            purchaslip[i].purchasereqitem001wbs[j].cptdescrip;
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
            purchaslip[i].purchasereqitem001wbs[j].cptuom;
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
            purchaslip[i].purchasereqitem001wbs[j].cpthsn;
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
            purchaslip[i].purchasereqitem001wbs[j].cptunitrate;
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
            purchaslip[i].purchasereqitem001wbs[j].cptqunty;
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
            purchaslip[i].purchasereqitem001wbs[j].cpttotalamount;
          worksheet.getCell("I" + temp).font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("I" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        } else if (purchaslip[i].purchasereqitem001wbs[j].prtcode || null) {
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
          worksheet.getCell("B" + temp).value =
            purchaslip[i].purchasereqitem001wbs[j].prtcode2.partno;
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
            purchaslip[i].purchasereqitem001wbs[j].prtmname;
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
            purchaslip[i].purchasereqitem001wbs[j].prtdescrip;
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
            purchaslip[i].purchasereqitem001wbs[j].prtuom;
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
            purchaslip[i].purchasereqitem001wbs[j].prthsn;
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
            purchaslip[i].purchasereqitem001wbs[j].prtunitrate;
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
            purchaslip[i].purchasereqitem001wbs[j].prtqunty;
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
            purchaslip[i].purchasereqitem001wbs[j].prttotalamount;
          worksheet.getCell("I" + temp).font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("I" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        } else if( purchaslip[i].purchasereqitem001wbs[j].orderslno || null){
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
          worksheet.getCell("B" + temp).value =
            purchaslip[i].purchasereqitem001wbs[j].orderslno2.itemcode;
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
            purchaslip[i].purchasereqitem001wbs[j].itemname;
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
            purchaslip[i].purchasereqitem001wbs[j].descrip;
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
            purchaslip[i].purchasereqitem001wbs[j].uom;
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
            purchaslip[i].purchasereqitem001wbs[j].hsn;
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
            purchaslip[i].purchasereqitem001wbs[j].unitrate;
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
            purchaslip[i].purchasereqitem001wbs[j].qunty;
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
            purchaslip[i].purchasereqitem001wbs[j].totalamount;
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

      let purlength = purchaslip[i].purchasereqitem001wbs.length + 6;

      for (let k = 0; k < purchaslip[i].purchasereqitem001wbs.length; k++) {
        purchasereqslipitems = purchaslip[i].purchasereqitem001wbs;
      }

      let totalAmount = 0;

      for (let z = 0; z < purchasereqslipitems.length; z++) {
        if (purchasereqslipitems[z].cucode) {
          totalAmount = totalAmount + purchasereqslipitems[z].cutotalamount;
        } else if (purchasereqslipitems[z].cptcode) {
          totalAmount = totalAmount + purchasereqslipitems[z].cpttotalamount;
        } else if (purchasereqslipitems[z].prtcode) {
          totalAmount = totalAmount + purchasereqslipitems[z].prttotalamount;
        } else {
          totalAmount = totalAmount + purchasereqslipitems[z].totalamount;
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

  async downloadIDExcel(unitslno:any,id, response: Response) {
    let purchaslip = await this.PurchasereqslipRepository.find({
      where: { slNo: id ,unitslno:unitslno},
      relations: [
        "purchasereqitem001wbs",
        "purchasereqitem001wbs.orderslno2",
        "purchasereqitem001wbs.cptcode2",
        "purchasereqitem001wbs.cucode2",
        "purchasereqitem001wbs.prslno2",
        "purchasereqitem001wbs.prtcode2",
      ],
    });

    let purchasereqslipitems = await this.purchasereqslipitemRepository.find();

    let ordeitem = await this.orderItemsRepository.find();

    let consumableitem = await this.consumbleRepository.find();

    let childpart = await this.childPartRepository.find();

    let part = await this.PartRepository.find();

    for (let i = 0; i < purchaslip.length; i++) {
      purchasereqslipitems = purchaslip[i].purchasereqitem001wbs;

      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet("purchaslip_reports"); // creating worksheet
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
        { key: "A", width: 10.0 },
        { key: "B", width: 25.0 },
        { key: "C", width: 25.0 },
        { key: "D", width: 25.0 },
        { key: "E", width: 20.0 },
        { key: "F", width: 20.0 },
        { key: "G", width: 20.0 },
        { key: "H", width: 25.0 },
        { key: "I", width: 25.0 },
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
      worksheet.getCell("A1:I1").value = "SRINIVASA ENTERPRISES";
      worksheet.getCell("A1:I1").font = {
        size: 18,
        bold: true,
      };
      worksheet.getCell("A1:I1").alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      worksheet.mergeCells("A2:I2");
      worksheet.getCell("A2:I2").value = "PURCHASE REQUISITION SLIP";
      worksheet.getCell("A2:I2").font = {
        size: 16,
        bold: true,
      };
      worksheet.getCell("A2:I2").alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      worksheet.mergeCells("A3:I3");
      worksheet.getCell("A3:I3").value = "TO:";
      worksheet.getCell("A3:I3").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("A3:I3").alignment = {
        vertical: "top",
        horizontal: "left",
        wraptext: true,
      };

      worksheet.mergeCells("A4:D4");
      worksheet.getCell("A4:D4").value = {
        richText: [
          { text: "PRS NO :" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + purchaslip[i].prsNo },
        ],
      };

      worksheet.getCell("A4:D4").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("A4:D4").alignment = {
        vertical: "middle",
        horizontal: "left",
        wraptext: true,
      };

      const today = new Date(purchaslip[i].date);
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1;
      let dd = today.getDate();
      const formattedToday = dd + '-' + mm + '-' + yyyy;

      worksheet.mergeCells("E4:I4");
      worksheet.getCell("E4:I4").value = {
        richText: [
          { text: "Date:" + "\n\n" },
          { font: { size: 11 }, text: "\n\n" + formattedToday },
        ],
      };
      worksheet.getCell("E4:I4").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("E4:I4").alignment = {
        vertical: "middle",
        horizontal: "left",
        wraptext: true,
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
      worksheet.getCell("D5").value = "Description";
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
      worksheet.getCell("E5").value = "UOM";
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
      worksheet.getCell("F5").value = "HSN/SAC";
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
      worksheet.getCell("G5").value = "Unit Rate";
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
      worksheet.getCell("H5").value = "Quantity";
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
      worksheet.getCell("I5").value = "TotalAmount";
      worksheet.getCell("I5").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("I5").alignment = {
        vertical: "middle",
        horizontal: "center",
        wraptext: true,
      };

      for (let j = 0; j < purchasereqslipitems.length; j++) {
        if (purchasereqslipitems[j].cucode || null) {
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
          worksheet.getCell("B" + temp).value =
            purchasereqslipitems[j].cucode2.consmno;
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
          worksheet.getCell("C" + temp).value = purchasereqslipitems[j].cuname;
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
            purchasereqslipitems[j].cudescrip;
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
          worksheet.getCell("E" + temp).value = purchasereqslipitems[j].cuom;
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
          worksheet.getCell("F" + temp).value = purchasereqslipitems[j].chsn;
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
            purchasereqslipitems[j].cunitrate;
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
          worksheet.getCell("H" + temp).value = purchasereqslipitems[j].cuqunty;
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
            purchasereqslipitems[j].cutotalamount;
          worksheet.getCell("I" + temp).font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("I" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        } else if (purchasereqslipitems[j].cptcode || null) {
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
          worksheet.getCell("B" + temp).value =
            purchasereqslipitems[j].cptcode2.cpartno;
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
          worksheet.getCell("C" + temp).value = purchasereqslipitems[j].cptname;
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
            purchasereqslipitems[j].cptdescrip;
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
          worksheet.getCell("E" + temp).value = purchasereqslipitems[j].cptuom;
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
          worksheet.getCell("F" + temp).value = purchasereqslipitems[j].cpthsn;
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
            purchasereqslipitems[j].cptunitrate;
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
            purchasereqslipitems[j].cptqunty;
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
            purchasereqslipitems[j].cpttotalamount;
          worksheet.getCell("I" + temp).font = {
            size: 12,
            bold: true,
          };
          worksheet.getCell("I" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        } else if (purchasereqslipitems[j].prtcode || null) {
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
          worksheet.getCell("B" + temp).value =
            purchasereqslipitems[j].prtcode2.partno;
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
            purchasereqslipitems[j].prtmname;
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
            purchasereqslipitems[j].prtdescrip;
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
          worksheet.getCell("E" + temp).value = purchasereqslipitems[j].prtuom;
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
          worksheet.getCell("F" + temp).value = purchasereqslipitems[j].prthsn;
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
            purchasereqslipitems[j].prtunitrate;
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
            purchasereqslipitems[j].prtqunty;
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
            purchasereqslipitems[j].prttotalamount;
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
        else if(purchasereqslipitems[j].orderslno || null){
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
          worksheet.getCell("B" + temp).value =
            purchasereqslipitems[j].orderslno2.itemcode;
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
            purchasereqslipitems[j].itemname;
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
          worksheet.getCell("D" + temp).value = purchasereqslipitems[j].descrip;
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
          worksheet.getCell("E" + temp).value = purchasereqslipitems[j].uom;
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
          worksheet.getCell("F" + temp).value = purchasereqslipitems[j].hsn;
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
            purchasereqslipitems[j].unitrate;
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
          worksheet.getCell("H" + temp).value = purchasereqslipitems[j].qunty;
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
            purchasereqslipitems[j].totalamount;
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

      let purlength = purchasereqslipitems.length + 6;
      for (let k = 0; k < purchaslip.length; k++) {
        purchasereqslipitems = purchaslip[k].purchasereqitem001wbs;
      }

      let totalAmount = 0;

      for (let z = 0; z < purchasereqslipitems.length; z++) {
        if (purchasereqslipitems[z].cucode) {
          totalAmount = totalAmount + purchasereqslipitems[z].cutotalamount;
        } else if (purchasereqslipitems[z].cptcode) {
          totalAmount = totalAmount + purchasereqslipitems[z].cpttotalamount;
        } else if (purchasereqslipitems[z].prtcode) {
          totalAmount = totalAmount + purchasereqslipitems[z].prttotalamount;
        } else {
          totalAmount = totalAmount + purchasereqslipitems[z].totalamount;
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
