const db = require('../services/db');

class Order {
    constructor(id, name,email, number, description, isAnswered=false){
       this.id = id;
        this.name = name;
        this.email = email;
        this.number = number;
        this.description = description;
        this.isAnswered = isAnswered;
    }

set order (order){
    this.id =order.id;
    this.name = order.name;
    this.email = order.email;
    this.number = order.number;
    this.description = order.description;
    this.isAnswered = order.isAnswered;
 }

get order (){
    return ([this.id, this.name, this.email, this.number, this.description, this.isAnswered]);
}

 addOne(callback){
const queryString = `INSERT INTO order (d_id, name, email, number, description, is_answered) values ('${this.id}','${this.name}', '${this.email}','${this.number}', '${this.description}', '${this.isAnswered}')`;
db.query(queryString, (err, result)=>{
    if(err){
        console.log(err);
    }
callback(result);
});

}

getOne(id, callback){
const queryString = `SELECT * FROM order WHERE id = ${id}`;
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
    const queryString = `SELECT * FROM order`;
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
const queryString = `UPDATE order SET name ='${this.name}', email='${this.email}', number='${this.number}',  is_answered='${this.isAnswered}' WHERE id = ${id}`;
db.query(queryString, (err, result)=>{
    if(err){
        throw err;
    }
callback(result);
});    
}

deleteOne(id, callback){
    const queryString = `DELETE FROM order WHERE id = ${id}`;
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

module.exports = Order;