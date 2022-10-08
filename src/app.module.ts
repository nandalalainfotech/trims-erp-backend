import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ActivityModule } from './module/activity.module';
import { AssessmentCriteriaModule } from './module/assessmentCriteria.module';
import { BankNameModule } from './module/bank.module';
import { BreakDownRegModule } from './module/breakdown-reg-wb.module';
import { BreakdownModule } from './module/breakdown-setting.module';
import { ChecklistModule } from './module/checklist.module';
import { ChildPartModule } from './module/Childpart.module';
import { ChildpartSpecificationMbModule } from './module/Childpartspecification.module';
import { CompanyModule } from './module/Companydetails.module';
import { ConsigneeModule } from './module/Consignee.module';
import { ConsumbleModule } from './module/consumble.module';
import { ConsumerSpecificationMbModule } from './module/consumblespecification.module';
import { CustemerModule } from './module/Custemer-wb-module';
import { CustemerRegistrationModule } from './module/CustemerRegistration.module';
import { CustomerConsigneeModule } from './module/customer-consignee.module';
import { CustomerContactModule } from './module/customer-contact.module';
import { CustomerModule } from './module/customer.module';
import { DailyCheckListModule } from './module/dailychecklist.module';
import { DepartmentModule } from './module/Department.module';
import { EmployeeDetailsModule } from './module/employeedetails.module';
import { EmployefModule } from './module/employf.module';
import { FileModule } from './module/file.module';
import { FirePlanModule } from './module/fireplan.module';
import { FirstaidMaterialsModule } from './module/firstaidmaterials.module';
import { FixtureModule } from './module/fixture.module';
import { FixtureBreakdownModule } from './module/fixturebreakdown.module';
import { FixtureChecklistModule } from './module/fixturechecklist.module';
import { FixturDailyCheckListModule } from './module/Fixturedailychecklis.module';
import { FixturePreventiveactionModule } from './module/fixturepreventiveaction.module';
import { FixturePreventivechecklistModule } from './module/fixturepreventivechecklist.module';
import { FixturePreventivePlanModule } from './module/fixturepreventiveplan.module';
import { FixtureRootcauseModule } from './module/fixturerootcause.module';
import { FixtureSparesModule } from './module/fixturespare.module';
import { FixtureStatusModule } from './module/Fixturestatus.module';
import { LegalModule } from './module/legal.module';
import { LegalDocumentsModule } from './module/legaldocuments.module';
import { MachineReportsModule } from './module/machine-reports.module';
import { MachineWBModule } from './module/machine-wb.module';
import { MachineModule } from './module/machine.module';
import { MaterialRequisitionModule } from './module/material-req-slip.module';
import { MaterialinspectionModule } from './module/materialinspection.module';
import { MaterialinwardModule } from './module/materialinward.module';
import { MaterialmomentsModule } from './module/Materialmoments.module';
import { MaterialreceiveditemModule } from './module/materialreceiveditem.module';
import { MateriealrequestitemModule } from './module/Materiealrequestitem.module';
import { ObservationsitemsModule } from './module/Observationsitems.module';
import { OrderItemModule } from './module/orderitem-wb.module';
import { OrederItemMbModule } from './module/orderitems.module';
import { OrderitemSpecificationMbModule } from './module/orderitemSpecification.module';
import { PartModule } from './module/Part.module';
import { PartSpecificationMbModule } from './module/partsepecific.module';
import { PartSitemMbModule } from './module/partsitem.module';
import { PartspecificationModule } from './module/PartSpecification.module';
import { PaymentModule } from './module/Payment.module';
import { PersonModule } from './module/person.module';
import { PreventiveactionModule } from './module/preventiveaction-setting.module';
import { PreventiveCheckListModule } from './module/preventivechecklist.module';
import { PreventivePlanModule } from './module/preventiveplan.module';
import { ProdModule } from './module/prod.module';
import { PurchaseableModule } from './module/puchaseble.module';
import { PurchaseInvoiceItemModule } from './module/PurchaseInvoiceItem.module';
import { PurchaseInvoicePayModule } from './module/PurchaseInvoicePay.module';
import { PurchaseOrderModule } from './module/purchaseorder.module';
import { PurchasereqitemModule } from './module/Purchasereqitem.module';
import { PurchasereqslipModule } from './module/Purchasereqslip.module';
import { RawmaterialinspectionModule } from './module/Rawmaterialinspection.module';
import { ReturnstockModule } from './module/Returnstock.module';
import { RoleModule } from './module/role.module';
import { RootcauseModule } from './module/rootcause-setting.module';
import { SafetyEquipmentsModule } from './module/safetyequipments.module';
import { SalesinvoiceModule } from './module/salesInvoice.module';
import { SalesItemModule } from './module/salesItemmaster.module';
import { SalesOrderModule } from './module/salesOrder.module';
import { SalesquotationModule } from './module/salesquotation.module';
import { SpareModule } from './module/spares.module';
import { SpecificationModule } from './module/Specification.module';
import { StatusModule } from './module/status.module';
import { StatutoryPlanModule } from './module/statutory.module';
import { SuppchecklistModule } from './module/suppchecklist.module';
import { SupplierRegistrationModule } from './module/supplier-registration.module';
import { SupplierAssessmentModule } from './module/supplierAssessment.module';
import { SupplierattendanceModule } from './module/Supplierattendancereport.module';
import { SupplierAuditModule } from './module/supplierAudit.module';
import { SupplierContactModule } from './module/SupplierContact.module';
import { SupplierQuotationModule } from './module/supplierquotation.module';
import { SupplierquotationitemModule } from './module/supplierQuotationsitems.module';
import { SupplierreportModule } from './module/supplierreportwb.module';
import { SuppliertrainingModule } from './module/suppliertraningplan.module';
import { SuppliertypeModule } from './module/Suppliertype.module';
import { SystemPropertiesModule } from './module/system-properties.module';
import { ToolModule } from './module/tool.module';
import { ToolsBreakdownModule } from './module/toolsbreakdown.module';
import { ToolsChecklistModule } from './module/toolschecklist.module';
import { ToolsMasterModule } from './module/toolsmaster.module';
import { ToolsPreventiveactionModule } from './module/toolspreventiveaction.module';
import { ToolsRootcauseModule } from './module/toolsrootcause.module';
import { ToolsSpareModule } from './module/toolsspare.module';
import { ToolsStatusModule } from './module/toolsstatus.module';
import { TrainingplanModule } from './module/Trainingplan.module';
import { UnitDepartMasterModule } from './module/unitdepartmaster.module';
import { UnitMasterModule } from './module/unitmaster.module';
import { UserModule } from './module/user.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            expandVariables: true,
            envFilePath: ['.env.configuration.dev'],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>
            ({
                type: 'mysql',
                synchronize: false,
                host: configService.get<string>('DATABASE_HOST'),
                port: Number(configService.get<string>('DATABASE_PORT')),
                username: configService.get<string>('DATABASE_USER_NAME'),
                password: configService.get<string>('DATABASE_PASSWORD'),
                database: configService.get<string>('DATABASE_NAME'),
                autoLoadEntities: true,
                entities: ['../dist/entity/*.entity.{ts,js}'],
                subscribers: ['../dist/entity/*.entity.{ts,js}'],
                migrations: ['../dist/entity/*.entity.{ts,js}'],
                namingStrategy: new SnakeNamingStrategy(),
            } as TypeOrmModuleOptions),
        }),
        AuthModule,
        MailModule,
        SystemPropertiesModule,
        RoleModule,
        UserModule,
        MachineModule,
        ChecklistModule,
        DepartmentModule,
        SpareModule,
        MachineWBModule,
        PreventiveCheckListModule,
        PreventivePlanModule,
        StatusModule,
        BreakdownModule,
        PreventiveactionModule,
        RootcauseModule,
        BreakDownRegModule,
        DailyCheckListModule,
        PersonModule,
        MachineReportsModule,
        SupplierRegistrationModule,
        AssessmentCriteriaModule,
        SupplierAssessmentModule,
        SupplierAuditModule,
        ActivityModule,
        SuppchecklistModule,
        SupplierreportModule,
        SuppliertrainingModule,
        TrainingplanModule,
        SupplierattendanceModule,
        PurchasereqslipModule,
        SupplierQuotationModule,
        PurchaseOrderModule,
        SalesOrderModule,
        MaterialinwardModule,
        MaterialRequisitionModule,
        PaymentModule,
        CompanyModule,
        ConsigneeModule,
        EmployeeDetailsModule,
        FirstaidMaterialsModule,
        SafetyEquipmentsModule,
        FirePlanModule,
        LegalDocumentsModule,
        LegalModule,
        FirstaidMaterialsModule,
        SafetyEquipmentsModule,
        FirePlanModule,
        EmployefModule,
        ProdModule,
        ToolModule,
        StatutoryPlanModule,
        FileModule,
        BankNameModule,
        PurchaseableModule,
        OrederItemMbModule,
        OrderItemModule,
        CustomerModule,
        SalesItemModule,
        CustemerRegistrationModule,
        CustemerModule,
        SalesinvoiceModule,
        FixtureModule,
        FixtureChecklistModule,
        FixtureSparesModule,
        FixtureStatusModule,
        FixtureRootcauseModule,
        FixtureBreakdownModule,
        FixturePreventiveactionModule,
        CustomerContactModule,
        FixturePreventivePlanModule,
        PartspecificationModule,
        PartModule,
        PurchasereqitemModule,
        ChildPartModule,
        ConsumbleModule,
        MaterialinspectionModule,
        MaterialreceiveditemModule,
        SpecificationModule,
        SupplierContactModule,
        SupplierquotationitemModule,
        UnitMasterModule,
        CustomerConsigneeModule,
        FixturDailyCheckListModule,
        SuppliertypeModule,
        ChildPartModule,
        ConsumbleModule,
        FixturePreventivePlanModule,
        MaterialinspectionModule,
        PurchasereqitemModule,
        PartModule,
        PartspecificationModule,
        MaterialreceiveditemModule,
        SpecificationModule,
        SupplierquotationitemModule,
        SupplierContactModule,
        ToolsStatusModule,
        ToolsMasterModule,
        ToolsSpareModule,
        ToolsBreakdownModule,
        ToolsChecklistModule,
        ToolsRootcauseModule,
        ToolsPreventiveactionModule,
        OrderitemSpecificationMbModule,
        PartSpecificationMbModule,
        ConsumerSpecificationMbModule,
        ChildpartSpecificationMbModule,
        UnitMasterModule,
        UnitDepartMasterModule,
        ChildPartModule,
        RawmaterialinspectionModule,
        ObservationsitemsModule,
        FixturePreventivechecklistModule,
        MaterialmomentsModule,
        PurchaseInvoicePayModule,
        PurchaseInvoiceItemModule,
        ReturnstockModule,
        MateriealrequestitemModule,
	SalesquotationModule,
        PartSitemMbModule

    ]
})

export class AppModule { }