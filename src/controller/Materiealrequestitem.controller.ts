import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { MateriealrequestitemDTO } from "src/dto/Materiealrequestitem.dto";
import { Materiealrequestitem001wb } from "src/entity/Materiealrequestitem001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { MateriealrequestitemService } from "src/service/Materiealrequestitem.service";
import { Response } from "express";
import { Request } from "supertest";



@Controller('/testandreportstudio/api/Materiealrequestitem')
export class MateriealrequestitemController {
	constructor(private readonly materiealrequestitemService: MateriealrequestitemService) { }
// ---------Stock Excel && Pdf---------------

@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
@UseGuards(JwtAuthGuard, RolesGuard)
@Get('itempdf/:unitslno')
@Header('Content-Type', 'application/pdf')
async downloaditemPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
	return await this.materiealrequestitemService.downloaditemPdf(unitslno,request, response);
}

@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
@UseGuards(JwtAuthGuard, RolesGuard)
@Get('itemexcel/:unitslno')
@Header("Content-Type",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
@Header("Content-Disposition",
	"attachment; filename=" + "Attendace Report" + ".xlsx")
async downloaditemExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
	return await this.materiealrequestitemService.downloaditemExcel(unitslno,request, response);
}

@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
@UseGuards(JwtAuthGuard, RolesGuard)
@Get('consumablepdf/:unitslno')
@Header('Content-Type', 'application/pdf')
async downloadconsumablePdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
	return await this.materiealrequestitemService.downloadconsumablePdf(unitslno,request, response);
}

@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
@UseGuards(JwtAuthGuard, RolesGuard)
@Get('consumablexcel/:unitslno')
@Header("Content-Type",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
@Header("Content-Disposition",
	"attachment; filename=" + "Attendace Report" + ".xlsx")
async downloadconsumableExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
	return await this.materiealrequestitemService.downloadconsumableExcel(unitslno,request, response);
}

@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
@UseGuards(JwtAuthGuard, RolesGuard)
@Get('childPartpdf/:unitslno')
@Header('Content-Type', 'application/pdf')
async downloadchildPartPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
	return await this.materiealrequestitemService.downloadchildPartPdf(unitslno,request, response);
}

@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
@UseGuards(JwtAuthGuard, RolesGuard)
@Get('childPartexcel/:unitslno')
@Header("Content-Type",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
@Header("Content-Disposition",
	"attachment; filename=" + "Attendace Report" + ".xlsx")
async downloadchildPartExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
	return await this.materiealrequestitemService.downloadchildPartExcel(unitslno,request, response);
}

@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
@UseGuards(JwtAuthGuard, RolesGuard)
@Get('partpdf/:unitslno')
@Header('Content-Type', 'application/pdf')
async downloadPartPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
	return await this.materiealrequestitemService.downloadPartPdf(unitslno,request, response);
}

@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
@UseGuards(JwtAuthGuard, RolesGuard)
@Get('partexcel/:unitslno')
@Header("Content-Type",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
@Header("Content-Disposition",
	"attachment; filename=" + "Attendace Report" + ".xlsx")
async downloadPartExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
	return await this.materiealrequestitemService.downloadPartExcel(unitslno,request, response);
}
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