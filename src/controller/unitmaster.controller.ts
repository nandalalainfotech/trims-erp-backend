import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UnitMasterDTO } from "src/dto/usermaster.dto";
import { Unitmaster001mb } from "src/entity/Unitmaster001mb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { UnitMasterService } from "src/service/unitmaster.service";

@Controller('/testandreportstudio/api/unitmaster')
export class UnitMasterController {
    constructor(private readonly unitMasterService: UnitMasterService) { }

    // @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAll')
    findAll(): Promise<Unitmaster001mb[]> {
        return this.unitMasterService.findAll();
    }

    @hasRole(Role.superadmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post("save")
    create(@Body() unitMasterDTO: UnitMasterDTO): Promise<Unitmaster001mb> {
        return this.unitMasterService.create(unitMasterDTO);
    }

    @hasRole(Role.superadmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put("update")
    update(@Body() unitMasterDTO: UnitMasterDTO): Promise<Unitmaster001mb> {
        return this.unitMasterService.update(unitMasterDTO);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Unitmaster001mb> {
        return this.unitMasterService.findOne(id);
    }

    @hasRole(Role.superadmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.unitMasterService.remove(id);
    }
}