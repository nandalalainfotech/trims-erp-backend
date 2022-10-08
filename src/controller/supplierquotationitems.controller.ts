import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { SupplierquotationsItemDTO } from "src/dto/supplierQuotationsitem.dto";
import { Supplierquotationitems001wb } from "src/entity/Supplierquotationitems001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { SupplierquotationitemsService } from "src/service/SupplierQuotationsitems.service";
import { Request } from "supertest";



@Controller('/testandreportstudio/api/supplierquotaitem')
export class SupplierquotationitemController {
	constructor(private readonly supplierquotationitemsService: SupplierquotationitemsService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Supplierquotationitems001wb[]> {
		return this.supplierquotationitemsService.findAll(unitslno);
	}
	
	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('save')
	create(@Body() supplierquotationsItemDTO: SupplierquotationsItemDTO) {
		return this.supplierquotationitemsService.create(supplierquotationsItemDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() supplierquotationsItemDTO: SupplierquotationsItemDTO) {
		return this.supplierquotationitemsService.update(supplierquotationsItemDTO);
	}


	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.supplierquotationitemsService.remove(slNo);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Supplierquotationitems001wb> {
		return this.supplierquotationitemsService.findOne(id);
	}


}