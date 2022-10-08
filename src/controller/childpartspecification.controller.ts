import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ChildpartspecificationDTO } from "src/dto/childpartspecification.dto";
import { Childpartspecification001wb } from "src/entity/Childpartspecification001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { ChildpartSpecificationService } from "src/service/childpartsepecification.service";



@Controller(`/testandreportstudio/api/ childpartspecification`)

export class ChildpartSpecificationController {
	constructor(private readonly childpartSpecificationService: ChildpartSpecificationService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Childpartspecification001wb[]> {
		return this.childpartSpecificationService.findAll(unitslno);
	}
	
	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('save')
	create(@Body() childpartspecificationDTO: ChildpartspecificationDTO) {
		return this.childpartSpecificationService.create(childpartspecificationDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() childpartspecificationDTO: ChildpartspecificationDTO) {
		return this.childpartSpecificationService.update(childpartspecificationDTO);
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
		return this.childpartSpecificationService.remove(slNo);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Childpartspecification001wb> {
		return this.childpartSpecificationService.findOne(id);
	}

}