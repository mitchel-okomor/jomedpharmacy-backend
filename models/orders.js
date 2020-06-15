const db = require('../services/db');

class Order {
    constructor(id, products, amount, isPaid=false){
       this.id = id;
        this.products = products;
        this.amount = amount;
        this.isPaid = isPaid;
    }

set order (order){
    this.id =order.id;
    this.products = order.products;
    this.amount = order.amount;
    this.isPaid = order.isPaid;
 }

get order (){
    return ([this.id, this.products, this.amount, this.isPaid]);
}

 addOne(callback){
const queryString = `INSERT INTO product_order (customer_id, products, amount, is_paid) values ('${this.id}','${this.products}', '${this.amount}','${this.isPaid}')`;
db.query(queryString, (err, result)=>{
    if(err){
        console.log(err);
    }
callback(result);
});

}

getOne(id, callback){
const queryString = `SELECT * FROM product_order WHERE id = ${id}`;
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
    const queryString = `SELECT * FROM product_order`;
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
const queryString = `UPDATE product_order SET products ='${this.products}', amount='${this.amount}', is_paid='${this.isPaid}' WHERE id = ${id}`;
db.query(queryString, (err, result)=>{
    if(err){
        throw err;
    }
callback(result);
});    
}

deleteOne(id, callback){
    const queryString = `DELETE FROM product_order WHERE id = ${id}`;
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