import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CustemerwbDTO } from "src/dto/Custemerwb.dto";
import { Custemer001wb } from "src/entity/Custemer001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { CustemerService } from "src/service/Custemer-wb-service";
import { Request } from "supertest";



@Controller('/testandreportstudio/api/custemerwb')
export class CustemerController {
	constructor(private readonly custemerService: CustemerService) { }
	
	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Custemer001wb[]> {
		return this.custemerService.findAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('save')
	create(@Body() custemerwbDTO: CustemerwbDTO) {
		return this.custemerService.create(custemerwbDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() custemerwbDTO: CustemerwbDTO) {
		return this.custemerService.update(custemerwbDTO);
	}
	

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.custemerService.remove(slNo);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Custemer001wb> {
		return this.custemerService.findOne(id);
	}


}