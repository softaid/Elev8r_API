let goodsissuedetailRepository = function (pool, log) {

 
   // save Purchaseinvoice
   this.saveGoodsIssueDetail = async function (req, goosIssuedetail) {
       try {
               var sp_text = "SET @out_id = 0; call spc_purchase_goods_issuedetail_save(?,?,?,?,?,?,?,?,?,?,?,?,?,@out_id); SELECT @out_id as id;";                  
               return await pool.query(req, sp_text,                       
                   [
                    goosIssuedetail["id"] != null ? parseInt(goosIssuedetail.id) : null,
                       parseInt(goosIssuedetail.goodsissueid),
                       goosIssuedetail["shedid"] != null ? parseInt(goosIssuedetail.shedid) : null,
                       parseInt(goosIssuedetail.warehouseid), 
                       goosIssuedetail["warehousebinid"] != null ? parseInt(goosIssuedetail.warehousebinid) : null,
                       parseInt(goosIssuedetail.itemgroupid),
                       parseInt(goosIssuedetail.itemid),
                       parseFloat(goosIssuedetail.instock), 
                       parseFloat(goosIssuedetail.issueqty),
                       parseFloat(goosIssuedetail.unitcost), 
                       parseFloat(goosIssuedetail.itemvalue), 
                       parseInt(goosIssuedetail.companyid),
                       parseInt(goosIssuedetail.userid)   
                   ]);
       }
       catch (err) {
           console.log('Error thrown : ', err);
           log.dbErrorLog("goosIssuedetail.service-saveGoodsIssueDetail", err);
       }
       return null;
   };



this.getGoodsIssueDetail = async function (req, goosIssuedetail) {
    try {
        return await pool.query(req, "call spc_purchase_goods_issuedetail_search(?)",
        [
            goosIssuedetail.id
        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("goosIssuedetail.service - getGoodsIssueDetail", err);
    } 
    return null;
 };

this.getGoodsIssueDetailSearch = async function (req, goosIssuedetail) {
    try {
        return await pool.query(req, "call spc_purchase_goods_issuedetail_search_bymodule(?,?)",
        [
	    goosIssuedetail.moduleid,
            goosIssuedetail.id
        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("goosIssuedetail.service - getGoodsIssueDetailSearch ", err);
    } 
    return null;
 };


};
   
module.exports = goodsissuedetailRepository;