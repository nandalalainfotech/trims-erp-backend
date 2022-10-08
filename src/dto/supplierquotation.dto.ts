import { Purchaseorder001wb } from "src/entity/Purchaseorder001wb";
import { Purchasereqslip001wb } from "src/entity/Purchasereqslip001wb";
import { Supplierquotation001wb } from "src/entity/Supplierquotation001wb";
import { Supplierquotationitems001wb } from "src/entity/Supplierquotationitems001wb";
import { Supplierregistration001mb } from "src/entity/Supplierregistration001mb";

export class SupplierQuotationDTO {
  slNo: number;
  unitslno: number;
  supplierSlno: number;
  supliername: string;
  supliertype: string;
  address: string;
  quotationNo: string;
  itemname: string;
  quotationDate: Date;
  validity: Date;
  personName: number;
  desgnation: string;
  mnumber: string;
  mobile: string;
  mailid: string;
  tAmount: number | null;
  tWords: string;
  prsno: number;
  department: string;
  level: string;
  termsCondition: string;
  filename: string = "";
  filepath: string;
  originalfilename: string;
  status: string;
  remarks: string;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;
  supplierquotationitems001wbs:Supplierquotationitems001wb[];
  supplierSlno2: Supplierregistration001mb;
  prsno2: Purchasereqslip001wb;

  setProperties(supplierquotation001wb: Supplierquotation001wb) {
    this.supplierquotationitems001wbs = [];
    this.slNo = supplierquotation001wb.slNo;
    this.unitslno = supplierquotation001wb.unitslno;
    this.supplierSlno = supplierquotation001wb.supplierSlno;
    this.supliername = supplierquotation001wb.supliername;
    this.supliertype = supplierquotation001wb.supliertype;
    this.quotationNo = supplierquotation001wb.quotationNo;
    this.address = supplierquotation001wb.address;
    this.quotationDate = new Date(supplierquotation001wb.quotationDate);
    this.validity = new Date(supplierquotation001wb.validity);
    this.personName = supplierquotation001wb.personName;
    this.desgnation = supplierquotation001wb.desgnation;
    this.mnumber = supplierquotation001wb.mnumber;
    this.mobile = supplierquotation001wb.mobile;
    this.level = supplierquotation001wb.level;
    this.department = supplierquotation001wb.department;
    this.tAmount = supplierquotation001wb.tAmount;
    this.tWords = supplierquotation001wb.tWords;
    this.mailid = supplierquotation001wb.mailid;
    this.prsno = supplierquotation001wb.prsno;
    this.termsCondition = supplierquotation001wb.termsCondition;
    this.filename = supplierquotation001wb.filename;
    this.filepath = supplierquotation001wb.filepath;
    this.originalfilename = supplierquotation001wb.originalfilename;
    this.insertUser = supplierquotation001wb.insertUser;
    this.insertDatetime = supplierquotation001wb.insertDatetime;
    this.updatedUser = supplierquotation001wb.updatedUser;
    this.updatedDatetime = supplierquotation001wb.updatedDatetime;
    this.status = supplierquotation001wb.status;
    this.remarks = supplierquotation001wb.remarks;
  }

}