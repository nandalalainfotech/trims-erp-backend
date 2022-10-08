import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { OrderItemwbDTO } from "src/dto/orderitem-wb.dto";

import { Orderitem001wb } from "src/entity/Orderitem001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { OrderItemService } from "src/service/orderitem-wb.service";
import { Request } from "supertest";



@Controller('/testandreportstudio/api/orderitem')
export class OrderItemController {
	constructor(private readonly orderItemService: OrderItemService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Orderitem001wb[]> {
		return this.orderItemService.findAll(unitslno);
	}

	
	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('save')
	create(@Body() orderItemwbDTO: OrderItemwbDTO) {
		return this.orderItemService.create(orderItemwbDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() orderItemwbDTO: OrderItemwbDTO) {
		return this.orderItemService.update(orderItemwbDTO);
	}


	// @UseGuards(JwtAuthGuard)
	// @Get('findAllByOrderId/:orderslno')
	// findAllByOrderId(@Param('orderslno') orderslno: number): Promise<Orderitem001wb[]> {
	// 	return this.orderItemService.findAllByOrderId(orderslno);
	// }
	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.orderItemService.remove(slNo);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Orderitem001wb> {
		return this.orderItemService.findOne(id);
	}


}