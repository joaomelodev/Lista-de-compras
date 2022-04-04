const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sAlimento = document.querySelector('#m-alimento');
const sQuantidade = document.querySelector('#m-quantidade');
const sValor = document.querySelector('#m-valor');
const btnSalvar = document.querySelector('#btnSalvar');
const btn = document.querySelector('#enviar');



let itens
let id





function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sAlimento.value = itens[index].alimento
    sQuantidade.value = itens[index].quantidade
    sValor.value = itens[index].valor
    sTotal = sQuantidade.value *  sValor.value
    
    id = index
  } else {
    sAlimento.value = ''
    sQuantidade.value = ''
    sValor.value = ''
 
    }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.alimento}</td>
    <td>${item.quantidade}</td>
    <td>R$ ${item.valor}</td>
    <td>R$ ${item.total}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr);
}

btnSalvar.onclick = e => {
	
	if (sAlimento.value == '' || sQuantidade.value == '' || sValor.value == '') {
		return
	}
	
	e.preventDefault();
	console.log(id)
 
	if (id !== undefined) {
		itens[id].alimento = sAlimento.value
		itens[id].quantidade = sQuantidade.value
		itens[id].valor = sValor.value
		itens[id].total = sValor.value * sQuantidade.value
    itens[id].valortotal = sValorTotal
	} else {
		itens.push({
			'alimento': sAlimento.value,
			'quantidade': sQuantidade.value,
			'valor': sValor.value,
			'total': sValor.value * sQuantidade.value
      
		})
	}
	
 

	setItensBD()
	
	modal.classList.remove('active')
	loadItens()
	id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })
  document.querySelector('.end').innerHTML = ('Valor Final: R$ ') + final(itens);
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()





btn.addEventListener ("click", function teste (e){
e.preventDefault();

const valorTotal = document.querySelector ('.valortotal');

let value = valorTotal.value


console.log(value);

document.querySelector('.meta').innerHTML = ('Meta: R$ ') + value;

valorTotal.value = null;



} );




/* data = itens*/
function final(data) {

  console.log(data);
  let totalItems = 0;

  for (const elem of data) {
    console.log(elem);
    totalItems += elem.total; 
  }

  return totalItems;

}
