import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Machine001mb } from "./Machine001mb";
import { Checklist001mb } from "./Checklist001mb";
import { PreventiveChecklistDTO } from "src/dto/preventivechecklist.dto";

@Index("mslno", ["mslno"], {})
@Index("cpslno", ["cpslno"], {})
@Entity("preventivechecklist001wb", { schema: "trims" })
export class Preventivechecklist001wb {
    @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
    slNo: number;

    @Column("int", { name: "unitslno" })
    unitslno: number;

    @Column("int", { name: "mslno" })
    mslno: number;

    @Column("int", { name: "cpslno" })
    cpslno: number;

    @Column({ name: "checkpointdate", type:"date"})
    checkpointdate: Date;

    @Column("varchar", { name: "observation", length: 250 })
    observation: string;

    @Column("varchar", { name: "insert_user", length: 40 })
    insertUser: string;

    @Column("datetime", { name: "insert_datetime" })
    insertDatetime: Date;

    @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
    updatedUser: string | null;

    @Column("datetime", { name: "updated_datetime", nullable: true })
    updatedDatetime: Date | null;

    @ManyToOne(
        () => Machine001mb,
        (machine001mb) => machine001mb.preventivechecklist001wbs,
        { onDelete: "CASCADE", onUpdate: "RESTRICT" }
    )
    @JoinColumn([{ name: "mslno", referencedColumnName: "slNo" }])
    mslno2: Machine001mb;

    @ManyToOne(
        () => Checklist001mb,
        (checklist001mb) => checklist001mb.preventivechecklist001wbs,
        { onDelete: "CASCADE", onUpdate: "RESTRICT" }
    )
    @JoinColumn([{ name: "cpslno", referencedColumnName: "slNo" }])
    cpslno2: Checklist001mb;


    setProperties(preventiveChecklistDTO: PreventiveChecklistDTO) {
        this.slNo = preventiveChecklistDTO.slNo;
        this.unitslno = preventiveChecklistDTO.unitslno;
        this.mslno = preventiveChecklistDTO.mslno;
        this.cpslno = preventiveChecklistDTO.cpslno;
        this.checkpointdate = new Date(preventiveChecklistDTO.checkpointdate);
        this.observation = preventiveChecklistDTO.observation;
        this.insertUser = preventiveChecklistDTO.insertUser;
        this.insertDatetime = preventiveChecklistDTO.insertDatetime;
        this.updatedUser = preventiveChecklistDTO.updatedUser;
        this.updatedDatetime = preventiveChecklistDTO.updatedDatetime;
    }
}
