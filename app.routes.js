
let appRouters = function (env, app, Container) {

    let container = new Container();

    // container.register('environment', { env: env });
    // container.register('bcrypt', require('bcryptjs'));
    // container.register('jwt', require('jsonwebtoken'));
    // container.register('nconf', require('nconf'));
    // container.register('config', require('./config.js'), ['nconf', 'environment']);
    
    // container.register('pool', require('./util/mysql.repository'), ['config']);
    
    container.register('environment', { env: env });
    container.register('bcrypt', require('bcryptjs'));
    container.register('jwt', require('jsonwebtoken'));
    container.register('nconf', require('nconf'));
    container.register('devconfig', require('./config/development'));
    container.register('prodconfig', require('./config/production'));
    container.register('config', require('./config.js'), ['nconf', 'environment']);
    container.register('pool', require('./util/mysql.repository'), ['devconfig', 'prodconfig', 'environment']);
    container.register('crypto', require('crypto'));
    
    container.register('logRepository', require('./util/log.repository'), ['pool']);
    container.register('oauthRepository', require('./api/auth/oauth.repository'), ['jwt', 'logRepository']);
    container.register('userRepository', require('./api/repositories/accounts/user.repository'), ['pool', 'logRepository']);
    container.register('loginRepository', require('./api/repositories/login.repository'), ['pool', 'logRepository']);
    container.register('manageuserRepository', require('./api/repositories/company/manageuser.repository'), ['pool', 'logRepository' ]);
    container.register('managesubscriptionRepository', require('./api/repositories/company/managesubscription.repository'), ['pool', 'logRepository' ]);
    container.register('manageentityRepository', require('./api/repositories/application/manageentity.repository'), ['pool', 'logRepository' ]);
    container.register('roleaccessRepository', require('./api/repositories/application/rolepermissions.repository'), ['pool', 'logRepository' ]);
    container.register('rolepermissionsRepository', require('./api/repositories/application/roleaccess.repository'), ['pool', 'logRepository' ]);
    container.register('managepermissionRepository', require('./api/repositories/application/managepermission.repository'), ['pool', 'logRepository' ]);
    container.register('warehouseRepository', require('./api/repositories/common/warehouse.repository'), ['pool', 'logRepository' ]);
    container.register('warehousebinRepository', require('./api/repositories/common/warehousebin.repository'), ['pool', 'logRepository' ]);
    container.register('commonRepository', require('./api/repositories/common.repository'), ['pool', 'logRepository' ]);
    //purchase Repositories
    container.register('purchaseorderRepository', require('./api/repositories/purchase/purchaseorder.repository'), ['pool', 'logRepository' ]);
    container.register('purchaseorderdetailRepository', require('./api/repositories/purchase/purchaseorderdetail.repository'), ['pool', 'logRepository' ]);
    container.register('purchaserequestRepository', require('./api/repositories/purchase/purchaserequest.repository'), ['pool', 'logRepository' ]);
    container.register('purchaseinvoiceRepository', require('./api/repositories/purchase/purchaseinvoice.repository'), ['pool', 'logRepository' ]);
	container.register('stockadjustmentRepository', require('./api/repositories/purchase/stockadjustment.repository'), ['pool', 'logRepository' ]);
	container.register('purchasereturnRepository', require('./api/repositories/purchase/purchasereturn.repository'), ['pool', 'logRepository' ]);
	container.register('salesreturnRepository', require('./api/repositories/sales/salesreturn.repository'), ['pool', 'logRepository' ]);
    container.register('purchaseinvoicedetailRepository', require('./api/repositories/purchase/purchaseinvoicedetail.repository'), ['pool', 'logRepository' ]);
    container.register('servicepoRepository', require('./api/repositories/purchase/servicepo.repository'), ['pool', 'logRepository' ]);
    container.register('servicepodetailRepository', require('./api/repositories/purchase/servicepodetail.repository'), ['pool', 'logRepository' ]);
    container.register('freightdetailRepository', require('./api/repositories/purchase/freightdetail.repository'), ['pool', 'logRepository' ]);
    container.register('purchasereportsRepository', require('./api/repositories/reports/purchasereports.repository'), ['pool', 'logRepository' ]);
    container.register('goodsissueRepository', require('./api/repositories/purchase/goodsissue.repository'), ['pool', 'logRepository' ]);
    container.register('goodsissuedetailRepository', require('./api/repositories/purchase/goodsissuedetail.repository'), ['pool', 'logRepository' ]);




    //Sales Repositories
    container.register('salesorderRepository', require('./api/repositories/sales/salesorder.repository'), ['pool', 'logRepository' ]);
    container.register('salesorderdetailRepository', require('./api/repositories/sales/salesorderdetail.repository'), ['pool', 'logRepository' ]);
    container.register('salesdeliveryRepository', require('./api/repositories/sales/salesdelivery.repository'), ['pool', 'logRepository' ]);
    container.register('salesdeliverydetailRepository', require('./api/repositories/sales/salesdeliverydetail.repository'), ['pool', 'logRepository' ]);
    container.register('salesinvoiceRepository', require('./api/repositories/sales/salesinvoice.repository'), ['pool', 'logRepository' ]);
    container.register('salesinvoicedetailRepository', require('./api/repositories/sales/salesinvoicedetail.repository'), ['pool', 'logRepository' ]);
    container.register('salesinvoicefreightRepository', require('./api/repositories/sales/salesinvoicefreight.repository'), ['pool', 'logRepository' ]);
    container.register('breederbirdsalesorderRepository', require('./api/repositories/sales/breederbirdsalesorder.repository'), ['pool', 'logRepository' ]);
    container.register('breederbirdsalesorderdetailRepository', require('./api/repositories/sales/breederbirdsalesorderdetail.repository'), ['pool', 'logRepository' ]);
    container.register('breederliftingscheduleRepository', require('./api/repositories/sales/breederliftingschedule.repository'), ['pool', 'logRepository' ]);
    container.register('breederliftingscheduledetailRepository', require('./api/repositories/sales/breederliftingscheduledetail.repository'), ['pool', 'logRepository' ]);
    container.register('breederliftingWeightRepository', require('./api/repositories/sales/breederliftingweight.repository'), ['pool', 'logRepository' ]);
    container.register('breederliftingweightDetailRepository', require('./api/repositories/sales/breederliftingweightdetail.repository'), ['pool', 'logRepository' ]);

    // common repositories
    container.register('materialtransferRepository', require('./api/repositories/common/materialtransfer.repository'), ['pool', 'logRepository' ]);    
    container.register('materialtransferdetailsRepository', require('./api/repositories/common/materialtransferdetails.repository'), ['pool', 'logRepository' ]);     
    container.register('materialissueRepository', require('./api/repositories/common/materialissue.repository'), ['pool', 'logRepository' ]);    
    container.register('materialrequestRepository', require('./api/repositories/common/materialrequest.repository'), ['pool', 'logRepository' ]);        
    container.register('materialrequestdetailRepository', require('./api/repositories/common/materialrequestdetail.repository'), ['pool', 'logRepository' ]);        
    container.register('materialreceiptRepository', require('./api/repositories/common/materialreceipt.repository'), ['pool', 'logRepository' ]);        
    container.register('materialreceiptdetailRepository', require('./api/repositories/common/materialreceiptdetail.repository'), ['pool', 'logRepository' ]);    
    container.register('materialissueRepository', require('./api/repositories/common/materialissue.repository'), ['pool', 'logRepository' ]);        
    container.register('materialissuedetailRepository', require('./api/repositories/common/materialissuedetail.repository'), ['pool', 'logRepository' ]);            
    container.register('grpoRepository', require('./api/repositories/common/grpo.repository'), ['pool', 'logRepository' ]);            
    container.register('grpoDetailRepository', require('./api/repositories/common/grpodetails.repository'), ['pool', 'logRepository' ]);            
    container.register('itemRepository', require('./api/repositories/common/item.repository'), ['pool', 'logRepository' ]);            
    container.register('itemgroupRepository', require('./api/repositories/common/itemgroup.repository'), ['pool', 'logRepository' ]);            
    container.register('itemhsnRepository', require('./api/repositories/common/itemhsn.repository'), ['pool', 'logRepository' ]);            
    
    // end common repositories

    container.register('salereportsRepository', require('./api/repositories/reports/salereports.repository'), ['pool', 'logRepository' ]);        

    //Accounts repositories start
    container.register('bankRepository', require('./api/repositories/accounts/bank.repository'), ['pool', 'logRepository']);
    container.register('partyRepository', require('./api/repositories/accounts/party.repository'), ['pool', 'logRepository']);
    container.register('partygroupRepository', require('./api/repositories/accounts/partygroup.repository'), ['pool', 'logRepository']);
    container.register('coacategoryRepository', require('./api/repositories/accounts/coacategory.repository'), ['pool', 'logRepository']);
    container.register('projectRepository', require('./api/repositories/accounts/project.repository'), ['pool', 'logRepository']);
    container.register('branchRepository', require('./api/repositories/accounts/branch.repository'), ['pool', 'logRepository']);
    container.register('taxRepository', require('./api/repositories/accounts/tax.repository'), ['pool', 'logRepository']);
    container.register('freightRepository', require('./api/repositories/accounts/freight.repository'), ['pool', 'logRepository']);
    container.register('costcenterRepository', require('./api/repositories/accounts/costcenter.repository'), ['pool', 'logRepository']);
    container.register('dimenssionsRepository', require('./api/repositories/accounts/dimenssions.repository'), ['pool', 'logRepository']);
    container.register('partyopeningbalanceRepository', require('./api/repositories/accounts/partyopeningbalance.repository'), ['pool', 'logRepository']);
    container.register('ledgeropeningbalanceRepository', require('./api/repositories/accounts/ledgeropeningbalance.repository'), ['pool', 'logRepository']);
    container.register('itemopeningbalanceRepository', require('./api/repositories/accounts/itemopeningbalance.repository'), ['pool', 'logRepository']);
    container.register('chartofaccountRepository', require('./api/repositories/accounts/chartofaccount.repository'), ['pool', 'logRepository']);

    container.register('incomingoutgoingpaymentRepository', require('./api/repositories/accounts/incomingoutgoingpayment.repository'), ['pool', 'logRepository']);
    container.register('incomingoutgoingpaymentdetailRepository', require('./api/repositories/accounts/incomingoutgoingpaymentdetail.repository'), ['pool', 'logRepository']);
    container.register('journalentryRepository', require('./api/repositories/accounts/journalentry.repository'), ['pool', 'logRepository']);
    container.register('journalentrydetailRepository', require('./api/repositories/accounts/journalentrydetail.repository'), ['pool', 'logRepository']);

    container.register('accountsreportsRepository', require('./api/repositories/reports/accountsreports.repository'), ['pool', 'logRepository']);
    container.register('tdsRepository', require('./api/repositories/accounts/tds.repository'), ['pool', 'logRepository']);
    //Accounts repositories end

    // CBF Repositories
    container.register('commonbranchRepository', require('./api/repositories/common/commonbranch.repository'), ['pool', 'logRepository' ]);
    container.register('commonbranchlineRepository', require('./api/repositories/common/commonbranchline.repository'), ['pool', 'logRepository' ]);
    container.register('employeeRepository', require('./api/repositories/common/employee.repository'), ['pool', 'logRepository' ]);

    container.register('applicationsettingsRepository', require('./api/repositories/applicationsettings.repository'), ['pool', 'logRepository' ]);
    container.register('financialyearsettingRepository', require('./api/repositories/financialyearsetting.repository'), ['pool', 'logRepository' ]);
    container.register('financialyeardocseriesRepository', require('./api/repositories/financialyeardocseries.repository'), ['pool', 'logRepository' ]);
    container.register('notificationsettingRepository', require('./api/repositories/application/notificationsetting.repository'), ['pool', 'logRepository' ]);

    // feed mill repository start

    container.register('billofmaterialRepository', require('./api/repositories/feedmill/billofmaterial.repository'), ['pool', 'logRepository' ]);
    container.register('billofmaterialdetailRepository', require('./api/repositories/feedmill/billofmaterialdetail.repository'), ['pool', 'logRepository' ]);

    container.register('leadmasterRepository', require('./api/repositories/leadmanagement/leadmaster.repository'), ['pool', 'logRepository' ]);
    container.register('leadRepository', require('./api/repositories/leadmanagement/lead.repository'), ['pool', 'logRepository' ]);

    //repository end

    //Services
    container.register('loginService', require('./api/services/login.service'), ['loginRepository', 'bcrypt', 'jwt', 'logRepository']);
    container.register('userService', require('./api/services/accounts/user.service'), ['userRepository','bcrypt', 'oauthRepository', 'logRepository']);    
    container.register('manageuserService', require('./api/services/company/manageuser.service'), ['manageuserRepository', 'oauthRepository', 'logRepository' ]);
    container.register('managesubscriptionService', require('./api/services/company/managesubscription.service'), ['managesubscriptionRepository', 'oauthRepository', 'logRepository' ]);
    container.register('manageentityService', require('./api/services/application/manageentity.service'), ['manageentityRepository', 'oauthRepository', 'logRepository' ]);    
    container.register('managepermissionService', require('./api/services/application/managepermission.service'), ['managepermissionRepository', 'oauthRepository', 'logRepository' ]);    
    container.register('roleaccessService', require('./api/services/application/roleaccess.service'), ['roleaccessRepository', 'oauthRepository', 'logRepository' ]);    
    container.register('rolepermissionsService', require('./api/services/application/rolepermissions.service'), ['rolepermissionsRepository', 'oauthRepository', 'logRepository' ]);    
    
    container.register('warehouseService', require('./api/services/common/warehouse.service'), ['warehouseRepository', 'oauthRepository', 'logRepository' ]);
    container.register('warehousebinService', require('./api/services/common/warehousebin.service'), ['warehousebinRepository', 'oauthRepository', 'logRepository' ]);
    container.register('commonService', require('./api/services/common.service'), ['commonRepository', 'oauthRepository', 'logRepository', 'devconfig' ]);    
    
    // common service 
    container.register('materialtransferService', require('./api/services/common/materialtransfer.service'), ['materialtransferRepository', 'oauthRepository', 'logRepository' ]);    
    container.register('materialissueService', require('./api/services/common/materialissue.service'), ['materialissueRepository', 'oauthRepository', 'logRepository' ]);    
    container.register('materialtransferdetailsService', require('./api/services/common/materialtransferdetails.service'), ['materialtransferdetailsRepository', 'oauthRepository', 'logRepository' ]);    
    
    
    container.register('materialrequestService', require('./api/services/common/materialrequest.service'), ['materialrequestRepository', 'oauthRepository', 'logRepository' ]);    
    container.register('materialrequestdetailService',require('./api/services/common/materialrequestdetail.service'), ['materialrequestdetailRepository', 'oauthRepository', 'logRepository' ]);
    container.register('materialreceiptService', require('./api/services/common/materialreceipt.service'), ['materialreceiptRepository', 'oauthRepository', 'logRepository' ]);    
    container.register('materialreceiptdetailService',require('./api/services/common/materialreceiptdetail.service'), ['materialreceiptdetailRepository', 'oauthRepository', 'logRepository' ]);
    container.register('materialissueService', require('./api/services/common/materialissue.service'), ['materialissueRepository', 'oauthRepository', 'logRepository' ]);    
    container.register('materialissuedetailService',require('./api/services/common/materialissuedetail.service'), ['materialissuedetailRepository', 'oauthRepository', 'logRepository' ]);

   //purchase Services
    container.register('purchaseorderService',require('./api/services/purchase/purchaseorder.service'), ['purchaseorderRepository', 'oauthRepository', 'logRepository' ]);
    container.register('purchaseorderdetailService',require('./api/services/purchase/purchaseorderdetail.service'), ['purchaseorderdetailRepository', 'oauthRepository', 'logRepository' ]);
    container.register('purchaserequestService',require('./api/services/purchase/purchaserequest.service'), ['purchaserequestRepository', 'oauthRepository', 'logRepository' ]);
    container.register('purchaseinvoiceService',require('./api/services/purchase/purchaseinvoice.service'), ['purchaseinvoiceRepository', 'oauthRepository', 'logRepository' ]);
	
	container.register('stockadjustmentService',require('./api/services/purchase/stockadjustment.service'), ['stockadjustmentRepository', 'oauthRepository', 'logRepository' ]);
	container.register('purchasereturnService',require('./api/services/purchase/purchasereturn.service'), ['purchasereturnRepository', 'oauthRepository', 'logRepository' ]);
	container.register('salesreturnService',require('./api/services/sales/salesreturn.service'), ['salesreturnRepository', 'oauthRepository', 'logRepository' ]);
    container.register('purchaseinvoicedetailService',require('./api/services/purchase/purchaseinvoicedetail.service'), ['purchaseinvoicedetailRepository', 'oauthRepository', 'logRepository' ]);
    container.register('servicepoService', require('./api/services/purchase/servicepo.service'), ['servicepoRepository', 'oauthRepository', 'logRepository' ]);
    container.register('servicepodetailService', require('./api/services/purchase/servicepodetail.service'), ['servicepodetailRepository', 'oauthRepository', 'logRepository' ]); 
    container.register('freightdetailService', require('./api/services/purchase/freightdetail.service'), ['freightdetailRepository', 'oauthRepository', 'logRepository' ]); 
    container.register('purchasereportsService', require('./api/services/reports/purchasereports.service'), ['purchasereportsRepository', 'oauthRepository', 'logRepository' ]); 
    container.register('goodsissueService', require('./api/services/purchase/goodsissue.service'), ['goodsissueRepository', 'oauthRepository', 'logRepository' ]); 
    container.register('goodsissuedetailService', require('./api/services/purchase/goodsissuedetail.service'), ['goodsissuedetailRepository', 'oauthRepository', 'logRepository' ]); 

    //Sales Services

    container.register('salesorderService',require('./api/services/breedersales/salesorder.service'), ['salesorderRepository', 'oauthRepository', 'logRepository' ]);
    container.register('salesorderdetailService',require('./api/services/breedersales/salesorderdetail.service'), ['salesorderdetailRepository', 'oauthRepository', 'logRepository' ]);
    container.register('salesdeliveryService',require('./api/services/breedersales/salesdelivery.service'), ['salesdeliveryRepository', 'oauthRepository', 'logRepository' ]);
    container.register('salesdeliverydetailService',require('./api/services/breedersales/salesdeliverydetail.service'), ['salesdeliverydetailRepository', 'oauthRepository', 'logRepository' ]);
    container.register('salesinvoiceService',require('./api/services/breedersales/salesinvoice.service'), ['salesinvoiceRepository', 'oauthRepository', 'logRepository' ]);
    container.register('salesinvoicedetailService',require('./api/services/breedersales/salesinvoicedetail.service'), ['salesinvoicedetailRepository', 'oauthRepository', 'logRepository' ]);
    container.register('salesinvoicefreightService',require('./api/services/breedersales/salesinvoicefreight.service'), ['salesinvoicefreightRepository', 'oauthRepository', 'logRepository' ]);
    container.register('breederbirdsalesorderService',require('./api/services/breedersales/breederbirdsalesorder.service'), ['breederbirdsalesorderRepository', 'oauthRepository', 'logRepository' ]);
    container.register('breederbirdsalesorderdetailService',require('./api/services/breedersales/breederbirdsalesorderdetail.service'), ['breederbirdsalesorderdetailRepository', 'oauthRepository', 'logRepository' ]);
    container.register('breederliftingscheduleService',require('./api/services/breedersales/breederliftingschedule.service'), ['breederliftingscheduleRepository', 'oauthRepository', 'logRepository' ]);
    container.register('breederliftingscheduledetailService',require('./api/services/breedersales/breederliftingscheduledetail.service'), ['breederliftingscheduledetailRepository', 'oauthRepository', 'logRepository' ]);
    container.register('breederliftingweightService',require('./api/services/breedersales/breederliftingweight.service'), ['breederliftingWeightRepository', 'oauthRepository', 'logRepository' ]);
    container.register('breederliftingweightdetailService',require('./api/services/breedersales/breederliftingweightdetail.service'), ['breederliftingweightDetailRepository', 'oauthRepository', 'logRepository' ]);


    
    container.register('grpoService', require('./api/services/common/grpo.service'), ['grpoRepository', 'oauthRepository', 'logRepository' ]);    
    container.register('grpoDetailService', require('./api/services/common/grpodetail.service'), ['grpoDetailRepository', 'oauthRepository', 'logRepository' ]);    
    container.register('itemService', require('./api/services/common/item.service'), ['itemRepository', 'oauthRepository', 'logRepository' ]);    
    container.register('itemGroupService', require('./api/services/common/itemgroup.service'), ['itemgroupRepository', 'oauthRepository', 'logRepository' ]);    
    container.register('itemHSNService', require('./api/services/common/itemhsn.service'), ['itemhsnRepository', 'oauthRepository', 'logRepository' ]);    
    container.register('hatcheryreportsService', require('./api/services/reports/hatcheryreports.service'), ['hatcheryreportsRepository', 'oauthRepository', 'logRepository' ]);  
    container.register('salereportsService', require('./api/services/reports/salereports.service'), ['salereportsRepository', 'oauthRepository', 'logRepository' ]);    
  
    // end common services

    //Accounts Services Start
    container.register('bankService', require('./api/services/accounts/bank.service'), ['bankRepository', 'oauthRepository', 'logRepository']);
    container.register('partyService', require('./api/services/accounts/party.service'), ['partyRepository', 'oauthRepository', 'logRepository']);    
    container.register('partygropuService', require('./api/services/accounts/partygroup.service'), ['partygroupRepository', 'oauthRepository', 'logRepository']);    
    container.register('coacategoryService', require('./api/services/accounts/coacategory.service'), ['coacategoryRepository', 'oauthRepository', 'logRepository']);    
    container.register('projectService', require('./api/services/accounts/project.service'), ['projectRepository', 'oauthRepository', 'logRepository']);    
    container.register('branchService', require('./api/services/accounts/branch.service'), ['branchRepository', 'oauthRepository', 'logRepository']);
    container.register('taxService', require('./api/services/accounts/tax.service'), ['taxRepository', 'oauthRepository', 'logRepository']);
    container.register('freightService', require('./api/services/accounts/freight.service'), ['freightRepository', 'oauthRepository', 'logRepository']);
    container.register('dimenssionsService', require('./api/services/accounts/dimenssions.service'), ['dimenssionsRepository', 'oauthRepository', 'logRepository']);
    container.register('costcenterService', require('./api/services/accounts/costcenter.service'), ['costcenterRepository', 'oauthRepository', 'logRepository']);
    container.register('partyopeningbalanceService', require('./api/services/accounts/partyopeningbalance.service'), ['partyopeningbalanceRepository', 'oauthRepository', 'logRepository']);
    container.register('ledgeropeningbalanceService', require('./api/services/accounts/ledgeropeningbalance.service'), ['ledgeropeningbalanceRepository', 'oauthRepository', 'logRepository']);    
    container.register('itemopeningbalanceService', require('./api/services/accounts/itemopeningbalance.service'), ['itemopeningbalanceRepository', 'oauthRepository', 'logRepository']);    
    container.register('chartofaccountService', require('./api/services/accounts/chartofaccount.service'), ['chartofaccountRepository', 'oauthRepository', 'logRepository']);

    container.register('incomingoutgoingpaymentService', require('./api/services/accounts/incomingoutgoingpayment.service'), ['incomingoutgoingpaymentRepository', 'oauthRepository', 'logRepository']);
    container.register('incomingoutgoingpaymentdetailService', require('./api/services/accounts/incomingoutgoingpaymentdetail.service'), ['incomingoutgoingpaymentdetailRepository', 'oauthRepository', 'logRepository']);
    container.register('journalentryService', require('./api/services/accounts/journalentry.service'), ['journalentryRepository', 'oauthRepository', 'logRepository']);
    container.register('journalentrydetailService', require('./api/services/accounts/journalentrydetail.service'), ['journalentrydetailRepository', 'oauthRepository', 'logRepository']);

    container.register('accountsreportService', require('./api/services/reports/accountsreports.service'), ['accountsreportsRepository', 'oauthRepository', 'logRepository']);
    container.register('tdsService', require('./api/services/accounts/tds.service'), ['tdsRepository', 'oauthRepository', 'logRepository']);

    //Accounts Services End 

     // container.register('cbfdashboardService', require('./api/services/cbf/cbfdashboard.service'), ['cbfDashboardRepository', 'oauthRepository', 'logRepository' ]);    
     
    container.register('commonbranchService', require('./api/services/common/commonbranch.service'), ['commonbranchRepository', 'oauthRepository', 'logRepository' ]);    
    container.register('commonbranchlineService', require('./api/services/common/commonbranchline.service'), ['commonbranchlineRepository', 'oauthRepository', 'logRepository' ]);    
    container.register('employeeService', require('./api/services/common/employee.service'), ['employeeRepository', 'oauthRepository', 'logRepository' ]);
    container.register('documentcollectionService', require('./api/services/cbf/cbfdocumentcollection.service'), ['cbfdocumentcollectionrepository', 'oauthRepository', 'logRepository']);
    
    container.register('documentcollectiondetailsService', require('./api/services/cbf/cbfdocumentcollectiondetails.service'), ['cbfdocumentCollectionDetailsRepository', 'oauthRepository', 'logRepository']);

    container.register('applicationsettingsService', require('./api/services/applicationsettings.service'), ['applicationsettingsRepository', 'oauthRepository', 'logRepository' ]);
    container.register('financialyearsettingService', require('./api/services/financialyearsetting.service'), ['financialyearsettingRepository', 'oauthRepository', 'logRepository' ]);
    container.register('financialyeardocseriesService', require('./api/services/financialyeardocseries.service'), ['financialyeardocseriesRepository', 'oauthRepository', 'logRepository' ]);
    container.register('notificationsettingService', require('./api/services/application/notificationsetting.service'), ['notificationsettingRepository', 'oauthRepository', 'logRepository' ]);    

    //feedmil service start
    container.register('billofmaterialService', require('./api/services/feedmill/billofmaterial.service'), ['billofmaterialRepository', 'oauthRepository', 'logRepository' ]);
    container.register('billofmaterialdetailService', require('./api/services/feedmill/billofmaterialdetail.service'), ['billofmaterialdetailRepository', 'oauthRepository', 'logRepository' ]);
    // feedmill service end

    //Lead management service start

    container.register('leadmasterService', require('./api/services/leadmanagement/leadmaster.service'), ['leadmasterRepository', 'oauthRepository', 'logRepository' ]);
    container.register('leadService', require('./api/services/leadmanagement/lead.service'), ['leadRepository', 'oauthRepository', 'logRepository' ]);

    //Lead management service end
    //service

    // Routes
    let loginService = container.get('loginService');
    app.use('/login', loginService);
    
    let userService = container.get('userService');
    app.use('/user', userService);
    
    let manageUserService = container.get('manageuserService');
    app.use('/manageuser', manageUserService);

    let managesubscriptionService = container.get('managesubscriptionService');
    app.use('/managesubscription', managesubscriptionService);

    let manageentityService = container.get('manageentityService');
    app.use('/manageentity', manageentityService);

    let managepermissionService = container.get('managepermissionService');
    app.use('/managepermission', managepermissionService);

    let roleaccessService = container.get('roleaccessService');
    app.use('/roleaccess', roleaccessService);

    let rolepermissionsService = container.get('rolepermissionsService');
    app.use('/rolepermissions', rolepermissionsService);

    var warehouseService = container.get('warehouseService');
    app.use('/warehouse', warehouseService);
    
    var warehousebinService = container.get('warehousebinService');
    app.use('/warehousebin', warehousebinService);
    
    var commonService = container.get('commonService');
    app.use('/common', commonService);

    var materialrequestService = container.get('materialrequestService');
    app.use('/materialrequest', materialrequestService);

    var materialrequestdetailService = container.get('materialrequestdetailService');
    app.use('/materialrequestdetail', materialrequestdetailService);

    var materialreceiptService = container.get('materialreceiptService');
    app.use('/materialreceipt', materialreceiptService);

    var materialreceiptdetailService = container.get('materialreceiptdetailService');
    app.use('/materialreceiptdetail', materialreceiptdetailService);

    var materialissueService = container.get('materialissueService');
    app.use('/materialissue', materialissueService);

    var materialissuedetailService = container.get('materialissuedetailService');
    app.use('/materialissuedetail', materialissuedetailService);

    var materialtransferService = container.get('materialtransferService');
    app.use('/materialtransfer', materialtransferService);

    var materialtransferdetailsService = container.get('materialtransferdetailsService');
    app.use('/materialtransferdetails', materialtransferdetailsService);

    var purchaseorderService = container.get('purchaseorderService');
    app.use('/purchaseorder', purchaseorderService);

    var purchaseorderdetailService = container.get('purchaseorderdetailService');
    app.use('/purchaseorderdetail', purchaseorderdetailService);

    var purchaserequestService = container.get('purchaserequestService');
    app.use('/purchaserequest', purchaserequestService);
    
    var itemService = container.get('itemService');
    app.use('/item', itemService);

    var itemGroupService = container.get('itemGroupService');
    app.use('/itemgroup', itemGroupService);

    var itemHSNService = container.get('itemHSNService');
    app.use('/itemhsn', itemHSNService);

    var purchaseinvoiceService = container.get('purchaseinvoiceService');
    app.use('/purchaseinvoice', purchaseinvoiceService);
	
	var salesreturnService = container.get('salesreturnService');
    app.use('/salesreturn', salesreturnService);
	
    var purchaseinvoicedetailService = container.get('purchaseinvoicedetailService');
    app.use('/purchaseinvoicedetail', purchaseinvoicedetailService);
    
    var servicepoService = container.get('servicepoService');
    app.use('/servicepo', servicepoService);

    var servicepodetailService = container.get('servicepodetailService');
    app.use('/servicepodetail', servicepodetailService);

    let bankService = container.get('bankService');
    app.use('/bank', bankService);

    var partygropuService = container.get('partygropuService');
    app.use('/partygroup', partygropuService);

    var partyService = container.get('partyService');
    app.use('/party', partyService);

    var coacategoryService = container.get('coacategoryService');
    app.use('/coacategory', coacategoryService);

    var projectService = container.get('projectService');
    app.use('/project', projectService);

    var branchService = container.get('branchService');
    app.use('/branch', branchService);

    var taxService = container.get('taxService');
    app.use('/tax', taxService);

    var chartofaccountService = container.get('chartofaccountService');
    app.use('/chartofaccount', chartofaccountService);

    var incomingoutgoingpaymentService = container.get('incomingoutgoingpaymentService');
    app.use('/payment', incomingoutgoingpaymentService);

    var incomingoutgoingpaymentdetailService = container.get('incomingoutgoingpaymentdetailService');
    app.use('/paymentdetail', incomingoutgoingpaymentdetailService);

    var journalentryService = container.get('journalentryService');
    app.use('/journalentry', journalentryService);

    var journalentrydetailService = container.get('journalentrydetailService');
    app.use('/journalentrydetail', journalentrydetailService);

    var accountsreportService = container.get('accountsreportService');
    app.use('/accountsreports', accountsreportService);

    //end account module routes
   
    var documentcollectionService = container.get('documentcollectionService');
    app.use('/documentcollection', documentcollectionService);
    
    var documentcollectiondetailsService = container.get('documentcollectiondetailsService');
    app.use('/documentcollectiondetails', documentcollectiondetailsService);

    var commonbranchService = container.get('commonbranchService');
    app.use('/commonbranch', commonbranchService);

    var commonbranchlineService = container.get('commonbranchlineService');
    app.use('/commonbranchline', commonbranchlineService);

    var employeeService = container.get('employeeService');
    app.use('/employee', employeeService);

    // END CBF routes

    var applicationsettingsService = container.get('applicationsettingsService');
    app.use('/applicationsettings', applicationsettingsService);

    var financialyearsettingService = container.get('financialyearsettingService');
    app.use('/financialyearsetting', financialyearsettingService);

    var financialyeardocseriesService = container.get('financialyeardocseriesService');
    app.use('/financialyeardocseries', financialyeardocseriesService);

    var notificationsettingService = container.get('notificationsettingService');
    app.use('/notificationsetting', notificationsettingService);
    
    // Sales routes 

    var salesorderService = container.get('salesorderService');
    app.use('/salesorder', salesorderService);

    var salesorderdetailService = container.get('salesorderdetailService');
    app.use('/salesorderdetail', salesorderdetailService);

    var salesdeliveryService = container.get('salesdeliveryService');
    app.use('/salesdelivery', salesdeliveryService);

    var salesdeliverydetailService = container.get('salesdeliverydetailService');
    app.use('/salesdeliverydetail', salesdeliverydetailService);

    var salesinvoiceService = container.get('salesinvoiceService');
    app.use('/salesinvoice', salesinvoiceService);

    var salesinvoicedetailService = container.get('salesinvoicedetailService');
    app.use('/salesinvoicedetail', salesinvoicedetailService);

    var salesinvoicefreightService = container.get('salesinvoicefreightService');
    app.use('/salesinvoicefreight', salesinvoicefreightService);
   
   
    // Feed Mill routes
    var billofmaterialService = container.get('billofmaterialService');
    app.use('/billofmaterial', billofmaterialService);
    
    var billofmaterialdetailService = container.get('billofmaterialdetailService');
    app.use('/billofmaterialdetail', billofmaterialdetailService);

    var commondashboardService = container.get('commondashboardService');
    app.use('/commondashboard', commondashboardService);

    // Lead Management
    var leadmasterService = container.get('leadmasterService');
    app.use('/leadmaster', leadmasterService);

    var leadService = container.get('leadService');
    app.use('/lead', leadService);

}

module.exports = appRouters;
