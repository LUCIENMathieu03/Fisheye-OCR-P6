class Photographer {
    constructor(data){
        this._name = data.name
        this._portrait = data.portrait
        this._city = data.city
        this._country = data.country 
        this._tagline = data.tagline 
        this._price = data.price 
        this._id = data.id;

        this._location = `${this._city}, ${this._country}`;
        this._cost = `${this._price}/jour`;
    }

    get name(){
        return this._name;
    }
    
    get picture(){
        return `assets/photographers/${this._portrait}`;
    }
    
    get photographerDescription(){
        return `<p class='firstLine'>${this._location}</p> <p>${this._tagline}</p> <p class="price">${this._cost}</p>`;
    }

    get linkToPhotographerPage(){
        return `photographer.html?id=${this._id}`
    }

    get location(){
        return this._location
    }
    get tagline(){
        return this._tagline
    }
    get cost(){
        return this._cost
    }
}