let data = []
let numCarte

let listaOggetti = []
let htmlGrid

window.onload = function() {
    requestNumCarte()
    creazioneGrid()
}

class Card {
    constructor(name, image, manaCost, power, toughness, text) {
        this.name = name
        this.image = image
        this.manaCost = manaCost
        this.power = power
        this.toughness = toughness
        this.text = text
    }

    generazione() {
        let str = `<div class="card">
                        <div>
                            <h1>${this.name}</h1>
                            <p>${this.manaCost}</p>
                        </div>
                        
                        <img scr="${this.image}" class="imageCard">
                        <p class="text">${this.text}</p>
                        <div class="stats">
                            <p>${this.power}</p>
                            <p>${this.toughness}</p>
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
        console.log("dio")
        requestCarte(i)
        
    }
    
}


function creazioneOggCarta(info) {
    let ogg = new Card(info.name, info.image_uris["art_crop"],info.mana_cost, info.power, info.toughness, info.oracle_text);
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

