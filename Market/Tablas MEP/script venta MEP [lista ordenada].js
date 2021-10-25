bar = ""
bar =fetch("https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?_ts=1634917153912&term=3&index=cedears").then(respuesta=>{return respuesta})
// bar =fetch("https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?term=3&index=cedears")
// Contado Inmediato
// https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?_ts=1634921905336&term=1&index=cedears&sortColumn=ticker&isAscending=true
aa_json = await (bar.json());
ss = []
aa_json.result.forEach(elemento=>{
    ss.push(elemento.ticker);
})

ss_valida = []

total = [[]]

for (let i = 0; i < ss.length; i++) {
//     total[i] = [ss[i],ss_valida[i]]
    total[i] = [ss[i]]
}

let extracto = []
for (let i = 0; i < ss.length; i++) {
//     total[i][1] = (await(await fetch("https://www.bullmarketbrokers.com/Cotizaciones/Cedears/" + total[i][0] + "D")).status) == 200 ? '✅' : null
    (await(fetch("https://www.bullmarketbrokers.com/Cotizaciones/Cedears/" + total[i][0] + "D").then(resp=>{return resp})).status) == 200 ? 
    (total[i].push('✅') & extracto.push(ss[i]) ) : null

}


// ///////////////////////////////////////////////////////////////////////////////////////////////


// let i=0
// aa_json.result.find(elem=>elem.ticker==extracto[i]).stockOffer.bidTop[0].price /
// aa_json.result.find(elem=>elem.ticker==extracto[i]+"D").stockOffer.askTop[0].price

lista_ordenada = []
extracto.forEach(ticker=>{
    cotizacion_resultante = aa_json.result.find(elem=>elem.ticker==ticker)?.stockOffer?.bidTop[0]?.price /
                                    aa_json.result.find(elem=>elem.ticker==ticker+"D")?.stockOffer?.askTop[0]?.price;
    console.info(ticker + " => " + cotizacion_resultante);
    if(!isNaN(cotizacion_resultante)){
        lista_ordenada.push([ticker, cotizacion_resultante])
    }
})
lista_ordenada.sort((a,b)=>{return b[1]-a[1]});
console.info(lista_ordenada);
// try { export {lista_ordenada} } catch(e) {};
