console.log("js");
getKoalas()
function getKoalas() {
  console.log("in getKoalas");
  // axios call to server to GET koalas
  axios
    .get("/koalas")
    .then((response) => {
      console.log("GET response:", response.data);
      renderKoalas(response.data);
    })
    .catch((error) => {
      console.log("Koalas GET failed");
      console.log(error);
    });
} // end getKoalas

function saveKoala(event) {
  event.preventDefault();
  console.log("in saveKoala");

  //Input values from input fields
  let koalasToAdd = {};
  koalasToAdd.name = document.getElementById("nameIn").value;
  koalasToAdd.age = document.getElementById("ageIn").value;
  koalasToAdd.gender = document.getElementById("genderIn").value;
  koalasToAdd.gender = document.getElementById("readyForTransferIn").value;
  koalasToAdd.gender = document.getElementById("notesIn").value;

  // axios call to server to POST koalas
  axios
    .post("/koalas", koalasToAdd)
    .then((response) => {
      console.log("in POST request", response.data);
      document.getElementById("nameIn").value = "";
      document.getElementById("ageIn").value = "";
      document.getElementById("genderIn").value = "";
      document.getElementById("readyForTransferIn").value = "";
      document.getElementById("notesIn").value = "";
      getKoalas()
    })
    .catch((error) => {
      console.log("POST error!");
      console.log(error);
    });
}

function renderKoalas() {
  const viewKoalas = document.getElementById("viewKoalas");
  viewKoalas.innerHTML = "";
  koalas.forEach((koala) => {
    viewKoalas.innerHTML += `
  <tr data-id="${koala.id}">
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.readyforTransfer}</td>
        <td>${koala.notes}</td>
        <button onclick="readyforTransfer(event)">Ready for Transfer</button>
        <td><button onclick="deleteKoala(event, true)">Delete</button></td>
        </tr>
    `;
  });
}

function deleteKoala(event) {
  console.log("incoming event", event.target);
  event.preventDefault();
  const koalaId = event.target.closest("tr").dataset.id;

  axios
    .delete(`/books/${koalaId}`)
    .then((response) => {
      console.log("Bye bye Koala:", koalaId);
      getKoalas();
    })
    .catch((error) => {
      console.log("DELETE NO GOOD", error);
      res.sendStatus(500);
    });
}
function readyforTransfer(event, readyforTransfer) {
  event.preventDefault();
  axios
    .put(`/books/${koalaId}`, { readyforTransfer })
    .then((response) => {
      console.log("Koala is ready to transfer!:", koalaId);
      getKoalas();
    })
    .catch((error) => {
      console.log("NO I DONT WANNA GO!:");
      console.log(error);
    });
}
