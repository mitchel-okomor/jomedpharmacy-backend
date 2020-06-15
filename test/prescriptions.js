var expect = require("chai").expect;
const request = require("request");
let id = "";

let base_url = "http://localhost:4000/";

//create a prescription
describe("/prescription", () => {
  before((done) => {
    let form = {
      name: "multivite",
      email: "twinkle@SpeechGrammarList.com",
      number: "08039215852",
    description: "For something about giberich coding",
    isAnswered: false
    };
    request.post({ url: base_url + "prescription/", form }, function (
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

  //get all prescriptions
  describe("Api endpoints for prescription", () => {
    describe("Get /prescriptions", () => {
      it("gets all prescriptions", (done) => {
        request.get({ url: base_url + "prescriptions" }, function (
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

    //get a single prescription
    describe("/prescription/:id", () => {
      it("get a single prescription", (done) => {
        request.get({ url: base_url + "prescription/" + id }, function (
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

    //get a single prescription
    describe("/update/:id", () => {
      it("update a prescription", (done) => {
        let form = {
          name: "multivite 2",
          price: 500,
          category: "Multivitamins",
        };
        request.patch({ url: base_url + "prescription/" + id, form }, function (
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

    //delete a prescription
    describe("/delete/:id", () => {
      it("delete a single prescription", (done) => {
        request.delete({ url: base_url + "prescription/" + id }, function (
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