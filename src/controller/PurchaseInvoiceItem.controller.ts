import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Purchaseinvoiceitems001wb } from "src/entity/Purchaseinvoiceitems001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { PurchaseInvoiceItemService } from "src/service/PurchaseInvoiceItem.service";

@Controller('/testandreportstudio/api/PurchaseInvoicePayItem')

export class PurchaseInvoiceItemController {
	constructor(private readonly purchaseInvoiceItemService: PurchaseInvoiceItemService) { }

    
	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Purchaseinvoiceitems001wb[]> {
		return this.purchaseInvoiceItemService.findAll(unitslno);
	}
}