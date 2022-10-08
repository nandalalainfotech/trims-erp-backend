import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Response } from "express";
import { Request } from "supertest";
import { SuppliertypeService } from "src/service/Suppliertype.service";
import { Suppliertype001mb } from "src/entity/Suppliertype001mb";
import { SuppliertypeDTO } from "src/dto/Suppliertype.dto";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";




@Controller('/testandreportstudio/api/suppliertype')
export class SuppliertypeController {
	constructor(private readonly suppliertypeService: SuppliertypeService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() suppliertypeDTO: SuppliertypeDTO): Promise<Suppliertype001mb> {
		return this.suppliertypeService.create(suppliertypeDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() suppliertypeDTO: SuppliertypeDTO): Promise<Suppliertype001mb> {
		return this.suppliertypeService.update(suppliertypeDTO);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Suppliertype001mb[]> {
		return this.suppliertypeService.findAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Suppliertype001mb> {
		return this.suppliertypeService.findOne(id);
	}


	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.suppliertypeService.remove(id);
	}
}