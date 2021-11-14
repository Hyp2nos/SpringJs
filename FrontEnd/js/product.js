const urlString = window.location.search;
const urlParams = new URLSearchParams(urlString);

let prodId = "";
let prodName = "";
let transactions = [];

showExistProduit();

function saveProduct() {
  prodId = document.querySelector("#ProductId").value;
  prodName = document.querySelector("#ProductName").value;

  //Preparer la requete
  fetch("http://localhost:8888/product", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: prodId,
      name: prodName,
      transactionList: transactions,
    }),
  })
    .then((result) => result.json())
    .then((data) => {
      document.getElementById("ProductId").value = data.id;
      document.querySelector("#ProductName").value = data.name;
      transactions = data.transactionList;
        showTransactionList();
      showMessage(data.name);
    });
}

function showMessage(message) {
  document.querySelector("#successMessage").innerHTML = `
    <p>Product ${message} a été ajouter à la base</p>
    `;

  setTimeout(function () {
    document.querySelector("successMessage").innerHTML = "";
  }, 3000);
}

function showExistProduit(params) {
  if (urlParams.get("id") != null) {
    fetch("http://localhost:8888/product?id=" + urlParams.get("id"))
      .then((respones) => respones.json())
      .then((data) => {
        document.querySelector("#ProductId").value = data.id;
        document.querySelector("#ProductName").value = data.name;
        transactions = data.transactionList;
        showTransactionList();
      });
  }
}

function SaveTransaction() {
  const prodId = document.querySelector("#ProductId").value;
  const qty = document.querySelector("#transactionQty").value;

  if (prodId != "" && qty != "") {
    transactions.push({ amount: parseInt(qty) });
    closeModal();
    document.querySelector("#transactionQty").value = "";
    saveProduct();
  } else {
    alert("Impossible d'effectuer la transaction");
  }
}

let modalBtn = document.querySelector(".modal-btn");
let modelBg = document.querySelector(".modal-bg");
modalBtn.addEventListener("click", function () {
  modelBg.classList.add("bg-active");
});

function closeModal() {
  modelBg.classList.remove("bg-active");
}

let modalClose = document.querySelector(".modal-close");
modalClose.addEventListener("click", function () {
  closeModal();
});

function setTableLayout() {
  document.getElementById("TableHolder").innerHTML = `
    <table class="content-table" >
    <thead>
        <tr>
            <th>date</th>
            <th>amount</th>
        </tr>
    </thead>
    <tbody id="transactionList">
    
    </tbody>
    </table>
    `;
}

function showTransactionList() {
    setTableLayout();
    let transactionTable = '';
    transactions.reverse();
    transactions.forEach(element => {
        transactionTable +=`
        <tr>
            <td>${element.transactionDateTime}</td>
            <td>${element.amount}</td>
        </tr>
        `
        document.querySelector('#transactionList').innerHTML=transactionTable;
    })
}
