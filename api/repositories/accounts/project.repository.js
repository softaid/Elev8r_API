let projectRepository = function (pool, log) {
    
    this.getAllProjects = async function (req, Params) {
        try {
            return await pool.query(req, "call spc_project_search(?)",
            [
                Params.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("project.repository - getAllProjects", err);
        } 
        return null;
    };

    this.getProject = async function (req, Params) {
        try {
            return await pool.query(req, "call spc_project_select(?)",
            [
                Params.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("project.repository - getProject", err);
        }
    
        return null;
    };    

    this.saveProject = async function (req, Params) {
        try {
                var sp_text = "SET @out_id = 0; call spc_project_save(?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        Params["id"] != null ? parseInt(Params.id) : null,
                        Params.projectcode,
                        Params.projectname,
                        Params.validfrom,
                        Params.validto,
                        Params.isactive,
                        Params["employeeid"] != null ? parseInt(Params.employeeid) : null,
                        Params.isparent,
                        Params["parentid"] != null ? parseInt(Params.parentid) : null,                        
                        parseInt(Params.companyid),
                        parseInt(Params.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("project.repository - saveProject", err);
        }
        return null;
    };

    this.deleteProject = async function (req, Params) {
        try {
                return await pool.query(req, "call spc_project_delete(?,?,?)",                       
                    [
                        parseInt(Params.id),
                        parseInt(Params.companyid),
                        parseInt(Params.userid),                        
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("project.repository - deleteProject", err);
        }
        return null;
    };

    //get all parent projects
    this.getAllParentProjects = async function (req, Params) {
        try {
            return await pool.query(req, "call spc_project_parentproject(?)",
            [
                Params.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("project.repository - getAllParentProjects", err);
        } 
        return null;
    };

};
    
module.exports = projectRepository;