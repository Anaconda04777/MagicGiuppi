let data = []
let numCarte

let listaOggetti = []
let htmlGrid

window.onload = function() {
    requestNumCarte()
    creazioneGrid()
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

    generazione() {
        let str = `<div class="card ${this.color}">
                        <div class="headerCard">
                            <h1>${this.name}</h1>
                            <p>${this.manaCost}</p>
                        </div>
                        <img src="${this.image}" class="imageCard" load="lazy">
                        <div class="mainCard">
                            
                            <h3>${this.typeLine}</h3>
                            <p class="text">${this.text}</p>
                        </div>

                        <div class="stats">
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

