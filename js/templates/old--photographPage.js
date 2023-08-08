class photographPageTemplate{
    constructor(photographerDatas, photographMedia, allLike ){
        this.photographerDatas = photographerDatas;
        this.photographMedia= photographMedia;
        this.allLike = allLike;
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
        contactButton.addEventListener("click", ()=>displayModal()); 
        
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
        let img = null;
        let video = null;

        if(this.photographMedia.image){
            img = document.createElement( 'img' );
            img.setAttribute("src", `assets/SamplePhotos/${this.photographerDatas.name}/${this.photographMedia.image}`)
            article.appendChild(img);
        }else{
            video = document.createElement( 'video' );
            video.setAttribute("controls",'')
            video.innerHTML = `<source src='assets/SamplePhotos/${this.photographerDatas.name}/${this.photographMedia.video}' type=video/mp4>`
            article.appendChild(video);
        }

        imageTitle.textContent = `${this.photographMedia.title}`

        imagelike.classList.add('likes');
        imagelike.innerHTML = `<p>${this.photographMedia.likes}</p><i class="fa-solid fa-heart heart"></i>`

        imgDescription.classList.add('description');
        imgDescription.appendChild(imageTitle)
        imgDescription.appendChild(imagelike)

        article.setAttribute("id",`${this.photographMedia.id}`);
        article.appendChild(imgDescription);

        return (article);
    }

    getPhotographLikeTjm(){
        const likeContainer = document.createElement('div');
        const likeNumber = document.createElement( 'span' );
        const tjm = document.createElement( 'span' );

        likeContainer.classList.add('allLikes');

        likeNumber.innerHTML =`<p>${this.allLike} <i class="fa-solid fa-heart heart"></i></p>`;
        tjm.innerHTML=`${this.photographerDatas.price}€ / jour`;
        
        
        likeContainer.appendChild(likeNumber);
        likeContainer.appendChild(tjm);

        return(likeContainer);
    }
    
    getLightBoxImg(){
        if(this.photographMedia.image){
            let img = document.createElement( 'img' );
            img.setAttribute("src", `assets/SamplePhotos/${this.photographerDatas.name}/${this.photographMedia.image}`)
            return(img);
        }else{
            let video = document.createElement( 'video' );
            video.setAttribute("controls",'')
            video.innerHTML = `<source src='assets/SamplePhotos/${this.photographerDatas.name}/${this.photographMedia.video}' type=video/mp4>`
            return(video);
        }
        
    }

} 


