import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CustomerpoitemDTO } from "src/dto/Customerpoitem.dto";
import { Customerpoitem001wb } from "src/entity/Customerpoitem001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { CustomerpoitemService } from "src/service/Customerpoitem.service";

@Controller('/testandreportstudio/api/CustomerPoitem')
export class CustomerpoitemController {

    constructor(private readonly customerpoitemService: CustomerpoitemService) { }

    @hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('save')
	create(@Body() customerpoitemDTO: CustomerpoitemDTO) {
		return this.customerpoitemService.create(customerpoitemDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() customerpoitemDTO: CustomerpoitemDTO) {
		return this.customerpoitemService.update(customerpoitemDTO);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.customerpoitemService.remove(slNo);
	}

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Customerpoitem001wb[]> {
		return this.customerpoitemService.findAll(unitslno);
	}
    
}