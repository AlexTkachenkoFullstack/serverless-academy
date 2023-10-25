const showExchangeRates=(rates, currency)=>{
    return `Exchange Rates ${currency} on ${rates.rateDateWithoutTime}
    NBU:
    sale:${currency==="USD"?rates.usdNbuSale : rates.eurNbuSale}
    byu:${currency==="USD"?rates.usdNbuBuy : rates.eurNbuBuy}\n
    MonoBank:
    sale:${currency==="USD"?rates.usdNbuSale : rates.eurNbuSale}
    byu:${currency==="USD"?rates.usdMBBuy : rates.eurMBBuy}
    `
}

module.exports=showExchangeRates