import { Companydetails001mb } from "src/entity/Companydetails001mb";
import { Consignee001mb } from "src/entity/Consignee001mb";
import { Orderitem001wb } from "src/entity/Orderitem001wb";
import { Purchaseorder001wb } from "src/entity/Purchaseorder001wb";
import { Purchasereqslip001wb } from "src/entity/Purchasereqslip001wb";
import { Supplierquotation001wb } from "src/entity/Supplierquotation001wb";
import { CompanydetailsDTO } from "./Companydetails.dto";
import { ConsigneeDTO } from "./Consignee.dto";
import { OrderItemwbDTO } from "./orderitem-wb.dto";
import { PurchasereqslipDTO } from "./Purchasereqslip.dto";
import { SupplierQuotationDTO } from "./supplierquotation.dto";

export class PurchaseorderDTO {
  slNo: number;
  unitslno: number;
  suplierSlno: number;
  suplierName: string;
  suplieraddress:string;
  date: Date;
  prsno: number;
  pono: string;
  remarks: string | null;
  statusSlno: number | null;
  qno: string;
  dispatchThrough: string;
  destination: string;
  termsDelivery: string;
  supplierFrom: string;
  dueOn: Date;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;
  status: string;
  // purreqSlno2: Purchasereqslip001wb;
  // companySlno2: Companydetails001mb;
  // consigneeSlno2: Consignee001mb;
  // orderitemSlno2: Orderitem001wb;
  orderitemSlno2?: Orderitem001wb[];
  purreq: PurchasereqslipDTO[] = [];
  // details: CompanydetailsDTO;
  // consignee: ConsigneeDTO;
  tAmount: number | null;
  tWords: string;
  total: number;
  poNo: number;
  word: string;

  description: string;
  quantity: number;
  price: number;

  setProperties(purchaseorder001wb: Purchaseorder001wb) {
    this.slNo = purchaseorder001wb.slNo;
    this.unitslno = purchaseorder001wb.unitslno;
    this.suplierSlno = purchaseorder001wb.suplierSlno;
    this.suplierName = purchaseorder001wb.suplierName;
    this.suplieraddress = purchaseorder001wb.suplieraddress;
    this.date = new Date(purchaseorder001wb.date);
    this.prsno = purchaseorder001wb.prsno;
    this.pono = purchaseorder001wb.pono;
    this.remarks=purchaseorder001wb.remarks;
    this.tAmount = purchaseorder001wb.tAmount;
    this.tWords = purchaseorder001wb.tWords;
    this.statusSlno=purchaseorder001wb.statusSlno;
    this.qno = purchaseorder001wb.qno;
    this.dispatchThrough = purchaseorder001wb.dispatchThrough;
    this.destination = purchaseorder001wb.destination;
    this.termsDelivery = purchaseorder001wb.termsDelivery;
    this.supplierFrom = purchaseorder001wb.supplierFrom;
    this.dueOn = purchaseorder001wb.dueOn;
    this.insertUser = purchaseorder001wb.insertUser;
    this.insertDatetime = purchaseorder001wb.insertDatetime;
    this.updatedUser = purchaseorder001wb.updatedUser;
    this.updatedDatetime = purchaseorder001wb.updatedDatetime;
    this.status = purchaseorder001wb.status;
  }
}
