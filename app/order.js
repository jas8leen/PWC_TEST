/**
 * This function is the final Sum of all the calculations
 * I wanted to keep it separate as this is order generation microservice.
 * @param {items} items Object List of all the items on which discount has been applied 
 * @returns object with sub_total,offers attached and the total after the discount 
 */


function order(items){
    let itemList = Object
    .values(items)
    .reduce(function(total, item){
        let discount = item["discount"]
        if(discount != undefined){
            total["total"] = total["total"] + discount["discounted_sub_total"]
            total["offers"].push({
                name: discount["name"],
                discount: item["sub_total"] - discount["discounted_sub_total"]
            })
        }
        else {
            total["total"] = total["total"] + item["sub_total"]
        }
        total["sub_total"] = total["sub_total"] + item["sub_total"]
        return total;
    },{
        sub_total:0,
        offers: [],
        total: 0
    })

    return itemList;
}


module.exports = order