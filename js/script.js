const username = document.getElementById('username-register')
const password = document.getElementById('password-register')
const password_confirm = document.getElementById('repeat-password-register')
const buttonRegister = document.getElementById('button-register')
const modal = document.getElementById('exampleModal')
const LocalStorage = JSON.parse(localStorage.getItem('cadastros')) || []
const recados = JSON.parse(localStorage.getItem('listaRecados')) || []

async function getInfo() {
    const response = await fetch("http://localhost:8080/recados")
    const recados = await response.json()
    console.log(recados);
    mostrarRecados(recados);
}

getInfo()

// Funcao para fechar modal
function closeModal() {
    modal.setAttribute('class', '')
    modal.setAttribute('style', 'display: none')
    body.setAttribute('class', '')
    body.setAttribute('style', '')
}

// Funcao para criar conta
function createAccount() {
    const body = document.getElementById('body')
    let cadastros = JSON.parse(localStorage.getItem('cadastros')) || []
    
    for(user of LocalStorage) {
        if(username.value === user.username) return alert('Usuario ja registrado')
    }

    if(username.value === '' || password.value === '' || password_confirm.value === '') {
        modal.setAttribute('class', 'modal fade show')
        modal.setAttribute('style', 'display: block')
        body.setAttribute('class', 'modal-open')
        body.setAttribute('style', 'overflow: hidden; padding-right: 0px;')
    }

    var user = {
        username: username.value,
        password: password.value,
        password_confirm: password_confirm.value,
        recados: recados
    }

    cadastros.push(user)

    console.log(user)

    localStorage.setItem('cadastros', JSON.stringify(cadastros))
}

// Funcao para logar
const loginUsername = document.getElementById('login-username')
const loginPassword = document.getElementById('login-password')

function Login() {
    window.href = 'errand.html'
}

// codigo para page recados

const tableBody = document.getElementById("table-body")
const addItem = document.getElementById("add-item")


// Funcao para add recados

async function addRecados() {
    const descricao = prompt('Digite o recado')
    const detalhes = prompt('Digite o detalhe')
    const newItem = {
        descricao,
        detalhes,
      };
    
      await fetch("http://localhost:8080/recados", 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
    
      getInfo();
}

// Funcao para deletar um recado

async function removerRecados(id) {
    await fetch(`http://localhost:8080/recados/${id}`, {
        method: "DELETE",
    });

    return getInfo()
}

// Funcao para alterar um recado

async function alterarRecados(id) {
    const descricao = prompt('Digite a nova descrição')
    const detalhes = prompt('Digite o novo detalhe')
    const newItem = {
        descricao,
        detalhes,
      };
      
    await fetch(`http://localhost:8080/recados/${id}`, 
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
    
      getInfo();
}

// Funcao para mostrar recados

function mostrarRecados(recados) {
    tableBody.innerHTML = ''
    return recados.map((errand) => {

        console.log(errand);

        const tr = document.createElement("tr");
        const th = document.createElement("th");
        const td2 = document.createElement("td");
        const td1 = document.createElement("td");
        const td3 = document.createElement("td");
        const containerButton = document.createElement("div");
        const changeButton = document.createElement("div");
        const deleteButton = document.createElement("div");
    
        const position = recados.indexOf(errand);
    
        th.setAttribute("scope", "row");
        th.setAttribute("class", "text-center");
        td1.setAttribute("class", "text-center");
        td2.setAttribute("class", "text-center");
        td3.setAttribute(
          "class",
          "text-center d-flex align-items-center justify-content-around"
        );

        containerButton.setAttribute("class", "d-flex flex-row");
        changeButton.setAttribute("class", "button-table rounded-3 me-2");
        changeButton.setAttribute("onclick", `alterarRecados(${errand.id})`);
        deleteButton.setAttribute("class", "button-table rounded-3");
        deleteButton.setAttribute("onclick", `removerRecados(${errand.id})`);
    
        tableBody.appendChild(tr);
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        td3.appendChild(containerButton);
        containerButton.appendChild(changeButton);
        containerButton.appendChild(deleteButton);
    
        td1.innerText = errand.descricao;
        td2.innerText = errand.detelhes;
        th.innerText = position + 1;
        changeButton.innerText = "Alterar";
        deleteButton.innerText = "Excluir";
      });
}

// funcao para salvar no localStorage

function salvarNoStorage() {
    localStorage.setItem('listaRecados', JSON.stringify(recados))
}