import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CustomerConsigneeDTO } from "src/dto/customer-consignee.dto";
import { Customerconsignee001mb } from "src/entity/Customerconsignee001mb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { CustomerConsigneeService } from "src/service/customer-consignee.service";

@Controller('/testandreportstudio/api/customerConsignee')

export class CustomerConsigneeController {
	constructor(private readonly customerConsigneeService: CustomerConsigneeService) {

	}

	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() customerConsigneeDTO: CustomerConsigneeDTO): Promise<Customerconsignee001mb> {
		return this.customerConsigneeService.create(customerConsigneeDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() customerConsigneeDTO: CustomerConsigneeDTO): Promise<Customerconsignee001mb> {
		return this.customerConsigneeService.update(customerConsigneeDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Customerconsignee001mb[]> {
		return this.customerConsigneeService.findAll(unitslno);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.customerConsigneeService.remove(slNo);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Customerconsignee001mb> {
		return this.customerConsigneeService.findOne(id);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAllbyConsigneeId/:poslNo')
	findAllbyConsigneeId(@Param('poslNo') poslNo: number): Promise<Customerconsignee001mb[]> {
		return this.customerConsigneeService.findAllbyConsigneeId(poslNo);
	}
}