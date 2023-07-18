class photographerTemplate {
    constructor(photographer){
        this.photographer = photographer;
    }

  getUserCardDOM() {
    const article = document.createElement( 'article' );
    const img = document.createElement( 'img' );
    const description = document.createElement('div')
    const h2 = document.createElement( 'h2' );
    const link = document.createElement('a')

    description.innerHTML = this.photographer.photographerDescription;
    description.classList.add("description")

    img.setAttribute("src", this.photographer.picture)

    h2.textContent = this.photographer.name;

    link.setAttribute("href", this.photographer.linkToPhotographerPage)

    link.appendChild(img);
    link.appendChild(h2);
    link.appendChild(description)

    article.appendChild(link)

    return (article);
    }
    
}