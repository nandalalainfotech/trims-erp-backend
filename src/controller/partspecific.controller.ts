import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PartSpecificDTO } from "src/dto/partspecific.dto";
import { Partspecific001wb } from "src/entity/Partspecific001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { PartSpecificService } from "src/service/partspecific.service";




@Controller(`/testandreportstudio/api/partspecif`)

export class PartSpecificController {
	constructor(private readonly partSpecificService: PartSpecificService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Partspecific001wb[]> {
		return this.partSpecificService.findAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('save')
	create(@Body() partSpecificDTO: PartSpecificDTO) {
		return this.partSpecificService.create(partSpecificDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() partSpecificDTO: PartSpecificDTO) {
		return this.partSpecificService.update(partSpecificDTO);
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
		return this.partSpecificService.remove(slNo);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Partspecific001wb> {
		return this.partSpecificService.findOne(id);
	}

}