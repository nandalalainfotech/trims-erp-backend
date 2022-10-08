import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ChildpartspecificationDTO } from "src/dto/childpartspecification.dto";
import { Childpartspecification001wb } from "src/entity/Childpartspecification001wb";
import { getManager, Repository } from "typeorm";



@Injectable()
export class  ChildpartSpecificationService {
    constructor(

        @InjectRepository(Childpartspecification001wb) private readonly childpartspecificationRepository: Repository<Childpartspecification001wb>) {
    }

    async create(childpartspecificationDTO: ChildpartspecificationDTO): Promise<Childpartspecification001wb> {
        const childpartspecification001wb = new Childpartspecification001wb();
        childpartspecification001wb.setProperties(childpartspecificationDTO);
        return this.childpartspecificationRepository.save(childpartspecification001wb);
    }
    async update(childpartspecificationDTO: ChildpartspecificationDTO): Promise<Childpartspecification001wb> {
        const childpartspecification001wb = new Childpartspecification001wb();
        childpartspecification001wb.setProperties(childpartspecificationDTO);
        await this.childpartspecificationRepository.update({ slNo: childpartspecification001wb.slNo }, childpartspecification001wb);
        return childpartspecification001wb;
    }

    async findAll(unitslno:any): Promise<Childpartspecification001wb[]> {
        return await this.childpartspecificationRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno}})
    }

    // async findAllbyspecificationId(poslNo: number): Promise<Specification001wb[]> {
    //     return this.specificationRepository.find({ select: ["slNo", "parameter"], where: { "slNo": poslNo } });
    // }


    findOne(id: number): Promise<Childpartspecification001wb> {
        return this.childpartspecificationRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.childpartspecificationRepository.delete(slNo);
    }
}