import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; import { RoleDTO } from 'src/dto/Role.dto';
import { Role001mb } from 'src/entity/Role001mb';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
	constructor(@InjectRepository(Role001mb) private readonly roleRepository: Repository<Role001mb>) { }

	async create(roleDTO: RoleDTO): Promise<Role001mb> {
		const role001mb = new Role001mb();
		role001mb.setProperties(roleDTO);
		return this.roleRepository.save(role001mb);
	}
	async update(roleDTO: RoleDTO): Promise<Role001mb> {
		const role001mb = new Role001mb();
		role001mb.setProperties(roleDTO);
		await this.roleRepository.update({ id: role001mb.id }, role001mb);
		return role001mb;
	}

	async findAll(): Promise<Role001mb[]> {
		return this.roleRepository.find();
	}
	findOne(id: number): Promise<Role001mb> {
		return this.roleRepository.findOne(id);
	}

	async remove(id: number): Promise<void> {
		await this.roleRepository.delete(id);
	}
}