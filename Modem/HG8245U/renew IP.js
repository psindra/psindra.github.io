// desconectar
fetch("http://192.168.1.1/html/bbsp/waninfo/set.cgi?x=InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1&RequestFile=html/bbsp/waninfo/waninfowait.html", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "es",
    "cache-control": "max-age=0",
    "content-type": "application/x-www-form-urlencoded",
    "upgrade-insecure-requests": "1"
  },
  "referrer": "http://192.168.1.1/html/bbsp/waninfo/waninfo.asp",
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": "x.X_HW_ConnectionControl=0&x.X_HW_Token=a052994853da4fe65f6bad8b05a3d4a1",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});

//conectar
fetch("http://192.168.1.1/html/bbsp/waninfo/set.cgi?x=InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1&RequestFile=html/bbsp/waninfo/waninfowait.html", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "es",
    "cache-control": "max-age=0",
    "content-type": "application/x-www-form-urlencoded",
    "upgrade-insecure-requests": "1"
  },
  "referrer": "http://192.168.1.1/html/bbsp/waninfo/waninfo.asp",
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": "x.X_HW_ConnectionControl=0&x.X_HW_Token=a052994853da4fe65f6bad8b05a3d4a1",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});
