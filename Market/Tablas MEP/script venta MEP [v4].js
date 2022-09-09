// "use strict";
var version = "4.0.1";
// bar = ""
// bar =await fetch("https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?_ts=1634917153912&term=3&index=cedears").then(respuesta=>{return respuesta})
// // bar =fetch("https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?term=3&index=cedears")
// // Contado Inmediato
// // https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?_ts=1634921905336&term=1&index=cedears&sortColumn=ticker&isAscending=true
// aa_json = bar.json().then(resp=>{return resp});

async function listarCEDEARS(){
    let listadoCedears = []
    await fetch("https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?term=3&index=cedears")
        .then(respuesta=>{return respuesta.json()})
        .then(json=> {
            json.result.forEach(elemento=>{
                listadoCedears.push([elemento.ticker]);
            })
        })

    window.extracto = []
    window.document.body.innerHTML = "<h3> Cargando CEDEARS [v" + version + "]</h3>"
    window.document.body.style.wordWrap = 'break-word'
    return Promise.all(
        listadoCedears.map(item=>{
            return fetch("https://www.bullmarketbrokers.com/Cotizaciones/Cedears/" + item[0] + "D", {redirect: 'manual'})
            .then(respuesta=> {
                if (respuesta.status == 200){
                    item.push('✅');
                    window.extracto.push(item[0]);
                }
                document.body.firstElementChild.innerText += ".";
                return respuesta;
                return Promise.resolve();
            })
            .catch(err=>{
                document.body.firstElementChild.innerText += ".";
                Promise.resolve();
            });
        })
    )
}

// ///////////////////////////////////////////////////////////////////////////////////////////////


async function listarON(){
    let listadoON = []
    await fetch("https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?term=3&index=obligacionesNegociables")
    .then(respuesta=>{return respuesta.json()})
    .then(json=> {
        json.result.forEach(elemento=>{
            listadoON.push([elemento.ticker]);
        })
    })

    window.extractoON = []
    window.document.body.innerHTML += "<h3> Cargando ON [v" + version + "]</h3>"
    window.document.body.style.wordWrap = 'break-word'
    return Promise.all(
        listadoON.map(item=>{
            return fetch("https://www.bullmarketbrokers.com/Cotizaciones/Acciones/" + item[0].slice(0, -1) + "D", {redirect: 'manual'})
            .then(respuesta=> {
                if (respuesta.status == 200){
                    item.push('✅');
                    window.extractoON.push(item[0]);
                }
                document.body.lastElementChild.innerText += "#";
                return respuesta;
                return Promise.resolve();
            })
            .catch(err=>{
                document.body.lastElementChild.innerText += "#";
                Promise.resolve(err);
            });
        })
    )
}

// ///////////////////////////////////////////////////////////////////////////////////////////////
var lista_ordenada = {};
async function generarListaOrdenadaCEDEARS(){
    lista_ordenada["Cdo"] = [];
    return fetch("https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?term=1&index=cedears")
    .then(respuesta=>{return respuesta.json()})
    .then(json=> {
        return json.result;
    })
    .then(listado=>{
        console.info("\n\nCedears Cdo:");
        window.extracto.forEach(ticker=>{
            cotizacion_resultante = listado.find(elem=>elem.ticker==ticker)?.stockOffer?.bidTop[0]?.price /
                                    listado.find(elem=>elem.ticker==ticker+"D")?.stockOffer?.askTop[0]?.price;
            if(!isNaN(cotizacion_resultante)){
                console.info(ticker + " => " + cotizacion_resultante);
                lista_ordenada["Cdo"].push([ticker, cotizacion_resultante])
            }
        })
        return lista_ordenada["Cdo"];
    })
    .then(()=>{
        lista_ordenada["Cdo"].sort((a,b)=>{return b[1]-a[1]});
        // console.info(lista_ordenada);
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function generarListaOrdenadaCEDEARS48(){
    lista_ordenada["48hs"] = [];
    return fetch("https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?term=3&index=cedears")
    .then(respuesta=>{return respuesta.json()})
    .then(json=> {
        return json.result;
    })
    .then(listado=>{
        console.info("\n\nCedears 48hs:");
        window.extracto.forEach(ticker=>{
            cotizacion_resultante = listado.find(elem=>elem.ticker==ticker)?.stockOffer?.bidTop[0]?.price /
                                    listado.find(elem=>elem.ticker==ticker+"D")?.stockOffer?.askTop[0]?.price;
            
            if(!isNaN(cotizacion_resultante)){
                console.info(ticker + " => " + cotizacion_resultante);
                lista_ordenada["48hs"].push([ticker, cotizacion_resultante])
            }
        })
        return lista_ordenada["48hs"];
    })
    .then(()=>{
        lista_ordenada["48hs"].sort((a,b)=>{return b[1]-a[1]});
        // console.info(lista_ordenada);
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function generarListaOrdenadaON(){
    // // let i=0
    // // aa_json.result.find(elem=>elem.ticker==extractoON[i]).stockOffer.bidTop[0].price /
    // // aa_json.result.find(elem=>elem.ticker==extractoON[i]+"D").stockOffer.askTop[0].price
    // window.aa_json =''
    // await fetch("https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?term=1&index=obligacionesNegociables")
    //     .then(respuesta=>{return respuesta.json()}).then(respuesta=>{window.aa_json=respuesta})
    
    
    
    // lista_ordenadaON = []
    // extractoON.forEach(ticker=>{
    //     cotizacion_resultante = aa_json.result.find(elem=>elem.ticker==ticker.slice(0, -1) +"O")?.stockOffer?.bidTop[0]?.price /
    //                                     aa_json.result.find(elem=>elem.ticker==ticker.slice(0, -1) +"D")?.stockOffer?.askTop[0]?.price;
    //     // console.info(ticker + " => " + cotizacion_resultante);
    //     if(!isNaN(cotizacion_resultante)){
    //         lista_ordenadaON.push([ticker, cotizacion_resultante])
    //     }
    // })
    // lista_ordenadaON.sort((a,b)=>{return b[1]-a[1]});
    // // console.info(lista_ordenadaON);


    lista_ordenada["ON"] = [];
    return fetch("https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?term=1&index=obligacionesNegociables")
    .then(respuesta=>{return respuesta.json()})
    .then(json=> {
        return json.result;
    })
    .then(listado=>{
        console.info("\n\nON Cdo:");
        window.extractoON.forEach(ticker=>{
            cotizacion_resultante = listado.find(elem=>elem.ticker==ticker.slice(0, -1) +"O")?.stockOffer?.bidTop[0]?.price /
                                    listado.find(elem=>elem.ticker==ticker.slice(0, -1) +"D")?.stockOffer?.askTop[0]?.price;
            if(!isNaN(cotizacion_resultante)){
                console.info(ticker + " => " + cotizacion_resultante);
                lista_ordenada["ON"].push([ticker, cotizacion_resultante])
            }
        })
        return lista_ordenada["ON"];
    })
    .then(()=>{
        lista_ordenada["ON"].sort((a,b)=>{return b[1]-a[1]});
        // console.info(lista_ordenada);
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function generarListaOrdenadaON48(){
    // // let i=0
    // // aa_json.result.find(elem=>elem.ticker==extractoON[i]).stockOffer.bidTop[0].price /
    // // aa_json.result.find(elem=>elem.ticker==extractoON[i]+"D").stockOffer.askTop[0].price
    // window.aa_json =''
    // await fetch("https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?term=3&index=obligacionesNegociables")
    //     .then(respuesta=>{return respuesta.json()}).then(respuesta=>{window.aa_json=respuesta})
    
    
    
    // lista_ordenadaON48 = []
    // extractoON.forEach(ticker=>{
        //     cotizacion_resultante = aa_json.result.find(elem=>elem.ticker==ticker.slice(0, -1) +"O")?.stockOffer?.bidTop[0]?.price /
        //                                     aa_json.result.find(elem=>elem.ticker==ticker.slice(0, -1) +"D")?.stockOffer?.askTop[0]?.price;
        //     // console.info(ticker + " => " + cotizacion_resultante);
        //     if(!isNaN(cotizacion_resultante)){
            //         lista_ordenadaON48.push([ticker, cotizacion_resultante])
            //     }
            // })
            // lista_ordenadaON48.sort((a,b)=>{return b[1]-a[1]});
            // // console.info(lista_ordenadaON48);
            
            
    lista_ordenada["ON48"] = [];
    return fetch("https://www.bullmarketbrokers.com/Information/StockPrice/GetStockPrices?term=3&index=obligacionesNegociables")
    .then(respuesta=>{return respuesta.json()})
    .then(json=> {
        return json.result;
    })
    .then(listado=>{
        console.info("\n\nON 48hs:");
        window.extractoON.forEach(ticker=>{
            cotizacion_resultante = listado.find(elem=>elem.ticker==ticker.slice(0, -1) +"O")?.stockOffer?.bidTop[0]?.price /
                                    listado.find(elem=>elem.ticker==ticker.slice(0, -1) +"D")?.stockOffer?.askTop[0]?.price;
            if(!isNaN(cotizacion_resultante)){
                console.info(ticker + " => " + cotizacion_resultante);
                lista_ordenada["ON48"].push([ticker, cotizacion_resultante])
            }
        })
        return lista_ordenada["ON48"];
    })
    .then(()=>{
        lista_ordenada["ON48"].sort((a,b)=>{return b[1]-a[1]});
        // console.info(lista_ordenada);
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function generarTabla(){
    ddiv = document.createElement('div');
    ddiv.style.display = 'flex';
    ddiv.style.justifyContent = 'space-between';
    
    tabla = document.createElement('table');
    ddiv.appendChild(document.createElement('div')).appendChild(tabla);
    row = tabla.insertRow();
    cell = row.insertCell();
    cell.innerText = "©polyys";
    cell = row.insertCell();
    cell.innerText = "Precio Venta MEP Cotización CEDEAR (Cdo - No Parking)";
    lista_ordenada["Cdo"].forEach(elemento=> {
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
    lista_ordenada["48hs"].forEach(elemento=> {
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
    lista_ordenada["ON"].forEach(elemento=> {
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
    lista_ordenada["ON48"].forEach(elemento=> {
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
        // await listarCEDEARS();
        // await listarON();
        await Promise.all([listarCEDEARS(), listarON()])
    }
    await generarListaOrdenadaCEDEARS();
    await generarListaOrdenadaCEDEARS48();
    await generarListaOrdenadaON();
    await generarListaOrdenadaON48();
    await generarTabla();
}

funcionTotal();
