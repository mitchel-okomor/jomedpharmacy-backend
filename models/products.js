const db = require('../services/db');

class Products {
    constructor(name, price, category, description, image ){
        this.name = name;
        this.price = price;
        this.category = category;
        this.image = image;
        this.description = description;
    }

set product (product){
    this.name = product.name;
    this.price = product.price;
    this.category = product.category;
}

get product (){
    return ([this.name, this.price, this.category]);
}

 addOne(callback){
     
    console.log("request recieved");
const queryString = `INSERT INTO product (name, price, category, image_url, description) values ('${this.name}', '${this.price}', '${this.category}', '${this.image}', '${this.description}')`;
db.query(queryString, (err, result)=>{
    if(err){
        console.log(err);
    }
callback(result);
});

}

getOne(id, callback){
const queryString = `SELECT * FROM product WHERE product_id = ${id}`;
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
    const queryString = `SELECT * FROM product`;
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
const queryString = `UPDATE product SET name ='${this.name}', price='${this.price}', category='${this.category}', description='${this.description}' WHERE product_id = ${id}`;
db.query(queryString, (err, result)=>{
    if(err){
        throw err;
    }
callback(result);
});    
}

deleteOne(id, callback){
    const queryString = `DELETE FROM product WHERE product_id = ${id}`;
    db.query(queryString, (err, result)=>{
        if(err){
           throw err;
        }
        else{
        callback(result);
        }
    });
}


search(val, callback){
    const queryString = `SELECT * FROM product WHERE name LIKE '%${val}%'`;
db.query(queryString, (err, result)=>{
    if(err){
       throw err;
    }
    else{
        console.log(result);
    callback(result);
    }
});

}


}

module.exports = Products;