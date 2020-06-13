var expect  = require('chai').expect;
const request = require('request');
let id = '';

let base_url = 'http://localhost:4000/';

 //create a product
 describe('/product', ()=>{

  before( (done) => {  
  
    let form ={
      name : 'multivite',
    price :500,
    category: 'Multivitamins'
    }
      request.post({url:base_url+'product/', form}, function(error, response, body) {
        if (error) {
              return console.error('Error:', error);
            }
            console.log(body);
         id = JSON.parse(body).data;
         expect(response.statusCode).to.equal(200);
         done();
    });
 
  }); 


//get all products
describe('Api endpoints for product', () => {  
    
  describe('Get /products', ()=>{

    it('gets all products', (done) => {

        request.get({url:base_url+'products'}, function(error, response, body) {
            if (error) {
                return console.error('Error:', error);
              }
              expect(response.statusCode).to.equal(200);
              expect(typeof(JSON.parse(body).data)).to.equal('object');

              done();
        });

   });
    
  });


//get a single product  
  describe('/product/:id', ()=>{

    it('get a single product', (done) => {

        request.get({url:base_url+'product/'+id, }, function(error, response, body) {
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


