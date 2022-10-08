import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MachineWBDTO } from "src/dto/Machine-wb.dto";
import { Machine001wb } from "src/entity/Machine001wb";
import { Repository } from "typeorm";

@Injectable()
export class MachineWBService {
    constructor(
        @InjectRepository(Machine001wb) private readonly machineWBRepository: Repository<Machine001wb>) {
    }

    async create(machineWBDTO: MachineWBDTO): Promise<Machine001wb> {
        const machine001wb = new Machine001wb();
        machine001wb.setProperties(machineWBDTO);
        return this.machineWBRepository.save(machine001wb);
    }

    async update(machineWBDTO: MachineWBDTO): Promise<Machine001wb> {
        const machine001wb = new Machine001wb();
        machine001wb.setProperties(machineWBDTO);
        await this.machineWBRepository.update({ slNo: machine001wb.slNo }, machine001wb);
        return machine001wb;
    }

    async findAll(): Promise<Machine001wb[]> {
        return this.machineWBRepository.find({order: { slNo: "DESC" },});
    }

    findOne(id: number): Promise<Machine001wb> {
        return this.machineWBRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
		await this.machineWBRepository.delete(id);
	}
}