const db = require('../services/db');

class User {
    constructor(fName, lName, number, address, email){
        this.fName = fName;
        this.lName  = lName;
        this.number = number;
        this.address = address;
        this.email = email;
    }

set user (user){
    this.fName =user.fName;
    this.lName = user.lName;
    this.number =user.number;
    this.address =user.address;
    this.email = user.email;
}

get user (){
    return ([this.fName, this.lName, this.number, this.address, this.emial]);
}

 addOne(callback){
     
    console.log("request recieved");
const queryString = `INSERT INTO user (firstname, lastname number, address, email) values ('${this.fName}', '${this.lName}', '${this.number}', '${this.address}','${this.email}' )`;
db.query(queryString, (err, result)=>{
    if(err){
        console.log(err);
    }
callback(result);
});

}

getOne(email, callback){
const queryString = `SELECT * FROM user WHERE email = ${email}`;
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
    const queryString = `SELECT * FROM user`;
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
const queryString = `UPDATE user SET firstname ='${this.fName}', lastname ='${this.lName}', number='${this.number}', address='${this.address}', email='${this.email}' WHERE id = ${id}`;
db.query(queryString, (err, result)=>{
    if(err){
        throw err;
    }
callback(result);
});    
}

deleteOne(id, callback){
    const queryString = `DELETE FROM user WHERE id = ${id}`;
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

module.exports = User;