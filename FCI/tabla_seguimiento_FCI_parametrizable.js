//var FCI = ['ALDIVEA' , 'BCRTAFA' , 'CDEUARA' , 'COMOPPA' , 'COMRF4A' , 'COMUSAA' , 'CONAARA' , 'CONBALA' , 'DGEST8A' , 'GALAHOR' , 'MGVRRAA' , 'MRTAFCA' , 'RJDGLOA' , 'RJDRTAA' , 'RJRTA4A' , 'SBSBALA' , 'SBSESTA' , 'SBSRPEA' , 'SBSRTOA' , 'TORRTOA'];
//var FCI = ['CONBALA' , 'CDEUARA' , 'CONAARA' , 'RJDRTAA' , 'RJDGLOA' , 'RJRTA4A' , 'SBSRPEA' , 'SBSBALA' , 'DGEST8A' , 'SBSRTOA' , 'SBSESTA' , 'COMOPPA' , 'COMUSAA' , 'COMRF4A' , 'BCRTAFA' , 'MGVRRAA' , 'GALAHOR' , 'ALDIVEA' , 'MRTAFCA' , 'TORRTOA'];


if (typeof FCI === "undefined") {
  //var FCI = ['ALDIVEA' , 'BCRTAFA' , 'CDEUARA' , 'COMOPPA' , 'COMRF4A' , 'COMUSAA' , 'CONAARA' , 'CONBALA' , 'DGEST8A' , 'GALAHOR' , 'MGVRRAA' , 'MRTAFCA' , 'RJDGLOA' , 'RJDRTAA' , 'RJRTA4A' , 'SBSBALA' , 'SBSESTA' , 'SBSRPEA' , 'SBSRTOA' , 'TORRTOA'];
  var FCI = ['CONBALA' , 'CDEUARA' , 'CONAARA' , 'RJDRTAA' , 'RJDGLOA' , 'RJRTA4A' , 'SBSRPEA' , 'SBSBALA' , 'DGEST8A' , 'SBSRTOA' , 'SBSESTA' , 'COMOPPA' , 'COMUSAA' , 'COMRF4A' , 'BCRTAFA' , 'MGVRRAA' , 'GALAHOR' , 'ALDIVEA' , 'MRTAFCA' , 'TORRTOA'];
}

if (typeof timeframe === "undefined") {
  var timeframe = '1_MONTH';
}


var ultima_semana=[];
peticion = new XMLHttpRequest()
peticion.open("GET","https://www.bloomberg.com/markets2/api/history/ARS%3ACUR//PX_LAST?timeframe="+ timeframe +"&period=daily", false)
peticion.send()
if (peticion.status === 200){
  //((JSON.parse(peticion.responseText))[0].price[0].dateTime)
  var dias_lenght = (JSON.parse(peticion.responseText))[0].price.length
    for (i=0+1; i<dias_lenght; i++) { // se omite el primer día del mes xq sino no tendría con qué comparar (no hay día previo al primer día del mes)
      ultima_semana.push((JSON.parse(peticion.responseText))[0].price[i].dateTime)
    }
}

tabla = document.createElement('table')
document.body.appendChild(tabla)

//tabla.style.border = "1px solid #000"
//tabla.style.borderCollapse = "collapse"
//tabla.style.padding = "10px"

row = tabla.insertRow()
//row.style.border = "1px solid #000"
//row.style.borderCollapse = "collapse"

cell = row.insertCell()
//cell.style.border = "1px solid #000"
//cell.style.borderCollapse = "collapse"
cell.innerText = "©polyys"

peticion.open("GET","https://www.bloomberg.com/markets2/api/quote/CUR/USDARS%3ACUR", false);peticion.send();
if (peticion.status === 200) {
  var cotizacion_dolar = JSON.parse(peticion.responseText).price;
  cell.innerHTML += "<br> <font size=-1>USD: " + cotizacion_dolar + "</font>";
}

// <font size="-2">cell = row.insertCell()
//cell.innerText = new Date(d.getDate() -1)


for (i=0; i<ultima_semana.length; i++){
  cell = row.insertCell()
//  cell.style.border = "1px solid #000"
  cell.innerText = ultima_semana[i]
}

var x;
for (x of FCI) {
  row = tabla.insertRow()
//  row.style.border = "1px solid #000"
  row.insertCell().innerHTML = '<a href="https://www.bloomberg.com/quote/' + x + ':AR" target="_blank">' + x + '</a>';
  var url = "https://www.bloomberg.com/markets2/api/history/" + x + "%3AAR/PX_LAST?timeframe=1_MONTH&period=daily"
  peticion = new XMLHttpRequest()
  peticion.open("GET", url, false)
  peticion.send()

  if (peticion.status === 200) {
    for (i=0; i<ultima_semana.length; i++) {
      cell = row.insertCell()
      var indice_dia = JSON.parse(peticion.responseText)[0].price.findIndex(Element => Element['dateTime']===ultima_semana[i])
      try{
        var porcentaje = JSON.parse(peticion.responseText)[0].price[indice_dia].value /JSON.parse(peticion.responseText)[0].price[indice_dia -1].value * 100
        cell.innerText = (porcentaje-100).toFixed(2) + "%"
        if (parseFloat(cell.innerText) < 0 ) { cell.style.color = 'red'}
      } catch(e) {
        cell.innerText = "X"
        cell.style.color = 'blue'
      }
    }
  }
}
document.body.appendChild(tabla)
