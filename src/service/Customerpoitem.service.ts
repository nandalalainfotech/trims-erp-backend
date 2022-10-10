import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerpoitemDTO } from "src/dto/Customerpoitem.dto";
import { Customerpoitem001wb } from "src/entity/Customerpoitem001wb";
import { Customerpomaster001mb } from "src/entity/Customerpomaster001mb";
import { Repository } from "typeorm";

@Injectable()
export class CustomerpoitemService {
    constructor(
        @InjectRepository(Customerpomaster001mb)
        private readonly CustomerpomasterRepository: Repository<Customerpomaster001mb>,
        @InjectRepository(Customerpoitem001wb)
        private readonly CustomerpoitemRepository: Repository<Customerpoitem001wb>,

    ) { }

    async create(customerpoitemDTO: CustomerpoitemDTO): Promise<Customerpoitem001wb> {
        const customerpoitem001wb = new Customerpoitem001wb();
        customerpoitem001wb.setProperties(customerpoitemDTO);
        return this.CustomerpoitemRepository.save(customerpoitem001wb);
    }
    async update(customerpoitemDTO: CustomerpoitemDTO): Promise<Customerpoitem001wb> {
        const customerpoitem001wb = new Customerpoitem001wb();
        customerpoitem001wb.setProperties(customerpoitemDTO);
        await this.CustomerpoitemRepository.update({ slNo: customerpoitem001wb.slNo }, customerpoitem001wb);
        return customerpoitem001wb;
    }

    async findAll(unitslno:any): Promise<Customerpoitem001wb[]> {
        return await this.CustomerpoitemRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno}})
    }

    async remove(slNo: number): Promise<void> {
        await this.CustomerpoitemRepository.delete(slNo);
    }
}