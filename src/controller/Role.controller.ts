import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleDTO } from 'src/dto/Role.dto';
import { Role001mb } from 'src/entity/Role001mb';
import { hasRole } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/role.guard';
import { RoleService } from 'src/service/Role.service';



@Controller('/testandreportstudio/api/role')
export class RoleController {
	constructor(private readonly roleService: RoleService) { }

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() roleDTO: RoleDTO): Promise<Role001mb> {
		return this.roleService.create(roleDTO);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() roleDTO: RoleDTO): Promise<Role001mb> {
		return this.roleService.update(roleDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll')
	findAll(): Promise<Role001mb[]> {
		return this.roleService.findAll();
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Role001mb> {
		return this.roleService.findOne(id);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.roleService.remove(id);
	}
}

