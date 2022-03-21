
const prices = require("./prices");
const discounts = require("./discounts");
const order = require("./order");



/**
 *function basket is the top Level function,which calls all other microservices i.e Price,Discount,Order
 *This has been kept seperate to maintain microservice architecture of the code.
 * @param {*itemList} itemList example:- apple,apple,soup,bread
 * At the first step it calls generateQuantity function which create a object of the items.
 * Second step is to getPrice for all the Items.
 * Third step is call discounts service and apply discounts and then call final OrderService.
 * @returns output which has the final calculation of all the logics after applying price calculation and discounts
 */

function basket(itemList) {
    items = generateQuantity(itemList);

    Object.keys(items).map(function (x, index) {
        items[x] = prices.getPrice(items[x])
    });

    discount_items = discounts(items);

    final_output = order(discount_items);
    return final_output
}



/**
 * function  generateQuantity helps to create Object becuase we need to use Object schema in,
 * future calculations having multiple properties like quantity,total etc.
 * @param {*} itemList Input that has been entered from the command Line example :- apple,apple,bread soup
 * @returns Object having quantity of items in it.Example:- apple: { product: 'apple', quantity: 2}
 */
function generateQuantity(itemList) {
    let items = itemList.reduce(function (itemsCount, currentitem) {
        if (typeof itemsCount[currentitem] !== "undefined") {
            itemsCount[currentitem]++;
            return itemsCount;
        }
        itemsCount[currentitem] = 1;
        return itemsCount;
    }, {});

    Object.keys(items).map(function (x, index) {
        items[x] = {
            "product": x,
            "quantity": items[x]
        };
    });

    return items;
}


module.exports = {
    basket,
    generateQuantity
};

