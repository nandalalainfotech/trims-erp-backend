
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerContactDTO } from "src/dto/customer-contact.dto";
import { Customercontact001wb } from "src/entity/customercontact001wb";
import { Repository } from "typeorm";



@Injectable()
export class CustomerContactService {
    constructor(

        @InjectRepository(Customercontact001wb) private readonly CustomerContactRepository: Repository<Customercontact001wb>) {
    }

    async create(customerContactDTO: CustomerContactDTO): Promise<Customercontact001wb> {
        const customercontact001wb = new Customercontact001wb();
        customercontact001wb.setProperties(customerContactDTO);
        return this.CustomerContactRepository.save(customercontact001wb);
    }
    async update(customerContactDTO: CustomerContactDTO): Promise<Customercontact001wb> {
        const customercontact001wb = new Customercontact001wb();
        customercontact001wb.setProperties(customerContactDTO);
        await this.CustomerContactRepository.update({ slNo: customercontact001wb.slNo }, customercontact001wb);
        return customercontact001wb;
    }

    async findAll(unitslno:any): Promise<Customercontact001wb[]> {
        return this.CustomerContactRepository.find({where:{unitslno:unitslno}})
    }

    async findAllbysupplierId(poslNo: number): Promise<Customercontact001wb[]> {
        return this.CustomerContactRepository.find({order: { slNo: "DESC" }, select: ["slNo", "pname"], where: { "customerslNo": poslNo } });
    }

    findOne(id: number): Promise<Customercontact001wb> {
        return this.CustomerContactRepository.findOne(id);
    }
    async remove(slNo: number): Promise<void> {
        await this.CustomerContactRepository.delete(slNo);
    }
}