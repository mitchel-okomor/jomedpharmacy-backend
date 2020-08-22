const db = require('../services/db');

class Prescriptions {
    constructor(id, name,email, number, description, isAnswered=false, customerId){
       this.id = id;
        this.name = name;
        this.email = email;
        this.number = number;
        this.description = description;
        this.isAnswered = isAnswered;
        this.customerId = customerId;
    }

set prescription (prescription){
    this.id =prescription.id;
    this.name = prescription.name;
    this.email = prescription.email;
    this.number = prescription.number;
    this.description = prescription.description;
    this.isAnswered = prescription.isAnswered;
 }

get prescription (){
    return ([this.id, this.name, this.email, this.number, this.description, this.isAnswered, this.customerId]);
}

 addOne(callback){
const queryString = `INSERT INTO prescription (d_id, name, email, number, description, is_answered, customer_id) values ('${this.id}','${this.name}', '${this.email}','${this.number}', '${this.description}', '${this.isAnswered}', '${this.customerId}')`;
db.query(queryString, (err, result)=>{
    if(err){
        console.log(err);
    }
callback(result);
});

}

getOne(id, callback){
const queryString = `SELECT * FROM prescription WHERE id = ${id}`;
db.query(queryString, (err, result)=>{
    if(err){
        console.log(err);
    }
    else{
    callback(result);
    }
});
}


getAll(callback){
    const queryString = `SELECT * FROM prescription`;
db.query(queryString, (err, result)=>{
    if(err){
       throw err;
    }
    else{
    callback(result);
    }
});

}

updateOne(id, callback){
const queryString = `UPDATE prescription SET name ='${this.name}', email='${this.email}', number='${this.number}',  is_answered='${this.isAnswered}' WHERE id = ${id}`;
db.query(queryString, (err, result)=>{
    if(err){
        throw err;
    }
callback(result);
});    
}

deleteOne(id, callback){
    const queryString = `DELETE FROM prescription WHERE id = ${id}`;
    db.query(queryString, (err, result)=>{
        if(err){
           throw err;
        }
        else{
        callback(result);
        }
    });
}


getStandingPrescriptions(customerId,callback){
    console.log(customerId);
    const queryString = `select * FROM prescription Where customer_id = ${customerId} AND is_answered <1`;
    db.query(queryString, (err, result)=>{
        if(err){
           throw err;
        }
        else{
        callback(result);
        }
    });
}


getPrescriptionHistory(customerId,callback){
    console.log(customerId);
    const queryString = `select * FROM prescription Where customer_id = ${customerId} AND is_answered >0`;
    db.query(queryString, (err, result)=>{
        if(err){
           throw err;
        }
        else{
        callback(result);
        }
    });
}


}

module.exports = Prescriptions;