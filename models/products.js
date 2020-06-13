const db = require('../services/db');

class Products {
    constructor(name, price, category, image){
        this.name = name;
        this.price = price;
        this.category = category;
        this.image = image;
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
const queryString = `INSERT INTO product (name, price, category, image_url) values ('${this.name}', '${this.price}', '${this.category}', '${this.image}')`;
db.query(queryString, (err, result)=>{
    if(err){
        console.log(err);
    }
callback(result);
});

}

getOne(id, callback){
const queryString = `SELECT * FROM product WHERE id = ${id}`;
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
const queryString = `UPDATE product SET name ='${this.name}', price='${this.price}', category='${this.category}' WHERE id = ${id}`;
db.query(queryString, (err, result)=>{
    if(err){
        throw err;
    }
callback(result);
});    
}

deleteOne(id, callback){
    const queryString = `DELETE FROM product WHERE id = ${id}`;
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

module.exports = Products;