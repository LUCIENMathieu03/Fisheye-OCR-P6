class photographPageTemplate{
    constructor(photographerDatas, photographMedias,id){
        this.photographerDatas = photographerDatas;
        this.photographMedias= photographMedias;
        this.photoId = id
    }

    getPhotographHeader(){
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        const description = document.createElement('div')
        const h2 = document.createElement( 'h2' );
        const presentationText = document.createElement('div');
        const contactButton = document.createElement('button');
    
        description.innerHTML += `<p class="firstLine">${this.photographerDatas.location}</p>`;
        description.innerHTML += "</br>"
        description.innerHTML += `<p class="tagLine">${this.photographerDatas.tagline}</p>`;
        description.classList.add("description")
    
        img.setAttribute("src", this.photographerDatas.picture)
    
        h2.textContent = this.photographerDatas.name;

        contactButton.innerHTML = "Contactez-moi";
        contactButton.classList.add("contact_button");
        contactButton.classList.add("button");
        contactButton.setAttribute("onClick", "displayModal()")
        
        presentationText.appendChild(h2);
        presentationText.appendChild(description);
        presentationText.classList.add("photographText")

        article.appendChild(presentationText);
        article.appendChild(contactButton);
        article.appendChild(img);
    
        return (article);
    }

    getPhotographMedia(){
        const article = document.createElement( 'article' );
        const imgDescription = document.createElement('div');
        const imageTitle = document.createElement( 'p' );
        const imagelike = document.createElement( 'span' );
        var img = null;
        var video = null;

        if(this.photographMedias.image){
            img = document.createElement( 'img' );
            img.setAttribute("src", `assets/SamplePhotos/${this.photographerDatas.name}/${this.photographMedias.image}`)
            article.appendChild(img);
        }else{
            video = document.createElement( 'video' );
            video.setAttribute("controls",'')
            video.innerHTML = `<source src='assets/SamplePhotos/${this.photographerDatas.name}/${this.photographMedias.video}' type=video/mp4>`
            article.appendChild(video);
        }

        imageTitle.textContent = `${this.photographMedias.title}`

        imagelike.classList.add('likes');
        imagelike.innerHTML = `<p>${this.photographMedias.likes}</p><i class="fa-solid fa-heart heart"></i>`

        imgDescription.classList.add('description');
        imgDescription.appendChild(imageTitle)
        imgDescription.appendChild(imagelike)

        article.setAttribute("id",`${this.photoId}`);
        article.appendChild(imgDescription);

        return (article);
    }

    // getPhotographLikeTjm(){
    //     const likeContainer = document.createElement('div');
    //     const likeNumber = document.createElement( 'span' );
    //     const tjm = document.createElement( 'span' );

    //     likeContainer.classList.add('allLikes');

        
    // }

} 
