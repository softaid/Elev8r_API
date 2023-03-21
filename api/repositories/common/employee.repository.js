let employeeRepository = function (pool, log) {
    
    // Get All CostStructure
    this.getAllEmployee = async function (req, Employee) {
        try {
            return await pool.query(req, "call spc_employee_search(?)",
            [
                Employee.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Employee.service - getAllEmployee", err);
        } 
        return null;
    };    

    // Get  Employee by id

    this.getEmployee = async function (req, Employee) {
        try {
            return await pool.query(req, "call spc_employee_select(?)",
            [
                Employee.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Employee.service - getEmployee", err);
        }
    
        return null;
    };    
  
    //get employee by role
    this.getEmployeeByRole = async function (req, Employee) {
        try {
            return await pool.query(req, "call spc_employee_byrole(?,?)",
            [
                Employee.roleids,
                Employee.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Employee.repository - getEmployeeByRole", err);
        }
    
        return null;
    };    

    
    this.saveEmployee = async function (req, Employee) {
        try {
                var sp_text = "SET @out_id = 0; call spc_employee_save(?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        Employee["id"] != null ? parseInt(Employee.id) : null,
                        Employee.employeename,
                        Employee.emailid,
                        Employee.mobileno,
                        Employee.isactive,
                        Employee.ledgerid,
                        Employee.emproleids,
                        parseInt(Employee.companyid),
                        parseInt(Employee.userid)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Employee.service-saveEmployee", err);
        }
        return null;
    }

  // delete Employee 

    this.deleteEmployee = async function (req, Employee) {
        console.log("Employee",Employee);
        try {
                return await pool.query(req, "call spc_employee_delete(?,?,?)",                       
                    [
                        parseInt(Employee.id),
                        parseInt(Employee.companyid),
                        parseInt(Employee.userid), 
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Employee.service-deleteEmployee", err);
        }
        return null;
    }

};
    
module.exports = employeeRepository;