inter = setInterval(()=>{
    xhr = new XMLHttpRequest();
    xhr.open("POST", "https://open.bymadata.com.ar/vanoms-be-core/rest/api/bymadata/free/cedears", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        "excludeZeroPxAndQty": true,
        "T2": true,
        "T1": false,
        "T0": false,
        "Content-Type": "application/json"
    }));
}
, 10000)

JSON.parse(xhr.response).find(it=>it.symbol == "AAPL")

clearInterval(inter)
