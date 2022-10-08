import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SystempropertiesDTO } from 'src/dto/Systemproperties.dto';
import { Systemproperties001mb } from 'src/entity/Systemproperties001mb';

import { Repository } from 'typeorm';

@Injectable()
export class SystemPropertiesService {
	constructor(@InjectRepository(Systemproperties001mb) private readonly systempropertiesRepository: Repository<Systemproperties001mb>) { }

	async create(systempropertiesDTO: SystempropertiesDTO): Promise<Systemproperties001mb> {
		const systemproperties001mb = new Systemproperties001mb();
		systemproperties001mb.setProperties(systempropertiesDTO);
		return this.systempropertiesRepository.save(systemproperties001mb);
	}

	async findAll(): Promise<Systemproperties001mb[]> {
		return this.systempropertiesRepository.find();
	}

	async getSystemPropertiesByNameAndType(name: string, type: string) {
		const systemproperties001mb: Systemproperties001mb[] = await this.systempropertiesRepository.find({ where: { name: name , type: type}});
		if(!systemproperties001mb) {
			throw new BadRequestException('Invalid System Properties');
		}
		return systemproperties001mb;
	}

	findOne(id: string): Promise<Systemproperties001mb> {
		return this.systempropertiesRepository.findOne(id);
	}

	async remove(id: string): Promise<void> {
		await this.systempropertiesRepository.delete(id);
	}
}
