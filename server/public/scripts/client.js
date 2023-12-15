console.log("js");
function onReady() {
  getKoalas()
}

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
  koalasToAdd.ready_for_transfer = document.getElementById("readyForTransferIn").value;
  koalasToAdd.notes = document.getElementById("notesIn").value;
  console.log("Koalas To Add:", koalasToAdd);

  // axios call to server to POST koalas
  axios({
    method: 'POST',
    url: "/koalas",
    data: koalasToAdd
  })
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

function renderKoalas(koalas) {
  const viewKoalas = document.getElementById("viewKoalas");
  console.log("Koalas:", koalas);
  viewKoalas.innerHTML = "";
  koalas.forEach((koala) => {


    viewKoalas.innerHTML += `
  <tr data-id="${koala.id}">
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.ready_for_transfer}</td>
        <td>${koala.notes}</td>
        <td><button id ="${koala.id}" onclick="readyforTransfer(event, true)">Ready for Transfer</button></td>
        <td><button onclick="deleteKoala(event)">Delete</button></td>
        </tr>
    `;
  });
  
  // loop through koalas array to hide button 
  for(let koalaRFT of koalas){
  // console.log("koalaRFT", koalaRFT.ready_for_transfer)
  // if koala ready for transfer is true, change btn to hidden
  if(koalaRFT.ready_for_transfer === true) {
      // console.log("if statement working:", koalaRFT.ready_for_transfer);
      // declare btn = to id of button
      let transferBtn = document.getElementById(`${koalaRFT.id}`)
      // set button by id equal to hidden
      transferBtn.style.visibility = "hidden"
    }
  }
}

function deleteKoala(event) {
  console.log("incoming event", event.target);
  event.preventDefault();
  const koalaId = event.target.closest("tr").dataset.id;

  axios
    .delete(`/koalas/${koalaId}`)
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
  let koalaId = event.target.closest("tr").dataset.id
  axios
    .put(`/koalas/${koalaId}`, { readyforTransfer })
    .then((response) => {
      console.log("Koala is ready to transfer!:", koalaId);
      getKoalas();
    })
    .catch((error) => {
      console.log("NO I DONT WANNA GO!:");
      console.log(error);
    });

}

onReady()