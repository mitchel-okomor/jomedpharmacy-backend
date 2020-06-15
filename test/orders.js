var expect = require("chai").expect;
const request = require("request");
let id = "";

let base_url = "http://localhost:4000/";

//create a order
describe("/order", () => {
  before((done) => {
    let form = {
      products:'jangle, unchained',
      amount: '5000'
    };
    request.post({ url: base_url + "order/", form }, function (
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
    });
  });

  //get all orders
  describe("Api endpoints for order", () => {
    describe("Get /orders", () => {
      it("gets all orders", (done) => {
        request.get({ url: base_url + "orders" }, function (
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

    //get a single order
    describe("/order/:id", () => {
      it("get a single order", (done) => {
        request.get({ url: base_url + "order/" + id }, function (
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

    //get a single order
    describe("/update/:id", () => {
      it("update a order", (done) => {
        let form = {
            products:'jangle, unchained, second one',
            amount: '5000',
            isPaid: true
          };
        request.patch({ url: base_url + "order/" + id, form }, function (
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

    //delete a order
    describe("/delete/:id", () => {
      it("delete a single order", (done) => {
        request.delete({ url: base_url + "order/" + id }, function (
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