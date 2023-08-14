class photographPageTemplate{
    constructor(photographerPage){
        this.photographerPage = photographerPage;
    }

    getPhotographHeader(){
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        const description = document.createElement('div')
        const h2 = document.createElement( 'h2' );
        const presentationText = document.createElement('div');
        const contactButton = document.createElement('button');
    
        description.innerHTML= this.photographerPage.photographerPageDescription;
        description.classList.add("description")
    
        img.setAttribute("src", this.photographerPage.picture)
    
        h2.textContent = this.photographerPage._name;

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
        const playButton = document.createElement('div');
        let img = null;
        let video = null;

        if(this.photographerPage.media.image){
            img = document.createElement( 'img' );
            img.setAttribute("src", this.photographerPage.img)
            article.appendChild(img);
        }else{
            video = document.createElement( 'video' );
            video.innerHTML = this.photographerPage.video;
            playButton.innerHTML = '<i class="fa-solid fa-play playButton"></i>'
            article.appendChild(playButton);
            article.appendChild(video);
        }

        imageTitle.textContent = this.photographerPage.mediaTitle

        imagelike.classList.add('likes');
        imagelike.innerHTML = this.photographerPage.mediaLikes

        imgDescription.classList.add('description');
        imgDescription.appendChild(imageTitle)
        imgDescription.appendChild(imagelike)

        article.setAttribute("id",`${this.photographerPage.media.id}`);
        article.appendChild(imgDescription);

        return (article);
    }

    getPhotographLikeTjm(){
        const likeContainer = document.createElement('div');
        const likeNumber = document.createElement( 'span' );
        const tjm = document.createElement( 'span' );

        likeContainer.classList.add('allLikes');

        likeNumber.innerHTML = this.photographerPage.allLikeNumber;
        tjm.innerHTML= this.photographerPage.tjm;
        
        
        likeContainer.appendChild(likeNumber);
        likeContainer.appendChild(tjm);

        return(likeContainer);
    }
    
    getLightBoxImg(){
        if(this.photographerPage.media.image){
            let img = document.createElement( 'img' );
            img.setAttribute("src", this.photographerPage.img)
            return(img);
        }else{
            let video = document.createElement( 'video' );
            video.setAttribute("controls",'')
            video.setAttribute("autoplay",'')
            video.innerHTML = this.photographerPage.video;
            return(video);
        }   
    }

} 


