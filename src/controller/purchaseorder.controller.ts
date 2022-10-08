import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PurchaseorderDTO } from "src/dto/Purchaseorder.dto";
import { Purchaseorder001wb } from "src/entity/Purchaseorder001wb";
import { PurchaseOrderService } from "src/service/purchaseorder.service";
import { Response } from "express";
import { Request } from "supertest";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/order')
export class PurchaseOrderController {
    constructor(private readonly purchaseOrderService: PurchaseOrderService) { }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('pdf/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
        return await this.purchaseOrderService.downloadPdf(unitslno,request, response);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('pdf/:id/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloadParamsPdf(@Param('unitslno') unitslno: number,@Param('id') id: number, @Res() response: Response) {
        return await this.purchaseOrderService.downloadParamsPdf(unitslno,id, response);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:id/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel1(@Param('unitslno') unitslno: number,@Param('id') id: number, request: Request, @Res() response: Response) {
        return await this.purchaseOrderService.downloadExcel1(unitslno,id, response);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
        return await this.purchaseOrderService.downloadExcel(unitslno,request, response);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post("save")
    create(@Body() purchaseorderDTO: PurchaseorderDTO): Promise<Purchaseorder001wb> {
        // console.log("PurchaseorderDTO",purchaseorderDTO.orderitemSlno2.purchaseorder001wbs);
        return this.purchaseOrderService.create(purchaseorderDTO);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('UpdatePO/:approvel/:pchaseslno/:remarks')
    UpdatePO(@Param('approvel') approvel: any, @Param('pchaseslno') pchaseslno: any, @Param('remarks') remarks: any): Promise<Purchaseorder001wb> {
        console.log("approvel", approvel);
        return this.purchaseOrderService.UpdatePO(approvel, pchaseslno, remarks);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAllByMetrialId/:purchseSlno')
    findAllByMetrialId(@Param('purchseSlno') purchseSlno: number): Promise<Purchaseorder001wb> {
        return this.purchaseOrderService.findOne(purchseSlno);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('getCount')
    getCount(): Promise<string> {
        return this.purchaseOrderService.getCount();
    }


    @hasRole(Role.superadmin, Role.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put("update")
    update(@Body() purchaseorderDTO: PurchaseorderDTO): Promise<Purchaseorder001wb> {
        // console.log("PurchaseorderDTO",purchaseorderDTO.orderslno);
        return this.purchaseOrderService.update(purchaseorderDTO);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAll/:unitslno')
    findAll(@Param('unitslno') unitslno: any): Promise<Purchaseorder001wb[]> {
        return this.purchaseOrderService.findAll(unitslno);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Purchaseorder001wb> {
        return this.purchaseOrderService.findOne(id);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':purchseId')
    findById(@Param('purchseId') purchseId: any): Promise<Purchaseorder001wb> {
        return this.purchaseOrderService.findById(purchseId);
    }

    @hasRole(Role.superadmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.purchaseOrderService.remove(id);
    }

}