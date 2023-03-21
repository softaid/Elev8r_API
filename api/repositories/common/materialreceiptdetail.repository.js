let materialreceiptdetailRepository = function (pool, log) {
    
    // get all Material requests
    this.getAllMaterialReceiptDetail = async function (req, materialreceiptdetail) {
        try {
            return await pool.query(req, "call spc_materialreceiptdetail_search(?)",
            [
                materialreceiptdetail.materialreceiptid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialreceiptdetail.service - getAllMaterialReceiptDetail", err);
        } 
        return null;
    };

    // get Material request for edit
    this.getMaterialReceiptDetail = async function (req, materialreceiptdetail) {
        try {
            return await pool.query(req, "call spc_materialreceiptdetail_select(?,?)",
            [
                materialreceiptdetail.id,
                materialreceiptdetail.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialreceiptdetail.service - getMaterialReceiptDetail", err);
        }
    
        return null;
    };    
  
    // save materialreceiptdetail
    this.saveMaterialReceiptDetail = async function (req, materialreceiptdetail) {
        console.log("materialreceiptdetail : ",materialreceiptdetail);
        try {
                var sp_text = "SET @out_id = 0; call spc_materialreceiptdetail_save(?,?,?,?,?,?,?,?,?,?,?,?,?,@out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        materialreceiptdetail["id"] != null ? parseInt(materialreceiptdetail.id) : null,
                        parseInt(materialreceiptdetail.materialreceiptid),
                        parseInt(materialreceiptdetail.itemid),
                        materialreceiptdetail.itemname,
                        parseInt(materialreceiptdetail.receiptquantity),
                        parseFloat(materialreceiptdetail.unitcost),
                        parseFloat(materialreceiptdetail.totalcost),
                        parseInt(materialreceiptdetail.unitid),
                        materialreceiptdetail.itembatch,
                        parseInt(materialreceiptdetail.towarehouse),
                        parseInt(materialreceiptdetail.towarehousebinid),
                        parseInt(materialreceiptdetail.companyid),
                        parseInt(materialreceiptdetail.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialreceiptdetail.service-saveMaterialReceiptDetail", err);
        }
        return null;
    };

    // delete materialreceiptdetail   
    this.deleteMaterialReceiptDetail = async function (req, materialreceiptdetail) {
        try {
            return await pool.query(req, "call spc_materialreceiptdetail_delete(?)",                       
                [
                    parseInt(materialreceiptdetail.id),
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialreceiptdetail.service-deleteMaterialReceiptDetail", err);
        }
        return null;
    };

     //get itembatch form warehouseid
     this.getItembatchFromWarehouse = async function (req, materialreceiptdetail) {
         console.log("materialreceiptdetail : ",materialreceiptdetail);
        try {
            return await pool.query(req, "call spc_materialreceiptdetail_bywarehouse(?)",
                [
                    parseInt(materialreceiptdetail.warehouseid)
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialreceiptdetail.repository - getItembatchFromWarehouse", err);
        }

        return null;
    };

    //get vaccinated item batches
    this.getVaccinatedItembatches = async function (req, materialreceiptdetail) {
        console.log("materialreceiptdetail : ",materialreceiptdetail);
       try {
           return await pool.query(req, "call spc_materialreceiptdetail_select_vaccinateddoc(?)",
               [
                   parseInt(materialreceiptdetail.companyid)
               ]);
       }
       catch (err) {
           console.log('Error thrown : ', err);
           log.dbErrorLog("materialreceiptdetail.repository - getVaccinatedItembatches", err);
       }

       return null;
   };


};
    
module.exports = materialreceiptdetailRepository;