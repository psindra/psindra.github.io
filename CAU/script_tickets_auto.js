time = 3
h = Array();
index = 0;
alert("Welcome!");
h[0] = () => document.getElementsByTagName('fieldset')[6].children[0].children[2].children[2].click()
h[1] = () => document.querySelector("body > div:nth-child(7) > div.MenuTableContainer > table > tbody > tr:nth-child(3) > td.MenuEntryNameHover").click()
h[2] = () => document.querySelector("body > table > tbody > tr:nth-child(1) > td:nth-child(3) > a").click()
h[3] = () => document.querySelector("#WIN_1_rc3id836890033").checked = true; 
h[4] = () => document.querySelector("#arid_WIN_1_836890034").value = prompt("ticket: ")
h[5] = () => document.querySelector("#WIN_1_836890075 > div > a").click()
h[6] = () => document.querySelector("#arid_WIN_1_836890191").value = 'DASFCB/1'
h[7] = () => document.querySelector("#arid_WIN_1_836890191").dispatchEvent(new Event('change'))
h[8] = () => document.querySelector("#WIN_1_836890174").click()
h[9] = () => document.querySelector("#WIN_1_836890023").click()

intervalo = setInterval( ()=>
		{
			try{
				h[index]();
				index++;
			} catch(e) {};
	
			if (index >= h.length) {
				index = 0;
				if (!confirm("más tickets por cargar??")) {
					clearInterval(intervalo);
				}
			}
		}, time * 1000);
