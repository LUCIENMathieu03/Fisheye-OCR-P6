function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;
    const location = `${city}, ${country}`;
    const cost = `${price}/jour`
    const photographerDescription  = `<p class='firstLine'>${location}</p> <p>${tagline}</p> <p class="price">${cost}</p>`

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        const description = document.createElement('div');
        description.innerHTML = photographerDescription;
        description.classList.add("description")
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(description)
        return (article);
    }
    return { name, picture, getUserCardDOM }
}