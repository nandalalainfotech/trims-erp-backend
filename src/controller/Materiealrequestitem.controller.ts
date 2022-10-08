import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { MateriealrequestitemDTO } from "src/dto/Materiealrequestitem.dto";
import { Materiealrequestitem001wb } from "src/entity/Materiealrequestitem001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { MateriealrequestitemService } from "src/service/Materiealrequestitem.service";





@Controller('/testandreportstudio/api/Materiealrequestitem')
export class MateriealrequestitemController {
	constructor(private readonly materiealrequestitemService: MateriealrequestitemService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Materiealrequestitem001wb[]> {
		return this.materiealrequestitemService.findAll(unitslno);
	}
	
	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('save')
	create(@Body() materiealrequestitemDTO: MateriealrequestitemDTO): Promise<Materiealrequestitem001wb> {
		return this.materiealrequestitemService.create(materiealrequestitemDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() materiealrequestitemDTO: MateriealrequestitemDTO) {
		return this.materiealrequestitemService.update(materiealrequestitemDTO);
	}


	

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.materiealrequestitemService.remove(id);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Materiealrequestitem001wb> {
		return this.materiealrequestitemService.findOne(id);
	}


}