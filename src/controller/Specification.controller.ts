import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { SpecificationDTO } from "src/dto/Specification.dto";
import { Specification001wb } from "src/entity/Specification001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { SpecificationService } from "src/service/Specification.service";



@Controller(`/testandreportstudio/api/specification`)

export class SpecificationController {
	constructor(private readonly specificationService: SpecificationService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('save')
	create(@Body() specificationDTO: SpecificationDTO) {
		return this.specificationService.create(specificationDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() specificationDTO: SpecificationDTO) {
		return this.specificationService.update(specificationDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Specification001wb[]> {
		return this.specificationService.findAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAllbyspecificationId/:poslNo')
	findAllbyspecificationId(@Param('poslNo') poslNo: number): Promise<Specification001wb[]> {
		return this.specificationService.findAllbyspecificationId(poslNo);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.specificationService.remove(slNo);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Specification001wb> {
		return this.specificationService.findOne(id);
	}

}