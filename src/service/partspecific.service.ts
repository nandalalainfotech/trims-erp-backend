import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PartSpecificDTO } from "src/dto/partspecific.dto";
import { Partspecific001wb } from "src/entity/Partspecific001wb";
import { getManager, Repository } from "typeorm";



@Injectable()
export class  PartSpecificService {
    constructor(

        @InjectRepository(Partspecific001wb) private readonly partspecificRepository: Repository<Partspecific001wb>) {
    }

    async create(partSpecificDTO: PartSpecificDTO): Promise<Partspecific001wb> {
        const partspecific001wb = new Partspecific001wb();
        partspecific001wb.setProperties(partSpecificDTO);
        return this.partspecificRepository.save(partspecific001wb);
    }
    async update(partSpecificDTO: PartSpecificDTO): Promise<Partspecific001wb> {
        const partspecific001wb = new Partspecific001wb();
        partspecific001wb.setProperties(partSpecificDTO);
        await this.partspecificRepository.update({ slNo: partspecific001wb.slNo }, partspecific001wb);
        return partspecific001wb;
    }

    async findAll(unitslno:any): Promise<Partspecific001wb[]> {
        return await this.partspecificRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno}})
    }

    // async findAllbyspecificationId(poslNo: number): Promise<Specification001wb[]> {
    //     return this.specificationRepository.find({ select: ["slNo", "parameter"], where: { "slNo": poslNo } });
    // }


    findOne(id: number): Promise<Partspecific001wb> {
        return this.partspecificRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.partspecificRepository.delete(slNo);
    }
}