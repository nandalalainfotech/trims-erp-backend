import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { SupplierRegistrationDTO } from "src/dto/supplier-registration.dto";
import { Supplierregistration001mb } from "src/entity/Supplierregistration001mb";
import { SupplierRegistrationService } from "src/service/supplier-registration.service";
import { Response } from "express";
import { Request } from "supertest";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { FileInterceptor } from "@nestjs/platform-express";

var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/supplierReg')
export class SupplierRegistrationController {
    constructor(private readonly supplierRegService: SupplierRegistrationService) { }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('pdf/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
        return await this.supplierRegService.downloadPdf(unitslno,request, response);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
        return await this.supplierRegService.downloadExcel(unitslno,request, response);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('pdfId/:id/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadIDPdf(@Param('unitslno') unitslno: number,@Param('id') id: number,@Req() request: Request, @Res() response: Response) {
		return await this.supplierRegService.downloadIDPdf(unitslno,id, request,response);
	}

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('excelID/:id/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadIDExcel(@Param('unitslno') unitslno: number,@Param('id') id: number,@Req() request: Request, @Res() response: Response) {
		return await this.supplierRegService.downloadIDExcel(unitslno,id,request, response);
	}
    
    @hasRole(Role.superadmin, Role.admin, Role.user)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('fileSave')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File, @Body() supplierRegDTO: SupplierRegistrationDTO) {
        return this.supplierRegService.create2(file, supplierRegDTO);
    }



    @hasRole(Role.superadmin, Role.admin, Role.user)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post("save")
    create(@Body() supplierRegDTO: SupplierRegistrationDTO): Promise<Supplierregistration001mb> {

        return this.supplierRegService.create(supplierRegDTO);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('getCount')
    getCount(): Promise<string> {
        return this.supplierRegService.getCount();
    }

    @hasRole(Role.superadmin, Role.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put("update")
    update(@Body() supplierRegDTO: SupplierRegistrationDTO): Promise<Supplierregistration001mb> {
        return this.supplierRegService.update(supplierRegDTO);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAll/:unitslno')
    findAll(@Param('unitslno') unitslno: number): Promise<Supplierregistration001mb[]> {
        return this.supplierRegService.findAll(unitslno);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAllSlNoAndSuppcode/:unitslno')
    findAllSlNoAndSuppcode(@Param('unitslno') unitslno: number): Promise<Supplierregistration001mb[]> {
        return this.supplierRegService.findAllSlNoAndSuppcode(unitslno);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Supplierregistration001mb> {
        return this.supplierRegService.findOne(id);
    }

    // @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findimg/:img')
    findimg(@Param('img') img: any,@Req() request: Request, @Res() response: Response) {
        return this.supplierRegService.findimg(img,request, response);
    }

    @hasRole(Role.superadmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.supplierRegService.remove(id);
    }
}