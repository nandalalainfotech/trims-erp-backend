import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { MachineSettingService } from "src/service/machine.service";
import { Response } from "express";
import { Request } from "supertest";
import { File001mb } from "src/entity/File001mb";
import { FileDTO } from "src/dto/file.dto";
import { FileMangerService } from "src/service/file.service";



@Controller('/testandreportstudio/api/files')
export class FileController {
	constructor(private readonly fileService: FileMangerService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() fileDTO: FileDTO): Promise<File001mb> {
		return this.fileService.create(fileDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() fileDTO: FileDTO): Promise<File001mb> {
		return this.fileService.update(fileDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll')
	findAll(): Promise<File001mb[]> {
		return this.fileService.findAll();
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<File001mb> {
		return this.fileService.findOne(id);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: string): Promise<void> {
		return this.fileService.remove(id);
	}

}


