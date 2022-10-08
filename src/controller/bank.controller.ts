import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Request } from "supertest";
import { Response } from "express";
import { BankNameService } from "src/service/bank.service";
import { Bank001mb } from "src/entity/Bank001mb";
import { BankDTO } from "src/dto/bank.dto";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";




@Controller('/testandreportstudio/api/bank')
export class BankNameController {
	constructor(private readonly bankNameService: BankNameService) { }



	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() bankDTO: BankDTO): Promise<Bank001mb> {
		return this.bankNameService.create(bankDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() bankDTO: BankDTO): Promise<Bank001mb> {
		return this.bankNameService.update(bankDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Bank001mb[]> {
		return this.bankNameService.findAll(unitslno);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':slNo')
	findOne(@Param('slNo') slNo: number): Promise<Bank001mb> {
		return this.bankNameService.findOne(slNo);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: string): Promise<void> {
		return this.bankNameService.remove(id);
	}
}