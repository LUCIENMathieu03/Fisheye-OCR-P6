class App{
    constructor(){
        this.photographersSection = document.querySelector(".photographer_section");
        this.photographerApi = new photographersApi("./data/photographers.json");
    }

    async displayData(photographers) {
        photographers
        .map(photographer => new Photographer(photographer))  
        .forEach((photographer) => {
            const photographerToDisplay = new photographerTemplate(photographer); // la factory sera appeler ici pour choisir le bon template a appeler
            const userCardDOM = photographerToDisplay.getUserCardDOM();
            this.photographersSection.appendChild(userCardDOM);
        });
    }

    async main(){
        const photographersData = await this.photographerApi.getPhotographers();
        this.displayData(photographersData.photographers);
    }
}


const app =  new App();
app.main();