const partyContainer = document.querySelector("#party-container")

const getPartyList = async () => {
    const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-acc-et-web-pt-b/events");
    const party = await response.json();
    console.log(party.data)
    createParty(party.data)
}

const getRandomImage = async () => {
    const response = await fetch("https://api.api-ninjas.com/v1/randomimage?category=nature");
    const data = await response.json();
    console.log(data);
}

getRandomImage();

const createParty= (data) => {
    const partyList = data.map((p, i) => {

        const card = document.createElement("div")
        const cardBody = document.createElement("div")
        const listGroup = document.createElement("ul")
        const img = document.createElement("img")
        const name = document.createElement("h5")
        const desc = document.createElement("p");
        const date = document.createElement("li");
        const loc = document.createElement("li");
        const cohortId = document.createElement("li")

        card.className = "card m-3"
        card.style.width = "15rem"

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

        card.append(img, cardBody, listGroup)
         return card;
    })
    console.log(partyList)

    partyContainer.append(...partyList)
}

getPartyList();