const { argv } = process;
const [node, file, ...itemList] = argv;
const basket = require("./app/basket").basket;
const formatter = require("./app/formatter").formatPrice;

/**
 *This function takes input from CLI for our main function Basket.
 * Basket Function is the actual function which has all the internal logics for calculations.
 * Example of the input from CLI = apple apple soup bread
 * @param {*itemList} itemList is the list entered from commandLine Interface
 */
function consoleBasket(itemList) {
    let final_output = basket(itemList);
    let finalDisplay = formatter(final_output);
    console.log(finalDisplay["Subtotal"]);
    finalDisplay["offer"].map(f => console.log(f));
    console.log(finalDisplay["Total"]);
}

if (require.main === module) {
    consoleBasket(itemList);
}

module.exports = {
    consoleBasket
};
