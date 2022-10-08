import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PartspecificationDTO } from "src/dto/Partspecification.dto";
import { Partspecification001wb } from "src/entity/Partspecification001wb";
import { Specification001wb } from "src/entity/Specification001wb";
import { getManager, Repository } from "typeorm";



@Injectable()
export class PartspecificationService {
    constructor(

        @InjectRepository(Partspecification001wb) private readonly partSpecificationRepository: Repository<Partspecification001wb>,
        @InjectRepository(Specification001wb) private readonly specificationRepository: Repository<Specification001wb>) {
    }


    async create(partspecificationDTO: PartspecificationDTO): Promise<Partspecification001wb> {

        let specification001wbs: Specification001wb[] = [];
        for (let i = 0; i < partspecificationDTO.specification2.length; i++) {
            const specification001wb = new Specification001wb();
            specification001wb.parameter = partspecificationDTO.specification2[i].parameter;
            specification001wb.specification = partspecificationDTO.specification2[i].specification;
            specification001wb.inspecmethod = partspecificationDTO.specification2[i].inspecmethod;
            specification001wb.unitslno = partspecificationDTO.unitslno;
            specification001wb.insertUser = partspecificationDTO.insertUser;
            specification001wb.insertDatetime = partspecificationDTO.insertDatetime;
            let specifi = await this.specificationRepository.save(specification001wb);
            specification001wbs.push(specifi);
        }

        if (specification001wbs.length > 0) {
            const partspecification001wb = new Partspecification001wb();
            partspecification001wb.setProperties(partspecificationDTO);
            partspecification001wb.specification001wbs = specification001wbs;
            await this.partSpecificationRepository.save(partspecification001wb);
            return partspecification001wb;
        }
    }
   

    async update(partspecificationDTO: PartspecificationDTO): Promise<Partspecification001wb> {
        const partspecification001wb = new Partspecification001wb();
        partspecification001wb.setProperties(partspecificationDTO);
        await this.partSpecificationRepository.update({ slNo: partspecification001wb.slNo }, partspecification001wb);
        return partspecification001wb;
    }

    async findAll(unitslno:any): Promise<Partspecification001wb[]> {        
        return this.partSpecificationRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno}})
    }
  

    findOne(id: number): Promise<Partspecification001wb> {
        return this.partSpecificationRepository.findOne({relations:["specification001wbs"]});
    }
    async remove(slNo: number): Promise<void> {
        await this.partSpecificationRepository.delete(slNo);
    }
}