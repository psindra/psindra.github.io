<script>
tabla = document.createElement('table')
document.body.appendChild(tabla)

row = tabla.insertRow()
cell = row.insertCell()
cell.innerHTML = "texto" // cell.innerText = "texto"
cell.style.color = 'red'
</script>
