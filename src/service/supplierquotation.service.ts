import { HttpException, HttpStatus, Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SupplierQuotationDTO } from "src/dto/supplierquotation.dto";
import { Supplierquotation001wb } from "src/entity/Supplierquotation001wb";
import { Repository } from "typeorm";
import { createReadStream } from "fs";
import { Response } from "express";
import { Request } from "supertest";
import { Supplierregistration001mb } from "src/entity/Supplierregistration001mb";
import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { Supplierquotationitems001wb } from "src/entity/Supplierquotationitems001wb";
import { Consumble001mb } from "src/entity/Consumble001mb";
import { Childpart001mb } from "src/entity/ChildPart001mb";
import { Part001mb } from "src/entity/Part001mb";
import { Purchasereqslip001wb } from "src/entity/Purchasereqslip001wb";

var path = require("path");
const excel = require("exceljs");
var converter = require("number-to-words");

@Injectable()
export class SupplierQuotationService {
  constructor(
    @InjectRepository(Supplierquotation001wb)private readonly supplierAuditRepository: Repository<Supplierquotation001wb>,
    @InjectRepository(Supplierregistration001mb)private readonly supplierRegRepository: Repository<Supplierregistration001mb>,
    @InjectRepository(Supplierquotationitems001wb)private readonly supplierquotationitemsRepository: Repository<Supplierquotationitems001wb>,
    @InjectRepository(Orderitem001mb) private readonly orderItemsRepository: Repository<Orderitem001mb>,
    @InjectRepository(Consumble001mb) private readonly consumbleRepository: Repository<Consumble001mb>,
    @InjectRepository(Childpart001mb) private readonly childPartRepository: Repository<Childpart001mb>,
    @InjectRepository(Part001mb) private readonly PartRepository: Repository<Part001mb>,
    @InjectRepository(Purchasereqslip001wb)private readonly PurchasereqslipRepository: Repository<Purchasereqslip001wb>,
  ) {}

  async create1(supplierQuotationDTO: SupplierQuotationDTO): Promise<Supplierquotation001wb> {
    let supplierquotationitems001wbs: Supplierquotationitems001wb[] = [];
    for (let i = 0; i < supplierQuotationDTO.supplierquotationitems001wbs.length; i++) {
      const supplierquotationitems001wb = new Supplierquotationitems001wb();
      supplierquotationitems001wb.suplierslno2 = supplierQuotationDTO.supplierquotationitems001wbs[i].suplierslno2;
      supplierquotationitems001wb.itemcode = supplierQuotationDTO.supplierquotationitems001wbs[i].itemcode;
      supplierquotationitems001wb.itemname = supplierQuotationDTO.supplierquotationitems001wbs[i].itemname;
      supplierquotationitems001wb.qunty = supplierQuotationDTO.supplierquotationitems001wbs[i].qunty;
      supplierquotationitems001wb.unitrate = supplierQuotationDTO.supplierquotationitems001wbs[i].unitrate;
      supplierquotationitems001wb.totalamount = supplierQuotationDTO.supplierquotationitems001wbs[i].totalamount;
      supplierquotationitems001wb.uom = supplierQuotationDTO.supplierquotationitems001wbs[i].uom;
      supplierquotationitems001wb.descrip = supplierQuotationDTO.supplierquotationitems001wbs[i].descrip;

      supplierquotationitems001wb.cucode = supplierQuotationDTO.supplierquotationitems001wbs[i].cucode;
      supplierquotationitems001wb.cuname = supplierQuotationDTO.supplierquotationitems001wbs[i].cuname;
      supplierquotationitems001wb.cuqunty = supplierQuotationDTO.supplierquotationitems001wbs[i].cuqunty;
      supplierquotationitems001wb.cunitrate = supplierQuotationDTO.supplierquotationitems001wbs[i].cunitrate;
      supplierquotationitems001wb.cutotalamount = supplierQuotationDTO.supplierquotationitems001wbs[i].cutotalamount;
      supplierquotationitems001wb.cuom = supplierQuotationDTO.supplierquotationitems001wbs[i].cuom;
      supplierquotationitems001wb.cudescrip = supplierQuotationDTO.supplierquotationitems001wbs[i].cudescrip;

      supplierquotationitems001wb.cptcode = supplierQuotationDTO.supplierquotationitems001wbs[i].cptcode;
      supplierquotationitems001wb.cptname = supplierQuotationDTO.supplierquotationitems001wbs[i].cptname;
      supplierquotationitems001wb.cptqunty = supplierQuotationDTO.supplierquotationitems001wbs[i].cptqunty;
      supplierquotationitems001wb.cptunitrate = supplierQuotationDTO.supplierquotationitems001wbs[i].cptunitrate;
      supplierquotationitems001wb.cpttotalamount = supplierQuotationDTO.supplierquotationitems001wbs[i].cpttotalamount;
      supplierquotationitems001wb.cptuom = supplierQuotationDTO.supplierquotationitems001wbs[i].cptuom;
      supplierquotationitems001wb.cptdescrip = supplierQuotationDTO.supplierquotationitems001wbs[i].cptdescrip;
      supplierquotationitems001wb.hsn = supplierQuotationDTO.supplierquotationitems001wbs[i].hsn;
      supplierquotationitems001wb.chsn = supplierQuotationDTO.supplierquotationitems001wbs[i].chsn;
      supplierquotationitems001wb.cpthsn = supplierQuotationDTO.supplierquotationitems001wbs[i].cpthsn;
      supplierquotationitems001wb.prthsn = supplierQuotationDTO.supplierquotationitems001wbs[i].prthsn;
      supplierquotationitems001wb.prtcode = supplierQuotationDTO.supplierquotationitems001wbs[i].prtcode;
      supplierquotationitems001wb.prtmname = supplierQuotationDTO.supplierquotationitems001wbs[i].prtmname;
      supplierquotationitems001wb.prtqunty = supplierQuotationDTO.supplierquotationitems001wbs[i].prtqunty;
      supplierquotationitems001wb.prtunitrate = supplierQuotationDTO.supplierquotationitems001wbs[i].prtunitrate;
      supplierquotationitems001wb.prttotalamount = supplierQuotationDTO.supplierquotationitems001wbs[i].prttotalamount;
      supplierquotationitems001wb.prtuom = supplierQuotationDTO.supplierquotationitems001wbs[i].prtuom;
      supplierquotationitems001wb.prtdescrip = supplierQuotationDTO.supplierquotationitems001wbs[i].prtdescrip;
      supplierquotationitems001wb.unitslno = supplierQuotationDTO.unitslno;
      supplierquotationitems001wb.insertUser = supplierQuotationDTO.insertUser;
      supplierquotationitems001wb.insertDatetime = supplierQuotationDTO.insertDatetime;
      let orderitem = await this.supplierquotationitemsRepository.save(supplierquotationitems001wb);
      supplierquotationitems001wbs.push(orderitem);
    }

    if (supplierquotationitems001wbs.length > 0) {
      const supplierquotation001wb = new Supplierquotation001wb();
      supplierquotation001wb.setProperties(supplierQuotationDTO);
      supplierquotation001wb.supplierquotationitems001wbs = supplierquotationitems001wbs;
      await this.supplierAuditRepository.save(supplierquotation001wb);
      return supplierquotation001wb;
    }else{
      throw new HttpException('Please Add Item Details', HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }

  async create2(file: any,supplierQuotationDTO: SupplierQuotationDTO): Promise<Supplierquotation001wb> {
    let supplierquotation001wb = new Supplierquotation001wb();
    supplierquotation001wb.setProperties(supplierQuotationDTO);
    supplierquotation001wb = await this.supplierAuditRepository.findOne({ where: { slNo: supplierQuotationDTO.slNo } });
    supplierquotation001wb.originalfilename = file.filename;
    await this.supplierAuditRepository.update({ slNo: supplierQuotationDTO.slNo },supplierquotation001wb);
    return supplierquotation001wb;
 }

  async UpdateSupplierQuotation(approvel: any,pchaseslno: any,remarks: any): Promise<Supplierquotation001wb> {
    let supplierquotation001wb = new Supplierquotation001wb();
    supplierquotation001wb.status = approvel;
    supplierquotation001wb.remarks = remarks;
    supplierquotation001wb.updatedDatetime = new Date();
    await this.supplierAuditRepository.update({ slNo: pchaseslno },supplierquotation001wb);
    return supplierquotation001wb;
  }

  async update(supplierQuotationDTO: SupplierQuotationDTO): Promise<Supplierquotation001wb> {

    

    for (let i = 0; i < supplierQuotationDTO.supplierquotationitems001wbs.length; i++) {
      let supplierquotationitems001wb = new Supplierquotationitems001wb();

      supplierquotationitems001wb.unitrate = supplierQuotationDTO.supplierquotationitems001wbs[i].unitrate;
      supplierquotationitems001wb.qunty = supplierQuotationDTO.supplierquotationitems001wbs[i].qunty;
      supplierquotationitems001wb.totalamount = supplierQuotationDTO.supplierquotationitems001wbs[i].totalamount;

      supplierquotationitems001wb.cunitrate = supplierQuotationDTO.supplierquotationitems001wbs[i].cunitrate;
      supplierquotationitems001wb.cuqunty = supplierQuotationDTO.supplierquotationitems001wbs[i].cuqunty;

      supplierquotationitems001wb.cptunitrate = supplierQuotationDTO.supplierquotationitems001wbs[i].cptunitrate;
      supplierquotationitems001wb.cptqunty = supplierQuotationDTO.supplierquotationitems001wbs[i].cptqunty;

      supplierquotationitems001wb.prtunitrate = supplierQuotationDTO.supplierquotationitems001wbs[i].prtunitrate;
      supplierquotationitems001wb.prtqunty = supplierQuotationDTO.supplierquotationitems001wbs[i].prtqunty;
     

      supplierquotationitems001wb.unitslno = supplierQuotationDTO.unitslno;
      supplierquotationitems001wb.updatedUser = supplierQuotationDTO.updatedUser;
      supplierquotationitems001wb.updatedDatetime = supplierQuotationDTO.updatedDatetime;
      await this.supplierquotationitemsRepository.update({ suplierslno: supplierQuotationDTO.supplierquotationitems001wbs[i].suplierslno }, supplierquotationitems001wb);

    }

    const supplierquotation001wb = new Supplierquotation001wb();
    supplierquotation001wb.setProperties(supplierQuotationDTO);
    await this.supplierAuditRepository.update({ slNo: supplierquotation001wb.slNo },supplierquotation001wb);
    return supplierquotation001wb;
  }

  async update1(file: any,supplierQuotationDTO: SupplierQuotationDTO): Promise<Supplierquotation001wb> {
    let supplierquotation001wb = new Supplierquotation001wb();
    supplierquotation001wb.setProperties(supplierQuotationDTO);
    supplierquotation001wb = await this.supplierAuditRepository.findOne({ where: { slNo: supplierQuotationDTO.slNo } });
    supplierquotation001wb.originalfilename = file.filename;
    await this.supplierAuditRepository.update({ slNo: supplierQuotationDTO.slNo },supplierquotation001wb);
    return supplierquotation001wb;
 }

  async findAll(unitslno:any): Promise<Supplierquotation001wb[]> {
    return this.supplierAuditRepository.find({ order: { slNo: "DESC" },relations: ["supplierSlno2","prsno2","supplierquotationitems001wbs"],where:{unitslno:unitslno}});
  }

  async findAllbySupplierId(poslNo: number): Promise<Supplierquotation001wb[]> {
    return this.supplierAuditRepository.find({ order: { slNo: "DESC" },select: ["slNo","prsno"], where: { "supplierSlno": poslNo } });
}

  findOne(id: number): Promise<Supplierquotation001wb> {
    return this.supplierAuditRepository.findOne({
      relations: ["supplierquotationitems001wbs"],
      where: { slNo: id },
    });
  }

  async remove(id: string): Promise<void> {
    await this.supplierAuditRepository.delete(id);
  }

  async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {

    let supplierQuotation = await this.supplierAuditRepository.find({
      relations: ["supplierquotationitems001wbs","supplierSlno2","prsno2"],
      where:{unitslno:unitslno},
      order: { slNo: "DESC" }
    });
  
    
    let ordeitem = await this.orderItemsRepository.find();

    let consumableitem = await this.consumbleRepository.find();

    let childpart = await this.childPartRepository.find();

    let part = await this.PartRepository.find();

   
    var fs = require("fs");
    var pdf = require("dynamic-html-pdf");
    var html = fs.readFileSync("supplierQuotations.html", "utf8");

    
    

    var options = {
      format: "A3",
      orientation: "landscape",
      border: "10mm",
    };

    let tAmount=0

    pdf.registerHelper("iforderslno", function (orderslno, options) {
      const value1 = this.itemcode?this.itemcode : undefined;
      this.itemcode=this.itemcode?ordeitem.find(x => x.slNo === value1)?.itemcode : null;
         if (value1 == undefined ) { 
           return options.inverse(this);
         }else{
           return options.fn(this, this.itemcode);
         }
         
     });

    pdf.registerHelper('ifcucode', function (cucode, options) {
       const value2 = this.cucode?this.cucode : undefined;
       this.itemcode=this.cucode?consumableitem.find(x => x.slNo === value2)?.consmno : null;
           if (value2 == undefined ) {
             return options.inverse(this);
           }else{
             return options.fn(this, this.itemcode);
           }
     })
 
    pdf.registerHelper('ifcptcode', function (cptcode, options ) {
       const value3 = this.cptcode?this.cptcode : undefined;
       this.itemcode=this.cptcode?childpart.find(x => x.slNo === value3)?.cpartno : null;
           if (value3 == undefined ) {
             return options.inverse(this);
           }else{
             return options.fn(this, this.itemcode);
           }
     })
 
     pdf.registerHelper('ifprtcode', function (prtcode, options ) {
       const value4 = this.prtcode?this.prtcode : undefined;
       this.itemcode=this.prtcode?part.find(x => x.slNo === value4)?.partno : null;
           if (value4 == undefined ) {
             return options.inverse(this);
           }else{
             return options.fn(this, this.itemcode);
           }
     })
    
     await pdf.registerHelper("iftotalamount", function (totalamount, options) {
      this.tAmount = 0;
      let value1 = 0;
      this.tWords = "";
      for (let i = 0; i < this.supplierquotationitems001wbs.length; i++) {
        this.tAmount += this.supplierquotationitems001wbs[i].totalamount
        value1 = this.supplierquotationitems001wbs[i].totalamount;   
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

    await pdf.registerHelper("ifcpttotalamount", function (cpttotalamount, options) {
      this.tAmount = 0;
      let value1 = 0;
      this.tWords = "";
      for (let i = 0; i < this.supplierquotationitems001wbs.length; i++) {
        this.tAmount += this.supplierquotationitems001wbs[i].cpttotalamount
        value1 = this.supplierquotationitems001wbs[i].cpttotalamount;
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

    await pdf.registerHelper("ifcutotalamount", function (cutotalamount, options) {
      this.tAmount=0;
      let value1=0;
      this.tWords = "";
      for (let i = 0; i < this.supplierquotationitems001wbs.length; i++) {
        this.tAmount += this.supplierquotationitems001wbs[i].cutotalamount
        value1 = this.supplierquotationitems001wbs[i].cutotalamount;
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

    await pdf.registerHelper("ifprttotalamount", function (prttotalamount, options) {
      this.tAmount=0;
      let value1=0;
      this.tWords = "";
      for (let i = 0; i < this.supplierquotationitems001wbs.length; i++) {
        this.tAmount += this.supplierquotationitems001wbs[i].prttotalamount
        value1 = this.supplierquotationitems001wbs[i].prttotalamount;  
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

     

      var document = {
        type: "file", // 'file' or 'buffer'
        template: html,
        context: {
          supplierQuotationcheck: supplierQuotation,
  
        },
        path: "./pdf/supplierQuotation.pdf", // it is not required if type is buffer
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
              "attachment;filename=" + "supplierQuotation.pdf",
            "Content-Type": "application/pdf",
          });
          filestream.pipe(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  async downloadParamsPdf(unitslno:any,id, response: Response) {
    let supplierQuotation = await this.supplierAuditRepository.find({
      where: { slNo: id ,unitslno:unitslno},
      relations: ["supplierquotationitems001wbs","supplierSlno2","prsno2"],
    });

    let supplierQuotationItem: Supplierquotationitems001wb[] = [];

    let ordeitem = await this.orderItemsRepository.find();

    let consumableitem = await this.consumbleRepository.find();

    let childpart = await this.childPartRepository.find();

    let part = await this.PartRepository.find();

    let totalAmount = 0;

    for (let i = 0; i < supplierQuotation.length; i++) {
      for (let j = 0; j < supplierQuotation[i].supplierquotationitems001wbs.length; j++) {
        supplierQuotationItem.push(supplierQuotation[i].supplierquotationitems001wbs[j]);
         totalAmount += supplierQuotation[i].supplierquotationitems001wbs[j].totalamount;
         totalAmount += supplierQuotation[i].supplierquotationitems001wbs[j].cutotalamount;
         totalAmount += supplierQuotation[i].supplierquotationitems001wbs[j].cpttotalamount;
         totalAmount += supplierQuotation[i].supplierquotationitems001wbs[j].prttotalamount;
         
    }
  }
    let totalwords = converter.toWords(totalAmount);
    let Totalwords = totalwords.toUpperCase();

    var fs = require("fs");
    var pdf = require("dynamic-html-pdf");
    var html = fs.readFileSync("supplierQuotation.html", "utf8");

    pdf.registerHelper('iforderslno', function (itemcode, options ) {
        if (this.itemcode) {
          this.itemcode =  this.itemcode?ordeitem.find(x => x.slNo === this.itemcode)?.itemcode: null;
          return options.fn(this,  this.itemcode);
        }else{
          return options.inverse(this);
        }
    })

    pdf.registerHelper('ifcucode', function (cucode, options) {
        if (this.cucode) {
          this.cucode =  this.cucode?consumableitem.find(x => x.slNo === this.cucode)?.consmno: null;          
          return options.fn(this, this.cucode); 
        }else{
          return options.inverse(this);
        } 
      
    })

    pdf.registerHelper('ifcptcode', function (cptcode, options ) {
        if (this.cptcode) {
          this.cptcode =  this.cptcode?childpart.find(x => x.slNo === this.cptcode)?.cpartno: null;  
          return options.fn(this, this.cptcode);
        }else{
          return options.inverse(this);
        }
    })

    pdf.registerHelper('ifprtcode', function (prtcode, options ) {
        if (this.prtcode) {
          this.prtcode =  this.prtcode?part.find(x => x.slNo === this.prtcode)?.partno: null;
          return options.fn(this,  this.prtcode);
        }else{
          return options.inverse(this);
        }
    })

    var options = {
      format: "A3",
      orientation: "landscape",
      border: "10mm",
    };

    var document = {
      type: "file", // 'file' or 'buffer'
      template: html,
      context: {
        supplierQuotationItem: supplierQuotationItem,
        totalAmount: totalAmount,
        Totalwords: Totalwords,
        supplierQuotationcheck: supplierQuotation,
      
      },
      path: "./pdf/supplierQuotation.pdf", // it is not required if type is buffer
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
              "attachment;filename=" + "supplierQuotation.pdf",
            "Content-Type": "application/pdf",
          });
          filestream.pipe(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  async downloadExcel(unitslno:any, @Req() request: Request, @Res() response: Response) {
    let supplierQuotation = await this.supplierAuditRepository.find({
      relations: ["supplierquotationitems001wbs","supplierSlno2","prsno2"],
      where:{unitslno:unitslno},
      order: { slNo: "DESC" }
    });

    let supplierQuotationItem = await this.supplierquotationitemsRepository.find();


    let ordeitem = await this.orderItemsRepository.find();

    let consumableitem = await this.consumbleRepository.find();

    let childpart = await this.childPartRepository.find();

    let part = await this.PartRepository.find();
    
    let supplieraudit = await this.supplierAuditRepository.find();

    let purslip = await this.PurchasereqslipRepository.find();

    let workbook = new excel.Workbook();

    for (let i = 0; i < supplierQuotation.length; i++) {
      let worksheet = workbook.addWorksheet(""); // creating worksheet
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
        { key: "F", width: 20.0 },
        { key: "G", width: 20.0 },
        { key: "H", width: 20.0 },
        { key: "I", width: 20.0 },
        { key: "J", width: 20.0 },
        { key: "K", width: 45.0 },
        { key: "L", width: 20.0 },
        { key: "M", width: 20.0 },
        { key: "N", width: 25.0 },
        { key: "O", width: 25.0 },
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
      worksheet.getCell("A2:I2").value = "SUPPLIER QUOTATION SLIP";
      worksheet.getCell("A2:I2").font = {
        size: 16,
        bold: true,
      };
      worksheet.getCell("A2:I2").alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      worksheet.mergeCells("A3:B3");
      worksheet.getCell("A3:B3").value = {
        'richText': [
            { 'text': "Supplier Code:" + "\n\n" },
            { 'font': { 'size': 11, }, 'text': "\n\n" + supplierQuotation[i].supplierSlno2.supplierCode },
        ]
      };
      worksheet.getCell("A3:B3").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("A3:B3").alignment = {
        vertical: "top",
        horizontal: "left",
        wraptext: true,
      };

      worksheet.mergeCells("C3:D3");
      worksheet.getCell("C3:D3").value =  {
        'richText': [
            { 'text': "Supplier Name:" + "\n\n" },
            { 'font': { 'size': 11, }, 'text': "\n\n" + supplierQuotation[i].supliername },
        ]
      };
      worksheet.getCell("C3:D3").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("C3:D3").alignment = {
        vertical: "top",
        horizontal: "left",
        wraptext: true,
      };

      worksheet.mergeCells("E3:F3");
      worksheet.getCell("E3:F3").value = {
        'richText': [
            { 'text':  "Supplier Type:" + "\n\n" },
            { 'font': { 'size': 11, }, 'text': "\n\n" + supplierQuotation[i].supliertype },
        ]
      };
      worksheet.getCell("E3:F3").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("E3:F3").alignment = {
        vertical: "top",
        horizontal: "left",
        wraptext: true,
      };

      worksheet.mergeCells("G3:I3");
      worksheet.getCell("G3:I3").value = 
      {
        'richText': [
            { 'text':  "Address:" + "\n\n" },
            { 'font': { 'size': 11, }, 'text': "\n\n" + supplierQuotation[i].address },
        ]
      };
      worksheet.getCell("G3:I3").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("G3:I3").alignment = {
        vertical: "top",
        horizontal: "left",
        wraptext: true,
      };

     
      worksheet.mergeCells("A4:B4");
      worksheet.getCell("A4:B4").value =
      {
        'richText': [
            { 'text':  "Prs No:" + "\n\n" },
            { 'font': { 'size': 11, }, 'text': "\n\n" + supplierQuotation[i].prsno2.prsNo  },
        ]
      };
      worksheet.getCell("A4:B4").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("A4:B4").alignment = {
        vertical: "top",
        horizontal: "left",
        wraptext: true,
      };

      worksheet.mergeCells("C4:D4");
      worksheet.getCell("C4:D4").value = 
      {
        'richText': [
            { 'text':  "Quotation No:" + "\n\n" },
            { 'font': { 'size': 11, }, 'text': "\n\n" + supplierQuotation[i].quotationNo },
        ]
      };
      worksheet.getCell("C4:D4").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("C4:D4").alignment = {
        vertical: "top",
        horizontal: "left",
        wraptext: true,
      };

      worksheet.mergeCells("E4:F4");
      worksheet.getCell("E4:F4").value = 
      {
        'richText': [
            { 'text':  "Quotation Date:" + "\n\n" },
            { 'font': { 'size': 11, }, 'text': "\n\n" + supplierQuotation[i].quotationDate },
        ]
      };
      worksheet.getCell("E4:F4").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("E4:F4").alignment = {
        vertical: "top",
        horizontal: "left",
        wraptext: true,
      };

      worksheet.mergeCells("G4:I4");
      worksheet.getCell("G4:I4").value = 
      {
        'richText': [
            { 'text':  "Validity Date:" + "\n\n" },
            { 'font': { 'size': 11, }, 'text': "\n\n" + supplierQuotation[i].validity },
        ]
      };
      worksheet.getCell("G4:I4").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("G4:I4").alignment = {
        vertical: "top",
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
      worksheet.getCell("G5").value = "UnitRate";
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

      for (let j = 0; j < supplierQuotation[i].supplierquotationitems001wbs.length; j++) {
        if (supplierQuotation[i].supplierquotationitems001wbs[j].cucode) {
            let temp = j + 6;
  
            worksheet.mergeCells("A" + temp);
            worksheet.getCell("A" + temp).value =
            supplierQuotation[i].supplierquotationitems001wbs[j].slNo;
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
              worksheet.getCell("B" + temp).value = supplierQuotation[i].supplierquotationitems001wbs[j].cucode ? consumableitem.find(x => x.slNo === supplierQuotation[i].supplierquotationitems001wbs[j].cucode)?.consmno : "";
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
            supplierQuotation[i].supplierquotationitems001wbs[j].cuname;
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
            supplierQuotation[i].supplierquotationitems001wbs[j].cudescrip;
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
            supplierQuotation[i].supplierquotationitems001wbs[j].cuom;
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
            supplierQuotation[i].supplierquotationitems001wbs[j].chsn;
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
            supplierQuotation[i].supplierquotationitems001wbs[j].cunitrate;
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
            supplierQuotation[i].supplierquotationitems001wbs[j].cuqunty;
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
            supplierQuotation[i].supplierquotationitems001wbs[j].cutotalamount;
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
        else if (supplierQuotation[i].supplierquotationitems001wbs[j].cptcode) {
            let temp = j + 6;
  
            worksheet.mergeCells("A" + temp);
            worksheet.getCell("A" + temp).value =
            supplierQuotation[i].supplierquotationitems001wbs[j].slNo;
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
              worksheet.getCell("B" + temp).value = supplierQuotation[i].supplierquotationitems001wbs[j].cptcode ? childpart.find(x => x.slNo === supplierQuotation[i].supplierquotationitems001wbs[j].cptcode)?.cpartno : "";
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
            supplierQuotation[i].supplierquotationitems001wbs[j].cptname;
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
            supplierQuotation[i].supplierquotationitems001wbs[j].cptdescrip;
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
            supplierQuotation[i].supplierquotationitems001wbs[j].cptuom;
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
            supplierQuotation[i].supplierquotationitems001wbs[j].cpthsn;
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
            supplierQuotation[i].supplierquotationitems001wbs[j].cptunitrate;
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
            supplierQuotation[i].supplierquotationitems001wbs[j].cptqunty;
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
            supplierQuotation[i].supplierquotationitems001wbs[j].cpttotalamount;
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
          else if (supplierQuotation[i].supplierquotationitems001wbs[j].prtcode) {
            let temp = j + 6;
  
            worksheet.mergeCells("A" + temp);
            worksheet.getCell("A" + temp).value =
            supplierQuotation[i].supplierquotationitems001wbs[j].slNo;
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
            worksheet.getCell("B" + temp).value = supplierQuotation[i].supplierquotationitems001wbs[j].prtcode ? part.find(x => x.slNo === supplierQuotation[i].supplierquotationitems001wbs[j].prtcode)?.partno : "";
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
            supplierQuotation[i].supplierquotationitems001wbs[j].prtmname;
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
            supplierQuotation[i].supplierquotationitems001wbs[j].prtdescrip;
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
            supplierQuotation[i].supplierquotationitems001wbs[j].prtuom;
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
            supplierQuotation[i].supplierquotationitems001wbs[j].prthsn;
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
            supplierQuotation[i].supplierquotationitems001wbs[j].prtunitrate;
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
            supplierQuotation[i].supplierquotationitems001wbs[j].prtqunty;
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
            supplierQuotation[i].supplierquotationitems001wbs[j].prttotalamount;
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
           else {
            let temp = j + 6;
  
            worksheet.mergeCells("A" + temp);
            worksheet.getCell("A" + temp).value =
            supplierQuotation[i].supplierquotationitems001wbs[j].slNo;
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
            worksheet.getCell("B" + temp).value = supplierQuotation[i].supplierquotationitems001wbs[j].itemcode ? ordeitem.find(x => x.slNo === supplierQuotation[i].supplierquotationitems001wbs[j].itemcode)?.itemcode : "";            
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
            supplierQuotation[i].supplierquotationitems001wbs[j].itemname;
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
            supplierQuotation[i].supplierquotationitems001wbs[j].descrip;
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
            supplierQuotation[i].supplierquotationitems001wbs[j].uom;
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
            supplierQuotation[i].supplierquotationitems001wbs[j].hsn;
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
            supplierQuotation[i].supplierquotationitems001wbs[j].unitrate;
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
            supplierQuotation[i].supplierquotationitems001wbs[j].qunty;
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
            supplierQuotation[i].supplierquotationitems001wbs[j].totalamount;
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

      let purlength = supplierQuotation[i].supplierquotationitems001wbs.length + 6;
  
        for (let k = 0; k < supplierQuotation[i].supplierquotationitems001wbs.length; k++) {
          supplierQuotationItem = supplierQuotation[i].supplierquotationitems001wbs;
        }
  
        let totalAmount = 0;
  
        for (let z = 0; z < supplierQuotationItem.length; z++) {
          if (supplierQuotationItem[z].cucode) {
            totalAmount = totalAmount + supplierQuotationItem[z].cutotalamount;
          } else if (supplierQuotationItem[z].cptcode) {
            totalAmount = totalAmount + supplierQuotationItem[z].cpttotalamount;
          } else if (supplierQuotationItem[z].prtcode) {
            totalAmount = totalAmount + supplierQuotationItem[z].prttotalamount;
          } else {
            totalAmount = totalAmount + supplierQuotationItem[z].totalamount;
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
            { font: { size: 11 }, text: Totalwords  + "\n\n" },
            { text: "Only"  + "\n\n" },
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

  async downloadExcel1(unitslno:any,id, response: Response) {

    let supplierQuotation = await this.supplierAuditRepository.find({
        where: { slNo: id , unitslno:unitslno},
        relations: ["supplierquotationitems001wbs","supplierSlno2","prsno2"],
      });
  
    let supplierQuotationItem = await this.supplierquotationitemsRepository.find();

    let ordeitem = await this.orderItemsRepository.find();

    let consumableitem = await this.consumbleRepository.find();
    
    let childpart = await this.childPartRepository.find();
    
    let part = await this.PartRepository.find();

    let supplieraudit = await this.supplierAuditRepository.find();

    let purslip = await this.PurchasereqslipRepository.find();


    for (let i = 0; i < supplierQuotation.length; i++) {
      
        supplierQuotationItem = supplierQuotation[i].supplierquotationitems001wbs;

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

      worksheet.mergeCells("A3:B3");
      worksheet.getCell("A3:B3").value = {
        'richText': [
            { 'text': "Supplier Code:" + "\n\n" },
            { 'font': { 'size': 11, }, 'text': "\n\n" + supplierQuotation[i].supplierSlno2.supplierCode },
        ]
      };
      worksheet.getCell("A3:B3").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("A3:B3").alignment = {
        vertical: "top",
        horizontal: "left",
        wraptext: true,
      };

      worksheet.mergeCells("C3:D3");
      worksheet.getCell("C3:D3").value =  {
        'richText': [
            { 'text': "Supplier Name:" + "\n\n" },
            { 'font': { 'size': 11, }, 'text': "\n\n" + supplierQuotation[i].supliername },
        ]
      };
      worksheet.getCell("C3:D3").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("C3:D3").alignment = {
        vertical: "top",
        horizontal: "left",
        wraptext: true,
      };

      worksheet.mergeCells("E3:F3");
      worksheet.getCell("E3:F3").value = {
        'richText': [
            { 'text':  "Supplier Type:" + "\n\n" },
            { 'font': { 'size': 11, }, 'text': "\n\n" + supplierQuotation[i].supliertype },
        ]
      };
      worksheet.getCell("E3:F3").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("E3:F3").alignment = {
        vertical: "top",
        horizontal: "left",
        wraptext: true,
      };

      worksheet.mergeCells("G3:I3");
      worksheet.getCell("G3:I3").value = 
      {
        'richText': [
            { 'text':  "Address:" + "\n\n" },
            { 'font': { 'size': 11, }, 'text': "\n\n" + supplierQuotation[i].address },
        ]
      };
      worksheet.getCell("G3:I3").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("G3:I3").alignment = {
        vertical: "top",
        horizontal: "left",
        wraptext: true,
      };

      worksheet.mergeCells("A4:B4");
      worksheet.getCell("A4:B4").value =
      {
        'richText': [
            { 'text':  "Prs No:" + "\n\n" },
            { 'font': { 'size': 11, }, 'text': "\n\n" +  supplierQuotation[i].prsno2.prsNo },
        ]
      };
      worksheet.getCell("A4:B4").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("A4:B4").alignment = {
        vertical: "top",
        horizontal: "left",
        wraptext: true,
      };

      worksheet.mergeCells("C4:D4");
      worksheet.getCell("C4:D4").value = 
      {
        'richText': [
            { 'text':  "Quotation No:" + "\n\n" },
            { 'font': { 'size': 11, }, 'text': "\n\n" + supplierQuotation[i].quotationNo },
        ]
      };
      worksheet.getCell("C4:D4").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("C4:D4").alignment = {
        vertical: "top",
        horizontal: "left",
        wraptext: true,
      };

      worksheet.mergeCells("E4:F4");
      worksheet.getCell("E4:F4").value = 
      {
        'richText': [
            { 'text':  "Quotation Date:" + "\n\n" },
            { 'font': { 'size': 11, }, 'text': "\n\n" + supplierQuotation[i].quotationDate },
        ]
      };
      worksheet.getCell("E4:F4").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("E4:F4").alignment = {
        vertical: "top",
        horizontal: "left",
        wraptext: true,
      };

      worksheet.mergeCells("G4:I4");
      worksheet.getCell("G4:I4").value = 
      {
        'richText': [
            { 'text':  "Validity Date:" + "\n\n" },
            { 'font': { 'size': 11, }, 'text': "\n\n" + supplierQuotation[i].validity },
        ]
      };
      worksheet.getCell("G4:I4").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("G4:I4").alignment = {
        vertical: "top",
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


          for (let j = 0; j < supplierQuotationItem.length; j++) {
            if (supplierQuotationItem[j].cucode) {
                let temp = j + 6;
      
                worksheet.mergeCells("A" + temp);
                worksheet.getCell("A" + temp).value =
                supplierQuotationItem[j].slNo;
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
                  worksheet.getCell("B" + temp).value = supplierQuotationItem[j].cucode ? consumableitem.find(x => x.slNo ===  supplierQuotationItem[j].cucode)?.consmno : "";
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
                supplierQuotationItem[j].cuname;
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
                supplierQuotationItem[j].cudescrip;
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
                supplierQuotationItem[j].cuom;
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
                supplierQuotationItem[j].chsn;
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
                supplierQuotationItem[j].cunitrate;
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
                supplierQuotationItem[j].cuqunty;
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
                supplierQuotationItem[j].cutotalamount;
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
            else if (supplierQuotationItem[j].cptcode) {
                let temp = j + 6;
      
                worksheet.mergeCells("A" + temp);
                worksheet.getCell("A" + temp).value =
                supplierQuotationItem[j].slNo;
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
                worksheet.getCell("B" + temp).value = supplierQuotationItem[j].cptcode ? childpart.find(x => x.slNo ===  supplierQuotationItem[j].cptcode)?.cpartno : "";
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
                supplierQuotationItem[j].cptname;
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
                supplierQuotationItem[j].cptdescrip;
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
                supplierQuotationItem[j].cptuom;
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
                supplierQuotationItem[j].cpthsn;
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
                supplierQuotationItem[j].cptunitrate;
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
                supplierQuotationItem[j].cptqunty;
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
                supplierQuotationItem[j].cpttotalamount;
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
              else if (supplierQuotationItem[j].prtcode) {
                let temp = j + 6;
      
                worksheet.mergeCells("A" + temp);
                worksheet.getCell("A" + temp).value =
                supplierQuotationItem[j].slNo;
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
                worksheet.getCell("B" + temp).value = supplierQuotationItem[j].prtcode ? part.find(x => x.slNo ===  supplierQuotationItem[j].prtcode)?.partno : "";
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
                supplierQuotationItem[j].prtmname;
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
                supplierQuotationItem[j].prtdescrip;
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
                supplierQuotationItem[j].prtuom;
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
                supplierQuotationItem[j].prthsn;
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
                supplierQuotationItem[j].prtunitrate;
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
                supplierQuotationItem[j].prtqunty;
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
                supplierQuotationItem[j].prttotalamount;
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
               else {
                let temp = j + 6;
      
                worksheet.mergeCells("A" + temp);
                worksheet.getCell("A" + temp).value =
                supplierQuotationItem[j].slNo;
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
                worksheet.getCell("B" + temp).value = supplierQuotationItem[j].itemcode ? ordeitem.find(x => x.slNo ===  supplierQuotationItem[j].itemcode)?.itemcode : "";
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
                supplierQuotationItem[j].itemname;
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
                supplierQuotationItem[j].descrip;
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
                supplierQuotationItem[j].uom;
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
                supplierQuotationItem[j].hsn;
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
                supplierQuotationItem[j].unitrate;
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
                supplierQuotationItem[j].qunty;
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
                supplierQuotationItem[j].totalamount;
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

          let purlength = supplierQuotation[i].supplierquotationitems001wbs.length + 6;
  
        for (let k = 0; k < supplierQuotation[i].supplierquotationitems001wbs.length; k++) {
          supplierQuotationItem = supplierQuotation[i].supplierquotationitems001wbs;
        }
  
        let totalAmount = 0;
  
        for (let z = 0; z < supplierQuotationItem.length; z++) {
          if (supplierQuotationItem[z].cucode) {
            totalAmount = totalAmount + supplierQuotationItem[z].cutotalamount;
          } else if (supplierQuotationItem[z].cptcode) {
            totalAmount = totalAmount + supplierQuotationItem[z].cpttotalamount;
          } else if (supplierQuotationItem[z].prtcode) {
            totalAmount = totalAmount + supplierQuotationItem[z].prttotalamount;
          } else {
            totalAmount = totalAmount + supplierQuotationItem[z].totalamount;
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
            { font: { size: 11 }, text: Totalwords  + "\n\n" },
            { text: "Only"  + "\n\n" },
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
