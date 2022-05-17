let data = []
let colorsIcon = {
    "R":"https://w7.pngwing.com/pngs/792/394/png-transparent-magic-the-gathering-mana-magic-points-playing-card-game-love-symbol-miscellaneous-game-color.png"
}
let numCarte

let listaOggetti = []
let htmlGrid

let inputSearch



window.onload = function() {
    requestNumCarte()
    creazioneGrid()

    inputSearch = document.querySelector("#searchInput")
    inputSearch.addEventListener("keydown", filtro)
}

class Card {
    constructor(name, image, manaCost, power, toughness, text, color, typeLine) {
        this.name = name
        this.image = image
        this.manaCost = manaCost
        this.power = power + "/"
        this.toughness = toughness
        this.text = text
        this.color = color[0]
        this.typeLine = typeLine

        if (color.length > 1) {
            this.color = "Gold"
        }

        if (power === undefined || toughness === undefined) {
            this.power = ""
            this.toughness = ""
        }

    }

    generazione() { // }
        let str = `<div class="card ${this.color}" id=${this.name.toLowerCase().replaceAll(" ", "")}>
                        <div class="headerCard border border-radius">
                            <h1>${this.name}</h1>
                            <p>${this.manaCost}</p>
                        </div>
                        <img src="${this.image}" class="imageCard border" load="lazy">
                        <div class="mainCard">
                            
                            <h3 class="border border-radius">${this.typeLine}</h3>
                            <p class="text border border-radius">${this.text}</p>
                        </div>

                        <div class="stats  ${this.power != "" ? "border border-radius" : ""}">
                            <p>${this.power} </p>
                            <p> ${this.toughness}</p>
                        </div>
                    </div>
                    `
        return str
    }
}

function creazioneGrid() {
    //cercare carte nel set
    //let array = request("https://api.scryfall.com/sets/emn")
    for (let i = 1; i < numCarte; i++) {
        requestCarte(i)
    }
    
}

function filtro() {
    let txt = searchInput.value.toLowerCase()
    let child = document.querySelectorAll("main>*")

    //listaOggetti = listaOggetti.filter(ogg => ogg.name.toLowerCase().includes(txt))
    //Array.from(child).forEach(i => )

    Array.from(child).forEach(i => {
        i.classList.add("hide")
        if (i.id.includes(txt)) {
            //console.log(i.id)
            i.classList.remove("hide")
        }
    })
}

function creazioneOggCarta(info) {
    let ogg = new Card(info.name, info.image_uris["art_crop"],info.mana_cost, info.power, info.toughness, 
                        info.oracle_text, info.colors, info.type_line);
    listaOggetti.push(ogg)

    document.querySelector("main").innerHTML += ogg.generazione()

}

//set: https://api.scryfall.com/cards/emn/
//num card: https://api.scryfall.com/sets/emn

function requestCarte(num) {
    let arr
    let xhr= new XMLHttpRequest();
  
    xhr.responseType='';
    xhr.onreadystatechange=()=>{
  
      if(xhr.status==200 && xhr.readyState==4) {
        let txt = JSON.parse(xhr.responseText)
        creazioneOggCarta(txt)
      }
  
    };
  
    let url= "https://api.scryfall.com/cards/emn/" + num; 
  
    xhr.open('GET',url);
    xhr.send();
  
}


function requestNumCarte() {
    let xhr= new XMLHttpRequest();
  
    xhr.responseType='';
    xhr.onreadystatechange=()=>{
  
    if (xhr.status==200 && xhr.readyState==4) {
        let txt = JSON.parse(xhr.responseText)
            numCarte = txt.card_count
            creazioneGrid()
        }
  
    };
  
    let url= "https://api.scryfall.com/sets/emn"; 
  
    xhr.open('GET',url);
    xhr.send();
  
}

