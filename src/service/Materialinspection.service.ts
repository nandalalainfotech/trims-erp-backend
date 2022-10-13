import { HttpException, HttpStatus, Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MaterialinspectionDTO } from "src/dto/Materialinspection.dto";
import { Materialinspection001wb } from "src/entity/MaterialInspection001wb";
import { Rawmaterialinspection001wb } from "src/entity/Rawmaterialinspection001wb";
import { getManager, Repository } from "typeorm";
import { Response } from "express";
import { Request } from "supertest";
import { createReadStream } from "fs";
import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { Consumble001mb } from "src/entity/Consumble001mb";
import { Childpart001mb } from "src/entity/ChildPart001mb";
import { Part001mb } from "src/entity/Part001mb";
import { Materialinward001wb } from "src/entity/Materialinward001wb";
import { Observationsitems001wb } from "src/entity/Observationsitems001wb";
var path = require('path');
var fs = require('fs');
const excel = require('exceljs');
var pdf = require('dynamic-html-pdf');
var converter = require("number-to-words");



@Injectable()
export class MaterialinspectionService {
    constructor(

        @InjectRepository(Materialinspection001wb) private readonly materialinspectionRepository: Repository<Materialinspection001wb>,
        @InjectRepository(Rawmaterialinspection001wb) private readonly rawmaterialinspectionRepository: Repository<Rawmaterialinspection001wb>,
        @InjectRepository(Orderitem001mb)private readonly orderItemsRepository: Repository<Orderitem001mb>,
        @InjectRepository(Consumble001mb)private readonly consumbleRepository: Repository<Consumble001mb>,
        @InjectRepository(Childpart001mb)private readonly childPartRepository: Repository<Childpart001mb>,
        @InjectRepository(Part001mb) private readonly PartRepository: Repository<Part001mb>,
        @InjectRepository(Materialinward001wb)private readonly MaterialinwardRepository: Repository<Materialinward001wb>,
        @InjectRepository(Observationsitems001wb) private readonly observationsitemsRepository: Repository<Observationsitems001wb>) {
    }

    async findAll(unitslno:any): Promise<Materialinspection001wb[]> {
      return await this.materialinspectionRepository.find({ order: { slNo: "DESC" },where:{unitslno:unitslno}})
  }

    async getCount(): Promise<string> {
        const entityManager = getManager();
        let result = await getManager().query('select count(*) as row from Materialinspection001wb', ['row']);
        var string = JSON.stringify(result);
        return string;
    }
    
    async create(materialinspectionDTO: MaterialinspectionDTO): Promise<Materialinspection001wb> {
     
      
     
      let supcontact:( Observationsitems001wb & Rawmaterialinspection001wb)[]

        let rawmaterialinspection001wbs: Rawmaterialinspection001wb[] = [];

        let observationsitems001wbs: Observationsitems001wb[] = [];


        for (let i = 0; i < materialinspectionDTO.Rawmaterialinspection.length; i++) {
         
          for(let j=0;j<materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs.length;j++){
            
            // for(let k=0;k<materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].observation.length;k++){
            
            const observationsitems001wb = new Observationsitems001wb();
          observationsitems001wb.observationslno2 = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].observationslno2;
          
          observationsitems001wb.ordernumber  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].ordernumber;
          observationsitems001wb.consumnumber  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].consumnumber;
          observationsitems001wb.childnumber  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].childnumber;
          observationsitems001wb.partnumber  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].partnumber;
          observationsitems001wb.orderparameter  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].orderparameter;
          observationsitems001wb.partparameter  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].partparameter;
          observationsitems001wb.orderinspection  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].orderinspection;
          observationsitems001wb.orderspecification  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].orderspecification;
          observationsitems001wb.childinspection  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].childinspection;
          observationsitems001wb.childparameter  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].childparameter;
          observationsitems001wb.childspecification  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].childspecification;
          observationsitems001wb.partinspection  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].partinspection;
          observationsitems001wb.partspecification  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].partspecification;
          observationsitems001wb.consuminspection  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].consuminspection;
          observationsitems001wb.consumspecification  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].consumspecification;
          observationsitems001wb.consumparameter  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].consumparameter;
          observationsitems001wb.consumnumber  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].consumnumber;
          observationsitems001wb.orderobservartion  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].orderobservartion;
          observationsitems001wb.orderobservartion1  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].orderobservartion1;
          observationsitems001wb.orderobservartion2  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].orderobservartion2;
          observationsitems001wb.orderobservartion3  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].orderobservartion3;
          observationsitems001wb.orderobservartion4  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].orderobservartion4;
          observationsitems001wb.orderobservartion5  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].orderobservartion5;
          observationsitems001wb.orderobservartion6  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].orderobservartion6;
          observationsitems001wb.orderobservartion7  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].orderobservartion7;
          observationsitems001wb.orderobservartion8  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].orderobservartion8;
          observationsitems001wb.orderobservartion9  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].orderobservartion9;
          observationsitems001wb.consumobservartion  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].consumobservartion;
          observationsitems001wb.consumobservartion1  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].consumobservartion1;           
          observationsitems001wb.consumobservartion2  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].consumobservartion2;
          observationsitems001wb.consumobservartion3  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].consumobservartion3;
          observationsitems001wb.consumobservartion4  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].consumobservartion4;
          observationsitems001wb.consumobservartion5  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].consumobservartion5;
          observationsitems001wb.consumobservartion6  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].consumobservartion6;
          observationsitems001wb.consumobservartion7  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].consumobservartion7;
          observationsitems001wb.consumobservartion8  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].consumobservartion8;
          observationsitems001wb.consumobservartion9  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].consumobservartion9;
          observationsitems001wb.childobservartion  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].childobservartion;
          observationsitems001wb.childobservartion1  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].childobservartion1;
          observationsitems001wb.childobservartion2  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].childobservartion2;
          observationsitems001wb.childobservartion3  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].childobservartion3;
          observationsitems001wb.childobservartion4  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].childobservartion4;
          observationsitems001wb.childobservartion5  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].childobservartion5;
          observationsitems001wb.childobservartion6  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].childobservartion6;
          observationsitems001wb.childobservartion7  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].childobservartion7;
          observationsitems001wb.childobservartion8  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].childobservartion8;
          observationsitems001wb.childobservartion9  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].childobservartion9;
          observationsitems001wb.partobservartion  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].partobservartion;
          observationsitems001wb.partobservartion1  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].partobservartion1;
          observationsitems001wb.partobservartion2  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].partobservartion2;
          observationsitems001wb.partobservartion3  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].partobservartion3;
          observationsitems001wb.partobservartion4  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].partobservartion4;
          observationsitems001wb.partobservartion5  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].partobservartion5;
          observationsitems001wb.partobservartion6  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].partobservartion6;
          observationsitems001wb.partobservartion7  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].partobservartion7;
          observationsitems001wb.partobservartion8  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].partobservartion8;
          observationsitems001wb.partobservartion9  = materialinspectionDTO.Rawmaterialinspection[i].observationsitems001wbs[j].partobservartion9;
          observationsitems001wb.unitslno = materialinspectionDTO.unitslno;
           observationsitems001wb.insertUser = materialinspectionDTO.insertUser;
           observationsitems001wb.insertDatetime = materialinspectionDTO.insertDatetime;
        

          let observation = await this.observationsitemsRepository.save(observationsitems001wb);
          observationsitems001wbs.push(observation);
            // }
        
        }
     
        let rawmaterialItems: Rawmaterialinspection001wb[] = [];
        rawmaterialItems = await this.rawmaterialinspectionRepository.createQueryBuilder("rawmaterialinspection001wb")
          .leftJoinAndSelect("rawmaterialinspection001wb.itemcode2", "itemcode2")
          .addSelect('rawmaterialinspection001wb.acceptedsum', 'acceptedsum')
          .addSelect('rawmaterialinspection001wb.rejectesum', 'rejectesum')
          .where("rawmaterialinspection001wb.itemcode = :itemcode", { itemcode: materialinspectionDTO.Rawmaterialinspection[i].itemcode })
          .orderBy('rawmaterialinspection001wb.itemcode', 'ASC')
          .groupBy("rawmaterialinspection001wb.itemcode")
          .getRawMany();
  
        let ordeitem = await this.rawmaterialinspectionRepository.find({ where: { itemcode: materialinspectionDTO.Rawmaterialinspection[i].itemcode } });
  
  
        let consumableitem: Rawmaterialinspection001wb[] = [];
        consumableitem = await this.rawmaterialinspectionRepository.createQueryBuilder("rawmaterialinspection001wb")
          .leftJoinAndSelect("rawmaterialinspection001wb.cucode2", "cucode2")
          .addSelect('rawmaterialinspection001wb.cuacceptedsum', 'cuacceptedsum')
          .addSelect('rawmaterialinspection001wb.curejectesum', 'curejectesum')
          .where("rawmaterialinspection001wb.cucode = :cucode", { cucode: materialinspectionDTO.Rawmaterialinspection[i].cucode })
          .groupBy("rawmaterialinspection001wb.cucode")
          .getRawMany();
  
        let consumbleItems = await this.rawmaterialinspectionRepository.find({ where: { cucode: materialinspectionDTO.Rawmaterialinspection[i].cucode } });
  
        let childitem: Rawmaterialinspection001wb[] = [];
        childitem = await this.rawmaterialinspectionRepository.createQueryBuilder("rawmaterialinspection001wb")
          .leftJoinAndSelect("rawmaterialinspection001wb.cptcode2", "cptcode2")
          .addSelect('rawmaterialinspection001wb.cptacceptedsum', 'cptacceptedsum')
          .addSelect('rawmaterialinspection001wb.cptrejectesum', 'cptrejectesum')
          .where("rawmaterialinspection001wb.cptcode = :cptcode", { cptcode: materialinspectionDTO.Rawmaterialinspection[i].cptcode })
          .groupBy("rawmaterialinspection001wb.cptcode")
          // .groupBy("rawmaterialinspection001wb.prtcode") 
          .getRawMany();
  
  
          let ChildPartrItems = await this.rawmaterialinspectionRepository.find({ where: { cptcode: materialinspectionDTO.Rawmaterialinspection[i].cptcode } });
  
        let partitem: Rawmaterialinspection001wb[] = [];
        partitem = await this.rawmaterialinspectionRepository.createQueryBuilder("rawmaterialinspection001wb")
          .leftJoinAndSelect("rawmaterialinspection001wb.prtcode2", "prtcode2")
          .addSelect('rawmaterialinspection001wb.prtacceptedsum', 'prtacceptedsum')
          .addSelect('rawmaterialinspection001wb.prtrejectesum', 'prtrejectesum')
          .where("rawmaterialinspection001wb.prtcode = :prtcode", { prtcode: materialinspectionDTO.Rawmaterialinspection[i].prtcode })
          .groupBy("rawmaterialinspection001wb.prtcode")
          .getRawMany();
  
          let PartrItems = await this.rawmaterialinspectionRepository.find({ where: { prtcode: materialinspectionDTO.Rawmaterialinspection[i].prtcode } });
  
        const rawmaterialinspection001wb = new Rawmaterialinspection001wb();
  
        rawmaterialinspection001wb.rawmaterialslno2 = materialinspectionDTO.Rawmaterialinspection[i].rawmaterialslno2;
        rawmaterialinspection001wb.itemcode = materialinspectionDTO.Rawmaterialinspection[i].itemcode;
        rawmaterialinspection001wb.itemname = materialinspectionDTO.Rawmaterialinspection[i].itemname;
        rawmaterialinspection001wb.descrip = materialinspectionDTO.Rawmaterialinspection[i].descrip;
        rawmaterialinspection001wb.qunty = materialinspectionDTO.Rawmaterialinspection[i].qunty;
        rawmaterialinspection001wb.acceptedQty = materialinspectionDTO.Rawmaterialinspection[i].acceptedQty;
        rawmaterialinspection001wb.receivedQty = materialinspectionDTO.Rawmaterialinspection[i].receivedQty;
        rawmaterialinspection001wb.rejectedQty = materialinspectionDTO.Rawmaterialinspection[i].rejectedQty;
        rawmaterialinspection001wb.outstanding = materialinspectionDTO.Rawmaterialinspection[i].outstanding;
       
        if (ordeitem.length == 0) {
          rawmaterialinspection001wb.acceptedsum = rawmaterialinspection001wb.acceptedQty
          rawmaterialinspection001wb.closing = materialinspectionDTO.Rawmaterialinspection[i].closing;
        }
        if (ordeitem.length != 0 && rawmaterialinspection001wb.acceptedQty) {
          rawmaterialinspection001wb.acceptedsum = ordeitem[ordeitem.length - 1].acceptedsum + rawmaterialinspection001wb.acceptedQty;
          rawmaterialinspection001wb.closing = ordeitem[ordeitem.length - 1].closing;
        }
  
        if (ordeitem.length == 0) {
          rawmaterialinspection001wb.rejectesum = rawmaterialinspection001wb.rejectedQty
        }
        if (ordeitem.length != 0 && rawmaterialinspection001wb.acceptedQty) {
          rawmaterialinspection001wb.rejectesum = Number(ordeitem[ordeitem.length - 1].rejectesum) + rawmaterialinspection001wb.rejectedQty;
        }
  
        rawmaterialinspection001wb.cucode = materialinspectionDTO.Rawmaterialinspection[i].cucode;
        rawmaterialinspection001wb.cuname = materialinspectionDTO.Rawmaterialinspection[i].cuname;
        rawmaterialinspection001wb.cudescrip = materialinspectionDTO.Rawmaterialinspection[i].cudescrip;
        rawmaterialinspection001wb.cuqunty = materialinspectionDTO.Rawmaterialinspection[i].cuqunty;
        rawmaterialinspection001wb.cureceivedQty = materialinspectionDTO.Rawmaterialinspection[i].cureceivedQty;
        rawmaterialinspection001wb.cuacceptedQty = materialinspectionDTO.Rawmaterialinspection[i].cuacceptedQty;
        rawmaterialinspection001wb.curejectedQty = materialinspectionDTO.Rawmaterialinspection[i].curejectedQty;
        rawmaterialinspection001wb.cuoutstanding = materialinspectionDTO.Rawmaterialinspection[i].cuoutstanding;
        
  
        // rawmaterialinspection001wb.cuacceptedsum = Number(consumableitem[i].cuacceptedsum) + rawmaterialinspection001wb.cuacceptedQty;
  
  
        if (consumbleItems.length == 0) {
          rawmaterialinspection001wb.cuacceptedsum = rawmaterialinspection001wb.cuacceptedQty
          rawmaterialinspection001wb.cucolsing= materialinspectionDTO.Rawmaterialinspection[i].cucolsing
        }
        if (consumbleItems.length != 0 && rawmaterialinspection001wb.cuacceptedQty) {
          rawmaterialinspection001wb.cuacceptedsum = Number(consumbleItems[consumbleItems.length-1].cuacceptedsum) + rawmaterialinspection001wb.cuacceptedQty;
          rawmaterialinspection001wb.cucolsing = consumbleItems[consumbleItems.length - 1].cucolsing;
        }
  
        if (consumbleItems.length == 0) {
  
          rawmaterialinspection001wb.curejectesum = rawmaterialinspection001wb.curejectedQty
        }
        if (consumbleItems.length != 0 && rawmaterialinspection001wb.curejectedQty) {
  
          rawmaterialinspection001wb.curejectesum = Number(consumbleItems[consumbleItems.length-1].curejectesum) + rawmaterialinspection001wb.curejectedQty;
        }
        rawmaterialinspection001wb.cptcode = materialinspectionDTO.Rawmaterialinspection[i].cptcode;
        rawmaterialinspection001wb.cptname = materialinspectionDTO.Rawmaterialinspection[i].cptname;
        rawmaterialinspection001wb.cptdescrip = materialinspectionDTO.Rawmaterialinspection[i].cptdescrip;
        rawmaterialinspection001wb.cptqunty = materialinspectionDTO.Rawmaterialinspection[i].cptqunty;
        rawmaterialinspection001wb.cptreceivedQty = materialinspectionDTO.Rawmaterialinspection[i].cptreceivedQty;
        rawmaterialinspection001wb.cptacceptedQty = materialinspectionDTO.Rawmaterialinspection[i].cptacceptedQty;
        rawmaterialinspection001wb.cptrejectedQty = materialinspectionDTO.Rawmaterialinspection[i].cptrejectedQty;
        rawmaterialinspection001wb.cptoutstanding = materialinspectionDTO.Rawmaterialinspection[i].cptoutstanding;
        
  
        if (ChildPartrItems.length == 0) {
          rawmaterialinspection001wb.cptacceptedsum = rawmaterialinspection001wb.cptacceptedQty
          rawmaterialinspection001wb.cptcolsing= materialinspectionDTO.Rawmaterialinspection[i].cptcolsing;
        }
        if (ChildPartrItems.length != 0 && rawmaterialinspection001wb.cptacceptedQty) {
          rawmaterialinspection001wb.cptacceptedsum = Number(ChildPartrItems[ChildPartrItems.length-1].cptacceptedsum) + rawmaterialinspection001wb.cptacceptedQty;
          rawmaterialinspection001wb.cptcolsing = ChildPartrItems[ChildPartrItems.length-1].cptcolsing
        }
        if (ChildPartrItems.length == 0) {
          rawmaterialinspection001wb.cptrejectesum = rawmaterialinspection001wb.cptrejectedQty
        }
        if (ChildPartrItems.length != 0 && rawmaterialinspection001wb.cptrejectedQty) {
          rawmaterialinspection001wb.cptrejectesum = Number(ChildPartrItems[ChildPartrItems.length-1].cptrejectesum) + rawmaterialinspection001wb.cptrejectedQty;
        }
  
        rawmaterialinspection001wb.prtcode = materialinspectionDTO.Rawmaterialinspection[i].prtcode;
        rawmaterialinspection001wb.prtname = materialinspectionDTO.Rawmaterialinspection[i].prtname;
        rawmaterialinspection001wb.prtdescrip = materialinspectionDTO.Rawmaterialinspection[i].prtdescrip;
        rawmaterialinspection001wb.prtqunty = materialinspectionDTO.Rawmaterialinspection[i].prtqunty;
        rawmaterialinspection001wb.prtreceivedQty = materialinspectionDTO.Rawmaterialinspection[i].prtreceivedQty;
        rawmaterialinspection001wb.prtacceptedQty = materialinspectionDTO.Rawmaterialinspection[i].prtacceptedQty;
        rawmaterialinspection001wb.prtrejectedQty = materialinspectionDTO.Rawmaterialinspection[i].prtrejectedQty;
        rawmaterialinspection001wb.prtoutstanding = materialinspectionDTO.Rawmaterialinspection[i].prtoutstanding;
        
  
        if (PartrItems.length == 0) {
          rawmaterialinspection001wb.prtacceptedsum = rawmaterialinspection001wb.prtacceptedQty;
          rawmaterialinspection001wb.prtcolsing =materialinspectionDTO.Rawmaterialinspection[i].prtcolsing;
        }
        if (PartrItems.length != 0 && rawmaterialinspection001wb.prtacceptedQty) {
          rawmaterialinspection001wb.prtacceptedsum = Number(PartrItems[PartrItems.length-1].prtacceptedsum) + rawmaterialinspection001wb.prtacceptedQty;
          rawmaterialinspection001wb.prtcolsing = PartrItems[PartrItems.length-1].prtcolsing;
        }
        if (PartrItems.length == 0) {
          rawmaterialinspection001wb.prtrejectesum = rawmaterialinspection001wb.prtrejectedQty
        }
        if (PartrItems.length != 0 && rawmaterialinspection001wb.prtrejectedQty) {
          rawmaterialinspection001wb.prtrejectesum = Number(PartrItems[PartrItems.length-1].prtrejectesum) + rawmaterialinspection001wb.prtrejectedQty;
        }
        rawmaterialinspection001wb.unitslno = materialinspectionDTO.unitslno;
        rawmaterialinspection001wb.insertUser = materialinspectionDTO.insertUser;
        rawmaterialinspection001wb.insertUser = materialinspectionDTO.insertUser;
        rawmaterialinspection001wb.insertDatetime = materialinspectionDTO.insertDatetime;
            rawmaterialinspection001wb.observationsitems001wbs = observationsitems001wbs;
            observationsitems001wbs=[];
          let supcontact =  await this.rawmaterialinspectionRepository.save(rawmaterialinspection001wb);
            rawmaterialinspection001wbs.push(supcontact);
        
      }

        if (rawmaterialinspection001wbs.length > 0) {
            const materialinspection001wb = new Materialinspection001wb();
            materialinspection001wb.setProperties(materialinspectionDTO);
            materialinspection001wb.rawmaterialinspection001wbs = rawmaterialinspection001wbs;
            await this.materialinspectionRepository.save(materialinspection001wb);
           
            return materialinspection001wb;
        }else{
          throw new HttpException('Please Enter Inspection Details', HttpStatus.INTERNAL_SERVER_ERROR);
      }
        
    }
    async update(materialinspectionDTO: MaterialinspectionDTO): Promise<Materialinspection001wb> {
         
    let materialreceiveditem001wbs: Rawmaterialinspection001wb[] = [];

    for (let i = 0; i < materialinspectionDTO.Rawmaterialinspection.length; i++) {
      let materialreceiveditem001wb = new Rawmaterialinspection001wb();
      let consumableitem = new Rawmaterialinspection001wb();
      let Rawmaterial = new Rawmaterialinspection001wb();
      let childpart = new Rawmaterialinspection001wb();
      let Parts = new Rawmaterialinspection001wb();
      Rawmaterial = await this.rawmaterialinspectionRepository.findOne({ where: { itemcode:materialinspectionDTO.Rawmaterialinspection[i].itemcode } });
      consumableitem = await this.rawmaterialinspectionRepository.findOne({ where: { cucode:materialinspectionDTO.Rawmaterialinspection[i].cucode } });
      childpart = await this.rawmaterialinspectionRepository.findOne({ where: { cptcode:materialinspectionDTO.Rawmaterialinspection[i].cptcode } });
      Parts = await this.rawmaterialinspectionRepository.findOne({ where: { prtcode:materialinspectionDTO.Rawmaterialinspection[i].prtcode } });

      let rawmaterialItems = new Rawmaterialinspection001wb();
      let ConsumableItems = new Rawmaterialinspection001wb();
      let ChildPartItems = new Rawmaterialinspection001wb();
      let PartsItems = new Rawmaterialinspection001wb();
      
      rawmaterialItems.acceptedQty = Number(materialinspectionDTO.Rawmaterialinspection[i].acceptedQty) + Rawmaterial.acceptedQty
      rawmaterialItems.receivedQty = materialinspectionDTO.Rawmaterialinspection[i].receivedQty;
      rawmaterialItems.rejectedQty = materialinspectionDTO.Rawmaterialinspection[i].rejectedQty;
      rawmaterialItems.outstanding = materialinspectionDTO.Rawmaterialinspection[i].outstanding;
      await this.rawmaterialinspectionRepository.update({ itemcode: materialinspectionDTO.Rawmaterialinspection[i].itemcode }, rawmaterialItems);

      ConsumableItems.cuacceptedQty = Number(materialinspectionDTO.Rawmaterialinspection[i].cuacceptedQty) + consumableitem.cuacceptedQty
      // materialreceiveditem001wb.cuacceptedQty = materialinspectionDTO.Rawmaterialinspection[i].cuacceptedQty;
      ConsumableItems.cureceivedQty = materialinspectionDTO.Rawmaterialinspection[i].cureceivedQty;
      ConsumableItems.curejectedQty = materialinspectionDTO.Rawmaterialinspection[i].curejectedQty;
      ConsumableItems.cuoutstanding = materialinspectionDTO.Rawmaterialinspection[i].cuoutstanding;
      await this.rawmaterialinspectionRepository.update({ cucode: materialinspectionDTO.Rawmaterialinspection[i].cucode }, ConsumableItems);

      ChildPartItems.cptreceivedQty = materialinspectionDTO.Rawmaterialinspection[i].cptreceivedQty;
      ChildPartItems.cptacceptedQty = Number(materialinspectionDTO.Rawmaterialinspection[i].cptacceptedQty) + childpart.cptacceptedQty
      ChildPartItems.cptrejectedQty = materialinspectionDTO.Rawmaterialinspection[i].cptrejectedQty;
      ChildPartItems.cptoutstanding = materialinspectionDTO.Rawmaterialinspection[i].cptoutstanding;
      await this.rawmaterialinspectionRepository.update({ cptcode: materialinspectionDTO.Rawmaterialinspection[i].cptcode }, ChildPartItems);
      PartsItems.prtreceivedQty = materialinspectionDTO.Rawmaterialinspection[i].prtreceivedQty;
      PartsItems.prtacceptedQty = Number(materialinspectionDTO.Rawmaterialinspection[i].prtacceptedQty) + Parts.prtacceptedQty
      PartsItems.prtrejectedQty = materialinspectionDTO.Rawmaterialinspection[i].prtrejectedQty;
      PartsItems.prtoutstanding = materialinspectionDTO.Rawmaterialinspection[i].prtoutstanding;
      await this.rawmaterialinspectionRepository.update({ prtcode: materialinspectionDTO.Rawmaterialinspection[i].prtcode }, PartsItems);
    }
        const materialinspection001wb = new Materialinspection001wb();
        materialinspection001wb.setProperties(materialinspectionDTO);
        await this.materialinspectionRepository.update({ slNo: materialinspection001wb.slNo }, materialinspection001wb);
        return materialinspection001wb;
    }

    findOne(id: number): Promise<Materialinspection001wb> {
        return this.materialinspectionRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.materialinspectionRepository.delete(slNo);
    }

    async downloadPdf(unitslno:any,@Req() request: Request, @Res() response: Response) {

      let materialInspection = await this.materialinspectionRepository.find({
        relations: ["rawmaterialinspection001wbs", "rawmaterialinspection001wbs.itemcode2",
        "rawmaterialinspection001wbs.cucode2","rawmaterialinspection001wbs.cptcode2","rawmaterialinspection001wbs.prtcode2",],
        where:{unitslno:unitslno},order: { slNo: "DESC" }
    });  

    let rawmaterialinspection = await this.rawmaterialinspectionRepository.find({
      relations:["observationsitems001wbs","prtcode2","cucode2","itemcode2","cptcode2"]
    });

    let observation = await this.observationsitemsRepository.find();

    let observations = await this.observationsitemsRepository.find();

    let materialInward = await this.MaterialinwardRepository.find();

    let observationarray: Observationsitems001wb[] = [];

        var fs = require("fs");
        var pdf = require("dynamic-html-pdf");
        var html = fs.readFileSync("materialinspections.html", "utf8");

        pdf.registerHelper("ifgrnumber", function (grnumber, options) {
          this.grnumber  = this.grnumber?materialInward.find(x => x.slNo === this.grnumber)?.grn : null;
             if (this.grnumber == undefined ) { 
               return options.inverse(this);
             }else{
               return options.fn(this, this.grnumber);   
             }
         });
        

        pdf.registerHelper("ifordernumber", function (ordernumber, options) {
          let observationarray: Observationsitems001wb[] = [];
          for (let k = 0; k < this.rawmaterialinspection001wbs.length; k++) {
            for (let j = 0; j < observations.length; j++) {
                  if (this.rawmaterialinspection001wbs[k].slNo == observations[j].observationslno) {
                    observationarray.push(observation[j])
                }
            }
        }
        this.observation = observationarray;
    
        if (this.observation != 0) { 
          return options.fn(this, this.observation); 
        }else{
          return options.inverse(this);
        }
        });

        pdf.registerHelper("iforder", function (order, options) {
          if (this.ordernumber) { 
            return options.fn(this); 
          }else{
            return options.inverse(this);
          }
        });
        pdf.registerHelper("ifconsum", function (consum, options) {
          if (this.consumnumber) { 
            return options.fn(this); 
          }else{
            return options.inverse(this);
          }
        });
        pdf.registerHelper("ifchild", function (child, options) {
          if (this.childnumber) { 
            return options.fn(this); 
          }else{
            return options.inverse(this);
          }
        });
        pdf.registerHelper("ifpart", function (part, options) {
          if (this.partnumber) { 
            return options.fn(this); 
          }else{
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
              materialInspect: materialInspection,
            },
            path: "./pdf/materialinspection.pdf", // it is not required if type is buffer
        };

        if (document === null) {
            return null;
        } else {
            pdf
                .create(document, options)
                .then((pathRes) => {
                    const filestream = createReadStream(pathRes.filename);
                    response.writeHead(200, {
                        "Content-Disposition": "attachment;filename=" + "materialinspection.pdf",
                        "Content-Type": "application/pdf",
                    });
                    filestream.pipe(response);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }


    async downloadIDPdf(unitslno:any,id: any, response: Response) {

      let materialInspection = await this.materialinspectionRepository.find({
        relations: ["rawmaterialinspection001wbs", "rawmaterialinspection001wbs.itemcode2",
        "rawmaterialinspection001wbs.cucode2","rawmaterialinspection001wbs.cptcode2","rawmaterialinspection001wbs.prtcode2"],
        where:{slNo: id,unitslno:unitslno}
    })

    let materialInward = await this.MaterialinwardRepository.find();

    

    let rawmaterialinspection = await this.rawmaterialinspectionRepository.find();

    let observation = await this.observationsitemsRepository.find();

    let observations = await this.observationsitemsRepository.find();


    var fs = require("fs");
    var pdf = require("dynamic-html-pdf");
    var html = fs.readFileSync("materialinspection.html", "utf8");

    pdf.registerHelper("ifgrnumber", function (grnumber, options) {
      this.grnumber  = this.grnumber?materialInward.find(x => x.slNo === this.grnumber)?.grn : null;
         if (this.grnumber == undefined ) { 
           return options.inverse(this);
         }else{
           return options.fn(this, this.grnumber);   
         }
     });

    pdf.registerHelper("ifordernumber", function (ordernumber, options) {
      let observationarray: Observationsitems001wb[] = [];
      for (let k = 0; k < this.rawmaterialinspection001wbs.length; k++) {
        for (let j = 0; j < observations.length; j++) {
              if (this.rawmaterialinspection001wbs[k].slNo == observations[j].observationslno) {
                observationarray.push(observation[j])
            }
        }
    }
    this.observation = observationarray;

    if (this.observation != 0) { 
      return options.fn(this, this.observation); 
    }else{
      return options.inverse(this);
    }
    });

    pdf.registerHelper("iforder", function (order, options) {
      if (this.ordernumber) { 
        return options.fn(this); 
      }else{
        return options.inverse(this);
      }
    });
    pdf.registerHelper("ifconsum", function (consum, options) {
      if (this.consumnumber) { 
        return options.fn(this); 
      }else{
        return options.inverse(this);
      }
    });
    pdf.registerHelper("ifchild", function (child, options) {
      if (this.childnumber) { 
        return options.fn(this); 
      }else{
        return options.inverse(this);
      }
    });
    pdf.registerHelper("ifpart", function (part, options) {
      if (this.partnumber) { 
        return options.fn(this); 
      }else{
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
    materialInspection: materialInspection,
    },
    path: "./pdf/materialinspection.pdf", // it is not required if type is buffer
    };

        if (document === null) {
            return null;
        } else {
            pdf
                .create(document, options)
                .then((pathRes) => {
                    const filestream = createReadStream(pathRes.filename);
                    response.writeHead(200, {
                        "Content-Disposition": "attachment;filename=" + "materialinspection.pdf",
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

      let materialInspection = await this.materialinspectionRepository.find({
          relations: ["rawmaterialinspection001wbs", "rawmaterialinspection001wbs.itemcode2",
          "rawmaterialinspection001wbs.cucode2","rawmaterialinspection001wbs.cptcode2","rawmaterialinspection001wbs.prtcode2","rawmaterialinspection001wbs.observationsitems001wbs"],
          where:{unitslno:unitslno},
          order: { slNo: "DESC" }
      })


      
      
      let rawmaterialinspection = await this.rawmaterialinspectionRepository.find({
        relations: ["observationsitems001wbs","itemcode2",
        "cucode2","cptcode2","prtcode2",]
      })


      
      let observation = await this.observationsitemsRepository.find();
  
      let materialInward = await this.MaterialinwardRepository.find();

      let workbook = new excel.Workbook();

      for (let i = 0; i < materialInspection.length; i++) {
      let worksheet = workbook.addWorksheet("Material-Inspection-Reports" + i + 1); // creating worksheet
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
        { key: "A", width: 25.0 },
        { key: "B", width: 25.0 },
        { key: "C", width: 25.0 },
        { key: "D", width: 25.0 },
        { key: "E", width: 25.0 },
        { key: "F", width: 25.0 },
        { key: "G", width: 25.0 },
        { key: "H", width: 25.0 },
        { key: "I", width: 25.0 },
        { key: "J", width: 25.0 },
        { key: "K", width: 25.0 },
        { key: "L", width: 25.0 },
        { key: "M", width: 25.0 },
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

    worksheet.mergeCells("A1:L2");
    worksheet.getCell("A1:L2").value = "SRINIVASA ENTERPRISES";
    worksheet.getCell("A1:L2").font = {
      size: 18,
      bold: true,
    };
    worksheet.getCell("A1:L2").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("A3:L4");
    worksheet.getCell("A3:L4").value = "INCOMING INSPECTION REPORT";
    worksheet.getCell("A3:L4").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("A3:L4").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("M1:O1");
    worksheet.getCell("M1:O1").value = "Format No:";
    worksheet.getCell("M1:O1").font = {
      size: 12,
      bold: true,
    };
    worksheet.getCell("M1:O1").alignment = {
      vertical: "middle",
      horizontal: "left",
    };

    worksheet.mergeCells("M2:O2");
    worksheet.getCell("M2:O2").value = "Issue Date:";
    worksheet.getCell("M2:O2").font = {
      size: 12,
      bold: true,
    };
    worksheet.getCell("M2:O2").alignment = {
      vertical: "middle",
      horizontal: "left",
    };

    worksheet.mergeCells("M3:O3");
    worksheet.getCell("M3:O3").value = "Rev No:";
    worksheet.getCell("M3:O3").font = {
      size: 12,
      bold: true,
    };
    worksheet.getCell("M3:O3").alignment = {
      vertical: "middle",
      horizontal: "left",
    };

    worksheet.mergeCells("M4:O4");
    worksheet.getCell("M4:O4").value = "Rev Date:";
    worksheet.getCell("M4:O4").font = {
      size: 12,
      bold: true,
    };
    worksheet.getCell("M4:O4").alignment = {
      vertical: "middle",
      horizontal: "left",
    };

    worksheet.mergeCells("A5:D6");
    worksheet.getCell("A5:D6").value = {
      richText: [
        { text: "Incoming Inspection Report NO:" + "\n\n" },
        { font: { size: 11 }, text: "\n\n" + materialInspection[i].iirno },
      ],
    };
    worksheet.getCell("A5:D6").font = {
      size: 14,
      bold: true,
    };
    worksheet.getCell("A5:D6").alignment = {
      vertical: "middle",
      horizontal: "left",
    };

    worksheet.mergeCells("E5:H6");
    worksheet.getCell("E5:H6").value = {
      richText: [
        { text: "Supplier/Customer Name:" + "\n\n" },
        { font: { size: 11 }, text: "\n\n" + materialInspection[i].scname },
      ],
    };
    worksheet.getCell("E5:H6").font = {
      size: 14,
      bold: true,
    };
    worksheet.getCell("E5:H6").alignment = {
      vertical: "middle",
      horizontal: "left",
    };

    worksheet.mergeCells("I5:L6");
    worksheet.getCell("I5:L6").value = {
      richText: [
        { text: "DC or Inv.No:" + "\n\n" },
        { font: { size: 11 }, text: "\n\n" + materialInspection[i].dcno },
      ],
    };
    worksheet.getCell("I5:L6").font = {
      size: 14,
      bold: true,
    };
    worksheet.getCell("I5:L6").alignment = {
      vertical: "middle",
      horizontal: "left",
    };

    worksheet.mergeCells("M5:O6");
    worksheet.getCell("M5:O6").value = {
      richText: [
        { text: "DC or Inv.Date:" + "\n\n" },
        { font: { size: 11 }, text: "\n\n" + materialInspection[i].pdate },
      ],
    };
    worksheet.getCell("M5:O6").font = {
      size: 14,
      bold: true,
    };
    worksheet.getCell("M5:O6").alignment = {
      vertical: "middle",
      horizontal: "left",
    };

    worksheet.mergeCells("A7:D8");
    worksheet.getCell("A7:D8").value = {
      richText: [
        { text: "Goods Recived No:" + "\n\n" },
        { font: { size: 11 }, text: "\n\n" + materialInspection[i].grnumber ? materialInward.find(x => x.slNo === materialInspection[i].grnumber)?.grn : ""},
      ],
    };
    worksheet.getCell("A7:D8").font = {
      size: 14,
      bold: true,
    };
    worksheet.getCell("A7:D8").alignment = {
      vertical: "middle",
      horizontal: "left",
    };

    worksheet.mergeCells("E7:H8");
    worksheet.getCell("E7:H8").value = {
      richText: [
        { text: "Customer PO Number:" + "\n\n" },
        { font: { size: 11 }, text: "\n\n" + materialInspection[i].cponumber },
      ],
    };
    worksheet.getCell("E7:H8").font = {
      size: 14,
      bold: true,
    };
    worksheet.getCell("E7:H8").alignment = {
      vertical: "middle",
      horizontal: "left",
    };

    worksheet.mergeCells("I7:L8");
    worksheet.getCell("I7:L8").value = {
      richText: [
        { text: "Self PO Number:" + "\n\n" },
        { font: { size: 11 }, text: "\n\n" + materialInspection[i].sponumber },
      ],
    };
    worksheet.getCell("I7:L8").font = {
      size: 14,
      bold: true,
    };
    worksheet.getCell("I7:L8").alignment = {
      vertical: "middle",
      horizontal: "left",
    };

    worksheet.mergeCells("M7:O8");
    worksheet.getCell("M7:O8").value = {
      richText: [
        { text: "Other Reference No:" + "\n\n" },
        { font: { size: 11 }, text: "\n\n" + materialInspection[i].refno },
      ],
    };
    worksheet.getCell("M7:O8").font = {
      size: 14,
      bold: true,
    };
    worksheet.getCell("M7:O8").alignment = {
      vertical: "middle",
      horizontal: "left",
    };

    worksheet.mergeCells("A9:A10");
    worksheet.getCell("A9:A10").value = "Category-Name";
    worksheet.getCell("A9:A10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("A9:A10").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("B9:B10");
    worksheet.getCell("B9:B10").value = "Parameter";
    worksheet.getCell("B9:B10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("B9:B10").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("C9:C10");
    worksheet.getCell("C9:C10").value = "Specification";
    worksheet.getCell("C9:C10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("C9:C10").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("D9:D10");
    worksheet.getCell("D9:D10").value = "Method of Inspection";
    worksheet.getCell("D9:D10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("D9:D10").alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    worksheet.mergeCells("E9:N9");
    worksheet.getCell("E9:N9").value = "Observation:";
    worksheet.getCell("E9:N9").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("E9:N9").alignment = {
      vertical: "middle",
      horizontal: "center",
      wraptext: true,
    };

    worksheet.mergeCells("O9:O10");
    worksheet.getCell("O9:O10").value = "Remarks:";
    worksheet.getCell("O9:O10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("O9:O10").alignment = {
      vertical: "middle",
      horizontal: "center",
      wraptext: true,
    };

    worksheet.mergeCells("E10");
    worksheet.getCell("E10").value = "1";
    worksheet.getCell("E10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("E10").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("F10");
    worksheet.getCell("F10").value = "2";
    worksheet.getCell("F10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("F10").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("G10");
    worksheet.getCell("G10").value = "3";
    worksheet.getCell("G10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("G10").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("H10");
    worksheet.getCell("H10").value = "4";
    worksheet.getCell("H10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("H10").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("I10");
    worksheet.getCell("I10").value = "5";
    worksheet.getCell("I10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("I10").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("J10");
    worksheet.getCell("J10").value = "6";
    worksheet.getCell("J10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("J10").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("K10");
    worksheet.getCell("K10").value = "7";
    worksheet.getCell("K10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("K10").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("L10");
    worksheet.getCell("L10").value = "8";
    worksheet.getCell("L10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("L10").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("M10");
    worksheet.getCell("M10").value = "9";
    worksheet.getCell("M10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("M10").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("N10");
    worksheet.getCell("N10").value = "10";
    worksheet.getCell("N10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("N10").alignment = {
      vertical: "middle",
      horizontal: "center",
    }; 

      let observationarray = [];
      for (let k = 0; k < materialInspection[i].rawmaterialinspection001wbs.length; k++) {
        for (let j = 0; j < observation.length; j++) {
              if (materialInspection[i].rawmaterialinspection001wbs[k].slNo == observation[j].observationslno) {
                observationarray.push(observation[j])
            }
        }
      }

      for(let x = 0; x < observationarray.length;x++){

         if(observationarray[x].ordernumber){
          let temp = x + 11;
           worksheet.mergeCells("A" + temp);
           worksheet.getCell("A" + temp).value = observationarray[x].ordernumber;
           worksheet.getCell("A" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("A" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
 
           worksheet.mergeCells("B" + temp);
           worksheet.getCell("B" + temp).value = observationarray[x].orderparameter;
           worksheet.getCell("B" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("B" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
 
           worksheet.mergeCells("C" + temp);
           worksheet.getCell("C" + temp).value = observationarray[x].orderspecification;
           worksheet.getCell("C" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("C" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
 
           worksheet.mergeCells("D" + temp);
           worksheet.getCell("D" + temp).value = observationarray[x].orderinspection;
           worksheet.getCell("D" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("D" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
 
           worksheet.mergeCells("E" + temp);
           worksheet.getCell("E" + temp).value = observationarray[x].orderobservartion;
           worksheet.getCell("E" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("E" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
 
           worksheet.mergeCells("F" + temp);
           worksheet.getCell("F" + temp).value = observationarray[x].orderobservartion1;
           worksheet.getCell("F" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("F" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
 
           worksheet.mergeCells("G" + temp);
           worksheet.getCell("G" + temp).value = observationarray[x].orderobservartion2;
           worksheet.getCell("G" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("G" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
 
           worksheet.mergeCells("H" + temp);
           worksheet.getCell("H" + temp).value = observationarray[x].orderobservartion3;
           worksheet.getCell("H" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("H" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
 
           worksheet.mergeCells("I" + temp);
           worksheet.getCell("I" + temp).value = observationarray[x].orderobservartion4;
           worksheet.getCell("I" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("I" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
 
           worksheet.mergeCells("J" + temp);
           worksheet.getCell("J" + temp).value = observationarray[x].orderobservartion5;
           worksheet.getCell("J" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("J" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
 
           worksheet.mergeCells("K" + temp);
           worksheet.getCell("K" + temp).value = observationarray[x].orderobservartion6;
           worksheet.getCell("K" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("K" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
 
           worksheet.mergeCells("L" + temp);
           worksheet.getCell("L" + temp).value = observationarray[x].orderobservartion7;
           worksheet.getCell("L" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("L" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
 
           worksheet.mergeCells("M" + temp);
           worksheet.getCell("M" + temp).value = observationarray[x].orderobservartion8;
           worksheet.getCell("M" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("M" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
 
           worksheet.mergeCells("N" + temp);
           worksheet.getCell("N" + temp).value = observationarray[x].orderobservartion9;
           worksheet.getCell("N" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("N" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
         }
         
        else if(observationarray[x].consumnumber) {
          let temp = x + 11;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value = observationarray[x].consumnumber;
          worksheet.getCell("A" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("A" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("B" + temp);
          worksheet.getCell("B" + temp).value = observationarray[x].consumparameter;
          worksheet.getCell("B" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("B" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("C" + temp);
          worksheet.getCell("C" + temp).value = observationarray[x].consumspecification;
          worksheet.getCell("C" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("C" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("D" + temp);
          worksheet.getCell("D" + temp).value = observationarray[x].consuminspection;
          worksheet.getCell("D" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("D" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("E" + temp);
          worksheet.getCell("E" + temp).value =observationarray[x].consumobservartion;
          worksheet.getCell("E" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("E" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("F" + temp);
          worksheet.getCell("F" + temp).value = observationarray[x].consumobservartion1;
          worksheet.getCell("F" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("F" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("G" + temp);
          worksheet.getCell("G" + temp).value = observationarray[x].consumobservartion2;
          worksheet.getCell("G" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("G" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("H" + temp);
          worksheet.getCell("H" + temp).value = observationarray[x].consumobservartion3;
          worksheet.getCell("H" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("H" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("I" + temp);
          worksheet.getCell("I" + temp).value = observationarray[x].consumobservartion4;
          worksheet.getCell("I" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("I" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("J" + temp);
          worksheet.getCell("J" + temp).value = observationarray[x].consumobservartion5;
          worksheet.getCell("J" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("J" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("K" + temp);
          worksheet.getCell("K" + temp).value = observationarray[x].consumobservartion6;
          worksheet.getCell("K" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("K" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("L" + temp);
          worksheet.getCell("L" + temp).value = observationarray[x].consumobservartion7;
          worksheet.getCell("L" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("L" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("M" + temp);
          worksheet.getCell("M" + temp).value = observationarray[x].consumobservartion8;
          worksheet.getCell("M" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("M" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("N" + temp);
          worksheet.getCell("N" + temp).value = observationarray[x].consumobservartion9;
          worksheet.getCell("N" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("N" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };
        }
        else if(observationarray[x].childnumber) {
          let temp = x + 11;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value = observationarray[x].childnumber;
          worksheet.getCell("A" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("A" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("B" + temp);
          worksheet.getCell("B" + temp).value = observationarray[x].childparameter;
          worksheet.getCell("B" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("B" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("C" + temp);
          worksheet.getCell("C" + temp).value = observationarray[x].childspecification;
          worksheet.getCell("C" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("C" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("D" + temp);
          worksheet.getCell("D" + temp).value = observationarray[x].childinspection;
          worksheet.getCell("D" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("D" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("E" + temp);
          worksheet.getCell("E" + temp).value = observationarray[x].childobservartion;
          worksheet.getCell("E" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("E" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("F" + temp);
          worksheet.getCell("F" + temp).value = observationarray[x].childobservartion1;
          worksheet.getCell("F" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("F" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("G" + temp);
          worksheet.getCell("G" + temp).value = observationarray[x].childobservartion2;
          worksheet.getCell("G" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("G" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("H" + temp);
          worksheet.getCell("H" + temp).value = observationarray[x].childobservartion3;
          worksheet.getCell("H" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("H" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("I" + temp);
          worksheet.getCell("I" + temp).value = observationarray[x].childobservartion4;
          worksheet.getCell("I" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("I" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("J" + temp);
          worksheet.getCell("J" + temp).value = observationarray[x].childobservartion5;
          worksheet.getCell("J" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("J" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("K" + temp);
          worksheet.getCell("K" + temp).value = observationarray[x].childobservartion6;
          worksheet.getCell("K" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("K" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("L" + temp);
          worksheet.getCell("L" + temp).value = observationarray[x].childobservartion7;
          worksheet.getCell("L" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("L" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("M" + temp);
          worksheet.getCell("M" + temp).value = observationarray[x].childobservartion8;
          worksheet.getCell("M" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("M" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("N" + temp);
          worksheet.getCell("N" + temp).value = observationarray[x].childobservartion9;
          worksheet.getCell("N" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("N" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };
        }
        else if(observationarray[x].partnumber) {
          let temp = x + 11;
          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value = observationarray[x].partnumber;
          worksheet.getCell("A" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("A" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("B" + temp);
          worksheet.getCell("B" + temp).value = observationarray[x].partparameter;
          worksheet.getCell("B" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("B" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("C" + temp);
          worksheet.getCell("C" + temp).value = observationarray[x].partspecification;
          worksheet.getCell("C" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("C" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("D" + temp);
          worksheet.getCell("D" + temp).value = observationarray[x].partinspection;
          worksheet.getCell("D" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("D" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("E" + temp);
          worksheet.getCell("E" + temp).value = observationarray[x].partobservartion;
          worksheet.getCell("E" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("E" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("F" + temp);
          worksheet.getCell("F" + temp).value = observationarray[x].partobservartion1;
          worksheet.getCell("F" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("F" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("G" + temp);
          worksheet.getCell("G" + temp).value = observationarray[x].partobservartion2;
          worksheet.getCell("G" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("G" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("H" + temp);
          worksheet.getCell("H" + temp).value = observationarray[x].partobservartion3;
          worksheet.getCell("H" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("H" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("I" + temp);
          worksheet.getCell("I" + temp).value = observationarray[x].partobservartion4;
          worksheet.getCell("I" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("I" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("J" + temp);
          worksheet.getCell("J" + temp).value = observationarray[x].partobservartion5;
          worksheet.getCell("J" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("J" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("K" + temp);
          worksheet.getCell("K" + temp).value = observationarray[x].partobservartion6;
          worksheet.getCell("K" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("K" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("L" + temp);
          worksheet.getCell("L" + temp).value = observationarray[x].partobservartion7;
          worksheet.getCell("L" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("L" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("M" + temp);
          worksheet.getCell("M" + temp).value = observationarray[x].partobservartion8;
          worksheet.getCell("M" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("M" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("N" + temp);
          worksheet.getCell("N" + temp).value = observationarray[x].partobservartion9;
          worksheet.getCell("N" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("N" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };
        }
        
        
     
   
      }

      let temp2 = observationarray.length + 11;

      worksheet.getRow(temp2).height = 100;

      let temps = "A" + temp2 + ":" + "C" + temp2;

      let approv = "M" + temp2 + ":" + "O" + temp2;

      let merge = "D" + temp2 + ":" + "L" + temp2;

      worksheet.mergeCells(temps);
        worksheet.getCell(temps).value = "Inspected By";
        worksheet.getCell(temps).font = {
          size: 16,
          bold: true,
        };
        worksheet.getCell(temps).alignment = {
          vertical: "middle",
          horizontal: "center",
       };


       worksheet.mergeCells(merge);
        worksheet.getCell(merge).value = "";
        worksheet.getCell(merge).font = {
          size: 16,
          bold: true,
        };
        worksheet.getCell(merge).alignment = {
          vertical: "middle",
          horizontal: "center",
       };

      worksheet.mergeCells(approv);
        worksheet.getCell(approv).value = "Approved By";
        worksheet.getCell(approv).font = {
          size: 16,
          bold: true,
        };
        worksheet.getCell(approv).alignment = {
          vertical: "middle",
          horizontal: "center",
      };
     
       
      
      

  } 

      return workbook.xlsx.write(response).then(function () {
          response["status"](200).end();
      });
  }

    async downloadIDExcel(unitslno:any,id, response: Response) {

      let materialInspection = await this.materialinspectionRepository.find({
        relations: ["rawmaterialinspection001wbs", "rawmaterialinspection001wbs.itemcode2",
          "rawmaterialinspection001wbs.cucode2","rawmaterialinspection001wbs.cptcode2","rawmaterialinspection001wbs.prtcode2","rawmaterialinspection001wbs.observationsitems001wbs"],
        where: { slNo: id,unitslno:unitslno },
    })

    let observation = await this.observationsitemsRepository.find();

    let ordeitem = await this.orderItemsRepository.find();

    let consumableitem = await this.consumbleRepository.find();

    let childpart = await this.childPartRepository.find();

    let part = await this.PartRepository.find();

    let rawmaterialinspection = await this.rawmaterialinspectionRepository.find({
      relations: ["observationsitems001wbs"]
    });

    let materialInward = await this.MaterialinwardRepository.find();

    for (let i = 0; i < materialInspection.length; i++) {

      rawmaterialinspection = materialInspection[i].rawmaterialinspection001wbs;

      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet("Material-Inspection-Reports" + i + 1); // creating worksheet
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
      worksheet.getRow(15).height = 25;
      worksheet.getRow(16).height = 25;
      worksheet.getRow(17).height = 25;
      worksheet.getRow(18).height = 25;
      worksheet.getRow(19).height = 25;
      worksheet.getRow(20).height = 25;
      worksheet.columns = [
        { key: "A", width: 25.0 },
        { key: "B", width: 25.0 },
        { key: "C", width: 25.0 },
        { key: "D", width: 25.0 },
        { key: "E", width: 25.0 },
        { key: "F", width: 25.0 },
        { key: "G", width: 25.0 },
        { key: "H", width: 25.0 },
        { key: "I", width: 25.0 },
        { key: "J", width: 25.0 },
        { key: "K", width: 25.0 },
        { key: "L", width: 25.0 },
        { key: "M", width: 25.0 },
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

    worksheet.mergeCells("A1:L2");
    worksheet.getCell("A1:L2").value = "SRINIVASA ENTERPRISES";
    worksheet.getCell("A1:L2").font = {
      size: 18,
      bold: true,
    };
    worksheet.getCell("A1:L2").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("A3:L4");
    worksheet.getCell("A3:L4").value = "INCOMING INSPECTION REPORT";
    worksheet.getCell("A3:L4").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("A3:L4").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("M1:O1");
    worksheet.getCell("M1:O1").value = "Format No:";
    worksheet.getCell("M1:O1").font = {
      size: 12,
      bold: true,
    };
    worksheet.getCell("M1:O1").alignment = {
      vertical: "middle",
      horizontal: "left",
    };

    worksheet.mergeCells("M2:O2");
    worksheet.getCell("M2:O2").value = "Issue Date:";
    worksheet.getCell("M2:O2").font = {
      size: 12,
      bold: true,
    };
    worksheet.getCell("M2:O2").alignment = {
      vertical: "middle",
      horizontal: "left",
    };

    worksheet.mergeCells("M3:O3");
    worksheet.getCell("M3:O3").value = "Rev No:";
    worksheet.getCell("M3:O3").font = {
      size: 12,
      bold: true,
    };
    worksheet.getCell("M3:O3").alignment = {
      vertical: "middle",
      horizontal: "left",
    };

    worksheet.mergeCells("M4:O4");
    worksheet.getCell("M4:O4").value = "Rev Date:";
    worksheet.getCell("M4:O4").font = {
      size: 12,
      bold: true,
    };
    worksheet.getCell("M4:O4").alignment = {
      vertical: "middle",
      horizontal: "left",
    };

    worksheet.mergeCells("A5:D6");
    worksheet.getCell("A5:D6").value = {
      richText: [
        { text: "Incoming Inspection Report NO:" + "\n\n" },
        { font: { size: 11 }, text: "\n\n" + materialInspection[i].iirno },
      ],
    };
    worksheet.getCell("A5:D6").font = {
      size: 14,
      bold: true,
    };
    worksheet.getCell("A5:D6").alignment = {
      vertical: "middle",
      horizontal: "left",
    };

    worksheet.mergeCells("E5:H6");
    worksheet.getCell("E5:H6").value = {
      richText: [
        { text: "Supplier/Customer Name:" + "\n\n" },
        { font: { size: 11 }, text: "\n\n" + materialInspection[i].scname },
      ],
    };
    worksheet.getCell("E5:H6").font = {
      size: 14,
      bold: true,
    };
    worksheet.getCell("E5:H6").alignment = {
      vertical: "middle",
      horizontal: "left",
    };

    worksheet.mergeCells("I5:L6");
    worksheet.getCell("I5:L6").value = {
      richText: [
        { text: "DC or Inv.No:" + "\n\n" },
        { font: { size: 11 }, text: "\n\n" + materialInspection[i].dcno },
      ],
    };
    worksheet.getCell("I5:L6").font = {
      size: 14,
      bold: true,
    };
    worksheet.getCell("I5:L6").alignment = {
      vertical: "middle",
      horizontal: "left",
    };

    worksheet.mergeCells("M5:O6");
    worksheet.getCell("M5:O6").value = {
      richText: [
        { text: "DC or Inv.Date:" + "\n\n" },
        { font: { size: 11 }, text: "\n\n" + materialInspection[i].pdate },
      ],
    };
    worksheet.getCell("M5:O6").font = {
      size: 14,
      bold: true,
    };
    worksheet.getCell("M5:O6").alignment = {
      vertical: "middle",
      horizontal: "left",
    };

    worksheet.mergeCells("A7:D8");
    worksheet.getCell("A7:D8").value = {
      richText: [
        { text: "Goods Recived No:" + "\n\n" },
        { font: { size: 11 }, text: "\n\n" + materialInspection[i].grnumber ? materialInward.find(x => x.slNo === materialInspection[i].grnumber)?.grn : ""},
      ],
    };
    worksheet.getCell("A7:D8").font = {
      size: 14,
      bold: true,
    };
    worksheet.getCell("A7:D8").alignment = {
      vertical: "middle",
      horizontal: "left",
    };

    worksheet.mergeCells("E7:H8");
    worksheet.getCell("E7:H8").value = {
      richText: [
        { text: "Customer PO Number:" + "\n\n" },
        { font: { size: 11 }, text: "\n\n" + materialInspection[i].cponumber },
      ],
    };
    worksheet.getCell("E7:H8").font = {
      size: 14,
      bold: true,
    };
    worksheet.getCell("E7:H8").alignment = {
      vertical: "middle",
      horizontal: "left",
    };

    worksheet.mergeCells("I7:L8");
    worksheet.getCell("I7:L8").value = {
      richText: [
        { text: "Self PO Number:" + "\n\n" },
        { font: { size: 11 }, text: "\n\n" + materialInspection[i].sponumber },
      ],
    };
    worksheet.getCell("I7:L8").font = {
      size: 14,
      bold: true,
    };
    worksheet.getCell("I7:L8").alignment = {
      vertical: "middle",
      horizontal: "left",
    };

    worksheet.mergeCells("M7:O8");
    worksheet.getCell("M7:O8").value = {
      richText: [
        { text: "Other Reference Number:" + "\n\n" },
        { font: { size: 11 }, text: "\n\n" + materialInspection[i].refno },
      ],
    };
    worksheet.getCell("M7:O8").font = {
      size: 14,
      bold: true,
    };
    worksheet.getCell("M7:O8").alignment = {
      vertical: "middle",
      horizontal: "left",
    };

    worksheet.mergeCells("A9:A10");
    worksheet.getCell("A9:A10").value = "Category-Name";
    worksheet.getCell("A9:A10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("A9:A10").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("B9:B10");
    worksheet.getCell("B9:B10").value = "Parameter";
    worksheet.getCell("B9:B10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("B9:B10").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("C9:C10");
    worksheet.getCell("C9:C10").value = "Specification";
    worksheet.getCell("C9:C10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("C9:C10").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("D9:D10");
    worksheet.getCell("D9:D10").value = "Method of Inspection";
    worksheet.getCell("D9:D10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("D9:D10").alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    worksheet.mergeCells("E9:N9");
    worksheet.getCell("E9:N9").value = "Observation:";
    worksheet.getCell("E9:N9").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("E9:N9").alignment = {
      vertical: "middle",
      horizontal: "center",
      wraptext: true,
    };

    worksheet.mergeCells("O9:O10");
    worksheet.getCell("O9:O10").value = "Remarks:";
    worksheet.getCell("O9:O10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("O9:O10").alignment = {
      vertical: "middle",
      horizontal: "center",
      wraptext: true,
    };

    worksheet.mergeCells("E10");
    worksheet.getCell("E10").value = "1";
    worksheet.getCell("E10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("E10").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("F10");
    worksheet.getCell("F10").value = "2";
    worksheet.getCell("F10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("F10").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("G10");
    worksheet.getCell("G10").value = "3";
    worksheet.getCell("G10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("G10").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("H10");
    worksheet.getCell("H10").value = "4";
    worksheet.getCell("H10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("H10").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("I10");
    worksheet.getCell("I10").value = "5";
    worksheet.getCell("I10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("I10").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("J10");
    worksheet.getCell("J10").value = "6";
    worksheet.getCell("J10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("J10").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("K10");
    worksheet.getCell("K10").value = "7";
    worksheet.getCell("K10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("K10").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("L10");
    worksheet.getCell("L10").value = "8";
    worksheet.getCell("L10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("L10").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("M10");
    worksheet.getCell("M10").value = "9";
    worksheet.getCell("M10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("M10").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.mergeCells("N10");
    worksheet.getCell("N10").value = "10";
    worksheet.getCell("N10").font = {
      size: 16,
      bold: true,
    };
    worksheet.getCell("N10").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    
    let observationarray = [];
      for (let k = 0; k < rawmaterialinspection.length; k++) {
        for (let j = 0; j < observation.length; j++) {
              if (rawmaterialinspection[k].slNo == observation[j].observationslno) {
                observationarray.push(observation[j])
            }
        }
      }

      for(let x = 0; x < observationarray.length;x++){

         if(observationarray[x].ordernumber){
          let temp = x + 11;
           worksheet.mergeCells("A" + temp);
           worksheet.getCell("A" + temp).value = observationarray[x].ordernumber;
           worksheet.getCell("A" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("A" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
 
           worksheet.mergeCells("B" + temp);
           worksheet.getCell("B" + temp).value = observationarray[x].orderparameter;
           worksheet.getCell("B" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("B" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
 
           worksheet.mergeCells("C" + temp);
           worksheet.getCell("C" + temp).value = observationarray[x].orderspecification;
           worksheet.getCell("C" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("C" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
 
           worksheet.mergeCells("D" + temp);
           worksheet.getCell("D" + temp).value = observationarray[x].orderinspection;
           worksheet.getCell("D" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("D" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
 
           worksheet.mergeCells("E" + temp);
           worksheet.getCell("E" + temp).value = observationarray[x].orderobservartion;
           worksheet.getCell("E" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("E" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
 
           worksheet.mergeCells("F" + temp);
           worksheet.getCell("F" + temp).value = observationarray[x].orderobservartion1;
           worksheet.getCell("F" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("F" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
 
           worksheet.mergeCells("G" + temp);
           worksheet.getCell("G" + temp).value = observationarray[x].orderobservartion2;
           worksheet.getCell("G" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("G" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
 
           worksheet.mergeCells("H" + temp);
           worksheet.getCell("H" + temp).value = observationarray[x].orderobservartion3;
           worksheet.getCell("H" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("H" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
 
           worksheet.mergeCells("I" + temp);
           worksheet.getCell("I" + temp).value = observationarray[x].orderobservartion4;
           worksheet.getCell("I" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("I" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
 
           worksheet.mergeCells("J" + temp);
           worksheet.getCell("J" + temp).value = observationarray[x].orderobservartion5;
           worksheet.getCell("J" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("J" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
 
           worksheet.mergeCells("K" + temp);
           worksheet.getCell("K" + temp).value = observationarray[x].orderobservartion6;
           worksheet.getCell("K" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("K" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
 
           worksheet.mergeCells("L" + temp);
           worksheet.getCell("L" + temp).value = observationarray[x].orderobservartion7;
           worksheet.getCell("L" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("L" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
 
           worksheet.mergeCells("M" + temp);
           worksheet.getCell("M" + temp).value = observationarray[x].orderobservartion8;
           worksheet.getCell("M" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("M" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
 
           worksheet.mergeCells("N" + temp);
           worksheet.getCell("N" + temp).value = observationarray[x].orderobservartion9;
           worksheet.getCell("N" + temp).font = {
             size: 16,
             bold: true,
           };
           worksheet.getCell("N" + temp).alignment = {
             vertical: "middle",
             horizontal: "center",
           };
         }
         
        else if(observationarray[x].consumnumber) {
          let temp = x + 11;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value = observationarray[x].consumnumber;
          worksheet.getCell("A" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("A" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("B" + temp);
          worksheet.getCell("B" + temp).value = observationarray[x].consumparameter;
          worksheet.getCell("B" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("B" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("C" + temp);
          worksheet.getCell("C" + temp).value = observationarray[x].consumspecification;
          worksheet.getCell("C" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("C" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("D" + temp);
          worksheet.getCell("D" + temp).value = observationarray[x].consuminspection;
          worksheet.getCell("D" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("D" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("E" + temp);
          worksheet.getCell("E" + temp).value =observationarray[x].consumobservartion;
          worksheet.getCell("E" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("E" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("F" + temp);
          worksheet.getCell("F" + temp).value = observationarray[x].consumobservartion1;
          worksheet.getCell("F" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("F" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("G" + temp);
          worksheet.getCell("G" + temp).value = observationarray[x].consumobservartion2;
          worksheet.getCell("G" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("G" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("H" + temp);
          worksheet.getCell("H" + temp).value = observationarray[x].consumobservartion3;
          worksheet.getCell("H" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("H" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("I" + temp);
          worksheet.getCell("I" + temp).value = observationarray[x].consumobservartion4;
          worksheet.getCell("I" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("I" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("J" + temp);
          worksheet.getCell("J" + temp).value = observationarray[x].consumobservartion5;
          worksheet.getCell("J" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("J" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("K" + temp);
          worksheet.getCell("K" + temp).value = observationarray[x].consumobservartion6;
          worksheet.getCell("K" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("K" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("L" + temp);
          worksheet.getCell("L" + temp).value = observationarray[x].consumobservartion7;
          worksheet.getCell("L" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("L" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("M" + temp);
          worksheet.getCell("M" + temp).value = observationarray[x].consumobservartion8;
          worksheet.getCell("M" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("M" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("N" + temp);
          worksheet.getCell("N" + temp).value = observationarray[x].consumobservartion9;
          worksheet.getCell("N" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("N" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };
        }
        else if(observationarray[x].childnumber) {
          let temp = x + 11;

          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value = observationarray[x].childnumber;
          worksheet.getCell("A" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("A" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("B" + temp);
          worksheet.getCell("B" + temp).value = observationarray[x].childparameter;
          worksheet.getCell("B" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("B" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("C" + temp);
          worksheet.getCell("C" + temp).value = observationarray[x].childspecification;
          worksheet.getCell("C" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("C" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("D" + temp);
          worksheet.getCell("D" + temp).value = observationarray[x].childinspection;
          worksheet.getCell("D" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("D" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("E" + temp);
          worksheet.getCell("E" + temp).value = observationarray[x].childobservartion;
          worksheet.getCell("E" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("E" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("F" + temp);
          worksheet.getCell("F" + temp).value = observationarray[x].childobservartion1;
          worksheet.getCell("F" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("F" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("G" + temp);
          worksheet.getCell("G" + temp).value = observationarray[x].childobservartion2;
          worksheet.getCell("G" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("G" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("H" + temp);
          worksheet.getCell("H" + temp).value = observationarray[x].childobservartion3;
          worksheet.getCell("H" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("H" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("I" + temp);
          worksheet.getCell("I" + temp).value = observationarray[x].childobservartion4;
          worksheet.getCell("I" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("I" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("J" + temp);
          worksheet.getCell("J" + temp).value = observationarray[x].childobservartion5;
          worksheet.getCell("J" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("J" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("K" + temp);
          worksheet.getCell("K" + temp).value = observationarray[x].childobservartion6;
          worksheet.getCell("K" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("K" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("L" + temp);
          worksheet.getCell("L" + temp).value = observationarray[x].childobservartion7;
          worksheet.getCell("L" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("L" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("M" + temp);
          worksheet.getCell("M" + temp).value = observationarray[x].childobservartion8;
          worksheet.getCell("M" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("M" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("N" + temp);
          worksheet.getCell("N" + temp).value = observationarray[x].childobservartion9;
          worksheet.getCell("N" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("N" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };
        }
        else if(observationarray[x].partnumber) {
          let temp = x + 11;
          worksheet.mergeCells("A" + temp);
          worksheet.getCell("A" + temp).value = observationarray[x].partnumber;
          worksheet.getCell("A" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("A" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("B" + temp);
          worksheet.getCell("B" + temp).value = observationarray[x].partparameter;
          worksheet.getCell("B" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("B" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("C" + temp);
          worksheet.getCell("C" + temp).value = observationarray[x].partspecification;
          worksheet.getCell("C" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("C" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("D" + temp);
          worksheet.getCell("D" + temp).value = observationarray[x].partinspection;
          worksheet.getCell("D" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("D" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("E" + temp);
          worksheet.getCell("E" + temp).value = observationarray[x].partobservartion;
          worksheet.getCell("E" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("E" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("F" + temp);
          worksheet.getCell("F" + temp).value = observationarray[x].partobservartion1;
          worksheet.getCell("F" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("F" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("G" + temp);
          worksheet.getCell("G" + temp).value = observationarray[x].partobservartion2;
          worksheet.getCell("G" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("G" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("H" + temp);
          worksheet.getCell("H" + temp).value = observationarray[x].partobservartion3;
          worksheet.getCell("H" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("H" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("I" + temp);
          worksheet.getCell("I" + temp).value = observationarray[x].partobservartion4;
          worksheet.getCell("I" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("I" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("J" + temp);
          worksheet.getCell("J" + temp).value = observationarray[x].partobservartion5;
          worksheet.getCell("J" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("J" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("K" + temp);
          worksheet.getCell("K" + temp).value = observationarray[x].partobservartion6;
          worksheet.getCell("K" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("K" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("L" + temp);
          worksheet.getCell("L" + temp).value = observationarray[x].partobservartion7;
          worksheet.getCell("L" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("L" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("M" + temp);
          worksheet.getCell("M" + temp).value = observationarray[x].partobservartion8;
          worksheet.getCell("M" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("M" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          worksheet.mergeCells("N" + temp);
          worksheet.getCell("N" + temp).value = observationarray[x].partobservartion9;
          worksheet.getCell("N" + temp).font = {
            size: 16,
            bold: true,
          };
          worksheet.getCell("N" + temp).alignment = {
            vertical: "middle",
            horizontal: "center",
          };
        }
       
   
      }

      let temp2 = observationarray.length + 11;

      worksheet.getRow(temp2).height = 100;

      let temps = "A" + temp2 + ":" + "C" + temp2;

      let approv = "M" + temp2 + ":" + "O" + temp2;

      let merge = "D" + temp2 + ":" + "L" + temp2;

      worksheet.mergeCells(temps);
        worksheet.getCell(temps).value = "Inspected By";
        worksheet.getCell(temps).font = {
          size: 16,
          bold: true,
        };
        worksheet.getCell(temps).alignment = {
          vertical: "middle",
          horizontal: "center",
       };


       worksheet.mergeCells(merge);
        worksheet.getCell(merge).value = "";
        worksheet.getCell(merge).font = {
          size: 16,
          bold: true,
        };
        worksheet.getCell(merge).alignment = {
          vertical: "middle",
          horizontal: "center",
       };

      worksheet.mergeCells(approv);
        worksheet.getCell(approv).value = "Approved By";
        worksheet.getCell(approv).font = {
          size: 16,
          bold: true,
        };
        worksheet.getCell(approv).alignment = {
          vertical: "middle",
          horizontal: "center",
      };

    
    
        

        return workbook.xlsx.write(response).then(function () {
            response["status"](200).end();
        });

      }
    }
}