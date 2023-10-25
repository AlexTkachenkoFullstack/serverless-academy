const axios = require("axios");
const formatDate=require('../utils/formatDate')
const MBBaseUrl='https://api.monobank.ua/bank/currency'
const NBUBaseUrl='https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'

const fetchExchangeRates=async()=>{
    const nbuRates=await axios(NBUBaseUrl);
    const eurNbu=nbuRates.data.find(item=>item.ccy==='EUR');
    const usdNbu=nbuRates.data.find(item=>item.ccy==='USD');
    const eurNbuBuy=Number(eurNbu.buy).toFixed(2);
    const eurNbuSale=Number(eurNbu.sale).toFixed(2);
    const usdNbuBuy=Number(usdNbu.buy).toFixed(2);
    const usdNbuSale=Number(usdNbu.sale).toFixed(2);
    const monoRates=await axios(MBBaseUrl);
    const eurMB=monoRates.data.find(item=>item.currencyCodeA===978);
    const usdMB=monoRates.data.find(item=>item.currencyCodeA===840);
    const eurMBBuy=eurMB.rateBuy.toFixed(2);
    const eurMBSale=eurMB.rateSell.toFixed(2);
    const usdMBBuy=usdMB.rateBuy.toFixed(2);
    const usdMBSale=usdMB.rateSell.toFixed(2);
    const rateDateWithTime=Date.now();
    const rateDateWithoutTime=formatDate(rateDateWithTime / 1000).split(' ')[0]
    return {rateDateWithoutTime, eurNbuBuy,eurNbuSale, usdNbuBuy, usdNbuSale, eurMBBuy,eurMBSale, usdMBBuy, usdMBSale}
}


module.exports=fetchExchangeRates