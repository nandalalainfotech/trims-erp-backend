import { Custemerregistration001mb } from "src/entity/Custemerregistration001mb";
import { Customercontact001wb } from "src/entity/customercontact001wb";

export class CustemerRegistrationDTO {
    slNo: number;
    unitslno: number;
    custemername: string;
    custemercode: string;
    // consignee: string;
    address: string;
    // contact: string;
    gstin: string;
    certification: string;
    // nature: string;
    productDesc: string;
    reputedCust: string;
    concern: string;
    otherInfo: string;
    website: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    customercontact001wbs?: Customercontact001wb[] = [];
    
    setProperties(custemerregistration001mb:  Custemerregistration001mb) {
        this.slNo = custemerregistration001mb.slNo;
        this.unitslno = custemerregistration001mb.unitslno;
        this.custemername = custemerregistration001mb.custemername;
        // this.consignee = custemerregistration001mb.consignee;
        this.custemercode = custemerregistration001mb.custemercode
        this.address = custemerregistration001mb.address;
        // this.contact = custemerregistration001mb.contact;
        this.gstin = custemerregistration001mb.gstin;
        this.certification = custemerregistration001mb.certification;
        // this.nature = custemerregistration001mb.nature;
        this.productDesc = custemerregistration001mb.productDesc;
        this.reputedCust = custemerregistration001mb.reputedCust;
        this.concern = custemerregistration001mb.concern;
        this.otherInfo = custemerregistration001mb.otherInfo;
        this.website = custemerregistration001mb.website;
        this.insertUser = custemerregistration001mb.insertUser;
        this.insertDatetime = custemerregistration001mb.insertDatetime;
        this.updatedUser = custemerregistration001mb.updatedUser;
        this.updatedDatetime = custemerregistration001mb.updatedDatetime;
    }
}