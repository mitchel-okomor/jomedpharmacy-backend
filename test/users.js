var expect  = require('chai').expect;
const request = require('request');
let id = '';
let token = '';

let base_url = 'http://localhost:4000/';

 //create a user
 describe('/users', ()=>{

  before( (done) => {  
  
    let form ={
      email : 'johndoe@gmail.com',
    password: 'john'
    };
      request.post({url:base_url+'login', form, headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }}, function(error, response, body) {
          if (error) {
              return console.error('Error:', error);
            }
         id = JSON.parse(body).user.id;
         token = JSON.parse(body).token;
         expect(response.statusCode).to.equal(200);
         done();
    });
 
  }); 




//get all userss
describe('Api endpoints for users', () => {  
    
    describe('Get /users', ()=>{
  
      it('gets all users', (done) => {
      
          request.get({url:base_url+'users', headers: {
            'authorization': token
          } }, function(error, response, body) {
              if (error) {
                  return console.error('Error:', error);
                }
                expect(response.statusCode).to.equal(200);
                expect(typeof(JSON.parse(body).data)).to.equal('object');
  
                done();
          });
  
     });
      
    });
  
  
  //get a single user  
    describe('/user/:id', ()=>{
  
      it('get a single user', (done) => {
  
          request.get({url:base_url+'user/'+id, headers: {
            'authorization': token
          }}, function(error, response, body) {
              if (error) {
                  return console.error('Error:', error);
                }
                expect(response.statusCode).to.equal(200);
                expect(typeof(JSON.parse(body).data)).to.equal('object');
  
              done();
          });
   
     });
      
    });
  
  
    });
  
});



