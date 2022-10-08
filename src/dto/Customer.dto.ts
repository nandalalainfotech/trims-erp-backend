import { Customer001mb } from "src/entity/Customer001mb";



export class CustomerDTO {
    slNo: number;
    unitslno: number;
    customerName: string;
    majorProduct: string;
    vendorCode: string;
    address: string;
    gstin: string;
    customerPhone: string;
    customerEmail: string;
    contactPersonName: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(customer001mb: Customer001mb) {
        this.slNo = customer001mb.slNo;
        this.unitslno = customer001mb.unitslno;
        this.customerName = customer001mb.customerName;
        this.majorProduct = customer001mb.majorProduct;
        this.vendorCode = customer001mb.vendorCode;
        this.address = customer001mb.address;
        this.gstin = customer001mb.gstin;
        this.customerPhone = customer001mb.customerPhone;
        this.customerEmail = customer001mb.customerEmail;
        this.insertUser = customer001mb.insertUser;
        this.insertDatetime = customer001mb.insertDatetime;
        this.updatedUser = customer001mb.updatedUser;
        this.updatedDatetime = customer001mb.updatedDatetime;
        this.contactPersonName = customer001mb.contactPersonName;
    }


}