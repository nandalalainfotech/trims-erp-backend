import { HttpException, HttpStatus, Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PurchaseInvoicePayDTO } from "src/dto/PurchaseInvoicePay.dto";
import { Purchaseinvoiceitems001wb } from "src/entity/Purchaseinvoiceitems001wb";
import { Purchaseinvoicepay001wb } from "src/entity/Purchaseinvoicepay001wb";
import { Request } from "supertest";
import { getManager, Repository } from "typeorm";
var path = require("path");
const excel = require("exceljs");
var converter = require("number-to-words");
import { Response } from "express";
import { createReadStream } from "fs";
import { Part001mb } from "src/entity/Part001mb";
import { Childpart001mb } from "src/entity/ChildPart001mb";
import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { Consumble001mb } from "src/entity/Consumble001mb";
import { Orderitem001wb } from "src/entity/Orderitem001wb";
import { Supplierquotation001wb } from "src/entity/Supplierquotation001wb";
import { Supplierregistration001mb } from "src/entity/Supplierregistration001mb";
import { Materialinward001wb } from "src/entity/Materialinward001wb";
import { Purchasereqslip001wb } from "src/entity/Purchasereqslip001wb";
import { Purchaseorder001wb } from "src/entity/Purchaseorder001wb";

@Injectable()
export class PurchaseInvoicePayService {
  constructor(
    @InjectRepository(Purchaseinvoicepay001wb)private readonly purchaseInvoicePayRepository: Repository<Purchaseinvoicepay001wb>,
    @InjectRepository(Purchaseinvoiceitems001wb) private readonly purchaseInvoiceItemRepository: Repository<Purchaseinvoiceitems001wb>,
    @InjectRepository(Orderitem001mb)private readonly orderItemsRepository: Repository<Orderitem001mb>,
    @InjectRepository(Consumble001mb) private readonly consumbleRepository: Repository<Consumble001mb>,
    @InjectRepository(Childpart001mb)private readonly childPartRepository: Repository<Childpart001mb>,
    @InjectRepository(Part001mb)private readonly PartRepository: Repository<Part001mb>,
    @InjectRepository(Purchasereqslip001wb)private readonly PurchasereqslipRepository: Repository<Purchasereqslip001wb>,
    @InjectRepository(Materialinward001wb)private readonly MaterialinwardRepository: Repository<Materialinward001wb>,
    @InjectRepository(Orderitem001wb) private readonly orderItemRepository: Repository<Orderitem001wb>,
    @InjectRepository(Supplierregistration001mb) private readonly supplierRegRepository: Repository<Supplierregistration001mb>,
   
    @InjectRepository(Supplierquotation001wb)private readonly supplierAuditRepository: Repository<Supplierquotation001wb>,
    @InjectRepository(Purchaseorder001wb)private readonly PurchaseorderRepository: Repository<Purchaseorder001wb>,
  ) {}

  async create1(purchaseInvoicePayDTO: PurchaseInvoicePayDTO): Promise<Purchaseinvoicepay001wb> {
    let purchaseinvoiceitems001wbs: Purchaseinvoiceitems001wb[] = [];
    for (let i = 0; i < purchaseInvoicePayDTO.purchaseItem.length; i++) {
      const purchaseinvoiceitems001wb = new Purchaseinvoiceitems001wb();
      purchaseinvoiceitems001wb.purchaseslno2 = purchaseInvoicePayDTO.purchaseItem[i].purchaseslno2;
      purchaseinvoiceitems001wb.itemcode = purchaseInvoicePayDTO.purchaseItem[i].itemcode;
      purchaseinvoiceitems001wb.itemname = purchaseInvoicePayDTO.purchaseItem[i].itemname;
      purchaseinvoiceitems001wb.qunty = purchaseInvoicePayDTO.purchaseItem[i].qunty;
      purchaseinvoiceitems001wb.unitrate = purchaseInvoicePayDTO.purchaseItem[i].unitrate;
      purchaseinvoiceitems001wb.totalamount = purchaseInvoicePayDTO.purchaseItem[i].totalamount;
      purchaseinvoiceitems001wb.uom = purchaseInvoicePayDTO.purchaseItem[i].descrip;
      purchaseinvoiceitems001wb.descrip = purchaseInvoicePayDTO.purchaseItem[i].descrip;

      purchaseinvoiceitems001wb.cucode = purchaseInvoicePayDTO.purchaseItem[i].cucode;
      purchaseinvoiceitems001wb.cuname = purchaseInvoicePayDTO.purchaseItem[i].cuname;
      purchaseinvoiceitems001wb.cuqunty = purchaseInvoicePayDTO.purchaseItem[i].cuqunty;
      purchaseinvoiceitems001wb.cunitrate = purchaseInvoicePayDTO.purchaseItem[i].cunitrate;
      purchaseinvoiceitems001wb.cutotalamount = purchaseInvoicePayDTO.purchaseItem[i].cutotalamount;
      purchaseinvoiceitems001wb.cuom = purchaseInvoicePayDTO.purchaseItem[i].cuom;
      purchaseinvoiceitems001wb.cudescrip = purchaseInvoicePayDTO.purchaseItem[i].cudescrip;

      purchaseinvoiceitems001wb.cptcode = purchaseInvoicePayDTO.purchaseItem[i].cptcode;
      purchaseinvoiceitems001wb.cptname = purchaseInvoicePayDTO.purchaseItem[i].cptname;
      purchaseinvoiceitems001wb.cptqunty = purchaseInvoicePayDTO.purchaseItem[i].cptqunty;
      purchaseinvoiceitems001wb.cptunitrate = purchaseInvoicePayDTO.purchaseItem[i].cptunitrate;
      purchaseinvoiceitems001wb.cpttotalamount = purchaseInvoicePayDTO.purchaseItem[i].cpttotalamount;
      purchaseinvoiceitems001wb.cptuom = purchaseInvoicePayDTO.purchaseItem[i].cptdescrip;
      purchaseinvoiceitems001wb.cptdescrip = purchaseInvoicePayDTO.purchaseItem[i].cptdescrip;
      purchaseinvoiceitems001wb.hsn = purchaseInvoicePayDTO.purchaseItem[i].hsn;
      purchaseinvoiceitems001wb.chsn = purchaseInvoicePayDTO.purchaseItem[i].chsn;
      purchaseinvoiceitems001wb.cpthsn = purchaseInvoicePayDTO.purchaseItem[i].cpthsn;
      purchaseinvoiceitems001wb.prthsn = purchaseInvoicePayDTO.purchaseItem[i].prthsn;
      purchaseinvoiceitems001wb.prtcode = purchaseInvoicePayDTO.purchaseItem[i].prtcode;
      purchaseinvoiceitems001wb.prtmname = purchaseInvoicePayDTO.purchaseItem[i].prtmname;
      purchaseinvoiceitems001wb.prtqunty = purchaseInvoicePayDTO.purchaseItem[i].prtqunty;
      purchaseinvoiceitems001wb.prtunitrate = purchaseInvoicePayDTO.purchaseItem[i].prtunitrate;
      purchaseinvoiceitems001wb.prttotalamount = purchaseInvoicePayDTO.purchaseItem[i].prttotalamount;
      purchaseinvoiceitems001wb.prtuom = purchaseInvoicePayDTO.purchaseItem[i].prtuom;
      purchaseinvoiceitems001wb.prtdescrip = purchaseInvoicePayDTO.purchaseItem[i].prtdescrip;
      purchaseinvoiceitems001wb.unitslno = purchaseInvoicePayDTO.unitslno;
      purchaseinvoiceitems001wb.insertUser = purchaseInvoicePayDTO.insertUser;
      purchaseinvoiceitems001wb.insertDatetime = purchaseInvoicePayDTO.insertDatetime;
      let  purchaseitem = await this.purchaseInvoiceItemRepository.save(purchaseinvoiceitems001wb);
      purchaseinvoiceitems001wbs.push(purchaseitem);

    }

    if (purchaseinvoiceitems001wbs.length > 0) {
      const purchaseinvoicepay001wb = new Purchaseinvoicepay001wb();
      purchaseinvoicepay001wb.setProperties(purchaseInvoicePayDTO);
      purchaseinvoicepay001wb.purchaseinvoiceitems001wbs = purchaseinvoiceitems001wbs;
      await this.purchaseInvoicePayRepository.save(purchaseinvoicepay001wb);
      return purchaseinvoicepay001wb;
    }else{
      throw new HttpException('Please Add Item Details', HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }


  async create2(file: any,purchaseInvoicePayDTO: PurchaseInvoicePayDTO): Promise<Purchaseinvoicepay001wb> {
   
    let purchaseinvoicepay001wb = new Purchaseinvoicepay001wb();
    purchaseinvoicepay001wb.setProperties(purchaseInvoicePayDTO);
    purchaseinvoicepay001wb = await this.purchaseInvoicePayRepository.findOne({ where: { slNo: purchaseInvoicePayDTO.slNo } });
    purchaseinvoicepay001wb.originalfilename = file.filename;
    await this.purchaseInvoicePayRepository.update({ slNo: purchaseInvoicePayDTO.slNo },purchaseinvoicepay001wb);
    return purchaseinvoicepay001wb;
 }

 async update(purchaseInvoicePayDTO: PurchaseInvoicePayDTO): Promise<Purchaseinvoicepay001wb> {
    const purchaseinvoicepay001wb = new Purchaseinvoicepay001wb();
    purchaseinvoicepay001wb.setProperties(purchaseInvoicePayDTO);
    await this.purchaseInvoicePayRepository.update({ slNo: purchaseinvoicepay001wb.slNo },purchaseinvoicepay001wb);
    return purchaseinvoicepay001wb;
}


async update1(file: any,purchaseInvoicePayDTO: PurchaseInvoicePayDTO): Promise<Purchaseinvoicepay001wb> {
   
  let purchaseinvoicepay001wb = new Purchaseinvoicepay001wb();
  purchaseinvoicepay001wb.setProperties(purchaseInvoicePayDTO);
  purchaseinvoicepay001wb = await this.purchaseInvoicePayRepository.findOne({ where: { slNo: purchaseInvoicePayDTO.slNo } });
  purchaseinvoicepay001wb.originalfilename = file.filename;
  await this.purchaseInvoicePayRepository.update({ slNo: purchaseInvoicePayDTO.slNo },purchaseinvoicepay001wb);
  return purchaseinvoicepay001wb;
}

 async findAll(unitslno:any): Promise<Purchaseinvoicepay001wb[]> {
    
    return this.purchaseInvoicePayRepository.find({order: { slNo: "DESC" },relations: ["poSlno2"],where:{unitslno:unitslno}});
  }

  async remove(id: string): Promise<void> {
    await this.purchaseInvoicePayRepository.delete(id);
  }

  async downloadParamsPdf(unitslno:any,id: any, response: Response) {
    let purInvoicePay = await this.purchaseInvoicePayRepository.find({
      relations:["purchaseinvoiceitems001wbs","poSlno2"],
      where: { slNo: id ,unitslno:unitslno},
    });

    let purInvoiceItem: Purchaseinvoiceitems001wb[] = [];


    let ordeitem = await this.orderItemsRepository.find();

    let consumableitem = await this.consumbleRepository.find();

    let childpart = await this.childPartRepository.find();

    let part = await this.PartRepository.find();

    let supplier = await this.supplierRegRepository.find();

    let materialinward = await this.MaterialinwardRepository.find();
   
    let purchaslip = await this.PurchasereqslipRepository.find();

    let Purchaseorder = await this.PurchaseorderRepository.find();
    
    let supAudit = await this.supplierAuditRepository.find();

    let totalAmount = 0;

    for (let i = 0; i < purInvoicePay.length; i++) {
      for (let j = 0; j < purInvoicePay[i].purchaseinvoiceitems001wbs.length; j++) {
        purInvoiceItem.push(purInvoicePay[i].purchaseinvoiceitems001wbs[j]);
         totalAmount += purInvoicePay[i].purchaseinvoiceitems001wbs[j].totalamount;
         totalAmount += purInvoicePay[i].purchaseinvoiceitems001wbs[j].cutotalamount;
         totalAmount += purInvoicePay[i].purchaseinvoiceitems001wbs[j].cpttotalamount;
         totalAmount += purInvoicePay[i].purchaseinvoiceitems001wbs[j].prttotalamount;
         
    }
    }

    let totalwords = converter.toWords(totalAmount);
    let Totalwords = totalwords.toUpperCase();

    var fs = require("fs");
    var pdf = require("dynamic-html-pdf");
    var html = fs.readFileSync("purchaseInvoice.html", "utf8");
    let itemSlno =0;

    var options = {
      format: "A3",
      orientation: "landscape",
      border: "10mm",
    };

    pdf.registerHelper("ifgrno", function (grnNo, options) {
      this.grnNo  = this.grnNo?materialinward.find(x => x.slNo === this.grnNo)?.grn : null;
         if (this.grnNo == undefined ) { 
           return options.inverse(this);
         }else{
           return options.fn(this, this.grnNo);   
         }
     });
    
  
     pdf.registerHelper("ifprno", function (prsNo, options) {
      this.prsNo  = this.prsNo?purchaslip.find(x => x.slNo === this.prsNo)?.prsNo : null;
         if (this.prsNo == undefined ) { 
           return options.inverse(this);
         }else{
           return options.fn(this, this.prsNo);   
         }
     });
  
     pdf.registerHelper("ifscno", function (suppliercode, options) {
      if (this.suppliercode) {
      this.purorderslno = this.suppliercode ? supAudit.find(x => x.slNo === this.suppliercode)?.supplierSlno : null;
      this.suppliercode  = this.purorderslno?supplier.find(x => x.slNo === this.purorderslno)?.supplierCode : null;
      return options.fn(this,  this.suppliercode);
      }else {
      return options.inverse(this);
      }
     });
  

    pdf.registerHelper('iforderslno', function (itemcode, options ) {
      if (this.itemcode) {
        this.itemcode =  this.itemcode?ordeitem.find(x => x.slNo === this.itemcode)?.itemcode: null;
        this.slNo=++itemSlno;
        return options.fn(this,  this.itemcode);
      }else{
        return options.inverse(this);
      }
  })

  pdf.registerHelper('ifcucode', function (cucode, options) {
      if (this.cucode) {
        this.cucode =  this.cucode?consumableitem.find(x => x.slNo === this.cucode)?.consmno: null;          
        this.slNo=++itemSlno;
        return options.fn(this, this.cucode); 
      }else{
        return options.inverse(this);
      } 
    
  })

  pdf.registerHelper('ifcptcode', function (cptcode, options ) {
      if (this.cptcode) {
        this.cptcode =  this.cptcode?childpart.find(x => x.slNo === this.cptcode)?.cpartno: null;  
        this.slNo=++itemSlno;
        return options.fn(this, this.cptcode);
      }else{
        return options.inverse(this);
      }
  })

  pdf.registerHelper('ifprtcode', function (prtcode, options ) {
      if (this.prtcode) {
        this.prtcode =  this.prtcode?part.find(x => x.slNo === this.prtcode)?.partno: null;
        this.slNo=++itemSlno;
        return options.fn(this,  this.prtcode);
      }else{
        return options.inverse(this);
      }
  })

    var document = {
      type: "file",
      template: html,
      context: {
        PurInvoicePay: purInvoicePay,
        purInvoiceItem: purInvoiceItem,
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

  async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {

    let purInvoicePay = await this.purchaseInvoicePayRepository.find({
      where: { unitslno:unitslno},
      relations: ["poSlno2","purchaseinvoiceitems001wbs"],
      order: { slNo: "DESC" }
    });


    let ordeitem = await this.orderItemsRepository.find();

    let consumableitem = await this.consumbleRepository.find();

    let childpart = await this.childPartRepository.find();

    let part = await this.PartRepository.find();

    let supplier = await this.supplierRegRepository.find();

    let materialinward = await this.MaterialinwardRepository.find();
   
    let purchaslip = await this.PurchasereqslipRepository.find();

    let supAudit = await this.supplierAuditRepository.find();
   

    var fs = require("fs");
    var pdf = require("dynamic-html-pdf");
    var html = fs.readFileSync("purchaseInvoices.html", "utf8");
    let itemFullSlno =0;


  let itemcodes: any;
  let conscodes: any;
  let cpartcodes: any;
  let partcodes: any;

  pdf.registerHelper("ifgrno", function (grnNo, options) {
    this.grnNo  = this.grnNo?materialinward.find(x => x.slNo === this.grnNo)?.grn : null;
       if (this.grnNo == undefined ) { 
         return options.inverse(this);
       }else{
        // console.log("grnNo",this.grnNo);
         return options.fn(this, this.grnNo);   
       }
   });
  

   pdf.registerHelper("ifprno", function (prsNo, options) {
    this.prsNo  = this.prsNo?purchaslip.find(x => x.slNo === this.prsNo)?.prsNo : null;
       if (this.prsNo == undefined ) { 
         return options.inverse(this);
       }else{
        // console.log("prsNo",this.prsNo);
         return options.fn(this, this.prsNo);   
       }
   });


   pdf.registerHelper("ifscno", function (suppliercode, options) {
    if (this.suppliercode) {
    this.purorderslno = this.suppliercode ? supAudit.find(x => x.slNo === this.suppliercode)?.supplierSlno : null;
    this.suppliercode  = this.purorderslno?supplier.find(x => x.slNo === this.purorderslno)?.supplierCode : null;
    return options.fn(this,  this.suppliercode);
    }else {
    return options.inverse(this);
    }
   });



  pdf.registerHelper("iforderslno", function (orderslno, options) {
    const value1 = this.itemcode?this.itemcode : undefined;
    this.itemcode=this.itemcode?ordeitem.find(x => x.slNo === value1)?.itemcode : null;
       if (value1 == undefined ) { 
         return options.inverse(this);
       }else{
        this.slNo = ++itemFullSlno
         return options.fn(this, this.itemcode,this.slNo);
       }
       
   });
  pdf.registerHelper('ifcucode', function (cucode, options) {
     const value2 = this.cucode?this.cucode : undefined;
     this.itemcode=this.cucode?consumableitem.find(x => x.slNo === value2)?.consmno : null;
         if (value2 == undefined ) {
           return options.inverse(this);
         }else{
          this.slNo = ++itemFullSlno
           return options.fn(this, this.itemcode,this.slNo);
         }
   })

  pdf.registerHelper('ifcptcode', function (cptcode, options ) {
     const value3 = this.cptcode?this.cptcode : undefined;
     this.itemcode=this.cptcode?childpart.find(x => x.slNo === value3)?.cpartno : null;
         if (value3 == undefined ) {
           return options.inverse(this);
         }else{
          this.slNo = ++itemFullSlno
           return options.fn(this, this.itemcode,this.slNo);
         }
   })

   pdf.registerHelper('ifprtcode', function (prtcode, options ) {
     const value4 = this.prtcode?this.prtcode : undefined;
     this.itemcode=this.prtcode?part.find(x => x.slNo === value4)?.partno : null;
         if (value4 == undefined ) {
           return options.inverse(this);
         }else{
          this.slNo = ++itemFullSlno
           return options.fn(this, this.itemcode,this.slNo);
         }
   })

   pdf.registerHelper("iftotalamount", function (totalamount, options) {
    this.tAmount = 0;
    let value1 = 0;
    this.tWords = "";
    for (let i = 0; i < this.purchaseinvoiceitems001wbs.length; i++) {
      this.tAmount += this.purchaseinvoiceitems001wbs[i].totalamount
      value1 = this.purchaseinvoiceitems001wbs[i].totalamount;   
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

  pdf.registerHelper("ifcpttotalamount", function (cpttotalamount, options) {
    this.tAmount = 0;
    let value1 = 0;
    this.tWords = "";
    for (let i = 0; i < this.purchaseinvoiceitems001wbs.length; i++) {
      this.tAmount += this.purchaseinvoiceitems001wbs[i].cpttotalamount
      value1 = this.purchaseinvoiceitems001wbs[i].cpttotalamount;
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

  pdf.registerHelper("ifcutotalamount", function (cutotalamount, options) {
    this.tAmount=0;
    let value1=0;
    this.tWords = "";
    for (let i = 0; i < this.purchaseinvoiceitems001wbs.length; i++) {
      this.tAmount += this.purchaseinvoiceitems001wbs[i].cutotalamount
      value1 = this.purchaseinvoiceitems001wbs[i].cutotalamount;
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

  pdf.registerHelper("ifprttotalamount", function (prttotalamount, options) {
    this.tAmount=0;
    let value1=0;
    this.tWords = "";
    for (let i = 0; i < this.purchaseinvoiceitems001wbs.length; i++) {
      this.tAmount += this.purchaseinvoiceitems001wbs[i].prttotalamount
      value1 = this.purchaseinvoiceitems001wbs[i].prttotalamount;  
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

    

    var options = {
      format: "A3",
      orientation: "landscape",
      border: "10mm",
    };

   

      var document = {
        type: "file",
        template: html,
        context: {
          PurInvoicePay: purInvoicePay,
          itemcodes: itemcodes,
          conscodes: conscodes,
          cpartcodes: cpartcodes,
          partcodes: partcodes,
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

  async downloadExcel(unitslno:any,@Req() request: Request, @Res() response: Response) {

    let pueInvoicePay = await this.purchaseInvoicePayRepository.find({
      where: { unitslno:unitslno},
      relations: ["poSlno2","purchaseinvoiceitems001wbs"],
      order: { slNo: "DESC" }
    });

    let purchaseinInvitem = await this.purchaseInvoiceItemRepository.find();

    let supplieraudit = await this.supplierAuditRepository.find();

    let orderitem = await this.orderItemsRepository.find();

    let consumableitem = await this.consumbleRepository.find();

    let childpart = await this.childPartRepository.find();

    let part = await this.PartRepository.find();

    let supplier = await this.supplierRegRepository.find();

    let materialinward = await this.MaterialinwardRepository.find();
   
    let purchaslip = await this.PurchasereqslipRepository.find();

    let workbook = new excel.Workbook();
    for (let i = 0; i < pueInvoicePay.length; i++) {
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
        worksheet.getCell('B3:H4').value = "PURCHASE INVOICE REPORT";
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
        worksheet.getCell('I2').value = "Issue Date : ";
        worksheet.getCell('I2').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('I3');
        worksheet.getCell('I3').value = "Rev. No. 00	";
        worksheet.getCell('I3').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('I4');
        worksheet.getCell('I4').value = "Rev Date :";
        worksheet.getCell('I4').alignment = { vertical: 'left', horizontal: 'left' };

        worksheet.mergeCells('A5:C5');
        worksheet.getCell('A5:C5').value = {
          richText: [
            { text: "PO NO:" + "\n\n" },
            { font: { size: 11 }, text: "\n\n" +  pueInvoicePay[i].poSlno2.pono},
          ],
        };
        worksheet.getCell('A5:C5').alignment = { vertical: 'middle', horizontal: 'left' };


        worksheet.mergeCells('D5:E5');
        worksheet.getCell('D5:E5').value = {
          richText: [
            { text: "PRS NO:" + "\n\n" },
            { font: { size: 11 }, text: "\n\n" +  pueInvoicePay[i].prsNo ? purchaslip.find(x => x.slNo === pueInvoicePay[i].prsNo)?.prsNo : "" },
          ],
        };
        worksheet.getCell('D5:E5').alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells('F5:G5');
        worksheet.getCell('F5:G5').value = {
          richText: [
            { text: "GRS NO:" + "\n\n" },
            { font: { size: 11 }, text: "\n\n" + pueInvoicePay[i].grnNo ? materialinward.find(x => x.slNo === pueInvoicePay[i].grnNo)?.grn : "" },
          ],
        };

        

        worksheet.getCell('F5:G5').alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells('H5:I5');
        worksheet.getCell('H5:I5').value = {
          richText: [
            { text: "Date:" + "\n\n" },
            { font: { size: 11 }, text: "\n\n" +  pueInvoicePay[i].cDate},
          ],
        };
        worksheet.getCell('H5:I5').alignment = { vertical: 'middle', horizontal: 'left' };

        let suppslno:Supplierquotation001wb;

        suppslno = supplieraudit.find(x => x.slNo === pueInvoicePay[i].suppliercode); 

        worksheet.mergeCells('A6:C6');
        worksheet.getCell('A6:C6').value = {
          richText: [
            { text: "Supplier Code:" + "\n\n" },
            { font: { size: 11 }, text: "\n\n" +  suppslno.supplierSlno ? supplier.find(x => x.slNo ===suppslno.supplierSlno)?.supplierCode : "" },
          ],
        };
        worksheet.getCell('A6:C6').alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells('D6:E6');
        worksheet.getCell('D6:E6').value = {
          richText: [
            { text: "Supplier Name:" + "\n\n" },
            { font: { size: 11 }, text: "\n\n" +  pueInvoicePay[i].suppliername},
          ],
        };
        worksheet.getCell('D6:E6').alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells('F6:G6');
        worksheet.getCell('F6:G6').value = {
          richText: [
            { text: "Purchase Invoice No:" + "\n\n" },
            { font: { size: 11 }, text: "\n\n" +  pueInvoicePay[i].purchaseInvoice},
          ],
        };
        worksheet.getCell('F6:G6').alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells('H6:I6');
        worksheet.getCell('H6:I6').value = {
          richText: [
            { text: "Incoming Inspection No:" + "\n\n" },
            { font: { size: 11 }, text: "\n\n" +  pueInvoicePay[i].incomingNo},
          ],
        };
        worksheet.getCell('H6:I6').alignment = { vertical: 'middle', horizontal: 'left' };

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

      for (let j = 0; j < pueInvoicePay[i].purchaseinvoiceitems001wbs.length; j++) {
        if (pueInvoicePay[i].purchaseinvoiceitems001wbs[j].cucode) {
          let temp = j + 8;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value =
         j+1;
          worksheet.getCell("A" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("A" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

         
            worksheet.mergeCells("B" + temp);
            worksheet.getCell("B" + temp).value =  pueInvoicePay[i].purchaseinvoiceitems001wbs[j].cucode ? consumableitem.find(x => x.slNo ===   pueInvoicePay[i].purchaseinvoiceitems001wbs[j].cucode)?.consmno : "";
            worksheet.getCell("B" + temp).font = {
              size: 11,
              bold: true,
            };
            worksheet.getCell("B" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };

          worksheet.mergeCells("C" + temp);
          worksheet.getCell("C" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].cuname;
          worksheet.getCell("C" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("C" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("D" + temp);
          worksheet.getCell("D" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].cudescrip;
          worksheet.getCell("D" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("D" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("E" + temp);
          worksheet.getCell("E" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].cuom;
          worksheet.getCell("E" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("E" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("F" + temp);
          worksheet.getCell("F" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].chsn;
          worksheet.getCell("F" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("F" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("G" + temp);
          worksheet.getCell("G" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].cunitrate;
          worksheet.getCell("G" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("G" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("H" + temp);
          worksheet.getCell("H" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].cuqunty;
          worksheet.getCell("H" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("H" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("I" + temp);
          worksheet.getCell("I" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].cutotalamount;
          worksheet.getCell("I" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("I" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        } else if (pueInvoicePay[i].purchaseinvoiceitems001wbs[j].cptcode) {
          let temp = j + 8;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value =
          j+1;
          worksheet.getCell("A" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("A" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

            worksheet.mergeCells("B" + temp);
            worksheet.getCell("B" + temp).value = pueInvoicePay[i].purchaseinvoiceitems001wbs[j].cptcode ? childpart.find(x => x.slNo ===   pueInvoicePay[i].purchaseinvoiceitems001wbs[j].cptcode)?.cpartno : "";
            worksheet.getCell("B" + temp).font = {
              size: 11,
              bold: true,
            };
            worksheet.getCell("B" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };

          worksheet.mergeCells("C" + temp);
          worksheet.getCell("C" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].cptname;
          worksheet.getCell("C" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("C" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("D" + temp);
          worksheet.getCell("D" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].cptdescrip;
          worksheet.getCell("D" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("D" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("E" + temp);
          worksheet.getCell("E" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].cptuom;
          worksheet.getCell("E" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("E" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("F" + temp);
          worksheet.getCell("F" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].cpthsn;
          worksheet.getCell("F" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("F" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("G" + temp);
          worksheet.getCell("G" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].cptunitrate;
          worksheet.getCell("G" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("G" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("H" + temp);
          worksheet.getCell("H" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].cptqunty;
          worksheet.getCell("H" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("H" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("I" + temp);
          worksheet.getCell("I" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].cpttotalamount;
          worksheet.getCell("I" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("I" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        } else if (pueInvoicePay[i].purchaseinvoiceitems001wbs[j].prtcode) {
          let temp = j + 8;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value =
          j+1;
          worksheet.getCell("A" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("A" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

            worksheet.mergeCells("B" + temp);
            worksheet.getCell("B" + temp).value = pueInvoicePay[i].purchaseinvoiceitems001wbs[j].prtcode ? part.find(x => x.slNo ===   pueInvoicePay[i].purchaseinvoiceitems001wbs[j].prtcode)?.partno : "";
            worksheet.getCell("B" + temp).font = {
              size: 11,
              bold: true,
            };
            worksheet.getCell("B" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };

          worksheet.mergeCells("C" + temp);
          worksheet.getCell("C" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].prtmname;
          worksheet.getCell("C" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("C" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("D" + temp);
          worksheet.getCell("D" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].prtdescrip;
          worksheet.getCell("D" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("D" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("E" + temp);
          worksheet.getCell("E" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].prtuom;
          worksheet.getCell("E" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("E" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("F" + temp);
          worksheet.getCell("F" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].prthsn;
          worksheet.getCell("F" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("F" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("G" + temp);
          worksheet.getCell("G" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].prtunitrate;
          worksheet.getCell("G" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("G" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("H" + temp);
          worksheet.getCell("H" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].prtqunty;
          worksheet.getCell("H" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("H" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("I" + temp);
          worksheet.getCell("I" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].prttotalamount;
          worksheet.getCell("I" + temp).font = {
            size: 11,
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
            size: 11,
            bold: true,
          };
          worksheet.getCell("A" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

            worksheet.mergeCells("B" + temp);
            worksheet.getCell("B" + temp).value = pueInvoicePay[i].purchaseinvoiceitems001wbs[j].itemcode ? orderitem.find(x => x.slNo ===   pueInvoicePay[i].purchaseinvoiceitems001wbs[j].itemcode)?.itemcode : "";
            worksheet.getCell("B" + temp).font = {
              size: 11,
              bold: true,
            };
            worksheet.getCell("B" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };

          worksheet.mergeCells("C" + temp);
          worksheet.getCell("C" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].itemname;
          worksheet.getCell("C" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("C" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("D" + temp);
          worksheet.getCell("D" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].descrip;
          worksheet.getCell("D" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("D" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("E" + temp);
          worksheet.getCell("E" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].uom;
          worksheet.getCell("E" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("E" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("F" + temp);
          worksheet.getCell("F" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].hsn;
          worksheet.getCell("F" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("F" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("G" + temp);
          worksheet.getCell("G" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].unitrate;
          worksheet.getCell("G" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("G" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("H" + temp);
          worksheet.getCell("H" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].qunty;
          worksheet.getCell("H" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("H" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("I" + temp);
          worksheet.getCell("I" + temp).value =
          pueInvoicePay[i].purchaseinvoiceitems001wbs[j].totalamount;
          worksheet.getCell("I" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("I" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        }
      }
      

      let purlength = pueInvoicePay[i].purchaseinvoiceitems001wbs.length + 8;

      for (let k = 0; k < pueInvoicePay[i].purchaseinvoiceitems001wbs.length; k++) {
        purchaseinInvitem = pueInvoicePay[i].purchaseinvoiceitems001wbs;
      }

      let totalAmount = 0;

      for (let z = 0; z < purchaseinInvitem.length; z++) {
        if (purchaseinInvitem[z].cucode) {
          totalAmount = totalAmount + purchaseinInvitem[z].cutotalamount;
        } else if (purchaseinInvitem[z].cptcode) {
          totalAmount = totalAmount + purchaseinInvitem[z].cpttotalamount;
        } else if (purchaseinInvitem[z].prtcode) {
          totalAmount = totalAmount + purchaseinInvitem[z].prttotalamount;
        } else {
          totalAmount = totalAmount + purchaseinInvitem[z].totalamount;
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

  async downloadExcel1(unitslno:any,id, response: Response) {
    let pueInvoicePay = await this.purchaseInvoicePayRepository.find({
      where: { slNo: id,unitslno:unitslno},
      relations: ["poSlno2","purchaseinvoiceitems001wbs"],
    });

    let purchaseinInvitem = await this.purchaseInvoiceItemRepository.find();

    let supplieraudit = await this.supplierAuditRepository.find();

    let orderitem = await this.orderItemsRepository.find();

    let consumableitem = await this.consumbleRepository.find();

    let childpart = await this.childPartRepository.find();

    let part = await this.PartRepository.find();

    let supplier = await this.supplierRegRepository.find();

    let materialinward = await this.MaterialinwardRepository.find();
   
    let purchaslip = await this.PurchasereqslipRepository.find();
  

    for (let i = 0; i < pueInvoicePay.length; i++) {

      purchaseinInvitem = pueInvoicePay[i].purchaseinvoiceitems001wbs;

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
        { key: "I", width: 24.0 },
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
        worksheet.getCell('B3:H4').value = "PURCHASE INVOICE REPORT";
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
        worksheet.getCell('I2').value = "Issue Date : ";
        worksheet.getCell('I2').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('I3');
        worksheet.getCell('I3').value = "Rev. No. 00	";
        worksheet.getCell('I3').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('I4');
        worksheet.getCell('I4').value = "Rev Date :";
        worksheet.getCell('I4').alignment = { vertical: 'left', horizontal: 'left' };

        worksheet.mergeCells('A5:C5');
        worksheet.getCell('A5:C5').value = {
          richText: [
            { text: "PO NO:" + "\n\n" },
            { font: { size: 11 }, text: "\n\n" +  pueInvoicePay[i].poSlno2.pono},
          ],
        };
        worksheet.getCell('A5:C5').alignment = { vertical: 'middle', horizontal: 'left' };


        worksheet.mergeCells('D5:E5');
        worksheet.getCell('D5:E5').value = {
          richText: [
            { text: "PRS NO:" + "\n\n" },
            { font: { size: 11 }, text: "\n\n" +  pueInvoicePay[i].prsNo ? purchaslip.find(x => x.slNo === pueInvoicePay[i].prsNo)?.prsNo : "" },
          ],
        };
        worksheet.getCell('D5:E5').alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells('F5:G5');
        worksheet.getCell('F5:G5').value = {
          richText: [
            { text: "GRS NO:" + "\n\n" },
            { font: { size: 11 }, text: "\n\n" + pueInvoicePay[i].grnNo ? materialinward.find(x => x.slNo === pueInvoicePay[i].grnNo)?.grn : "" },
          ],
        };

        

        worksheet.getCell('F5:G5').alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells('H5:I5');
        worksheet.getCell('H5:I5').value = {
          richText: [
            { text: "Date:" + "\n\n" },
            { font: { size: 11 }, text: "\n\n" +  pueInvoicePay[i].cDate},
          ],
        };
        worksheet.getCell('H5:I5').alignment = { vertical: 'middle', horizontal: 'left' };

        let suppslno:Supplierquotation001wb;

        suppslno = supplieraudit.find(x => x.slNo === pueInvoicePay[i].suppliercode); 

        worksheet.mergeCells('A6:C6');
        worksheet.getCell('A6:C6').value = {
          richText: [
            { text: "Supplier Code:" + "\n\n" },
            { font: { size: 11 }, text: "\n\n" +  suppslno.supplierSlno ? supplier.find(x => x.slNo ===suppslno.supplierSlno)?.supplierCode : "" },
          ],
        };
        worksheet.getCell('A6:C6').alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells('D6:E6');
        worksheet.getCell('D6:E6').value = {
          richText: [
            { text: "Supplier Name:" + "\n\n" },
            { font: { size: 11 }, text: "\n\n" +  pueInvoicePay[i].suppliername},
          ],
        };
        worksheet.getCell('D6:E6').alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells('F6:G6');
        worksheet.getCell('F6:G6').value = {
          richText: [
            { text: "Purchase Invoice No:" + "\n\n" },
            { font: { size: 11 }, text: "\n\n" +  pueInvoicePay[i].purchaseInvoice},
          ],
        };
        worksheet.getCell('F6:G6').alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells('H6:I6');
        worksheet.getCell('H6:I6').value = {
          richText: [
            { text: "Incoming Inspection No:" + "\n\n" },
            { font: { size: 11 }, text: "\n\n" +  pueInvoicePay[i].incomingNo},
          ],
        };
        worksheet.getCell('H6:I6').alignment = { vertical: 'middle', horizontal: 'left' };

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

      for (let j = 0; j < purchaseinInvitem.length; j++) {
        if (purchaseinInvitem[j].cucode) {
          let temp = j + 8;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value =
         j+1;
          worksheet.getCell("A" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("A" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

         
            worksheet.mergeCells("B" + temp);
            worksheet.getCell("B" + temp).value =  purchaseinInvitem[j].cucode ? consumableitem.find(x => x.slNo ===   purchaseinInvitem[j].cucode)?.consmno : "";
            worksheet.getCell("B" + temp).font = {
              size: 11,
              bold: true,
            };
            worksheet.getCell("B" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };

          worksheet.mergeCells("C" + temp);
          worksheet.getCell("C" + temp).value =
          purchaseinInvitem[j].cuname;
          worksheet.getCell("C" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("C" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("D" + temp);
          worksheet.getCell("D" + temp).value =
          purchaseinInvitem[j].cudescrip;
          worksheet.getCell("D" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("D" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("E" + temp);
          worksheet.getCell("E" + temp).value =
          purchaseinInvitem[j].cuom;
          worksheet.getCell("E" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("E" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("F" + temp);
          worksheet.getCell("F" + temp).value =
          purchaseinInvitem[j].chsn;
          worksheet.getCell("F" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("F" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("G" + temp);
          worksheet.getCell("G" + temp).value =
          purchaseinInvitem[j].cunitrate;
          worksheet.getCell("G" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("G" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("H" + temp);
          worksheet.getCell("H" + temp).value =
          purchaseinInvitem[j].cuqunty;
          worksheet.getCell("H" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("H" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("I" + temp);
          worksheet.getCell("I" + temp).value =
          purchaseinInvitem[j].cutotalamount;
          worksheet.getCell("I" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("I" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        } else if (purchaseinInvitem[j].cptcode) {
          let temp = j + 8;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value =
          j+1;
          worksheet.getCell("A" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("A" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

            worksheet.mergeCells("B" + temp);
            worksheet.getCell("B" + temp).value = purchaseinInvitem[j].cptcode ? childpart.find(x => x.slNo ===   purchaseinInvitem[j].cptcode)?.cpartno : "";
            worksheet.getCell("B" + temp).font = {
              size: 11,
              bold: true,
            };
            worksheet.getCell("B" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };

          worksheet.mergeCells("C" + temp);
          worksheet.getCell("C" + temp).value =
          purchaseinInvitem[j].cptname;
          worksheet.getCell("C" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("C" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("D" + temp);
          worksheet.getCell("D" + temp).value =
          purchaseinInvitem[j].cptdescrip;
          worksheet.getCell("D" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("D" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("E" + temp);
          worksheet.getCell("E" + temp).value =
          purchaseinInvitem[j].cptuom;
          worksheet.getCell("E" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("E" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("F" + temp);
          worksheet.getCell("F" + temp).value =
          purchaseinInvitem[j].cpthsn;
          worksheet.getCell("F" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("F" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("G" + temp);
          worksheet.getCell("G" + temp).value =
          purchaseinInvitem[j].cptunitrate;
          worksheet.getCell("G" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("G" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("H" + temp);
          worksheet.getCell("H" + temp).value =
          purchaseinInvitem[j].cptqunty;
          worksheet.getCell("H" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("H" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("I" + temp);
          worksheet.getCell("I" + temp).value =
          purchaseinInvitem[j].cpttotalamount;
          worksheet.getCell("I" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("I" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        } else if (purchaseinInvitem[j].prtcode) {
          let temp = j + 8;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value =
          j+1;
          worksheet.getCell("A" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("A" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

            worksheet.mergeCells("B" + temp);
            worksheet.getCell("B" + temp).value = purchaseinInvitem[j].prtcode ? part.find(x => x.slNo ===   purchaseinInvitem[j].prtcode)?.partno : "";
            worksheet.getCell("B" + temp).font = {
              size: 11,
              bold: true,
            };
            worksheet.getCell("B" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };

          worksheet.mergeCells("C" + temp);
          worksheet.getCell("C" + temp).value =
          purchaseinInvitem[j].prtmname;
          worksheet.getCell("C" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("C" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("D" + temp);
          worksheet.getCell("D" + temp).value =
          purchaseinInvitem[j].prtdescrip;
          worksheet.getCell("D" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("D" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("E" + temp);
          worksheet.getCell("E" + temp).value =
          purchaseinInvitem[j].prtuom;
          worksheet.getCell("E" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("E" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("F" + temp);
          worksheet.getCell("F" + temp).value =
          purchaseinInvitem[j].prthsn;
          worksheet.getCell("F" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("F" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("G" + temp);
          worksheet.getCell("G" + temp).value =
          purchaseinInvitem[j].prtunitrate;
          worksheet.getCell("G" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("G" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("H" + temp);
          worksheet.getCell("H" + temp).value =
          purchaseinInvitem[j].prtqunty;
          worksheet.getCell("H" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("H" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("I" + temp);
          worksheet.getCell("I" + temp).value =
          purchaseinInvitem[j].prttotalamount;
          worksheet.getCell("I" + temp).font = {
            size: 11,
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
            size: 11,
            bold: true,
          };
          worksheet.getCell("A" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

            worksheet.mergeCells("B" + temp);
            worksheet.getCell("B" + temp).value = purchaseinInvitem[j].itemcode ? orderitem.find(x => x.slNo ===   purchaseinInvitem[j].itemcode)?.itemcode : "";
            worksheet.getCell("B" + temp).font = {
              size: 11,
              bold: true,
            };
            worksheet.getCell("B" + temp).alignment = {
              vertical: "middle",
              horizontal: "center",
              wraptext: true,
            };

          worksheet.mergeCells("C" + temp);
          worksheet.getCell("C" + temp).value =
          purchaseinInvitem[j].itemname;
          worksheet.getCell("C" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("C" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("D" + temp);
          worksheet.getCell("D" + temp).value =
          purchaseinInvitem[j].descrip;
          worksheet.getCell("D" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("D" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("E" + temp);
          worksheet.getCell("E" + temp).value =
          purchaseinInvitem[j].uom;
          worksheet.getCell("E" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("E" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("F" + temp);
          worksheet.getCell("F" + temp).value =
          purchaseinInvitem[j].hsn;
          worksheet.getCell("F" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("F" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("G" + temp);
          worksheet.getCell("G" + temp).value =
          purchaseinInvitem[j].unitrate;
          worksheet.getCell("G" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("G" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("H" + temp);
          worksheet.getCell("H" + temp).value =
          purchaseinInvitem[j].qunty;
          worksheet.getCell("H" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("H" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };

          worksheet.mergeCells("I" + temp);
          worksheet.getCell("I" + temp).value =
          purchaseinInvitem[j].totalamount;
          worksheet.getCell("I" + temp).font = {
            size: 11,
            bold: true,
          };
          worksheet.getCell("I" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
            wraptext: true,
          };
        }
      }
      

      let purlength = purchaseinInvitem.length + 8;

      for (let k = 0; k < purchaseinInvitem.length; k++) {
        purchaseinInvitem = purchaseinInvitem;
      }

      let totalAmount = 0;

      for (let z = 0; z < purchaseinInvitem.length; z++) {
        if (purchaseinInvitem[z].cucode) {
          totalAmount = totalAmount + purchaseinInvitem[z].cutotalamount;
        } else if (purchaseinInvitem[z].cptcode) {
          totalAmount = totalAmount + purchaseinInvitem[z].cpttotalamount;
        } else if (purchaseinInvitem[z].prtcode) {
          totalAmount = totalAmount + purchaseinInvitem[z].prttotalamount;
        } else {
          totalAmount = totalAmount + purchaseinInvitem[z].totalamount;
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
