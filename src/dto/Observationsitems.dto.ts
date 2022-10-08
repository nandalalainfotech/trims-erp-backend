import { Observationsitems001wb } from "src/entity/Observationsitems001wb";

export class ObservationsitemsDTO {
    slNo?: number;
    unitslno: number;
    observationslno:number;
    ordernumber?: string;
    consumnumber?: string;
    partnumber?: string;
    childnumber?: string;
    orderparameter?: string;
    orderspecification?: string;
    orderinspection?: string;
    consumparameter?: string;
    consumspecification?: string;
    consuminspection?: string;
    childparameter?: string;
    childspecification?: string;
    childinspection?: string;
    partparameter?: string;
    partspecification?: string;
    partinspection?: string;

    partobservartion?: string;
    partobservartion1?: string;
    partobservartion2?: string;
    partobservartion3?: string;
    partobservartion4?: string;
    partobservartion5?: string;
    partobservartion6?: string;
    partobservartion7?: string;
    partobservartion8?: string;
    partobservartion9?: string;

    childobservartion?: string;
    childobservartion1?: string;
    childobservartion2?: string;
    childobservartion3?: string;
    childobservartion4?: string;
    childobservartion5?: string;
    childobservartion6?: string;
    childobservartion7?: string;
    childobservartion8?: string;
    childobservartion9?: string;

    consumobservartion?: string;
    consumobservartion1?: string;
    consumobservartion2?: string;
    consumobservartion3?: string;
    consumobservartion4?: string;
    consumobservartion5?: string;
    consumobservartion6?: string;
    consumobservartion7?: string;
    consumobservartion8?: string;
    consumobservartion9?: string;

    orderobservartion?: string;
    orderobservartion1?: string;
    orderobservartion2?: string;
    orderobservartion3?: string;
    orderobservartion4?: string;
    orderobservartion5?: string;
    orderobservartion6?: string;
    orderobservartion7?: string;
    orderobservartion8?: string;
    orderobservartion9?: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(observationsitems001wb: Observationsitems001wb) {
        this.slNo = observationsitems001wb.slNo;
        this.observationslno = observationsitems001wb.observationslno;
        this.ordernumber = observationsitems001wb.ordernumber;
        this.consumnumber = observationsitems001wb.consumnumber;
        this.partnumber = observationsitems001wb.partnumber;
        this.childnumber = observationsitems001wb.childnumber;
        this.unitslno = observationsitems001wb.unitslno;
        this.orderparameter = observationsitems001wb.orderparameter;
        this.orderspecification = observationsitems001wb.orderspecification;
        this.orderinspection = observationsitems001wb.orderinspection;
        this.consumparameter = observationsitems001wb.consumparameter;
        this.consumspecification = observationsitems001wb.consumspecification;
        this.consuminspection = observationsitems001wb.consuminspection;
        this.childparameter = observationsitems001wb.childparameter;
        this.childspecification = observationsitems001wb.childspecification;
        this.childinspection = observationsitems001wb.childinspection;
        
        this.partobservartion = observationsitems001wb.partobservartion;
        this.partobservartion1 = observationsitems001wb.partobservartion1;
        this.partobservartion2 = observationsitems001wb.partobservartion2;
        this.partobservartion3 = observationsitems001wb.partobservartion3;
        this.partobservartion4 = observationsitems001wb.partobservartion4;
        this.partobservartion5 = observationsitems001wb.partobservartion5;
        this.partobservartion6 = observationsitems001wb.partobservartion6;
        this.partobservartion7 = observationsitems001wb.partobservartion7;
        this.partobservartion8 = observationsitems001wb.partobservartion8;
        this.partobservartion9 = observationsitems001wb.partobservartion9;
    
        this.childobservartion = observationsitems001wb.childobservartion;
        this.childobservartion1 = observationsitems001wb.childobservartion1;
        this.childobservartion2 = observationsitems001wb.childobservartion2;
        this.childobservartion3 = observationsitems001wb.childobservartion3;
        this.childobservartion4 = observationsitems001wb.childobservartion4;
        this.childobservartion5 = observationsitems001wb.childobservartion5;
        this.childobservartion6 = observationsitems001wb.childobservartion6;
        this.childobservartion7 = observationsitems001wb.childobservartion7;
        this.childobservartion8 = observationsitems001wb.childobservartion8;
        this.childobservartion9 = observationsitems001wb.childobservartion9;
    
        this.consumobservartion = observationsitems001wb.consumobservartion;
        this.consumobservartion1 = observationsitems001wb.consumobservartion1;
        this.consumobservartion2 = observationsitems001wb.consumobservartion2;
        this.consumobservartion3 = observationsitems001wb.consumobservartion3;
        this.consumobservartion4 = observationsitems001wb.consumobservartion4;
        this.consumobservartion5 = observationsitems001wb.consumobservartion5;
        this.consumobservartion6 = observationsitems001wb.consumobservartion6;
        this.consumobservartion7 = observationsitems001wb.consumobservartion7;
        this.consumobservartion8 = observationsitems001wb.consumobservartion8;
        this.consumobservartion9 = observationsitems001wb.consumobservartion9;
    
        this.orderobservartion = observationsitems001wb.orderobservartion;
        this.orderobservartion1 = observationsitems001wb.orderobservartion1;
        this.orderobservartion2 = observationsitems001wb.orderobservartion2;
        this.orderobservartion3 = observationsitems001wb.orderobservartion3;
        this.orderobservartion4 = observationsitems001wb.orderobservartion4;
        this.orderobservartion5 = observationsitems001wb.orderobservartion5;
        this.orderobservartion6 = observationsitems001wb.orderobservartion6;
        this.orderobservartion7 = observationsitems001wb.orderobservartion7;
        this.orderobservartion8 = observationsitems001wb.orderobservartion8;
        this.orderobservartion9 = observationsitems001wb.orderobservartion9;
    
    
    
        this.insertUser = observationsitems001wb.insertUser;
        this.insertDatetime = observationsitems001wb.insertDatetime;
        this.updatedUser = observationsitems001wb.updatedUser;
        this.updatedDatetime = observationsitems001wb.updatedDatetime;
    
    
      }

}