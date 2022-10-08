import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { OrderitemSpecificationDTO } from "src/dto/orderitemspecification.dto";
import { Orderitemspecification001wb } from "src/entity/Orderitemspecification001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { OrderitemSpecificationService } from "src/service/orderitemspecification.service";



@Controller(`/testandreportstudio/api/orderspecification`)

export class OrderitemSpecificationController {
	constructor(private readonly orderitemSpecificationService: OrderitemSpecificationService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Orderitemspecification001wb[]> {
		return this.orderitemSpecificationService.findAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('save')
	create(@Body() orderitemSpecificationDTO: OrderitemSpecificationDTO) {
		return this.orderitemSpecificationService.create(orderitemSpecificationDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() orderitemSpecificationDTO: OrderitemSpecificationDTO) {
		return this.orderitemSpecificationService.update(orderitemSpecificationDTO);
	}

	// @UseGuards(JwtAuthGuard)
	// @Get('findAllbyspecificationId/:poslNo')
	// findAllbyspecificationId(@Param('poslNo') poslNo: number): Promise<Specification001wb[]> {
	// 	return this.specificationService.findAllbyspecificationId(poslNo);
	// }

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.orderitemSpecificationService.remove(slNo);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Orderitemspecification001wb> {
		return this.orderitemSpecificationService.findOne(id);
	}

}