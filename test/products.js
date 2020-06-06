var assert = require('assert');
const request = require('request');
let id = 24;

let base_url = 'http://localhost:4000/'


  describe('Api endpoints for product', () => {  
    
  describe('Get /products', ()=>{

    it('gets all products', (done) => {

        request.get({url:base_url+'products'}, function(error, response) {
            if (error) {
                return console.error('Error:', error);
              }
              assert.equal(response.statusCode, 200);
              done();
        });

   });
    
  })


  
  describe('/product/:id', ()=>{

    it('get a single employee', (done) => {

        request.get({url:base_url+'employee/'+id, }, function(error, response) {
            if (error) {
                return console.error('Error:', error);
              }
              assert.equal(response.statusCode, 200);
            done();
        });
 
   });
    
  });

 
  });