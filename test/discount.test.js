let expect = require("chai").expect;
let discounts = require("../app/discounts");

describe("Discount Logic", function () {
    it("Add No discounts if there are no items which have discounts assocated with them", function () {
        var results = discounts({ milk: { product: 'milk', quantity: 1, item_price: 130, sub_total: 130 }});
        expect(results).to.deep.equal({ milk: { product: 'milk', quantity: 1, item_price: 130, sub_total: 130 }});
    });
    it("check if the product is soup addon discount is applied", function () {
        var results = discounts({ soup: { product: 'soup', quantity: 2, item_price: 130, sub_total: 130 }});
        expect(results).to.deep.equal({ soup: { product: 'soup', quantity: 2, item_price: 130, sub_total: 130 }});
    });
});