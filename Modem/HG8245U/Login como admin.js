//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//logearse como admininstrador 
var cookie = document.cookie;
if("" != cookie) {
	var date = new Date();
	date.setTime(date.getTime() - 10000);
	var cookie22 = cookie + ";expires=" + date.toGMTString();
	document.cookie = cookie22;
}
var cnt;
$.ajax({
	type: "POST",
	async: false,
	cache: false,
	url: '/asp/GetRandCount.asp',
	success: function(data) {
		cnt = data;
	}
});
var Form = new webSubmitForm();
var cookie2 = "Cookie=body:" + "Language:" + Language + ":" + "id=-1;path=/";
Form.addParameter('UserName', 'admin');
Form.addParameter('PassWord', base64encode('CalVxePV1!'));
document.cookie = cookie2;
Form.addParameter('x.X_HW_Token', cnt);
Form.setAction('/login.cgi');
Form.submit();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// con "192.168.1.1"

var cookie = document.cookie;
if("" != cookie) {
	var date = new Date();
	date.setTime(date.getTime() - 10000);
	var cookie22 = cookie + ";expires=" + date.toGMTString();
	document.cookie = cookie22;
}
var cnt;
$.ajax({
	type: "POST",
	async: false,
	cache: false,
	url: 'http://192.168.1.1/asp/GetRandCount.asp',
	success: function(data) {
		cnt = data;
	}
});
var Form = new webSubmitForm();
var cookie2 = "Cookie=body:" + "Language:" + Language + ":" + "id=-1;path=/";
Form.addParameter('UserName', 'admin');
Form.addParameter('PassWord', base64encode('CalVxePV1!'));
document.cookie = cookie2;
Form.addParameter('x.X_HW_Token', cnt);
Form.setAction('http://192.168.1.1/login.cgi');
Form.submit();
