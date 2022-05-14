let data = []
let numCarte

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
        return `
        <div class="card">
            <div>
                <h1>${this.name}</h1>
                <p>${this.manaCost}</p>
            </div>
            
            <img scr="${this.image}">
            <p class="text">${this.text}</p>
            <div class="stats">
                <p>${this.power}</p>
                <p>${this.toughness}</p>
            </div>
        </div>
        `
    }
}

function creazioneGrid() {
    //cercare carte nel set
    //let array = request("https://api.scryfall.com/sets/emn")
    console.log(numCarte) 
    /*for (let i = 0; i < array.; i++) {
        const element = array[i];
        
    }*/
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
        data.push(txt)
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
        }
  
    };
  
    let url= "https://api.scryfall.com/sets/emn"; 
  
    xhr.open('GET',url);
    xhr.send();
  
}

