class PhotographerPage {
    constructor(photograph, photographMedia, allLikes) {
        this._name = photograph.name;
        this._portrait = photograph.portrait;
        this._city = photograph.city;
        this._country = photograph.country;
        this._tagline = photograph.tagline;
        this._price = photograph.price;
        this._id = photograph.id;

        this._media = photographMedia;

        this._allLikes = allLikes;

        this._location = `${this._city}, ${this._country}`;
    }

    get name() {
        return this._name;
    }
    get picture() {
        return `assets/photographers/${this._portrait}`;
    }
    get price() {
        return this._price;
    }

    get media() {
        return this._media;
    }
    get img() {
        return `assets/SamplePhotos/${this.name}/${this.media.image}`;
    }
    get video() {
        return `<source src='assets/SamplePhotos/${this.name}/${this.media.video}' type=video/mp4>`;
    }
    get mediaTitle() {
        return `${this.media.title}`;
    }
    get mediaLikes() {
        return `<p>${this.media.likes}</p><i class="fa-solid fa-heart heart" aria-label="likes"></i>`;
    }

    get allLikes() {
        return this._allLikes;
    }
    get allLikeNumber() {
        return `<p>${this.allLikes} <i class="fa-solid fa-heart heart" aria-label="likes"></i></p>`;
    }

    get photographerPageDescription() {
        return `<p class='firstLine'>${this._location}</p> 
                </br> 
                <p class="tagLine">${this._tagline}</p>`;
    }

    get tjm() {
        return `${this.price}€ / jour`;
    }
}
