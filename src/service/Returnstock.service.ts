import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { createReadStream } from "fs";
import { ReturnstockDTO } from "src/dto/Returnstock.dto";
import { Rawmaterialinspection001wb } from "src/entity/Rawmaterialinspection001wb";
import { Returnstock001wb } from "src/entity/Returnstock001wb";
import { Repository } from "typeorm";
var path = require('path');
const excel = require('exceljs');

var fs = require('fs');
var fs = require('fs');
var pdf = require('dynamic-html-pdf');


@Injectable()


export class ReturnstockService {
    length: number;

    constructor(
        @InjectRepository(Returnstock001wb) private readonly returnstockRepository: Repository<Returnstock001wb>,
        @InjectRepository(Rawmaterialinspection001wb) private readonly rawmaterialinspectionRepository: Repository<Rawmaterialinspection001wb>,
    ) {
    }

    async findAll(unitslno: any): Promise<Returnstock001wb[]> {
      return await this.returnstockRepository.find({order: { slNo: "DESC" }, where: { unitslno: unitslno } });
  }

    async create(returnstockDTO: ReturnstockDTO): Promise<Returnstock001wb> {
        const returnstock001wb = new Returnstock001wb();
        returnstock001wb.setProperties(returnstockDTO);
        console.log("returnstock001wb=========>>>",returnstock001wb);
        
        let RawmaterialItems = new Rawmaterialinspection001wb();
        let ConsumableItems = new Rawmaterialinspection001wb();
        let ChildpartItems = new Rawmaterialinspection001wb();
        let PartItems = new Rawmaterialinspection001wb();
        let rawmaterialinspection001wb = new Rawmaterialinspection001wb();
        RawmaterialItems = await this.rawmaterialinspectionRepository.findOne({ where: { slNo: returnstockDTO.ordernumber } });
        console.log("RawmaterialItems",RawmaterialItems);
        ConsumableItems = await this.rawmaterialinspectionRepository.findOne({ where: { slNo: returnstockDTO.cuordernumber } });
        ChildpartItems = await this.rawmaterialinspectionRepository.findOne({ where: { slNo: returnstockDTO.childpartnumber } });
        PartItems = await this.rawmaterialinspectionRepository.findOne({ where: { slNo: returnstockDTO.partnumber } });
        
        


        if (returnstockDTO.ordernumber ? (RawmaterialItems.rejectedQty >= returnstock001wb.rejectitems && RawmaterialItems.rejectedQty >0): false) {
            RawmaterialItems.rejectedQty = RawmaterialItems.rejectedQty - returnstock001wb.rejectitems
            console.log("RawmaterialItems.rejectedQty",RawmaterialItems.rejectedQty);
            
            await this.rawmaterialinspectionRepository.update({ slNo: returnstockDTO.ordernumber }, RawmaterialItems);
           console.log("returnstock001wb",returnstock001wb);
           
            return this.returnstockRepository.save(returnstock001wb);

        } else if (returnstockDTO.cuordernumber ? (ConsumableItems.curejectedQty >= returnstock001wb.curejectitems) && (ConsumableItems.cuoutstanding >= returnstock001wb.curejectitems) : false) {
            ConsumableItems.curejectedQty = ConsumableItems.curejectedQty - returnstock001wb.curejectitems
            await this.rawmaterialinspectionRepository.update({ slNo: returnstockDTO.cuordernumber }, ConsumableItems);
            return this.returnstockRepository.save(returnstock001wb);

        } else if (returnstockDTO.childpartnumber ? (ChildpartItems.cptrejectedQty >= returnstock001wb.cptrejectitems) && (ChildpartItems.cptoutstanding >= returnstock001wb.cptrejectitems) : false) {
            ChildpartItems.cptrejectedQty = ChildpartItems.cptrejectedQty - returnstock001wb.cptrejectitems
            await this.rawmaterialinspectionRepository.update({ slNo: returnstockDTO.childpartnumber }, ChildpartItems);
            return this.returnstockRepository.save(returnstock001wb);

        } else if (returnstockDTO.partnumber ? (PartItems.prtrejectedQty >= returnstock001wb.prtrejectitems) && (PartItems.prtoutstanding >= returnstock001wb.prtrejectitems) : false) {
            PartItems.prtrejectedQty = PartItems.prtrejectedQty - returnstock001wb.prtrejectitems
            await this.rawmaterialinspectionRepository.update({ slNo: returnstockDTO.partnumber }, PartItems);
            return this.returnstockRepository.save(returnstock001wb);

        }



    }
    async update(returnstockDTO: ReturnstockDTO): Promise<Returnstock001wb> {
        const returnstock001wb = new Returnstock001wb();
        returnstock001wb.setProperties(returnstockDTO);
        await this.returnstockRepository.update({ slNo: returnstock001wb.slNo }, returnstock001wb);
        return returnstock001wb;
    }

   

    findOne(id: number): Promise<Returnstock001wb> {
        return this.returnstockRepository.findOne(id);
    }
    async remove(id: number): Promise<void> {
        await this.returnstockRepository.delete(id);
    }

    // ------------Item-Pdf---------------------

    async downloaditemPdf(unitslno:any,id: any, response: Response) {

      let returnRawmaterial = await this.rawmaterialinspectionRepository.find({
              relations:["itemcode2","cucode2","cptcode2","prtcode2"],
              where: { slNo: id,unitslno: unitslno},
      })
      
      let returnStock = await this.returnstockRepository.find({
        relations: ["ordernumber2","cuordernumber2","childpartnumber2","partnumber2"] 
      })      

      let stockarray = [];

      for(let i = 0; i < returnRawmaterial.length; i++) {
        for (let j = 0; j < returnStock.length; j++) {
          if (returnStock[j].ordernumber == returnRawmaterial[i].itemcode) {
          stockarray.push(returnStock[j])
        }
       }
      }
      
      
  
      var fs = require("fs");
      var pdf = require("dynamic-html-pdf");
      var html = fs.readFileSync("returnItem.html", "utf8");
  
      var options = {
        format: "A3",
        orientation: "portrait",
        border: "10mm",
      };
  
      
  
      var document = {
        type: "file",
        template: html,
        context: {
         returnRawmaterial: returnRawmaterial,
         stockarray: stockarray,
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


    // -------------Consum-Pdf-----------

    async downloadconsumPdf(unitslno:any,id: any, response: Response) {

      let returnRawmaterial = await this.rawmaterialinspectionRepository.find({
              relations:["itemcode2","cucode2","cptcode2","prtcode2"],
              where: { slNo: id,unitslno: unitslno},
      })
      
      let returnStock = await this.returnstockRepository.find({
        relations: ["ordernumber2","cuordernumber2","childpartnumber2","partnumber2"] 
      })


      let stockarray = [];

      for(let i = 0; i < returnRawmaterial.length; i++) {
        for (let j = 0; j < returnStock.length; j++) {
          if (returnStock[j].cuordernumber == returnRawmaterial[i].cucode) {
          stockarray.push(returnStock[j])
        }
       }
      }
      
      
  
      var fs = require("fs");
      var pdf = require("dynamic-html-pdf");
      var html = fs.readFileSync("returnConsum.html", "utf8");
  
      var options = {
        format: "A3",
        orientation: "portrait",
        border: "10mm",
      };
  
      
  
      var document = {
        type: "file",
        template: html,
        context: {
         returnRawmaterial: returnRawmaterial,
         stockarray: stockarray,
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

    // -------------Cpart-Pdf-----------

    async downloadcpartPdf(unitslno:any,id: any, response: Response) {

      let returnRawmaterial = await this.rawmaterialinspectionRepository.find({
              relations:["itemcode2","cucode2","cptcode2","prtcode2"],
              where: { slNo: id,unitslno: unitslno},
      })
      
      let returnStock = await this.returnstockRepository.find({
        relations: ["ordernumber2","cuordernumber2","childpartnumber2","partnumber2"] 
      })


      let stockarray = [];

      for(let i = 0; i < returnRawmaterial.length; i++) {
        for (let j = 0; j < returnStock.length; j++) {
          if (returnStock[j].childpartnumber == returnRawmaterial[i].cptcode) {
          stockarray.push(returnStock[j])
        }
       }
      }
      
      
  
      var fs = require("fs");
      var pdf = require("dynamic-html-pdf");
      var html = fs.readFileSync("returnCpart.html", "utf8");
  
      var options = {
        format: "A3",
        orientation: "portrait",
        border: "10mm",
      };
  
      
  
      var document = {
        type: "file",
        template: html,
        context: {
         returnRawmaterial: returnRawmaterial,
         stockarray: stockarray,
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

    // ------------Part-Pdf---------------

    async downloadpartPdf(unitslno:any,id: any, response: Response) {

      let returnRawmaterial = await this.rawmaterialinspectionRepository.find({
        relations:["itemcode2","cucode2","cptcode2","prtcode2"],
        where: { slNo: id,unitslno:unitslno},
    })

    let returnStock = await this.returnstockRepository.find({
      relations: ["ordernumber2","cuordernumber2","childpartnumber2","partnumber2"] 
    })


    let stockarray = [];

    for(let i = 0; i < returnRawmaterial.length; i++) {
      for (let j = 0; j < returnStock.length; j++) {
       if (returnStock[j].ordernumber == returnRawmaterial[i].itemcode) {
      stockarray.push(returnStock[j])
     }
    }
    }

    
    

    var fs = require("fs");
    var pdf = require("dynamic-html-pdf");
    var html = fs.readFileSync("returnPart.html", "utf8");

    var options = {
      format: "A3",
      orientation: "landscape",
      border: "10mm",
    };

    

    var document = {
      type: "file",
      template: html,
      context: {
        returnRawmaterial: returnRawmaterial,
         stockarray: stockarray,
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

  // ---------------Item-Excel-----------------

  async downloaditemExcel(unitslno:any,id, response: Response) {
    
    let returnRawmaterial = await this.rawmaterialinspectionRepository.find({
        relations:["itemcode2","cucode2","cptcode2","prtcode2"],
        where: { slNo: id,unitslno:unitslno},
    })

    let returnStock = await this.returnstockRepository.find({
      relations: ["ordernumber2","cuordernumber2","childpartnumber2","partnumber2"] 
    })
    
    
  

    for (let i = 0; i < returnRawmaterial.length; i++) {

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
        { key: "A", width: 20.0 },
        { key: "B", width: 20.0 },
        { key: "C", width: 20.0 },
        { key: "D", width: 20.0 },
        { key: "E", width: 20.0 },
        { key: "F", width: 20.0 },
        { key: "G", width: 20.0 },
        { key: "H", width: 20.0 },
        { key: "I", width: 24.0 },
        { key: "J", width: 24.0 },
        { key: "K", width: 24.0 },
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


        worksheet.mergeCells('B1:J2');
        worksheet.getCell('B1:J2').value = "SRINIVASA ENTERPRISES";
        worksheet.getCell('B1:J2').fgColor = { argb: 'b03600' };
        worksheet.getCell('B1:J2').font = {
            size: 11,
            bold: true
        };
        worksheet.getCell('B1:J2').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('B3:J4');
        worksheet.getCell('B3:J4').value = "RETURN STOCK RAW-MATERIAL DETAILS";
        worksheet.getCell('B3:J4').fgColor = { argb: '00b050' };

        worksheet.getCell('B3:J4').font = {
            size: 11,
            bold: true
        };
        worksheet.getCell('B3:J4').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('K1');
        worksheet.getCell('K1').value = "Format No.SE/MTN/R05";
        worksheet.getCell('K1').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('K2');
        worksheet.getCell('K2').value = "Issue Date : ";
        worksheet.getCell('K2').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('K3');
        worksheet.getCell('K3').value = "Rev. No. 00	";
        worksheet.getCell('K3').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('K4');
        worksheet.getCell('K4').value = "Rev Date :";
        worksheet.getCell('K4').alignment = { vertical: 'left', horizontal: 'left' };

        worksheet.mergeCells('A5:C5');
        worksheet.getCell('A5:C5').value = {
          richText: [
            { font: { size: 12 }, text: "Item Code:" + "\n\n" },
            { font: { size: 12 }, text: "\n\n" +  returnRawmaterial[i].itemcode2.itemcode},
          ],
        };
        worksheet.getCell('A5:C5').alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells('D5:F5');
        worksheet.getCell('D5:F5').value = {
          richText: [
            { font: { size: 12 }, text: "Item Name:" + "\n\n" },
            { font: { size: 12 }, text: "\n\n" +  returnRawmaterial[i].itemcode2.itemname},
          ],
        };
        worksheet.getCell('D5:F5').alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells('G5:I5');
        worksheet.getCell('G5:I5').value = {
          richText: [
            { font: { size: 12 }, text: "Item Description:" + "\n\n" },
            { font: { size: 12 }, text: "\n\n" +  returnRawmaterial[i].itemcode2.descrip},
          ],
        };
        worksheet.getCell('G5:I5').alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells('J5:K5');
        worksheet.getCell('J5:K5').value = {
          richText: [
            { font: { size: 12 }, text: "Reject Qunatity:" + "\n\n" },
            { font: { size: 12 }, text: "\n\n" +  returnRawmaterial[i].rejectedQty},
          ],
        };
        worksheet.getCell('J5:K5').alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells("A6");
        worksheet.getCell("A6").value = "Item Code";
        worksheet.getCell("A6").font = {size: 11, bold: true,};
        worksheet.getCell("A6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("B6");
        worksheet.getCell("B6").value = "Dispatch Date";
        worksheet.getCell("B6").font = {size: 11, bold: true,};
        worksheet.getCell("B6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("C6");
        worksheet.getCell("C6").value = "Time";
        worksheet.getCell("C6").font = {size: 11, bold: true,};
        worksheet.getCell("C6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("D6");
        worksheet.getCell("D6").value = "Paid Amount";
        worksheet.getCell("D6").font = {size: 11, bold: true,};
        worksheet.getCell("D6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("E6");
        worksheet.getCell("E6").value = "Mode of Dispatch";
        worksheet.getCell("E6").font = {size: 11, bold: true,};
        worksheet.getCell("E6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("F6");
        worksheet.getCell("F6").value = "Vechicle No";
        worksheet.getCell("F6").font = {size: 11, bold: true,};
        worksheet.getCell("F6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("G6");
        worksheet.getCell("G6").value = "Mobile No";
        worksheet.getCell("G6").font = {size: 11, bold: true,};
        worksheet.getCell("G6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("H6");
        worksheet.getCell("H6").value = "Person Name";
        worksheet.getCell("H6").font = {size: 11, bold: true,};
        worksheet.getCell("H6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("I6");
        worksheet.getCell("I6").value = "Status";
        worksheet.getCell("I6").font = {size: 11, bold: true,};
        worksheet.getCell("I6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
        
        worksheet.mergeCells("J6");
        worksheet.getCell("J6").value = "Reference ID No";
        worksheet.getCell("J6").font = {size: 11, bold: true,};
        worksheet.getCell("J6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("K6");
        worksheet.getCell("K6").value = "Rejected Quantity";
        worksheet.getCell("K6").font = {size: 11, bold: true,};
        worksheet.getCell("K6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        let stockarray = [];

            for (let j = 0; j < returnStock.length; j++) {
                if (returnStock[j].ordernumber == returnRawmaterial[i].itemcode) {
                    stockarray.push(returnStock[j])
                }
        }
        

        for(let k = 0; k < stockarray.length; k++) {
                
                let temp = k + 7;

                worksheet.mergeCells("A" + temp);
                worksheet.getCell("A" + temp).value = stockarray[k].ordernumber2.itemcode;
                worksheet.getCell("A" + temp).font = { size: 11,bold: true, };
                worksheet.getCell("A" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("B" + temp);
                worksheet.getCell("B" + temp).value = stockarray[k].date;
                worksheet.getCell("B" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("B" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("C" + temp);
                worksheet.getCell("C" + temp).value = stockarray[k].time;
                worksheet.getCell("C" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("C" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("D" + temp);
                worksheet.getCell("D" + temp).value = stockarray[k].paidamount;
                worksheet.getCell("D" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("D" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("E" + temp);
                worksheet.getCell("E" + temp).value = stockarray[k].dispatch;
                worksheet.getCell("E" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("E" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("F" + temp);
                worksheet.getCell("F" + temp).value = stockarray[k].vichleno;
                worksheet.getCell("F" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("F" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("G" + temp);
                worksheet.getCell("G" + temp).value = stockarray[k].mobilenumber;
                worksheet.getCell("G" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("G" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("H" + temp);
                worksheet.getCell("H" + temp).value = stockarray[k].personname;
                worksheet.getCell("H" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("H" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("I" + temp);
                worksheet.getCell("I" + temp).value = stockarray[k].status;
                worksheet.getCell("I" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("I" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

                worksheet.mergeCells("J" + temp);
                worksheet.getCell("J" + temp).value = stockarray[k].referenceid;
                worksheet.getCell("J" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("J" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

                worksheet.mergeCells("K" + temp);
                worksheet.getCell("K" + temp).value = stockarray[k].rejectitems;
                worksheet.getCell("K" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("K" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
            }
            
     

      return workbook.xlsx.write(response).then(function () {
        response["status"](200).end();
      });
    }
  }

  // ------------Consum-Excel--------------

  async downloadconsumExcel(unitslno:any,id, response: Response) {
    
    let returnRawmaterial = await this.rawmaterialinspectionRepository.find({
        relations:["itemcode2","cucode2","cptcode2","prtcode2"],
        where: { slNo: id,unitslno:unitslno},
    })

    let returnStock = await this.returnstockRepository.find({
      relations: ["ordernumber2","cuordernumber2","childpartnumber2","partnumber2"] 
    })
    
    
  

    for (let i = 0; i < returnRawmaterial.length; i++) {

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
        { key: "A", width: 20.0 },
        { key: "B", width: 20.0 },
        { key: "C", width: 20.0 },
        { key: "D", width: 20.0 },
        { key: "E", width: 20.0 },
        { key: "F", width: 20.0 },
        { key: "G", width: 20.0 },
        { key: "H", width: 20.0 },
        { key: "I", width: 24.0 },
        { key: "J", width: 24.0 },
        { key: "K", width: 24.0 },
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


        worksheet.mergeCells('B1:J2');
        worksheet.getCell('B1:J2').value = "SRINIVASA ENTERPRISES";
        worksheet.getCell('B1:J2').fgColor = { argb: 'b03600' };
        worksheet.getCell('B1:J2').font = {
            size: 11,
            bold: true
        };
        worksheet.getCell('B1:J2').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('B3:J4');
        worksheet.getCell('B3:J4').value = "RETURN STOCK CONSUMABLE-ITEM DETAILS";
        worksheet.getCell('B3:J4').fgColor = { argb: '00b050' };

        worksheet.getCell('B3:J4').font = {
            size: 11,
            bold: true
        };
        worksheet.getCell('B3:J4').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('K1');
        worksheet.getCell('K1').value = "Format No.SE/MTN/R05";
        worksheet.getCell('K1').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('K2');
        worksheet.getCell('K2').value = "Issue Date : ";
        worksheet.getCell('K2').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('K3');
        worksheet.getCell('K3').value = "Rev. No. 00	";
        worksheet.getCell('K3').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('K4');
        worksheet.getCell('K4').value = "Rev Date :";
        worksheet.getCell('K4').alignment = { vertical: 'left', horizontal: 'left' };

        worksheet.mergeCells('A5:C5');
        worksheet.getCell('A5:C5').value = {
          richText: [
            { font: { size: 12 }, text: "Consumable Code:" + "\n\n" },
            { font: { size: 12 }, text: "\n\n" +  returnRawmaterial[i].cucode2.consmno},
          ],
        };
        worksheet.getCell('A5:C5').alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells('D5:F5');
        worksheet.getCell('D5:F5').value = {
          richText: [
            { font: { size: 12 }, text: "Consumable Name:" + "\n\n" },
            { font: { size: 12 }, text: "\n\n" +  returnRawmaterial[i].cucode2.consname},
          ],
        };
        worksheet.getCell('D5:F5').alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells('G5:I5');
        worksheet.getCell('G5:I5').value = {
          richText: [
            { font: { size: 12 }, text: "Consumable Description:" + "\n\n" },
            { font: { size: 12 }, text: "\n\n" +  returnRawmaterial[i].cucode2.descrip},
          ],
        };
        worksheet.getCell('G5:I5').alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells('J5:K5');
        worksheet.getCell('J5:K5').value = {
          richText: [
            { font: { size: 12 }, text: "Reject Qunatity:" + "\n\n" },
            { font: { size: 12 }, text: "\n\n" +  returnRawmaterial[i].curejectedQty},
          ],
        };
        worksheet.getCell('J5:K5').alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells("A6");
        worksheet.getCell("A6").value = "Consumable Code";
        worksheet.getCell("A6").font = {size: 11, bold: true,};
        worksheet.getCell("A6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("B6");
        worksheet.getCell("B6").value = "Dispatch Date";
        worksheet.getCell("B6").font = {size: 11, bold: true,};
        worksheet.getCell("B6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("C6");
        worksheet.getCell("C6").value = "Time";
        worksheet.getCell("C6").font = {size: 11, bold: true,};
        worksheet.getCell("C6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("D6");
        worksheet.getCell("D6").value = "Paid Amount";
        worksheet.getCell("D6").font = {size: 11, bold: true,};
        worksheet.getCell("D6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("E6");
        worksheet.getCell("E6").value = "Mode of Dispatch";
        worksheet.getCell("E6").font = {size: 11, bold: true,};
        worksheet.getCell("E6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("F6");
        worksheet.getCell("F6").value = "Vechicle No";
        worksheet.getCell("F6").font = {size: 11, bold: true,};
        worksheet.getCell("F6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("G6");
        worksheet.getCell("G6").value = "Mobile No";
        worksheet.getCell("G6").font = {size: 11, bold: true,};
        worksheet.getCell("G6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("H6");
        worksheet.getCell("H6").value = "Person Name";
        worksheet.getCell("H6").font = {size: 11, bold: true,};
        worksheet.getCell("H6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("I6");
        worksheet.getCell("I6").value = "Status";
        worksheet.getCell("I6").font = {size: 11, bold: true,};
        worksheet.getCell("I6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
        
        worksheet.mergeCells("J6");
        worksheet.getCell("J6").value = "Reference ID No";
        worksheet.getCell("J6").font = {size: 11, bold: true,};
        worksheet.getCell("J6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("K6");
        worksheet.getCell("K6").value = "Rejected Quantity";
        worksheet.getCell("K6").font = {size: 11, bold: true,};
        worksheet.getCell("K6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        let stockarray = [];

            for (let j = 0; j < returnStock.length; j++) {
                if (returnStock[j].cuordernumber == returnRawmaterial[i].cucode) {
                    stockarray.push(returnStock[j])
                }
        }

        

        for(let k = 0; k < stockarray.length; k++) {
                
                let temp = k + 7;

                worksheet.mergeCells("A" + temp);
                worksheet.getCell("A" + temp).value = stockarray[k].cuordernumber2.consmno;
                worksheet.getCell("A" + temp).font = { size: 11,bold: true, };
                worksheet.getCell("A" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("B" + temp);
                worksheet.getCell("B" + temp).value = stockarray[k].cudate;
                worksheet.getCell("B" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("B" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("C" + temp);
                worksheet.getCell("C" + temp).value = stockarray[k].cutime;
                worksheet.getCell("C" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("C" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("D" + temp);
                worksheet.getCell("D" + temp).value = stockarray[k].cupaidamount;
                worksheet.getCell("D" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("D" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("E" + temp);
                worksheet.getCell("E" + temp).value = stockarray[k].cudispatch;
                worksheet.getCell("E" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("E" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("F" + temp);
                worksheet.getCell("F" + temp).value = stockarray[k].cuvichleno;
                worksheet.getCell("F" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("F" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("G" + temp);
                worksheet.getCell("G" + temp).value = stockarray[k].cumobilenumber;
                worksheet.getCell("G" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("G" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("H" + temp);
                worksheet.getCell("H" + temp).value = stockarray[k].cupersonname;
                worksheet.getCell("H" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("H" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("I" + temp);
                worksheet.getCell("I" + temp).value = stockarray[k].custatus;
                worksheet.getCell("I" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("I" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

                worksheet.mergeCells("J" + temp);
                worksheet.getCell("J" + temp).value = stockarray[k].cureferenceid;
                worksheet.getCell("J" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("J" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

                worksheet.mergeCells("K" + temp);
                worksheet.getCell("K" + temp).value = stockarray[k].curejectitems;
                worksheet.getCell("K" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("K" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
            }
            
     

      return workbook.xlsx.write(response).then(function () {
        response["status"](200).end();
      });
    }
  }

  // ------------Consum-Excel--------------

  async downloadcpartExcel(unitslno:any,id, response: Response) {
    
    let returnRawmaterial = await this.rawmaterialinspectionRepository.find({
        relations:["itemcode2","cucode2","cptcode2","prtcode2"],
        where: { slNo: id,unitslno:unitslno},
    })

    let returnStock = await this.returnstockRepository.find({
      relations: ["ordernumber2","cuordernumber2","childpartnumber2","partnumber2"] 
    })
    
    
  

    for (let i = 0; i < returnRawmaterial.length; i++) {

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
        { key: "A", width: 20.0 },
        { key: "B", width: 20.0 },
        { key: "C", width: 20.0 },
        { key: "D", width: 20.0 },
        { key: "E", width: 20.0 },
        { key: "F", width: 20.0 },
        { key: "G", width: 20.0 },
        { key: "H", width: 20.0 },
        { key: "I", width: 24.0 },
        { key: "J", width: 24.0 },
        { key: "K", width: 24.0 },
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


        worksheet.mergeCells('B1:J2');
        worksheet.getCell('B1:J2').value = "SRINIVASA ENTERPRISES";
        worksheet.getCell('B1:J2').fgColor = { argb: 'b03600' };
        worksheet.getCell('B1:J2').font = {
            size: 11,
            bold: true
        };
        worksheet.getCell('B1:J2').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('B3:J4');
        worksheet.getCell('B3:J4').value = "RETURN STOCK CHILD-PART DETAILS";
        worksheet.getCell('B3:J4').fgColor = { argb: '00b050' };

        worksheet.getCell('B3:J4').font = {
            size: 11,
            bold: true
        };
        worksheet.getCell('B3:J4').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('K1');
        worksheet.getCell('K1').value = "Format No.SE/MTN/R05";
        worksheet.getCell('K1').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('K2');
        worksheet.getCell('K2').value = "Issue Date : ";
        worksheet.getCell('K2').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('K3');
        worksheet.getCell('K3').value = "Rev. No. 00	";
        worksheet.getCell('K3').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('K4');
        worksheet.getCell('K4').value = "Rev Date :";
        worksheet.getCell('K4').alignment = { vertical: 'left', horizontal: 'left' };

        worksheet.mergeCells('A5:C5');
        worksheet.getCell('A5:C5').value = {
          richText: [
            { font: { size: 12 }, text: "Consumable Code:" + "\n\n" },
            { font: { size: 12 }, text: "\n\n" +  returnRawmaterial[i].cptcode2.cpartno},
          ],
        };
        worksheet.getCell('A5:C5').alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells('D5:F5');
        worksheet.getCell('D5:F5').value = {
          richText: [
            { font: { size: 12 }, text: "Consumable Name:" + "\n\n" },
            { font: { size: 12 }, text: "\n\n" +  returnRawmaterial[i].cptcode2.cpartname},
          ],
        };
        worksheet.getCell('D5:F5').alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells('G5:I5');
        worksheet.getCell('G5:I5').value = {
          richText: [
            { font: { size: 12 }, text: "Consumable Description:" + "\n\n" },
            { font: { size: 12 }, text: "\n\n" +  returnRawmaterial[i].cptcode2.descrip},
          ],
        };
        worksheet.getCell('G5:I5').alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells('J5:K5');
        worksheet.getCell('J5:K5').value = {
          richText: [
            { font: { size: 12 }, text: "Reject Qunatity:" + "\n\n" },
            { font: { size: 12 }, text: "\n\n" +  returnRawmaterial[i].cptrejectedQty},
          ],
        };
        worksheet.getCell('J5:K5').alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells("A6");
        worksheet.getCell("A6").value = "Child-Part Code";
        worksheet.getCell("A6").font = {size: 11, bold: true,};
        worksheet.getCell("A6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("B6");
        worksheet.getCell("B6").value = "Dispatch Date";
        worksheet.getCell("B6").font = {size: 11, bold: true,};
        worksheet.getCell("B6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("C6");
        worksheet.getCell("C6").value = "Time";
        worksheet.getCell("C6").font = {size: 11, bold: true,};
        worksheet.getCell("C6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("D6");
        worksheet.getCell("D6").value = "Paid Amount";
        worksheet.getCell("D6").font = {size: 11, bold: true,};
        worksheet.getCell("D6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("E6");
        worksheet.getCell("E6").value = "Mode of Dispatch";
        worksheet.getCell("E6").font = {size: 11, bold: true,};
        worksheet.getCell("E6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("F6");
        worksheet.getCell("F6").value = "Vechicle No";
        worksheet.getCell("F6").font = {size: 11, bold: true,};
        worksheet.getCell("F6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("G6");
        worksheet.getCell("G6").value = "Mobile No";
        worksheet.getCell("G6").font = {size: 11, bold: true,};
        worksheet.getCell("G6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("H6");
        worksheet.getCell("H6").value = "Person Name";
        worksheet.getCell("H6").font = {size: 11, bold: true,};
        worksheet.getCell("H6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("I6");
        worksheet.getCell("I6").value = "Status";
        worksheet.getCell("I6").font = {size: 11, bold: true,};
        worksheet.getCell("I6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
        
        worksheet.mergeCells("J6");
        worksheet.getCell("J6").value = "Reference ID No";
        worksheet.getCell("J6").font = {size: 11, bold: true,};
        worksheet.getCell("J6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("K6");
        worksheet.getCell("K6").value = "Rejected Quantity";
        worksheet.getCell("K6").font = {size: 11, bold: true,};
        worksheet.getCell("K6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        let stockarray = [];

            for (let j = 0; j < returnStock.length; j++) {
                if (returnStock[j].childpartnumber == returnRawmaterial[i].cptcode) {
                    stockarray.push(returnStock[j])
                }
        }

        

        for(let k = 0; k < stockarray.length; k++) {
                
                let temp = k + 7;

                worksheet.mergeCells("A" + temp);
                worksheet.getCell("A" + temp).value = stockarray[k].childpartnumber2.cpartno;
                worksheet.getCell("A" + temp).font = { size: 11,bold: true, };
                worksheet.getCell("A" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("B" + temp);
                worksheet.getCell("B" + temp).value = stockarray[k].cptdate;
                worksheet.getCell("B" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("B" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("C" + temp);
                worksheet.getCell("C" + temp).value = stockarray[k].cpttime;
                worksheet.getCell("C" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("C" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("D" + temp);
                worksheet.getCell("D" + temp).value = stockarray[k].cptpaidamount;
                worksheet.getCell("D" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("D" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("E" + temp);
                worksheet.getCell("E" + temp).value = stockarray[k].cptdispatch;
                worksheet.getCell("E" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("E" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("F" + temp);
                worksheet.getCell("F" + temp).value = stockarray[k].cptvichleno;
                worksheet.getCell("F" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("F" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("G" + temp);
                worksheet.getCell("G" + temp).value = stockarray[k].cptmobilenumber;
                worksheet.getCell("G" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("G" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("H" + temp);
                worksheet.getCell("H" + temp).value = stockarray[k].cptpersonname;
                worksheet.getCell("H" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("H" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("I" + temp);
                worksheet.getCell("I" + temp).value = stockarray[k].cptstatus;
                worksheet.getCell("I" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("I" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

                worksheet.mergeCells("J" + temp);
                worksheet.getCell("J" + temp).value = stockarray[k].cptreferenceid;
                worksheet.getCell("J" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("J" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

                worksheet.mergeCells("K" + temp);
                worksheet.getCell("K" + temp).value = stockarray[k].cptrejectitems;
                worksheet.getCell("K" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("K" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
            }
            
     

      return workbook.xlsx.write(response).then(function () {
        response["status"](200).end();
      });
    }
  }


  // ----------------Part-Excel---------------------

  async downloadpartExcel(unitslno:any,id, response: Response) {
    
    let returnRawmaterial = await this.rawmaterialinspectionRepository.find({
        relations:["itemcode2","cucode2","cptcode2","prtcode2"],
        where: { slNo: id,unitslno:unitslno},
    })

    let returnStock = await this.returnstockRepository.find({
      relations: ["ordernumber2","cuordernumber2","childpartnumber2","partnumber2"] 
    })
    
    
  

    for (let i = 0; i < returnRawmaterial.length; i++) {

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
        { key: "A", width: 20.0 },
        { key: "B", width: 20.0 },
        { key: "C", width: 20.0 },
        { key: "D", width: 20.0 },
        { key: "E", width: 20.0 },
        { key: "F", width: 20.0 },
        { key: "G", width: 20.0 },
        { key: "H", width: 20.0 },
        { key: "I", width: 24.0 },
        { key: "J", width: 20.0 },
        { key: "K", width: 24.0 },
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


        worksheet.mergeCells('B1:J2');
        worksheet.getCell('B1:J2').value = "SRINIVASA ENTERPRISES";
        worksheet.getCell('B1:J2').fgColor = { argb: 'b03600' };
        worksheet.getCell('B1:J2').font = {
            size: 11,
            bold: true
        };
        worksheet.getCell('B1:J2').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('B3:J4');
        worksheet.getCell('B3:J4').value = "RETURN STOCK PART DETAILS";
        worksheet.getCell('B3:J4').fgColor = { argb: '00b050' };

        worksheet.getCell('B3:J4').font = {
            size: 11,
            bold: true
        };
        worksheet.getCell('B3:J4').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('K1');
        worksheet.getCell('K1').value = "Format No.SE/MTN/R05";
        worksheet.getCell('K1').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('K2');
        worksheet.getCell('K2').value = "Issue Date : ";
        worksheet.getCell('K2').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('K3');
        worksheet.getCell('K3').value = "Rev. No. 00	";
        worksheet.getCell('K3').alignment = { vertical: 'left', horizontal: 'left' };
        worksheet.mergeCells('K4');
        worksheet.getCell('K4').value = "Rev Date :";
        worksheet.getCell('K4').alignment = { vertical: 'left', horizontal: 'left' };

        worksheet.mergeCells('A5:C5');
        worksheet.getCell('A5:C5').value = {
          richText: [
            { font: { size: 12 }, text: "Part Code:" + "\n\n" },
            { font: { size: 12 }, text: "\n\n" +  returnRawmaterial[i].prtcode2.partno},
          ],
        };
        worksheet.getCell('A5:C5').alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells('D5:F5');
        worksheet.getCell('D5:F5').value = {
          richText: [
            { font: { size: 12 }, text: "Part Name:" + "\n\n" },
            { font: { size: 12 }, text: "\n\n" +  returnRawmaterial[i].prtcode2.partname},
          ],
        };
        worksheet.getCell('D5:F5').alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells('G5:I5');
        worksheet.getCell('G5:I5').value = {
          richText: [
            { font: { size: 12 }, text: "Part Description:" + "\n\n" },
            { font: { size: 12 }, text: "\n\n" +  returnRawmaterial[i].prtcode2.descrip},
          ],
        };
        worksheet.getCell('G5:I5').alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells('J5:K5');
        worksheet.getCell('J5:K5').value = {
          richText: [
            { font: { size: 12 }, text: "Reject Qunatity:" + "\n\n" },
            { font: { size: 12 }, text: "\n\n" +  returnRawmaterial[i].prtrejectedQty},
          ],
        };
        worksheet.getCell('J5:K5').alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells("A6");
        worksheet.getCell("A6").value = "Part Code";
        worksheet.getCell("A6").font = {size: 11, bold: true,};
        worksheet.getCell("A6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("B6");
        worksheet.getCell("B6").value = "Dispatch Date";
        worksheet.getCell("B6").font = {size: 11, bold: true,};
        worksheet.getCell("B6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("C6");
        worksheet.getCell("C6").value = "Time";
        worksheet.getCell("C6").font = {size: 11, bold: true,};
        worksheet.getCell("C6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("D6");
        worksheet.getCell("D6").value = "Paid Amount";
        worksheet.getCell("D6").font = {size: 11, bold: true,};
        worksheet.getCell("D6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("E6");
        worksheet.getCell("E6").value = "Mode of Dispatch";
        worksheet.getCell("E6").font = {size: 11, bold: true,};
        worksheet.getCell("E6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("F6");
        worksheet.getCell("F6").value = "Vechicle No";
        worksheet.getCell("F6").font = {size: 11, bold: true,};
        worksheet.getCell("F6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("G6");
        worksheet.getCell("G6").value = "Mobile No";
        worksheet.getCell("G6").font = {size: 11, bold: true,};
        worksheet.getCell("G6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("H6");
        worksheet.getCell("H6").value = "Person Name";
        worksheet.getCell("H6").font = {size: 11, bold: true,};
        worksheet.getCell("H6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("I6");
        worksheet.getCell("I6").value = "Status";
        worksheet.getCell("I6").font = {size: 11, bold: true,};
        worksheet.getCell("I6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
        
        worksheet.mergeCells("J6");
        worksheet.getCell("J6").value = "Reference ID No";
        worksheet.getCell("J6").font = {size: 11, bold: true,};
        worksheet.getCell("J6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        worksheet.mergeCells("K6");
        worksheet.getCell("K6").value = "Rejected Quantity";
        worksheet.getCell("K6").font = {size: 11, bold: true,};
        worksheet.getCell("K6").alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

        let stockarray = [];

            for (let j = 0; j < returnStock.length; j++) {
                if (returnStock[j].partnumber == returnRawmaterial[i].prtcode) {
                    stockarray.push(returnStock[j])
                }
        }

        for(let k = 0; k < stockarray.length; k++) {
                
                let temp = k + 7;

                worksheet.mergeCells("A" + temp);
                worksheet.getCell("A" + temp).value = stockarray[k].partnumber2.partno;
                worksheet.getCell("A" + temp).font = { size: 11,bold: true, };
                worksheet.getCell("A" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("B" + temp);
                worksheet.getCell("B" + temp).value = stockarray[k].prtdate;
                worksheet.getCell("B" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("B" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("C" + temp);
                worksheet.getCell("C" + temp).value = stockarray[k].prttime;
                worksheet.getCell("C" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("C" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("D" + temp);
                worksheet.getCell("D" + temp).value = stockarray[k].prtpaidamount;
                worksheet.getCell("D" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("D" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("E" + temp);
                worksheet.getCell("E" + temp).value = stockarray[k].prtdispatch;
                worksheet.getCell("E" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("E" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("F" + temp);
                worksheet.getCell("F" + temp).value = stockarray[k].prtvichleno;
                worksheet.getCell("F" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("F" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("G" + temp);
                worksheet.getCell("G" + temp).value = stockarray[k].prtmobilenumber;
                worksheet.getCell("G" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("G" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("H" + temp);
                worksheet.getCell("H" + temp).value = stockarray[k].prtpersonname;
                worksheet.getCell("H" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("H" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("I" + temp);
                worksheet.getCell("I" + temp).value = stockarray[k].prtstatus;
                worksheet.getCell("I" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("I" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};

                worksheet.mergeCells("J" + temp);
                worksheet.getCell("J" + temp).value = stockarray[k].prtreferenceid;
                worksheet.getCell("J" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("J" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
    
                worksheet.mergeCells("K" + temp);
                worksheet.getCell("K" + temp).value = stockarray[k].prtrejectitems;
                worksheet.getCell("K" + temp).font = {size: 11,bold: true,};
                worksheet.getCell("K" + temp).alignment = {vertical: "middle",horizontal: "center",wraptext: true,};
            }
            
     

      return workbook.xlsx.write(response).then(function () {
        response["status"](200).end();
      });
    }
  }
}
