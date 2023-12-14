console.log("js");

function getKoalas() {
  console.log("in getKoalas");
  // axios call to server to GET koalas
  axios
    .get("/koalas")
    .then((response) => {
      console.log("GET response:", response.data);
      renderKoalas()
    })
    .catch((error) => {
      console.log("Koalas GET failed");
      console.log(error);
    });
} // end getKoalas

function saveKoala(event) {
  event.preventDefault()
  console.log("in saveKoala");

  //Input values from input fields
  let koalasToAdd = {}
  koalasToAdd.name = document.getElementById("nameIn").value;
  koalasToAdd.age = document.getElementById("ageIn").value;
  koalasToAdd.gender = document.getElementById("genderIn").value;

  // axios call to server to POST koalas
  axios.post("/koalas", koalasToAdd)
  .then((response) => {
console.log("in POST request", response.data);
  })
  .catch((error) => {
console.log("POST error!");
console.log(error);
  })
}

function renderKoalas() {
const viewKoalas = document.getElementById("viewKoalas")
viewKoalas.innerHTML = ''
koalas.forEach(koala => {
viewKoalas.innerHTML+=
  `
  <tr data-id="${koala.id}">
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <button onclick="readyforTransfer()">Ready for Transfer</button>
        <td><button onclick="deleteKoala()">Delete</button></td>
        <td>${book.isRead}</td>
        </tr>
    `;
});
}

function deleteKoala() {

}
function readyforTransfer() {
  
}

getKoalas();
