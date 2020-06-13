<<<<<<< HEAD
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
    };
      request.post({url:base_url+'product/', form}, function(error, response, body) {
        if (error) {
              return console.error('Error:', error);
            }
            console.log(body);
         id = JSON.parse(body).data;
         expect(response.statusCode).to.equal(200);
         done();
=======
var expect = require("chai").expect;
const request = require("request");
let id = "";

let base_url = "http://localhost:4000/";

//create a product
describe("/product", () => {
  before((done) => {
    let form = {
      name: "multivite",
      price: 500,
      category: "Multivitamins",
    };
    request.post({ url: base_url + "product/", form }, function (
      error,
      response,
      body
    ) {
      if (error) {
        return console.error("Error:", error);
      }
      console.log(body);
      id = JSON.parse(body).data;
      expect(response.statusCode).to.equal(200);
      done();
>>>>>>> products
    });
  });

  //get all products
  describe("Api endpoints for product", () => {
    describe("Get /products", () => {
      it("gets all products", (done) => {
        request.get({ url: base_url + "products" }, function (
          error,
          response,
          body
        ) {
          if (error) {
            return console.error("Error:", error);
          }
          expect(response.statusCode).to.equal(200);
          expect(typeof JSON.parse(body).data).to.equal("object");

          done();
        });
      });
    });

    //get a single product
    describe("/product/:id", () => {
      it("get a single product", (done) => {
        request.get({ url: base_url + "product/" + id }, function (
          error,
          response,
          body
        ) {
          if (error) {
            return console.error("Error:", error);
          }
          expect(response.statusCode).to.equal(200);
          expect(typeof JSON.parse(body).data).to.equal("object");

          done();
        });
      });
    });

    //get a single product
    describe("/update/:id", () => {
      it("update a product", (done) => {
        let form = {
          name: "multivite 2",
          price: 500,
          category: "Multivitamins",
        };
        request.patch({ url: base_url + "product/" + id, form }, function (
          error,
          response,
          body
        ) {
          if (error) {
            return console.error("Error:", error);
          }
          console.log(body);
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
    });

    //delete a product
    describe("/delete/:id", () => {
      it("delete a single product", (done) => {
        request.delete({ url: base_url + "product/" + id }, function (
          error,
          response,
          body
        ) {
          if (error) {
            return console.error("Error:", error);
          }
          console.log(body);
          expect(response.statusCode).to.equal(200);

          done();
        });
      });
    });
  });
});