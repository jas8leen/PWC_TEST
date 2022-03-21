const getPrices = require("./prices");

/**
 *This function applies discounts.And is the Discount Microservice
 *This function has been made generic.So that it can be used anywhere else in the code.Currently there are only two types of discounts.
 *In future if we want to introduce any new type of discount,we can just add new function inside this main function and reuse it. 
 * @param {apple: { product: 'apple', quantity: 2},soup: { product: 'soup', quantity: 2}} items,It take Item of Objects as input.
 * @returns Object having offer aplied and discounted values
 */

function discounts(items) {
    Object.keys(items).map(function (x, index) {
        const item = items[x];
        let discount = getDiscount(item["product"]);

        if (discount && discount["type"] == "simple_percentage_discount") {
            apply_simple_percentage_discount(discount, item, items);
        }

        if (discount && discount["type"] == "discounted_addon") {
            apply_discounted_addon(discount, item, items);
        }
    });

    return items;
}

/**
 * This is a generic function which supports first type of discount in which we are getting some value off on a particular item.
 * Wanted to make this as separate function so that it can be used for other products too,didnt wanted to keep this specific for apple product 
 * @param {*simple_percentage_discount} discount  type of discount
 * @param {*apple} item on which particular item we need discount on
 * @param {*apple,apple,soup,bread} items List of all the items that we want to buy
 * @returns Object having discount applied
 */

function apply_simple_percentage_discount(discount, item, items) {
    if (!discount_condition(discount, item, items)) {
        return;
    }
    let discounted_item_price = (100 - discount["discount"]["percentage"]) / 100 * item["item_price"];
    item["discount"] = {
        "name": discount["name"],
        "discounted_item_price": discounted_item_price,
        "discounted_sub_total": discounted_item_price * item["quantity"]
    }
}




/**
 *This is a generic function which supports second type of discount in which we are getting off on a product if we buy 2 tin soups.
 *Wanted to make this as separate function so that it can be used for other products too,didnt wanted to keep this specific for Soup product
 *Here Addon Product refers to the one on which we get off in additon to the product we are buying.
 * @param {*discounted_addon} discount  type of discount
 * @param {*soup} item on which particular item we need discount on
 * @param {*apple,apple,soup,bread} items List of all the items that we want to buy
 * @returns Object having discount applied
 */

function apply_discounted_addon(discount, item, items) {

    addon_item = items[discount["discount"]["addon_product"]];

    if (!discount_condition(discount, item, items)) {
        return;
    }

    if (addon_item == undefined) {
        return;
    }
    let discounted_item_price = (100 - discount["discount"]["percentage"]) / 100 * addon_item["item_price"];
    let discounted_total = discounted_item_price * discount["discount"]["quantity"];
    let non_discounted_total = addon_item["item_price"] * (addon_item["quantity"] - discount["discount"]["quantity"]);
    let discounted_sub_total = discounted_total + non_discounted_total
    addon_item["discount"] = {
        "name": discount["name"],
        "discounted_item_price": discounted_item_price,
        "discounted_sub_total": discounted_sub_total
    }

}


/**
 * This functions defines the type of discount conditions.
 * Example :- If the discount is applied when more than 1 quantity of an item is being bought
 * As of now,only one condition sis upported.In case in fututre we want to create new conditions we can create functions here.
 * @param {*discount} discount,this implied the whole object of the discount inside which we have maintained a key named "condition". 
 * @param {*} item product on which this discount condition is applied.
 * @param {*} items List of all the items that we need to buy
 * @returns if discount condition is present or not
 */

function discount_condition(discount, item, items) {
    let condition = discount["condition"];
    if (condition == undefined) {
        return true; // If there is no condition the discount should always be applicable
    }

    let quantity = condition["quantity"];
    let condition_type = condition["type"];

    if (condition_type == "equalOrMore") {
        return item["quantity"] >= quantity
    }
    return false;
}



/**
 *This function in ideal world would be a database Call,In which we have stored values of their discounts and offers.
 * It can be stored in Schemaless DB's like Mongo and DynamoDb
 * @param {apple} product name of product for which we need information
 * @returns full Object of the product for which we want our details
 */
function getDiscount(product) {
    const discounts = {
        "apple": {
            "name": "Apples have 10% off their normal price this week",
            "type": "simple_percentage_discount",
            "discount": {
                "percentage": 10
            },
            "condition": null
        },
        "soup": {
            "name": "Buy 2 tins of soup and get a loaf of bread for half price",
            "type": "discounted_addon",
            "discount": {
                "addon_product": "bread",
                "quantity": 1,
                "percentage": 50
            },
            "condition": {
                "quantity": 2,
                "type": "equalOrMore"
            }
        }
    }

    return discounts[product];
}



module.exports = discounts;




