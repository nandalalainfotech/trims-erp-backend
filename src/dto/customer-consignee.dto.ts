import { Customerconsignee001mb } from "src/entity/Customerconsignee001mb";

export class CustomerConsigneeDTO {
    slNo: number;
    unitslno?: number;
    consigneeSlno: number;
    consignee: string;
    companyName: string;
    address1: string;
    address2: string;
    address3: string;
    gstIn: string;
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

    setProperties(customerconsignee001mb: Customerconsignee001mb) {
        this.slNo = customerconsignee001mb.slNo;
        this.unitslno = customerconsignee001mb.unitslno;
        this.consigneeSlno = customerconsignee001mb.consigneeSlno;
        this.companyName = customerconsignee001mb.companyName;
        this.consignee = customerconsignee001mb.consignee;
        this.address1 = customerconsignee001mb.address1;
        this.address2 = customerconsignee001mb.address2;
        this.address3 = customerconsignee001mb.address3;
        this.gstIn = customerconsignee001mb.gstIn;
        this.city = customerconsignee001mb.city;
        this.state = customerconsignee001mb.state;
        this.country = customerconsignee001mb.country;
        this.pinCode = customerconsignee001mb.pinCode;
        this.emailId = customerconsignee001mb.emailId;
        this.contactNo = customerconsignee001mb.contactNo;
        this.insertUser = customerconsignee001mb.insertUser;
        this.insertDatetime = customerconsignee001mb.insertDatetime;
        this.updatedUser = customerconsignee001mb.updatedUser;
        this.updatedDatetime = customerconsignee001mb.updatedDatetime;
    }
}