import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UnitDepartMasterDTO } from "src/dto/unitdepartmaster.dto";
import { Unitdeptmaster001mb } from "src/entity/Unitdeptmaster001mb";
import { Repository } from "typeorm";

@Injectable()
export class UnitDepartMasterService {

    constructor(
        @InjectRepository(Unitdeptmaster001mb) private readonly UnitdepartmasterRepository: Repository<Unitdeptmaster001mb>) {

    }

    async create(unitDepartMasterDTO: UnitDepartMasterDTO): Promise<Unitdeptmaster001mb> {
        let units = await this.UnitdepartmasterRepository.find({ relations: ["unitslNo2", "departslNo2"] });
        for (let i = 0; i < units.length; i++) {
            if ( units[i].departslNo == unitDepartMasterDTO.departslNo && units[i].unitslNo == unitDepartMasterDTO.unitslNo) {
                throw new HttpException('This Unit already have this Department', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        const unitdeptmaster001mb = new Unitdeptmaster001mb();
        unitdeptmaster001mb.setProperties(unitDepartMasterDTO);
        return this.UnitdepartmasterRepository.save(unitdeptmaster001mb);
    }

    async update(unitDepartMasterDTO: UnitDepartMasterDTO): Promise<Unitdeptmaster001mb> {
        let units = await this.UnitdepartmasterRepository.find({ relations: ["unitslNo2", "departslNo2"] });
        for (let i = 0; i < units.length; i++) {
            if ( units[i].departslNo == unitDepartMasterDTO.departslNo && units[i].unitslNo == unitDepartMasterDTO.unitslNo) {
                throw new HttpException('This Unit already have this Department', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        const unitdeptmaster001mb = new Unitdeptmaster001mb();
        unitdeptmaster001mb.setProperties(unitDepartMasterDTO);
        await this.UnitdepartmasterRepository.update({ slNo: unitdeptmaster001mb.slNo }, unitdeptmaster001mb);
        return unitdeptmaster001mb;
    }

    async findAll(): Promise<Unitdeptmaster001mb[]> {
        return await this.UnitdepartmasterRepository.find({ relations: ["unitslNo2", "departslNo2"] });
    }

    findOne(id: number): Promise<Unitdeptmaster001mb> {
        return this.UnitdepartmasterRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.UnitdepartmasterRepository.delete(id);
    }

}