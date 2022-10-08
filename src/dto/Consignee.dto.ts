import { Consignee001mb } from "src/entity/Consignee001mb";

export class ConsigneeDTO {
    slNo: number;
    unitslno: number;
    companySlno: number;
    consignee: string;
    address1: string;
    address2: string;
    address3: string;
    gstIn: number;
    city: string;
    state: string;
    country: string;
    pinCode: number;
    emailId: string;
    contactNo: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(consignee001mb: Consignee001mb) {
        this.slNo = consignee001mb.slNo;
        this.unitslno = consignee001mb.unitslno;
        this.companySlno = consignee001mb.companySlno;
        this.consignee = consignee001mb.consignee;
        this.address1 = consignee001mb.address1;
        this.address2 = consignee001mb.address2;
        this.address3 = consignee001mb.address3;
        this.gstIn = consignee001mb.gstIn;
        this.city = consignee001mb.city;
        this.state = consignee001mb.state;
        this.country = consignee001mb.country;
        this.pinCode = consignee001mb.pinCode;
        this.emailId = consignee001mb.emailId;
        this.contactNo = consignee001mb.contactNo;
        this.insertUser = consignee001mb.insertUser;
        this.insertDatetime = consignee001mb.insertDatetime;
        this.updatedUser = consignee001mb.updatedUser;
        this.updatedDatetime = consignee001mb.updatedDatetime;
    }
}