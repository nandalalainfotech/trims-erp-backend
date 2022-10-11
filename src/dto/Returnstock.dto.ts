import { Returnstock001wb } from "src/entity/Returnstock001wb";

export class ReturnstockDTO {
    slNo: number;
    unitslno: number;
    date?: Date | null;
    time?:string;
    paidamount?: number;
    dispatch?: string;
    vichleno?: string;
    personname?: string;
    mobilenumber?: string;
    status?: string;
    referenceid?: string;
    ordernumber?: number;
    rejectitems?: number;

    cudate?: Date;
    cutime?:string;
    cupaidamount?: number;
    cudispatch?: string;
    cuvichleno?: string;
    cupersonname?: string;
    cumobilenumber?: string;
    custatus?: string;
    cureferenceid?: string;
    cuordernumber?:number;
    curejectitems?: number;

    cptdate?: Date;
    cpttime?: string;
    cptpaidamount?: number;
    cptdispatch?: string;
    cptvichleno?: string;
    cptpersonname?: string;
    cptmobilenumber?: string;
    cptstatus?: string
    cptreferenceid?: string;
    childpartnumber?:number;
    cptrejectitems?: number;

    prtdate?: Date;
    prttime?:string;
    prtpaidamount?: number;
    prtdispatch?: string;
    prtvichleno?: string;
    prtpersonname?: string;
    prtmobilenumber?: string;
    prtstatus?: string;
    prtreferenceid?: string;
    partnumber?: number;
    prtrejectitems?: number;

    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;



    setProperties(returnstock001wb: Returnstock001wb) {
        this.slNo = returnstock001wb.slNo;
        this.unitslno = returnstock001wb.unitslno;
        this.date = returnstock001wb.date;
        this.time = returnstock001wb.time;
        this.paidamount = returnstock001wb.paidamount;
        this.dispatch = returnstock001wb.dispatch;
        this.vichleno = returnstock001wb.vichleno;
        this.personname = returnstock001wb.personname;
        this.mobilenumber = returnstock001wb.mobilenumber;
        this.status = returnstock001wb.status;
        this.referenceid = returnstock001wb.referenceid;
        this.ordernumber = returnstock001wb.ordernumber;
        this.rejectitems = returnstock001wb.rejectitems;

        this.cudate = returnstock001wb.cudate;
        this.cutime = returnstock001wb.cutime;
        this.cupaidamount = returnstock001wb.cupaidamount;
        this.cudispatch = returnstock001wb.cudispatch;
        this.cuvichleno = returnstock001wb.cuvichleno;
        this.cupersonname = returnstock001wb.cupersonname;
        this.cumobilenumber = returnstock001wb.cumobilenumber;
        this.custatus = returnstock001wb.custatus;
        this.cureferenceid = returnstock001wb.cureferenceid;
        this.cuordernumber = returnstock001wb.cuordernumber;
        this.curejectitems = returnstock001wb.curejectitems;

        this.cptdate = returnstock001wb.cptdate;
        this.cpttime = returnstock001wb.cpttime;
        this.cptpaidamount = returnstock001wb.cptpaidamount;
        this.cptdispatch = returnstock001wb.cptdispatch;
        this.cptvichleno = returnstock001wb.cptvichleno;
        this.cptpersonname = returnstock001wb.cptpersonname;
        this.cptmobilenumber = returnstock001wb.cptmobilenumber;
        this.cptstatus = returnstock001wb.cptstatus;
        this.cptreferenceid = returnstock001wb.cptreferenceid;
        this.childpartnumber = returnstock001wb.childpartnumber;
        this.cptrejectitems = returnstock001wb.cptrejectitems;

        this.prtdate = returnstock001wb.prtdate;
        this.prttime = returnstock001wb.prttime;
        this.prtpaidamount = returnstock001wb.prtpaidamount;
        this.prtdispatch = returnstock001wb.prtdispatch;
        this.prtvichleno = returnstock001wb.prtvichleno;
        this.prtpersonname = returnstock001wb.prtpersonname;
        this.prtmobilenumber = returnstock001wb.prtmobilenumber;
        this.prtstatus = returnstock001wb.prtstatus;
        this.prtreferenceid = returnstock001wb.prtreferenceid;
        this.partnumber = returnstock001wb.partnumber;
        this.prtrejectitems = returnstock001wb.prtrejectitems;

        this.insertUser = returnstock001wb.insertUser;
        this.insertDatetime = returnstock001wb.insertDatetime;
        this.updatedUser = returnstock001wb.updatedUser;
        this.updatedDatetime = returnstock001wb.updatedDatetime;


    }
}