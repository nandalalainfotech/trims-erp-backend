import { Statutory001wb } from "src/entity/Statutory001wb";


export class StatutoryPlanDTO {

    slNo: number;
    unitslno: number;
    bslno: number;
    ecode: string = "";
    ename: string = "";
    esno: string = "";
    escheckbox:string = "";
    inscheckbox:string = "";
    pfcheckbox:string = "";
    medicheckbox:string = "";
    bankcheckbox:string = "";
    acholdername:string = "";
    accno:string = "";
    ifsccode:string = "";
    pfno: string = "";
    insurno: string = "";
    mediclno: string = "";
    escheme:string = "";
    pscheme: string = "";
    inscheme: string = "";
    mscheme: string = "";
    esstartdate: Date;
    esenddate: Date;
    pfstartdate: Date;
    pfenddate: Date;
    instartdate: Date;
    insenddate: Date;
    mstartdate: Date;
    menddate: Date;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
  
    setProperties(statutory001wb: Statutory001wb) {
        this.slNo = statutory001wb.slNo;
        this.unitslno = statutory001wb.unitslno;
        this.bslno = statutory001wb.bslno;
        this.ecode = statutory001wb.ecode;
        this.ename = statutory001wb.ename;
        this.escheckbox = statutory001wb.escheckbox;
        this.inscheckbox = statutory001wb.inscheckbox;
        this.pfcheckbox = statutory001wb.pfcheckbox;
        this.esno = statutory001wb.esno;
        this.pfno = statutory001wb.pfno;
        this.insurno = statutory001wb.insurno;
        this.mediclno = statutory001wb.mediclno;
        this.escheme = statutory001wb.escheme;
        this.pscheme = statutory001wb.pscheme;
        this.inscheme = statutory001wb.inscheme;
        this.mscheme = statutory001wb.mscheme;
        this.esstartdate =statutory001wb.esstartdate;
        this.esenddate = statutory001wb.esenddate
        this.pfstartdate = statutory001wb.pfstartdate
        this.pfenddate = statutory001wb.pfenddate
        this.instartdate =statutory001wb.instartdate;
        this.insenddate =statutory001wb.insenddate;
        this.medicheckbox = statutory001wb.medicheckbox;
        this.mstartdate =statutory001wb.mstartdate;
        this.menddate =statutory001wb.menddate;
        this.bankcheckbox = statutory001wb.bankcheckbox;
        this.acholdername = statutory001wb.acholdername;
        this.accno = statutory001wb.accno;
        this.ifsccode = statutory001wb.ifsccode;
        this.insertUser = statutory001wb.insertUser;
        this.insertDatetime = statutory001wb.insertDatetime;
        this.updatedUser = statutory001wb.updatedUser;
        this.updatedDatetime = statutory001wb.updatedDatetime;
      }
  }