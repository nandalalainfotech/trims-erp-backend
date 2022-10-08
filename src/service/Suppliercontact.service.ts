import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SupplierContactDTO } from "src/dto/Suppliercontact.dto";
import { Suppliercontact001wb } from "src/entity/Suppliercontact001wb";
import { getManager, Repository } from "typeorm";



@Injectable()
export class SupplierContactService {
    constructor(

        @InjectRepository(Suppliercontact001wb) private readonly SupplierContactRepository: Repository<Suppliercontact001wb>) {
    }
    
    async create(supplierContactDTO: SupplierContactDTO): Promise<Suppliercontact001wb> {
        const suppliercontact001wb = new Suppliercontact001wb();
        suppliercontact001wb.setProperties(supplierContactDTO);
        return this.SupplierContactRepository.save(suppliercontact001wb);
    }
    async update(supplierContactDTO: SupplierContactDTO): Promise<Suppliercontact001wb> {
        const suppliercontact001wb = new Suppliercontact001wb();
        suppliercontact001wb.setProperties(supplierContactDTO);
        await this.SupplierContactRepository.update({ slNo: suppliercontact001wb.slNo }, suppliercontact001wb);
        return suppliercontact001wb;
    }

    async findAll(unitslno:any): Promise<Suppliercontact001wb[]> {        
        return this.SupplierContactRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno}})
    }

    async findAllbysupplierId(poslNo: number): Promise<Suppliercontact001wb[]> {
        return this.SupplierContactRepository.find({order: { slNo: "DESC" }, select: ["slNo","pname"], where: { "supplierslNo": poslNo } });
    }

    findOne(id: number): Promise<Suppliercontact001wb> {
        return this.SupplierContactRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.SupplierContactRepository.delete(slNo);
    }
}