import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SystempropertiesDTO } from 'src/dto/Systemproperties.dto';
import { Systemproperties001mb } from 'src/entity/Systemproperties001mb';
import { hasRole } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/role.guard';

import { SystemPropertiesService } from 'src/service/system-properties.service';

@Controller('/testandreportstudio/api/systemproperties')
export class SystemPropertiesController {
	constructor(private readonly systemPropertiesService: SystemPropertiesService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post()
	create(@Body() systempropertiesDTO: SystempropertiesDTO): Promise<Systemproperties001mb> {
		return this.systemPropertiesService.create(systempropertiesDTO);
	}
	// ---------user reg systemproperties---------------------
	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('getSystemPropertiesByNameAndTypeReg/:name/:type')
	getSystemPropertiesByNameAndType1(@Param('name') name: string, @Param('type') type: string): Promise<Systemproperties001mb[]> {
		return this.systemPropertiesService.getSystemPropertiesByNameAndType(name, type);
	}
	// ---------user reg systemproperties---------------------
	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('getSystemPropertiesByNameAndType/:name/:type')
	getSystemPropertiesByNameAndType(@Param('name') name: string, @Param('type') type: string): Promise<Systemproperties001mb[]> {
		return this.systemPropertiesService.getSystemPropertiesByNameAndType(name, type);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get()
	findAll(): Promise<Systemproperties001mb[]> {
		return this.systemPropertiesService.findAll();
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: string): Promise<Systemproperties001mb> {
		return this.systemPropertiesService.findOne(id);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete(':id')
	remove(@Param('id') id: string): Promise<void> {
		return this.systemPropertiesService.remove(id);
	}
}
