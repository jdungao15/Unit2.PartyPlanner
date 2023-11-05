const partyContainer = document.querySelector("#party-container")
const form = document.querySelector("#addParty");
const URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-acc-et-web-pt-b/events"
let partyList = [];

const getPartyList = async () => {
    const response = await fetch(URL);
    const party = await response.json();
    partyList = party.data;
    createPartyComponent(partyList)
}

const dateToISO = (dateTime) => {
    // New Date
    const date = new Date();
    // Convert date to ISO format
    const isoString = date.toISOString();
    //Find the index of T
    const idx = isoString.indexOf("T")
    //Split the string starting from "T" to end of string
    const timezone = isoString.substring(idx, isoString.length);
    return `${dateTime}${timezone}`;
}

const createPartyComponent= (data) => {
    partyContainer.innerHTML = ""
    const partyList = data.map((p, i) => {
        const card = document.createElement("div")
       
       
       card.innerHTML += ` 
            <div class="card m-3" style="width: 15rem;">
            <img src="https://picsum.photos/200/300?random=${i}">
            <div class="card-body">
                <h5 class="card-title">${p.name}</h5>
                <p class="card-text">${p.description}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Date:${new Date(Date.parse(p.date))}</li>
                <li class="list-group-item">Location: ${p.location}</li>
                <li class="list-group-item">ID: ${p.cohortId}</li>
            </ul>
            <div class="btn__delete" id="btn__delete">
                <a href="" >DELETE</a>
                <div class="hoverBtn">
                <p value=${p.id} class="hoverText">ARE YOU SURE?</p>
                </div>
            </div>
            </div>
        `
         return card;
    })

    partyContainer.append(...partyList)
}

getPartyList();


form.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    //Input
    const name = document.querySelector("#name").value
    const description = document.querySelector("#description").value
    const dateVal = document.querySelector("#date").value
    const location = document.querySelector("#location").value
    const date = dateToISO(dateVal);
    
    // create a new obj of new party
    const newParty = {
       name,
       description,
       date,
       location
    }
    try {
       const response =  await fetch(URL, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(newParty)
       })
       if (response.ok) {
         console.log("Successful POST request")
         // Get the new list of party
         form.reset();
         getPartyList();
         //Reset the form
         
       } else {
            console.error("Something went wrong with the POST")
       }

    } catch(err) {
        console.log(err)
    }
    
})

partyContainer.addEventListener("click", async (e) => {
    e.preventDefault();
    if (e.target.classList.value === "hoverText") {
      id = e.target.getAttribute('value')
       
      try {
        const response = await fetch(`${URL}/${id}`, {method: "DELETE"})
        console.log(response)
        if (response.ok) {
            console.log("Successfully Deleted")
            getPartyList();
        }
      } catch(err) {
        console.log(err)
      }
      
    }
})

