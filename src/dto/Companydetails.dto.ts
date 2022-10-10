import { Companydetails001mb } from "src/entity/Companydetails001mb";

export class CompanydetailsDTO {
    slNo: number;
    unitslno: number;
    company: string;
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

    setProperties(companydetails001mb: Companydetails001mb) {
        this.slNo = companydetails001mb.slNo;
        this.unitslno = companydetails001mb.unitslno;
        this.company = companydetails001mb.company;
        this.address1 = companydetails001mb.address1;
        this.address2 = companydetails001mb.address2;
        this.address3 = companydetails001mb.address3;
        this.gstIn = companydetails001mb.gstIn;
        this.city = companydetails001mb.city;
        this.state = companydetails001mb.state;
        this.country = companydetails001mb.country;
        this.pinCode = companydetails001mb.pinCode;
        this.emailId = companydetails001mb.emailId;
        this.contactNo = companydetails001mb.contactNo;
        this.insertUser = companydetails001mb.insertUser;
        this.insertDatetime = companydetails001mb.insertDatetime;
        this.updatedUser = companydetails001mb.updatedUser;
        this.updatedDatetime = companydetails001mb.updatedDatetime;
    }
}