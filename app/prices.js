
//This is our Price Microservice,which will store all the informaion related to the prices.
//This is the actual function which will hit MongoDb or DynamoDb to get the prices.
//This function will support dynamic pricing calculation of the products. 
function getPrice(item){
    prices = getPrices()
    item["item_price"] = prices[item["product"]]
    item["sub_total"] = prices[item["product"]] * item["quantity"]

    return item
}

//This is the hardcoded list for all the items and there prices.
//This in ideal world would be a Database call.
function getPrices(){
    goodsPrices = {
        soup: 65,
        bread: 80,
        milk: 130,
        apple: 100
    }
    return goodsPrices;
}

module.exports = {
    getPrice
};