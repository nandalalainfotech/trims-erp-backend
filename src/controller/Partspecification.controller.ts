import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PartspecificationDTO } from "src/dto/Partspecification.dto";
import { Partspecification001wb } from "src/entity/Partspecification001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { PartspecificationService } from "src/service/Partspecification.service";




@Controller(`/testandreportstudio/api/partspecific`)
export class PartspecifcationController {
	constructor(private readonly partspecificationService: PartspecificationService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Partspecification001wb[]> {
		return this.partspecificationService.findAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('save')
	create(@Body() partspecificationDTO: PartspecificationDTO) {
		return this.partspecificationService.create(partspecificationDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() partspecificationDTO: PartspecificationDTO) {
		return this.partspecificationService.update(partspecificationDTO);
	}

	
	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.partspecificationService.remove(slNo);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Partspecification001wb> {
		return this.partspecificationService.findOne(id);
	}

}