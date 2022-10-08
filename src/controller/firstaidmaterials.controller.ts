import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";


import { Response } from "express";
import { FirstaidMaterialsDTO } from "src/dto/firstaid-materials.dto";
import { Firstaidwb001 } from "src/entity/Firstaidwb001";
import { FirstaidMaterialsService } from "src/service/firstaidmaterials.service";
import { Request } from "supertest";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
var path = require('path');



@Controller('/testandreportstudio/api/firstaidmaterials')
export class FirstaidMaterialsControllers {
	constructor(private readonly firstaidmaterialsService: FirstaidMaterialsService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('pdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.firstaidmaterialsService.downloadPdf(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('excel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {

		return await this.firstaidmaterialsService.downloadExcel(unitslno,request, response);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() firstaidMaterialsDTO: FirstaidMaterialsDTO): Promise<Firstaidwb001> {
		return this.firstaidmaterialsService.create(firstaidMaterialsDTO);
	}



	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() firstaidMaterialsDTO: FirstaidMaterialsDTO): Promise<Firstaidwb001> {
		return this.firstaidmaterialsService.update(firstaidMaterialsDTO);
	}
	// @UseGuards(JwtAuthGuard)
	// @Put("update")
	// @UseInterceptors(FileInterceptor('file'))
	// uploadFile1(@UploadedFile() file: Express.Multer.File, @Body() employeedetailsDTO: EmployeeDetailsDTO) {
	// 	return this.employeedetailsService.update(file, employeedetailsDTO);
	// }

	// @UseGuards(JwtAuthGuard)
	// findAll(): Promise<Firstaidwb001[]> {
	// 	return this.firstaidmaterialsService.findAll();
	// }

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findeNotificationAll/:unitslno')
	findeNotificationAll(@Param('unitslno') unitslno: number): Promise<Firstaidwb001[]> {
		return this.firstaidmaterialsService.findeNotificationAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Firstaidwb001[]> {
		return this.firstaidmaterialsService.findAll(unitslno);
	}

	// @UseGuards(JwtAuthGuard)
	// @Get('findAllByEmployeId/:eslno')
	// findAllByEmployeId(@Param('eslno') eslno: number): Promise<Firstaidwb001[]> {
	// 	return this.firstaidmaterialsService.findAllByEmployeId(eslno);
	// }


	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.firstaidmaterialsService.remove(id);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Firstaidwb001> {
		return this.firstaidmaterialsService.findOne(id);
	}










}