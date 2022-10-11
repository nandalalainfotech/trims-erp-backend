import { ReturnstockDTO } from "src/dto/Returnstock.dto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("returnstock001wb", { schema: "trims" })
export class Returnstock001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column( { type:"date" ,name: "date", nullable: true })
  date: Date | null;

  @Column("varchar", { name: "time", nullable: true, length: 50 })
  time: string | null;

  @Column("int", { name: "paidamount", nullable: true })
  paidamount: number | null;

  @Column("varchar", { name: "dispatch", nullable: true, length: 250 })
  dispatch: string | null;

  @Column("varchar", { name: "vichleno", nullable: true, length: 250 })
  vichleno: string | null;

  @Column("varchar", { name: "personname", nullable: true, length: 250 })
  personname: string | null;

  @Column("varchar", { name: "mobilenumber", nullable: true, length: 10 })
  mobilenumber: string | null;

  @Column("varchar", { name: "status", nullable: true, length: 250 })
  status: string | null;

  @Column("varchar", { name: "referenceid", nullable: true, length: 150 })
  referenceid: string | null;

  @Column("int", { name: "ordernumber", nullable: true })
  ordernumber: number | null;

  @Column("int", { name: "rejectitems", nullable: true })
  rejectitems: number | null;

  @Column( {type:"date", name: "cudate", nullable: true })
  cudate: Date | null;

  @Column("varchar", { name: "cutime", nullable: true, length: 50 })
  cutime: string | null;

  @Column("int", { name: "cupaidamount", nullable: true })
  cupaidamount: number | null;

  @Column("varchar", { name: "cudispatch", nullable: true, length: 250 })
  cudispatch: string | null;

  @Column("varchar", { name: "cuvichleno", nullable: true, length: 250 })
  cuvichleno: string | null;

  @Column("varchar", { name: "cupersonname", nullable: true, length: 250 })
  cupersonname: string | null;

  @Column("varchar", { name: "cumobilenumber", nullable: true, length: 10 })
  cumobilenumber: string | null;

  @Column("varchar", { name: "custatus", nullable: true, length: 250 })
  custatus: string | null;

  @Column("varchar", { name: "cureferenceid", nullable: true, length: 150 })
  cureferenceid: string | null;

  @Column("int", { name: "cuordernumber", nullable: true })
  cuordernumber: number | null;

  @Column("int", { name: "curejectitems", nullable: true })
  curejectitems: number | null;

  @Column( {type:"date", name: "cptdate", nullable: true })
  cptdate: Date | null;

  @Column("varchar", { name: "cpttime", nullable: true, length: 50 })
  cpttime: string | null;

  @Column("int", { name: "cptpaidamount", nullable: true })
  cptpaidamount: number | null;

  @Column("varchar", { name: "cptdispatch", nullable: true, length: 250 })
  cptdispatch: string | null;

  @Column("varchar", { name: "cptvichleno", nullable: true, length: 250 })
  cptvichleno: string | null;

  @Column("varchar", { name: "cptpersonname", nullable: true, length: 250 })
  cptpersonname: string | null;

  @Column("varchar", { name: "cptmobilenumber", nullable: true, length: 10 })
  cptmobilenumber: string | null;

  @Column("varchar", { name: "cptstatus", nullable: true, length: 250 })
  cptstatus: string | null;

  @Column("varchar", { name: "cptreferenceid", nullable: true, length: 150 })
  cptreferenceid: string | null;

  @Column("int", { name: "childpartnumber", nullable: true })
  childpartnumber: number | null;

  @Column("int", { name: "cptrejectitems", nullable: true })
  cptrejectitems: number | null;

  @Column( {type:"date", name: "prtdate", nullable: true })
  prtdate: Date | null;

  @Column("varchar", { name: "prttime", nullable: true, length: 50 })
  prttime: string | null;

  @Column("int", { name: "prtpaidamount", nullable: true })
  prtpaidamount: number | null;

  @Column("varchar", { name: "prtdispatch", nullable: true, length: 250 })
  prtdispatch: string | null;

  @Column("varchar", { name: "prtvichleno", nullable: true, length: 250 })
  prtvichleno: string | null;

  @Column("varchar", { name: "prtpersonname", nullable: true, length: 250 })
  prtpersonname: string | null;

  @Column("varchar", { name: "prtmobilenumber", nullable: true, length: 10 })
  prtmobilenumber: string | null;

  @Column("varchar", { name: "prtstatus", nullable: true, length: 250 })
  prtstatus: string | null;

  @Column("varchar", { name: "prtreferenceid", nullable: true, length: 150 })
  prtreferenceid: string | null;

  @Column("int", { name: "partnumber", nullable: true })
  partnumber: number | null;

  @Column("int", { name: "prtrejectitems", nullable: true })
  prtrejectitems: number | null;

  @Column("varchar", { name: "insert_user", nullable: true, length: 40 })
  insertUser: string | null;

  @Column("datetime", { name: "insert_datetime", nullable: true })
  insertDatetime: Date | null;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;





  setProperties(returnstockDTO: ReturnstockDTO) {
    this.slNo = returnstockDTO.slNo;
    this.unitslno = returnstockDTO.unitslno;
    this.date = new Date( returnstockDTO.date);
    this.time = returnstockDTO.time;
    this.paidamount = returnstockDTO.paidamount;
    this.dispatch = returnstockDTO.dispatch;
    this.vichleno = returnstockDTO.vichleno;
    this.personname = returnstockDTO.personname;
    this.mobilenumber = returnstockDTO.mobilenumber;
    this.status = returnstockDTO.status;
    this.referenceid = returnstockDTO.referenceid;
    this.ordernumber = returnstockDTO.ordernumber;
    this.rejectitems = returnstockDTO.rejectitems;
    
    this.cudate = new Date( returnstockDTO.cudate);
    this.cutime = returnstockDTO.cutime;
    this.cupaidamount = returnstockDTO.cupaidamount;
    this.cudispatch = returnstockDTO.cudispatch;
    this.cuvichleno = returnstockDTO.cuvichleno;
    this.cupersonname = returnstockDTO.cupersonname;
    this.cumobilenumber = returnstockDTO.cumobilenumber;
    this.custatus = returnstockDTO.custatus;
    this.cureferenceid = returnstockDTO.cureferenceid;
    this.cuordernumber = returnstockDTO.cuordernumber;
    this.curejectitems = returnstockDTO.curejectitems;
    
    this.cptdate = new Date( returnstockDTO.cptdate);
    this.cpttime = returnstockDTO.cpttime;
    this.cptpaidamount = returnstockDTO.cptpaidamount;
    this.cptdispatch = returnstockDTO.cptdispatch;
    this.cptvichleno = returnstockDTO.cptvichleno;
    this.cptpersonname = returnstockDTO.cptpersonname;
    this.cptmobilenumber = returnstockDTO.cptmobilenumber;
    this.cptstatus = returnstockDTO.cptstatus;
    this.cptreferenceid = returnstockDTO.cptreferenceid;
    this.childpartnumber = returnstockDTO.childpartnumber;
    this.cptrejectitems = returnstockDTO.cptrejectitems;

    this.prtdate = new Date( returnstockDTO.prtdate);
    this.prttime = returnstockDTO.prttime;
    this.prtpaidamount = returnstockDTO.prtpaidamount;
    this.prtdispatch = returnstockDTO.prtdispatch;
    this.prtvichleno = returnstockDTO.prtvichleno;
    this.prtpersonname = returnstockDTO.prtpersonname;
    this.prtmobilenumber = returnstockDTO.prtmobilenumber;
    this.prtstatus = returnstockDTO.prtstatus;
    this.prtreferenceid = returnstockDTO.prtreferenceid;
    this.partnumber = returnstockDTO.partnumber;
    this.prtrejectitems = returnstockDTO.prtrejectitems;

    this.insertUser = returnstockDTO.insertUser;
    this.insertDatetime = returnstockDTO.insertDatetime;
    this.updatedUser = returnstockDTO.updatedUser;
    this.updatedDatetime = returnstockDTO.updatedDatetime;


  }
}
