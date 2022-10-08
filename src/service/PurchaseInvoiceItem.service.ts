import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Purchaseinvoiceitems001wb } from "src/entity/Purchaseinvoiceitems001wb";
import { Repository } from "typeorm";

@Injectable()
export class PurchaseInvoiceItemService {
    constructor(

        @InjectRepository(Purchaseinvoiceitems001wb) private readonly purchaseInvoiceItemRepository: Repository<Purchaseinvoiceitems001wb>) {}


        async findAll(unitslno:any): Promise<Purchaseinvoiceitems001wb[]> {
            return await this.purchaseInvoiceItemRepository.find({order: { slNo: "DESC" },where:{unitslno:unitslno}})
        }
    }