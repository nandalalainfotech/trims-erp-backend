import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerConsigneeDTO } from "src/dto/customer-consignee.dto";
import { Customerconsignee001mb } from "src/entity/Customerconsignee001mb";
import { Repository } from "typeorm";

@Injectable()
export class CustomerConsigneeService {

    constructor(
        @InjectRepository(Customerconsignee001mb) private readonly CustomerConsigneeRepository: Repository<Customerconsignee001mb>) {

    }

    async create(customerConsigneeDTO: CustomerConsigneeDTO): Promise<Customerconsignee001mb> {
        const customerconsignee001mb = new Customerconsignee001mb();
        customerconsignee001mb.setProperties(customerConsigneeDTO);
        return this.CustomerConsigneeRepository.save(customerconsignee001mb);
    }

    async update(customerConsigneeDTO: CustomerConsigneeDTO): Promise<Customerconsignee001mb> {
        const customerconsignee001mb = new Customerconsignee001mb();
        customerconsignee001mb.setProperties(customerConsigneeDTO);
        await this.CustomerConsigneeRepository.update({ slNo: customerconsignee001mb.slNo }, customerconsignee001mb);
        return customerconsignee001mb;
    }

    async findAll(unitslno:any): Promise<Customerconsignee001mb[]> {
        return await this.CustomerConsigneeRepository.find({order: { slNo: "DESC" },relations: ["consigneeSlno2"],where:{unitslno:unitslno}});
    }

    findOne(id: number): Promise<Customerconsignee001mb> {
        return this.CustomerConsigneeRepository.findOne(id);
    }

    async remove(slNo: number): Promise<void> {
        await this.CustomerConsigneeRepository.delete(slNo);
    }

    async findAllbyConsigneeId(poslNo: number): Promise<Customerconsignee001mb[]> {
        return this.CustomerConsigneeRepository.find({ select: ["slNo","consignee"], where: { "consigneeSlno": poslNo } });
    }
}