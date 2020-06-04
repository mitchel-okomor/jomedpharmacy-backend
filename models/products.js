const db = require('../services/db');

class Products {
    constructor(name, price, category){
        this.name = name;
        this.price = price;
        this.category = category;
    }

set product (product){
    this.name = product.name;
    this.price = product.price;
    this.category = product.category;
}

get product (){
    return ([this.name, this.price, this.category]);
}

async addOne(){
    console.log("request recieved");
const queryString = `INSERT INTO product (name, price, category) values ('${this.name}', '${this.price}', '${this.category}')`;
await db.query(queryString, (err, result)=>{
    if(err){
        console.log(err);
    }

    else{return result}
});


}

async getOne(id){
const queryString = `SELECT * FROM product WHERE id = ${id}`;
db.query(queryString, (err, result)=>{
    if(err){
        console.log(err);
    }
    else{return result}
});
}


async getAll(){
    const queryString = "select * FROM product ORDER BY id";
    await db.query(queryString, (err, result) =>{
        if(err){
            console.log(err);
        }
        else{return result}
    })

}

async updateOne(id){
const queryString = `UPDATE product SET name ='${this.name}', price='${this.price}', category='${this.category}'`;
db.query(queryString, (err, result)=>{
    if(err){
        console.log(err);
    }
    else{
        return result;
    }
})    
}

}

module.exports = Products;