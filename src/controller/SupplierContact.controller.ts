import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { SupplierContactDTO } from "src/dto/Suppliercontact.dto";
import { Suppliercontact001wb } from "src/entity/Suppliercontact001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { SupplierContactService } from "src/service/Suppliercontact.service";



@Controller(`/testandreportstudio/api/suppliercontact`)

export class SupplierContactController {
	constructor(private readonly supplierContactService: SupplierContactService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('save')
	create(@Body() supplierContactDTO: SupplierContactDTO) {
		return this.supplierContactService.create(supplierContactDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() supplierContactDTO: SupplierContactDTO) {
		return this.supplierContactService.update(supplierContactDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Suppliercontact001wb[]> {
		return this.supplierContactService.findAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAllbysupplierId/:poslNo')
	findAllbysupplierId(@Param('poslNo') poslNo: number): Promise<Suppliercontact001wb[]> {
		return this.supplierContactService.findAllbysupplierId(poslNo);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.supplierContactService.remove(slNo);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Suppliercontact001wb> {
		return this.supplierContactService.findOne(id);
	}

}