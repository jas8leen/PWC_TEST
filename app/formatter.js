function formatPrice(priceObject) {
    const sub_total_poundPrice = (priceObject.sub_total / 100);
    const total_poundPrice = (priceObject.total / 100);
    return {
        "Subtotal": "Subtotal: £" + sub_total_poundPrice.toFixed(2),
        "offer": (priceObject.offers).length > 0 ? formatOffers(priceObject.offers) : ["(no offer available)"],
        "Total": "Total: £" + total_poundPrice.toFixed(2)
    }
}
 function formatOffers(offers) {
    return offers.map(offer => {
        let offerCurr = offer["discount"].toFixed(2)/100
        offerCurr = offerCurr.toFixed(2)
        offerCurr = offerCurr<1 ? offerCurr + "p": "£" + offerCurr
        return offer["name"] + " -" + offerCurr
    })
 }

module.exports = {
    formatPrice
};