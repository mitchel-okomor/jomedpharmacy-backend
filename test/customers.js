var expect  = require('chai').expect;
const request = require('request');
let id = '';

let base_url = 'http://localhost:4000/';

 //create a customer
 describe('/customer', ()=>{

  before( (done) => {  
  
    let form ={
      name : 'multivite',
    price :500,
    category: 'Multivitamins'
    };
      request.post({url:base_url+'customer/', form}, function(error, response, body) {
          if (error) {
              return console.error('Error:', error);
            }
            console.log(body);
         id = JSON.parse(body).data.userId;
         expect(response.statusCode).to.equal(200);
         done();
    });
 
  }); 
});




//get all customers
  describe('Api endpoints for customer', () => {  
    
  describe('Get /customers', ()=>{

    it('gets all customers', (done) => {

        request.get({url:base_url+'customers'}, function(error, response, body) {
            if (error) {
                return console.error('Error:', error);
              }
              expect(response.statusCode).to.equal(200);
              expect(typeof(JSON.parse(body).data)).to.equal('object');

              done();
        });

   });
    
  });


//get a single customer  
  describe('/customer/:id', ()=>{

    it('get a single customer', (done) => {

        request.get({url:base_url+'customer/'+id, }, function(error, response, body) {
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