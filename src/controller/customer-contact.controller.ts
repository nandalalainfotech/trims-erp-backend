import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CustomerContactDTO } from "src/dto/customer-contact.dto";
import { Customercontact001wb } from "src/entity/customercontact001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { CustomerContactService } from "src/service/customer-contact.service";


@Controller(`/testandreportstudio/api/custemerContact`)
export class CustomerContactController {
	constructor(private readonly customerContactService: CustomerContactService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('save')
	create(@Body() customerContactDTO: CustomerContactDTO) {
		return this.customerContactService.create(customerContactDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() customerContactDTO: CustomerContactDTO) {
		return this.customerContactService.update(customerContactDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Customercontact001wb[]> {
		return this.customerContactService.findAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAllbysupplierId/:poslNo')
	findAllbysupplierId(@Param('poslNo') poslNo: number): Promise<Customercontact001wb[]> {
		return this.customerContactService.findAllbysupplierId(poslNo);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.customerContactService.remove(slNo);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Customercontact001wb> {
		return this.customerContactService.findOne(id);
	}
}