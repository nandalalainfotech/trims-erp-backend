import { Department001mb } from "src/entity/Department001mb";
import { Unitdeptmaster001mb } from "src/entity/Unitdeptmaster001mb";
import { Unitmaster001mb } from "src/entity/Unitmaster001mb";

export class UnitDepartMasterDTO {
    slNo: number;
    departslNo: number;
    unitslNo: number;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
    unitslNo2?: Unitmaster001mb;
    departslNo2?: Department001mb;
    
    setProperties(unitdeptmaster001mb: Unitdeptmaster001mb) {
        this.slNo = unitdeptmaster001mb.slNo;
        this.departslNo = unitdeptmaster001mb.departslNo;
        this.unitslNo = unitdeptmaster001mb.unitslNo;
        this.insertUser = unitdeptmaster001mb.insertUser;
        this.insertDatetime = unitdeptmaster001mb.insertDatetime;
        this.updatedUser = unitdeptmaster001mb.updatedUser;
        this.updatedDatetime = unitdeptmaster001mb.updatedDatetime;
    }
}