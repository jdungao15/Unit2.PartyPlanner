const partyContainer = document.querySelector("#party-container")
const form = document.querySelector("#addParty");
const URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-acc-et-web-pt-b/events"


const getPartyList = async () => {
    const response = await fetch(URL);
    const party = await response.json();
    createPartyComponent(party.data)
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
    const partyList = data.map((p, i) => {

        const card = document.createElement("div")
        const cardBody = document.createElement("div")
        const delBtn = document.createElement("i");
        const listGroup = document.createElement("ul")
        const img = document.createElement("img")
        const name = document.createElement("h5")
        const desc = document.createElement("p");
        const date = document.createElement("li");
        const loc = document.createElement("li");
        const cohortId = document.createElement("li")
        

        card.className = "card m-3"
        card.style.width = "15rem"
        delBtn.className = "fa-regular fa-calendar-xmark"
        delBtn.style.color = "#ED5E68"
        delBtn.style.opacity = "0.9"

        //Image
        img.setAttribute("src", `https://picsum.photos/200/300?random=${i}`)

        // Card Body
        cardBody.className ="card-body"
        //Title
        name.className = "card-title"
        name.textContent = p.name;
        //Description
        desc.className="card-text"
        desc.textContent = p.description

        // Append 
        cardBody.append(name, desc)
      

        //List Group Container
        listGroup.className = "list-group list-group-flush";
        // List Group
        date.className = "list-group-item"
        date.textContent = `Date: ${new Date(Date.parse(p.date))}`
        loc.className = "list-group-item"
        loc.textContent = p.location;
        cohortId.className = "list-group-item"
        cohortId.textContent = `ID: ${p.cohortId}`;

        //Append list group
        listGroup.append(date,loc,cohortId);

        card.append(delBtn, img, cardBody, listGroup)
         return card;
    })

    partyContainer.append(...partyList)
}

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
         getPartyList();
         //Reset the form
         form.reset();
       } else {
            console.error("Something went wrong with the POST")
       }

    } catch(err) {
        console.log(err)
    }
    
})

getPartyList();
