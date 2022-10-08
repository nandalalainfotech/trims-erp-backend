import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PartitemDTO } from "src/dto/partitem.dto";
import { Partitem001wb } from "src/entity/Partitem001wb";

import { getManager, Repository } from "typeorm";



@Injectable()
export class  PartItemService {
    constructor(

        @InjectRepository(Partitem001wb) private readonly partitemRepository: Repository<Partitem001wb>) {
    }

    async create(partitemDTO: PartitemDTO): Promise<Partitem001wb> {
        const partitem001wb = new Partitem001wb();
        partitem001wb.setProperties(partitemDTO);
        return this.partitemRepository.save(partitem001wb);
    }
    async update(partitemDTO: PartitemDTO): Promise<Partitem001wb> {
        const partitem001wb = new Partitem001wb();
        partitem001wb.setProperties(partitemDTO);
        await this.partitemRepository.update({ slNo: partitem001wb.slNo }, partitem001wb);
        return partitem001wb;
    }

    async findAll(unitslno:any): Promise<Partitem001wb[]> {
        return await this.partitemRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno}})
    }

    // async findAllbyspecificationId(poslNo: number): Promise<Specification001wb[]> {
    //     return this.specificationRepository.find({ select: ["slNo", "parameter"], where: { "slNo": poslNo } });
    // }


    findOne(id: number): Promise<Partitem001wb> {
        return this.partitemRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.partitemRepository.delete(slNo);
    }
}