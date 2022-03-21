var expect = require("chai").expect;
var basket = require("../app/basket");

describe("Basket Logic", function () {
    it("check quantity of good", function () {
        var results = basket.generateQuantity(["apple","soup","soup"]);
        expect(results).to.deep.equal({ "apple": { product: 'apple', quantity: 1 }, "soup": { product: 'soup', quantity: 2 }});
    });
    it("check if the input is an array", function () {
        var inputresults = ["apple","soup","soup"];
        expect(inputresults).to.be.an('array');
    });
});