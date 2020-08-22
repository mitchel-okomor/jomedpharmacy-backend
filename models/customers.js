const db = require('../services/db');

class Customer {
    constructor(name, number, address, email, password){
        this.name = name;
        this.number = number;
        this.address = address;
        this.email = email;
        this.password = password;
    }

set customer (customer){
    this.name =customer.name;
    this.number =customer.number;
    this.address =customer.address;
    this.email = customer.email;
    this.password = customer.password;
}

get customer (){
    return ([this.name, this.number, this.address, this.emial, this.password]);
}

 addOne(callback){
     
const queryString = `INSERT INTO customer (name, number, address, email, password) values ('${this.name}', '${this.number}', '${this.address}','${this.email}','${this.password}' )`;
db.query(queryString, (err, result)=>{
    if(err){
        console.log(err);
    }
callback(result);
});

}

getOne(id, callback){
const queryString = `SELECT * FROM customer WHERE customer_id = ${id}`;
db.query(queryString, (err, result)=>{
    if(err){
        console.log(err);
    }
    else{

    callback(result);
    }
});
}

//search database by user email
getByEmail(email, callback){
    const queryString = `SELECT * FROM customer WHERE email = '${email}'`;
    db.query(queryString, (err, result)=>{
        if(err){
            console.log(err);
        }
        else{
        callback(result[0]);
        }
    });
    }

getAll(callback){
    const queryString = `SELECT * FROM customer`;
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
const queryString = `UPDATE customer SET name ='${this.name}', number='${this.number}', address='${this.address}', email='${this.email}', , email='${this.password}' WHERE id = ${id}`;
db.query(queryString, (err, result)=>{
    if(err){
        throw err;
    }
callback(result);
});    
}

deleteOne(id, callback){
    const queryString = `DELETE FROM customer WHERE id = ${id}`;
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

module.exports = Customer;