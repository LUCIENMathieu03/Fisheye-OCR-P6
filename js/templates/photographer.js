function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;
    const location = `${city}, ${country}`;
    const cost = `${price}/jour`
    const photographerDescription  = `<p class='firstLine'>${location}</p> <p>${tagline}</p> <p class="price">${cost}</p>`
    const linkToPhotographerPage = `photographer.html?id=${id}`

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        const description = document.createElement('div')
        const h2 = document.createElement( 'h2' );
        const link = document.createElement('a')

        description.innerHTML = photographerDescription;
        description.classList.add("description")

        img.setAttribute("src", picture)

        h2.textContent = name;

        link.setAttribute("href", linkToPhotographerPage)

        link.appendChild(img);
        link.appendChild(h2);
        link.appendChild(description)

        article.appendChild(link)

        return (article);
    }
    return { name, picture, getUserCardDOM }
}