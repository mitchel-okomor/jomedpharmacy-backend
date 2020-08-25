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
const queryString = `SELECT * FROM product_order WHERE product_id = ${id}`;
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
const queryString = `UPDATE product_order SET product ='${this.products}', amount='${this.amount}', number='${this.isPaid}' WHERE product_id = ${id}`;
db.query(queryString, (err, result)=>{
    if(err){
        throw err;
    }
callback(result);
});    
}

deleteOne(id, callback){
    const queryString = `DELETE FROM product_order WHERE product_id = ${id}`;
    db.query(queryString, (err, result)=>{
        if(err){
           throw err;
        }
        else{
        callback(result);
        }
    });
}

getStandingOrders(customerId,callback){
    console.log(customerId);
    const queryString = `select * FROM product_order LEFT JOIN product ON product_order.product_id = product.product_id Where customer_id = ${customerId} AND is_answered <1`;
    db.query(queryString, (err, result)=>{
        if(err){
           throw err;
        }
        else{
        callback(result);
        }
    });
}


getOrderHistory(customerId,callback){
    const queryString = `select * FROM product_order LEFT JOIN product ON product_order.product_id = product.product_id Where customer_id = ${customerId} AND is_answered >0`;
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