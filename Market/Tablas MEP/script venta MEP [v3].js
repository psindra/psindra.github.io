version = "3.1.1"
// bar = ""
// bar =await fetch("https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?_ts=1634917153912&term=3&index=cedears").then(respuesta=>{return respuesta})
// // bar =fetch("https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?term=3&index=cedears")
// // Contado Inmediato
// // https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?_ts=1634921905336&term=1&index=cedears&sortColumn=ticker&isAscending=true
// aa_json = bar.json().then(resp=>{return resp});

async function listarCEDEARS(){
    window.aa_json =''
    await fetch("https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?term=3&index=cedears")
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
    window.document.body.innerHTML = "<h3> Cargando CEDEARS [v" + version + "]</h3>"
    for (let i = 0; i < ss.length; i++) {
        ((await fetch("https://www.bullmarketbrokers.com/Cotizaciones/Cedears/" + total[i][0] + "D").then(resp=>{return resp})).status) == 200 ? 
        (total[i].push('✅') & window.extracto.push(ss[i]) ) : null
        document.body.firstElementChild.innerText += "."

    }
}

// ///////////////////////////////////////////////////////////////////////////////////////////////


async function listarON(){
    window.aa_json =''
    await fetch("https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?term=3&index=obligacionesNegociables")
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


    window.extractoON = []
    window.document.body.innerHTML = "<h3> Cargando ON [v" + version + "]</h3>"
    for (let i = 0; i < ss.length; i++) {
        ((await fetch("https://www.bullmarketbrokers.com/Cotizaciones/Cedears/" + total[i][0].slice(0, -1) + "D").then(resp=>{return resp})).status) == 200 ? 
        (total[i].push('✅') & window.extractoON.push(ss[i]) ) : null
        document.body.firstElementChild.innerText += "."

    }
}

// ///////////////////////////////////////////////////////////////////////////////////////////////

async function generarListaOrdenadaCEDEARS(){
    // let i=0
    // aa_json.result.find(elem=>elem.ticker==extracto[i]).stockOffer.bidTop[0].price /
    // aa_json.result.find(elem=>elem.ticker==extracto[i]+"D").stockOffer.askTop[0].price
    window.aa_json =''
    await fetch("https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?term=1&index=cedears")
        .then(respuesta=>{return respuesta.json()}).then(respuesta=>{window.aa_json=respuesta})
    
    
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

async function generarListaOrdenadaCEDEARS48(){
    // let i=0
    // aa_json.result.find(elem=>elem.ticker==extracto[i]).stockOffer.bidTop[0].price /
    // aa_json.result.find(elem=>elem.ticker==extracto[i]+"D").stockOffer.askTop[0].price
    window.aa_json =''
    await fetch("https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?term=3&index=cedears")
        .then(respuesta=>{return respuesta.json()}).then(respuesta=>{window.aa_json=respuesta})
    
    
    lista_ordenada48 = []
    extracto.forEach(ticker=>{
        cotizacion_resultante = aa_json.result.find(elem=>elem.ticker==ticker)?.stockOffer?.bidTop[0]?.price /
                                        aa_json.result.find(elem=>elem.ticker==ticker+"D")?.stockOffer?.askTop[0]?.price;
        console.info(ticker + " => " + cotizacion_resultante);
        if(!isNaN(cotizacion_resultante)){
            lista_ordenada48.push([ticker, cotizacion_resultante])
        }
    })
    lista_ordenada48.sort((a,b)=>{return b[1]-a[1]});
    console.info(lista_ordenada48);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function generarListaOrdenadaON(){
    // let i=0
    // aa_json.result.find(elem=>elem.ticker==extractoON[i]).stockOffer.bidTop[0].price /
    // aa_json.result.find(elem=>elem.ticker==extractoON[i]+"D").stockOffer.askTop[0].price
    window.aa_json =''
    await fetch("https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?term=1&index=obligacionesNegociables")
        .then(respuesta=>{return respuesta.json()}).then(respuesta=>{window.aa_json=respuesta})
    
    
    
    lista_ordenadaON = []
    extractoON.forEach(ticker=>{
        cotizacion_resultante = aa_json.result.find(elem=>elem.ticker==ticker)?.stockOffer?.bidTop[0]?.price /
                                        aa_json.result.find(elem=>elem.ticker==ticker.slice(0, -1) +"D")?.stockOffer?.askTop[0]?.price;
        console.info(ticker + " => " + cotizacion_resultante);
        if(!isNaN(cotizacion_resultante)){
            lista_ordenadaON.push([ticker, cotizacion_resultante])
        }
    })
    lista_ordenadaON.sort((a,b)=>{return b[1]-a[1]});
    console.info(lista_ordenadaON);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function generarListaOrdenadaON48(){
    // let i=0
    // aa_json.result.find(elem=>elem.ticker==extractoON[i]).stockOffer.bidTop[0].price /
    // aa_json.result.find(elem=>elem.ticker==extractoON[i]+"D").stockOffer.askTop[0].price
    window.aa_json =''
    await fetch("https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?term=3&index=obligacionesNegociables")
        .then(respuesta=>{return respuesta.json()}).then(respuesta=>{window.aa_json=respuesta})
    
    
    
    lista_ordenadaON48 = []
    extractoON.forEach(ticker=>{
        cotizacion_resultante = aa_json.result.find(elem=>elem.ticker==ticker)?.stockOffer?.bidTop[0]?.price /
                                        aa_json.result.find(elem=>elem.ticker==ticker.slice(0, -1) +"D")?.stockOffer?.askTop[0]?.price;
        console.info(ticker + " => " + cotizacion_resultante);
        if(!isNaN(cotizacion_resultante)){
            lista_ordenadaON48.push([ticker, cotizacion_resultante])
        }
    })
    lista_ordenadaON48.sort((a,b)=>{return b[1]-a[1]});
    console.info(lista_ordenadaON48);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function generarTabla(){
    ddiv = document.createElement('div');
    ddiv.style.display = 'flex';
    ddiv.style.justify-content = 'space-between';  
    
    tabla = document.createElement('table');
    ddiv.appendChild(document.createElement('div')).appendChild(tabla);
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
    
    tabla = document.createElement('table');
    ddiv.appendChild(document.createElement('div')).appendChild(tabla);
    row = tabla.insertRow();
    cell = row.insertCell();
    cell.innerText = "©polyys";
    cell = row.insertCell();
    cell.innerText = "Precio Venta MEP Cotización CEDEAR (48Hs - No Parking)";
    lista_ordenada48.forEach(elemento=> {
      row = tabla.insertRow();
      cell = row.insertCell();
      cell.innerHTML = "<strong>" + elemento[0] + "</strong>";
      cell = row.insertCell();
      cell.innerHTML = "AR$ <strong>" + elemento[1].toFixed(2) + "</strong>";
    })
    
    
    tabla = document.createElement('table');
    ddiv.appendChild(document.createElement('div')).appendChild(tabla);
    row = tabla.insertRow();
    cell = row.insertCell();
    cell.innerText = "©polyys";
    cell = row.insertCell();
    cell.innerText = "Precio Venta MEP Cotización ON (Cdo - No Parking)";
    lista_ordenadaON.forEach(elemento=> {
      row = tabla.insertRow();
      cell = row.insertCell();
      cell.innerHTML = "<strong>" + elemento[0] + "</strong>";
      cell = row.insertCell();
      cell.innerHTML = "AR$ <strong>" + elemento[1].toFixed(2) + "</strong>";
    })
    
    
    
    
    tabla = document.createElement('table');
    ddiv.appendChild(document.createElement('div')).appendChild(tabla);
    row = tabla.insertRow();
    cell = row.insertCell();
    cell.innerText = "©polyys";
    cell = row.insertCell();
    cell.innerText = "Precio Venta MEP Cotización ON  (48hs - No Parking)";
    lista_ordenadaON48.forEach(elemento=> {
      row = tabla.insertRow();
      cell = row.insertCell();
      cell.innerHTML = "<strong>" + elemento[0] + "</strong>";
      cell = row.insertCell();
      cell.innerHTML = "AR$ <strong>" + elemento[1].toFixed(2) + "</strong>";
    })
    
    
    window.document.body=document.createElement("body")
    document.body.appendChild(ddiv)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// if (typeof extracto == 'undefined'){
//     listarCEDEARS();
// }
// generarListaOrdenada();
// generarTabla();


//  POR ALGUNA RAZÓN RARA LOS "await" NO PUEDEN ESTAR EN FUNCIONES "PRINCIPALES" EN LOS SCRIPT ADJUNTADOS EN 
// UN HTML 🤷🏻‍♂️🤷🏻‍♂️🤷🏻‍♂️🤷🏻‍♂️🤷🏻‍♂️      -->  ENTONCES LOS PONGO EN FUNCIONES "ANIDADAS"
async function funcionTotal(){
    if (typeof extracto == 'undefined'){
        await listarCEDEARS();
        await listarON();
    }
    await generarListaOrdenadaCEDEARS();
    await generarListaOrdenadaCEDEARS48();
    await generarListaOrdenadaON();
    await generarListaOrdenadaON48();
    await generarTabla();
}

funcionTotal();
