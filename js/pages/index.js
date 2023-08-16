class App {
    constructor() {
        this.photographersSection = document.querySelector(
            '.photographer_section',
        );
        this.photographerApi = new photographersApi(
            './data/photographers.json',
        );
    }

    displayData(photographers) {
        photographers
            .map((photographer) => new Photographer(photographer))
            .forEach((photographer) => {
                const photographerToDisplay = new PhotographerTemplateFactory(
                    photographer,
                    'photographerPresentation',
                );
                const userCardDOM = photographerToDisplay.getUserCardDOM();
                this.photographersSection.appendChild(userCardDOM);
            });
    }

    async main() {
        const photographersData = await this.photographerApi.getPhotographers();
        this.displayData(photographersData.photographers);
    }
}

const app = new App();
app.main();
