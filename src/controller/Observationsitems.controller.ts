import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ObservationsitemsDTO } from "src/dto/Observationsitems.dto";
import { Observationsitems001wb } from "src/entity/Observationsitems001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { ObservationsitemsService } from "src/service/Observationsitems.service";


import { Request } from "supertest";



@Controller('/testandreportstudio/api/Observationsitems')
export class ObservationsitemsController {
	constructor(private readonly observationsitemsService: ObservationsitemsService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Observationsitems001wb[]> {
		return this.observationsitemsService.findAll(unitslno);
	}
	
	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('save')
	create(@Body() observationsitemsDTO: ObservationsitemsDTO): Promise<Observationsitems001wb> {

		return this.observationsitemsService.create(observationsitemsDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() observationsitemsDTO: ObservationsitemsDTO) {
		return this.observationsitemsService.update(observationsitemsDTO);
	}


	

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.observationsitemsService.remove(slNo);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Observationsitems001wb> {
		return this.observationsitemsService.findOne(id);
	}


}