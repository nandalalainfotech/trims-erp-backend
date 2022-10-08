import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SpecificationDTO } from "src/dto/Specification.dto";
import { Specification001wb } from "src/entity/Specification001wb";

import { getManager, Repository } from "typeorm";



@Injectable()
export class SpecificationService {
    constructor(

        @InjectRepository(Specification001wb) private readonly specificationRepository: Repository<Specification001wb>) {
    }
    
    async create(specificationDTO: SpecificationDTO): Promise<Specification001wb> {
        const specification001wb = new Specification001wb();
        specification001wb.setProperties(specificationDTO);
        return this.specificationRepository.save(specification001wb);
    }
    async update(specificationDTO: SpecificationDTO): Promise<Specification001wb> {
        const specification001wb = new Specification001wb();
        specification001wb.setProperties(specificationDTO);
        await this.specificationRepository.update({ slNo: specification001wb.slNo }, specification001wb);
        return specification001wb;
    }

    async findAll(unitslno:any): Promise<Specification001wb[]> {        
        return this.specificationRepository.find({where:{unitslno:unitslno}})
    }

    async findAllbyspecificationId(poslNo: number): Promise<Specification001wb[]> {
        return this.specificationRepository.find({ order: { slNo: "DESC" },select: ["slNo","parameter"], where: { "slNo": poslNo } });
    }
  

    findOne(id: number): Promise<Specification001wb> {
        return this.specificationRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.specificationRepository.delete(slNo);
    }
}