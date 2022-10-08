import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PurchasereqslipitemDTO } from "src/dto/Purchasereqslipitem.dto";
import { Purchasereqitem001wb } from "src/entity/Purchasereqitem001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { PurchasereqslipitemService } from "src/service/purchasereqslipitem.service";
import { Request } from "supertest";



@Controller('/testandreportstudio/api/purchasereqitem')
export class PurchasereqitemController {
	constructor(private readonly purchasereqslipitemService: PurchasereqslipitemService) { }
	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Purchasereqitem001wb[]> {
		return this.purchasereqslipitemService.findAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('save')
	create(@Body() purchasereqslipitemDTO: PurchasereqslipitemDTO) {
		return this.purchasereqslipitemService.create(purchasereqslipitemDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() purchasereqslipitemDTO: PurchasereqslipitemDTO) {
		return this.purchasereqslipitemService.update(purchasereqslipitemDTO);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.purchasereqslipitemService.remove(slNo);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Purchasereqitem001wb> {
		return this.purchasereqslipitemService.findOne(id);
	}


}