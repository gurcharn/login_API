
class LoginObject{
    constructor(companyId, active, email,  password){
        this.companyId = companyId
        this.active = active
        this.email = email
        this.owner = password
    }

    setCompanyId(companyId){ this.companyId = companyId }
    setActive(active){ this.email = active }
    setEmail(email){ this.email = email }
    setPassword(password){ this.password = password }

    getComapnyId(){ return this.companyId }
    getActive(){ return this.active }
    getEmail(){ return this.email }
    getPassword(){ return this.password }

}

module.exports = LoginObject;