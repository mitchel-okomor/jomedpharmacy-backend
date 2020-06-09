const db = require('../services/db');

class Customer {
    constructor(name, number, address){
        this.name = name;
        this.number = number;
        this.address = address;
    }

set customer (customer){
    this.name =customer.name;
    this.number =customer.number;
    this.address =customer.address;
}

get customer (){
    return ([this.name, this.number, this.address]);
}

 addOne(callback){
     
    console.log("request recieved");
const queryString = `INSERT INTO customer (name, number, address) values ('${this.name}', '${this.number}', '${this.address}')`;
db.query(queryString, (err, result)=>{
    if(err){
        console.log(err);
    }
callback(result);
});

}

getOne(id, callback){
const queryString = `SELECT * FROM customer WHERE id = ${id}`;
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
const queryString = `UPDATE customer SET name ='${this.name}', price='${this.number}', category='${this.address}' WHERE id = ${id}`;
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