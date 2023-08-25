class photographerTemplate {
    constructor(photographer) {
        this.photographer = photographer;
    }

    getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        const description = document.createElement('div');
        const h2 = document.createElement('h2');
        const link = document.createElement('a');

        description.innerHTML = this.photographer.photographerDescription;
        description.classList.add('description');

        img.setAttribute('src', this.photographer.picture);
        img.setAttribute('alt', this.photographer.name);

        h2.textContent = this.photographer.name;

        link.setAttribute('href', this.photographer.linkToPhotographerPage);
        link.setAttribute(
            'aria-label',
            `Lien vers la page du photographe ${this.photographer.name}`,
        );

        link.appendChild(img);
        link.appendChild(h2);

        article.appendChild(link);
        article.appendChild(description);

        return article;
    }
}
