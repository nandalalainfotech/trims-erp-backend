import { Materiealrequestitem001wb } from "src/entity/Materiealrequestitem001wb";

export class MateriealrequestitemDTO {
    slNo: number;
    unitslno: number;
    itemcode: string;
    itemname: string;
    descrip: string;
    qunty: number;
    cucode: string;
    cuname: string;
    cudescrip: string;
    cuqunty: number;
    cptcode: string;
    cptname: string;
    cptdescrip: string;
    cptqunty: number;
    prtcode: string;
    prtname: string;
    prtdescrip: string;
    prtqunty: number;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(materiealrequestitem001wb:Materiealrequestitem001wb) {
        this.slNo = materiealrequestitem001wb.slNo;
        this.unitslno = materiealrequestitem001wb.unitslno;
        this.itemcode = materiealrequestitem001wb.itemcode
        this.itemname = materiealrequestitem001wb.itemname;
        this.descrip = materiealrequestitem001wb.descrip;
        this.qunty = materiealrequestitem001wb.qunty;
        
        this.cucode = materiealrequestitem001wb.cucode
        this.cuname = materiealrequestitem001wb.cuname;
        this.cudescrip = materiealrequestitem001wb.cudescrip;
        this.cuqunty = materiealrequestitem001wb.cuqunty;
    
        this.cptcode = materiealrequestitem001wb.cptcode
        this.cptname = materiealrequestitem001wb.cptname;
        this.cptdescrip = materiealrequestitem001wb.cptdescrip;
        this.cptqunty = materiealrequestitem001wb.cptqunty;
    
        this.prtcode = materiealrequestitem001wb.prtcode
        this.prtname = materiealrequestitem001wb.prtname;
        this.prtdescrip = materiealrequestitem001wb.prtdescrip;
        this.prtqunty = materiealrequestitem001wb.prtqunty;
    
        this.insertUser = materiealrequestitem001wb.insertUser;
        this.insertDatetime = materiealrequestitem001wb.insertDatetime;
        this.updatedUser = materiealrequestitem001wb.updatedUser;
        this.updatedDatetime = materiealrequestitem001wb.updatedDatetime;
    
    
      }
    
}