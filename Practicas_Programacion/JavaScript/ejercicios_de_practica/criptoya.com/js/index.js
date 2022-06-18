var dai;
const DOM_table = document.querySelector("table");
const DOM_tBody = document.querySelector("table>tbody");
let _choosenOrder = [0, true]

const ordenar = function(rowsArray, columna=_choosenOrder[0], orden=_choosenOrder[1]){
    rowsArray.sort((a,b)=>{
        return a.querySelector(`th:nth-child(${columna+1}),td:nth-child(${columna+1})`).textContent > b.querySelector(`th:nth-child(${columna+1}),td:nth-child(${columna+1})`).textContent? (orden*2-1) : (orden*-2+1);
    })
    // console.log(...rowsArray);
    let _tBody = document.createElement("tbody");
    _tBody.append(...rowsArray);
    DOM_table.replaceChild(_tBody, DOM_table.tBodies[0]);
    // DOM_table.replaceChild(DOM_tBody, _tBody);
    // DOM_tBody.replaceWith(_tBody);
    return rowsArray;
}

let _Rows;
const actualizar = function(){
    fetch("https://criptoya.com/api/dai/ars").then(resp=> {return resp.json()}).then(json=>{/*console.log(json)*/;dai=json}).then(()=>{
        _Rows = Object.entries(dai).map(broker=>{
        // console.log(broker[0]);
            
        let _row = document.createElement("tr");
        let _th = document.createElement("th");
        _th = document.createElement("th");
        _th.textContent = broker[0];
        _row.append(_th);
    
        let _td = document.createElement("td");
        _td = document.createElement("td");
        _td.textContent = broker[1].ask;
        _row.append(_td);
        _td = document.createElement("td");
        _td.innerText = broker[1].totalAsk;
        _row.append(_td);
        _td = document.createElement("td");
        _td.textContent = broker[1].bid;
        _row.append(_td);
        _td = document.createElement("td");
        _td.innerText = broker[1].totalBid;
        _row.append(_td);
        
        return _row;
        })
    
        ordenar(_Rows);
    })
}
actualizar();


const _Nombre = document.querySelector("table>thead>tr>th.Nombre");
_Nombre.order = false;
const _ask = document.querySelector("table>thead>tr>th.ask");
_ask.order = false;
const _askTotal = document.querySelector("table>thead>tr>th.askTotal");
_askTotal.order = false;
const _bid = document.querySelector("table>thead>tr>th.bid");
_bid.order = false;
const _bidTotal = document.querySelector("table>thead>tr>th.bidTotal");
_bidTotal.order = false;

_Nombre.addEventListener("click", (ev)=>{
    _Nombre.orden = ! _Nombre.orden;
    _choosenOrder = [0, _Nombre.orden]
    ordenar(_Rows, 0, _Nombre.orden);
    
    _ask.removeAttribute("active");
    _askTotal.removeAttribute("active");
    _bid.removeAttribute("active");
    _bidTotal.removeAttribute("active");
    _Nombre.setAttribute("active", _Nombre.orden);
});
_ask.addEventListener("click", (ev)=>{
    _ask.orden = ! _ask.orden;
    _choosenOrder = [1, _ask.orden]
    ordenar(_Rows, 1, _ask.orden);
    if(_ask.orden){ _Rows[0].childNodes[1].setAttribute("active", null);}
    
    _Nombre.removeAttribute("active");
    _askTotal.removeAttribute("active");
    _bid.removeAttribute("active");
    _bidTotal.removeAttribute("active");
    _ask.setAttribute("active", _ask.orden)
});
_askTotal.addEventListener("click", (ev)=>{
    _askTotal.orden = ! _askTotal.orden;
    _choosenOrder = [2, _askTotal.orden]
    ordenar(_Rows, 2, _askTotal.orden);
    if(_askTotal.orden){ _Rows[0].childNodes[2].setAttribute("active", null);}
    
    _Nombre.removeAttribute("active");
    _ask.removeAttribute("active");
    _bid.removeAttribute("active");
    _bidTotal.removeAttribute("active");
    _askTotal.setAttribute("active", _askTotal.orden)
});
_bid.addEventListener("click", (ev)=>{
    _bid.orden = ! _bid.orden;
    _choosenOrder = [3, _bid.orden]
    ordenar(_Rows, 3, _bid.orden);
    if(!_bid.orden){ _Rows[0].childNodes[3].setAttribute("active", null);}
    
    _Nombre.removeAttribute("active");
    _ask.removeAttribute("active");
    _askTotal.removeAttribute("active");
    _bidTotal.removeAttribute("active");
    _bid.setAttribute("active", _bid.orden)
});
_bidTotal.addEventListener("click", (ev)=>{
    _bidTotal.orden = ! _bidTotal.orden;
    _choosenOrder = [4, _bidTotal.orden]
    ordenar(_Rows, 4, _bidTotal.orden);
    if(!_bidTotal.orden){ _Rows[0].childNodes[4].setAttribute("active", null);}

    _Nombre.removeAttribute("active");
    _ask.removeAttribute("active");
    _askTotal.removeAttribute("active");
    _bid.removeAttribute("active");
    _bidTotal.setAttribute("active", _bidTotal.orden)
});


setInterval(actualizar, 10000);
