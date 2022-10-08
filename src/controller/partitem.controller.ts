import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PartitemDTO } from "src/dto/partitem.dto";
import { Partitem001wb } from "src/entity/Partitem001wb";

import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { PartItemService } from "src/service/partitem.service";





@Controller(`/testandreportstudio/api/partitem`)

export class PartItemController {
	constructor(private readonly partItemService: PartItemService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Partitem001wb[]> {
		return this.partItemService.findAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('save')
	create(@Body() partitemDTO: PartitemDTO) {
		return this.partItemService.create(partitemDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() partitemDTO: PartitemDTO) {
		return this.partItemService.update(partitemDTO);
	}


	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.partItemService.remove(slNo);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Partitem001wb> {
		return this.partItemService.findOne(id);
	}

}