import { Emp001mb } from "src/entity/Emp001mb";

export class EmployeeDetailsDTO {
    slNo: number;
    unitslno: number;
    empcode: string | any;
    empname: string = "";
    des: string = "";
    age: number | any;
    doj: Date | any;
    dob: Date | any;
    fname: string = "";
    bgroup: string = "";
    female: string = "";
    married: string = "";
    child: string = "";
    dep: string = "";
    add1: string = "";
    add2: string = "";
    edu: string = "";
    exp: number | any;
    det: string = "";
    filename: string = "";
    filepath: string;
    originalfilename: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(emp001mb: Emp001mb) {
        this.slNo = emp001mb.slNo;
        this.unitslno = emp001mb.unitslno;
        this.empcode = emp001mb.empcode;
        this.empname = emp001mb.empname;
        this.des = emp001mb.des;
        this.age = emp001mb.age;
        this.doj = emp001mb.doj;
        this.dob = emp001mb.dob;
        this.fname = emp001mb.fname;
        this.bgroup = emp001mb.bgroup;
        this.female = emp001mb.female;
        this.married = emp001mb.married;
        this.child = emp001mb.child;
        this.dep = emp001mb.dep;
        this.add1 = emp001mb.add1;
        this.add2 = emp001mb.add2;
        this.edu = emp001mb.edu;
        this.exp = emp001mb.exp;
        this.det = emp001mb.det;
        this.filename = emp001mb.filename;
        this.filepath = emp001mb.filepath;
        this.originalfilename = emp001mb.originalfilename;
        this.insertUser = emp001mb.insertUser;
        this.insertDatetime = emp001mb.insertDatetime;
        this.updatedUser = emp001mb.updatedUser;
        this.updatedDatetime = emp001mb.updatedDatetime;
    }
}