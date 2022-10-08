import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { MachineWBDTO } from "src/dto/Machine-wb.dto";
import { Machine001wb } from "src/entity/Machine001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";

import { MachineWBService } from "src/service/machine-wb.service";

@Controller('/testandreportstudio/api/machineswb')
export class MachineWBController {
	constructor(private readonly machineWBService: MachineWBService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() machineWBDTO: MachineWBDTO): Promise<Machine001wb> {
		return this.machineWBService.create(machineWBDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() machineWBDTO: MachineWBDTO): Promise<Machine001wb> {
		return this.machineWBService.update(machineWBDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll')
	findAll(): Promise<Machine001wb[]> {
		return this.machineWBService.findAll();
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Machine001wb> {
		return this.machineWBService.findOne(id);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: string): Promise<void> {
		return this.machineWBService.remove(id);
	}
}