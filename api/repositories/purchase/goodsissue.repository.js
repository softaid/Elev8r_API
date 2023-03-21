let goodsissueRepository = function (pool, log) {
    
    // get shed wise warehouse
    this.getWarehouse= async function (req, goosIssue) {
      try {
          return await pool.query(req, "call spc_modeule_shedwise_warehouse(?,?)",
          [
            goosIssue.moduleid,
            goosIssue.shedid
          ]);
      }
      catch (err) {
          console.log('Error thrown : ', err);
          log.dbErrorLog("goosIssue.service - getWarehouse", err);
      } 
      return null;
  };

 
   // save Purchaseinvoice
   this.saveGoodsIssue = async function (req, goosIssue) {
       try {
               var sp_text = "SET @out_id = 0; call spc_purchase_goods_issue_save(?,?,?,?,?,?,?,?,?,?,@out_id); SELECT @out_id as id;";                  
               return await pool.query(req, sp_text,                       
                   [
                       goosIssue["id"] != null ? parseInt(goosIssue.id) : null,
                       goosIssue.issueno,
                       goosIssue.issuedate, 
                       parseInt(goosIssue.moduleid), 
                       goosIssue["batchid"] != null ? parseInt(goosIssue.batchid) : null,
                       parseInt(goosIssue.statusid), 
                       goosIssue.remark, 
                       parseFloat(goosIssue.totalcost), 
                       parseInt(goosIssue.companyid),
                       parseInt(goosIssue.userid)   
                   ]);
       }
       catch (err) {
           console.log('Error thrown : ', err);
           log.dbErrorLog("goosIssue.service-saveGoodsIssue", err);
       }
       return null;
   };

   this.getAllGoodsIssue= async function (req, goosIssue) {
   try {
       return await pool.query(req, "call spc_purchase_goods_issue_search(?)",
       [
        goosIssue.companyid
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("goosIssue.service - getAllGoodsIssue", err);
   } 
   return null;
};

this.getGoodsIssue= async function (req, goosIssue) {
    try {
        return await pool.query(req, "call spc_purchase_goods_issue_select(?)",
        [
         goosIssue.id
        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("goosIssue.service - getAllGoodsIssue", err);
    } 
    return null;
 };

 this.getitembatchByModulewise= async function (req, goosIssue) {
     console.log(goosIssue)
    try {
        return await pool.query(req, "call spc_itembatch_modulewise_byitemid(?,?,?,?,?)",
        [
          goosIssue.moduleid,
          goosIssue["shedid"] != null ? (goosIssue.shedid) : null,
          goosIssue.itemid,
          goosIssue.warehouseid,
          goosIssue.companyid,
        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("goosIssue.service - getitembatchByModulewise", err);
    } 
    return null;
};

this.saveGoodsIssueJe = async function (req, goosIssue) {
    try {
        return await pool.query(req, "call spc_savegoods_issue_je(?,?,?)",
        [
            goosIssue.issueid,
            goosIssue.companyid,
            goosIssue.userid
        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("goosIssue.service - saveGoodsIssueJe", err);
    } 
    return null;
};
this.saveMOmFromGoodsIssue = async function (req, goosIssue) {
    try {
        return await pool.query(req, "call spc_mom_fromgoodsissue(?,?,?)",
        [
            goosIssue.issueid,
            goosIssue.companyid,
            goosIssue.userid
        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("goosIssue.service - saveMOmFromGoodsIssue", err);
    } 
    return null;
};



};
   
module.exports =goodsissueRepository;