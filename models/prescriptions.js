const db = require('../services/db');

class Prescriptions {
    constructor(id, name,email, number, description, isAnswered){
       this.id = id;
        this.name = name;
        this.email = email;
        this.number = number;
        this.description = description;
        this.isAnswered = isAnswered;
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
    return ([this.id, this.name, this.email, this.number, this.description, this.isAnswered]);
}

 addOne(callback){
     
    console.log("request recieved");
const queryString = `INSERT INTO prescription (id, name, email, number, description, is_answered) values ('${this.id}','${this.name}', '${this.email}','${this.number}', '${this.description}', '${this.isAnswered}'`;
db.query(queryString, (err, result)=>{
    if(err){
        throw err;
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

}

module.exports = Prescriptions;