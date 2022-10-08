import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ConsumerspecificationDTO } from "src/dto/consumablespecification.dto";
import { Consumerspecification001wb } from "src/entity/Consumerspecification001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { ConsumerSpecificationService } from "src/service/consumbalespecification.service";




@Controller(`/testandreportstudio/api/ consumerspecification`)

export class ConsumerSpecificationController {
	constructor(private readonly consumerSpecificationService: ConsumerSpecificationService) { }


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Consumerspecification001wb[]> {
		return this.consumerSpecificationService.findAll(unitslno);
	}
	
	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('save')
	create(@Body() consumerspecificationDTO: ConsumerspecificationDTO) {
		return this.consumerSpecificationService.create(consumerspecificationDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() consumerspecificationDTO: ConsumerspecificationDTO) {
		return this.consumerSpecificationService.update(consumerspecificationDTO);
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
		return this.consumerSpecificationService.remove(slNo);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Consumerspecification001wb> {
		return this.consumerSpecificationService.findOne(id);
	}

}