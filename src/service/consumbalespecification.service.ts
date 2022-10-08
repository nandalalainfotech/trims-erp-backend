import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConsumerspecificationDTO } from "src/dto/consumablespecification.dto";
import { Consumerspecification001wb } from "src/entity/Consumerspecification001wb";
import { getManager, Repository } from "typeorm";



@Injectable()
export class  ConsumerSpecificationService {
    constructor(

        @InjectRepository(Consumerspecification001wb) private readonly consumerspecificationRepository: Repository<Consumerspecification001wb>) {
    }

    async create(consumerspecificationDTO: ConsumerspecificationDTO): Promise<Consumerspecification001wb> {
        const consumerspecification001wb = new Consumerspecification001wb();
        consumerspecification001wb.setProperties(consumerspecificationDTO);
        return this.consumerspecificationRepository.save(consumerspecification001wb);
    }
    async update(consumerspecificationDTO: ConsumerspecificationDTO): Promise<Consumerspecification001wb> {
        const consumerspecification001wb = new Consumerspecification001wb();
        consumerspecification001wb.setProperties(consumerspecificationDTO);
        await this.consumerspecificationRepository.update({ slNo: consumerspecification001wb.slNo }, consumerspecification001wb);
        return consumerspecification001wb;
    }

    async findAll(unitslno:any): Promise<Consumerspecification001wb[]> {
        return await this.consumerspecificationRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno}})
    }

    // async findAllbyspecificationId(poslNo: number): Promise<Specification001wb[]> {
    //     return this.specificationRepository.find({ select: ["slNo", "parameter"], where: { "slNo": poslNo } });
    // }


    findOne(id: number): Promise<Consumerspecification001wb> {
        return this.consumerspecificationRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.consumerspecificationRepository.delete(slNo);
    }
}