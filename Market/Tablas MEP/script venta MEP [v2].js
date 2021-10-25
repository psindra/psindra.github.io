// bar = ""
// bar =await fetch("https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?_ts=1634917153912&term=3&index=cedears").then(respuesta=>{return respuesta})
// // bar =fetch("https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?term=3&index=cedears")
// // Contado Inmediato
// // https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?_ts=1634921905336&term=1&index=cedears&sortColumn=ticker&isAscending=true
// aa_json = bar.json().then(resp=>{return resp});

async function listarCEDEARS(){
    window.aa_json =''
    await fetch("https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?_ts=1634917153912&term=3&index=cedears")
        .then(respuesta=>{return respuesta.json()}).then(respuesta=>{window.aa_json=respuesta})
    ss = []
    window.aa_json.result.forEach(elemento=>{
        ss.push(elemento.ticker);
    })

    ss_valida = []

    total = [[]]

    for (let i = 0; i < ss.length; i++) {
    //     total[i] = [ss[i],ss_valida[i]]
        total[i] = [ss[i]]
    }


    window.extracto = []
    window.document.body.innerHTML = "<h3> Cargando....</h3>"
    for (let i = 0; i < ss.length; i++) {
        ((await fetch("https://www.bullmarketbrokers.com/Cotizaciones/Cedears/" + total[i][0] + "D").then(resp=>{return resp})).status) == 200 ? 
        (total[i].push('✅') & window.extracto.push(ss[i]) ) : null

    }
}

// ///////////////////////////////////////////////////////////////////////////////////////////////

async function generarListaOrdenada(){
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
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function generarTabla(){
    tabla = document.createElement('table');
    document.body.appendChild(tabla);
    row = tabla.insertRow();
    cell = row.insertCell();
    cell.innerText = "©polyys";
    cell = row.insertCell();
    cell.innerText = "Precio Venta MEP Cotización CEDEAR (Cdo - No Parking)";

    lista_ordenada.forEach(elemento=> {
      row = tabla.insertRow();
      cell = row.insertCell();
      cell.innerHTML = "<strong>" + elemento[0] + "</strong>";
      cell = row.insertCell();
      cell.innerHTML = "AR$ <strong>" + elemento[1].toFixed(2) + "</strong>";
    })
    window.document.body=document.createElement("body")
    document.body.appendChild(tabla)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

(typeof extracto == 'undefined') ? await listarCEDEARS() : null;
await generarListaOrdenada();
await generarTabla();
